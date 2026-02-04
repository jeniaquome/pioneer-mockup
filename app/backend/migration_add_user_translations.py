#!/usr/bin/env python3
"""
Database migration script to add user description translation support.

This script adds:
1. New columns to users table for translation tracking
2. New user_description_translations table for storing translations

Run this script to migrate the database schema for user description translations.
"""

import os
import sys
import logging
from sqlalchemy import create_engine, text, Column, Integer, String, Text, ForeignKey, UniqueConstraint, Index
from sqlalchemy.orm import sessionmaker

# Add the backend directory to Python path so we can import our modules
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import get_database_url

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def run_migration():
    """Run the migration to add user translation support"""
    
    # Get database connection - use localhost for local development
    DATABASE_URL = os.getenv("DATABASE_URL") or "postgresql://pioneer_user:pioneer_password@localhost:5432/pioneer"
    engine = create_engine(DATABASE_URL)
    
    logger.info("Starting user translation migration...")
    
    with engine.connect() as conn:
        try:
            # Start transaction
            trans = conn.begin()
            
            # 1. Add new columns to users table
            logger.info("Adding translation tracking columns to users table...")
            
            # Check if columns already exist
            result = conn.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'users' 
                AND column_name IN ('roadmap_translation_status', 'last_roadmap_translation_hash')
            """))
            existing_columns = [row[0] for row in result]
            
            if 'roadmap_translation_status' not in existing_columns:
                conn.execute(text("""
                    ALTER TABLE users 
                    ADD COLUMN roadmap_translation_status VARCHAR DEFAULT 'not_started' NOT NULL
                """))
                logger.info("Added roadmap_translation_status column")
            else:
                logger.info("roadmap_translation_status column already exists")
            
            if 'last_roadmap_translation_hash' not in existing_columns:
                conn.execute(text("""
                    ALTER TABLE users 
                    ADD COLUMN last_roadmap_translation_hash VARCHAR(64)
                """))
                logger.info("Added last_roadmap_translation_hash column")
            else:
                logger.info("last_roadmap_translation_hash column already exists")
            
            # Add index for roadmap_translation_status if it doesn't exist
            try:
                conn.execute(text("""
                    CREATE INDEX IF NOT EXISTS idx_users_roadmap_translation_status 
                    ON users (roadmap_translation_status)
                """))
                logger.info("Added index for roadmap_translation_status")
            except Exception as e:
                logger.warning(f"Index creation failed (may already exist): {e}")
            
            # 2. Create user_description_translations table
            logger.info("Creating user_description_translations table...")
            
            # Check if table already exists
            result = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_name = 'user_description_translations'
            """))
            table_exists = result.fetchone() is not None
            
            if not table_exists:
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
                        
                        -- Ensure one translation per user per language
                        CONSTRAINT uq_user_language UNIQUE (user_id, language_code)
                    )
                """))
                logger.info("Created user_description_translations table")
                
                # Add indexes
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
                
                logger.info("Added indexes for user_description_translations table")
            else:
                logger.info("user_description_translations table already exists")
            
            # 3. Add trigger to update updated_at column
            logger.info("Adding updated_at trigger for user_description_translations...")
            
            try:
                # Create or replace the trigger function
                conn.execute(text("""
                    CREATE OR REPLACE FUNCTION update_updated_at_column()
                    RETURNS TRIGGER AS $$
                    BEGIN
                        NEW.updated_at = NOW();
                        RETURN NEW;
                    END;
                    $$ language 'plpgsql'
                """))
                
                # Create the trigger
                conn.execute(text("""
                    DROP TRIGGER IF EXISTS update_user_description_translations_updated_at 
                    ON user_description_translations
                """))
                
                conn.execute(text("""
                    CREATE TRIGGER update_user_description_translations_updated_at 
                    BEFORE UPDATE ON user_description_translations 
                    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
                """))
                
                logger.info("Added updated_at trigger")
            except Exception as e:
                logger.warning(f"Trigger creation failed: {e}")
            
            # Commit transaction
            trans.commit()
            logger.info("✅ User translation migration completed successfully!")
            
        except Exception as e:
            # Rollback on error
            trans.rollback()
            logger.error(f"❌ Migration failed: {e}")
            raise
    
    logger.info("Migration script finished.")

if __name__ == "__main__":
    try:
        run_migration()
        print("✅ Migration completed successfully!")
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        sys.exit(1)
