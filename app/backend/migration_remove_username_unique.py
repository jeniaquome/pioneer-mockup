#!/usr/bin/env python3
"""
Migration: Remove username uniqueness constraint from users table
"""

import os
import sys
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Add the backend directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import DATABASE_URL

def run_migration():
    """Remove username uniqueness constraint from users table"""
    
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as connection:
        # Start a transaction
        trans = connection.begin()
        
        try:
            # Check if unique constraint exists
            result = connection.execute(text("""
                SELECT constraint_name 
                FROM information_schema.table_constraints 
                WHERE table_name = 'users' 
                AND constraint_type = 'UNIQUE' 
                AND constraint_name LIKE '%username%'
            """))
            
            constraints = result.fetchall()
            if not constraints:
                print("No username uniqueness constraint found")
                trans.rollback()
                return
            
            # Drop the unique constraint(s)
            for constraint in constraints:
                constraint_name = constraint[0]
                connection.execute(text(f"""
                    ALTER TABLE users 
                    DROP CONSTRAINT IF EXISTS {constraint_name}
                """))
                print(f"Dropped constraint: {constraint_name}")
            
            print("Successfully removed username uniqueness constraint from users table")
            
            # Commit the transaction
            trans.commit()
            
        except Exception as e:
            print(f"Error during migration: {e}")
            trans.rollback()
            raise

if __name__ == "__main__":
    run_migration()
