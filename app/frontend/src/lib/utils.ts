import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert a camelCase or PascalCase string to snake_case
export function toSnakeCaseKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase()
}

// Convert a snake_case string to camelCase
export function toCamelCaseKey(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

// Normalize a map of answers to snake_case keys
export function normalizeAnswersToSnakeCase(
  answers: Record<string, string | string[]>
): Record<string, string | string[]> {
  const normalized: Record<string, string | string[]> = {}
  Object.entries(answers || {}).forEach(([key, value]) => {
    const snakeKey = toSnakeCaseKey(key)
    normalized[snakeKey] = value
  })
  return normalized
}

// Normalize a map of answers from snake_case keys back to camelCase keys
export function normalizeAnswersToCamelCase(
  answers: Record<string, string | string[]>
): Record<string, string | string[]> {
  const normalized: Record<string, string | string[]> = {}
  Object.entries(answers || {}).forEach(([key, value]) => {
    const camelKey = toCamelCaseKey(key)
    normalized[camelKey] = value
  })
  return normalized
}
