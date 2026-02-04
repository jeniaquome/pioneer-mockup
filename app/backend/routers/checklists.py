from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any, Optional
import json
from datetime import datetime
from sqlalchemy.orm import Session

from database import get_db, ScreeningResponse, Resource, Checklist

router = APIRouter()

def get_user_profile(checklist_id: str, db: Session) -> Optional[Dict[str, Any]]:
    """Get user profile from screening responses"""
    try:
        screening_response = db.query(ScreeningResponse).filter(
            ScreeningResponse.user_id == checklist_id
        ).order_by(ScreeningResponse.created_at.desc()).first()
        
        if not screening_response:
            return None
        
        return {
            "responses": json.loads(screening_response.responses),
            "profile": json.loads(screening_response.recommendations)
        }
    except Exception as e:
        print(f"Database error: {e}")
        return None

def get_filtered_resources(categories: List[str], languages: List[str] = None, limit: int = 3, db: Session = None) -> List[Dict[str, Any]]:
    """Get resources filtered by categories and languages"""
    try:
        # Build query with category filter
        query = db.query(Resource)
        
        if categories:
            # Filter by categories using LIKE for JSON contains
            category_filters = []
            for category in categories:
                category_filters.append(Resource.categories.like(f'%{category}%'))
            
            # Use OR condition for any matching category
            from sqlalchemy import or_
            query = query.filter(or_(*category_filters))
        
        results = query.limit(limit).all()
        resources = []
        
        for resource in results:
            resource_data = {
                "id": resource.id,
                "name": resource.name,
                "description": resource.description,
                "short_description": resource.short_description,
                "categories": json.loads(resource.categories) if resource.categories else [],
                "languages": json.loads(resource.languages) if resource.languages else [],
                "website": resource.website,
                "partners_collaborators": resource.partners_collaborators,
                "affiliation": resource.affiliation,
                "financial_data": {
                    "revenue": resource.revenue,
                    "expenses": resource.expenses,
                    "costs": resource.costs,
                    "annual_reports": resource.annual_reports,
                    "financial_year": resource.financial_year
                }
            }
            
            # Filter by language if specified
            if languages:
                resource_languages = [lang.lower() for lang in resource_data["languages"]]
                if not any(lang.lower() in resource_languages for lang in languages):
                    continue
            
            resources.append(resource_data)
        
        return resources[:limit]
        
    except Exception as e:
        print(f"Database error: {e}")
        return []

def get_base_checklists(db: Session) -> List[Dict[str, Any]]:
    """Get base checklist templates"""
    try:
        checklists = db.query(Checklist).all()
        
        checklist_data = []
        for checklist in checklists:
            checklist_data.append({
                "id": checklist.id,
                "name": checklist.name,
                "description": checklist.description,
                "items": json.loads(checklist.items) if checklist.items else []
            })
        
        return checklist_data
        
    except Exception as e:
        print(f"Database error: {e}")
        return []

def generate_personalized_checklist(checklist_id: str, db: Session) -> Dict[str, Any]:
    """Generate a personalized checklist based on user profile"""
    
    # Get user profile
    user_profile_data = get_user_profile(checklist_id, db)
    if not user_profile_data:
        # Return default checklist if no profile found
        base_checklists = get_base_checklists(db)
        if base_checklists:
            return {
                "checklist_id": checklist_id,
                "name": "Newcomer Essentials Checklist",
                "description": "Essential tasks for new arrivals",
                "sections": [base_checklists[0]]
            }
        else:
            return {
                "checklist_id": checklist_id,
                "name": "Default Checklist",
                "description": "Basic orientation checklist",
                "sections": []
            }
    
    responses = user_profile_data["responses"]
    profile = user_profile_data["profile"]
    
    # Get base checklists
    base_checklists = get_base_checklists(db)
    
    # Determine which checklists to include based on profile
    included_checklists = []
    
    # Always include essentials for newcomers
    essentials = next((c for c in base_checklists if c["id"] == "newcomer-essentials"), None)
    if essentials:
        included_checklists.append(essentials)
    
    # Include employment checklist if needed
    employment_status = responses.get("employment_status", "")
    if ("unemployed" in employment_status.lower() or 
        "seeking work" in employment_status.lower() or
        profile.get("tech_oriented", False)):
        employment = next((c for c in base_checklists if "employment" in c["id"]), None)
        if employment:
            included_checklists.append(employment)
    
    # Include education checklist if language support needed
    if (profile.get("language_needs") in ["high", "professional"] or
        "english" in str(responses.get("immediate_needs", [])).lower()):
        education = next((c for c in base_checklists if "education" in c["id"]), None)
        if education:
            included_checklists.append(education)
    
    # Get relevant resources
    immediate_needs = responses.get("immediate_needs", [])
    if isinstance(immediate_needs, str):
        immediate_needs = [immediate_needs]
    
    # Map needs to categories
    category_mapping = {
        "housing": ["housing"],
        "employment": ["employment"],
        "english": ["education"],
        "healthcare": ["healthcare"],
        "legal": ["legal"],
        "food": ["emergency"],
        "transportation": ["transportation"],
        "social": ["social"]
    }
    
    relevant_categories = []
    for need in immediate_needs:
        need_lower = need.lower()
        for key, categories in category_mapping.items():
            if key in need_lower:
                relevant_categories.extend(categories)
    
    # Get user's languages for filtering
    user_languages = [responses.get("primary_language", "English")]
    if "English" not in user_languages:
        user_languages.append("English")  # Always include English as fallback
    
    resources = get_filtered_resources(relevant_categories, user_languages, limit=5, db=db)
    
    return {
        "checklist_id": checklist_id,
        "name": f"Personalized Checklist for {profile.get('audience_type', 'newcomer').replace('_', ' ').title()}",
        "description": f"Customized based on your profile and immediate needs",
        "profile": profile,
        "sections": included_checklists,
        "recommended_resources": resources
    }

@router.get("/{checklist_id}", summary="Get a personalized checklist for a user.")
def get_checklist(checklist_id: str, db: Session = Depends(get_db)):
    """Get personalized checklist based on screening responses"""
    try:
        checklist = generate_personalized_checklist(checklist_id, db)
        return checklist
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate checklist: {e}")

@router.get("/", summary="Get all available checklist templates.")
def get_all_checklists(db: Session = Depends(get_db)):
    """Get all available checklist templates"""
    try:
        checklists = get_base_checklists(db)
        return {"checklists": checklists}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get checklists: {e}")

# Progress tracking endpoints (placeholder - would need user_progress table updates)
@router.post("/{checklist_id}/progress", summary="Update progress on a checklist item.")
def update_progress(checklist_id: str, item_id: str, completed: bool, db: Session = Depends(get_db)):
    """Update progress on a specific checklist item"""
    # This would require implementing user_progress table operations
    # For now, return success
    return {
        "checklist_id": checklist_id,
        "item_id": item_id,
        "completed": completed,
        "updated_at": datetime.now().isoformat()
    }

@router.get("/{checklist_id}/progress", summary="Get progress data for a checklist.")
def get_progress(checklist_id: str, db: Session = Depends(get_db)):
    """Get progress data for a specific checklist"""
    # This would require implementing user_progress table operations
    # For now, return empty progress
    return {
        "checklist_id": checklist_id,
        "progress": {},
        "completion_percentage": 0
    }
