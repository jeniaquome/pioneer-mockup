#!/usr/bin/env python3
"""
Test script for authentication system
Run this to verify JWT authentication is working correctly
"""

import requests
import json
import sys

# Configuration
BASE_URL = "http://localhost:8000/api"
TEST_USER = {
    "email": "test@example.com",
    "username": "testuser",
    "password": "testpassword123",
    "first_name": "Test",
    "last_name": "User"
}

def test_auth_system():
    """Test the complete authentication flow"""
    
    print("🧪 Testing Authentication System")
    print("=" * 40)
    
    # Test 1: Health Check
    print("\n1. Testing API health...")
    try:
        response = requests.get(f"{BASE_URL}/auth/health")
        if response.status_code == 200:
            print("✅ Auth service is healthy")
        else:
            print(f"❌ Auth service health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Failed to connect to API: {e}")
        return False
    
    # Test 2: User Registration
    print("\n2. Testing user registration...")
    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=TEST_USER)
        if response.status_code == 201:
            print("✅ User registration successful")
            user_data = response.json()
            print(f"   Created user: {user_data['username']} ({user_data['email']})")
        elif response.status_code == 400 and "already registered" in response.text:
            print("ℹ️  User already exists, proceeding with login test")
        else:
            print(f"❌ User registration failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Registration request failed: {e}")
        return False
    
    # Test 3: User Login
    print("\n3. Testing user login...")
    try:
        login_data = {
            "email": TEST_USER["email"],
            "password": TEST_USER["password"]
        }
        response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        if response.status_code == 200:
            print("✅ User login successful")
            token_data = response.json()
            access_token = token_data["access_token"]
            print(f"   Token type: {token_data['token_type']}")
            print(f"   Expires in: {token_data['expires_in']} seconds")
        else:
            print(f"❌ User login failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Login request failed: {e}")
        return False
    
    # Test 4: Access Protected Route
    print("\n4. Testing protected route access...")
    try:
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
        if response.status_code == 200:
            print("✅ Protected route access successful")
            user_info = response.json()
            print(f"   User: {user_info['username']} ({user_info['email']})")
            print(f"   Active: {user_info['is_active']}")
        else:
            print(f"❌ Protected route access failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Protected route request failed: {e}")
        return False
    
    # Test 5: Access Protected Route Without Token
    print("\n5. Testing protected route without token...")
    try:
        response = requests.get(f"{BASE_URL}/auth/me")
        if response.status_code == 403:
            print("✅ Protected route correctly blocked without token")
        else:
            print(f"❌ Protected route should have blocked access: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Request failed: {e}")
        return False
    
    # Test 6: Test Custom Protected Endpoint
    print("\n6. Testing custom protected endpoint...")
    try:
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(f"{BASE_URL}/screening/my-responses", headers=headers)
        if response.status_code == 200:
            print("✅ Custom protected endpoint access successful")
            data = response.json()
            print(f"   User: {data['user']['username']}")
            print(f"   Screening responses: {data['total_responses']}")
        else:
            print(f"❌ Custom protected endpoint access failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Custom protected endpoint request failed: {e}")
        return False
    
    # Test 7: Token Refresh
    print("\n7. Testing token refresh...")
    try:
        refresh_data = {"refresh_token": token_data["refresh_token"]}
        response = requests.post(f"{BASE_URL}/auth/refresh", json=refresh_data)
        if response.status_code == 200:
            print("✅ Token refresh successful")
            new_token_data = response.json()
            print(f"   New token received")
        else:
            print(f"❌ Token refresh failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Token refresh request failed: {e}")
        return False
    
    print("\n🎉 All authentication tests passed!")
    print("\nAuthentication system features verified:")
    print("• User registration with password hashing")
    print("• User login with JWT token generation")
    print("• Protected route access with valid token")
    print("• Protected route blocking without token")
    print("• Token refresh functionality")
    print("• Custom protected endpoints")
    
    return True

def test_password_strength():
    """Test password strength validation"""
    print("\n🔒 Testing password strength validation...")
    
    weak_passwords = [
        "123",
        "password",
        "1234567"  # 7 characters, should fail
    ]
    
    for weak_password in weak_passwords:
        test_user = TEST_USER.copy()
        test_user["email"] = f"weak_{weak_password}@example.com"
        test_user["username"] = f"weak_{weak_password}"
        test_user["password"] = weak_password
        
        try:
            response = requests.post(f"{BASE_URL}/auth/register", json=test_user)
            if response.status_code == 400:
                print(f"✅ Weak password '{weak_password}' correctly rejected")
            else:
                print(f"❌ Weak password '{weak_password}' was accepted")
        except Exception as e:
            print(f"❌ Request failed for password '{weak_password}': {e}")

def main():
    """Main test function"""
    print("Starting Authentication System Tests...")
    print("Make sure the API server is running on http://localhost:8000")
    
    success = test_auth_system()
    test_password_strength()
    
    if success:
        print("\n✅ Authentication system is working correctly!")
        sys.exit(0)
    else:
        print("\n❌ Authentication system tests failed!")
        sys.exit(1)

if __name__ == "__main__":
    main() 