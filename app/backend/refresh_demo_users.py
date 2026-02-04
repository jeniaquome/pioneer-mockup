#!/usr/bin/env python3
"""
Script to refresh demo user survey responses to ensure completeness.
This fixes issues where demo users have incomplete survey data.

Usage:
    python refresh_demo_users.py
"""

import sys
import os

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def main():
    """Main function to refresh demo user data"""
    try:
        print("🔄 Starting demo user data refresh...")
        
        # Import and call the refresh function
        from demo_service import refresh_demo_user_data
        refresh_demo_user_data()
        
        print("✅ Demo user data refresh completed successfully!")
        
    except Exception as e:
        print(f"❌ Failed to refresh demo user data: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
