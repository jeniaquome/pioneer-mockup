from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any

from database import get_db, User
from auth0_utils import verify_auth0_token, get_user_info_from_token

# HTTP Bearer token security scheme
security = HTTPBearer()

async def get_current_user_auth0(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Get the current authenticated user from Auth0 JWT token"""
    
    # Verify the Auth0 token
    payload = verify_auth0_token(credentials.credentials)
    
    # Extract user information from token
    auth0_user_id = payload.get("sub")
    if not auth0_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials - missing user ID",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Try to find user by Auth0 user ID first
    user = db.query(User).filter(User.auth0_user_id == auth0_user_id).first()
    
    if not user:
        # If user doesn't exist, try to find by email as fallback
        email = payload.get("email")
        if email:
            user = db.query(User).filter(User.email == email).first()
            
            # If found by email, update with Auth0 user ID
            if user:
                user.auth0_user_id = auth0_user_id
                db.commit()
                db.refresh(user)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found in database. Please complete registration.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    return user

async def get_current_active_user_auth0(current_user: User = Depends(get_current_user_auth0)) -> User:
    """Get the current active user (additional check for active status)"""
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def get_current_admin_user_auth0(current_user: User = Depends(get_current_user_auth0)) -> User:
    """Get the current user and verify admin role"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

