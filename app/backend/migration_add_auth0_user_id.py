#!/usr/bin/env python3
"""
Migration: Add auth0_user_id field to users table
"""

import os
import sys
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Add the backend directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import DATABASE_URL

def run_migration():
    """Add auth0_user_id column to users table"""
    
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as connection:
        # Start a transaction
        trans = connection.begin()
        
        try:
            # Check if the column already exists
            result = connection.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'users' AND column_name = 'auth0_user_id'
            """))
            
            if result.fetchone():
                print("Column 'auth0_user_id' already exists in users table")
                trans.rollback()
                return
            
            # Add the auth0_user_id column
            connection.execute(text("""
                ALTER TABLE users 
                ADD COLUMN auth0_user_id VARCHAR(255) UNIQUE
            """))
            
            # Make hashed_password nullable to support Auth0 users
            connection.execute(text("""
                ALTER TABLE users 
                ALTER COLUMN hashed_password DROP NOT NULL
            """))
            
            # Make username nullable and remove uniqueness constraint
            # First drop the unique constraint
            connection.execute(text("""
                ALTER TABLE users 
                DROP CONSTRAINT IF EXISTS users_username_key
            """))
            
            # Then make username nullable
            connection.execute(text("""
                ALTER TABLE users 
                ALTER COLUMN username DROP NOT NULL
            """))
            
            # Create an index on the new column for performance
            connection.execute(text("""
                CREATE INDEX idx_users_auth0_user_id ON users(auth0_user_id)
            """))
            
            print("Successfully added auth0_user_id column, made hashed_password and username nullable, and removed username uniqueness constraint")
            
            # Commit the transaction
            trans.commit()
            
        except Exception as e:
            print(f"Error during migration: {e}")
            trans.rollback()
            raise

if __name__ == "__main__":
    run_migration()
