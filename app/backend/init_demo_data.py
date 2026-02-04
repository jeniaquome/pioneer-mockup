#!/usr/bin/env python3
"""
Demo data initialization script for the Customer Pioneer application.
This script can be run standalone or imported to initialize demo data.
"""

import os
import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from demo_service import run_demo_setup, clear_all_data

def main():
    """Main function to handle command line arguments and run demo setup"""
    if len(sys.argv) > 1:
        if sys.argv[1] == "--clear":
            print("🗑️ Clearing all demo data...")
            clear_all_data()
            print("✅ Demo data cleared successfully!")
        elif sys.argv[1] == "--help":
            print("Demo Data Initialization Script")
            print("Usage:")
            print("  python init_demo_data.py        # Initialize demo data")
            print("  python init_demo_data.py --clear # Clear all demo data")
            print("  python init_demo_data.py --help  # Show this help")
        else:
            print(f"Unknown argument: {sys.argv[1]}")
            print("Use --help for usage information")
            sys.exit(1)
    else:
        print("🚀 Initializing demo data...")
        run_demo_setup()

if __name__ == "__main__":
    main() 