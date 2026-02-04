#!/usr/bin/env python3
"""
Migration: Make hashed_password nullable in users table
"""

import os
import sys
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Add the backend directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import DATABASE_URL

def run_migration():
    """Make hashed_password nullable in users table"""
    
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as connection:
        # Start a transaction
        trans = connection.begin()
        
        try:
            # Check current constraint status
            result = connection.execute(text("""
                SELECT is_nullable 
                FROM information_schema.columns 
                WHERE table_name = 'users' AND column_name = 'hashed_password'
            """))
            
            row = result.fetchone()
            if row and row[0] == 'YES':
                print("Column 'hashed_password' is already nullable")
                trans.rollback()
                return
            
            # Make hashed_password nullable
            connection.execute(text("""
                ALTER TABLE users 
                ALTER COLUMN hashed_password DROP NOT NULL
            """))
            
            print("Successfully made hashed_password nullable in users table")
            
            # Commit the transaction
            trans.commit()
            
        except Exception as e:
            print(f"Error during migration: {e}")
            trans.rollback()
            raise

if __name__ == "__main__":
    run_migration()
