from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Dict, Any
import json
import logging
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, text as sql_text, func
from datetime import datetime

from database import get_db, Resource, ResourceTranslation

from routers.admin import CANONICAL_CATEGORIES  # reuse canonical categories
from routers.admin import parse_multi_categories
from translation_service import SUPPORTED_LANGUAGES
from cache_service import (
    cache, 
    get_resources_cache_key, 
    get_categories_cache_key, 
    get_languages_cache_key,
    get_resource_detail_cache_key,

)

router = APIRouter()
logger = logging.getLogger(__name__)

# Cache TTL settings (in seconds)
SEARCH_CACHE_TTL = 300      # 5 minutes for search results
LIST_CACHE_TTL = 900        # 15 minutes for categories/languages
DETAIL_CACHE_TTL = 1800     # 30 minutes for resource details


# Mock data for fallback (canonical categories)
def get_mock_resources():
    return [
        {
            "id": "res1",
            "ready": True,
            "category": "Living/Essentials",
            "subcategory": "Housing",
            "resource_name": "Welcome House",
            "summary": "Affordable housing for newcomers.",
            "website_link": None,
            "physical_location": "Pittsburgh",
            "notes": None
        },
        {
            "id": "res2",
            "ready": True,
            "category": "Community/Belonging", 
            "subcategory": "Social Connection",
            "resource_name": "Tech Club",
            "summary": "Social and networking club for young professionals.",
            "website_link": None,
            "physical_location": "Pittsburgh",
            "notes": None
        },
        {
            "id": "res3",
            "ready": True,
            "category": "ESL/Immigrant",
            "subcategory": "ESL support (Education)",
            "resource_name": "ESL Center",
            "summary": "English as a Second Language courses.",
            "website_link": None,
            "physical_location": "Pittsburgh", 
            "notes": None
        }
    ]

def serialize_resource(resource: Resource, db: Session = None, language: str = 'en') -> Dict[str, Any]:
    """Convert SQLAlchemy Resource to dictionary with optional translation support"""
    
    # Start with the base resource data
    result = {
        "id": resource.id,
        "ready": resource.ready,
        "category": resource.category,
        "subcategory": resource.subcategory,
        "resource_name": resource.resource_name,
        "summary": resource.summary,
        "website_link": resource.website_link,
        "physical_location": resource.physical_location,
        "notes": resource.notes,
        "priority": getattr(resource, 'priority', None),
        "created_at": resource.created_at.isoformat() if resource.created_at else None,
        "updated_at": resource.updated_at.isoformat() if resource.updated_at else None
    }
    
    # Normalize language (handle None or empty string)
    if not language or language == 'en':
        language = 'en'
    
    # If language is not English and we have a database session, try to get translations
    if language != 'en' and db is not None:
        try:
            translation = db.query(ResourceTranslation).filter(
                ResourceTranslation.resource_id == resource.id,
                ResourceTranslation.language_code == language,
                ResourceTranslation.translation_status == 'completed'
            ).first()
            
            if translation:
                # Use translated content if available
                if translation.resource_name_translated:
                    result["resource_name"] = translation.resource_name_translated
                if translation.summary_translated:
                    result["summary"] = translation.summary_translated
                    
                # Add metadata to indicate this is translated content
                result["translated"] = True
                result["translation_language"] = language
            else:
                # No translation available, using original content
                result["translated"] = False
                result["translation_language"] = 'en'
        except Exception as e:
            logger.error(f"Error fetching translation for resource {resource.id} in {language}: {e}")
            # Fall back to original content on error
            result["translated"] = False
            result["translation_language"] = 'en'
    else:
        # English content or no db session
        result["translated"] = False
        result["translation_language"] = 'en'
    
    return result

@router.get("/", summary="Search and filter resources.")
def search_resources(
    category: str = Query(None),
    subcategory: str = Query(None),
    search: str = Query(None),
    language: str = Query('en', description="Language code for translated content"),
    location: str = Query(None),
    audience_type: str = Query(None),
    cultural_background: str = Query(None),
    professional_focus: str = Query(None),
    urgency_level: str = Query(None),
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    # Generate cache key
    cache_key = get_resources_cache_key(
        category=category,
        subcategory=subcategory,
        search=search,
        language=language,
        location=location,
        audience_type=audience_type,
        page=page,
        limit=limit
    )
    
    # Try to get from cache first
    cached_result = cache.get(cache_key)
    if cached_result is not None:
        logger.info(f"Cache HIT for resources search: {cache_key}")
        cached_result["cached"] = True
        return cached_result
    
    logger.info(f"Cache MISS for resources search: {cache_key}")
    
    try:
        # Build base query - only include published and ready resources for public API
        query = db.query(Resource)
        
        # Filter to only show published & ready resources
        query = query.filter(Resource.published == True, Resource.ready == True)
        
        # Apply filters
        filters = []
        
        # Filter by category (canonical exact match preferred)
        if category:
            # Try exact match first; also allow contains as fallback
            filters.append(or_(
                Resource.category == category,
                Resource.category.ilike(f"%{category}%")
            ))

        # Filter by subcategory (stored as comma-separated tokens)
        if subcategory:
            normalized_sub = subcategory.replace(' /', '/').replace('/ ', '/').strip()
            # Match exact token within comma-separated list; also keep ilike fallback
            filters.append(or_(
                Resource.subcategory == normalized_sub,
                Resource.subcategory.ilike(f"%{normalized_sub}%"),
                Resource.subcategory.ilike(f"%, {normalized_sub}%"),
                Resource.subcategory.ilike(f"%{normalized_sub},%"),
            ))
        
        # Language filtering no longer supported (languages not stored)
        if language:
            logger.warning("Language filtering not supported in new resource structure")
        
        # Filter by location
        if location:
            filters.append(Resource.physical_location.ilike(f"%{location}%"))
        
        # Filter by search term with multilingual support
        if search:
            # Get supported language codes (excluding 'en' since English is always searched)
            SUPPORTED_LANGUAGE_CODES = [code for code in SUPPORTED_LANGUAGES.keys() if code != 'en']
            
            # Always search English fields
            search_conditions = [
                Resource.resource_name.ilike(f"%{search}%"),
                Resource.summary.ilike(f"%{search}%"),
                Resource.category.ilike(f"%{search}%"),
                Resource.subcategory.ilike(f"%{search}%"),
                Resource.notes.ilike(f"%{search}%")
            ]
            
            # If language is supported and not English, also search translated fields
            if language and language in SUPPORTED_LANGUAGE_CODES:
                # LEFT JOIN with ResourceTranslation to include translated content
                # This allows us to search translated fields while still including resources without translations
                query = query.outerjoin(
                    ResourceTranslation,
                    and_(
                        ResourceTranslation.resource_id == Resource.id,
                        ResourceTranslation.language_code == language,
                        ResourceTranslation.translation_status == 'completed'
                    )
                )
                
                # Add translated fields to search conditions
                # Note: In SQL, NULL ILIKE anything returns NULL (not True/False)
                # In an OR condition: True OR NULL = True, False OR NULL = NULL (treated as False)
                # So if English fields match, resource is included; if only translated fields match and they exist, resource is included
                # If translation is NULL, the ILIKE returns NULL which doesn't match, but English fields can still match
                search_conditions.extend([
                    ResourceTranslation.resource_name_translated.ilike(f"%{search}%"),
                    ResourceTranslation.summary_translated.ilike(f"%{search}%")
                ])
            
            filters.append(or_(*search_conditions))
        
        # Add audience-specific filtering
        if audience_type == "tech_professional":
            audience_filter = or_(
                Resource.category.ilike('%Work/Business%'),
                Resource.category.ilike('%Community/Belonging%'),
                Resource.category.ilike('%Living/Essentials%')
            )
            filters.append(audience_filter)
        elif audience_type == "traditional_immigrant":
            audience_filter = or_(
                Resource.category.ilike('%ESL/Immigrant%'),
                Resource.category.ilike('%Education/Youth%'),
                Resource.category.ilike('%Living/Essentials%')
            )
            filters.append(audience_filter)
        
        # Apply all filters
        if filters:
            query = query.filter(and_(*filters))
        
        # Default ordering: higher priority first, then alphabetical by name
        # Use NULLS LAST so missing priorities do not float to top
        try:
            query = query.order_by(
                sql_text("priority DESC NULLS LAST"),
                Resource.resource_name.asc()
            )
        except Exception:
            # Fallback: alphabetical if ordering fails for any reason
            query = query.order_by(Resource.resource_name.asc())

        # Handle pagination (clamp page values)
        page = max(1, page)
        limit = max(1, min(100, limit))
        offset = (page - 1) * limit
        
        # Get total count for pagination
        total_count = query.count()
        
        # Apply pagination
        resources = query.offset(offset).limit(limit).all()
        
        # Serialize results with translation support
        result_data = [serialize_resource(resource, db, language) for resource in resources]
        
        # Apply additional filters based on audience characteristics
        if cultural_background or professional_focus or urgency_level:
            # For now, just pass through - could implement more sophisticated filtering
            pass
        
        result = {
            "resources": result_data,
            "pagination": {
                "total": total_count,
                "page": page,
                "limit": limit,
                "total_pages": (total_count + limit - 1) // limit
            },
            "filters_applied": {
                "category": category,
                "search": search,
                "language": language,
                "location": location,
                "audience_type": audience_type
            },
            "cached": False
        }
        
        # Cache the result
        cache.set(cache_key, result, SEARCH_CACHE_TTL)
        logger.info(f"Cached resources search result: {cache_key}")
        
        return result
        
    except Exception as e:
        logger.error(f"Database error in search_resources: {e}")
        # Fallback to mock data
        mock_resources = get_mock_resources()
        return {
            "resources": mock_resources,
            "pagination": {
                "total": len(mock_resources),
                "page": 1,
                "limit": len(mock_resources),
                "total_pages": 1
            },
            "filters_applied": {},
            "fallback": True,
            "cached": False
        }

@router.get("/{resource_id}", summary="Get detailed information about a specific resource.")
def get_resource_detail(
    resource_id: str, 
    language: str = Query('en', description="Language code for translated content"),
    db: Session = Depends(get_db)
):
    """Get detailed information about a specific resource"""
    
    # Generate cache key (include language for proper caching)
    cache_key = f"{get_resource_detail_cache_key(resource_id)}_{language}"
    
    # Try to get from cache first
    cached_result = cache.get(cache_key)
    if cached_result is not None:
        logger.info(f"Cache HIT for resource detail: {resource_id}")
        cached_result["cached"] = True
        return cached_result
    
    logger.info(f"Cache MISS for resource detail: {resource_id}")
    
    try:
        resource = db.query(Resource).filter(Resource.id == resource_id).first()
        
        if not resource:
            raise HTTPException(status_code=404, detail="Resource not found")
        # Only expose details for published & ready resources
        if not (getattr(resource, 'published', False) and getattr(resource, 'ready', False)):
            raise HTTPException(status_code=404, detail="Resource not found")
        
        result = serialize_resource(resource, db, language)
        result["cached"] = False
        
        # Cache the result
        cache.set(cache_key, result, DETAIL_CACHE_TTL)
        logger.info(f"Cached resource detail: {resource_id}")
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Database error in get_resource_detail: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@router.get("/categories/list", summary="Get all available resource categories.")
def get_categories(db: Session = Depends(get_db)):
    """Get all available resource categories"""
    
    # Generate cache key
    cache_key = get_categories_cache_key()
    
    # Try to get from cache first
    cached_result = cache.get(cache_key)
    if cached_result is not None:
        logger.info("Cache HIT for categories list")
        cached_result["cached"] = True
        return cached_result
    
    logger.info("Cache MISS for categories list")
    
    try:
        # Only consider published & ready resources when building category list
        rows = db.query(Resource.category).filter(Resource.published == True, Resource.ready == True).all()
        seen = set()
        for (category_field,) in rows:
            if not category_field:
                continue
            for cat in parse_multi_categories(category_field):
                seen.add(cat)

        # Ensure only canonical categories are returned in a stable order
        ordered = [c for c in CANONICAL_CATEGORIES if c in seen]
        result = {
            "categories": ordered,
            "cached": False
        }
        
        # Cache the result
        cache.set(cache_key, result, LIST_CACHE_TTL)
        logger.info("Cached categories list")
        
        return result
        
    except Exception as e:
        logger.error(f"Database error in get_categories: {e}")
        # Fallback to default categories
        return {
            "categories": CANONICAL_CATEGORIES,
            "fallback": True,
            "cached": False
        }

@router.get("/languages/list", summary="Get all available languages.")
def get_languages(db: Session = Depends(get_db)):
    """Get all available languages from resources"""
    
    # Generate cache key
    cache_key = get_languages_cache_key()
    
    # Try to get from cache first
    cached_result = cache.get(cache_key)
    if cached_result is not None:
        logger.info("Cache HIT for languages list")
        cached_result["cached"] = True
        return cached_result
    
    logger.info("Cache MISS for languages list")
    
    try:
        # Languages are no longer stored; return empty list for now
        all_languages = set()
        
        result = {
            "languages": sorted(list(all_languages)),
            "cached": False
        }
        
        # Cache the result
        cache.set(cache_key, result, LIST_CACHE_TTL)
        logger.info("Cached languages list")
        
        return result
        
    except Exception as e:
        logger.error(f"Database error in get_languages: {e}")
        # Fallback to default languages
        return {
            "languages": ["English", "Spanish", "Arabic", "French", "Chinese", "Other"],
            "fallback": True,
            "cached": False
        }



# Cache management endpoints
@router.post("/cache/invalidate", summary="Invalidate resource cache.")
def invalidate_cache():
    """Invalidate all resource-related cache entries"""
    try:
        deleted_count = cache.invalidate_resources_cache()
        return {
            "message": "Resource cache invalidated successfully",
            "deleted_entries": deleted_count,
            "timestamp": json.dumps(datetime.now(), default=str)
        }
    except Exception as e:
        logger.error(f"Cache invalidation failed: {e}")
        raise HTTPException(status_code=500, detail=f"Cache invalidation failed: {e}")

@router.get("/cache/stats", summary="Get cache statistics.")
def get_cache_stats():
    """Get cache statistics and health"""
    try:
        stats = cache.get_cache_stats()
        return {
            "cache_stats": stats,
            "timestamp": json.dumps(datetime.now(), default=str)
        }
    except Exception as e:
        logger.error(f"Failed to get cache stats: {e}")
        return {
            "cache_stats": {"status": "error", "error": str(e)},
            "timestamp": json.dumps(datetime.now(), default=str)
        }

# Resource modification endpoints with cache invalidation
@router.post("/", summary="Create a new resource.")
def create_resource(resource_data: dict, db: Session = Depends(get_db)):
    """Create a new resource and invalidate cache"""
    try:
        # Create new resource
        resource = Resource(
            id=resource_data.get("id"),
            name=resource_data.get("name"),
            description=resource_data.get("description"),
            short_description=resource_data.get("short_description"),
            categories=json.dumps(resource_data.get("categories", [])),
            languages=json.dumps(resource_data.get("languages", [])),
            website=resource_data.get("website"),
            affiliation=resource_data.get("affiliation"),
            partners_collaborators=resource_data.get("partners_collaborators"),
            revenue=resource_data.get("revenue"),
            expenses=resource_data.get("expenses"),
            costs=resource_data.get("costs"),
            annual_reports=resource_data.get("annual_reports"),
            financial_year=resource_data.get("financial_year")
        )
        
        db.add(resource)
        db.commit()
        db.refresh(resource)
        
        # Invalidate cache after modification
        cache.invalidate_resources_cache()
        logger.info(f"Created resource {resource.id} and invalidated cache")
        
        return {
            "message": "Resource created successfully",
            "resource": serialize_resource(resource),
            "cache_invalidated": True
        }
        
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to create resource: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create resource: {e}")

@router.put("/{resource_id}", summary="Update an existing resource.")
def update_resource(resource_id: str, resource_data: dict, db: Session = Depends(get_db)):
    """Update an existing resource and invalidate cache"""
    try:
        # Find existing resource
        resource = db.query(Resource).filter(Resource.id == resource_id).first()
        
        if not resource:
            raise HTTPException(status_code=404, detail="Resource not found")
        
        # Update resource fields
        if "name" in resource_data:
            resource.name = resource_data["name"]
        if "description" in resource_data:
            resource.description = resource_data["description"]
        if "short_description" in resource_data:
            resource.short_description = resource_data["short_description"]
        if "categories" in resource_data:
            resource.categories = json.dumps(resource_data["categories"])
        if "languages" in resource_data:
            resource.languages = json.dumps(resource_data["languages"])
        if "website" in resource_data:
            resource.website = resource_data["website"]
        if "affiliation" in resource_data:
            resource.affiliation = resource_data["affiliation"]
        if "partners_collaborators" in resource_data:
            resource.partners_collaborators = resource_data["partners_collaborators"]
        if "revenue" in resource_data:
            resource.revenue = resource_data["revenue"]
        if "expenses" in resource_data:
            resource.expenses = resource_data["expenses"]
        if "costs" in resource_data:
            resource.costs = resource_data["costs"]
        if "annual_reports" in resource_data:
            resource.annual_reports = resource_data["annual_reports"]
        if "financial_year" in resource_data:
            resource.financial_year = resource_data["financial_year"]
        
        db.commit()
        db.refresh(resource)
        
        # Invalidate cache after modification
        cache.invalidate_resources_cache()
        logger.info(f"Updated resource {resource_id} and invalidated cache")
        
        return {
            "message": "Resource updated successfully",
            "resource": serialize_resource(resource),
            "cache_invalidated": True
        }
        
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to update resource {resource_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update resource: {e}")

@router.delete("/{resource_id}", summary="Delete a resource.")
def delete_resource(resource_id: str, db: Session = Depends(get_db)):
    """Delete a resource and invalidate cache"""
    try:
        # Find existing resource
        resource = db.query(Resource).filter(Resource.id == resource_id).first()
        
        if not resource:
            raise HTTPException(status_code=404, detail="Resource not found")
        
        # Delete resource
        db.delete(resource)
        db.commit()
        
        # Invalidate cache after modification
        cache.invalidate_resources_cache()
        logger.info(f"Deleted resource {resource_id} and invalidated cache")
        
        return {
            "message": "Resource deleted successfully",
            "resource_id": resource_id,
            "cache_invalidated": True
        }
        
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to delete resource {resource_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to delete resource: {e}")
