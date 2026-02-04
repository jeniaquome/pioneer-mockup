"""
Migration: Add priority_category_subtitle_translations table

This migration adds a new table to store translated subtitles for priority categories
that are personalized per user.
"""
import logging
from sqlalchemy import text
from database import engine

logger = logging.getLogger(__name__)

def run_migration():
    """Add priority_category_subtitle_translations table"""
    logger.info("Starting migration: Add priority_category_subtitle_translations table")
    
    with engine.connect() as conn:
        try:
            # Create the priority_category_subtitle_translations table
            create_table_sql = text("""
                CREATE TABLE IF NOT EXISTS priority_category_subtitle_translations (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    category_key VARCHAR(50) NOT NULL,
                    language_code VARCHAR(2) NOT NULL,
                    subtitle_translated TEXT,
                    translation_status VARCHAR NOT NULL DEFAULT 'pending',
                    error_message TEXT,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    CONSTRAINT uq_user_category_language UNIQUE (user_id, category_key, language_code)
                )
            """)
            conn.execute(create_table_sql)
            
            # Create indexes
            indexes = [
                "CREATE INDEX IF NOT EXISTS idx_category_subtitle_translation_status ON priority_category_subtitle_translations(translation_status)",
                "CREATE INDEX IF NOT EXISTS idx_category_subtitle_translation_language ON priority_category_subtitle_translations(language_code)",
                "CREATE INDEX IF NOT EXISTS idx_category_subtitle_user_category ON priority_category_subtitle_translations(user_id, category_key)",
                "CREATE INDEX IF NOT EXISTS idx_priority_category_subtitle_translations_user_id ON priority_category_subtitle_translations(user_id)",
                "CREATE INDEX IF NOT EXISTS idx_priority_category_subtitle_translations_category_key ON priority_category_subtitle_translations(category_key)"
            ]
            
            for index_sql in indexes:
                conn.execute(text(index_sql))
            
            conn.commit()
            logger.info("✅ Successfully created priority_category_subtitle_translations table and indexes")
            return True
            
        except Exception as e:
            logger.error(f"❌ Migration failed: {e}")
            conn.rollback()
            raise

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    run_migration()
    logger.info("Migration completed successfully")

