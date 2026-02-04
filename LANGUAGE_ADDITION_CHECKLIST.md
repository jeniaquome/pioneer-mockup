# Language Addition Checklist

This document provides a comprehensive checklist of all files and locations that need to be updated when adding support for a new language to the Pittsburgh Tomorrow Pioneer application.

## Current Supported Languages (16 total)
- English (en)
- Spanish (es)
- French (fr)
- Chinese Simplified (zh)
- Arabic (ar)
- Swahili (sw)
- Nepali (ne)
- Pashto (ps)
- Uzbek (uz)
- Dari (prs) ✨ NEW
- Farsi (fa) ✨ NEW
- Japanese (ja) ✨ NEW
- German (de) ✨ NEW
- Portuguese (pt) ✨ NEW
- Russian (ru) ✨ NEW
- Urdu (ur) ✨ NEW

---

## Required Updates Checklist

### 1. Backend Files

#### ✅ `app/backend/translation_service.py`
**Location:** Lines 18-57
- [ ] Add language code and display name to `SUPPORTED_LANGUAGES` dictionary
- [ ] Add language code mapping to `GOOGLETRANS_CODES` dictionary
  - Note: Some languages may need special mapping (e.g., Dari 'prs' maps to 'fa' in googletrans)

**Example:**
```python
SUPPORTED_LANGUAGES = {
    # ... existing languages ...
    'new_code': 'Language Name',
}

GOOGLETRANS_CODES = {
    # ... existing mappings ...
    'new_code': 'googletrans_code',  # May be same as new_code
}
```

---

#### ✅ `app/backend/routers/auth.py`
**Location:** Lines 22-72
- [ ] Add language display name mappings to `LANGUAGE_DISPLAY_TO_CODE_MAP` dictionary
  - Include both capitalized and lowercase versions
  - Include common variations/aliases (e.g., 'Persian' → 'fa')
- [ ] Add language code to `valid_codes` list in `normalize_primary_language()` function (line 65-66)

**Example:**
```python
LANGUAGE_DISPLAY_TO_CODE_MAP = {
    # ... existing mappings ...
    'Language Name': 'new_code',
    'language name': 'new_code',  # lowercase version
    'alias': 'new_code',  # common alias
}

# In normalize_primary_language():
valid_codes = ['en', 'es', ..., 'new_code']
```

---

#### ✅ `app/backend/routers/onboarding.py`
**Location:** Lines 18-69
- [ ] Add language display name mappings to `LANGUAGE_DISPLAY_TO_CODE_MAP` dictionary
  - Include both capitalized and lowercase versions
  - Include common variations/aliases
- [ ] Add language code to `valid_codes` list in `normalize_primary_language()` function (line 62-63)

**Note:** This should match the mappings in `auth.py` for consistency.

---

### 2. Frontend Files

#### ✅ `app/frontend/src/lib/translations/index.ts`
**Location:** Lines 6-73
- [ ] Import the new language translation file
- [ ] Add language entry to `resources` object

**Example:**
```typescript
import { newLanguageTranslations } from './languages/new_code'

const resources = {
  // ... existing languages ...
  new_code: {
    translation: newLanguageTranslations
  },
}
```

---

#### ✅ `app/frontend/src/lib/translations/languages/[code].ts`
**Location:** Create new file
- [ ] Create new translation file for the language
- [ ] Copy structure from `en.ts` as template
- [ ] Translate all strings (or use translation service initially)
- [ ] Ensure all keys match the English translation structure exactly

**File naming:** Use the language code (e.g., `ru.ts` for Russian, `pt.ts` for Portuguese)

---

#### ✅ `app/frontend/src/lib/hreflang-config.ts`
**Location:** Lines 16-33
- [ ] Add language configuration to `SUPPORTED_LANGUAGES` array
- [ ] Include proper BCP 47 locale code (e.g., 'en-US', 'pt-BR', 'ru-RU')
- [ ] Include display name

**Example:**
```typescript
export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  // ... existing languages ...
  { code: 'new_code', locale: 'new_code-XX', name: 'Language Name' },
]
```

**Note:** Some languages don't use region codes (e.g., 'ar', 'sw') - check existing patterns.

---

#### ✅ `app/frontend/src/hooks/use-auto-language.ts`
**Location:** Lines 6 and 9-43
- [ ] Add language code to `SUPPORTED_LANGUAGES` array (line 6)
- [ ] Add language display name mappings to `LANGUAGE_DISPLAY_TO_CODE_MAP` object (lines 9-43)
  - Include both capitalized and lowercase versions
  - Include common variations/aliases

**Example:**
```typescript
const SUPPORTED_LANGUAGES = ['en', 'es', ..., 'new_code']

const LANGUAGE_DISPLAY_TO_CODE_MAP: Record<string, string> = {
  // ... existing mappings ...
  'Language Name': 'new_code',
  'language name': 'new_code',  // lowercase
}
```

---

#### ✅ `app/frontend/src/components/LanguageSelector.tsx`
**Location:** Lines 18-50
- [ ] Add language entry to `languages` array
- [ ] Include:
  - `code`: Language code
  - `name`: English name
  - `nativeName`: Native script name (for display in UI)
- [ ] Consider grouping with similar languages (see existing groupings)

**Example:**
```typescript
const languages: LanguageOption[] = [
  // ... existing languages ...
  { code: 'new_code', name: 'Language Name', nativeName: 'Native Script' },
]
```

---

#### ✅ `generate_sitemap.py`
**Location:** Lines 10-27
- [ ] Add language entry to `LANGUAGES` list
- [ ] Include both `code` and `locale` (BCP 47 format)

**Example:**
```python
LANGUAGES = [
    # ... existing languages ...
    {'code': 'new_code', 'locale': 'new_code-XX'},
]
```

**Note:** This generates multilingual sitemap entries for SEO.

---

### 3. Optional Updates (If Adding to Survey)

#### ⚠️ `app/frontend/src/lib/survey.ts`
**Location:** Lines 31-33
- [ ] Add language code to `QUESTION_CODES.primaryLanguage` array
- [ ] Ensure index aligns with translation labels

**Note:** Only update if the new language should appear in the onboarding survey's primary language question.

---

#### ⚠️ `app/frontend/src/lib/translations/languages/en.ts`
**Location:** `screening.questions.primaryLanguage.options` array
- [ ] Add language option label to the English translations
- [ ] Ensure index matches `QUESTION_CODES.primaryLanguage` in `survey.ts`

**Note:** This is only needed if adding the language to the survey form.

---

### 4. Database & Migration

#### ✅ Database Schema
**Status:** ✅ Already handled
- The schema migration in `migration_add_new_languages_20251229.py` extended `language_code` columns from VARCHAR(2) to VARCHAR(10)
- This supports language codes longer than 2 characters (e.g., 'prs' for Dari)

**No action needed** unless adding a language code longer than 10 characters (unlikely).

---

#### ⚠️ Data Migration (Optional)
**File:** Create new migration file if needed
- [ ] Create migration script to translate existing resources to new language
- [ ] Follow pattern from `migration_add_new_languages_20251229.py`
- [ ] Update `docker_entrypoint.py` if migration should run automatically

**Note:** 
- Resources are translated automatically when published
- User descriptions and category subtitles are translated on-demand
- Migration is only needed if you want to pre-translate existing content

---

### 5. Documentation Updates

#### ⚠️ `app/frontend/src/lib/translations/languages/en.ts`
**Location:** Various places mentioning language count
- [ ] Update language count mentions (e.g., "16+ languages" → "17+ languages")
- [ ] Update language lists in descriptions

**Example locations:**
- `homepage.servicesNote` (line 42)
- `homepage.languagesSupported` (line 48)

---

#### ⚠️ `PERSONALIZED_CATEGORY_SUBTITLES_IMPLEMENTATION.md`
**Location:** Line 7
- [ ] Update language list in documentation if it mentions specific languages

---

### 6. Testing Checklist

After making all updates:

- [ ] Verify language appears in language selector dropdown
- [ ] Verify language switching works correctly
- [ ] Verify translations load correctly (check browser console for errors)
- [ ] Verify hreflang tags are generated correctly (check page source)
- [ ] Verify sitemap includes new language URLs
- [ ] Test language detection from user profile
- [ ] Test language normalization in backend (submit survey with new language)
- [ ] Verify resource translations work for new language
- [ ] Test on-demand translation of user descriptions
- [ ] Test on-demand translation of category subtitles

---

## Quick Reference: File Locations Summary

| File | Lines | What to Update |
|------|-------|----------------|
| `app/backend/translation_service.py` | 18-57 | `SUPPORTED_LANGUAGES`, `GOOGLETRANS_CODES` |
| `app/backend/routers/auth.py` | 22-72 | `LANGUAGE_DISPLAY_TO_CODE_MAP`, `valid_codes` |
| `app/backend/routers/onboarding.py` | 18-69 | `LANGUAGE_DISPLAY_TO_CODE_MAP`, `valid_codes` |
| `app/frontend/src/lib/translations/index.ts` | 6-73 | Import and add to `resources` |
| `app/frontend/src/lib/translations/languages/[code].ts` | All | Create new translation file |
| `app/frontend/src/lib/hreflang-config.ts` | 16-33 | Add to `SUPPORTED_LANGUAGES` array |
| `app/frontend/src/hooks/use-auto-language.ts` | 6, 9-43 | Add to arrays and mapping |
| `app/frontend/src/components/LanguageSelector.tsx` | 18-50 | Add to `languages` array |
| `generate_sitemap.py` | 10-27 | Add to `LANGUAGES` list |
| `app/frontend/src/lib/survey.ts` | 31-33 | Add to `QUESTION_CODES.primaryLanguage` (if needed) |
| `app/frontend/src/lib/translations/languages/en.ts` | Various | Update language count/mentions (if needed) |

---

## Special Notes

### Language Code Standards
- Use ISO 639-1 codes when possible (2 characters: 'en', 'es', 'fr')
- Use ISO 639-3 codes for languages without 639-1 codes (3 characters: 'prs' for Dari)
- Ensure codes are consistent across all files

### Google Translate Mapping
- Most language codes map 1:1 with googletrans
- Some exceptions:
  - 'zh' → 'zh-cn' (Simplified Chinese)
  - 'prs' → 'fa' (Dari maps to Farsi in googletrans)
- Check googletrans documentation for special cases

### Locale Codes (BCP 47)
- Use format: `language-REGION` (e.g., 'en-US', 'pt-BR', 'ru-RU')
- Some languages don't use region codes (e.g., 'ar', 'sw')
- Match existing patterns in `hreflang-config.ts`

### Translation Files
- Always start with English (`en.ts`) as the template
- Ensure all translation keys exist (missing keys will cause errors)
- Consider using machine translation initially, then human review
- Test thoroughly - missing translations break the UI

---

## Recent Language Additions (Reference)

The following languages were added in the December 2025 migration:
- Dari (prs)
- Farsi (fa)
- Japanese (ja)
- German (de)
- Portuguese (pt)
- Russian (ru)
- Urdu (ur)

These additions can serve as a reference for the update pattern.
