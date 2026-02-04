from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Optional

from database import get_db, User
from auth_utils import verify_token
from unified_auth_middleware import get_current_user_unified

# HTTP Bearer token security scheme
security = HTTPBearer()

get_current_user = get_current_user_unified
# async def get_current_user(
#     credentials: HTTPAuthorizationCredentials = Depends(security),
#     db: Session = Depends(get_db)
# ) -> User:
#     """Get the current authenticated user from JWT token"""
    
#     # Verify the token
#     payload = verify_token(credentials.credentials)
    
#     # Extract user information from token
#     user_id: Optional[int] = payload.get("sub")
#     if user_id is None:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Could not validate credentials",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
    
#     # Get user from database
#     user = db.query(User).filter(User.id == int(user_id)).first()
#     if user is None:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="User not found",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
    
#     if not user.is_active:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Inactive user"
#         )
    
#     return user

async def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """Get the current active user (additional check for active status)"""
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def require_auth(current_user: User = Depends(get_current_user)) -> User:
    """Dependency that requires authentication - use this to protect routes"""
    return current_user

def require_verified_user(current_user: User = Depends(get_current_user)) -> User:
    """Dependency that requires a verified user account"""
    if not current_user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email verification required"
        )
    return current_user

def require_admin_user(current_user: User = Depends(get_current_user)) -> User:
    """Dependency that requires admin role - use this to protect admin routes"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user 