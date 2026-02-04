/**
 * GEO Schema Validator
 * 
 * Validates JSON-LD structured data against Schema.org requirements
 * for Generative Engine Optimization (GEO).
 * 
 * This ensures all structured data is valid before deployment,
 * preventing broken schemas from reaching production.
 */

export interface ValidationError {
  path: string
  message: string
  value?: any
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

/**
 * Validates that a schema has the required @context
 */
function validateContext(schema: any, path: string = ''): ValidationError[] {
  const errors: ValidationError[] = []
  
  if (!schema['@context']) {
    errors.push({
      path: path || 'root',
      message: 'Missing required @context field. Must be "https://schema.org"',
    })
  } else if (schema['@context'] !== 'https://schema.org') {
    errors.push({
      path: path || 'root',
      message: `Invalid @context: "${schema['@context']}". Must be "https://schema.org"`,
      value: schema['@context'],
    })
  }
  
  return errors
}

/**
 * Validates that a schema has a @type or @graph
 */
function validateType(schema: any, path: string = ''): ValidationError[] {
  const errors: ValidationError[] = []
  
  // @graph schemas don't need @type at root level
  if (schema['@graph']) {
    return errors
  }
  
  if (!schema['@type']) {
    errors.push({
      path: path || 'root',
      message: 'Missing required @type field',
    })
  } else if (typeof schema['@type'] !== 'string') {
    errors.push({
      path: path || 'root',
      message: `@type must be a string, got ${typeof schema['@type']}`,
      value: schema['@type'],
    })
  }
  
  return errors
}

/**
 * Validates @graph structure
 * Note: @graph items inherit @context from parent, so they don't need their own
 */
function validateGraph(schema: any, path: string = '', errors: ValidationError[], warnings: ValidationError[], parentContext?: string): void {
  if (schema['@graph']) {
    if (!Array.isArray(schema['@graph'])) {
      errors.push({
        path: path || 'root',
        message: '@graph must be an array',
        value: schema['@graph'],
      })
      return
    }
    
    if (schema['@graph'].length === 0) {
      errors.push({
        path: path || 'root',
        message: '@graph array cannot be empty',
      })
    }
    
    // Validate each item in @graph
    schema['@graph'].forEach((item: any, index: number) => {
      const itemPath = `${path || 'root'}.@graph[${index}]`
      
      if (!item['@type'] && !item['@id']) {
        errors.push({
          path: itemPath,
          message: 'Each @graph item must have either @type or @id',
        })
      }
      
      // Recursively validate nested items (without requiring @context since it's inherited)
      const nestedResult = validateSchema(item, itemPath, parentContext || schema['@context'])
      errors.push(...nestedResult.errors)
      warnings.push(...nestedResult.warnings)
    })
  }
}

/**
 * Validates common required fields based on schema type
 */
function validateRequiredFields(schema: any, path: string = ''): ValidationError[] {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []
  
  const type = schema['@type']
  if (!type) return errors
  
  // Organization schema requirements
  if (type === 'Organization') {
    if (!schema.name) {
      errors.push({
        path,
        message: 'Organization schema missing required "name" field',
      })
    }
  }
  
  // WebSite schema requirements
  if (type === 'WebSite') {
    if (!schema.name) {
      warnings.push({
        path,
        message: 'WebSite schema should have "name" field',
      })
    }
    if (!schema.url) {
      warnings.push({
        path,
        message: 'WebSite schema should have "url" field',
      })
    }
  }
  
  // SoftwareApplication schema requirements
  if (type === 'SoftwareApplication') {
    if (!schema.name) {
      errors.push({
        path,
        message: 'SoftwareApplication schema missing required "name" field',
      })
    }
  }
  
  // Service schema requirements
  if (type === 'Service') {
    if (!schema.serviceType) {
      warnings.push({
        path,
        message: 'Service schema should have "serviceType" field',
      })
    }
  }
  
  // CollectionPage schema requirements
  if (type === 'CollectionPage') {
    if (!schema.name) {
      warnings.push({
        path,
        message: 'CollectionPage schema should have "name" field',
      })
    }
  }
  
  // BreadcrumbList schema requirements
  if (type === 'BreadcrumbList') {
    if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
      errors.push({
        path,
        message: 'BreadcrumbList schema missing required "itemListElement" array',
      })
    }
  }
  
  // LocalBusiness schema requirements
  if (type === 'LocalBusiness') {
    if (!schema.name) {
      errors.push({
        path,
        message: 'LocalBusiness schema missing required "name" field',
      })
    }
  }
  
  return errors
}

/**
 * Validates URL fields are absolute URLs
 */
function validateUrls(schema: any, path: string = ''): ValidationError[] {
  const errors: ValidationError[] = []
  const urlFields = ['url', 'logo', 'image', 'sameAs']
  
  urlFields.forEach(field => {
    if (schema[field]) {
      if (Array.isArray(schema[field])) {
        schema[field].forEach((url: string, index: number) => {
          if (typeof url === 'string' && !url.startsWith('http://') && !url.startsWith('https://')) {
            errors.push({
              path: `${path}.${field}[${index}]`,
              message: `URL must be absolute (start with http:// or https://), got: "${url}"`,
              value: url,
            })
          }
        })
      } else if (typeof schema[field] === 'string') {
        if (!schema[field].startsWith('http://') && !schema[field].startsWith('https://')) {
          errors.push({
            path: `${path}.${field}`,
            message: `URL must be absolute (start with http:// or https://), got: "${schema[field]}"`,
            value: schema[field],
          })
        }
      }
    }
  })
  
  return errors
}

/**
 * Validates that JSON-LD is valid JSON
 */
function validateJsonStructure(schema: any): ValidationError[] {
  const errors: ValidationError[] = []
  
  try {
    // Try to stringify and parse to ensure it's valid JSON
    JSON.stringify(schema)
  } catch (e) {
    errors.push({
      path: 'root',
      message: `Invalid JSON structure: ${e instanceof Error ? e.message : 'Unknown error'}`,
    })
  }
  
  return errors
}

/**
 * Main validation function
 * @param schema - The schema object to validate
 * @param path - The path to this schema in the hierarchy (for error reporting)
 * @param inheritedContext - The @context inherited from parent (for @graph items)
 */
export function validateSchema(schema: any, path: string = 'root', inheritedContext?: string): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []
  
  // Validate JSON structure
  errors.push(...validateJsonStructure(schema))
  
  // If JSON is invalid, stop here
  if (errors.length > 0) {
    return { valid: false, errors, warnings }
  }
  
  // Validate @context (only if not inherited from parent)
  if (!inheritedContext) {
    errors.push(...validateContext(schema, path))
  }
  
  // Validate @type or @graph
  errors.push(...validateType(schema, path))
  
  // Validate @graph structure if present (pass inherited context)
  const contextToUse = inheritedContext || schema['@context']
  validateGraph(schema, path, errors, warnings, contextToUse)
  
  // Validate required fields based on type
  errors.push(...validateRequiredFields(schema, path))
  
  // Validate URLs are absolute
  errors.push(...validateUrls(schema, path))
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Validates multiple schemas
 */
export function validateSchemas(schemas: any[]): ValidationResult {
  const allErrors: ValidationError[] = []
  const allWarnings: ValidationError[] = []
  
  schemas.forEach((schema, index) => {
    const result = validateSchema(schema, `schema[${index}]`)
    allErrors.push(...result.errors)
    allWarnings.push(...result.warnings)
  })
  
  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  }
}

/**
 * Formats validation errors for console output
 */
export function formatValidationErrors(result: ValidationResult): string {
  if (result.valid && result.warnings.length === 0) {
    return '✅ All schemas are valid!'
  }
  
  const lines: string[] = []
  
  if (result.errors.length > 0) {
    lines.push(`❌ Found ${result.errors.length} error(s):`)
    result.errors.forEach((error, index) => {
      lines.push(`  ${index + 1}. [${error.path}] ${error.message}`)
      if (error.value !== undefined) {
        lines.push(`     Value: ${JSON.stringify(error.value)}`)
      }
    })
  }
  
  if (result.warnings.length > 0) {
    lines.push(`\n⚠️  Found ${result.warnings.length} warning(s):`)
    result.warnings.forEach((warning, index) => {
      lines.push(`  ${index + 1}. [${warning.path}] ${warning.message}`)
    })
  }
  
  return lines.join('\n')
}

