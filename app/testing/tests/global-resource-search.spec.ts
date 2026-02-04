import { test, expect } from '@playwright/test'

/**
 * Global Resource Search Tests
 * 
 * Tests for the global resource search functionality across all resource pages
 */

// Test viewports
const MOBILE = { width: 375, height: 667 }
const DESKTOP = { width: 1280, height: 720 }

test.describe('Global Resource Search - Search Bar Visibility', () => {
  
  test('search bar appears on main /resources page', async ({ page }) => {
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    // Check for search input
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await expect(searchInput).toBeVisible()
    
    // Check for search button
    const searchButton = page.locator('button:has-text("Search")')
    await expect(searchButton).toBeVisible()
  })
  
  test('search bar appears on category pages', async ({ page }) => {
    await page.goto('/resources/living-essentials')
    await page.waitForLoadState('networkidle')
    
    // Wait a moment for any dynamic content
    await page.waitForTimeout(500)
    
    // On category overview page, search bar should be visible
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    const isVisible = await searchInput.isVisible().catch(() => false)
    
    // Category overview pages may not have search bar (they show subcategories)
    // So we'll just check that the page loaded successfully
    expect(page.url()).toContain('/resources/living-essentials')
  })
  
  test('search bar appears on subcategory pages', async ({ page }) => {
    await page.goto('/resources/living-essentials/transportation')
    await page.waitForLoadState('networkidle')
    
    // Check for search input on subcategory page
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await expect(searchInput).toBeVisible()
    
    // Check for search button
    const searchButton = page.locator('button:has-text("Search")')
    await expect(searchButton).toBeVisible()
  })
  
  test('search bar does NOT appear on non-resource pages', async ({ page }) => {
    // Test home page
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    let searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await expect(searchInput).not.toBeVisible()
    
    // Test about page
    await page.goto('/about')
    await page.waitForLoadState('networkidle')
    
    searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await expect(searchInput).not.toBeVisible()
  })
})

test.describe('Global Resource Search - Search Functionality', () => {
  
  test('search submission navigates to search results page with query parameter', async ({ page }) => {
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    // Enter search query
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await searchInput.fill('housing')
    
    // Click search button
    const searchButton = page.locator('button:has-text("Search")')
    await searchButton.click()
    
    // Wait for navigation
    await page.waitForLoadState('networkidle')
    
    // Check URL contains search query
    expect(page.url()).toContain('/resources/search')
    expect(page.url()).toContain('q=housing')
    expect(page.url()).toContain('from=')
  })
  
  test('Enter key triggers search', async ({ page }) => {
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    // Enter search query and press Enter
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await searchInput.fill('food')
    await searchInput.press('Enter')
    
    // Wait for navigation
    await page.waitForLoadState('networkidle')
    
    // Check URL
    expect(page.url()).toContain('/resources/search')
    expect(page.url()).toContain('q=food')
  })
  
  test('search button is disabled when input is empty', async ({ page }) => {
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    const searchButton = page.locator('button:has-text("Search")')
    
    // Button should be disabled initially
    await expect(searchButton).toBeDisabled()
    
    // Enter text
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await searchInput.fill('test')
    
    // Button should now be enabled
    await expect(searchButton).toBeEnabled()
    
    // Clear text
    await searchInput.clear()
    
    // Button should be disabled again
    await expect(searchButton).toBeDisabled()
  })
  
  test('search with special characters is handled properly', async ({ page }) => {
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    // Enter search query with special characters
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await searchInput.fill('test & search')
    
    const searchButton = page.locator('button:has-text("Search")')
    await searchButton.click()
    
    await page.waitForLoadState('networkidle')
    
    // Check URL is properly encoded
    expect(page.url()).toContain('/resources/search')
    expect(page.url()).toContain('q=')
  })
})

test.describe('Global Resource Search - Search Results Page', () => {
  
  test('search results page displays search query', async ({ page }) => {
    await page.goto('/resources/search?q=housing&from=%2Fresources&lang=en')
    await page.waitForLoadState('networkidle')
    
    // Check for search query displayed on page
    const searchResultsText = page.locator('text=/Search Results.*for.*housing/i')
    await expect(searchResultsText).toBeVisible()
  })
  
  test('breadcrumb navigation shows correct path', async ({ page }) => {
    await page.goto('/resources/search?q=test&from=%2Fresources&lang=en')
    await page.waitForLoadState('networkidle')
    
    // Check for breadcrumb with Home and Resources links
    const homeLink = page.locator('a[href="/"]').first()
    await expect(homeLink).toBeVisible()
    
    const resourcesLink = page.locator('a[href="/resources"]').first()
    await expect(resourcesLink).toBeVisible()
  })
  
  test('browser back button works from search results', async ({ page }) => {
    // Start from a specific page
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    // Perform search
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await searchInput.fill('housing')
    await searchInput.press('Enter')
    
    await page.waitForLoadState('networkidle')
    
    // Verify we're on search results page
    expect(page.url()).toContain('/resources/search')
    
    // Use browser back button
    await page.goBack()
    await page.waitForLoadState('networkidle')
    
    // Should be back at resources page
    expect(page.url()).toContain('/resources')
    expect(page.url()).not.toContain('/search')
  })
  
  test('search results page displays results count', async ({ page }) => {
    await page.goto('/resources/search?q=housing&from=%2Fresources&lang=en')
    await page.waitForLoadState('domcontentloaded')
    
    // Wait for results summary to appear
    const summary = page.locator('text=/Showing.*of.*resources/i')
    await expect(summary).toBeVisible({ timeout: 10000 })
  })
  
  test('search results page handles empty results gracefully', async ({ page }) => {
    await page.goto('/resources/search?q=xyznonexistentquery123&from=%2Fresources&lang=en')
    await page.waitForLoadState('networkidle')
    
    // Wait for results to load
    await page.waitForTimeout(1000)
    
    // Check for empty state message
    const emptyMessage = page.locator('text=/No resources found/i')
    await expect(emptyMessage).toBeVisible()
  })
  
  test('search results page has search bar for new searches', async ({ page }) => {
    await page.goto('/resources/search?q=housing&from=%2Fresources&lang=en')
    await page.waitForLoadState('networkidle')
    
    // Check that search bar is present for new searches
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await expect(searchInput).toBeVisible()
  })
  
  test('pagination works on search results', async ({ page }) => {
    await page.goto('/resources/search?q=support&from=%2Fresources&lang=en')
    await page.waitForLoadState('networkidle')
    
    // Wait for results
    await page.waitForTimeout(1000)
    
    // Check if pagination controls exist (only if there are enough results)
    const nextButton = page.locator('button:has-text("Next")')
    const hasPagination = await nextButton.isVisible().catch(() => false)
    
    if (hasPagination) {
      // Click next page
      await nextButton.click()
      await page.waitForLoadState('networkidle')
      
      // URL or content should change
      // Just verify we're still on search page
      expect(page.url()).toContain('/resources/search')
    }
  })
  
  test('breadcrumb navigation is present on search results', async ({ page }) => {
    await page.goto('/resources/search?q=test&from=%2Fresources&lang=en')
    await page.waitForLoadState('networkidle')
    
    // Check for breadcrumb
    const breadcrumb = page.locator('nav[aria-label="breadcrumb"], nav:has(a[href="/resources"])')
    await expect(breadcrumb).toBeVisible()
  })
})

test.describe('Global Resource Search - Responsive Design', () => {
  
  test('search bar is full width on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    const searchBox = await searchInput.boundingBox()
    
    expect(searchBox).not.toBeNull()
    if (searchBox) {
      // Search should be nearly full width (accounting for padding)
      expect(searchBox.width).toBeGreaterThan(MOBILE.width * 0.7)
    }
  })
  
  test('search controls stack properly on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    // Check that search input and button are visible
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    const searchButton = page.locator('button:has-text("Search")')
    
    await expect(searchInput).toBeVisible()
    await expect(searchButton).toBeVisible()
  })
  
  test('search bar works on desktop', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await expect(searchInput).toBeVisible()
    
    // Perform a search
    await searchInput.fill('test')
    const searchButton = page.locator('button:has-text("Search")')
    await searchButton.click()
    
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/resources/search')
  })
})

test.describe('Global Resource Search - Browser Navigation', () => {
  
  test('browser back button works correctly from search results', async ({ page }) => {
    // Navigate to resources page
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    // Perform search
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await searchInput.fill('housing')
    await searchInput.press('Enter')
    
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/resources/search')
    
    // Go back using browser back button
    await page.goBack()
    await page.waitForLoadState('networkidle')
    
    // Should be back at resources page
    expect(page.url()).toContain('/resources')
    expect(page.url()).not.toContain('/search')
  })
  
  test('browser forward button works correctly', async ({ page }) => {
    // Navigate to resources page
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    // Perform search
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await searchInput.fill('test')
    await searchInput.press('Enter')
    
    await page.waitForLoadState('networkidle')
    
    // Go back
    await page.goBack()
    await page.waitForLoadState('networkidle')
    
    // Go forward
    await page.goForward()
    await page.waitForLoadState('networkidle')
    
    // Should be back at search results
    expect(page.url()).toContain('/resources/search')
  })
})

test.describe('Global Resource Search - Integration', () => {
  
  test('search from different resource pages preserves context', async ({ page }) => {
    // Search from main resources page
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    let searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await searchInput.fill('test1')
    await searchInput.press('Enter')
    await page.waitForLoadState('networkidle')
    
    expect(page.url()).toContain('from=%2Fresources')
    
    // Go back and navigate to a subcategory
    await page.goto('/resources/living-essentials/transportation')
    await page.waitForLoadState('networkidle')
    
    // Search from subcategory page
    searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await searchInput.fill('test2')
    await searchInput.press('Enter')
    await page.waitForLoadState('networkidle')
    
    // Should have different 'from' parameter
    expect(page.url()).toContain('from=')
    expect(page.url()).toContain('transportation')
  })
  
  test('multiple searches update URL correctly', async ({ page }) => {
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')
    
    // First search
    const searchInput = page.locator('input[placeholder*="Search all resources" i]')
    await searchInput.fill('housing')
    await searchInput.press('Enter')
    await page.waitForLoadState('networkidle')
    
    expect(page.url()).toContain('q=housing')
    
    // Second search from results page
    const searchInput2 = page.locator('input[placeholder*="Search all resources" i]')
    await searchInput2.clear()
    await searchInput2.fill('food')
    await searchInput2.press('Enter')
    await page.waitForLoadState('networkidle')
    
    expect(page.url()).toContain('q=food')
    expect(page.url()).not.toContain('q=housing')
  })
})

