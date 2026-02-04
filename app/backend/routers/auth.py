from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional, Any, Dict
from datetime import timedelta, datetime

from database import get_db, User
from auth_utils import verify_password, get_password_hash, create_access_token, create_refresh_token, ACCESS_TOKEN_EXPIRE_MINUTES
from auth_middleware import get_current_user
from auth0_middleware import get_current_user_auth0
from auth0_utils import verify_auth0_token, get_user_info_from_token
from unified_auth_middleware import get_current_user_unified
from email_service import email_service

# Import security from auth middleware
from auth_middleware import security

router = APIRouter()

# Language mapping from display names to language codes
LANGUAGE_DISPLAY_TO_CODE_MAP = {
    'English (native/fluent)': 'en',
    'Spanish': 'es',
    'Arabic': 'ar',
    'French': 'fr',
    'Nepali/Bhutanese': 'ne',
    'Dari/Pashto (Afghan languages)': 'ps',
    'Uzbek': 'uz',
    # New languages
    'Farsi': 'fa',
    'Persian': 'fa',
    'Japanese': 'ja',
    'German': 'de',
    'Portuguese': 'pt',
    'Russian': 'ru',
    'Urdu': 'ur',
    # Survey system codes to language codes
    'ne_dz': 'ne',  # Nepali/Dzongkha -> Nepali
    'fa_ps': 'fa',  # Farsi/Pashto -> Farsi (updated from 'ps')
    # Legacy mappings for consistency
    'nepali/bhutanese': 'ne',
    'dari/pashto (afghan languages)': 'ps',
    'uzbek': 'uz',
    'nepali': 'ne',
    'pashto': 'ps',
    'dari': 'fa',  # Map Dari to Farsi (closely related)
    'bhutanese': 'ne',
    'farsi': 'fa',
    'persian': 'fa',
    'japanese': 'ja',
    'german': 'de',
    'portuguese': 'pt',
    'russian': 'ru',
    'urdu': 'ur'
}

def normalize_primary_language(language: str) -> str:
    """Normalize language display names to standard language codes"""
    if not language:
        return 'en'
    
    # If it's already a valid language code, return as-is
    valid_codes = ['en', 'es', 'fr', 'zh', 'ar', 'sw', 'ne', 'ps', 'uz', 
                   'fa', 'ja', 'de', 'pt', 'ru', 'ur']
    if language in valid_codes:
        return language
    
    # Try to map from display name to code
    mapped = LANGUAGE_DISPLAY_TO_CODE_MAP.get(language) or LANGUAGE_DISPLAY_TO_CODE_MAP.get(language.lower())
    return mapped if mapped else 'en'

# Pydantic models for request/response
class UserCreate(BaseModel):
    email: EmailStr
    username: Optional[str] = None  # Made optional
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    primary_language: Optional[str] = None
    cultural_background: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    username: Optional[str] = None  # Made optional
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_active: bool
    is_verified: bool
    role: Optional[str] = "user"
    user_type: Optional[str] = None
    primary_language: Optional[str] = "en"
    cultural_background: Optional[str] = None
    is_demo_user: Optional[bool] = False
    created_at: datetime
    # Onboarding fields (Phase 1)
    is_onboarded: bool = False
    first_survey_at: Optional[datetime] = None
    checklist_id: Optional[str] = None
    survey_responses: Optional[Dict[str, Any]] = None
    onboarding_profile: Optional[Dict[str, Any]] = None
    roadmap_summary: Optional[str] = None
    
    # Translation fields
    roadmap_translation_status: Optional[str] = 'not_started'
    last_roadmap_translation_hash: Optional[str] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    expires_in: int

class TokenData(BaseModel):
    email: Optional[str] = None

def get_user_by_email(db: Session, email: str):
    """Get user by email"""
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str):
    """Get user by username"""
    return db.query(User).filter(User.username == username).first()

async def create_user(db: Session, user: UserCreate):
    """Create a new user and send welcome email"""
    hashed_password = get_password_hash(user.password)
    
    # Generate username from email if not provided
    username = user.username
    if not username:
        username = user.email.split('@')[0]
        # Ensure username is unique by appending numbers if needed
        base_username = username
        counter = 1
        while db.query(User).filter(User.username == username).first():
            username = f"{base_username}{counter}"
            counter += 1
    
    db_user = User(
        email=user.email,
        username=username,
        hashed_password=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Send welcome email if email service is configured
    try:
        user_display_name = user.first_name or username or "New User"
        await email_service.send_welcome_email(user_display_name, user.email)
    except Exception as e:
        # Don't fail user creation if email fails
        import logging
        logger = logging.getLogger(__name__)
        logger.warning(f"Failed to send welcome email to {user.email}: {str(e)}")
    
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    """Authenticate a user by email and password"""
    user = get_user_by_email(db, email)
    if not user:
        return False
    # Prevent login for users with null passwords (Auth0 users)
    if user.hashed_password is None:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def is_protected_admin_email(email: str) -> bool:
    """Check if an email is reserved for admin use"""
    admin_emails = ["admin@pioneer.com"]  # Hardcoded protected admin email
    return email.lower() in [e.lower() for e in admin_emails]

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED, summary="Register a new user account")
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user account"""
    
    # Protect admin email addresses from registration
    if is_protected_admin_email(user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This email address is reserved for system administration"
        )
    
    # Check if user with email already exists
    db_user_email = get_user_by_email(db, user.email)
    if db_user_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username already exists (only if username is provided)
    if user.username:
        db_user_username = get_user_by_username(db, user.username)
        if db_user_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
    
    # Validate password strength (basic validation)
    if len(user.password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long"
        )
    
    # Create the user
    try:
        db_user = await create_user(db, user)
        return UserResponse.from_orm(db_user)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user account"
        )

@router.post("/login", response_model=Token, summary="Login and receive access token")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    """Authenticate user and return access token"""
    
    # Authenticate user
    authenticated_user = authenticate_user(db, user.email, user.password)
    if not authenticated_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not authenticated_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user account"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(authenticated_user.id), "email": authenticated_user.email},
        expires_delta=access_token_expires
    )
    
    # Create refresh token
    refresh_token = create_refresh_token(
        data={"sub": str(authenticated_user.id), "email": authenticated_user.email}
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60  # Convert to seconds
    }

@router.get("/me", response_model=UserResponse, summary="Get current user profile")
async def read_users_me(current_user: User = Depends(get_current_user_unified)):
    """Get current authenticated user's profile (supports both Auth0 and legacy tokens)"""
    return UserResponse.from_orm(current_user)

@router.put("/me", response_model=UserResponse, summary="Update current user profile")
async def update_user_profile(
    profile_update: UserUpdate,
    current_user: User = Depends(get_current_user_unified),
    db: Session = Depends(get_db)
):
    """Update current authenticated user's profile"""
    
    # Update the user with the provided fields
    update_data = profile_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        # Normalize primary_language to ensure consistent language codes
        if field == 'primary_language' and value:
            value = normalize_primary_language(value)
        setattr(current_user, field, value)
    
    try:
        db.commit()
        db.refresh(current_user)
        
        # Note: Removed automatic recommendation refresh - Priority Resources are generated on-demand
        
        return UserResponse.from_orm(current_user)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update profile"
        )

@router.post("/refresh", response_model=Token, summary="Refresh access token")
def refresh_access_token(
    refresh_token: str,
    db: Session = Depends(get_db)
):
    """Refresh access token using refresh token"""
    try:
        # Verify refresh token
        from auth_utils import verify_token
        payload = verify_token(refresh_token)
        
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
        
        # Get user from database
        user = db.query(User).filter(User.id == int(user_id)).first()
        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found or inactive"
            )
        
        # Create new tokens
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        new_access_token = create_access_token(
            data={"sub": str(user.id), "email": user.email},
            expires_delta=access_token_expires
        )
        
        new_refresh_token = create_refresh_token(
            data={"sub": str(user.id), "email": user.email}
        )
        
        return {
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "token_type": "bearer",
            "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

@router.post("/logout", summary="Logout user (client-side token deletion)")
def logout_user():
    """Logout user (in a stateless JWT system, this is handled client-side)"""
    return {"message": "Successfully logged out. Please delete the token from client storage."}

# Health check endpoint for auth service
@router.get("/health", summary="Authentication service health check")
def auth_health_check():
    """Health check for authentication service"""
    return {"status": "healthy", "service": "authentication"} 

@router.get("/demo-users", summary="Get demo user credentials")
def get_demo_users():
    """Get available demo user credentials for testing"""
    demo_users = [
        {
            "email": "maria.rodriguez@demo.com",
            "password": "DemoPass123!",
            "role": "immigrant",
            "description": "Recent immigrant from Latin America seeking settlement support",
            "characteristics": ["Spanish speaker", "Family with children", "Seeking employment", "Temporary housing"]
        },
        {
            "email": "david.chen@demo.com", 
            "password": "DemoPass123!",
            "role": "student",
            "description": "International graduate student from China",
            "characteristics": ["Mandarin speaker", "Graduate student", "Campus housing", "Academic focus"]
        },
        {
            "email": "fatima.ahmad@demo.com",
            "password": "DemoPass123!",
            "role": "professional",
            "description": "Tech professional from Middle East",
            "characteristics": ["Arabic speaker", "Software engineer", "Apartment hunting", "Career-focused"]
        },
        {
            "email": "john.doe@demo.com",
            "password": "DemoPass123!",
            "role": "local",
            "description": "Local Pittsburgh social worker helping newcomers",
            "characteristics": ["English speaker", "Social services", "Community advocate", "Resource connector"]
        }
    ]
    
    return {
        "demo_users": demo_users,
        "note": "These are demo accounts for testing different user experiences"
    }

# Auth0 specific routes

class Auth0UserCreate(BaseModel):
    email: str
    username: Optional[str] = None  # Made optional
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    auth0_user_id: str

@router.post("/auth0-user", response_model=UserResponse)
async def create_auth0_user(
    user_data: Auth0UserCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """DEPRECATED: Create or update user from Auth0 authentication
    
    This endpoint is deprecated. User creation is now handled automatically
    in the unified_auth_middleware when a user authenticates with Auth0.
    """
    
    # Verify the Auth0 token first
    try:
        payload = verify_auth0_token(credentials.credentials)
        auth0_user_id = payload.get("sub")
        
        # Ensure the token's user ID matches the request data
        if auth0_user_id != user_data.auth0_user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Token user ID does not match request data"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid Auth0 token: {str(e)}"
        )
    
    # Check if user already exists by Auth0 ID
    existing_user = db.query(User).filter(User.auth0_user_id == user_data.auth0_user_id).first()
    if existing_user:
        return existing_user
    
    # # Check if user exists by email
    # existing_user = db.query(User).filter(User.email == user_data.email).first()
    # if existing_user:
    #     # Update existing user with Auth0 ID
    #     existing_user.auth0_user_id = user_data.auth0_user_id
    #     if user_data.first_name:
    #         existing_user.first_name = user_data.first_name
    #     if user_data.last_name:
    #         existing_user.last_name = user_data.last_name
    #     existing_user.is_verified = True  # Auth0 users are considered verified
        
    #     db.commit()
    #     db.refresh(existing_user)
    #     return existing_user
    
    # Generate username from email if not provided
    username = user_data.username
    if not username:
        username = user_data.email.split('@')[0]
        # Ensure username is unique by appending numbers if needed
        base_username = username
        counter = 1
        while db.query(User).filter(User.username == username).first():
            username = f"{base_username}{counter}"
            counter += 1
    
    # Create new user
    new_user = User(
        email=user_data.email,
        username=username,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        auth0_user_id=user_data.auth0_user_id,
        is_active=True,
        is_verified=True,  # Auth0 users are considered verified
        hashed_password=None  # No password for Auth0 users
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.get("/me-auth0", response_model=UserResponse)
async def get_current_user_info_auth0(
    current_user: User = Depends(get_current_user_auth0)
):
    """Get current user information using Auth0 authentication"""
    return current_user 