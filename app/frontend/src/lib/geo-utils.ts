/**
 * GEO (Generative Engine Optimization) Utility Functions
 * 
 * Helper functions for optimizing content for AI-powered search engines
 * and RAG (Retrieval-Augmented Generation) systems.
 */

/**
 * Generates a URL-friendly ID from text for deep linking
 * 
 * Used to create static IDs for headings and sections that enable
 * AI-powered search engines (Perplexity, Google AI Overviews) to
 * link directly to specific sections (scroll-to-text feature).
 * 
 * @param text - The text to convert to an ID (e.g., heading text)
 * @returns A slug-formatted ID (e.g., "best-school-districts")
 * 
 * @example
 * generateSectionId("Best School Districts in Pittsburgh")
 * // Returns: "best-school-districts-in-pittsburgh"
 */
export const generateSectionId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

