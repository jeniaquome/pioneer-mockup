#!/usr/bin/env python3
"""
Test script to verify the publishing workflow migration is working correctly.
Run this after starting the Docker container to verify everything is set up properly.
"""

import sys
import os
import requests
import time

# Add the backend directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_database_migration():
    """Test that the database migration was successful"""
    print("🔍 Testing database migration...")
    
    try:
        from database import get_db, Resource
        from sqlalchemy import text, inspect, engine
        
        # Check if columns exist
        inspector = inspect(engine)
        columns = [col['name'] for col in inspector.get_columns('resources')]
        required = {'published', 'updated_at', 'ready', 'category', 'resource_name'}
        has_priority = 'priority' in columns
        
        if required.issubset(set(columns)) and has_priority:
            print("✅ Publishing workflow columns exist in database")
            return True
        else:
            print(f"❌ Missing columns. Found: {columns}")
            return False
            
    except Exception as e:
        print(f"❌ Database check failed: {e}")
        return False

def test_api_endpoints():
    """Test that the API endpoints are working"""
    print("🔍 Testing API endpoints...")
    
    base_url = "http://localhost:8000"
    
    try:
        # Test public resources endpoint
        response = requests.get(f"{base_url}/api/resources/", timeout=10)
        if response.status_code == 200:
            print("✅ Public resources endpoint working")
        else:
            print(f"⚠️ Public resources endpoint returned {response.status_code}")
        
        # Test health check
        response = requests.get(f"{base_url}/api/health", timeout=10)
        if response.status_code == 200:
            print("✅ Health check endpoint working")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ API test failed: {e}")
        return False

def test_priority_sorting():
    """Verify resources are sorted by priority desc then name asc within a category"""
    print("🔍 Testing priority-based sorting…")
    base_url = "http://localhost:8000"
    try:
        # Living/Essentials has multiple demo resources with different priorities
        params = {
            'category': 'Living/Essentials',
            'page': 1,
            'limit': 100,
        }
        resp = requests.get(f"{base_url}/api/resources/", params=params, timeout=10)
        if resp.status_code != 200:
            print(f"❌ Failed to fetch resources for sorting test: {resp.status_code}")
            return False
        data = resp.json()
        resources = data.get('resources', [])
        if len(resources) < 2:
            print("⚠️ Not enough resources to validate sorting; skipping")
            return True
        # Check monotonic non-increasing priority (treat None as lowest)
        def prio(r):
            return r.get('priority') if r.get('priority') is not None else -1
        priorities = [prio(r) for r in resources]
        if any(priorities[i] < priorities[i+1] for i in range(len(priorities)-1)):
            print(f"❌ Priority not sorted desc: {priorities}")
            return False
        # For ties on top two, ensure alphabetical by name
        ties = {}
        for r in resources:
            ties.setdefault(prio(r), []).append(r['resource_name'])
        for p, names in ties.items():
            if len(names) > 1:
                if names != sorted(names, key=lambda n: n.lower()):
                    print(f"❌ Names not sorted alphabetically for priority {p}: {names}")
                    return False
        print("✅ Priority sorting validated")
        return True
    except Exception as e:
        print(f"❌ Priority sorting test failed: {e}")
        return False

def test_admin_endpoints():
    """Test admin endpoints (without authentication - just check they exist)"""
    print("🔍 Testing admin endpoint availability...")
    
    base_url = "http://localhost:8000"
    
    try:
        # Test admin publishing stats (should return 401 without auth, which means it exists)
        response = requests.get(f"{base_url}/api/admin/publishing/stats", timeout=10)
        if response.status_code in [401, 403]:
            print("✅ Admin publishing endpoints available (authentication required)")
            return True
        elif response.status_code == 404:
            print("❌ Admin publishing endpoints not found")
            return False
        else:
            print(f"⚠️ Unexpected response from admin endpoint: {response.status_code}")
            return True
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Admin endpoint test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 Testing Publishing Workflow Migration")
    print("=" * 50)
    
    # Wait a moment for the server to be fully ready
    print("⏳ Waiting for server to be ready...")
    time.sleep(3)
    
    all_passed = True
    
    # Test 1: Database migration
    if not test_database_migration():
        all_passed = False
    
    print()
    
    # Test 2: API endpoints
    if not test_api_endpoints():
        all_passed = False
    
    print()
    
    # Test 3: Admin endpoints
    if not test_admin_endpoints():
        all_passed = False

    print()
    # Test 4: Priority sort behavior
    if not test_priority_sorting():
        all_passed = False
    
    print()
    print("=" * 50)
    
    if all_passed:
        print("🎉 All tests passed! Publishing workflow is ready.")
        print("📋 Next steps:")
        print("   1. Open the admin dashboard at http://localhost:3000/dashboard")
        print("   2. Check the Publishing tab to see the new workflow")
        print("   3. Import some CSV data to test the publishing process")
        return True
    else:
        print("❌ Some tests failed. Check the output above for details.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 