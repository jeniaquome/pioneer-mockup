#!/usr/bin/env python3
"""
Database migration script for Pittsburgh Tomorrow Pioneer application.
Handles migration from SQLite to PostgreSQL and schema creation.
"""

import os
import sys
import json
import sqlite3
from pathlib import Path
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
import logging

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from database import (
    engine, SessionLocal, create_tables, get_database_url, is_postgresql,
    Resource, Category, ScreeningResponse, Checklist, ChatMessage, UserProgress, UserPreferences
)
logger = logging.getLogger(__name__)

def migrate_from_sqlite_to_postgresql(sqlite_path="test.db"):
    """Migrate data from SQLite to PostgreSQL"""
    if not os.path.exists(sqlite_path):
        print(f"SQLite database not found at {sqlite_path}")
        return
    
    if not is_postgresql():
        print("Target database is not PostgreSQL, skipping migration")
        return
    
    logger.info(f"Starting migration from SQLite ({sqlite_path}) to PostgreSQL…")
    
    # Connect to SQLite
    sqlite_conn = sqlite3.connect(sqlite_path)
    sqlite_conn.row_factory = sqlite3.Row  # Enable column access by name
    sqlite_cursor = sqlite_conn.cursor()
    
    # Connect to PostgreSQL
    pg_session = SessionLocal()
    
    try:
        # Migrate resources
        logger.info("Migrating resources…")
        sqlite_cursor.execute("SELECT * FROM resources")
        resources = sqlite_cursor.fetchall()
        for row in resources:
            resource = Resource(
                id=row['id'],
                name=row['name'],
                description=row['description'],
                short_description=row['short_description'],
                categories=row['categories'],
                languages=row['languages'],
                location=row['location'],
                phone=row['phone'],
                email=row['email'],
                website=row['website'],
                address=row['address']
            )
            pg_session.merge(resource)
        
        # Migrate categories
        logger.info("Migrating categories…")
        sqlite_cursor.execute("SELECT * FROM categories")
        categories = sqlite_cursor.fetchall()
        for row in categories:
            category = Category(
                id=row['id'],
                name=row['name'],
                description=row['description'],
                icon=row['icon']
            )
            pg_session.merge(category)
        
        # Migrate screening responses
        logger.info("Migrating screening responses…")
        sqlite_cursor.execute("SELECT * FROM screening_responses")
        responses = sqlite_cursor.fetchall()
        for row in responses:
            response = ScreeningResponse(
                id=row['id'],
                user_id=row['user_id'],
                responses=row['responses'],
                recommendations=row['recommendations']
            )
            pg_session.merge(response)
        
        # Migrate checklists
        logger.info("Migrating checklists…")
        sqlite_cursor.execute("SELECT * FROM checklists")
        checklists = sqlite_cursor.fetchall()
        for row in checklists:
            checklist = Checklist(
                id=row['id'],
                name=row['name'],
                description=row['description'],
                items=row['items']
            )
            pg_session.merge(checklist)
        
        # Migrate chat messages
        logger.info("Migrating chat messages…")
        try:
            sqlite_cursor.execute("SELECT * FROM chat_messages")
            messages = sqlite_cursor.fetchall()
            for row in messages:
                message = ChatMessage(
                    id=row['id'],
                    session_id=row['session_id'],
                    message=row['message'],
                    sender=row['sender']
                )
                pg_session.merge(message)
        except sqlite3.OperationalError:
            logger.info("Chat messages table not found in SQLite, skipping…")
        
        # Migrate user progress
        logger.info("Migrating user progress…")
        try:
            sqlite_cursor.execute("SELECT * FROM user_progress")
            progress_records = sqlite_cursor.fetchall()
            for row in progress_records:
                progress = UserProgress(
                    id=row['id'],
                    checklist_id=row['checklist_id'],
                    progress_data=row['progress_data']
                )
                pg_session.merge(progress)
        except sqlite3.OperationalError:
            logger.info("User progress table not found in SQLite, skipping…")
        
        # Migrate user preferences
        logger.info("Migrating user preferences…")
        try:
            sqlite_cursor.execute("SELECT * FROM user_preferences")
            preferences = sqlite_cursor.fetchall()
            for row in preferences:
                pref = UserPreferences(
                    id=row['id'],
                    checklist_id=row['checklist_id'],
                    language_preference=row['language_preference'],
                    accessibility_settings=row['accessibility_settings'],
                    notification_settings=row['notification_settings']
                )
                pg_session.merge(pref)
        except sqlite3.OperationalError:
            logger.info("User preferences table not found in SQLite, skipping…")
        
        # Commit all changes
        pg_session.commit()
        logger.info("Migration completed successfully!")
        
    except Exception as e:
        pg_session.rollback()
        logger.error(f"Migration failed: {e}")
        raise
    finally:
        sqlite_conn.close()
        pg_session.close()

def create_database_schema():
    """Create database tables"""
    logger.info("Creating database schema…")
    logger.info("CLI: starting create_tables() …")
    try:
        create_tables()
        logger.info("CLI: finished create_tables().")
        logger.info("Database schema created successfully!")
    except SQLAlchemyError as e:
        logger.error(f"Failed to create schema: {e}")
        raise

def check_database_status():
    """Check database status and show table counts"""
    logger.info("Database Status")
    logger.info("=" * 40)
    logger.info(f"Database URL: {get_database_url()}")
    logger.info(f"Database Type: {'PostgreSQL' if is_postgresql() else 'SQLite'}")
    logger.info("")
    
    session = SessionLocal()
    try:
        # Check each table
        tables = [
            (Resource, "Resources"),
            (Category, "Categories"),
            (ScreeningResponse, "Screening Responses"),
            (Checklist, "Checklists"),
            (ChatMessage, "Chat Messages"),
            (UserProgress, "User Progress"),
            (UserPreferences, "User Preferences")
        ]
        
        for model, name in tables:
            try:
                count = session.query(model).count()
                logger.info(f"  {name:<20}: {count:>5} records")
            except Exception as e:
                logger.warning(f"  {name:<20}: Error - {e}")
        
    finally:
        session.close()

def main():
    """Main function to handle command line arguments"""

    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == "create":
            create_database_schema()
        elif command == "migrate":
            sqlite_path = sys.argv[2] if len(sys.argv) > 2 else "test.db"
            create_database_schema()
            migrate_from_sqlite_to_postgresql(sqlite_path)
        elif command == "status":
            check_database_status()
        elif command == "--help":
            print("Database Migration Script for Pittsburgh Tomorrow Pioneer Application")
            print()
            print("Usage:")
            print("  python migrate_database.py create              # Create database schema")
            print("  python migrate_database.py migrate [sqlite_db] # Create schema and migrate from SQLite")
            print("  python migrate_database.py status              # Show database status")
            print("  python migrate_database.py --help              # Show this help")
            print()
            print("Environment Variables:")
            print("  DATABASE_URL - PostgreSQL connection string (default: sqlite:///./test.db)")
        else:
            print(f"Unknown command: {command}")
            print("Use --help for usage information")
            sys.exit(1)
    else:
        # Default: create schema
        create_database_schema()

if __name__ == "__main__":
    main() 