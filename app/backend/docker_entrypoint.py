#!/usr/bin/env python3
"""
Docker entrypoint script for Pittsburgh Tomorrow Pioneer application.
Handles database initialization and migration before starting the app.
"""

import os
import sys
import time
import subprocess
from pathlib import Path
import logging

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Configure root logging to emit INFO-level logs to console
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s [%(name)s] %(message)s")

def wait_for_postgres():
    """Wait for PostgreSQL to be ready if using PostgreSQL"""
    database_url = os.environ.get("DATABASE_URL", "")
    
    if not database_url.startswith("postgresql"):
        logger.error("DATABASE_URL must be PostgreSQL (postgresql://). Current value is not PostgreSQL. Exiting.")
        sys.exit(1)
    
    logger.info("Waiting for PostgreSQL to be ready…")
    max_retries = 30
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            # Try to import and test the database connection
            from database import engine
            from sqlalchemy import text
            
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            logger.info("PostgreSQL is ready!")
            return
            
        except Exception as e:
            retry_count += 1
            logger.info(f"PostgreSQL not ready yet (attempt {retry_count}/{max_retries}): {e}")
            time.sleep(2)
    
    logger.error("Failed to connect to PostgreSQL after maximum retries")
    sys.exit(1)

# Legacy no-op functions removed; migrations are handled inline in initialize_database

logger = logging.getLogger(__name__)

def initialize_database():
    """Initialize database schema and data (PostgreSQL only)"""
    logger.info("Initializing database…")
    logger.info("Starting migration bootstrap in entrypoint…")
    try:
        # Initialize database extensions and ensure schema exists (production-safe)
        logger.info("Ensuring database schema exists with Phase 1 onboarding fields…")
        from database import create_tables, engine, init_extensions
        from sqlalchemy import text

        init_extensions()
        logger.info("✅ Initialized database extensions")
        
        # Use create_tables instead of reset_tables to preserve existing data
        create_tables()
        logger.info("✅ Database schema ensured with onboarding fields")

        # Run translation columns migration (idempotent)
        logger.info("Running translation columns migration...")
        try:
            from migration_add_translation_columns import run_migration
            run_migration()
            logger.info("✅ Translation columns migration completed")
        except Exception as e:
            logger.error(f"⚠️  Translation migration failed: {e}")
            logger.error("This may cause login issues if columns are missing")
            # Don't fail the entire deployment, but log the error
            import traceback
            logger.error(traceback.format_exc())

        # Run Auth0 migrations (idempotent)
        logger.info("Running Auth0 migrations...")
        auth0_migrations = [
            ("migration_add_auth0_user_id", "Auth0 user ID column"),
            ("migration_make_password_nullable", "Password nullable"),
            ("migration_make_username_nullable", "Username nullable"),
            ("migration_remove_username_unique", "Username unique constraint removal")
        ]
        
        for migration_module, description in auth0_migrations:
            try:
                logger.info(f"Running {description} migration...")
                migration = __import__(migration_module)
                migration.run_migration()
                logger.info(f"✅ {description} migration completed")
            except Exception as e:
                logger.error(f"⚠️  {description} migration failed: {e}")
                logger.error("This may cause Auth0 login issues if columns are missing")
                import traceback
                logger.error(traceback.format_exc())

        # Run category subtitle translations migration (idempotent)
        logger.info("Running category subtitle translations migration...")
        try:
            from migration_add_category_subtitle_translations import run_migration
            run_migration()
            logger.info("✅ Category subtitle translations migration completed")
        except Exception as e:
            logger.error(f"⚠️  Category subtitle translations migration failed: {e}")
            logger.error("This may affect personalized subtitle translations for priority categories")
            import traceback
            logger.error(traceback.format_exc())

        # Run new languages schema migration (idempotent - extends language_code columns)
        logger.info("Running new languages schema migration (extending language_code columns)...")
        try:
            from migration_add_new_languages_20251229 import migrate_schema
            migrate_schema()
            logger.info("✅ New languages schema migration completed")
        except Exception as e:
            logger.error(f"⚠️  New languages schema migration failed: {e}")
            logger.error("This may prevent extended language codes from working")
            import traceback
            logger.error(traceback.format_exc())

        # Reset any stuck "translating" statuses to "pending" so they can be retried
        # This handles cases where a previous deployment was interrupted mid-translation
        logger.info("Resetting any stuck translation statuses...")
        try:
            with engine.connect() as conn:
                result = conn.execute(text(
                    "UPDATE resources SET translation_status = 'pending' WHERE translation_status = 'translating'"
                ))
                conn.commit()
                if result.rowcount > 0:
                    logger.info(f"✅ Reset {result.rowcount} stuck translations from 'translating' to 'pending'")
                else:
                    logger.info("✅ No stuck translations found")
        except Exception as e:
            logger.warning(f"⚠️  Could not reset stuck translations: {e}")

        # Run new languages data migration (translates existing resources only)
        # This is idempotent - it checks for existing translations and only translates missing ones
        # Note: User descriptions and category subtitles are translated on-demand when users select a new language
        # Can be disabled by setting RUN_NEW_LANGUAGES_DATA_MIGRATION=false
        if os.environ.get("RUN_NEW_LANGUAGES_DATA_MIGRATION", "true").lower() != "false":
            logger.info("Running new languages data migration (translating existing resources only)...")
            logger.info("This checks for existing translations first and skips if already done.")
            logger.info("User descriptions and category subtitles will be translated on-demand.")
            try:
                import asyncio
                from migration_add_new_languages_20251229 import migrate_data
                # Run synchronously - it will quickly skip if translations already exist
                asyncio.run(migrate_data())
                logger.info("✅ New languages data migration completed")
            except Exception as e:
                logger.error(f"⚠️  New languages data migration failed: {e}")
                logger.error("Translations will be generated on-demand when users select new languages")
                logger.error("This is not critical - the app will continue to work")
                import traceback
                logger.error(traceback.format_exc())
        else:
            logger.info("Skipping new languages data migration (RUN_NEW_LANGUAGES_DATA_MIGRATION=false)")
            logger.info("Translations will be generated on-demand when users select new languages")

        # Create secure admin account
        logger.info("Setting up secure admin account…")
        from demo_service import create_secure_admin
        if not create_secure_admin():
            logger.warning("Admin account setup had issues - check environment variables")

        # Initialize demo data (full dataset) if requested
        if os.environ.get("INIT_DEMO_DATA", "false").lower() == "true":
            # If INIT_DEMO_DATA=users-only, seed everything except mock resources
            mode = os.environ.get("INIT_DEMO_DATA_MODE", "full").lower()
            if mode == "no-resources":
                logger.info("Initializing demo data without resources (categories, checklists, chat, screening, users)…")
                from demo_service import run_demo_setup_without_resources
                run_demo_setup_without_resources()
            else:
                logger.info("Initializing full demo data (resources, categories, checklists, chat, screening, users)…")
                from demo_service import run_demo_setup
                run_demo_setup()
            logger.info("Demo data initialized")
        else:
            logger.info("Skipping full demo data initialization (INIT_DEMO_DATA not set)")

        # Optionally create only demo users independent of full demo dataset
        if os.environ.get("INIT_DEMO_USERS", "false").lower() == "true" and os.environ.get("INIT_DEMO_DATA", "false").lower() != "true":
            try:
                logger.info("Initializing demo users only (without demo resources)…")
                from demo_service import populate_demo_users
                populate_demo_users()
                logger.info("✅ Demo users initialized successfully")
                
                # Verify demo users were actually created
                logger.info("Verifying demo users were created...")
                from database import SessionLocal, User
                session = SessionLocal()
                try:
                    demo_count = session.query(User).filter(User.is_demo_user == True).count()
                    logger.info(f"Demo users verification: {demo_count} demo users found in database")
                    if demo_count == 0:
                        logger.error("❌ CRITICAL: No demo users found after creation!")
                    else:
                        logger.info(f"✅ Demo users verification successful: {demo_count} users created")
                finally:
                    session.close()
                    
            except Exception as e:
                logger.error(f"❌ CRITICAL: Failed to initialize demo users: {e}")
                logger.error(f"Error type: {type(e).__name__}")
                import traceback
                logger.error("Full traceback:")
                logger.error(traceback.format_exc())
                # Still continue deployment, but make the error very visible
                logger.error("🚨 DEPLOYMENT CONTINUING BUT DEMO USERS ARE MISSING!")

        return True
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        return False

def start_application():
    """Start the FastAPI application"""
    logger.info("Starting FastAPI application…")
    
    try:
        # Import and run the application
        import uvicorn
        from main import app
        from fastapi.staticfiles import StaticFiles
        import os
        from typing import Tuple
        
        # Set up static file serving (copied from run.py)
        STATIC_WEB_DIR = os.environ.get("STATIC_WEB_DIR", "./static")
        logger.info(f"Mounting static website from {STATIC_WEB_DIR}")
        
        class SinglePageApplication(StaticFiles):
            """Acts similar to the bripkens/connect-history-api-fallback NPM package."""

            def __init__(self, directory: os.PathLike, index="index.html") -> None:
                self.index = index
                super().__init__(directory=directory, packages=None, html=True, check_dir=True)

            def lookup_path(self, path: str) -> Tuple[str, os.stat_result]:
                """Returns the index file when no match is found."""
                full_path, stat_result = super().lookup_path(path)
                if stat_result is None:
                    return super().lookup_path(self.index)
                return (full_path, stat_result)

        app.mount(path="/", app=SinglePageApplication(directory=STATIC_WEB_DIR), name="SPA")
        
        # Start the server
        # Railway provides PORT environment variable
        backend_port = int(os.environ.get("PORT", os.environ.get("BACKEND_PORT", 8000)))
        uvicorn.run(app, host="0.0.0.0", port=backend_port)
        
    except Exception as e:
        logger.error(f"Failed to start application: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

def main():
    """Main entrypoint function"""
    logger.info("Starting Pittsburgh Tomorrow Pioneer application container…")
    
    # Step 1: Wait for database to be ready (if using PostgreSQL)
    wait_for_postgres()
    
    # Step 2: Initialize database
    initialize_database()
    
    # Step 3: Start the application
    start_application()

if __name__ == "__main__":
    main() 
