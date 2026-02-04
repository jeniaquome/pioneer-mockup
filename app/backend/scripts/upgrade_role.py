#!/usr/bin/env python3
"""
Script to upgrade user roles in the database.

Usage:
    python upgrade_role.py USER_EMAIL ROLE

Example:
    python upgrade_role.py collin@quome.com admin
"""

import sys
import os
import logging
from sqlalchemy.orm import Session

# Add the parent directory to the path so we can import from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal, User

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def upgrade_user_role(email: str, new_role: str) -> bool:
    """
    Upgrade a user's role in the database.
    
    Args:
        email: User's email address
        new_role: New role to assign
        
    Returns:
        bool: True if successful, False otherwise
    """
    db: Session = SessionLocal()
    try:
        # Find the user by email
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            logger.error(f"User with email '{email}' not found")
            return False
            
        # Store old role for logging
        old_role = user.role
        
        # Update the role
        user.role = new_role
        
        # Commit the changes
        db.commit()
        
        logger.info(f"Successfully updated user '{email}' role from '{old_role}' to '{new_role}'")
        return True
        
    except Exception as e:
        logger.error(f"Error updating user role: {e}")
        db.rollback()
        return False
    finally:
        db.close()

def main():
    """Main function to handle command line arguments and execute role upgrade."""
    if len(sys.argv) != 3:
        print("Usage: python upgrade_role.py USER_EMAIL ROLE")
        print("Example: python upgrade_role.py collin@quome.com admin")
        sys.exit(1)
    
    email = sys.argv[1]
    new_role = sys.argv[2]
    
    # Validate email format (basic check)
    if "@" not in email or "." not in email.split("@")[1]:
        logger.error(f"Invalid email format: {email}")
        sys.exit(1)
    
    # Validate role (basic check - you can expand this list)
    valid_roles = ["immigrant", "student", "professional", "admin", "user"]
    if new_role not in valid_roles:
        logger.warning(f"Role '{new_role}' is not in the standard roles: {valid_roles}")
        logger.warning("Proceeding anyway...")
    
    # Execute the role upgrade
    success = upgrade_user_role(email, new_role)
    
    if success:
        print(f"✅ Successfully updated {email} to role: {new_role}")
        sys.exit(0)
    else:
        print(f"❌ Failed to update {email} to role: {new_role}")
        sys.exit(1)

if __name__ == "__main__":
    main()
