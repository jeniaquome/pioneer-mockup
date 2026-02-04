"""
Recommendation API Module
=========================

This module provides the public API for the recommendation system with AI + fallback support.
It wraps the core AI recommendation engine (recommender_llm.py) with proper error handling
and synchronous/fallback behavior for use in routes and scripts.

Architecture:
- recommender_llm.py: Core AI recommendation engine (pure logic, async)
- recommendation.py: Public API wrapper with fallbacks (THIS FILE)

DO NOT import recommender_llm.py directly in routes - use this module instead.
"""
from __future__ import annotations


from typing import Dict, Any, List, Tuple
from sqlalchemy.orm import Session


def normalize_answers(answers: Dict[str, Any]) -> Dict[str, Any]:
    """
    Normalize survey answer keys to consistent snake_case format.
    
    This is the canonical implementation used across the codebase.
    Handles multiple input formats:
    - camelCase keys (primaryLanguage -> primary_language)
    - Space-separated keys (primary language -> primary_language)  
    - Hyphen-separated keys (primary-language -> primary_language)
    - Mixed formats
    
    Also handles value normalization:
    - Comma-separated strings -> arrays
    - Arrays -> preserved as arrays
    - Other values -> preserved as-is
    
    Args:
        answers: Dictionary of survey responses with potentially mixed key formats
        
    Returns:
        Dictionary with normalized snake_case keys and properly formatted values
        
    Examples:
        >>> normalize_answers({"primaryLanguage": "en", "housingNeed": "affordable"})
        {'primary_language': 'en', 'housing_need': 'affordable'}
        
        >>> normalize_answers({"community_priorities": "pro_networks, social_entertainment"})
        {'community_priorities': ['pro_networks', 'social_entertainment']}
    """
    normalized = {}
    for key, value in answers.items():
        # First convert camelCase to snake_case properly
        # This handles: primaryLanguage -> primary_language
        snake_key = ''.join(['_' + c.lower() if c.isupper() else c for c in key]).lstrip('_')
        # Then handle spaces and hyphens
        # This handles: "primary language" -> primary_language, "primary-language" -> primary_language
        snake_key = snake_key.replace(' ', '_').replace('-', '_').lower()
        
        # Ensure multi-select answers are arrays
        if isinstance(value, str) and ',' in value:
            normalized[snake_key] = [item.strip() for item in value.split(',')]
        elif isinstance(value, list):
            normalized[snake_key] = value
        else:
            normalized[snake_key] = value
    
    return normalized


def determine_profile(answers: Dict[str, Any]) -> Dict[str, Any]:
    audience = str(answers.get('audience', '')).lower()
    primary_lang = answers.get('primary_language', 'en')
    language_support = str(answers.get('language_support', '')).lower()
    tech_comfort = str(answers.get('tech_comfort', '')).lower()
    timeline = str(answers.get('timeline', '')).lower()
    immediate_needs = answers.get('immediate_needs', [])
    professional_status = str(answers.get('professional_status', '')).lower()
    housing_need = str(answers.get('housing_need', '')).lower()

    profile = {
        'audience_type': 'general',
        'language_needs': 'medium',
        'urgency_level': 'medium',
        'support_level': 'medium',
        'tech_oriented': False,
    }

    if 'student' in audience or 'professional' in audience:
        profile['audience_type'] = 'student_professional'
    elif 'immigrant' in audience or 'newcomer' in audience:
        profile['audience_type'] = 'traditional_immigrant'

    if primary_lang != 'en' or 'beginner' in language_support:
        profile['language_needs'] = 'high'
    elif 'advanced' in language_support:
        profile['language_needs'] = 'low'

    if 'very comfortable' in tech_comfort or 'comfortable' in tech_comfort:
        profile['tech_oriented'] = True

    if 'just arrived' in timeline or 'within' in timeline:
        profile['urgency_level'] = 'high'
    elif 'established' in timeline or '6+' in timeline:
        profile['urgency_level'] = 'low'

    if 'emergency' in housing_need or 'temporary' in housing_need:
        profile['support_level'] = 'high'
    elif 'job search' in str(answers.get('employment', '')).lower() or 'seeking' in professional_status:
        profile['support_level'] = 'high'

    return profile


def compose_summary(profile: Dict[str, Any], answers: Dict[str, Any], locale: str = 'en') -> str:
    """Compose summary using AI if available, with rule-based fallback for synchronous contexts"""
    print("🔄 COMPOSE SUMMARY: Starting synchronous AI-enhanced summary generation")
    try:
        # Try AI generation first if enabled (synchronous version)
        from recommender_llm import AI_DESCRIPTION_ENABLED, AI_DESCRIPTION_FALLBACK, generate_personalized_description_llm_blocking
        
        print(f"🔄 COMPOSE SUMMARY: AI_DESCRIPTION_ENABLED={AI_DESCRIPTION_ENABLED}, AI_DESCRIPTION_FALLBACK={AI_DESCRIPTION_FALLBACK}")
        
        if AI_DESCRIPTION_ENABLED:
            print("🔄 COMPOSE SUMMARY: AI generation is enabled, attempting synchronous AI description")
            ai_description = generate_personalized_description_llm_blocking(answers)
            
            if ai_description:
                print(f"🔄 COMPOSE SUMMARY: ✅ AI generation succeeded: '{ai_description}'")
                return ai_description
            else:
                print("🔄 COMPOSE SUMMARY: ⚠️  AI generation returned empty result, falling back")
            # Fall through to fallback if AI returns empty
        else:
            print("🔄 COMPOSE SUMMARY: AI description generation is disabled, using fallback")
            
        # Fallback to rule-based description
        if AI_DESCRIPTION_FALLBACK or not AI_DESCRIPTION_ENABLED:
            print("🔄 COMPOSE SUMMARY: Using rule-based fallback")
            fallback_result = compose_summary_fallback(profile, answers, locale)
            print(f"🔄 COMPOSE SUMMARY: ✅ Fallback result: '{fallback_result}'")
            return fallback_result
        else:
            print("🔄 COMPOSE SUMMARY: ❌ AI description failed and fallback is disabled")
            return "You are looking for resources to help you settle and thrive in Pittsburgh."
            
    except Exception as e:
        print(f"🔄 COMPOSE SUMMARY: ❌ Error in synchronous AI description: {e}")
        # Always fallback on error in synchronous contexts
        fallback_result = compose_summary_fallback(profile, answers, locale)
        print(f"🔄 COMPOSE SUMMARY: ✅ Emergency fallback result: '{fallback_result}'")
        return fallback_result


def compose_summary_fallback(profile: Dict[str, Any], answers: Dict[str, Any], locale: str = 'en') -> str:
    """Rule-based fallback for compose_summary"""
    # Import the enhanced personalization function from onboarding module
    from routers.onboarding import _build_english_personalized_description
    
    # Extract same data as onboarding module
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
    
    # Build personalized English description using same logic as onboarding
    return _build_english_personalized_description(
        audience, professional_status, primary_language,
        employment, housing_need, community_priorities, immediate_needs,
        timeline, audience_type, support_level, language_needs, language_support
    )