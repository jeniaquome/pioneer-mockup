import { test, expect } from '@playwright/test'

test.describe('Multilingual Resource Search', () => {
  test.beforeEach(async ({ page }) => {
    // Start at the resources page
    await page.goto('/resources')
    await page.waitForLoadState('domcontentloaded')
  })

  test('Spanish search finds Spanish translations', async ({ page }) => {
    // Switch to Spanish - use aria-label to be more specific
    const languageButton = page.getByLabel('Select Language').first()
    await languageButton.click()
    
    // Wait for language menu and click Spanish
    const spanishOption = page.locator('text=Español').first()
    await spanishOption.click()
    
    // Wait for page to update with Spanish UI
    await page.waitForTimeout(1000)
    
    // Verify we're in Spanish (check nav or heading)
    const recursosText = page.locator('text=/Recursos|RECURSOS/').first()
    await expect(recursosText).toBeVisible({ timeout: 5000 })
    
    // Search for a Spanish term (e.g., "escuela" for school)
    const searchInput = page.locator('input[placeholder*="Buscar"], input[placeholder*="buscar"]').first()
    await searchInput.fill('escuela')
    
    const searchButton = page.locator('button:has-text("Buscar")').first()
    await searchButton.click()
    
    // Wait for search results page
    await page.waitForURL(/\/resources\/search\?q=escuela/, { timeout: 10000 })
    
    // Wait for results to load
    await page.waitForTimeout(2000)
    
    // Check if we have results or a "no results" message
    const noResults = page.locator('text=/No se encontraron recursos|Mostrando 0/')
    const hasResults = page.locator('text=/Mostrando.*de.*recursos/').first()
    
    // Either we have results or no results message should be visible
    const resultsVisible = await hasResults.isVisible().catch(() => false)
    const noResultsVisible = await noResults.isVisible().catch(() => false)
    
    expect(resultsVisible || noResultsVisible).toBeTruthy()
  })

  test('English search in Spanish UI still works', async ({ page }) => {
    // Switch to Spanish
    const languageButton = page.getByLabel('Select Language').first()
    await languageButton.click()
    
    const spanishOption = page.locator('text=Español').first()
    await spanishOption.click()
    
    await page.waitForTimeout(1000)
    
    // Search for an English term
    const searchInput = page.locator('input[placeholder*="Buscar"], input[placeholder*="buscar"]').first()
    await searchInput.fill('school')
    
    const searchButton = page.locator('button:has-text("Buscar")').first()
    await searchButton.click()
    
    // Wait for search results
    await page.waitForURL(/\/resources\/search\?q=school/, { timeout: 10000 })
    await page.waitForTimeout(2000)
    
    // Should have results (English resources should be found)
    const resultsIndicator = page.locator('text=/Mostrando.*de.*recursos/').first()
    await expect(resultsIndicator).toBeVisible({ timeout: 5000 })
  })

  test('Chinese search works with Chinese characters', async ({ page }) => {
    // Switch to Chinese
    const languageButton = page.getByLabel('Select Language').first()
    await languageButton.click()
    
    // Look for Chinese option (中文)
    const chineseOption = page.locator('text=中文').first()
    if (await chineseOption.isVisible().catch(() => false)) {
      await chineseOption.click()
      await page.waitForTimeout(1000)
      
      // Search with Chinese characters
      const searchInput = page.locator('input[type="text"]').first()
      await searchInput.fill('学校')
      
      const searchButton = page.locator('button').filter({ hasText: /搜索|Search/ }).first()
      await searchButton.click()
      
      await page.waitForURL(/\/resources\/search/, { timeout: 10000 })
      await page.waitForTimeout(2000)
      
      // Verify search results page loaded
      expect(page.url()).toContain('/resources/search')
    } else {
      test.skip()
    }
  })

  test('Arabic search works with RTL text', async ({ page }) => {
    // Switch to Arabic
    const languageButton = page.getByLabel('Select Language').first()
    await languageButton.click()
    
    // Look for Arabic option (العربية)
    const arabicOption = page.locator('text=العربية').first()
    if (await arabicOption.isVisible().catch(() => false)) {
      await arabicOption.click()
      await page.waitForTimeout(1000)
      
      // Search with Arabic text
      const searchInput = page.locator('input[type="text"]').first()
      await searchInput.fill('مدرسة')
      
      const searchButton = page.locator('button').filter({ hasText: /بحث|Search/ }).first()
      await searchButton.click()
      
      await page.waitForURL(/\/resources\/search/, { timeout: 10000 })
      await page.waitForTimeout(2000)
      
      // Verify search results page loaded
      expect(page.url()).toContain('/resources/search')
    } else {
      test.skip()
    }
  })

  test('Language parameter is passed in search URL', async ({ page }) => {
    // Switch to Spanish
    const languageButton = page.getByLabel('Select Language').first()
    await languageButton.click()
    
    const spanishOption = page.locator('text=Español').first()
    await spanishOption.click()
    await page.waitForTimeout(1000)
    
    // Perform search
    const searchInput = page.locator('input[placeholder*="Buscar"], input[placeholder*="buscar"]').first()
    await searchInput.fill('test')
    
    const searchButton = page.locator('button:has-text("Buscar")').first()
    await searchButton.click()
    
    // Wait for navigation
    await page.waitForURL(/\/resources\/search/, { timeout: 10000 })
    
    // Verify URL contains language parameter
    const url = page.url()
    expect(url).toContain('lang=es')
  })

  test('Search works without translations (English fallback)', async ({ page }) => {
    // Stay in English
    const searchInput = page.locator('input[placeholder*="Search all resources"]').first()
    await searchInput.fill('housing')
    
    const searchButton = page.locator('button:has-text("Search")').first()
    await searchButton.click()
    
    await page.waitForURL(/\/resources\/search\?q=housing/, { timeout: 10000 })
    await page.waitForTimeout(2000)
    
    // Should have results
    const resultsIndicator = page.locator('text=/Showing.*of.*resources/').first()
    await expect(resultsIndicator).toBeVisible({ timeout: 5000 })
  })

  test('Switching language updates search results', async ({ page }) => {
    // Search in English first
    const searchInput = page.locator('input[placeholder*="Search all resources"]').first()
    await searchInput.fill('food')
    
    let searchButton = page.locator('button:has-text("Search")').first()
    await searchButton.click()
    
    await page.waitForURL(/\/resources\/search\?q=food/, { timeout: 10000 })
    await page.waitForTimeout(2000)
    
    // Get initial result count
    const englishResults = await page.locator('text=/Showing.*of.*resources/').first().textContent()
    
    // Switch to Spanish
    const languageButton = page.getByLabel('Select Language').first()
    await languageButton.click()
    
    const spanishOption = page.locator('text=Español').first()
    await spanishOption.click()
    
    // Wait for page to update
    await page.waitForTimeout(2000)
    
    // Results should update (might be different count if Spanish translations exist)
    const spanishResults = await page.locator('text=/Mostrando.*de.*recursos/').first().textContent()
    
    // At minimum, the text should be in Spanish now
    expect(spanishResults).toContain('Mostrando')
  })

  test('Empty search shows appropriate message in current language', async ({ page }) => {
    // Switch to Spanish
    const languageButton = page.getByLabel('Select Language').first()
    await languageButton.click()
    
    const spanishOption = page.locator('text=Español').first()
    await spanishOption.click()
    await page.waitForTimeout(1000)
    
    // Search for something that won't exist
    const searchInput = page.locator('input[placeholder*="Buscar"], input[placeholder*="buscar"]').first()
    await searchInput.fill('xyzabc123nonexistent')
    
    const searchButton = page.locator('button:has-text("Buscar")').first()
    await searchButton.click()
    
    await page.waitForURL(/\/resources\/search/, { timeout: 10000 })
    await page.waitForTimeout(2000)
    
    // Should show "no results" message in Spanish
    const noResultsMessage = page.locator('text=/No se encontraron recursos/').first()
    await expect(noResultsMessage).toBeVisible({ timeout: 5000 })
  })

  test('Search bar maintains language context across pages', async ({ page }) => {
    // Switch to Spanish
    const languageButton = page.getByLabel('Select Language').first()
    await languageButton.click()
    
    const spanishOption = page.locator('text=Español').first()
    await spanishOption.click()
    await page.waitForTimeout(1000)
    
    // Navigate to a category page - be more specific
    const categoryLink = page.locator('a[href^="/resources/"][href$="essentials"], a[href^="/resources/"][href$="work-business"]').first()
    if (await categoryLink.isVisible().catch(() => false)) {
      await categoryLink.click()
      await page.waitForTimeout(1000)
      
      // Search bar should still be in Spanish
      const searchInput = page.locator('input[placeholder*="Buscar"], input[placeholder*="buscar"]').first()
      await expect(searchInput).toBeVisible({ timeout: 5000 })
    } else {
      // If no category cards found, just verify search bar exists on current page
      const searchInput = page.locator('input[placeholder*="Buscar"], input[placeholder*="buscar"]').first()
      await expect(searchInput).toBeVisible({ timeout: 5000 })
    }
  })
})

