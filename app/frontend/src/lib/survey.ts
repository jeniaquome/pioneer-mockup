import type { TFunction } from 'i18next'
import { translations } from '@/lib/translations'

export const QUESTION_IDS = [
  'audience',
  'primaryLanguage',
  'culturalBackground',
  'housingNeed',           // Moved from position 5 to 4
  'professionalStatus',    // Moved from position 4 to 5
  'languageSupport',
  'employment',
  'communityPriorities',
  'immediateNeeds',
  'timeline',
  // 'techComfort', - REMOVED (Question 11)
] as const

export type QuestionId = typeof QUESTION_IDS[number]

// Stable codes for all options in every question, index-aligned with labels in translations
const QUESTION_CODES: Record<QuestionId, string[]> = {
  audience: [
    'student_professional',
    'boomerang',
    'refugee_tps',
    'transplant',
    'entrepreneur',
    'remote_employee',
    'other',
  ],
  primaryLanguage: [
    'en', 'es', 'ar', 'sw', 'uz', 'ne_dz', 'fa_ps', 'zh', 'other',
  ],
  culturalBackground: [
    'white',
    'black_aa',
    'latinx',
    'asian',
    'mena',
    'pacific',
    'native',
    'african',
    'caribbean',
    'other',
    'prefer_no_answer',
  ],
  housingNeed: [
    'market_rate',
    'affordable',
    'temporary',
    'shared',
    'buying',
    'secured',
  ],
  professionalStatus: [
    'student',
    'tech',
    'healthcare',
    'academic',
    'seeking',
    'recent_grad',
    'other_professional',
  ],
  languageSupport: [
    'esl',
    'professional_english',
    'translation',
    'conversation',
    'none',
  ],
  employment: [
    'networking_advancement',
    'job_search',
    'skills_training',
    'industry_networks',
    'no_support_needed',  // Changed from 'secured' to match new text
  ],
  communityPriorities: [
    'pro_networks',
    'cultural_faith',
    'social_entertainment',
    'family_children',
    'sports_recreation',
    'arts_culture',
    'none',
  ],
  immediateNeeds: [
    'meet_people',
    'basic_services',
    'school_enrollment',
    'legal_immigration',
    'mental_health',
    'emergency_assistance',
    'none',
  ],
  timeline: [
    'just_arrived',
    'recent_1_6',
    'planning_3',
    'long_term_6_plus',
    'already_settled',
  ],
  // techComfort removed
}

export type OptionItem = { value: string; label: string }

export function buildOptions(id: QuestionId, t: TFunction): OptionItem[] {
  const labels = t(`screening.questions.${id}.options`, { returnObjects: true }) as string[]
  const codes = QUESTION_CODES[id]
  return (codes || []).map((code, idx) => ({ value: code, label: labels?.[idx] ?? code }))
}

// Return labels for a question across all configured languages, preserving index order
function getAllLanguageLabels(id: QuestionId): string[][] {
  const langs = Object.keys(translations) as Array<keyof typeof translations>
  return langs.map((lng) => {
    const translation = translations[lng]
    const arr = translation?.screening?.questions?.[id]?.options as string[] | undefined
    return arr || []
  })
}

// Map a single label or code to the stable code by searching all language label arrays
function labelOrCodeToCode(id: QuestionId, input: string): string {
  const codes = QUESTION_CODES[id]
  if (!codes || !input) return input

  // Exact code match
  if (codes.includes(input)) return input

  // Handle special legacy values that might not be in current translations
  if (id === 'audience' && input === 'New American/Immigrant seeking settlement support') {
    return 'refugee_tps'
  }

  // Handle legacy employment values for backwards compatibility
  if (id === 'employment') {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes('employment secured') || lowerInput.includes('secured') || input === 'secured') {
      return 'no_support_needed'
    }
  }

  // Fuzzy normalize helper: lower-case, collapse spaces/hyphens to underscores, remove non-word chars
  const normalizeLoose = (s: string) =>
    s
      .toLowerCase()
      .replace(/[\s-]+/g, '_')
      .replace(/[^a-z0-9_]/g, '')

  const inputLoose = normalizeLoose(input)

  // Try fuzzy matches against codes
  const codeLooseMap = new Map<string, string>()
  codes.forEach((c) => codeLooseMap.set(normalizeLoose(c), c))
  const looseMatch = codeLooseMap.get(inputLoose)
  if (looseMatch) return looseMatch

  // Special-case known legacy/casing variants
  if (id === 'languageSupport') {
    if (inputLoose === 'professionalenglish' || inputLoose === 'professional_english') {
      return 'professional_english'
    }
  }

  // Map common "none" variants across languages to canonical 'none'
  if (/(^|\b)(none|ninguna|aucune|aucun|لا|hakuna)(\b|$)/i.test(input)) {
    // Only return 'none' if the question supports it
    if (codes.includes('none')) return 'none'
  }

  // Try matching by translated labels in any language
  const all = getAllLanguageLabels(id)
  for (const labels of all) {
    // First try exact label match
    let idx = labels.indexOf(input)
    if (idx >= 0 && codes[idx]) return codes[idx]

    // Then try loose/normalized label match
    idx = labels.findIndex((label) => normalizeLoose(label) === inputLoose)
    if (idx >= 0 && codes[idx]) return codes[idx]
  }

  // Fallback: return the original value if no mapping was found
  return input
}

// Normalize stored survey responses (which might be saved as localized labels) to stable codes
export function mapSurveyResponsesToCodes(
  responses: Record<string, string | string[]>
): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {}
  Object.entries(responses || {}).forEach(([k, v]) => {
    // Skip techComfort for backwards compatibility
    if (k === 'techComfort') {
      return
    }
    const key = k as QuestionId
    if (!QUESTION_IDS.includes(key)) {
      out[k] = v
      return
    }
    if (Array.isArray(v)) {
      out[key] = v.map((item) => labelOrCodeToCode(key, item))
    } else {
      out[key] = labelOrCodeToCode(key, v)
    }
  })
  return out
}

export function isMultiSelect(id: QuestionId): boolean {
  return id === 'communityPriorities' || id === 'immediateNeeds'
}


