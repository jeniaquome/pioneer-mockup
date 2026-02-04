#!/usr/bin/env python3
"""
Comprehensive database migration script to add translation support.

This script adds:
1. Translation tracking columns to users table
2. Translation tracking columns to resources table  
3. user_description_translations table
4. resource_translations table (if not exists)

This is idempotent - safe to run multiple times.
"""

import os
import sys
import logging
from sqlalchemy import create_engine, text

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def run_migration():
    """Run the comprehensive translation migration"""
    
    # Get database connection from environment
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        logger.error("DATABASE_URL environment variable not set!")
        sys.exit(1)
    
    engine = create_engine(DATABASE_URL)
    
    logger.info("=" * 60)
    logger.info("Starting comprehensive translation migration...")
    logger.info("=" * 60)
    
    with engine.connect() as conn:
        try:
            # Start transaction
            trans = conn.begin()
            
            # ===== USERS TABLE MIGRATION =====
            logger.info("\n[1/4] Migrating users table...")
            
            result = conn.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'users' 
                AND column_name IN ('roadmap_translation_status', 'last_roadmap_translation_hash')
            """))
            existing_user_columns = [row[0] for row in result]
            
            if 'roadmap_translation_status' not in existing_user_columns:
                conn.execute(text("""
                    ALTER TABLE users 
                    ADD COLUMN roadmap_translation_status VARCHAR DEFAULT 'not_started' NOT NULL
                """))
                logger.info("  ✓ Added users.roadmap_translation_status column")
            else:
                logger.info("  ✓ users.roadmap_translation_status already exists")
            
            if 'last_roadmap_translation_hash' not in existing_user_columns:
                conn.execute(text("""
                    ALTER TABLE users 
                    ADD COLUMN last_roadmap_translation_hash VARCHAR(64)
                """))
                logger.info("  ✓ Added users.last_roadmap_translation_hash column")
            else:
                logger.info("  ✓ users.last_roadmap_translation_hash already exists")
            
            # Add index
            conn.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_users_roadmap_translation_status 
                ON users (roadmap_translation_status)
            """))
            logger.info("  ✓ Ensured index on roadmap_translation_status")
            
            # ===== RESOURCES TABLE MIGRATION =====
            logger.info("\n[2/4] Migrating resources table...")
            
            result = conn.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'resources' 
                AND column_name IN ('translation_status', 'last_translation_hash')
            """))
            existing_resource_columns = [row[0] for row in result]
            
            if 'translation_status' not in existing_resource_columns:
                conn.execute(text("""
                    ALTER TABLE resources 
                    ADD COLUMN translation_status VARCHAR DEFAULT 'not_started' NOT NULL
                """))
                logger.info("  ✓ Added resources.translation_status column")
            else:
                logger.info("  ✓ resources.translation_status already exists")
            
            if 'last_translation_hash' not in existing_resource_columns:
                conn.execute(text("""
                    ALTER TABLE resources 
                    ADD COLUMN last_translation_hash VARCHAR(64)
                """))
                logger.info("  ✓ Added resources.last_translation_hash column")
            else:
                logger.info("  ✓ resources.last_translation_hash already exists")
            
            # Add index
            conn.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_resource_translation_status 
                ON resources (translation_status)
            """))
            logger.info("  ✓ Ensured index on translation_status")
            
            # ===== USER_DESCRIPTION_TRANSLATIONS TABLE =====
            logger.info("\n[3/4] Creating user_description_translations table...")
            
            result = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_name = 'user_description_translations'
            """))
            
            if result.fetchone() is None:
                conn.execute(text("""
                    CREATE TABLE user_description_translations (
                        id SERIAL PRIMARY KEY,
                        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                        language_code VARCHAR(2) NOT NULL,
                        roadmap_summary_translated TEXT,
                        translation_status VARCHAR DEFAULT 'pending' NOT NULL,
                        error_message TEXT,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                        CONSTRAINT uq_user_language UNIQUE (user_id, language_code)
                    )
                """))
                
                conn.execute(text("""
                    CREATE INDEX idx_user_translation_status 
                    ON user_description_translations (translation_status)
                """))
                conn.execute(text("""
                    CREATE INDEX idx_user_translation_language 
                    ON user_description_translations (language_code)
                """))
                conn.execute(text("""
                    CREATE INDEX idx_user_translation_user_id 
                    ON user_description_translations (user_id)
                """))
                
                logger.info("  ✓ Created user_description_translations table with indexes")
            else:
                logger.info("  ✓ user_description_translations table already exists")
            
            # ===== RESOURCE_TRANSLATIONS TABLE =====
            logger.info("\n[4/4] Creating resource_translations table...")
            
            result = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_name = 'resource_translations'
            """))
            
            if result.fetchone() is None:
                conn.execute(text("""
                    CREATE TABLE resource_translations (
                        id SERIAL PRIMARY KEY,
                        resource_id VARCHAR NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
                        language_code VARCHAR(2) NOT NULL,
                        resource_name_translated TEXT,
                        summary_translated TEXT,
                        translation_status VARCHAR DEFAULT 'pending' NOT NULL,
                        error_message TEXT,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                        CONSTRAINT uq_resource_language UNIQUE (resource_id, language_code)
                    )
                """))
                
                conn.execute(text("""
                    CREATE INDEX idx_translation_resource_id 
                    ON resource_translations (resource_id)
                """))
                conn.execute(text("""
                    CREATE INDEX idx_translation_language 
                    ON resource_translations (language_code)
                """))
                conn.execute(text("""
                    CREATE INDEX idx_translation_status 
                    ON resource_translations (translation_status)
                """))
                
                logger.info("  ✓ Created resource_translations table with indexes")
            else:
                logger.info("  ✓ resource_translations table already exists")
            
            # ===== CREATE TRIGGER FUNCTION =====
            logger.info("\n[Bonus] Setting up triggers...")
            
            conn.execute(text("""
                CREATE OR REPLACE FUNCTION update_updated_at_column()
                RETURNS TRIGGER AS $$
                BEGIN
                    NEW.updated_at = NOW();
                    RETURN NEW;
                END;
                $$ language 'plpgsql'
            """))
            
            # Triggers for user_description_translations
            conn.execute(text("""
                DROP TRIGGER IF EXISTS update_user_description_translations_updated_at 
                ON user_description_translations
            """))
            conn.execute(text("""
                CREATE TRIGGER update_user_description_translations_updated_at 
                BEFORE UPDATE ON user_description_translations 
                FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
            """))
            
            # Triggers for resource_translations
            conn.execute(text("""
                DROP TRIGGER IF EXISTS update_resource_translations_updated_at 
                ON resource_translations
            """))
            conn.execute(text("""
                CREATE TRIGGER update_resource_translations_updated_at 
                BEFORE UPDATE ON resource_translations 
                FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
            """))
            
            logger.info("  ✓ Created/updated triggers for updated_at columns")
            
            # Commit transaction
            trans.commit()
            
            logger.info("\n" + "=" * 60)
            logger.info("✅ Migration completed successfully!")
            logger.info("=" * 60)
            logger.info("\nYou can now:")
            logger.info("  1. Log in to your application")
            logger.info("  2. Access all features that depend on translation columns")
            logger.info("  3. Deploy with confidence!")
            
        except Exception as e:
            trans.rollback()
            logger.error("\n" + "=" * 60)
            logger.error(f"❌ Migration failed: {e}")
            logger.error("=" * 60)
            logger.error("\nTransaction has been rolled back.")
            logger.error("No changes were made to the database.")
            raise
    
    logger.info("\nMigration script finished.")

if __name__ == "__main__":
    try:
        run_migration()
        sys.exit(0)
    except Exception as e:
        logger.error(f"\nFatal error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
