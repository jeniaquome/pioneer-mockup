# Pioneer Resource Recommendation System - Technical Implementation Guide

## Architecture Overview

The system uses a two-stage pipeline: fast database candidate retrieval followed by an async LLM re-ranking. It also features AI-generated personalized descriptions with rule-based fallback. It preserves the existing frontend contract and DB persistence.

### Core Components

1. Survey processing (`normalize_answers` → `determine_profile`)
2. AI-generated personalized descriptions (`generate_personalized_description_llm`) with rule-based fallback
3. DB candidate retrieval (published & ready resources, broad category filters)
4. Async LLM re-ranking (`recommender_llm.rank_resources_llm`)
5. Deterministic fallback ordering (priority + recency) when LLM unavailable

## Data Flow

```
Survey → Profile → AI Description + DB Candidates → LLM Re-Rank → Top-N → Save to user
```

## 1) Survey & Profile

- Normalization: camelCase → snake_case; array coercion
- Profile is computed for summaries, but Q11 (`tech_comfort`) is ignored by the recommender

## 2) AI-Generated Personalized Descriptions

The system generates personalized "You are a..." descriptions using OpenAI's LLM:

- **AI Generation**: Uses `generate_personalized_description_llm()` with comprehensive user context
- **Rule-based Fallback**: Falls back to `_build_english_personalized_description()` if AI fails
- **Configuration**: Controlled by `AI_DESCRIPTION_ENABLED` and `AI_DESCRIPTION_FALLBACK` env vars
- **Format Validation**: Ensures descriptions start with "You are" and end with a period
- **Context**: Includes audience, professional status, language, cultural background, needs, and timeline

## 3) Candidate Retrieval

From `resources` table (`published & ready`). Broad filters mapped from answers:
- Housing need → Living/Essentials
- Employment/job search → Work/Business
- Student status → Education/Youth
- Community priorities → Community/Belonging
- Immediate needs → Living/Essentials

Candidates are capped by `RECOMMENDER_MAX_CANDIDATES`, ordered by `priority DESC NULLS LAST`, `updated_at DESC`, `resource_name ASC`.

## 4) LLM Re-Ranking

`recommender_llm.rank_resources_llm` builds a concise user profile + needs (Q1–Q10), prompts the LLM to return JSON `ranked_resource_names`, maps back to DB rows, and truncates to limit. If the LLM fails, results fall back to deterministic ordering.

## 5) Persistence & UI Contract

**Personalized Descriptions**: Saved to `users.roadmap_summary` as AI-generated text.

**Priority Resources**: Saved to `users.onboarding_profile` with structure:
- `priority_categories`: Array of category objects with `{key, title, subtitle, order}`
- `priority_resources`: Object mapping category keys to resource arrays

Each resource includes: `id`, `resource_name`, `category`, `subcategory?`, `summary?`, `website_link?`, `physical_location?`.

## 6) Triggers & Caching

**AI Description Generation:**
- **Initial Onboarding**: POST `/api/onboarding/submit` generates fresh AI description
- **Survey Updates**: PUT `/api/onboarding/responses` regenerates AI description
- **Demo Users**: Demo service automatically uses AI-enhanced descriptions

**Priority Resources Generation:**
- **Categories**: Generated during onboarding and stored in `onboarding_profile.priority_categories`
- **Resources**: Pre-generated for all categories and stored in `onboarding_profile.priority_resources`
- **Access**: Available via `/api/onboarding/priority-categories` and `/api/onboarding/priority-resources/{category_key}`

**Caching:**
- Priority resources are pre-generated and cached in the database for instant access
