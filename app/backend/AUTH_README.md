# JWT Authentication System

This document describes the JWT-based authentication system implemented for the Pioneer API.

## Overview

The authentication system provides secure user registration, login, and route protection using JWT (JSON Web Tokens). It includes:

- User registration with password hashing
- User login with JWT token generation
- Route protection middleware
- Token refresh functionality
- Secure password storage

## Features

### ✅ Implemented Features

- **User Registration** (`POST /api/auth/register`)
- **User Login** (`POST /api/auth/login`)
- **JWT Token Generation** with configurable expiration
- **Password Hashing** using bcrypt
- **Protected Routes** with middleware
- **Token Refresh** functionality
- **User Profile** access (`GET /api/auth/me`)
- **Password Strength Validation**
- **Email/Username Uniqueness** validation

## API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "username",
  "first_name": "John",
  "last_name": "Doe",
  "is_active": true,
  "is_verified": false
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "username",
  "first_name": "John",
  "last_name": "Doe",
  "is_active": true,
  "is_verified": false
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Logout
```http
POST /api/auth/logout
```

## Protecting Routes

### Using the Authentication Middleware

To protect a route, import and use the authentication dependencies:

```python
from fastapi import APIRouter, Depends
from auth_middleware import require_auth, get_current_user
from database import User

router = APIRouter()

@router.get("/protected-endpoint")
def protected_route(current_user: User = Depends(require_auth)):
    """This route requires authentication"""
    return {
        "message": "This is a protected route",
        "user": current_user.username
    }

@router.get("/user-specific-data")
def user_data(current_user: User = Depends(get_current_user)):
    """Access current user information"""
    return {
        "user_id": current_user.id,
        "email": current_user.email,
        "username": current_user.username
    }
```

### Available Authentication Dependencies

- `require_auth()` - Basic authentication requirement
- `get_current_user()` - Get the current authenticated user
- `get_current_active_user()` - Ensure user is active
- `require_verified_user()` - Require email verification

## Configuration

### Environment Variables

Set these environment variables for production:

```bash
# Secret key for JWT signing (REQUIRED in production)
SECRET_KEY=your-super-secret-key-change-in-production

# Database URL
DATABASE_URL=postgresql://user:password@localhost:5432/pioneer

# Token expiration (optional, defaults to 30 minutes)
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Security Best Practices

1. **Secret Key**: Always use a strong, unique secret key in production
2. **HTTPS**: Use HTTPS in production to protect tokens in transit
3. **Token Storage**: Store tokens securely on the client side
4. **Token Expiration**: Use appropriate token expiration times
5. **Password Strength**: Enforce strong password requirements

## Database Schema

### User Model

```python
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    first_name = Column(String)
    last_name = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
```

## Testing

### Running Authentication Tests

Use the provided test script to verify the authentication system:

```bash
# Make sure the API server is running
cd app/backend
python test_auth.py
```

### Manual Testing with curl

#### Register a user:
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "testpassword123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

#### Login:
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

#### Access protected route:
```bash
curl -X GET "http://localhost:8000/api/auth/me" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Error Handling

### Common Error Responses

#### 400 Bad Request
- Email already registered
- Username already taken
- Password too weak
- Invalid input data

#### 401 Unauthorized
- Invalid credentials
- Invalid or expired token
- Missing authorization header

#### 403 Forbidden
- Account not verified (when verification required)
- Inactive user account

#### 404 Not Found
- User not found

#### 500 Internal Server Error
- Database connection issues
- Server configuration problems

## Implementation Files

- `auth_utils.py` - Password hashing and JWT utilities
- `auth_middleware.py` - Authentication middleware and dependencies
- `routers/auth.py` - Authentication endpoints
- `database.py` - User model definition
- `test_auth.py` - Authentication system tests

## Future Enhancements

Potential improvements for the authentication system:

- Email verification workflow
- Password reset functionality
- Two-factor authentication (2FA)
- Session management
- Rate limiting for login attempts
- OAuth integration (Google, GitHub, etc.)
- User roles and permissions
- Account lockout after failed attempts

## Troubleshooting

### Common Issues

1. **"Could not validate credentials"**
   - Check if the token is included in the Authorization header
   - Verify the token hasn't expired
   - Ensure the SECRET_KEY matches between token creation and validation

2. **"Email already registered"**
   - The email address is already in use
   - Try with a different email or use the login endpoint

3. **"Password must be at least 8 characters long"**
   - Ensure the password meets minimum length requirements
   - Consider implementing additional password strength checks

4. **Database connection errors**
   - Verify the DATABASE_URL is correct
   - Ensure the database server is running
   - Check database permissions

### Debug Mode

For debugging, you can enable token debugging by setting the engine echo to True in `database.py`:

```python
engine = create_engine(DATABASE_URL, echo=True)  # Shows SQL queries
``` 