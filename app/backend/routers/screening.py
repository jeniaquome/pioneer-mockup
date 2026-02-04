from fastapi import APIRouter, HTTPException, Body, Depends
from pydantic import BaseModel
from typing import List, Union, Dict, Any, Optional
import json
from datetime import datetime
import hashlib
from sqlalchemy.orm import Session

from database import get_db, ScreeningResponse, User
from auth_middleware import require_auth

router = APIRouter()

# Enhanced screening questions
def get_enhanced_questions():
    return [
        {
            "id": "audience",
            "question": "Which best describes your situation?",
            "type": "single-select",
            "options": [
                "Student or Professional (CMU, Pitt, tech/life sciences)",
                "New American/Immigrant seeking settlement support",
                "Both - I'm a student/professional who is also new to the US",
                "Other"
            ]
        },
        {
            "id": "primary_language",
            "question": "What is your primary language?",
            "type": "single-select",
            "options": [
                "English (native/fluent)",
                "Spanish",
                "Arabic",
                "French",
                "Nepali/Bhutanese",
                "Dari/Pashto (Afghan languages)",
                "Other"
            ]
        },
        {
            "id": "cultural_background",
            "question": "What cultural or regional background best describes you?",
            "type": "single-select",
            "options": [
                "American/Western",
                "West African",
                "Middle Eastern/North African",
                "South Asian (including Bhutanese)",
                "Latino/Hispanic",
                "East Asian",
                "Other/Prefer not to say"
            ]
        },
        {
            "id": "timeline",
            "question": "When did you arrive or when are you planning to arrive in Pittsburgh?",
            "type": "single-select",
            "options": [
                "Just arrived (within the last month)",
                "Recently arrived (1-6 months ago)",
                "Established resident (6+ months)",
                "Planning to arrive soon",
                "Other"
            ]
        },
        {
            "id": "immediate_needs",
            "question": "What are your most immediate needs? (Select all that apply)",
            "type": "multi-select",
            "options": [
                "Housing (temporary or permanent)",
                "Employment/job search",
                "English language classes",
                "Healthcare/medical services",
                "Legal assistance (immigration, documentation)",
                "Food assistance",
                "Transportation help",
                "Child care or school enrollment",
                "Social connections/community",
                "Financial services (banking, etc.)",
                "Professional credential evaluation",
                "Emergency assistance"
            ]
        },
        {
            "id": "housing_situation",
            "question": "What best describes your current housing situation?",
            "type": "single-select",
            "options": [
                "Stable permanent housing",
                "Temporary housing (staying with friends/family)",
                "Short-term rental/hotel",
                "Emergency shelter",
                "At risk of homelessness",
                "Looking for housing",
                "Other"
            ]
        },
        {
            "id": "employment_status",
            "question": "What is your current employment status?",
            "type": "single-select",
            "options": [
                "Employed full-time",
                "Employed part-time",
                "Unemployed, actively seeking work",
                "Unemployed, not seeking work",
                "Student",
                "Self-employed/entrepreneur",
                "Retired",
                "Unable to work",
                "Other"
            ]
        },
        {
            "id": "education_background",
            "question": "What is your highest level of education?",
            "type": "single-select",
            "options": [
                "Less than high school",
                "High school diploma/GED",
                "Some college/associate degree",
                "Bachelor's degree",
                "Master's degree",
                "Doctoral degree",
                "Professional degree (JD, MD, etc.)",
                "Vocational/trade certification",
                "Other"
            ]
        },
        {
            "id": "family_composition",
            "question": "What best describes your family situation?",
            "type": "single-select",
            "options": [
                "Single adult",
                "Adult couple (no children)",
                "Single parent with children",
                "Two-parent family with children",
                "Extended family (multiple generations)",
                "Other family arrangement"
            ]
        },
        # techComfort question removed
        {
            "id": "language_support",
            "question": "What type of language support would be most helpful?",
            "type": "single-select",
            "options": [
                "No language support needed",
                "Basic English conversation skills",
                "Professional English communication skills",
                "Reading and writing assistance",
                "Interpretation services for appointments",
                "Help with official documents/forms",
                "Other"
            ]
        },
        {
            "id": "community_connections",
            "question": "How important is connecting with people from your cultural background?",
            "type": "single-select",
            "options": [
                "Very important - I want strong cultural community connections",
                "Somewhat important - I'd like some cultural connections",
                "Not very important - I'm focused on broader integration",
                "Not important - I prefer to integrate without cultural-specific groups"
            ]
        }
    ]

class ScreeningAnswer(BaseModel):
    question_id: str
    answer: Union[str, List[str]]

class ScreeningSubmitRequest(BaseModel):
    answers: Dict[str, Union[str, List[str]]]

def determine_audience_profile(answers: Dict[str, Union[str, List[str]]]) -> Dict[str, Any]:
    """Analyze screening answers to determine user profile and needs"""
    profile = {
        "audience_type": "mixed",
        "tech_oriented": False,
        "traditional_immigrant": False,
        "language_needs": "none",
        "urgency_level": "medium",
        "support_level": "standard"
    }
    
    # Determine primary audience type
    audience = answers.get("audience", "")
    if "Student or Professional" in str(audience):
        profile["tech_oriented"] = True
        profile["audience_type"] = "tech_professional"
    elif "New American/Immigrant" in str(audience):
        profile["traditional_immigrant"] = True
        profile["audience_type"] = "traditional_immigrant"
    elif "Both" in str(audience):
        profile["tech_oriented"] = True
        profile["traditional_immigrant"] = True
        profile["audience_type"] = "mixed"
    
    # Determine language needs
    language = answers.get("primary_language", "")
    if "English (native/fluent)" not in str(language):
        profile["language_needs"] = "high"
    elif answers.get("language_support") == "Professional English communication skills":
        profile["language_needs"] = "professional"
    
    # Determine urgency level
    timeline = answers.get("timeline", "")
    if "Just arrived" in str(timeline):
        profile["urgency_level"] = "high"
    elif "Recently arrived" in str(timeline):
        profile["urgency_level"] = "medium"
    elif "Planning to arrive soon" in str(timeline):
        profile["urgency_level"] = "medium"
    else:
        profile["urgency_level"] = "low"
    
    # Determine support level needed
    immediate_needs = answers.get("immediate_needs", [])
    
    # High support if many immediate needs or high urgency
    if isinstance(immediate_needs, list) and len(immediate_needs) > 4:
        profile["support_level"] = "high"
    elif profile["urgency_level"] == "high":
        profile["support_level"] = "high"
    # Note: tech_comfort no longer used for support level determination
    
    return profile

def generate_personalized_checklist_id(answers: Dict[str, Union[str, List[str]]]) -> str:
    """Generate a unique checklist ID based on user answers"""
    # Create a hash of the answers for uniqueness
    answers_str = json.dumps(answers, sort_keys=True)
    hash_object = hashlib.md5(answers_str.encode())
    return f"checklist_{hash_object.hexdigest()[:12]}"

@router.get("/questions", summary="Get the enhanced screening questionnaire.")
def get_screening_questions():
    """Return the enhanced screening questions"""
    return {"questions": get_enhanced_questions()}

@router.post("/submit", summary="Submit answers to the screening questionnaire and generate a personalized checklist.")
def submit_screening_answers(payload: ScreeningSubmitRequest, db: Session = Depends(get_db)):
    """Process screening answers and generate personalized checklist"""
    answers = payload.answers
    
    # Determine user profile
    profile = determine_audience_profile(answers)
    
    # Generate unique checklist ID
    checklist_id = generate_personalized_checklist_id(answers)
    
    # Store screening response in database
    try:
        screening_response = ScreeningResponse(
            user_id=checklist_id,
            responses=json.dumps(answers),
            recommendations=json.dumps(profile)
        )
        db.add(screening_response)
        db.commit()
        db.refresh(screening_response)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    
    # Generate summary based on profile
    summary_parts = []
    
    if profile["tech_oriented"]:
        summary_parts.append("tech-oriented professional")
    if profile["traditional_immigrant"]:
        summary_parts.append("newcomer seeking settlement support")
    
    if profile["language_needs"] == "high":
        summary_parts.append("with significant language support needs")
    elif profile["language_needs"] == "professional":
        summary_parts.append("seeking professional communication skills")
    
    if profile["urgency_level"] == "high":
        summary_parts.append("with immediate settlement needs")
    
    summary = f"Personalized checklist for {' and '.join(summary_parts) if summary_parts else 'newcomer'}"
    
    return {
        "checklist_id": checklist_id,
        "summary": summary,
        "profile": profile
    }

@router.get("/profile/{checklist_id}", summary="Get user profile based on checklist ID")
def get_user_profile(checklist_id: str, db: Session = Depends(get_db)):
    """Retrieve user profile and screening responses"""
    try:
        screening_response = db.query(ScreeningResponse).filter(
            ScreeningResponse.user_id == checklist_id
        ).order_by(ScreeningResponse.created_at.desc()).first()
        
        if not screening_response:
            raise HTTPException(status_code=404, detail="User profile not found")
        
        return {
            "checklist_id": checklist_id,
            "responses": json.loads(screening_response.responses),
            "profile": json.loads(screening_response.recommendations)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# PROTECTED ENDPOINT EXAMPLE
@router.get("/my-responses", summary="Get my screening responses (Protected)")
def get_my_screening_responses(
    current_user: User = Depends(require_auth),
    db: Session = Depends(get_db)
):
    """Get screening responses for the authenticated user (protected endpoint example)"""
    
    # Get all screening responses for this user
    # Note: In a real implementation, you might link screening responses to user accounts
    responses = db.query(ScreeningResponse).filter(
        ScreeningResponse.user_id.like(f"%{current_user.email}%")
    ).all()
    
    return {
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "username": current_user.username
        },
        "screening_responses": [
            {
                "id": response.id,
                "user_id": response.user_id,
                "responses": json.loads(response.responses),
                "recommendations": json.loads(response.recommendations),
                "created_at": response.created_at
            }
            for response in responses
        ],
        "total_responses": len(responses)
    }
