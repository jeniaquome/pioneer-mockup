#!/usr/bin/env python3
"""
Debug script to check if demo users exist in the database and verify authentication setup.
"""

import sys
from database import SessionLocal, User
from auth_utils import verify_password, get_password_hash

def check_demo_users():
    """Check if demo users exist in the database"""
    print("🔍 Checking demo users in database...")
    
    session = SessionLocal()
    try:
        # Get all users from database
        users = session.query(User).all()
        
        print(f"📊 Total users in database: {len(users)}")
        
        if len(users) == 0:
            print("❌ No users found in database!")
            return False
        
        # Check each user
        demo_emails = [
            "maria.rodriguez@demo.com",
            "david.chen@demo.com", 
            "fatima.ahmad@demo.com",
            "john.doe@demo.com"
        ]
        
        print("\n👥 Users found:")
        for user in users:
            is_demo = "✅ DEMO" if user.is_demo_user else "👤 REGULAR"
            role = user.role or "No role"
            print(f"  {is_demo} | {user.email} | {user.username} | Role: {role}")
        
        print("\n🎭 Checking for expected demo users:")
        found_demo_users = 0
        for email in demo_emails:
            user = session.query(User).filter(User.email == email).first()
            if user:
                print(f"  ✅ {email} - Role: {user.role}")
                found_demo_users += 1
            else:
                print(f"  ❌ {email} - NOT FOUND")
        
        if found_demo_users == 0:
            print("❌ No demo users found!")
            return False
        elif found_demo_users < len(demo_emails):
            print(f"⚠️ Only {found_demo_users}/{len(demo_emails)} demo users found")
        else:
            print("✅ All demo users found!")
        
        return True
        
    except Exception as e:
        print(f"❌ Error checking users: {e}")
        return False
    finally:
        session.close()

def test_password_authentication():
    """Test password authentication for demo users"""
    print("\n🔐 Testing password authentication...")
    
    session = SessionLocal()
    try:
        # Test password for one demo user
        test_email = "david.chen@demo.com"
        test_password = "DemoPass123!"
        
        user = session.query(User).filter(User.email == test_email).first()
        if not user:
            print(f"❌ Test user {test_email} not found")
            return False
        
        print(f"👤 Testing authentication for: {user.email}")
        print(f"📝 Username: {user.username}")
        print(f"🎭 Role: {user.role}")
        print(f"🔒 Has hashed password: {'Yes' if user.hashed_password else 'No'}")
        
        # Test password verification
        if user.hashed_password:
            is_valid = verify_password(test_password, user.hashed_password)
            print(f"🔑 Password verification: {'✅ VALID' if is_valid else '❌ INVALID'}")
            
            if not is_valid:
                # Try to create a new hash and compare
                new_hash = get_password_hash(test_password)
                print(f"🆕 New hash created for comparison")
                is_new_valid = verify_password(test_password, new_hash)
                print(f"🔄 New hash verification: {'✅ VALID' if is_new_valid else '❌ INVALID'}")
            
            return is_valid
        else:
            print("❌ User has no password hash!")
            return False
            
    except Exception as e:
        print(f"❌ Error testing authentication: {e}")
        import traceback
        traceback.print_exc()
        return False
    finally:
        session.close()

def check_database_schema():
    """Check if the users table has all required columns"""
    print("\n🏗️ Checking database schema...")
    
    session = SessionLocal()
    try:
        # Try to access all the role-based columns
        test_query = session.query(
            User.id,
            User.email, 
            User.username,
            User.role,
            User.user_type,
            User.primary_language,
            User.is_demo_user
        ).limit(1)
        
        result = test_query.first()
        print("✅ All required columns accessible")
        
        if result:
            print(f"📋 Sample user data:")
            print(f"  ID: {result[0]}")
            print(f"  Email: {result[1]}")
            print(f"  Username: {result[2]}")
            print(f"  Role: {result[3]}")
            print(f"  User Type: {result[4]}")
            print(f"  Primary Language: {result[5]}")
            print(f"  Is Demo User: {result[6]}")
        
        return True
        
    except Exception as e:
        print(f"❌ Schema check failed: {e}")
        return False
    finally:
        session.close()

def main():
    """Main debug function"""
    print("🐛 Starting authentication debug...")
    print("=" * 50)
    
    # Check database schema
    schema_ok = check_database_schema()
    
    # Check if demo users exist
    users_ok = check_demo_users()
    
    # Test authentication
    auth_ok = test_password_authentication()
    
    print("\n" + "=" * 50)
    print("📊 DEBUG SUMMARY:")
    print(f"  Database Schema: {'✅ OK' if schema_ok else '❌ FAILED'}")
    print(f"  Demo Users Exist: {'✅ OK' if users_ok else '❌ FAILED'}")
    print(f"  Authentication: {'✅ OK' if auth_ok else '❌ FAILED'}")
    
    if schema_ok and users_ok and auth_ok:
        print("\n🎉 Everything looks good! Login should work.")
    else:
        print("\n💥 Issues found! Check the details above.")
    
    return schema_ok and users_ok and auth_ok

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 