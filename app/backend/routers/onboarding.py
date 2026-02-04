from fastapi import APIRouter, HTTPException, Depends, status, Query, Request
from fastapi.responses import JSONResponse
from typing import List, Dict, Any, Optional
import json
import hashlib
import logging
from datetime import datetime
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db, User, ScreeningResponse, Resource, SessionLocal
from recommendation import determine_profile, compose_summary, normalize_answers

from auth_middleware import get_current_user

from rate_limit_service import limiter, RATE_LIMIT_AI_PER_MINUTE

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

router = APIRouter()
logger = logging.getLogger(__name__)

async def start_user_translation_task(user_id: int):
    """Background task to translate user description with proper session management"""
    db = SessionLocal()
    try:
        from translation_service import translation_service
        logger.info(f"🌐 TRANSLATION TASK: Starting translation for user {user_id}")
        await translation_service.translate_user_description_batch(user_id, db)
        logger.info(f"🌐 TRANSLATION TASK: Completed translation for user {user_id}")
    except Exception as e:
        logger.error(f"🌐 TRANSLATION TASK: Failed for user {user_id}: {e}")
    finally:
        db.close()

async def start_category_subtitle_translation_task(user_id: int, categories: List[Dict[str, any]]):
    """Background task to translate category subtitles with proper session management"""
    db = SessionLocal()
    try:
        from translation_service import translation_service
        logger.info(f"🌐 TRANSLATION TASK: Starting category subtitle translation for user {user_id}")
        await translation_service.translate_category_subtitles(user_id, categories, db)
        logger.info(f"🌐 TRANSLATION TASK: Completed category subtitle translation for user {user_id}")
    except Exception as e:
        logger.error(f"🌐 TRANSLATION TASK: Category subtitle translation failed for user {user_id}: {e}")
    finally:
        db.close()

# Request/Response models
class OnboardingSubmitRequest(BaseModel):
    answers: Dict[str, Any]
    include_questions: Optional[bool] = False

class OnboardingUpdateRequest(BaseModel):
    answers: Dict[str, Any]

class OnboardingResponse(BaseModel):
    checklist_id: str
    onboarding_profile: Dict[str, Any]
    roadmap_summary: str

class RoadmapResponse(BaseModel):
    onboarding_profile: Optional[Dict[str, Any]]
    roadmap_summary: Optional[str]

# normalize_answers() now imported from recommendation module (line 11)
# This ensures consistent normalization across all recommendation code

def generate_checklist_id(answers: Dict[str, Any]) -> str:
    """Generate deterministic checklist ID from sorted answers"""
    answers_str = json.dumps(answers, sort_keys=True)
    return f"checklist_{hashlib.md5(answers_str.encode()).hexdigest()[:12]}"

async def compose_roadmap_summary_ai(profile: Dict[str, Any], answers: Dict[str, Any], locale: str = "en") -> str:
    """Compose roadmap summary using AI-generated personalized description with fallback"""
    logger.info("🚀 ROADMAP SUMMARY: Starting AI-enhanced roadmap summary generation")
    try:
        # Try AI generation first if enabled
        from recommender_llm import AI_DESCRIPTION_ENABLED, AI_DESCRIPTION_FALLBACK, generate_personalized_description_llm
        
        logger.info(f"🚀 ROADMAP SUMMARY: AI_DESCRIPTION_ENABLED={AI_DESCRIPTION_ENABLED}, AI_DESCRIPTION_FALLBACK={AI_DESCRIPTION_FALLBACK}")
        
        if AI_DESCRIPTION_ENABLED:
            logger.info("🚀 ROADMAP SUMMARY: AI generation is enabled, attempting AI description")
            ai_description = await generate_personalized_description_llm(answers)
            
            if ai_description:
                logger.info(f"🚀 ROADMAP SUMMARY: ✅ AI generation succeeded: '{ai_description}'")
                return ai_description
            else:
                logger.warning("🚀 ROADMAP SUMMARY: ⚠️  AI generation returned empty result, falling back")
        else:
            logger.info("🚀 ROADMAP SUMMARY: AI description generation is disabled, using fallback")
            
        # Fallback to rule-based description if AI fails or is disabled
        if AI_DESCRIPTION_FALLBACK or not AI_DESCRIPTION_ENABLED:
            logger.info("🚀 ROADMAP SUMMARY: Using rule-based fallback for personalized description")
            fallback_result = compose_roadmap_summary_fallback(profile, answers, locale)
            logger.info(f"🚀 ROADMAP SUMMARY: ✅ Fallback result: '{fallback_result}'")
            return fallback_result
        else:
            logger.warning("🚀 ROADMAP SUMMARY: ❌ AI description failed and fallback is disabled")
            return "You are looking for resources to help you settle and thrive in Pittsburgh."
            
    except Exception as e:
        logger.error(f"🚀 ROADMAP SUMMARY: ❌ Error in AI description generation: {e}")
        # Always fallback on error
        fallback_result = compose_roadmap_summary_fallback(profile, answers, locale)
        logger.info(f"🚀 ROADMAP SUMMARY: ✅ Emergency fallback result: '{fallback_result}'")
        return fallback_result


def compose_roadmap_summary_fallback(profile: Dict[str, Any], answers: Dict[str, Any], locale: str = "en") -> str:
    """Fallback to rule-based roadmap summary generation"""
    audience_type = profile.get("audience_type", "general")
    support_level = profile.get("support_level", "medium")
    language_needs = profile.get("language_needs", "medium")
    
    # Extract detailed survey data for personalization
    audience = str(answers.get("audience", "")).lower()
    professional_status = str(answers.get("professional_status", "")).lower()
    primary_language = answers.get("primary_language", "en")
    # Note: cultural_background intentionally excluded to avoid racial/ethnic mentions
    employment = str(answers.get("employment", "")).lower()
    housing_need = str(answers.get("housing_need", "")).lower()
    community_priorities = answers.get("community_priorities", [])
    immediate_needs = answers.get("immediate_needs", [])
    timeline = str(answers.get("timeline", "")).lower()
    language_support = str(answers.get("language_support", ""))
    
    # Build personalized English description using existing logic
    return _build_english_personalized_description(
        audience, professional_status, primary_language,
        employment, housing_need, community_priorities, immediate_needs,
        timeline, audience_type, support_level, language_needs, language_support
    )


# Legacy function removed - replaced by compose_roadmap_summary_ai() for all active code paths

def _build_english_personalized_description(
    audience: str, professional_status: str, primary_language: str,
    employment: str, housing_need: str, community_priorities: list, immediate_needs: list,
    timeline: str, audience_type: str, support_level: str, language_needs: str,
    language_support: str = ""
) -> str:
    """Build personalized English description in 'You are a... looking for...' format"""
    
    # Helper decoders for coded values → human phrases
    def decode_housing(code: str) -> str:
        mapping = {
            "affordable": "affordable housing",
            "temporary": "temporary or emergency housing",
            "market_rate": "market-rate apartments",
            "shared": "shared housing",
            "buying": "home buying",
            "secured": "stable housing",
        }
        return mapping.get(code, code)

    def decode_employment(code: str) -> str:
        mapping = {
            "job_search": "job search",
            "networking_advancement": "professional networking",
            "skills_training": "skills training",
            "industry_networks": "industry connections",
            "secured": "secured employment",  # Legacy support
            "no_support_needed": "no employment support needed",
        }
        return mapping.get(code, code)

    def decode_priority(code: str) -> str:
        mapping = {
            "pro_networks": "professional networks",
            "cultural_faith": "cultural and faith communities",
            "social_entertainment": "social and entertainment",
            "family_children": "family-friendly",
            "sports_recreation": "sports and recreation",
            "arts_culture": "arts and culture",
            "none": "general community",
        }
        return mapping.get(code, code)

    def decode_immediate(code: str) -> str:
        mapping = {
            "basic_services": "basic services",
            "school_enrollment": "school enrollment",
            "legal_immigration": "legal and immigration",
            "mental_health": "mental health",
            "emergency_assistance": "emergency assistance",
            "transportation": "transportation",
            "none": "",
        }
        return mapping.get(code, code)

    def decode_timeline(code: str) -> str:
        mapping = {
            "just_arrived": "who just arrived in Pittsburgh",
            "recent_1_6": "who recently arrived in Pittsburgh",
            "planning_3": "planning to move to Pittsburgh",
            "long_term_6_plus": "who has been here for a while",
            "already_settled": "who is already settled in Pittsburgh",
        }
        return mapping.get(code, code)
    
    # Language mapping to convert codes to full names
    language_map = {
        "es": "Spanish",
        "ar": "Arabic", 
        "fr": "French",
        "zh": "Chinese",
        "nepali": "Nepali",
        "bhutanese": "Bhutanese",
        "dari": "Dari",
        "pashto": "Pashto",
        "spanish": "Spanish",
        "arabic": "Arabic",
        "french": "French", 
        "chinese": "Chinese",
        "nepali/bhutanese": "Nepali/Bhutanese",
        "dari/pashto (afghan languages)": "Dari/Pashto"
    }
    
    # Determine "You are a..." part
    you_are_parts = []
    
    # Professional/student identity
    if "student" in professional_status:
        if "undergraduate" in professional_status or "graduate" in professional_status:
            you_are_parts.append("university student")
        elif "trade school" in professional_status:
            you_are_parts.append("trade school student")
        else:
            you_are_parts.append("student")
    elif "tech" in professional_status:
        you_are_parts.append("tech professional")
    elif "healthcare" in professional_status or "life sciences" in professional_status:
        you_are_parts.append("healthcare professional")
    elif "academic" in professional_status or "researcher" in professional_status:
        you_are_parts.append("researcher")
    elif "seeking employment" in professional_status:
        you_are_parts.append("job seeker")
    elif "recent graduate" in professional_status:
        you_are_parts.append("recent graduate")
    
    # Background/origin identity
    if "entrepreneur" in audience:
        you_are_parts.append("entrepreneur")
    elif "refugee" in audience or "temporary protected status" in audience:
        you_are_parts.append("newcomer with refugee/TPS status")
    elif "transplant" in audience:
        you_are_parts.append("transplant from another U.S. city")
    elif "boomerang" in audience:
        you_are_parts.append("Pittsburgh boomerang")
    elif "remote employee" in audience:
        you_are_parts.append("remote worker")
    
    # Language/cultural context
    if primary_language != "en" and "english" not in primary_language.lower():
        language_name = primary_language.split("(")[0].strip() if "(" in primary_language else primary_language
        # Use mapping to get full language name, fallback to original if not found
        full_language_name = language_map.get(language_name.lower(), language_name)
        if full_language_name not in ["Other", "other"]:
            you_are_parts.append(f"{full_language_name} speaker")
    
    # Timeline context (support coded timeline values)
    tl_phrase = decode_timeline(timeline)
    if tl_phrase and tl_phrase != timeline:
        you_are_parts.append(tl_phrase)
    else:
        if "just arrived" in timeline:
            you_are_parts.append("who just arrived in Pittsburgh")
        elif "recently arrived" in timeline:
            you_are_parts.append("who recently arrived in Pittsburgh")
        elif "planning to arrive" in timeline:
            you_are_parts.append("planning to move to Pittsburgh")
    
    # Determine "looking for..." part
    looking_for_parts = []
    
    # Housing needs (support coded values)
    hn_phrase = decode_housing(housing_need)
    if hn_phrase:
        if "affordable" in hn_phrase:
            looking_for_parts.append("affordable housing options")
        elif any(k in hn_phrase for k in ["temporary", "emergency"]):
            looking_for_parts.append("immediate housing support")
        elif any(k in hn_phrase for k in ["market", "apartment"]):
            looking_for_parts.append("apartment hunting guidance")
        elif "shared" in hn_phrase:
            looking_for_parts.append("roommate connections")
        elif any(k in hn_phrase for k in ["buy", "home buying"]):
            looking_for_parts.append("home buying resources")
    
    # Employment needs (support coded values)
    emp_phrase = decode_employment(employment)
    if emp_phrase:
        if any(k in emp_phrase for k in ["job search", "job", "placement"]):
            looking_for_parts.append("job search assistance")
        if any(k in emp_phrase for k in ["networking", "career"]):
            looking_for_parts.append("professional networking opportunities")
        if "training" in emp_phrase:
            looking_for_parts.append("skills development programs")
        if "industry" in emp_phrase:
            looking_for_parts.append("industry connections")
    
    # Community needs (support coded values)
    if community_priorities:
        decoded = [decode_priority(str(p)) for p in community_priorities]
        joined = " ".join(decoded).lower()
        if "professional" in joined or "network" in joined:
            looking_for_parts.append("professional community connections")
        if "cultural" in joined or "faith" in joined:
            looking_for_parts.append("cultural and faith communities")
        if "family" in joined:
            looking_for_parts.append("family-friendly resources")
        if "arts" in joined or "culture" in joined:
            looking_for_parts.append("arts and cultural opportunities")
    
    # Language support needs
    if language_needs == "high":
        looking_for_parts.append("English language support")
    elif any(k in language_support.lower() for k in ["professional_english", "professional english"]):
        looking_for_parts.append("professional communication skills")
    
    # Immediate needs (support coded values)
    if immediate_needs:
        decoded_needs = [decode_immediate(str(n)) for n in immediate_needs]
        joined_needs = " ".join(decoded_needs).lower()
        if any(k in joined_needs for k in ["health", "medical"]):
            looking_for_parts.append("healthcare resources")
        if "transport" in joined_needs or "bus" in joined_needs:
            looking_for_parts.append("transportation options")
        if "food" in joined_needs or "pantry" in joined_needs:
            looking_for_parts.append("food assistance")
        if "legal" in joined_needs or "immigration" in joined_needs:
            looking_for_parts.append("legal support")
    
    # Construct final description
    if not you_are_parts:
        you_are_parts = ["newcomer to Pittsburgh"]
    
    if not looking_for_parts:
        looking_for_parts = ["resources to help you settle and thrive in Pittsburgh"]
    
    # Clean up "and" connectors for better grammar
    if len(you_are_parts) == 1:
        you_are = you_are_parts[0]
    elif len(you_are_parts) == 2:
        you_are = f"{you_are_parts[0]} and {you_are_parts[1]}"
    else:
        you_are = ", ".join(you_are_parts[:-1]) + f", and {you_are_parts[-1]}"
    
    # Fix grammar for "looking for" list - add "and" before the last item
    if len(looking_for_parts) == 1:
        looking_for = looking_for_parts[0]
    elif len(looking_for_parts) == 2:
        looking_for = f"{looking_for_parts[0]} and {looking_for_parts[1]}"
    else:
        looking_for = ", ".join(looking_for_parts[:-1]) + f", and {looking_for_parts[-1]}"
    
    return f"You are a {you_are} looking for {looking_for}."



def get_placeholder_recommendations(db: Session, limit: int = 3) -> List[Dict[str, Any]]:
    """Get placeholder recommendations - top 3 published+ready resources"""
    try:
        resources = (
            db.query(Resource)
            .filter(Resource.published == True, Resource.ready == True)
            .order_by(Resource.resource_name.asc())
            .limit(limit)
            .all()
        )
        
        recommendations = []
        for resource in resources:
            recommendations.append({
                "id": resource.id,
                "resource_name": resource.resource_name,
                "category": resource.category,
                "subcategory": resource.subcategory,
                "summary": resource.summary,
                "website_link": resource.website_link,
                "physical_location": resource.physical_location,
                "reason": "General recommendation based on available resources"
            })
        
        return recommendations
    except Exception as e:
        logger.warning(f"Could not fetch placeholder recommendations: {e}")
        return []

@router.get("/priority-categories")
@limiter.limit(f"{RATE_LIMIT_AI_PER_MINUTE}/minute")
async def get_priority_categories(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    language: str = Query('en', description="Language code for translated subtitles")
):
    """Return priority categories for the current user; lazily generate if missing."""
    try:
        answers = current_user.survey_responses or {}
        logger.info(f"🧠 PRIORITY CATEGORIES: User {current_user.email} - survey_responses: {answers}")
        if not answers:
            logger.info("🧠 PRIORITY CATEGORIES: No survey responses; returning empty list")
            return JSONResponse(content={"categories": []})

        profile = current_user.onboarding_profile or {}
        cached = profile.get("priority_categories") if isinstance(profile, dict) else None
        if cached and isinstance(cached, list) and len(cached) > 0:
            logger.info("🧠 PRIORITY CATEGORIES: Using cached categories from onboarding_profile")
            
            # Apply translations to subtitles if language is not English
            if language != 'en':
                from translation_service import translation_service
                from database import PriorityCategorySubtitleTranslation
                
                translated_cats = []
                for cat in cached:
                    cat_copy = dict(cat)
                    category_key = cat.get('key')
                    subtitle = cat.get('subtitle', '')
                    
                    if category_key and subtitle:
                        # Check for existing translation
                        existing_translation = db.query(PriorityCategorySubtitleTranslation).filter(
                            PriorityCategorySubtitleTranslation.user_id == current_user.id,
                            PriorityCategorySubtitleTranslation.category_key == category_key,
                            PriorityCategorySubtitleTranslation.language_code == language
                        ).first()
                        
                        if existing_translation and existing_translation.translation_status == 'completed':
                            # Use completed translation
                            cat_copy['subtitle'] = existing_translation.subtitle_translated
                            cat_copy['subtitle_translated'] = True
                        elif existing_translation and existing_translation.translation_status == 'pending':
                            # Translation in progress, use English
                            cat_copy['subtitle_translated'] = False
                            cat_copy['subtitle_translation_status'] = 'pending'
                        else:
                            # Translation missing or failed, trigger on-demand
                            logger.info(f"Translation missing/failed for category {category_key} in {language}, generating on-demand...")
                            try:
                                # Create pending entry and translate
                                translation_service._create_pending_category_subtitle_translation(
                                    db, current_user.id, category_key, language
                                )
                                
                                success = await translation_service._translate_category_subtitle(
                                    current_user.id, category_key, subtitle, language, db
                                )
                                
                                if success:
                                    # Fetch the newly created translation
                                    updated_translation = db.query(PriorityCategorySubtitleTranslation).filter(
                                        PriorityCategorySubtitleTranslation.user_id == current_user.id,
                                        PriorityCategorySubtitleTranslation.category_key == category_key,
                                        PriorityCategorySubtitleTranslation.language_code == language,
                                        PriorityCategorySubtitleTranslation.translation_status == 'completed'
                                    ).first()
                                    
                                    if updated_translation:
                                        cat_copy['subtitle'] = updated_translation.subtitle_translated
                                        cat_copy['subtitle_translated'] = True
                                    else:
                                        cat_copy['subtitle_translated'] = False
                                        cat_copy['subtitle_translation_status'] = 'generation_failed'
                                else:
                                    cat_copy['subtitle_translated'] = False
                                    cat_copy['subtitle_translation_status'] = 'generation_failed'
                            except Exception as trans_error:
                                logger.error(f"Error generating on-demand translation for category {category_key}: {trans_error}")
                                cat_copy['subtitle_translated'] = False
                                cat_copy['subtitle_translation_status'] = 'error'
                    else:
                        cat_copy['subtitle_translated'] = False
                    
                    translated_cats.append(cat_copy)
                return JSONResponse(content={"categories": translated_cats})
            
            return JSONResponse(content={"categories": cached})
        
        logger.info("🧠 PRIORITY CATEGORIES: No cached categories, generating new ones")

        from recommender_llm import generate_priority_categories_llm
        cats_result = await generate_priority_categories_llm(answers)
        cats = cats_result.get("categories", [])
        logger.info(f"🧠 PRIORITY CATEGORIES: Source={cats_result.get('source')}, count={len(cats)} (lazy endpoint)")
        
        # Persist for reuse
        try:
            profile = dict(profile or {})
            profile["priority_categories"] = cats
            current_user.onboarding_profile = profile
            db.commit()
            logger.info("🧠 PRIORITY CATEGORIES: Generated and cached categories on profile")
            
            # Trigger translation of subtitles in background
            if cats:
                try:
                    from translation_service import translation_service
                    logger.info(f"🌐 TRANSLATION: Starting translation for {len(cats)} category subtitles for user {current_user.id}")
                    import asyncio
                    asyncio.create_task(start_category_subtitle_translation_task(current_user.id, cats))
                    logger.info(f"🌐 TRANSLATION: Translation task created for category subtitles for user {current_user.id}")
                except Exception as e:
                    logger.warning(f"🌐 TRANSLATION: Failed to start category subtitle translation for user {current_user.id}: {e}")
            
        except Exception as e:
            db.rollback()
            logger.warning(f"🧠 PRIORITY CATEGORIES: Failed to persist categories: {e}")
        
        # Apply translations to subtitles if language is not English
        if language != 'en':
            from translation_service import translation_service
            from database import PriorityCategorySubtitleTranslation
            
            translated_cats = []
            for cat in cats:
                cat_copy = dict(cat)
                category_key = cat.get('key')
                subtitle = cat.get('subtitle', '')
                
                if category_key and subtitle:
                    # Check for existing translation
                    existing_translation = db.query(PriorityCategorySubtitleTranslation).filter(
                        PriorityCategorySubtitleTranslation.user_id == current_user.id,
                        PriorityCategorySubtitleTranslation.category_key == category_key,
                        PriorityCategorySubtitleTranslation.language_code == language
                    ).first()
                    
                    if existing_translation and existing_translation.translation_status == 'completed':
                        # Use completed translation
                        cat_copy['subtitle'] = existing_translation.subtitle_translated
                        cat_copy['subtitle_translated'] = True
                    elif existing_translation and existing_translation.translation_status == 'pending':
                        # Translation in progress, use English
                        cat_copy['subtitle_translated'] = False
                        cat_copy['subtitle_translation_status'] = 'pending'
                    else:
                        # Translation missing or failed, trigger on-demand
                        logger.info(f"Translation missing/failed for category {category_key} in {language}, generating on-demand...")
                        try:
                            # Create pending entry and translate
                            translation_service._create_pending_category_subtitle_translation(
                                db, current_user.id, category_key, language
                            )
                            
                            success = await translation_service._translate_category_subtitle(
                                current_user.id, category_key, subtitle, language, db
                            )
                            
                            if success:
                                # Fetch the newly created translation
                                updated_translation = db.query(PriorityCategorySubtitleTranslation).filter(
                                    PriorityCategorySubtitleTranslation.user_id == current_user.id,
                                    PriorityCategorySubtitleTranslation.category_key == category_key,
                                    PriorityCategorySubtitleTranslation.language_code == language,
                                    PriorityCategorySubtitleTranslation.translation_status == 'completed'
                                ).first()
                                
                                if updated_translation:
                                    cat_copy['subtitle'] = updated_translation.subtitle_translated
                                    cat_copy['subtitle_translated'] = True
                                else:
                                    cat_copy['subtitle_translated'] = False
                                    cat_copy['subtitle_translation_status'] = 'generation_failed'
                            else:
                                cat_copy['subtitle_translated'] = False
                                cat_copy['subtitle_translation_status'] = 'generation_failed'
                        except Exception as trans_error:
                            logger.error(f"Error generating on-demand translation for category {category_key}: {trans_error}")
                            cat_copy['subtitle_translated'] = False
                            cat_copy['subtitle_translation_status'] = 'error'
                else:
                    cat_copy['subtitle_translated'] = False
                
                translated_cats.append(cat_copy)
            return JSONResponse(content={"categories": translated_cats, "source": cats_result.get("source")})
        
        return JSONResponse(content={"categories": cats, "source": cats_result.get("source")})
    except Exception as e:
        logger.error(f"🧠 PRIORITY CATEGORIES: Error: {e}")
        return JSONResponse(content={"categories": [], "source": "none"})


class PriorityResourcesResponse(BaseModel):
    category_key: str
    resources: List[Dict[str, Any]]
    source: str


@router.get("/priority-resources/{category_key}", response_model=PriorityResourcesResponse)
async def get_priority_resources_for_category(
    category_key: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = 12,
    language: str = Query('en', description="Language code for translated content"),
):
    """Return pre-generated priority resources for a specific category.

    Resources are pre-generated during survey submission/update and stored in the database.
    This endpoint simply returns the stored resources for instant access.
    """
    try:
        answers = current_user.survey_responses or {}
        if not answers:
            logger.info(f"🧠 PRIORITY RESOURCES [{category_key}]: No survey responses; returning empty list")
            return JSONResponse(content={"category_key": category_key, "resources": [], "source": "none"})

        # Get pre-generated resources from onboarding_profile
        profile = current_user.onboarding_profile or {}
        stored_resources = profile.get("priority_resources", {}) if isinstance(profile, dict) else {}
        
        if stored_resources and category_key in stored_resources:
            stored_data = stored_resources[category_key]
            if isinstance(stored_data, dict) and "resources" in stored_data:
                resources_list = list(stored_data.get("resources") or [])
                
                # Apply translations if language is not English
                if language != 'en':
                    translated_resources = []
                    for resource_data in resources_list:
                        # Get the resource from database to apply translations
                        resource_id = resource_data.get('id')
                        if resource_id:
                            resource = db.query(Resource).filter(Resource.id == resource_id).first()
                            if resource:
                                # Use the proper serialize_resource function with translation support
                                from routers.resources import serialize_resource
                                translated_resource = serialize_resource(resource, db, language)
                                translated_resources.append(translated_resource)
                            else:
                                # Fallback to original data if resource not found
                                translated_resources.append(resource_data)
                        else:
                            translated_resources.append(resource_data)
                    resources_list = translated_resources
                
                logger.info(f"🧠 PRIORITY RESOURCES [{category_key}]: Returning pre-generated resources ({len(resources_list)} items) in language {language}")
                return JSONResponse(content={
                    "category_key": category_key, 
                    "resources": resources_list[:limit], 
                    "source": stored_data.get("source", "stored")
                })

        # Fallback: resources not pre-generated (shouldn't happen in normal flow)
        logger.warning(f"🧠 PRIORITY RESOURCES [{category_key}]: No pre-generated resources found, generating on-demand")
        try:
            from recommender_llm import rank_resources_llm_for_priority_category
            # For First Things First, use enhanced generation with smart distribution
            if category_key == "first_things_first":
                # keep in sync with recommender_llm candidate sizes and display caps
                items = await rank_resources_llm_for_priority_category(db, answers, category_key, 50, 15)
            else:
                # keep in sync with recommender_llm candidate sizes and display caps
                items = await rank_resources_llm_for_priority_category(db, answers, category_key, 40, 15)
            logger.info(f"🧠 PRIORITY RESOURCES [{category_key}]: Generated {len(items)} items on-demand")

            # Apply translations if language is not English
            if language != 'en':
                translated_items = []
                for resource_data in items:
                    # Get the resource from database to apply translations
                    resource_id = resource_data.get('id')
                    if resource_id:
                        resource = db.query(Resource).filter(Resource.id == resource_id).first()
                        if resource:
                            # Use the proper serialize_resource function with translation support
                            from routers.resources import serialize_resource
                            translated_resource = serialize_resource(resource, db, language)
                            translated_items.append(translated_resource)
                        else:
                            # Fallback to original data if resource not found
                            translated_items.append(resource_data)
                    else:
                        translated_items.append(resource_data)
                items = translated_items

            # Persist generated resources to avoid re-generating next time
            try:
                profile_dict = dict(profile or {})
                pr = dict(profile_dict.get("priority_resources") or {})
                pr[category_key] = {
                    "resources": items,
                    "source": "on_demand",
                    "generated_at": datetime.utcnow().isoformat()
                }
                profile_dict["priority_resources"] = pr
                current_user.onboarding_profile = profile_dict
                db.commit()
                logger.info(f"🧠 PRIORITY RESOURCES [{category_key}]: Persisted on-demand resources to profile")
            except Exception as persist_error:
                db.rollback()
                logger.warning(f"🧠 PRIORITY RESOURCES [{category_key}]: Failed to persist on-demand resources: {persist_error}")

            return JSONResponse(content={"category_key": category_key, "resources": items, "source": "on_demand"})
        except Exception as e:
            logger.warning(f"🧠 PRIORITY RESOURCES [{category_key}]: Failed to generate on-demand: {e}")
            return JSONResponse(content={"category_key": category_key, "resources": [], "source": "fallback"})
    except Exception as e:
        logger.error(f"🧠 PRIORITY RESOURCES [{category_key}]: Error: {e}")
        return JSONResponse(content={"category_key": category_key, "resources": [], "source": "none"})


@router.get("/priority-data")
async def get_all_priority_data(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Return ALL priority data (categories + resources) for loading into frontend local storage.
    
    This endpoint provides everything needed for instant access to priority resources
    without additional API calls during the session.
    """
    try:
        logger.info(f"🧠 PRIORITY DATA: Request from user {current_user.email}")
        answers = current_user.survey_responses or {}
        if not answers:
            logger.info("🧠 PRIORITY DATA: No survey responses; returning empty data")
            return JSONResponse(content={"categories": [], "resources": {}, "source": "none"})

        profile = current_user.onboarding_profile or {}
        
        # Get categories
        categories = profile.get("priority_categories", []) if isinstance(profile, dict) else []
        
        # Get all pre-generated resources
        resources = profile.get("priority_resources", {}) if isinstance(profile, dict) else {}
        
        logger.info(f"🧠 PRIORITY DATA: Returning {len(categories)} categories and {len(resources)} resource sets for local storage")
        
        return JSONResponse(content={
            "categories": categories,
            "resources": resources,
            "source": "stored"
        })
    except Exception as e:
        logger.error(f"🧠 PRIORITY DATA: Error: {e}")
        return JSONResponse(content={"categories": [], "resources": {}, "source": "none"})


@router.post("/submit", response_model=OnboardingResponse)
async def submit_onboarding(
    request: OnboardingSubmitRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Submit initial onboarding survey (auth required)"""
    
    # Check if user is already onboarded
    if current_user.is_onboarded:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User is already onboarded. Use PUT /api/onboarding/responses to update responses or edit via Profile."
        )
    
    try:
        # Normalize answers
        normalized_answers = normalize_answers(request.answers)
        
        # Derive profile (Phase 6)
        onboarding_profile = determine_profile(normalized_answers)
        
        # Generate checklist ID
        checklist_id = generate_checklist_id(normalized_answers)
        
        # Compose summary using AI-enhanced generation
        logger.info(f"📝 ONBOARDING SUBMIT: Generating AI-enhanced roadmap summary for user {current_user.email}")
        roadmap_summary = await compose_roadmap_summary_ai(onboarding_profile, normalized_answers, "en")
        logger.info(f"📝 ONBOARDING SUBMIT: Final roadmap summary: '{roadmap_summary}'")
        

        
        # Generate dashboard priority categories (AI + fallback)
        try:
            from recommender_llm import generate_priority_categories_llm, generate_all_priority_resources_llm
            cats_result = await generate_priority_categories_llm(normalized_answers)
            priority_categories = cats_result.get("categories", [])
            logger.info(f"🧠 PRIORITY CATEGORIES: Generated {len(priority_categories)} categories on submit (source={cats_result.get('source')})")
            
            # Pre-generate ALL priority resources for all categories
            if priority_categories:
                logger.info("🧠 PRE-GENERATING ALL PRIORITY RESOURCES on survey submit")
                priority_resources = await generate_all_priority_resources_llm(db, normalized_answers, priority_categories)
                logger.info(f"🧠 PRE-GENERATION COMPLETE: {len(priority_resources)} category resource sets generated")
            else:
                priority_resources = {}
        except Exception as e:
            logger.warning(f"🧠 PRIORITY CATEGORIES/RESOURCES: Generation failed on submit: {e}")
            priority_categories = []
            priority_resources = {}

        # Update user record (also sync select top-level profile fields for convenience)
        current_user.is_onboarded = True
        current_user.first_survey_at = datetime.utcnow()
        current_user.checklist_id = checklist_id
        current_user.survey_responses = normalized_answers  # SQLAlchemy handles JSONB conversion
        # Store categories and ALL pre-generated resources into onboarding_profile
        onboarding_profile_out = dict(onboarding_profile or {})
        onboarding_profile_out["priority_categories"] = priority_categories
        onboarding_profile_out["priority_resources"] = priority_resources
        current_user.onboarding_profile = onboarding_profile_out  # SQLAlchemy handles JSONB conversion
        current_user.roadmap_summary = roadmap_summary
        
        # Initialize translation status for the new roadmap summary
        current_user.roadmap_translation_status = 'not_started'
        current_user.last_roadmap_translation_hash = None

        # Keep a subset of profile fields in sync for quick access/UI use
        primary_lang = normalized_answers.get("primary_language", current_user.primary_language)
        current_user.primary_language = normalize_primary_language(primary_lang) if primary_lang else current_user.primary_language
        cb = normalized_answers.get("cultural_background")
        if cb:
            current_user.cultural_background = cb
        
        # Create screening response history entry
        screening_response = ScreeningResponse(
            user_id=current_user.id,
            responses=json.dumps(normalized_answers),  # Convert to JSON string for Text column
            recommendations=json.dumps(onboarding_profile),  # Convert to JSON string for Text column
            created_at=datetime.utcnow()
        )
        db.add(screening_response)
        
        db.commit()
        
        # Trigger translation of the roadmap summary
        if roadmap_summary and roadmap_summary.strip():
            try:
                from translation_service import translation_service
                logger.info(f"🌐 TRANSLATION: Starting translation for user {current_user.id} roadmap summary")
                # Create background task with proper session management
                import asyncio
                asyncio.create_task(start_user_translation_task(current_user.id))
                logger.info(f"🌐 TRANSLATION: Translation task created for user {current_user.id}")
            except Exception as e:
                logger.warning(f"🌐 TRANSLATION: Failed to start translation for user {current_user.id}: {e}")
        
        # Trigger translation of category subtitles
        if priority_categories:
            try:
                from translation_service import translation_service
                logger.info(f"🌐 TRANSLATION: Starting translation for {len(priority_categories)} category subtitles for user {current_user.id}")
                import asyncio
                asyncio.create_task(start_category_subtitle_translation_task(current_user.id, priority_categories))
                logger.info(f"🌐 TRANSLATION: Translation task created for category subtitles for user {current_user.id}")
            except Exception as e:
                logger.warning(f"🌐 TRANSLATION: Failed to start category subtitle translation for user {current_user.id}: {e}")
        
        logger.info(f"User {current_user.email} completed onboarding with checklist {checklist_id}")
        
        return OnboardingResponse(
            checklist_id=checklist_id,
            onboarding_profile=onboarding_profile_out,
            roadmap_summary=roadmap_summary,

        )
        
    except Exception as e:
        db.rollback()
        logger.error(f"Error submitting onboarding for user {current_user.email}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process onboarding submission"
        )

@router.get("/roadmap", response_model=RoadmapResponse)
async def get_roadmap(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's stored roadmap data (auth required)"""
    
    return RoadmapResponse(
        onboarding_profile=current_user.onboarding_profile,
        roadmap_summary=current_user.roadmap_summary
    )

@router.get("/roadmap/translated/{language_code}")
async def get_translated_roadmap(
    language_code: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's roadmap summary translated to specified language (auth required)
    
    If translation doesn't exist or failed, it will be generated on-demand.
    If translation is pending, returns English with pending status.
    """
    
    # Validate language code
    from translation_service import SUPPORTED_LANGUAGES
    if language_code not in SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported language code: {language_code}. Supported languages: {list(SUPPORTED_LANGUAGES.keys())}"
        )
    
    try:
        from translation_service import translation_service
        from database import UserDescriptionTranslation
        
        # Check for existing translation with any status
        existing_translation = db.query(UserDescriptionTranslation).filter(
            UserDescriptionTranslation.user_id == current_user.id,
            UserDescriptionTranslation.language_code == language_code
        ).first()
        
        # If translation exists and is completed, return it
        if existing_translation and existing_translation.translation_status == 'completed':
            return JSONResponse(content={
                "language_code": language_code,
                "roadmap_summary": existing_translation.roadmap_summary_translated,
                "translation_status": "completed"
            })
        
        # If translation is pending, return English with pending status
        if existing_translation and existing_translation.translation_status == 'pending':
            logger.info(f"Translation pending for user {current_user.id} in {language_code}")
            return JSONResponse(content={
                "language_code": language_code,
                "roadmap_summary": current_user.roadmap_summary,
                "translation_status": "pending",
                "note": "Translation in progress, showing original English text"
            })
        
        # If translation doesn't exist or failed, generate it on-demand
        logger.info(f"Translation not found or failed for user {current_user.id} in {language_code}, generating now...")
        
        try:
            # Create pending entry first
            translation_service._create_pending_user_translation(db, current_user.id, language_code)
            
            # Generate translation asynchronously
            success = await translation_service.translate_user_description(
                current_user.id, 
                language_code, 
                db
            )
            
            if success:
                # Fetch the newly created translation
                translated_summary = translation_service.get_user_translation(
                    current_user.id, 
                    language_code, 
                    db
                )
                
                if translated_summary:
                    logger.info(f"Successfully generated translation for user {current_user.id} in {language_code}")
                    return JSONResponse(content={
                        "language_code": language_code,
                        "roadmap_summary": translated_summary,
                        "translation_status": "completed"
                    })
            
            # If translation generation failed, fall back to English
            logger.warning(f"Failed to generate translation for user {current_user.id} in {language_code}")
            return JSONResponse(content={
                "language_code": language_code,
                "roadmap_summary": current_user.roadmap_summary,
                "translation_status": "generation_failed",
                "note": "Translation generation failed, showing original English text"
            })
            
        except Exception as gen_error:
            logger.error(f"Error generating translation for user {current_user.id} in {language_code}: {gen_error}")
            # Fall back to English on error
            return JSONResponse(content={
                "language_code": language_code,
                "roadmap_summary": current_user.roadmap_summary,
                "translation_status": "error",
                "note": f"Translation error: {str(gen_error)}, showing original English text"
            })
        
    except Exception as e:
        logger.error(f"Error getting translated roadmap for user {current_user.id}, language {language_code}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve translated roadmap"
        )

@router.put("/responses", response_model=OnboardingResponse)
async def update_responses(
    request: OnboardingUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update existing onboarding responses (auth required)"""
    
    if not current_user.is_onboarded:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not yet onboarded. Use POST /api/onboarding/submit first."
        )
    
    try:
        # Normalize answers
        normalized_answers = normalize_answers(request.answers)
        
        # Recompute profile (Phase 6)
        onboarding_profile = determine_profile(normalized_answers)
        
        # Generate new checklist ID
        checklist_id = generate_checklist_id(normalized_answers)
        
        # Recompute summary using AI-enhanced generation
        logger.info(f"📝 ONBOARDING UPDATE: Regenerating AI-enhanced roadmap summary for user {current_user.email}")
        roadmap_summary = await compose_roadmap_summary_ai(onboarding_profile, normalized_answers, "en")
        logger.info(f"📝 ONBOARDING UPDATE: Final roadmap summary: '{roadmap_summary}'")
        

        
        # Regenerate dashboard priority categories
        try:
            from recommender_llm import generate_priority_categories_llm, generate_all_priority_resources_llm
            cats_result = await generate_priority_categories_llm(normalized_answers)
            priority_categories = cats_result.get("categories", [])
            logger.info(f"🧠 PRIORITY CATEGORIES: Regenerated {len(priority_categories)} categories on update (source={cats_result.get('source')})")
            
            # Re-generate ALL priority resources for all categories
            if priority_categories:
                logger.info("🧠 RE-GENERATING ALL PRIORITY RESOURCES on profile update")
                priority_resources = await generate_all_priority_resources_llm(db, normalized_answers, priority_categories)
                logger.info(f"🧠 RE-GENERATION COMPLETE: {len(priority_resources)} category resource sets regenerated")
            else:
                priority_resources = {}
        except Exception as e:
            logger.warning(f"🧠 PRIORITY CATEGORIES/RESOURCES: Regeneration failed on update: {e}")
            priority_categories = []
            priority_resources = {}

        # Update user record (also sync select top-level profile fields for convenience)
        current_user.checklist_id = checklist_id
        current_user.survey_responses = normalized_answers  # SQLAlchemy handles JSONB conversion
        onboarding_profile_out = dict(onboarding_profile or {})
        onboarding_profile_out["priority_categories"] = priority_categories
        onboarding_profile_out["priority_resources"] = priority_resources
        current_user.onboarding_profile = onboarding_profile_out  # SQLAlchemy handles JSONB conversion
        current_user.roadmap_summary = roadmap_summary
        
        # Reset translation status for the updated roadmap summary
        current_user.roadmap_translation_status = 'not_started'
        current_user.last_roadmap_translation_hash = None

        # Keep a subset of profile fields in sync for quick access/UI use
        primary_lang2 = normalized_answers.get("primary_language", current_user.primary_language)
        current_user.primary_language = normalize_primary_language(primary_lang2) if primary_lang2 else current_user.primary_language
        cb2 = normalized_answers.get("cultural_background")
        if cb2:
            current_user.cultural_background = cb2
        
        # Append history row
        screening_response = ScreeningResponse(
            user_id=current_user.id,
            responses=json.dumps(normalized_answers),  # Convert to JSON string for Text column
            recommendations=json.dumps(onboarding_profile),  # Convert to JSON string for Text column
            created_at=datetime.utcnow()
        )
        db.add(screening_response)
        
        db.commit()
        
        # Trigger translation of the updated roadmap summary
        if roadmap_summary and roadmap_summary.strip():
            try:
                from translation_service import translation_service
                logger.info(f"🌐 TRANSLATION: Starting translation for updated user {current_user.id} roadmap summary")
                # Create background task with proper session management
                import asyncio
                asyncio.create_task(start_user_translation_task(current_user.id))
                logger.info(f"🌐 TRANSLATION: Translation task created for updated user {current_user.id}")
            except Exception as e:
                logger.warning(f"🌐 TRANSLATION: Failed to start translation for updated user {current_user.id}: {e}")
        
        # Trigger translation of updated category subtitles
        if priority_categories:
            try:
                from translation_service import translation_service
                logger.info(f"🌐 TRANSLATION: Starting translation for {len(priority_categories)} updated category subtitles for user {current_user.id}")
                import asyncio
                asyncio.create_task(start_category_subtitle_translation_task(current_user.id, priority_categories))
                logger.info(f"🌐 TRANSLATION: Translation task created for updated category subtitles for user {current_user.id}")
            except Exception as e:
                logger.warning(f"🌐 TRANSLATION: Failed to start category subtitle translation for updated user {current_user.id}: {e}")
        
        logger.info(f"User {current_user.email} updated responses with new checklist {checklist_id}")
        
        return OnboardingResponse(
            checklist_id=checklist_id,
            onboarding_profile=onboarding_profile_out,
            roadmap_summary=roadmap_summary,

        )
        
    except Exception as e:
        db.rollback()
        logger.error(f"Error updating responses for user {current_user.email}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update onboarding responses"
        )
