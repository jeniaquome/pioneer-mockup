from fastapi import APIRouter
from routers.admin import CANONICAL_CATEGORIES

router = APIRouter()

@router.get("/", summary="Get the list of resource categories.")
def get_categories():
    # Always return the canonical six categories used across the system
    return {"categories": CANONICAL_CATEGORIES}
