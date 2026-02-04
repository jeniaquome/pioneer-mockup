from fastapi import APIRouter, HTTPException, Depends, status, Query
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import logging
import json

from database import get_db, Bookmark, Resource, User, ResourceTranslation
from auth_middleware import get_current_user

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[dict])
async def get_user_bookmarks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    language: str = Query('en', description="Language code for translated content")
):
    """Get all bookmarks for the current user with translation support"""
    try:
        bookmarks = db.query(Bookmark).filter(
            Bookmark.user_id == current_user.id
        ).join(Resource).all()
        
        result = []
        for bookmark in bookmarks:
            resource = bookmark.resource
            
            # Start with base resource data
            resource_data = {
                "bookmark_id": bookmark.id,
                "bookmarked_at": bookmark.created_at.isoformat(),
                # New, flattened resource fields aligned with current schema
                "resource_id": resource.id,
                "resource_name": resource.resource_name,
                "summary": resource.summary,
                "category": resource.category,
                "subcategory": resource.subcategory,
                "website_link": resource.website_link,
                "physical_location": resource.physical_location,
                "notes": resource.notes,
            }
            
            # If language is not English, try to get translations
            if language != 'en':
                try:
                    translation = db.query(ResourceTranslation).filter(
                        ResourceTranslation.resource_id == resource.id,
                        ResourceTranslation.language_code == language,
                        ResourceTranslation.translation_status == 'completed'
                    ).first()
                    
                    if translation:
                        # Use translated content if available
                        if translation.resource_name_translated:
                            resource_data["resource_name"] = translation.resource_name_translated
                        if translation.summary_translated:
                            resource_data["summary"] = translation.summary_translated
                except Exception as e:
                    logger.error(f"Error fetching translation for resource {resource.id} in {language}: {e}")
                    # Fall back to original content on error
            
            result.append(resource_data)
        
        return result
    except Exception as e:
        logger.error(f"Error fetching bookmarks for user {current_user.id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch bookmarks"
        )

@router.post("/{resource_id}")
async def add_bookmark(
    resource_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add a resource to user's bookmarks"""
    try:
        # Check if resource exists
        resource = db.query(Resource).filter(Resource.id == resource_id).first()
        if not resource:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Resource not found"
            )
        
        # Check if bookmark already exists
        existing_bookmark = db.query(Bookmark).filter(
            Bookmark.user_id == current_user.id,
            Bookmark.resource_id == resource_id
        ).first()
        
        if existing_bookmark:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Resource already bookmarked"
            )
        
        # Create new bookmark
        bookmark = Bookmark(
            user_id=current_user.id,
            resource_id=resource_id
        )
        
        db.add(bookmark)
        db.commit()
        db.refresh(bookmark)
        
        return {
            "message": "Resource bookmarked successfully",
            "bookmark_id": bookmark.id,
            "resource_id": resource_id
        }
        
    except HTTPException:
        raise
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Resource already bookmarked"
        )
    except Exception as e:
        db.rollback()
        logger.error(f"Error adding bookmark for user {current_user.id}, resource {resource_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to add bookmark"
        )

@router.delete("/{resource_id}")
async def remove_bookmark(
    resource_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Remove a resource from user's bookmarks"""
    try:
        bookmark = db.query(Bookmark).filter(
            Bookmark.user_id == current_user.id,
            Bookmark.resource_id == resource_id
        ).first()
        
        if not bookmark:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bookmark not found"
            )
        
        db.delete(bookmark)
        db.commit()
        
        return {
            "message": "Bookmark removed successfully",
            "resource_id": resource_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Error removing bookmark for user {current_user.id}, resource {resource_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to remove bookmark"
        )

@router.get("/check/{resource_id}")
async def check_bookmark_status(
    resource_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Check if a resource is bookmarked by the current user"""
    try:
        bookmark = db.query(Bookmark).filter(
            Bookmark.user_id == current_user.id,
            Bookmark.resource_id == resource_id
        ).first()
        
        return {
            "resource_id": resource_id,
            "is_bookmarked": bookmark is not None,
            "bookmark_id": bookmark.id if bookmark else None
        }
        
    except Exception as e:
        logger.error(f"Error checking bookmark status for user {current_user.id}, resource {resource_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to check bookmark status"
        ) 