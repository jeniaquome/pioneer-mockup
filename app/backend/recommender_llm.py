"""
Core AI Recommendation Engine
==============================

This module contains the core AI/ML recommendation logic using Google Gemini.
It handles:
- AI-powered resource ranking and filtering
- Personalized category generation
- Smart resource distribution algorithms
- Cultural and demographic filtering

Architecture:
- recommender_llm.py: Core AI recommendation engine (THIS FILE - pure logic, async)
- recommendation.py: Public API wrapper with fallbacks

DO NOT import this module directly in routes - use recommendation.py instead.
For internal backend use only.
"""
import os
import json
import re
import asyncio
import logging
from typing import Any, Dict, List, Tuple, Optional
from datetime import datetime

from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, text as sql_text

from database import Resource

logger = logging.getLogger(__name__)

try:
    import google.generativeai as genai
except Exception:  # pragma: no cover - allows code to import without google-generativeai installed in some envs
    genai = None  # type: ignore


# Configuration
RECOMMENDER_MODEL = os.getenv("RECOMMENDER_MODEL", "gemini-flash-lite-latest")
MAX_CANDIDATES = int(os.getenv("RECOMMENDER_MAX_CANDIDATES", "200"))
AI_DESCRIPTION_ENABLED = os.getenv("AI_DESCRIPTION_ENABLED", "true").lower() == "true"
AI_DESCRIPTION_FALLBACK = os.getenv("AI_DESCRIPTION_FALLBACK", "true").lower() == "true"


_gemini_configured = False
def _configure_gemini() -> None:
    global _gemini_configured
    if not _gemini_configured:
        if genai is None:
            raise RuntimeError("Google Generative AI SDK not installed. Please add 'google-generativeai' to backend requirements.")
        
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise RuntimeError("GOOGLE_API_KEY environment variable must be set")
        
        genai.configure(api_key=api_key)
        _gemini_configured = True


# Import canonical normalize_answers from recommendation module
# This ensures consistent normalization across all recommendation code
from recommendation import normalize_answers as _normalize_answers


def _generate_user_profile(answers: Dict[str, Any]) -> str:
    # Note: cultural_background intentionally excluded to avoid cultural bias in resource ranking
    profile_parts = []
    
    audience = answers.get('audience')
    if audience and audience != 'N/A':
        profile_parts.append(f"- Audience/Situation: {audience}")
    
    primary_language = answers.get('primary_language')
    if primary_language and primary_language not in ['N/A', 'en']:
        profile_parts.append(f"- Primary Language: {primary_language}")
    
    professional_status = answers.get('professional_status')
    if professional_status and professional_status != 'N/A':
        profile_parts.append(f"- Professional Status: {professional_status}")
    
    timeline = answers.get('timeline')
    if timeline and timeline != 'N/A':
        profile_parts.append(f"- Timeline: {timeline}")
        
    return "\n".join(profile_parts)


def _apply_first_things_first_distribution(resources: List[Resource], answers: Dict[str, Any], target_count: int) -> List[Resource]:
    """
    Apply smart distribution logic to select the best resources for First Things First.
    When user selects all 6 immediate needs, try to get 1 resource per need category.
    When user selects fewer needs, distribute evenly across selected categories.
    """
    immediate_needs = answers.get('immediate_needs', [])
    if not isinstance(immediate_needs, list):
        return resources[:target_count]
    
    # Filter out 'none' if present
    valid_needs = [need for need in immediate_needs if need and str(need).strip() and need != "none"]
    need_categories = _get_immediate_needs_categories(valid_needs)
    
    if not need_categories or len(need_categories) == 1:
        # Single category or no specific distribution needed
        return resources[:target_count]
    
    # Category mapping for resource classification
    category_keywords = {
        "social": ["social", "community", "networking", "volunteer", "civic", "meet", "friends", "connection"],
        "services": ["health", "banking", "transport", "medical", "financial", "bank", "clinic", "hospital"],
        "education": ["school", "education", "child", "enroll", "tutor", "academic", "learning", "student", "youth education", "school enrollment", "childcare", "preschool", "kindergarten"],
        "legal": ["legal aid", "attorney", "asylum", "visa", "citizenship", "immigration law", "legal assistance", "lawyer"],
        "wellness": ["mental", "wellness", "counsel", "therapy", "support", "wellbeing", "care", "mental health"],
        "emergency": ["emergency", "food", "shelter", "assistance", "pantry", "housing", "crisis", "urgent"]
    }
    
    # Classify resources by category
    categorized_resources = {cat: [] for cat in need_categories}
    unclassified = []
    
    for resource in resources:
        text = f"{resource.resource_name} {resource.summary} {resource.category} {resource.subcategory}".lower()
        classified = False
        
        # Priority-based classification: Try to classify based on most specific matches first
        best_category = None
        best_match_count = 0
        
        # Count keyword matches for each category to find the best fit
        for category in need_categories:
            if category in category_keywords:
                keywords = category_keywords[category]
                match_count = sum(1 for keyword in keywords if keyword in text)
                if match_count > best_match_count:
                    best_match_count = match_count
                    best_category = category
        
        # Only classify if we have at least one strong match
        if best_category and best_match_count > 0:
            categorized_resources[best_category].append(resource)
            classified = True
        
        if not classified:
            unclassified.append(resource)
    
    # Select resources with distribution preference
    selected: List[Resource] = []
    head_target = min(6, target_count)

    # 1) Build a HEAD list that guarantees at least one per selected need category
    # Take one from each category first (order-preserving)
    used_index: Dict[str, int] = {cat: 0 for cat in need_categories}
    for category in need_categories:
        if len(selected) >= head_target:
            break
        items = categorized_resources.get(category) or []
        if items:
            selected.append(items[0])
            used_index[category] = 1
        else:
            logger.warning(f"🧠 DISTRIBUTION DEBUG: No resources available for '{category}' category")

    # If we still haven't filled the head, round-robin through remaining items
    round_robin = True
    while round_robin and len(selected) < head_target:
        round_robin = False
        for category in need_categories:
            if len(selected) >= head_target:
                break
            items = categorized_resources.get(category) or []
            idx = used_index.get(category, 0)
            if idx < len(items):
                selected.append(items[idx])
                used_index[category] = idx + 1
                round_robin = True

    # 2) Fill remaining up to target_count using remaining categorized + unclassified
    remaining_slots = target_count - len(selected)
    if remaining_slots > 0:
        remaining_resources: List[Resource] = []
        for category in need_categories:
            items = categorized_resources.get(category) or []
            start = used_index.get(category, 0)
            if start < len(items):
                remaining_resources.extend(items[start:])
        remaining_resources.extend(unclassified)
        for resource in remaining_resources:
            if remaining_slots <= 0:
                break
            if resource not in selected:
                selected.append(resource)
                remaining_slots -= 1

    # 3) If still short, append from original list for safety
    if len(selected) < target_count:
        for resource in resources:
            if len(selected) >= target_count:
                break
            if resource not in selected:
                selected.append(resource)

    return selected[:target_count]


def _get_immediate_needs_categories(immediate_needs: List[str]) -> List[str]:
    """
    Map immediate needs to categories for even distribution in First Things First.
    Returns list of need categories that should be represented.
    Based on the 6 actual immediate needs from the survey.
    """
    if not immediate_needs or not isinstance(immediate_needs, list):
        logger.debug(f"🧠 MAPPING DEBUG: Invalid immediate_needs input: {immediate_needs}")
        return []
    
    # Mapping from the 6 immediate needs codes to simplified categories for distribution
    need_category_mapping = {
        "meet_people": "social",
        "basic_services": "services", 
        "school_enrollment": "education",
        "legal_immigration": "legal",
        "mental_health": "wellness",
        "emergency_assistance": "emergency"
    }
    
    # Get unique categories from selected needs (excluding 'none')
    categories = []
    seen = set()
    for need in immediate_needs:
        if need and str(need).strip() and need != "none":
            category = need_category_mapping.get(need)
            logger.debug(f"🧠 MAPPING DEBUG: Need '{need}' -> Category '{category}'")
            if category and category not in seen:
                categories.append(category)
                seen.add(category)
            elif not category:
                logger.warning(f"🧠 MAPPING DEBUG: No mapping found for immediate need: '{need}'")
    
    logger.debug(f"🧠 MAPPING DEBUG: Final categories: {categories}")
    return categories


def _generate_user_needs(answers: Dict[str, Any]) -> str:
    needs: List[str] = []
    housing_need = answers.get("housing_need")
    if housing_need:
        needs.append(f"Housing ({housing_need})")
    employment = answers.get("employment")
    if employment:
        needs.append(f"Employment ({employment})")
    language_support = answers.get("language_support")
    if language_support and str(language_support).lower() != "no language support needed":
        needs.append(f"Language Support ({language_support})")
    community = answers.get("community_priorities") or []
    if isinstance(community, list) and len(community) > 0:
        needs.append(f"Community Connections ({', '.join([str(x) for x in community])})")
    immediate = answers.get("immediate_needs") or []
    if isinstance(immediate, list) and len(immediate) > 0:
        needs.append(f"Immediate Needs ({', '.join([str(x) for x in immediate])})")
    return "\n".join(f"- {n}" for n in needs)


def _serialize_resource(resource: Resource) -> Dict[str, Any]:
    return {
        'id': resource.id,
        'resource_name': resource.resource_name,
        'category': resource.category,
        'subcategory': resource.subcategory,
        'summary': resource.summary,
        'website_link': resource.website_link,
        'physical_location': resource.physical_location,
    }


def _is_refugee_appropriate_resource(resource_name: str, summary: str, user_is_refugee: bool) -> bool:
    """
    Check if a refugee-specific resource is appropriate for the user.
    Returns True if the resource should be included, False if it should be filtered out.
    """
    if not resource_name and not summary:
        return True
    
    text = f"{resource_name} {summary}".lower()
    
    # Keywords that indicate refugee-specific resources
    refugee_keywords = [
        'refugee', 'asylum', 'immigrant services', 'resettlement', 'newcomer services',
        'temporary protected status', 'tps', 'immigration legal', 'immigration attorney',
        'immigration law', 'visa assistance', 'green card', 'naturalization',
        'citizenship classes', 'refugee assistance', 'refugee support',
        'immigration services', 'deportation defense', 'asylum seekers'
    ]
    
    # Check if this resource contains refugee-specific keywords
    has_refugee_content = any(keyword in text for keyword in refugee_keywords)
    
    if has_refugee_content:
        # If resource is refugee-specific, only show it if user is refugee/TPS
        return user_is_refugee
    
    # If it's not refugee-specific, show it to everyone
    return True


def _is_affordable_housing_appropriate_resource(resource_name: str, summary: str, user_needs_affordable: bool) -> bool:
    """
    Check if an affordable/subsidized housing resource is appropriate for the user.
    Returns True if the resource should be included, False if it should be filtered out.
    """
    if not resource_name and not summary:
        return True
    
    text = f"{resource_name} {summary}".lower()
    
    # Keywords that indicate affordable/subsidized housing resources
    affordable_housing_keywords = [
        'section 8', 'section eight', 'housing voucher', 'subsidized housing',
        'affordable housing', 'low income housing', 'income-based rent',
        'rent assistance', 'housing assistance', 'free housing', 'reduced rent',
        'housing subsidy', 'public housing', 'housing authority', 'hud',
        'income qualified', 'sliding scale rent', 'rental assistance'
    ]
    
    # Check if this resource contains affordable housing keywords
    has_affordable_housing_content = any(keyword in text for keyword in affordable_housing_keywords)
    
    if has_affordable_housing_content:
        # If resource is affordable housing-specific, only show it if user selected affordable housing
        return user_needs_affordable
    
    # If it's not affordable housing-specific, show it to everyone
    return True


def _is_culturally_relevant_resource(resource_name: str, summary: str, user_language: str) -> bool:
    """
    Check if a resource is culturally relevant to the user.
    Returns True if the resource should be included, False if it should be filtered out.
    """
    if not resource_name and not summary:
        return True
    
    text = f"{resource_name} {summary}".lower()
    
    # Language mapping for cultural relevance
    language_to_culture = {
        'es': ['hispanic', 'latino', 'spanish'],
        'zh': ['chinese', 'asian'],
        'ar': ['arabic', 'arab', 'middle eastern'],
        'fr': ['french'],
        'nepali': ['nepali', 'bhutanese'],
        'dari': ['afghan', 'dari'],
        'pashto': ['afghan', 'pashto'],
        'sw': ['swahili', 'african', 'east african'],
        'swahili': ['swahili', 'african', 'east african'],
        'uz': ['uzbek', 'central asian'],
        'uzbek': ['uzbek', 'central asian'],
        'en': ['english', 'american', 'british'],
        # Handle compound language codes from frontend survey
        'ne_dz': ['nepali', 'bhutanese', 'afghan', 'dari'],
        'fa_ps': ['afghan', 'dari', 'pashto'],
    }
    
    # Known cultural organization patterns that should be filtered
    cultural_patterns = [
        'african chamber', 'asian chamber', 'hispanic chamber', 'latino chamber',
        'chinese association', 'korean association', 'vietnamese association',
        'african american', 'black chamber', 'jewish federation',
        'indian association', 'pakistani association', 'bangladeshi association',
        'swahili association', 'east african', 'african community',
        'uzbek association', 'central asian', 'uzbek community',
        'english speaking', 'british association', 'american chamber'
    ]
    
    # Check if this is a culturally-specific organization
    for pattern in cultural_patterns:
        if pattern in text:
            # If user's language matches this cultural pattern, include it
            user_cultures = language_to_culture.get(user_language, [])
            for culture in user_cultures:
                if culture in pattern:
                    return True
            # Otherwise, exclude it
            return False
    
    # If it's not a culturally-specific organization, include it
    return True


def _should_include_resource(resource_name: str, summary: str, answers: Dict[str, Any]) -> bool:
    """
    Comprehensive resource filtering based on user's survey responses.
    Returns True if the resource should be included, False otherwise.
    """
    # Extract user preferences from survey answers
    user_language = answers.get('primary_language', 'en')
    user_audience = answers.get('audience', '')
    user_housing_need = answers.get('housing_need', '')
    
    # Determine user status
    user_is_refugee = (user_audience == 'refugee_tps')
    user_needs_affordable = (user_housing_need == 'affordable')
    
    # Apply all filtering criteria
    if not _is_culturally_relevant_resource(resource_name, summary, user_language):
        return False
    
    if not _is_refugee_appropriate_resource(resource_name, summary, user_is_refugee):
        return False
    
    if not _is_affordable_housing_appropriate_resource(resource_name, summary, user_needs_affordable):
        return False
    
    return True


def _filters_for_priority_key(category_key: str) -> Tuple[List[str], List[str]]:
    """Return tuples of (category_like_filters, subcategory_keyword_filters) for a priority key."""
    key = (category_key or '').lower().strip()
    if key == 'housing':
        return (
            ['Living/Essentials'],
            ['Housing', 'Rent', 'Relocating', 'Home', 'Assistance']
        )
    if key == 'education':
        return (
            ['Education/Youth', 'ESL/Immigrant'],
            ['ESL', 'Education', 'College', 'Youth', 'Tutoring', 'Translation', 'Language']
        )
    if key == 'income':
        return (
            ['Work/Business'],
            ['Career', 'Internship', 'Job', 'Business', 'Training', 'Development']
        )
    if key == 'first_things_first':
        return (
            ['Living/Essentials', 'ESL/Immigrant', 'Education/Youth', 'Community/Belonging', 'Work/Business', 'Culture/Leisure'],
            ['Emergency', 'Legal', 'Immigration', 'Health', 'Hospital', 'Transportation', 'Transit', 'School', 'Food', 'Pantry', 'Social', 'Community', 'Mental', 'Wellness', 'Banking', 'Financial', 'Childcare', 'Children', 'Youth education', 'School enrollment', 'Preschool', 'Elementary', 'Kindergarten', 'Daycare']
        )
    if key == 'meeting_people':
        return (
            ['Community/Belonging', 'Work/Business'],
            ['Civic', 'Volunteer', 'Religion', 'Social', 'Networking', 'Government', 'Youth']
        )
    if key == 'kids_activities':
        return (
            ['Education/Youth', 'Culture/Leisure'],
            ['Youth', 'Family', 'Programming', 'Recreation']
        )
    if key == 'faith_communities':
        return (
            ['Community/Belonging'],
            ['Religion', 'Faith', 'Church', 'Mosque', 'Synagogue', 'Temple']
        )
    if key == 'sports_wellness':
        return (
            ['Culture/Leisure', 'Living/Essentials'],
            ['Hobby', 'Sports', 'Recreation', 'Wellness', 'Body and mind']
        )
    if key == 'arts_entertainment':
        return (
            ['Culture/Leisure'],
            ['Art', 'Night', 'Entertainment', 'Hobby']
        )
    return ([], [])


def _fetch_candidates_for_priority_key(db: Session, category_key: str, limit: int) -> List[Resource]:
    base = db.query(Resource).filter(Resource.published == True, Resource.ready == True)
    cats, subs = _filters_for_priority_key(category_key)
    query = base
    if cats:
        try:
            query = query.filter(or_(*[Resource.category.ilike(f"%{c}%") for c in cats]))
        except Exception:
            pass
    if subs:
        try:
            query = query.filter(or_(*[Resource.subcategory.ilike(f"%{s}%") for s in subs]))
        except Exception:
            pass
    try:
        query = query.order_by(
            sql_text("priority DESC NULLS LAST"),
            desc(Resource.updated_at),
            Resource.resource_name.asc()
        )
    except Exception:
        query = query.order_by(Resource.resource_name.asc())
    
    # Middle-ground performance: cap DB candidates relative to requested limit
    # This keeps recall high while avoiding very large prompts
    try:
        cap_multiplier = 2
        db_cap = max(10, limit * cap_multiplier)
        logger.info(f"🧠 CANDIDATES: Using DB cap {db_cap} (limit={limit}, mult={cap_multiplier}) for category: {category_key}")
        return query.limit(db_cap).all()
    except Exception:
        logger.warning("🧠 CANDIDATES: Failed to apply DB cap; returning limited default 50")
        return query.limit(50).all()


async def generate_all_priority_resources_llm(db: Session, answers: Dict[str, Any], priority_categories: List[Dict[str, Any]], limit: int = 12) -> Dict[str, Dict[str, Any]]:
    """Pre-generate resources for ALL priority categories at once.
    
    This is more efficient than generating one-by-one and ensures users have
    instant access to all their priority resources without additional LLM calls.
    
    Returns: Dict[category_key, {"resources": [...], "source": "ai/fallback", "generated_at": "..."}]
    """
    logger.info(f"🧠 PRE-GENERATING ALL PRIORITY RESOURCES: {len(priority_categories)} categories")
    
    results = {}
    
    for category in priority_categories:
        category_key = category.get("key")
        if not category_key:
            continue
            
        try:
            # Determine appropriate limit for this category
            # Middle ground: enough variety for quality ranking without slow prompts
            if category_key == "first_things_first":
                category_limit = 50   # per request: 50 for FTF
                target_display = 15   # enforce max user display
            else:
                category_limit = 40   # per request: 40 for others
                target_display = 15   # enforce max user display
            
            # Generate resources for this category
            resources = await rank_resources_llm_for_priority_category(db, answers, category_key, category_limit, target_display)
            results[category_key] = {
                "resources": resources,
                "source": "ai",
                "generated_at": datetime.utcnow().isoformat()
            }
            logger.info(f"🧠 PRE-GENERATED RESOURCES [{category_key}]: {len(resources)} items (limit: {category_limit})")
        except Exception as e:
            logger.warning(f"🧠 PRE-GENERATION FAILED [{category_key}]: {e}")
            results[category_key] = {
                "resources": [],
                "source": "fallback",
                "generated_at": datetime.utcnow().isoformat()
            }
    
    logger.info(f"🧠 PRE-GENERATION COMPLETE: {len(results)} categories processed")
    return results


async def rank_resources_llm_for_priority_category(db: Session, answers: Dict[str, Any], category_key: str, limit: int, target_display: Optional[int] = None) -> List[Dict[str, Any]]:
    """Rerank database candidates for a specific priority category key.

    Uses the same LLM ranking flow but constrains candidates to a category-specific
    slice. Falls back to deterministic ordering if AI fails.
    
    Special handling for "first_things_first" category to ensure even distribution
    across the 6 immediate needs when multiple are selected.
    """
    normalized = _normalize_answers(answers or {})
    normalized.pop('tech_comfort', None)

    # Set up display limit for final results
    final_limit = target_display if target_display is not None else limit
    
    # For First Things First, we get more resources from LLM but filter to best distributed ones
    if category_key == "first_things_first":
        logger.info(f"🧠 PRIORITY RESOURCES [{category_key}]: Requesting {limit} resources from LLM, will filter to top {final_limit} with proper distribution")

    candidates: List[Resource] = _fetch_candidates_for_priority_key(db, category_key, limit)
    logger.info(f"🧠 PRIORITY RESOURCES [{category_key}]: Found {len(candidates)} category-constrained candidates")

    if not candidates:
        logger.warning(f"🧠 PRIORITY RESOURCES [{category_key}]: No candidates, returning empty list")
        return []

    candidate_snap: List[Tuple[str, str, str, str]] = []
    for r in candidates:
        candidate_snap.append((
            r.resource_name or '',
            r.summary or '',
            r.category or '',
            r.subcategory or ''
        ))

    user_profile = _generate_user_profile(normalized)
    user_needs = _generate_user_needs(normalized)

    candidates_str_parts: List[str] = []
    for (name, summary, category, subcategory) in candidate_snap:
        candidates_str_parts.append(
            f"- Resource: \"{name}\"\n  Summary: {summary}\n  Category: {category}/{subcategory}\n"
        )
    candidates_str = "\n".join(candidates_str_parts)

    # Extract user status for enhanced prompt
    user_audience = normalized.get('audience', '')
    user_housing_need = normalized.get('housing_need', '')
    user_is_refugee = (user_audience == 'refugee_tps')
    user_needs_affordable = (user_housing_need == 'affordable')

    # Special handling for First Things First category with proper 6-item distribution
    distribution_guidance = ""
    if category_key == "first_things_first":
        immediate_needs = normalized.get('immediate_needs', [])
        logger.info(f"🧠 FIRST THINGS FIRST DEBUG: Raw immediate_needs: {immediate_needs}")
        
        if isinstance(immediate_needs, list) and len(immediate_needs) >= 1:
            # Filter out 'none' if present
            valid_needs = [need for need in immediate_needs if need and str(need).strip() and need != "none"]
            logger.info(f"🧠 FIRST THINGS FIRST DEBUG: Valid needs after filtering: {valid_needs}")
            
            if len(valid_needs) >= 1:
                need_categories = _get_immediate_needs_categories(valid_needs)
                logger.info(f"🧠 FIRST THINGS FIRST DEBUG: Mapped need categories: {need_categories}")
                
                if len(valid_needs) == 6 and len(need_categories) == 6:
                    # User selected all 6 immediate needs - ensure exactly 1 resource per category
                    distribution_guidance = (
                        f"\nSPECIAL DISTRIBUTION REQUIREMENT FOR FIRST THINGS FIRST:\n"
                        f"User selected ALL 6 immediate needs from the survey.\n"
                        f"Selected immediate needs: {', '.join(valid_needs)}\n"
                        f"Need categories to represent: {', '.join(need_categories)}\n"
                        f"CRITICAL: Return exactly 6 resources, with exactly 1 resource for each need category:\n"
                        f"1. One resource for SOCIAL/COMMUNITY (meet_people) - Find a resource that helps with social connections, networking, community groups, meeting people\n"
                        f"2. One resource for SERVICES (basic_services) - Find a resource for healthcare, banking, transportation, or basic services\n"
                        f"3. One resource for EDUCATION (school_enrollment) - Find a resource for schools, childcare, education services, or child enrollment\n"
                        f"4. One resource for LEGAL (legal_immigration) - Find a resource for legal aid, immigration assistance, or legal services\n"
                        f"5. One resource for WELLNESS (mental_health) - Find a resource for mental health, counseling, wellness support, or mental health services\n"
                        f"6. One resource for EMERGENCY (emergency_assistance) - Find a resource for food assistance, shelter, emergency services, or emergency support\n"
                        f"SEARCH STRATEGY: Look through ALL candidate resources to find the best match for each category.\n"
                        f"If a resource could fit multiple categories, assign it to the category that needs it most.\n"
                        f"Each of the 6 resources MUST address a different immediate need category.\n"
                        f"This distribution is MANDATORY for proper user experience - all 6 immediate need types must be covered.\n"
                    )
                elif len(valid_needs) > 1 and len(need_categories) > 1:
                    # User selected multiple but not all immediate needs
                    distribution_guidance = (
                        f"\nSPECIAL DISTRIBUTION REQUIREMENT FOR FIRST THINGS FIRST:\n"
                        f"User selected {len(valid_needs)} immediate needs from the 6 possible options.\n"
                        f"Selected immediate needs: {', '.join(valid_needs)}\n"
                        f"Need categories to represent: {', '.join(need_categories)}\n"
                        f"CRITICAL: Distribute the 6 resources evenly across these {len(need_categories)} need categories.\n"
                        f"Target: approximately {6 // len(need_categories)} resource(s) per category, ensuring all categories are represented.\n"
                        f"Prioritize covering all selected need types rather than clustering multiple resources in one area.\n"
                    )
                elif len(valid_needs) == 1:
                    # User selected only one immediate need - still provide guidance for focused results
                    single_category = need_categories[0] if need_categories else "general"
                    distribution_guidance = (
                        f"\nFOCUSED REQUIREMENT FOR FIRST THINGS FIRST:\n"
                        f"User selected only 1 immediate need: {valid_needs[0]}\n"
                        f"Need category: {single_category}\n"
                        f"CRITICAL: Return exactly 6 resources that are ALL highly relevant to {valid_needs[0]}.\n"
                        f"Focus on finding the 6 BEST resources for this specific immediate need.\n"
                        f"Ensure all 6 resources directly address: {valid_needs[0]}\n"
                    )
                
                logger.info(f"🧠 FIRST THINGS FIRST DEBUG: Distribution guidance generated: {bool(distribution_guidance)}")
                if distribution_guidance:
                    logger.info(f"🧠 FIRST THINGS FIRST DEBUG: Guidance content preview: {distribution_guidance[:200]}...")

    prompt = (
        "Rank only the resources most relevant for the specific priority category shown below.\n"
        f"Priority category key: {category_key}.\n"
        "Disqualify items that are not a clear fit for this category.\n\n"
        "CRITICAL FILTERING REQUIREMENTS:\n"
        f"- REFUGEE/IMMIGRATION RESOURCES: User is {'a refugee/TPS holder' if user_is_refugee else 'NOT a refugee/TPS holder'}. "
        f"{'Include' if user_is_refugee else 'EXCLUDE'} resources specifically for refugees, asylum seekers, immigration services, or TPS holders.\n"
        f"- AFFORDABLE HOUSING RESOURCES: User {'selected affordable housing' if user_needs_affordable else 'did NOT select affordable housing'}. "
        f"{'Include' if user_needs_affordable else 'EXCLUDE'} resources offering Section 8, housing vouchers, subsidized housing, or rent assistance.\n\n"
        "RANKING GUIDELINES:\n"
        "- Only include resources that clearly fit the priority category\n"
        "- For language-specific resources: match to user's primary language when relevant\n"
        "- For cultural/community organizations: only include if they serve the user's linguistic community\n"
        "- Exclude resources serving different cultural/ethnic communities unless they're general-purpose\n"
        "- Prioritize practical relevance over demographic matching\n"
        "- Quality over quantity: fewer highly relevant resources are better than many loose matches\n"
        + distribution_guidance + "\n"
        "USER PROFILE:\n" + user_profile + "\n\n" +
        "USER'S STATED NEEDS:\n" + user_needs + "\n\n" +
        "CANDIDATE RESOURCES:\n" + candidates_str + "\n" +
        "Return a JSON object with key 'ranked_resource_names' as a list of resource names,\n"
        f"ordered most to least relevant for this category. Only include clearly relevant resources.\n"
        f"Include up to {max(limit * 2, 20)} items, prioritizing quality over quantity. Include fewer if most candidates aren't strong matches."
    )

    ranked_names: List[str] = []
    try:
        _configure_gemini()
        model = genai.GenerativeModel(RECOMMENDER_MODEL)
        logger.debug(f"Making LLM call for priority category '{category_key}' with {len(candidate_snap)} candidates (limit: {limit})")
        
        full_prompt = f"System: You are an intelligent resource matching engine. Respond in JSON only.\n\nUser: {prompt}"
        resp = await model.generate_content_async(
            full_prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=0.2,
                response_mime_type="application/json"
            )
        )
        content = resp.text if resp and resp.text else "{}"
        parsed = json.loads(content)
        ranked_names = list(parsed.get("ranked_resource_names", []))
        logger.info(f"🧠 PRIORITY RESOURCES [{category_key}]: AI ranked {len(ranked_names)} resources")
    except Exception as e:
        logger.warning(f"🧠 PRIORITY RESOURCES [{category_key}]: LLM ranking failed: {e}. Falling back")
        ranked_names = []

    # Apply comprehensive filtering and smart distribution for First Things First
    logger.debug(f"🧠 PRIORITY RESOURCES [{category_key}]: Applying comprehensive filtering (cultural, refugee, affordable housing)")
    
    name_to_resource: Dict[str, Resource] = { (r.resource_name or ''): r for r in candidates }
    all_filtered: List[Resource] = []
    seen_ids = set()
    
    # First pass: ranked items with comprehensive filtering (collect all valid resources)
    for idx, name in enumerate(ranked_names):
        r = name_to_resource.get(name)
        if r and r.id not in seen_ids:
            if _should_include_resource(r.resource_name or '', r.summary or '', normalized):
                # Attach a blended score using LLM order, then DB priority (recency removed)
                llm_rank = idx  # lower is better
                db_priority = -(r.priority or 0)  # lower is better after negation
                name_tie = (r.resource_name or '').lower()
                # Composite tuple for later sorting if needed
                setattr(r, "_blend_key", (llm_rank, db_priority, name_tie))
                all_filtered.append(r)
                seen_ids.add(r.id)
            else:
                logger.debug(f"🧠 FILTERING: Excluded resource: {r.resource_name}")

    # Second pass: fill remaining slots with filtered deterministic fallback
    if len(all_filtered) < limit:
        deterministic = sorted(
            [r for r in candidates if r.id not in seen_ids],
            key=lambda x: (
                -(x.priority or 0),
                (x.updated_at or datetime.min),
                (x.resource_name or '')
            )
        )
        for r in deterministic:
            if len(all_filtered) >= limit:
                break
            if _should_include_resource(r.resource_name or '', r.summary or '', normalized):
                # LLM didn't rank this; push behind LLM-ranked by using large llm_rank
                name_tie = (r.resource_name or '').lower()
                setattr(r, "_blend_key", (10**6, -(r.priority or 0), name_tie))
                all_filtered.append(r)
            else:
                logger.debug(f"🧠 FILTERING: Excluded fallback resource: {r.resource_name}")

    # Apply smart distribution for First Things First category
    if category_key == "first_things_first" and target_display and len(all_filtered) >= target_display:
        # Get the best distributed top 6, then add the remaining resources
        top_distributed = _apply_first_things_first_distribution(all_filtered, normalized, target_display)
        remaining_resources = [r for r in all_filtered if r not in top_distributed]
        ordered = top_distributed + remaining_resources
        logger.info(f"🧠 PRIORITY RESOURCES [{category_key}]: Applied smart distribution, top {len(top_distributed)} distributed + {len(remaining_resources)} additional = {len(ordered)} total")
    else:
        # For other categories or when we don't have enough resources, use all available
        # Blend ordering: LLM rank first, then DB priority, then recency, then name
        try:
            ordered = sorted(
                all_filtered,
                key=lambda x: getattr(x, "_blend_key", (10**6, -(x.priority or 0), (x.resource_name or "").lower()))
            )
        except Exception:
            ordered = all_filtered

    # Apply final limit to ensure we don't return more than requested
    final_ordered = ordered[:final_limit] if final_limit else ordered
    
    logger.info(f"🧠 PRIORITY RESOURCES [{category_key}]: Returning {len(final_ordered)} filtered resources (target: {final_limit}, available: {len(ordered)})")
    return [_serialize_resource(r) for r in final_ordered]

async def generate_personalized_description_llm(answers: Dict[str, Any]) -> str:
    """Generate a personalized 'You are a...' description using AI.
    
    Returns an AI-generated personalized description in the format:
    'You are a [profile] looking for [needs].'
    
    Falls back to empty string if generation fails.
    """
    normalized = _normalize_answers(answers or {})
    logger.info("🧠 AI DESCRIPTION: Starting AI description generation")
    logger.debug(f"🧠 AI DESCRIPTION: Input data - {normalized}")
    
    # Build a comprehensive user context for the AI
    user_context_parts = []
    
    # Basic profile information
    audience = normalized.get('audience', '')
    if audience:
        user_context_parts.append(f"Audience/Situation: {audience}")
    
    professional_status = normalized.get('professional_status', '')
    if professional_status:
        user_context_parts.append(f"Professional Status: {professional_status}")
    
    primary_language = normalized.get('primary_language', 'en')
    if primary_language and primary_language != 'en':
        user_context_parts.append(f"Primary Language: {primary_language}")
    
    # Note: cultural_background intentionally excluded to avoid racial/ethnic mentions in AI descriptions
    
    timeline = normalized.get('timeline', '')
    if timeline:
        user_context_parts.append(f"Timeline/Arrival Status: {timeline}")
    
    # Specific needs
    housing_need = normalized.get('housing_need', '')
    if housing_need and housing_need != 'secured':
        user_context_parts.append(f"Housing Need: {housing_need}")
    
    employment = normalized.get('employment', '')
    if employment and employment not in ['no_support_needed']:
        user_context_parts.append(f"Employment Status: {employment}")
    
    language_support = normalized.get('language_support', '')
    if language_support and 'no language support' not in str(language_support).lower():
        user_context_parts.append(f"Language Support Need: {language_support}")
    
    community_priorities = normalized.get('community_priorities', [])
    if isinstance(community_priorities, list) and community_priorities:
        clean_priorities = [str(p).strip() for p in community_priorities if p and str(p).strip()]
        if clean_priorities:
            user_context_parts.append(f"Community Priorities: {', '.join(clean_priorities)}")
    
    immediate_needs = normalized.get('immediate_needs', [])
    if isinstance(immediate_needs, list) and immediate_needs:
        clean_needs = [str(n).strip() for n in immediate_needs if n and str(n).strip()]
        if clean_needs:
            user_context_parts.append(f"Immediate Needs: {', '.join(clean_needs)}")
    
    user_context = "\n".join(f"- {part}" for part in user_context_parts)
    logger.debug(f"🧠 AI DESCRIPTION: Built user context with {len(user_context_parts)} elements")
    
    prompt = (
        "Based on the user profile information below, generate a personalized description in the exact format:\n"
        "'You are a [descriptive profile] looking for [specific needs].'\n\n"
        "Requirements:\n"
        "- Start with 'You are a' and end with a period\n"
        "- Be specific and personalized based on the provided information\n"
        "- Focus on the most relevant aspects of their identity and current situation\n"
        "- Include their primary needs in a natural, conversational way\n"
        "- Keep it concise but comprehensive (1-2 sentences max)\n"
        "- Use inclusive, welcoming language\n"
        "- If they're a newcomer/immigrant, acknowledge their journey\n"
        "- Connect their background to their current needs\n"
        "- IMPORTANT: Do not include any references to race, ethnicity, national origin, or cultural background\n"
        "- Focus on professional status, needs, timeline, and goals rather than demographic characteristics\n\n"
        "USER PROFILE:\n" + user_context + "\n\n" +
        "Generate only the personalized description, nothing else."
    )
    
    try:
        _configure_gemini()
        model = genai.GenerativeModel(RECOMMENDER_MODEL)
        logger.info(f"🧠 AI DESCRIPTION: Making Gemini API call using model {RECOMMENDER_MODEL}")
        logger.debug(f"🧠 AI DESCRIPTION: Prompt length: {len(prompt)} characters")
        
        full_prompt = f"System: You are an expert at creating personalized, empathetic descriptions for newcomers and immigrants. Create natural, welcoming descriptions that acknowledge their unique journey and needs. Never include references to race, ethnicity, national origin, or cultural background - focus on professional status, goals, and specific needs instead.\n\nUser: {prompt}"
        resp = await model.generate_content_async(
            full_prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=0.3,  # Slightly more creative than resource ranking
                max_output_tokens=200  # Keep descriptions concise
            )
        )
        content = resp.text if resp and resp.text else ""
        description = content.strip()
        
        logger.info(f"🧠 AI DESCRIPTION: ✅ Successfully generated description: '{description}'")
        
        # Basic validation - ensure it follows the expected format
        if description and description.startswith("You are") and description.endswith("."):
            logger.info("🧠 AI DESCRIPTION: ✅ Format validation passed")
            return description
        else:
            logger.warning(f"🧠 AI DESCRIPTION: ❌ Format validation failed - Description: '{description}'")
            logger.warning("🧠 AI DESCRIPTION: Expected format: 'You are a... looking for...'")
            return ""
            
    except Exception as e:
        logger.error(f"🧠 AI DESCRIPTION: ❌ Gemini API call failed: {e}")
        return ""


def generate_personalized_description_llm_blocking(answers: Dict[str, Any]) -> str:
    """Synchronous wrapper for AI description generation."""
    logger.info("🧠 AI DESCRIPTION: Starting synchronous AI description generation")
    
    normalized = _normalize_answers(answers or {})
    logger.debug(f"🧠 AI DESCRIPTION: Input data - {normalized}")
    
    # Build a comprehensive user context for the AI
    user_context_parts = []
    
    # Basic profile information
    audience = normalized.get('audience', '')
    if audience:
        user_context_parts.append(f"Audience/Situation: {audience}")
    
    professional_status = normalized.get('professional_status', '')
    if professional_status:
        user_context_parts.append(f"Professional Status: {professional_status}")
    
    primary_language = normalized.get('primary_language', 'en')
    if primary_language and primary_language != 'en':
        user_context_parts.append(f"Primary Language: {primary_language}")
    
    timeline = normalized.get('timeline', '')
    if timeline:
        user_context_parts.append(f"Timeline/Arrival Status: {timeline}")
    
    # Specific needs
    housing_need = normalized.get('housing_need', '')
    if housing_need and housing_need != 'secured':
        user_context_parts.append(f"Housing Need: {housing_need}")
    
    employment = normalized.get('employment', '')
    if employment and employment not in ['no_support_needed']:
        user_context_parts.append(f"Employment Status: {employment}")
    
    language_support = normalized.get('language_support', '')
    if language_support and 'no language support' not in str(language_support).lower():
        user_context_parts.append(f"Language Support Need: {language_support}")
    
    community_priorities = normalized.get('community_priorities', [])
    if isinstance(community_priorities, list) and community_priorities:
        clean_priorities = [str(p).strip() for p in community_priorities if p and str(p).strip()]
        if clean_priorities:
            user_context_parts.append(f"Community Priorities: {', '.join(clean_priorities)}")
    
    immediate_needs = normalized.get('immediate_needs', [])
    if isinstance(immediate_needs, list) and immediate_needs:
        clean_needs = [str(n).strip() for n in immediate_needs if n and str(n).strip()]
        if clean_needs:
            user_context_parts.append(f"Immediate Needs: {', '.join(clean_needs)}")
    
    user_context = "\n".join(f"- {part}" for part in user_context_parts)
    logger.debug(f"🧠 AI DESCRIPTION: Built user context with {len(user_context_parts)} elements")
    
    prompt = (
        "Based on the user profile information below, generate a personalized description in the exact format:\n"
        "'You are a [descriptive profile] looking for [specific needs].'\n\n"
        "Requirements:\n"
        "- Start with 'You are a' and end with a period\n"
        "- Be specific and personalized based on the provided information\n"
        "- Focus on the most relevant aspects of their identity and current situation\n"
        "- Include their primary needs in a natural, conversational way\n"
        "- Keep it concise but comprehensive (1-2 sentences max)\n"
        "- Use inclusive, welcoming language\n"
        "- If they're a newcomer/immigrant, acknowledge their journey\n"
        "- Connect their background to their current needs\n"
        "- IMPORTANT: Do not include any references to race, ethnicity, national origin, or cultural background\n"
        "- Focus on professional status, needs, timeline, and goals rather than demographic characteristics\n\n"
        "USER PROFILE:\n" + user_context + "\n\n" +
        "Generate only the personalized description, nothing else."
    )
    
    try:
        _configure_gemini()
        model = genai.GenerativeModel(RECOMMENDER_MODEL)
        logger.info(f"🧠 AI DESCRIPTION: Making Gemini API call using model {RECOMMENDER_MODEL}")
        logger.debug(f"🧠 AI DESCRIPTION: Prompt length: {len(prompt)} characters")
        
        full_prompt = f"System: You are an expert at creating personalized, empathetic descriptions for newcomers and immigrants. Create natural, welcoming descriptions that acknowledge their unique journey and needs. Never include references to race, ethnicity, national origin, or cultural background - focus on professional status, goals, and specific needs instead.\n\nUser: {prompt}"
        
        # Use synchronous generate_content instead of async version
        resp = model.generate_content(
            full_prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=0.3,
                max_output_tokens=200
            )
        )
        content = resp.text if resp and resp.text else ""
        description = content.strip()
        
        logger.info(f"🧠 AI DESCRIPTION: ✅ Successfully generated description: '{description}'")
        
        # Basic validation - ensure it follows the expected format
        if description and description.startswith("You are") and description.endswith("."):
            logger.info("🧠 AI DESCRIPTION: ✅ Format validation passed")
            return description
        else:
            logger.warning(f"🧠 AI DESCRIPTION: ❌ Format validation failed - Description: '{description}'")
            logger.warning("🧠 AI DESCRIPTION: Expected format: 'You are a... looking for...'")
            return ""
            
    except Exception as e:
        logger.error(f"🧠 AI DESCRIPTION: ❌ Gemini API call failed: {e}")
        return ""


def _generate_subtitle_for_category(category_key: str, normalized_answers: Dict[str, Any]) -> str:
    """Generate personalized subtitle for a category based on deterministic rules."""
    if category_key == "housing":
        housing_need = str(normalized_answers.get("housing_need", "")).lower()
        if "market" in housing_need or "market_rate" in housing_need:
            return "Find apartments, neighborhoods, and rental listings now."
        elif "affordable" in housing_need:
            return "Access affordable housing programs and financial assistance."
        elif "temporary" in housing_need or "emergency" in housing_need:
            return "Find emergency shelter and temporary housing options."
        elif "shared" in housing_need or "roommate" in housing_need:
            return "Connect with roommates and explore shared housing."
        elif "buying" in housing_need or "buy" in housing_need:
            return "Explore home buying resources and mortgage assistance."
        else:
            return "Find housing support and resources."
    
    elif category_key == "education":
        language_support_list = normalized_answers.get("language_support")
        if not isinstance(language_support_list, list):
            language_support_list = [str(language_support_list).lower()] if language_support_list else []
        else:
            language_support_list = [str(ls).lower() for ls in language_support_list]
        
        immediate_needs = normalized_answers.get("immediate_needs") or []
        has_school_enrollment = isinstance(immediate_needs, list) and "school_enrollment" in immediate_needs
        lang_support_needed = any(ls != "none" for ls in language_support_list)
        
        if has_school_enrollment and lang_support_needed:
            return "Access school enrollment help and language learning resources."
        elif has_school_enrollment:
            return "Find schools, childcare, and youth education programs."
        elif lang_support_needed:
            parts = []
            if "esl" in language_support_list:
                parts.append("ESL classes")
            if "professional_english" in language_support_list or "professional" in language_support_list:
                parts.append("professional English skills")
            if "translation" in language_support_list:
                parts.append("document translation services")
            if "conversation" in language_support_list:
                parts.append("conversational English practice")
            
            if len(parts) == 1:
                return f"Access {parts[0]} now."
            elif len(parts) > 1:
                joined_parts = ", ".join(parts[:-1])
                return f"Access {joined_parts} and {parts[-1]} now."
        return "Access language learning and education resources."
    
    elif category_key == "income":
        professional_status = str(normalized_answers.get("professional_status", "")).lower()
        employment_list = normalized_answers.get("employment")
        if not isinstance(employment_list, list):
            employment_list = [str(employment_list).lower()] if employment_list else []
        else:
            employment_list = [str(e).lower() for e in employment_list]
        
        income_parts = []
        if "student" in professional_status:
            income_parts.append("internships, part-time jobs, and student employment")
        if "seeking" in professional_status or "recent_grad" in professional_status:
            income_parts.append("jobs, internships, and career development resources")
        if "job_search" in employment_list:
            income_parts.append("job search assistance")
        if "skills_training" in employment_list:
            income_parts.append("skills training and certification programs")
        if "networking_advancement" in employment_list:
            income_parts.append("professional networking and career advancement")
        
        income_parts = list(dict.fromkeys(income_parts))  # Remove duplicates
        
        if len(income_parts) == 1:
            return f"Access {income_parts[0]} now."
        elif len(income_parts) > 1:
            joined_income = ", ".join(income_parts[:-1])
            return f"Access {joined_income} and {income_parts[-1]} now."
        return "Access employment support and career resources."
    
    elif category_key == "meeting_people":
        professional_status = str(normalized_answers.get("professional_status", "")).lower()
        employment_list = normalized_answers.get("employment")
        if not isinstance(employment_list, list):
            employment_list = [str(employment_list).lower()] if employment_list else []
        else:
            employment_list = [str(e).lower() for e in employment_list]
        community_priorities = normalized_answers.get("community_priorities") or []
        
        if "tech" in professional_status:
            return "Connect with tech and engineering professional networks."
        elif "academic" in professional_status:
            return "Connect with academic and research networking organizations."
        elif "healthcare" in professional_status:
            return "Connect with healthcare and life sciences professional groups."
        elif "industry_networks" in employment_list:
            return "Connect with industry-specific professional networks."
        elif "pro_networks" in community_priorities:
            return "Connect with local professional networks and groups."
        elif "social_entertainment" in community_priorities:
            return "Find social events and community connections."
        return "Build professional and social connections."
    
    elif category_key == "first_things_first":
        return "Immediate essentials: legal, school, health, transport, emergencies"
    
    elif category_key == "kids_activities":
        return "Family and children programs, events and services"
    
    elif category_key == "faith_communities":
        return "Cultural and faith-based groups and gatherings"
    
    elif category_key == "sports_wellness":
        return "Sports, recreation and wellness activities"
    
    elif category_key == "arts_entertainment":
        return "Arts, culture, and entertainment events"
    
    return ""


def _should_include_category(category_key: str, normalized_answers: Dict[str, Any]) -> bool:
    """Determine if a category should be included based on survey answers."""
    community_priorities = normalized_answers.get("community_priorities") or []
    if not isinstance(community_priorities, list):
        community_priorities = []
    immediate_needs = normalized_answers.get("immediate_needs") or []
    if not isinstance(immediate_needs, list):
        immediate_needs = []
    
    if category_key == "housing":
        housing_need = str(normalized_answers.get("housing_need", "")).lower()
        return housing_need and housing_need != "secured"
    
    elif category_key == "education":
        language_support_list = normalized_answers.get("language_support")
        if not isinstance(language_support_list, list):
            language_support_list = [str(language_support_list).lower()] if language_support_list else []
        else:
            language_support_list = [str(ls).lower() for ls in language_support_list]
        has_school_enrollment = isinstance(immediate_needs, list) and "school_enrollment" in immediate_needs
        lang_support_needed = any(ls != "none" for ls in language_support_list)
        return lang_support_needed or has_school_enrollment
    
    elif category_key == "income":
        employment_list = normalized_answers.get("employment")
        if not isinstance(employment_list, list):
            employment_list = [str(employment_list).lower()] if employment_list else []
        else:
            employment_list = [str(e).lower() for e in employment_list]
        professional_status = str(normalized_answers.get("professional_status", "")).lower()
        valid_employment = any(e in ["job_search", "skills_training", "networking_advancement"] for e in employment_list) and "no_support_needed" not in employment_list
        valid_profession = any(k in professional_status for k in ["student", "seeking", "recent_grad"])
        return valid_employment or valid_profession
    
    elif category_key == "first_things_first":
        return isinstance(immediate_needs, list) and len(immediate_needs) > 0 and not all(n == "none" for n in immediate_needs)
    
    elif category_key == "meeting_people":
        employment_list = normalized_answers.get("employment")
        if not isinstance(employment_list, list):
            employment_list = [str(employment_list).lower()] if employment_list else []
        else:
            employment_list = [str(e).lower() for e in employment_list]
        professional_status = str(normalized_answers.get("professional_status", "")).lower()
        has_pro_networks = "pro_networks" in community_priorities
        has_social = "social_entertainment" in community_priorities
        has_industry_networks = "industry_networks" in employment_list
        has_networking_profession = any(tok in professional_status for tok in ["tech", "academic", "healthcare"])
        return has_pro_networks or has_social or has_industry_networks or has_networking_profession
    
    elif category_key == "kids_activities":
        return "family_children" in community_priorities
    
    elif category_key == "faith_communities":
        return "cultural_faith" in community_priorities
    
    elif category_key == "sports_wellness":
        return "sports_recreation" in community_priorities
    
    elif category_key == "arts_entertainment":
        return "arts_culture" in community_priorities
    
    return False


async def generate_priority_categories_llm(answers: Dict[str, Any]) -> Dict[str, Any]:
    """Generate priority categories using deterministic rules.
    
    Returns dict: { 'categories': List[{key,title,subtitle,order}], 'source': 'deterministic' }
    
    Note: Previously used AI for subtitle generation, but deterministic rules proved more
    reliable and consistent. AI is still used for resource ranking within categories.
    """
    normalized = _normalize_answers(answers or {})
    logger.info(f"🧠 PRIORITY CATEGORIES: Generating categories deterministically")
    
    # Category order and titles
    allowed = [
        "housing",
        "education",
        "income",
        "first_things_first",
        "meeting_people",
        "kids_activities",
        "faith_communities",
        "sports_wellness",
        "arts_entertainment",
    ]
    
    fixed_titles = {
        "housing": "Housing",
        "education": "Education",
        "income": "Income",
        "first_things_first": "First Things First",
        "meeting_people": "Meeting People",
        "kids_activities": "Kids Activities",
        "faith_communities": "Faith Communities",
        "sports_wellness": "Sports & Wellness",
        "arts_entertainment": "Arts & Entertainment",
    }
    
    # Generate categories using helper functions
    categories = []
    for order, key in enumerate(allowed, start=1):
        if _should_include_category(key, normalized):
            categories.append({
                "key": key,
                "title": fixed_titles[key],
                "subtitle": _generate_subtitle_for_category(key, normalized),
                "order": order
            })
    
    logger.info(f"🧠 PRIORITY CATEGORIES: Generated {len(categories)} categories deterministically")
    return {"categories": categories, "source": "deterministic"}


def generate_priority_categories_llm_blocking(answers: Dict[str, Any]) -> Dict[str, Any]:
    """Synchronous wrapper for category generation - simple since deterministic now."""
    return asyncio.run(generate_priority_categories_llm(answers))


def generate_all_priority_resources_llm_blocking(db: Session, answers: Dict[str, Any], priority_categories: List[Dict[str, Any]], limit: int = 12) -> Dict[str, Dict[str, Any]]:
    """Synchronous wrapper for priority resources generation."""
    try:
        # Always create a new event loop to avoid conflicts
        new_loop = asyncio.new_event_loop()
        asyncio.set_event_loop(new_loop)
        try:
            return new_loop.run_until_complete(generate_all_priority_resources_llm(db, answers, priority_categories, limit))
        finally:
            new_loop.close()
            asyncio.set_event_loop(None)
    except Exception as e:
        logger.error(f"🧠 PRIORITY RESOURCES: ❌ Synchronous wrapper failed: {e}")
        return {}

