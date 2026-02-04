#!/usr/bin/env python3
"""
Database migration to remove roadmap_recommendations column from users table.

This migration removes the top 20 recommendations functionality while preserving:
- roadmap_summary (personalized descriptions)
- onboarding_profile.priority_categories (Priority Resources categories)
- onboarding_profile.priority_resources (Priority Resources by category)

Run with: python migration_remove_roadmap_recommendations.py
"""

import os
import sys
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Database URL configuration
DATABASE_URL = os.getenv("DATABASE_URL") or "postgresql://pioneer_user:pioneer_password@postgres:5432/pioneer"

def run_migration():
    """Remove roadmap_recommendations column from users table"""
    
    print("🔄 Starting migration to remove roadmap_recommendations column...")
    
    try:
        # Create engine and session
        engine = create_engine(DATABASE_URL, echo=True)
        Session = sessionmaker(bind=engine)
        session = Session()
        
        # Check if column exists first
        check_column_sql = """
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'roadmap_recommendations'
        AND table_schema = 'public';
        """
        
        result = session.execute(text(check_column_sql)).fetchone()
        
        if result:
            print("✅ Found roadmap_recommendations column, proceeding with removal...")
            
            # Remove the column
            drop_column_sql = "ALTER TABLE users DROP COLUMN IF EXISTS roadmap_recommendations;"
            session.execute(text(drop_column_sql))
            session.commit()
            
            print("✅ Successfully removed roadmap_recommendations column from users table")
            
            # Verify removal
            verify_result = session.execute(text(check_column_sql)).fetchone()
            if not verify_result:
                print("✅ Verification successful: roadmap_recommendations column has been removed")
            else:
                print("❌ Verification failed: roadmap_recommendations column still exists")
                return False
                
        else:
            print("ℹ️  roadmap_recommendations column does not exist, no migration needed")
        
        session.close()
        return True
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        if 'session' in locals():
            session.rollback()
            session.close()
        return False

def main():
    """Main migration function"""
    print("=" * 60)
    print("MIGRATION: Remove roadmap_recommendations column")
    print("=" * 60)
    
    success = run_migration()
    
    if success:
        print("\n✅ Migration completed successfully!")
        print("\nRemaining functionality:")
        print("- ✅ Personalized descriptions (roadmap_summary)")
        print("- ✅ Priority Resources categories (onboarding_profile.priority_categories)")
        print("- ✅ Priority Resources by category (onboarding_profile.priority_resources)")
        sys.exit(0)
    else:
        print("\n❌ Migration failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
