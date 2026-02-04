import os
import jwt
import requests
from typing import Dict, Any, Optional
from fastapi import HTTPException, status
from functools import lru_cache

# Auth0 Configuration
AUTH0_DOMAIN = os.environ.get("AUTH0_DOMAIN")
AUTH0_CLIENT_ID = os.environ.get("AUTH0_CLIENT_ID")
AUTH0_CLIENT_SECRET = os.environ.get("AUTH0_CLIENT_SECRET")
AUTH0_API_IDENTIFIER = os.environ.get("AUTH0_API_IDENTIFIER")

# Algorithms supported by Auth0
ALGORITHMS = ["RS256"]

class Auth0JWTBearer:
    """Auth0 JWT Bearer token validator"""
    
    def __init__(self):
        if not AUTH0_DOMAIN:
            raise ValueError("AUTH0_DOMAIN environment variable is required")
        
        self.domain = AUTH0_DOMAIN
        self.audience = AUTH0_API_IDENTIFIER
        self.issuer = f"https://{self.domain}/"
        
        # Cache for JWKS (JSON Web Key Set)
        self._jwks = None
    
    @lru_cache(maxsize=1)
    def get_jwks(self) -> Dict[str, Any]:
        """Get JSON Web Key Set from Auth0"""
        try:
            jwks_url = f"https://{self.domain}/.well-known/jwks.json"
            response = requests.get(jwks_url, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Unable to fetch JWKS from Auth0: {str(e)}"
            )
    
    def get_signing_key(self, token: str):
        """Get the signing key for the JWT token"""
        try:
            # Use PyJWT's built-in JWKS client (similar to the example)
            jwks_client = jwt.PyJWKClient(f"https://{self.domain}/.well-known/jwks.json")
            signing_key = jwks_client.get_signing_key_from_jwt(token)
            return signing_key.key
            
        except jwt.exceptions.PyJWKClientError as e:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Unable to fetch signing key: {str(e)}"
            )
        except jwt.exceptions.InvalidTokenError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token header: {str(e)}"
            )
    
    def verify_token(self, token: str) -> Dict[str, Any]:
        """Verify and decode Auth0 JWT token"""
        try:
            # Get signing key
            signing_key = self.get_signing_key(token)
            
            # Verify and decode token
            payload = jwt.decode(
                token,
                signing_key,
                algorithms=ALGORITHMS,
                audience=self.audience,
                issuer=self.issuer,
            )
            
            return payload
            
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired"
            )
        except jwt.InvalidTokenError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token: {str(e)}"
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Token validation failed: {str(e)}"
            )

# Global Auth0 JWT Bearer instance (lazy initialization)
_auth0_bearer = None

def get_auth0_bearer():
    """Get or create Auth0 JWT Bearer instance"""
    global _auth0_bearer
    if _auth0_bearer is None:
        _auth0_bearer = Auth0JWTBearer()
    return _auth0_bearer

def verify_auth0_token(token: str) -> Dict[str, Any]:
    """Verify Auth0 JWT token and return payload"""
    return get_auth0_bearer().verify_token(token)

def get_user_info_from_token(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Extract user information from Auth0 token payload"""
    return {
        "auth0_user_id": payload.get("sub"),
        "email": payload.get("email"),
        "email_verified": payload.get("email_verified", False),
        "name": payload.get("name"),
        "nickname": payload.get("nickname"),
        "picture": payload.get("picture"),
        "given_name": payload.get("given_name"),
        "family_name": payload.get("family_name"),
        "locale": payload.get("locale"),
    }
