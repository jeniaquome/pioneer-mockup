import { test, expect } from '@playwright/test';

test.describe('Homepage Redesign', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads successfully with hero section', async ({ page }) => {
    // Check the page title exists
    await expect(page.locator('h1')).toBeVisible();

    // Check hero section has main CTA buttons
    await expect(page.locator('a[href="/screening"]').first()).toBeVisible();
    await expect(page.locator('a[href="#story"]').first()).toBeVisible();
  });

  test('Get Your Free Guide CTA links to screening', async ({ page }) => {
    const guideBtn = page.locator('a[href="/screening"]').filter({ hasText: /Get Your Free Guide/i });
    await expect(guideBtn.first()).toBeVisible();

    // Click and verify navigation
    await guideBtn.first().click();
    await expect(page).toHaveURL(/\/screening/);
  });

  test('Learn Our Story CTA links to story section', async ({ page }) => {
    const storyBtn = page.locator('a[href="#story"]').filter({ hasText: /Learn Our Story/i });
    await expect(storyBtn).toBeVisible();
  });

  test('Story section is accessible via scroll indicator', async ({ page }) => {
    const scrollIndicator = page.locator('a[href="#story"]').first();
    await expect(scrollIndicator).toBeVisible();

    // Click scroll indicator
    await scrollIndicator.click({ force: true });

    // Wait for scroll animation
    await page.waitForTimeout(1000);

    // Check story section is visible
    const storySection = page.locator('#story');
    await expect(storySection).toBeVisible();
  });

  test('feature cards link to internal resources with correct category IDs', async ({ page }) => {
    // Scroll to resources section
    await page.locator('#resources').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check feature card links are internal (start with /resources)
    const featureLinks = page.locator('a[href^="/resources/"]');
    const count = await featureLinks.count();

    expect(count).toBeGreaterThan(0);

    // Verify links use correct category IDs from taxonomy
    const expectedCategories = [
      'living-essentials',
      'community-belonging',
      'education-youth',
      'esl-immigrant',
      'work-business',
      'culture-leisure'
    ];

    for (let i = 0; i < Math.min(count, expectedCategories.length); i++) {
      const link = featureLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toContain(expectedCategories[i]);
    }
  });

  test('story section displays images and content', async ({ page }) => {
    // Scroll to story section
    await page.locator('#story').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check story section has images
    const storyImages = page.locator('#story img');
    const count = await storyImages.count();
    expect(count).toBeGreaterThan(0);

    // Check for narrative text
    const storyText = await page.locator('#story').textContent();
    expect(storyText).toContain('groundbreaking');
  });

  test('no external pittsburghpioneer.com links in visible navigation', async ({ page }) => {
    // Check there are no visible links to external pittsburghpioneer.com
    const externalLinks = page.locator('a[href*="pittsburghpioneer.com"]:visible');
    const count = await externalLinks.count();

    expect(count).toBe(0);
  });

  test('Pittsburgh photos are displayed in gallery section', async ({ page }) => {
    // Scroll to gallery section
    await page.locator('#gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check gallery section is visible
    await expect(page.locator('#gallery')).toBeVisible();

    // Check that images are present
    const galleryImages = page.locator('#gallery img');
    const count = await galleryImages.count();

    expect(count).toBeGreaterThan(0);
  });

  test('navigation links are all internal routes', async ({ page }) => {
    // Get all navigation links
    const navLinks = page.locator('nav a, header a');
    const count = await navLinks.count();

    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');

      if (href) {
        // All hrefs should be internal (start with / or #) or be mailto links
        const isInternal = href.startsWith('/') || href.startsWith('#') || href.startsWith('mailto:');
        expect(isInternal).toBe(true);
      }
    }
  });

  test('final CTA section has Get Your Free Guide button', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check final CTA button
    const ctaBtn = page.locator('a[href="/screening"]').filter({ hasText: /Get Your Free Guide/i });
    await expect(ctaBtn.last()).toBeVisible();
  });
});
