import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { generateHreflangLinks, shouldIncludeHreflang } from '@/lib/hreflang-config'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  noindex?: boolean
  includeHreflang?: boolean // Allow explicit control
}

export function SEO({ 
  title = 'Pittsburgh Tomorrow Pioneer',
  description = 'Your personal, free guide to every resource that helps newcomers settle in quickly and confidently — from housing and schools to language, faith, and community life. It\'s the most complete, time-saving, and welcoming way to begin your new chapter in Pittsburgh.',
  keywords = 'Pittsburgh, newcomers, immigrants, resources, community, settlement, integration, Pennsylvania',
  image = '/branding/assets/logo-og.png',
  url,
  noindex = false,
  includeHreflang
}: SEOProps) {
  const location = useLocation()
  const fullTitle = title === 'Pittsburgh Tomorrow Pioneer' ? title : `${title} | Pittsburgh Tomorrow Pioneer`
  
  // Determine base URL for absolute URLs
  // Priority: 1) Environment variable, 2) window.location.origin (for local/tunnel testing), 3) Production URL
  const getBaseUrl = () => {
    // Check for environment variable first (useful for explicit configuration)
    if (import.meta.env.VITE_SITE_BASE_URL) {
      return import.meta.env.VITE_SITE_BASE_URL
    }
    // Use current origin when in browser (works for localhost, ngrok tunnels, etc.)
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin
    }
    // Fall back to production URL
    return 'https://www.pittsburghpioneer.com'
  }
  
  const baseUrl = getBaseUrl()
  
  // Canonical URL: Use provided url, or construct from current pathname
  // In production, always uses HTTPS and production domain for SEO consistency
  // In development/tunnel, uses current origin for testing
  // Only set canonical for public pages (not noindex pages)
  const canonicalUrl = !noindex && (url || `${baseUrl}${location.pathname}`)
  
  // Convert relative image path to absolute URL for social media crawlers
  // Social media platforms require absolute URLs to fetch images
  const absoluteImageUrl = image.startsWith('http') 
    ? image 
    : `${baseUrl}${image.startsWith('/') ? image : '/' + image}`
  
  // Determine if we should include hreflang tags
  // Include if: explicitly requested OR (not noindex AND path is public)
  const shouldAddHreflang = includeHreflang !== undefined 
    ? includeHreflang 
    : (!noindex && shouldIncludeHreflang(location.pathname))
  
  // Generate hreflang links for multilingual SEO
  const hreflangLinks = shouldAddHreflang ? generateHreflangLinks(location.pathname) : []
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL - helps prevent duplicate content issues on public pages */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Hreflang tags for multilingual SEO */}
      {hreflangLinks.map(({ hreflang, href }) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
      ))}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:type" content="image/png" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      
      {/* Additional favicon sizes for better browser support */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
    </Helmet>
  )
}
