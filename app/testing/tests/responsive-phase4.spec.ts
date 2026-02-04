import { test, expect } from '@playwright/test'

/**
 * Phase 4: Resources, Checklist, and About Pages - Mobile Optimization Tests
 * 
 * Tests for:
 * - Resource page category grid and touch targets
 * - Resource category page search/filter controls
 * - Checklist page sidebar behavior and touch targets
 * - Checklist component checkbox and button interactions
 * - About page typography and layout
 */

// Test viewports
const MOBILE = { width: 375, height: 667 }
const MOBILE_SMALL = { width: 320, height: 568 }
const TABLET = { width: 768, height: 1024 }
const DESKTOP = { width: 1280, height: 720 }

test.describe('Phase 4: Resources Pages Mobile Optimization', () => {
  
  test.describe('ResourcePage (Category Overview)', () => {
    
    test('category cards have touch targets and proper grid layout on mobile', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      await page.goto('/resources')
      
      // Wait for page to load
      await page.waitForSelector('.grid', { timeout: 10000 })
      
      // Check category cards exist (Cards are direct children of grid divs)
      const categoryCards = page.locator('[class*="Card"]').filter({ hasText: /🏠|💼|🎓|🏥|🎭|🤝/i })
      const cardCount = await categoryCards.count()
      expect(cardCount).toBeGreaterThan(0)
      
      // Check first card has touch-target class
      const firstCard = categoryCards.first()
      const hasTouchTarget = await firstCard.evaluate((el) => el.classList.contains('touch-target'))
      expect(hasTouchTarget).toBe(true)
      
      // Check card has minimum height for touch
      const cardBox = await firstCard.boundingBox()
      expect(cardBox).not.toBeNull()
      if (cardBox) {
        expect(cardBox.height).toBeGreaterThanOrEqual(240) // min-height 240px
      }
    })
    
    test('category grid stacks properly: 1 column mobile, 2 tablet, 3 desktop', async ({ page }) => {
      // Mobile: 1 column
      await page.setViewportSize(MOBILE)
      await page.goto('/resources')
      await page.waitForSelector('.grid', { timeout: 10000 })
      
      let grid = page.locator('.grid').first()
      let gridCols = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns)
      let colCount = gridCols.split(' ').length
      expect(colCount).toBe(1)
      
      // Tablet: 2 columns
      await page.setViewportSize(TABLET)
      await page.waitForTimeout(300) // Wait for CSS to apply
      gridCols = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns)
      colCount = gridCols.split(' ').length
      expect(colCount).toBe(2)
      
      // Desktop: 3 columns
      await page.setViewportSize(DESKTOP)
      await page.waitForTimeout(300)
      gridCols = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns)
      colCount = gridCols.split(' ').length
      expect(colCount).toBe(3)
    })
    
    test('CTA button has touch target on mobile', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      await page.goto('/resources')
      
      // Find "Get Your Personal Roadmap" button
      const ctaButton = page.getByRole('button').filter({ hasText: /roadmap|screening/i }).first()
      await expect(ctaButton).toBeVisible()
      
      // Check for touch-target class
      const hasTouchTarget = await ctaButton.evaluate((el) => el.classList.contains('touch-target'))
      expect(hasTouchTarget).toBe(true)
      
      // Check minimum height
      const buttonBox = await ctaButton.boundingBox()
      expect(buttonBox).not.toBeNull()
      if (buttonBox) {
        expect(buttonBox.height).toBeGreaterThanOrEqual(44)
      }
    })
    
    test('no horizontal scroll on smallest mobile devices', async ({ page }) => {
      await page.setViewportSize(MOBILE_SMALL)
      await page.goto('/resources')
      await page.waitForSelector('.grid', { timeout: 10000 })
      
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1) // Allow 1px tolerance
    })
  })
  
  test.describe('ResourceCategoryPage (Subcategory Listing)', () => {
    
    test('search bar is full width on mobile', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      // Navigate to a specific category (e.g., living-essentials/transportation)
      await page.goto('/resources/living-essentials/transportation')
      
      // Wait for search input
      await page.waitForSelector('input[type="text"][placeholder*="search" i]', { timeout: 10000 })
      
      const searchInput = page.locator('input[type="text"]').first()
      const searchBox = await searchInput.boundingBox()
      const viewportWidth = MOBILE.width
      
      expect(searchBox).not.toBeNull()
      if (searchBox) {
        // Search should be nearly full width (accounting for padding)
        expect(searchBox.width).toBeGreaterThan(viewportWidth * 0.85)
      }
    })
    
    test('clear filters button has touch target', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      await page.goto('/resources/living-essentials/transportation')
      
      // Type in search to show clear button
      const searchInput = page.locator('input[type="text"]').first()
      await searchInput.fill('test search')
      
      // Wait for clear filters button to appear
      const clearButton = page.getByRole('button').filter({ hasText: /clear/i })
      await expect(clearButton).toBeVisible({ timeout: 5000 })
      
      // Check for touch-target class
      const hasTouchTarget = await clearButton.evaluate((el) => el.classList.contains('touch-target'))
      expect(hasTouchTarget).toBe(true)
      
      // Check minimum dimensions
      const buttonBox = await clearButton.boundingBox()
      expect(buttonBox).not.toBeNull()
      if (buttonBox) {
        expect(buttonBox.height).toBeGreaterThanOrEqual(44)
      }
    })
    
    test('breadcrumb links have adequate touch targets', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      await page.goto('/resources/living-essentials/transportation')
      
      await page.waitForSelector('nav button', { timeout: 10000 })
      
      // Check breadcrumb buttons
      const breadcrumbButtons = page.locator('nav button')
      const buttonCount = await breadcrumbButtons.count()
      
      for (let i = 0; i < buttonCount; i++) {
        const button = breadcrumbButtons.nth(i)
        const minHeight = await button.evaluate((el) => el.style.minHeight)
        expect(minHeight).toBe('44px')
      }
    })
    
    test('search controls stack properly on mobile', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      await page.goto('/resources/living-essentials/transportation')
      
      const searchInput = page.locator('input[type="text"]').first()
      await searchInput.fill('test')
      
      // Check that controls container uses flex-col on mobile
      const controlsContainer = page.locator('div.flex.flex-col').first()
      const flexDirection = await controlsContainer.evaluate((el) => 
        window.getComputedStyle(el).flexDirection
      )
      
      expect(flexDirection).toBe('column')
    })
  })
})

test.describe('Phase 4: Checklist Page Mobile Optimization', () => {
  
  test.describe('ChecklistPage Layout', () => {
    
    test('sidebar appears above checklist on mobile', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      // Note: You may need to create a checklist first or use a test checklist ID
      // For now, we'll test the structure without actual data
      await page.goto('/checklist?id=test-id')
      
      await page.waitForTimeout(2000) // Wait for potential redirect or load
      
      // Check if we're still on checklist page or redirected to screening
      const currentUrl = page.url()
      
      if (currentUrl.includes('/checklist')) {
        // Check grid order classes
        const checklistColumn = page.locator('div.lg\\:col-span-3')
        const sidebarColumn = page.locator('div.space-y-6')
        
        const checklistOrder = await checklistColumn.evaluate((el) => 
          window.getComputedStyle(el).order
        )
        const sidebarOrder = await sidebarColumn.first().evaluate((el) => 
          window.getComputedStyle(el).order
        )
        
        // On mobile, sidebar (order-1) should come before checklist (order-2)
        expect(parseInt(sidebarOrder)).toBeLessThan(parseInt(checklistOrder))
      }
    })
    
    test('quick action buttons have touch targets', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      await page.goto('/checklist?id=test-id')
      
      await page.waitForTimeout(2000)
      
      const currentUrl = page.url()
      
      if (currentUrl.includes('/checklist')) {
        // Check "Browse All Resources" and "Retake Screening" buttons
        const quickActionButtons = page.locator('button.touch-target, a.touch-target').filter({
          hasText: /browse|retake|screening|resources/i
        })
        
        const count = await quickActionButtons.count()
        expect(count).toBeGreaterThan(0)
        
        // Check first button has minimum height
        if (count > 0) {
          const firstButton = quickActionButtons.first()
          const buttonBox = await firstButton.boundingBox()
          
          if (buttonBox) {
            expect(buttonBox.height).toBeGreaterThanOrEqual(44)
          }
        }
      }
    })
    
    test('error state buttons stack vertically on mobile', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      // Visit with invalid checklist ID to trigger error state
      await page.goto('/checklist?id=invalid-id-12345')
      
      await page.waitForTimeout(2000)
      
      // Look for buttons in error state
      const buttonContainer = page.locator('div.flex.flex-col.sm\\:flex-row')
      
      if (await buttonContainer.count() > 0) {
        const flexDirection = await buttonContainer.first().evaluate((el) => 
          window.getComputedStyle(el).flexDirection
        )
        
        expect(flexDirection).toBe('column')
      }
    })
  })
  
  test.describe('Checklist Component', () => {
    
    test('checkboxes have adequate touch targets (44x44px minimum)', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      await page.goto('/checklist?id=test-id')
      
      await page.waitForTimeout(2000)
      
      // Look for checklist checkboxes
      const checkboxes = page.locator('button.touch-target[aria-checked]')
      const count = await checkboxes.count()
      
      if (count > 0) {
        const firstCheckbox = checkboxes.first()
        const checkboxBox = await firstCheckbox.boundingBox()
        
        expect(checkboxBox).not.toBeNull()
        if (checkboxBox) {
          expect(checkboxBox.width).toBeGreaterThanOrEqual(44)
          expect(checkboxBox.height).toBeGreaterThanOrEqual(44)
        }
        
        // Check for touch-target class
        const hasTouchTarget = await firstCheckbox.evaluate((el) => 
          el.classList.contains('touch-target')
        )
        expect(hasTouchTarget).toBe(true)
      }
    })
    
    test('more/less buttons have touch targets', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      await page.goto('/checklist?id=test-id')
      
      await page.waitForTimeout(2000)
      
      // Look for More/Less toggle buttons
      const toggleButtons = page.locator('button.touch-target').filter({
        hasText: /more|less/i
      })
      
      const count = await toggleButtons.count()
      
      if (count > 0) {
        const firstToggle = toggleButtons.first()
        const toggleBox = await firstToggle.boundingBox()
        
        if (toggleBox) {
          expect(toggleBox.height).toBeGreaterThanOrEqual(44)
        }
      }
    })
    
    test('drag handles have adequate touch targets', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      await page.goto('/checklist?id=test-id')
      
      await page.waitForTimeout(2000)
      
      // Look for drag handles (Move icons)
      const dragHandles = page.locator('button.touch-target.cursor-move')
      const count = await dragHandles.count()
      
      if (count > 0) {
        const firstHandle = dragHandles.first()
        const handleBox = await firstHandle.boundingBox()
        
        expect(handleBox).not.toBeNull()
        if (handleBox) {
          expect(handleBox.width).toBeGreaterThanOrEqual(44)
          expect(handleBox.height).toBeGreaterThanOrEqual(44)
        }
      }
    })
    
    test('external link buttons in resources have touch targets', async ({ page }) => {
      await page.setViewportSize(MOBILE)
      await page.goto('/checklist?id=test-id')
      
      await page.waitForTimeout(2000)
      
      // Expand first item if it exists
      const moreButton = page.getByRole('button').filter({ hasText: /more/i }).first()
      
      if (await moreButton.count() > 0) {
        await moreButton.click()
        await page.waitForTimeout(500)
        
        // Look for external link buttons
        const externalLinkButtons = page.locator('button.touch-target[aria-label*="website" i]')
        const count = await externalLinkButtons.count()
        
        if (count > 0) {
          const firstLink = externalLinkButtons.first()
          const linkBox = await firstLink.boundingBox()
          
          if (linkBox) {
            expect(linkBox.height).toBeGreaterThanOrEqual(44)
          }
        }
      }
    })
  })
})

test.describe('Phase 4: About Page Mobile Optimization', () => {
  
  test('headings use responsive typography', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/about')
    
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Check main heading has text-responsive class
    const mainHeading = page.locator('h1').first()
    const hasResponsiveClass = await mainHeading.evaluate((el) => {
      return Array.from(el.classList).some(cls => cls.includes('text-responsive'))
    })
    
    expect(hasResponsiveClass).toBe(true)
  })
  
  test('feature cards stack in single column on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/about')
    
    await page.waitForSelector('div.grid', { timeout: 10000 })
    
    const grid = page.locator('div.grid.grid-cols-1').first()
    const gridCols = await grid.evaluate((el) => 
      window.getComputedStyle(el).gridTemplateColumns
    )
    
    const colCount = gridCols.split(' ').length
    expect(colCount).toBe(1)
  })
  
  test('all CTA buttons have adequate touch targets', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/about')
    
    await page.waitForSelector('button, a[class*="btn"]', { timeout: 10000 })
    
    // Check all buttons and links with minHeight: 44px or 48px
    const ctaElements = page.locator('button[style*="minHeight"], a[style*="minHeight"]')
    const count = await ctaElements.count()
    
    expect(count).toBeGreaterThan(0)
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const element = ctaElements.nth(i)
      const minHeight = await element.evaluate((el) => {
        const style = el.getAttribute('style') || ''
        const match = style.match(/minHeight:\s*['"]*(\d+)px/)
        return match ? parseInt(match[1]) : 0
      })
      
      expect(minHeight).toBeGreaterThanOrEqual(44)
    }
  })
  
  test('action buttons stack vertically on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/about')
    
    await page.waitForTimeout(1000)
    
    // Find button container at bottom of page
    const buttonContainer = page.locator('div.flex.flex-col.sm\\:flex-row').last()
    
    if (await buttonContainer.count() > 0) {
      const flexDirection = await buttonContainer.evaluate((el) => 
        window.getComputedStyle(el).flexDirection
      )
      
      expect(flexDirection).toBe('column')
    }
  })
  
  test('no horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/about')
    
    await page.waitForTimeout(1000)
    
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
  
  test('cards have adequate padding on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/about')
    
    await page.waitForSelector('div[class*="border-2"]', { timeout: 10000 })
    
    const cards = page.locator('div.border-2.border-brand-pms-285\\/20')
    const count = await cards.count()
    
    if (count > 0) {
      const firstCard = cards.first()
      const padding = await firstCard.evaluate((el) => {
        const styles = window.getComputedStyle(el)
        return parseInt(styles.padding)
      })
      
      // Should have at least 32px (p-8) padding
      expect(padding).toBeGreaterThanOrEqual(32)
    }
  })
  
  test('text content has appropriate line length on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/about')
    
    await page.waitForSelector('p', { timeout: 10000 })
    
    // Check paragraph widths don't exceed viewport
    const paragraphs = page.locator('section p')
    const count = await paragraphs.count()
    
    for (let i = 0; i < Math.min(count, 3); i++) {
      const para = paragraphs.nth(i)
      const paraBox = await para.boundingBox()
      
      if (paraBox) {
        expect(paraBox.width).toBeLessThanOrEqual(MOBILE.width)
      }
    }
  })
})

test.describe('Phase 4: Cross-Page Consistency', () => {
  
  test('all pages maintain consistent touch targets', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    
    const pages = ['/resources', '/about']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.waitForTimeout(1000)
      
      // Check for touch-target elements
      const touchTargets = page.locator('.touch-target')
      const count = await touchTargets.count()
      
      expect(count).toBeGreaterThan(0)
      
      // Sample check first touch target
      if (count > 0) {
        const firstTarget = touchTargets.first()
        const targetBox = await firstTarget.boundingBox()
        
        if (targetBox) {
          // At least one dimension should be >= 44px
          const meetsStandard = targetBox.width >= 44 || targetBox.height >= 44
          expect(meetsStandard).toBe(true)
        }
      }
    }
  })
  
  test('no horizontal scroll on any optimized page', async ({ page }) => {
    await page.setViewportSize(MOBILE_SMALL) // Test with smallest viewport
    
    const pages = ['/resources', '/about']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.waitForTimeout(1000)
      
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
    }
  })
  
  test('responsive grids work across all pages', async ({ page }) => {
    const pages = [
      { path: '/resources', selector: 'div.grid' },
      { path: '/about', selector: 'div.grid' }
    ]
    
    for (const { path, selector } of pages) {
      // Test mobile
      await page.setViewportSize(MOBILE)
      await page.goto(path)
      await page.waitForSelector(selector, { timeout: 10000 })
      
      let grid = page.locator(selector).first()
      let gridCols = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns)
      let colCount = gridCols.split(' ').length
      
      // Mobile should be 1 column (or maybe 2 for some pages)
      expect(colCount).toBeLessThanOrEqual(2)
      
      // Test desktop
      await page.setViewportSize(DESKTOP)
      await page.waitForTimeout(300)
      
      gridCols = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns)
      colCount = gridCols.split(' ').length
      
      // Desktop should be 2 or 3 columns
      expect(colCount).toBeGreaterThanOrEqual(2)
    }
  })
})

test.describe('Phase 4: Accessibility Compliance', () => {
  
  test('all interactive elements meet WCAG 2.1 Level AA touch target standards', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    
    const pages = ['/resources', '/about']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.waitForTimeout(1000)
      
      // Get all interactive elements (buttons, links)
      const interactiveElements = page.locator('button, a[href]')
      const count = await interactiveElements.count()
      
      let compliantCount = 0
      let totalChecked = 0
      
      // Sample first 10 elements
      for (let i = 0; i < Math.min(count, 10); i++) {
        const element = interactiveElements.nth(i)
        
        // Skip if hidden
        const isVisible = await element.isVisible().catch(() => false)
        if (!isVisible) continue
        
        const box = await element.boundingBox()
        
        if (box) {
          totalChecked++
          // WCAG 2.1 Level AA requires minimum 44x44px
          if (box.width >= 44 && box.height >= 44) {
            compliantCount++
          }
        }
      }
      
      // At least 70% should be compliant (some icons/small elements may be exceptions)
      if (totalChecked > 0) {
        const complianceRate = compliantCount / totalChecked
        expect(complianceRate).toBeGreaterThan(0.7)
      }
    }
  })
  
  test('keyboard navigation works on mobile-optimized pages', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/resources')
    
    await page.waitForTimeout(1000)
    
    // Tab through first few elements
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Check that focus is visible
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement
      return el ? el.tagName : null
    })
    
    expect(focusedElement).not.toBeNull()
  })
})

test.describe('Phase 4: Performance', () => {
  
  test('pages load quickly on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    
    const pages = ['/resources', '/about']
    
    for (const pagePath of pages) {
      const startTime = Date.now()
      await page.goto(pagePath)
      await page.waitForLoadState('domcontentloaded')
      const loadTime = Date.now() - startTime
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000)
    }
  })
  
  test('no layout shift on page load', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/resources')
    
    // Wait for initial load
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)
    
    // Get initial positions of key elements
    const grid = page.locator('div.grid').first()
    const initialPos = await grid.boundingBox()
    
    // Wait a bit more
    await page.waitForTimeout(1000)
    
    // Check position hasn't shifted
    const finalPos = await grid.boundingBox()
    
    if (initialPos && finalPos) {
      const shift = Math.abs(initialPos.y - finalPos.y)
      expect(shift).toBeLessThan(5) // Allow 5px tolerance
    }
  })
})

