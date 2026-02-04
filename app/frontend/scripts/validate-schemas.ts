#!/usr/bin/env node
/**
 * Schema Validation Script
 * 
 * Validates JSON-LD schemas in React components for GEO compliance.
 * Checks for required fields, proper structure, and common issues.
 * 
 * Usage:
 *   npm run validate-schemas
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname, relative, dirname } from 'path'
import { fileURLToPath } from 'url'
import { validateSchema, formatValidationErrors, ValidationResult } from '../src/lib/schema-validator'

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface SchemaCheck {
  file: string
  hasSchema: boolean
  hasContext: boolean
  hasType: boolean
  hasGraph: boolean
  errors: string[]
}

/**
 * Recursively find all TypeScript/TSX files in src directory
 */
function findTsxFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir)
  
  files.forEach(file => {
    const filePath = join(dir, file)
    const stat = statSync(filePath)
    
    if (stat.isDirectory()) {
      // Skip node_modules, dist, and hidden directories
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'dist' && file !== 'lib') {
        findTsxFiles(filePath, fileList)
      }
    } else if (extname(file) === '.tsx' || extname(file) === '.ts') {
      fileList.push(filePath)
    }
  })
  
  return fileList
}

/**
 * Check schema patterns in a file
 */
function checkSchemaInFile(filePath: string): SchemaCheck {
  const content = readFileSync(filePath, 'utf-8')
  const relativePath = relative(join(__dirname, '..'), filePath)
  const check: SchemaCheck = {
    file: relativePath,
    hasSchema: false,
    hasContext: false,
    hasType: false,
    hasGraph: false,
    errors: [],
  }
  
  // Check if file uses StructuredData component
  if (content.includes('StructuredData') || content.includes('@context')) {
    check.hasSchema = true
    
    // Check for @context
    if (content.includes('@context')) {
      check.hasContext = true
      
      // Validate @context value
      if (!content.includes('"https://schema.org"') && !content.includes("'https://schema.org'")) {
        check.errors.push('@context must be "https://schema.org"')
      }
    } else {
      check.errors.push('Schema missing @context field')
    }
    
    // Check for @type or @graph
    if (content.includes('@graph')) {
      check.hasGraph = true
    } else if (content.includes('@type')) {
      check.hasType = true
    } else if (check.hasContext) {
      check.errors.push('Schema must have either @type or @graph')
    }
    
    // Check for common required fields based on schema type
    if (content.includes('@type') && content.includes('Organization')) {
      if (!content.includes('"name"') && !content.includes("'name'")) {
        check.errors.push('Organization schema should have "name" field')
      }
    }
    
    if (content.includes('@type') && content.includes('SoftwareApplication')) {
      if (!content.includes('"name"') && !content.includes("'name'")) {
        check.errors.push('SoftwareApplication schema should have "name" field')
      }
    }
    
    if (content.includes('@type') && content.includes('BreadcrumbList')) {
      if (!content.includes('itemListElement')) {
        check.errors.push('BreadcrumbList schema should have "itemListElement" field')
      }
    }
    
    // Check for absolute URLs (should start with http:// or https://)
    const urlPattern = /(?:url|logo|image|sameAs)\s*:\s*['"`](?!https?:\/\/)([^'"`]+)['"`]/g
    let urlMatch
    while ((urlMatch = urlPattern.exec(content)) !== null) {
      const url = urlMatch[1]
      // Allow template literals and variables (they're dynamic)
      if (!url.includes('${') && !url.includes('`')) {
        check.errors.push(`URL should be absolute (start with http:// or https://): ${url}`)
      }
    }
  }
  
  return check
}

/**
 * Validate a sample schema structure
 */
function validateSampleSchemas(): ValidationResult {
  // Create sample schemas that match our expected structure
  const sampleSchemas = [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@id': 'https://www.pittsburghpioneer.com/#organization',
          '@type': 'Organization',
          name: 'Pittsburgh Tomorrow',
        },
        {
          '@id': 'https://www.pittsburghpioneer.com/#website',
          '@type': 'WebSite',
          name: 'Pittsburgh Tomorrow Pioneer',
          url: 'https://www.pittsburghpioneer.com/',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Pittsburgh Tomorrow',
      url: 'https://www.pittsburghpioneer.com',
    },
  ]
  
  const allErrors: any[] = []
  const allWarnings: any[] = []
  
  sampleSchemas.forEach((schema, index) => {
    const result = validateSchema(schema, `sample[${index}]`)
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
 * Main validation function
 */
function main() {
  console.log('🔍 Validating JSON-LD schemas for GEO compliance...\n')
  
  const srcDir = join(__dirname, '../src')
  const pagesDir = join(srcDir, 'pages')
  
  // Find all component files
  const componentFiles = findTsxFiles(pagesDir)
  
  console.log(`📋 Checking ${componentFiles.length} component files...\n`)
  
  const checks: SchemaCheck[] = []
  let hasErrors = false
  
  // Check each file for schema patterns
  componentFiles.forEach(file => {
    const check = checkSchemaInFile(file)
    if (check.hasSchema) {
      checks.push(check)
      
      if (check.errors.length > 0) {
        hasErrors = true
        console.error(`❌ ${check.file}:`)
        check.errors.forEach(error => {
          console.error(`   - ${error}`)
        })
      }
    }
  })
  
  // Validate sample schema structures
  console.log('\n📊 Validating schema structure patterns...\n')
  const sampleResult = validateSampleSchemas()
  
  if (!sampleResult.valid) {
    hasErrors = true
    console.error(formatValidationErrors(sampleResult))
  } else if (sampleResult.warnings.length > 0) {
    console.warn(formatValidationErrors(sampleResult))
  } else {
    console.log('✅ Sample schema structures are valid')
  }
  
  // Summary
  console.log(`\n📈 Summary:`)
  console.log(`   Files with schemas: ${checks.length}`)
  console.log(`   Files with errors: ${checks.filter(c => c.errors.length > 0).length}`)
  
  if (hasErrors) {
    console.error('\n❌ Schema validation failed! Please fix the errors above.')
    process.exit(1)
  } else {
    console.log('\n✅ All schemas validated successfully!')
    process.exit(0)
  }
}

// Run if executed directly
main()

export { main }
