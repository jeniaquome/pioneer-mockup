import { Helmet } from 'react-helmet-async'

type StructuredDataProps = {
  data: Record<string, any> | Record<string, any>[]
}

/**
 * StructuredData Component
 * 
 * Renders JSON-LD structured data for search engines.
 * Supports both single schema objects and arrays of schemas.
 * 
 * Usage:
 * <StructuredData data={{ "@context": "https://schema.org", "@type": "Organization", ... }} />
 * 
 * @see https://schema.org/
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */
export function StructuredData({ data }: StructuredDataProps) {
  // Normalize data to always be an array for consistent processing
  const schemas = Array.isArray(data) ? data : [data]
  
  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script 
          key={index}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

