#!/usr/bin/env python3
"""
Management script for Customer Pioneer application.
Provides commands for database management, demo data, and other operations.
"""

import sys
import os
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

def show_help():
    """Display help information"""
    print("Customer Pioneer Management Script")
    print("=" * 40)
    print()
    print("Usage: python manage.py <command> [options]")
    print()
    print("Commands:")
    print("  init-demo     Initialize demo data in the database")
    print("  clear-demo    Clear all demo data from the database")
    print("  reset-demo    Clear and reinitialize demo data")
    print("  db-status     Show database status and table counts")
    print("  help          Show this help message")
    print()
    print("Examples:")
    print("  python manage.py init-demo")
    print("  python manage.py clear-demo")
    print("  python manage.py db-status")

def init_demo_data():
    """Initialize demo data"""
    try:
        from demo_service import run_demo_setup
        print("🚀 Initializing demo data...")
        run_demo_setup()
        print("✅ Demo data initialization completed successfully!")
    except Exception as e:
        print(f"❌ Failed to initialize demo data: {e}")
        sys.exit(1)

def clear_demo_data():
    """Clear demo data"""
    try:
        from demo_service import clear_all_data
        print("🗑️ Clearing demo data...")
        clear_all_data()
        print("✅ Demo data cleared successfully!")
    except Exception as e:
        print(f"❌ Failed to clear demo data: {e}")
        sys.exit(1)

def reset_demo_data():
    """Reset demo data (clear and reinitialize)"""
    print("🔄 Resetting demo data...")
    clear_demo_data()
    init_demo_data()
    print("✅ Demo data reset completed!")

def show_db_status():
    """Show database status"""
    try:
        import sqlite3
        from demo_service import DATABASE_PATH
        
        if not os.path.exists(DATABASE_PATH):
            print(f"❌ Database not found at: {DATABASE_PATH}")
            return
        
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        print("📊 Database Status")
        print("=" * 30)
        print(f"Database path: {DATABASE_PATH}")
        print(f"Database size: {os.path.getsize(DATABASE_PATH)} bytes")
        print()
        
        # Check each table
        tables = ['resources', 'categories', 'checklists', 'chat_messages', 'screening_responses']
        
        for table in tables:
            try:
                cursor.execute(f"SELECT COUNT(*) FROM {table}")
                count = cursor.fetchone()[0]
                print(f"  {table:<20}: {count:>5} records")
            except sqlite3.OperationalError:
                print(f"  {table:<20}: Table not found")
        
        conn.close()
        print()
        
    except Exception as e:
        print(f"❌ Failed to check database status: {e}")

def main():
    """Main function to handle command routing"""
    if len(sys.argv) < 2:
        show_help()
        return
    
    command = sys.argv[1].lower()
    
    commands = {
        'init-demo': init_demo_data,
        'clear-demo': clear_demo_data,
        'reset-demo': reset_demo_data,
        'db-status': show_db_status,
        'help': show_help,
        '--help': show_help,
        '-h': show_help
    }
    
    if command in commands:
        commands[command]()
    else:
        print(f"❌ Unknown command: {command}")
        print("Use 'python manage.py help' for available commands")
        sys.exit(1)

if __name__ == "__main__":
    main() 