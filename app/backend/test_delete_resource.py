#!/usr/bin/env python3
"""
Test script to debug resource deletion functionality.
Run this to test if resources can be deleted directly from the database.
"""

import sys
import os
import logging

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import get_db, Resource, Bookmark, engine
from sqlalchemy import text
import json

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def test_resource_deletion():
    """Test deleting a resource directly"""
    print("🧪 Testing Resource Deletion")
    print("=" * 50)
    
    try:
        with next(get_db()) as db:
            # First, let's see what resources exist
            resources = db.query(Resource).limit(5).all()
            print(f"📋 Found {len(resources)} resources in database")
            
            if not resources:
                print("❌ No resources found in database")
                return False
            
            # Pick the first resource to test deletion
            test_resource = resources[0]
            resource_id = test_resource.id
            resource_name = getattr(test_resource, 'resource_name', None) or 'unknown'
            
            print(f"🎯 Testing deletion of: {resource_name} (ID: {resource_id})")
            
            # Check for bookmarks
            bookmark_count = db.query(Bookmark).filter(Bookmark.resource_id == resource_id).count()
            print(f"🔖 Resource has {bookmark_count} bookmark(s)")
            
            # Try to delete the resource
            print("🗑️ Attempting to delete resource...")
            
            # Method 1: Direct deletion (should handle cascades automatically)
            try:
                db.delete(test_resource)
                db.commit()
                print(f"✅ Successfully deleted resource: {resource_name}")
                
                # Verify deletion
                deleted_resource = db.query(Resource).filter(Resource.id == resource_id).first()
                if deleted_resource is None:
                    print("✅ Resource confirmed deleted from database")
                else:
                    print("❌ Resource still exists in database after deletion")
                
                # Check if bookmarks were also deleted
                remaining_bookmarks = db.query(Bookmark).filter(Bookmark.resource_id == resource_id).count()
                print(f"🔖 Remaining bookmarks: {remaining_bookmarks}")
                
                return True
                
            except Exception as e:
                db.rollback()
                print(f"❌ Failed to delete resource: {type(e).__name__}: {str(e)}")
                
                # Try manual bookmark deletion first
                try:
                    print("🔄 Trying to delete bookmarks manually first...")
                    deleted_bookmarks = db.query(Bookmark).filter(Bookmark.resource_id == resource_id).delete()
                    print(f"🗑️ Manually deleted {deleted_bookmarks} bookmark(s)")
                    
                    # Now try resource deletion again
                    print("🔄 Trying resource deletion again...")
                    fresh_resource = db.query(Resource).filter(Resource.id == resource_id).first()
                    if fresh_resource:
                        db.delete(fresh_resource)
                        db.commit()
                        print(f"✅ Successfully deleted resource after manual bookmark cleanup")
                        return True
                    else:
                        print("❌ Resource not found for second deletion attempt")
                        return False
                        
                except Exception as e2:
                    db.rollback()
                    print(f"❌ Manual deletion also failed: {type(e2).__name__}: {str(e2)}")
                    return False
    
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def check_foreign_key_constraints():
    """Check the foreign key constraints in the database"""
    print("\n🔍 Checking Foreign Key Constraints")
    print("=" * 50)
    
    try:
        with engine.connect() as conn:
            # Check if we're using PostgreSQL or SQLite
            db_url = str(engine.url)
            
            if 'postgresql' in db_url:
                print("📊 Database: PostgreSQL")
                
                # Check foreign key constraints
                result = conn.execute(text("""
                    SELECT 
                        tc.table_name, 
                        kcu.column_name, 
                        ccu.table_name AS foreign_table_name,
                        ccu.column_name AS foreign_column_name,
                        tc.constraint_name
                    FROM 
                        information_schema.table_constraints AS tc 
                        JOIN information_schema.key_column_usage AS kcu
                          ON tc.constraint_name = kcu.constraint_name
                        JOIN information_schema.constraint_column_usage AS ccu
                          ON ccu.constraint_name = tc.constraint_name
                    WHERE tc.constraint_type = 'FOREIGN KEY' 
                    AND (ccu.table_name = 'resources' OR tc.table_name = 'resources')
                """))
                
                constraints = result.fetchall()
                print(f"🔗 Found {len(constraints)} foreign key constraint(s) related to resources:")
                
                for constraint in constraints:
                    print(f"  📎 {constraint.table_name}.{constraint.column_name} -> {constraint.foreign_table_name}.{constraint.foreign_column_name} ({constraint.constraint_name})")
                
            else:
                print("📊 Database: SQLite")
                
                # For SQLite, check pragma foreign_key_list
                result = conn.execute(text("PRAGMA foreign_key_list(bookmarks)"))
                constraints = result.fetchall()
                print(f"🔗 Foreign keys in bookmarks table: {len(constraints)}")
                
                for constraint in constraints:
                    print(f"  📎 Column {constraint[3]} references {constraint[2]}.{constraint[4]}")
                
                # Check if foreign keys are enabled
                result = conn.execute(text("PRAGMA foreign_keys"))
                fk_enabled = result.fetchone()
                print(f"🔧 Foreign keys enabled: {fk_enabled[0] if fk_enabled else 'Unknown'}")
        
        return True
        
    except Exception as e:
        print(f"❌ Failed to check constraints: {e}")
        return False

def main():
    """Main test function"""
    print("🚀 Resource Deletion Debug Test")
    print("=" * 70)
    
    # Test 1: Check foreign key constraints
    check_foreign_key_constraints()
    
    # Test 2: Try to delete a resource
    success = test_resource_deletion()
    
    print("\n" + "=" * 70)
    if success:
        print("🎉 Resource deletion test completed successfully!")
        print("✅ The delete functionality should work in the admin dashboard.")
    else:
        print("❌ Resource deletion test failed!")
        print("🔧 There may be database constraint issues that need to be fixed.")
    
    return success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 