from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional
import httpx
import os

from database import get_db, User
from auth_utils import verify_token as verify_legacy_token
from auth0_utils import verify_auth0_token

# HTTP Bearer token security scheme
security = HTTPBearer()

def is_auth0_token(token: str) -> bool:
    """Check if a token is an Auth0 token by examining its structure"""
    try:
        # Auth0 tokens typically have 3 parts and specific issuer
        parts = token.split('.')
        if len(parts) != 3:
            return False
        
        # Try to decode header without verification to check issuer
        import jwt
        unverified_header = jwt.get_unverified_header(token)
        unverified_payload = jwt.decode(token, options={"verify_signature": False})
        
        # Check if it has Auth0-specific claims
        issuer = unverified_payload.get('iss', '')
        return 'auth0.com' in issuer or unverified_payload.get('aud') == 'https://dev-avaj5txvnbjvx2r1.us.auth0.com/api/v2/'
    except:
        return False

class BasicAuth0UserInfo(BaseModel):
    sub: str
    given_name: Optional[str] = None
    family_name: Optional[str] = None
    nickname: Optional[str] = None
    name: Optional[str] = None
    picture: Optional[str] = None
    updated_at: Optional[str] = None
    email: str
    email_verified: bool

async def get_auth0_user_info(token: str) -> Optional[BasicAuth0UserInfo]:
    """Get user info from Auth0 userinfo endpoint using async HTTP client"""
    auth0_domain = os.environ.get("AUTH0_DOMAIN", "dev-avaj5txvnbjvx2r1.us.auth0.com")
    userinfo_url = f"https://{auth0_domain}/userinfo"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                userinfo_url,
                headers={'Authorization': f'Bearer {token}'},
                timeout=10.0
            )
            response.raise_for_status()
            return BasicAuth0UserInfo.model_validate(response.json())
        except httpx.HTTPError as e:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Failed to fetch user info from Auth0: {str(e)}"
            )

async def get_current_user_unified(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Get the current authenticated user from either Auth0 or legacy JWT token"""
    
    token = credentials.credentials
    
    # Determine token type and verify accordingly
    if is_auth0_token(token):
        # Handle Auth0 token
        try:
            payload = verify_auth0_token(token)
            
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
                auth0_user_info = await get_auth0_user_info(token)
                
                # If user doesn't exist, try to find by email as fallback
                email = auth0_user_info.email if auth0_user_info else None
                if email:
                    user = db.query(User).filter(User.email == email).first()
                    
                    # If found by email, update with Auth0 user ID
                    if user:
                        user.auth0_user_id = auth0_user_id
                        db.commit()
                        db.refresh(user)
            
            # If user still doesn't exist, create a new one from Auth0 user info
            if not user and auth0_user_info:
                # Create new user
                user = User(
                    email=auth0_user_info.email,
                    auth0_user_id=auth0_user_id,
                    first_name=auth0_user_info.given_name,
                    last_name=auth0_user_info.family_name,
                    is_active=True,
                    is_verified=auth0_user_info.email_verified,
                    hashed_password=None  # No password for Auth0 users
                )
                
                db.add(user)
                db.commit()
                db.refresh(user)
            
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found in database and could not create user from Auth0 info.",
                    headers={"WWW-Authenticate": "Bearer"},
                )
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Auth0 token validation failed: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )
    else:
        # Handle legacy token
        try:
            payload = verify_legacy_token(token)
            
            # Extract user information from token
            user_id: Optional[int] = payload.get("sub")
            if user_id is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Could not validate credentials",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            
            # Get user from database
            user = db.query(User).filter(User.id == int(user_id)).first()
            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="User not found",
                    headers={"WWW-Authenticate": "Bearer"},
                )
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Legacy token validation failed: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    return user

async def get_current_active_user_unified(current_user: User = Depends(get_current_user_unified)) -> User:
    """Get the current active user (additional check for active status)"""
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def get_current_admin_user_unified(current_user: User = Depends(get_current_user_unified)) -> User:
    """Get the current user and verify admin role"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user
