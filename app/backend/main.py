from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from datetime import datetime, timezone
from fastapi.middleware.cors import CORSMiddleware
from routers import screening, checklists, resources, categories, about, chat, auth, admin, bookmarks, onboarding, developer
import logging
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from rate_limit_service import limiter, get_rate_limit_status

# Configure logging for debugging the recommender
logging.getLogger('recommender_llm').setLevel(logging.DEBUG)

app = FastAPI(
    title="Pittsburgh Tomorrow Pioneer API",
    description="API for the Pittsburgh Tomorrow Pioneer newcomer assistance application",
    version="1.0.0"
)

# Add rate limiter to app state
app.state.limiter = limiter

# Record server start time to help verify container restarts
APP_START_TIME = datetime.now(timezone.utc)

# Rate limit exception handler
@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    """Handle rate limit exceeded errors with a clean 429 response"""
    return JSONResponse(
        status_code=429,
        content={"detail": "Rate limit exceeded"},
    )

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add SlowAPI middleware for rate limiting
app.add_middleware(SlowAPIMiddleware)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(screening.router, prefix="/api/screening", tags=["screening"])
app.include_router(checklists.router, prefix="/api/checklists", tags=["checklists"])
app.include_router(resources.router, prefix="/api/resources", tags=["resources"])
app.include_router(categories.router, prefix="/api/categories", tags=["categories"])
app.include_router(about.router, prefix="/api/about", tags=["about"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(bookmarks.router, prefix="/api/bookmarks", tags=["bookmarks"])
app.include_router(onboarding.router, prefix="/api/onboarding", tags=["onboarding"])
app.include_router(developer.router, prefix="/api/developer", tags=["developer"])

@app.get("/api", summary="API Information")
def api_info():
    """API information endpoint"""
    return {
        "message": "Welcome to Pittsburgh Tomorrow Pioneer API",
        "version": "1.0.0",
        "docs": "/docs",
        "authentication": "JWT-based authentication available at /api/auth"
    }

@app.get("/api/health", summary="API Health Check")
@limiter.exempt
def health_check():
    """API health check endpoint"""
    return {
        "status": "healthy",
        "service": "Pioneer API",
        "version": "1.0.0"
    }

@app.get("/api/health/runtime", summary="API runtime info (start time and uptime)")
@limiter.exempt
def health_runtime():
    now = datetime.now(timezone.utc)
    uptime_seconds = (now - APP_START_TIME).total_seconds()
    return {
        "started_at": APP_START_TIME.isoformat(),
        "uptime_seconds": int(uptime_seconds),
    }

@app.get("/api/health/rate-limit", summary="Rate limiting configuration status")
@limiter.exempt
def rate_limit_status():
    """Get current rate limiting configuration and status"""
    return get_rate_limit_status()
