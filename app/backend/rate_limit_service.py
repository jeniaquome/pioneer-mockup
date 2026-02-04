import os
import logging
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import Request
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)

# Rate limiting configuration from environment variables
RATE_LIMIT_ENABLED = os.environ.get("RATE_LIMIT_ENABLED", "true").lower() == "true"
RATE_LIMIT_PER_MINUTE = int(os.environ.get("RATE_LIMIT_PER_MINUTE", "200"))
RATE_LIMIT_AI_PER_MINUTE = int(os.environ.get("RATE_LIMIT_AI_PER_MINUTE", "30"))

def get_identifier(request: Request) -> str:
    """
    Get client identifier for rate limiting.
    Uses IP address as the identifier.
    """
    return get_remote_address(request)

# Initialize rate limiter with in-memory storage
limiter = Limiter(
    key_func=get_identifier,
    default_limits=[f"{RATE_LIMIT_PER_MINUTE}/minute"] if RATE_LIMIT_ENABLED else [],
    headers_enabled=True,  # Include rate limit headers in responses
    storage_uri="memory://",  # Use in-memory storage (no external dependencies)
    enabled=RATE_LIMIT_ENABLED,
)

if RATE_LIMIT_ENABLED:
    logger.info(f"✅ Rate limiting enabled with in-memory storage: {RATE_LIMIT_PER_MINUTE} requests/minute (global), {RATE_LIMIT_AI_PER_MINUTE} requests/minute (AI endpoints)")
else:
    logger.info("⚠️ Rate limiting disabled via RATE_LIMIT_ENABLED=false")

def get_limiter():
    """Get the configured rate limiter instance"""
    return limiter

def get_rate_limit_status() -> dict:
    """Get current rate limiting configuration status"""
    return {
        "enabled": RATE_LIMIT_ENABLED,
        "storage": "in-memory" if RATE_LIMIT_ENABLED else "disabled",
        "global_limit": f"{RATE_LIMIT_PER_MINUTE}/minute",
        "ai_limit": f"{RATE_LIMIT_AI_PER_MINUTE}/minute",
        "note": "In-memory storage resets on app restart"
    }

