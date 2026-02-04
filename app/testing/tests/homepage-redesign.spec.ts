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
    await expect(page.locator('a[href="/resources"]').first()).toBeVisible();
  });

  test('Begin Your Journey CTA links to screening', async ({ page }) => {
    const beginJourneyBtn = page.locator('a[href="/screening"]').filter({ hasText: /Begin Your Journey/i });
    await expect(beginJourneyBtn).toBeVisible();

    // Click and verify navigation
    await beginJourneyBtn.click();
    await expect(page).toHaveURL(/\/screening/);
  });

  test('Explore Resources CTA links to resources', async ({ page }) => {
    const exploreResourcesBtn = page.locator('a[href="/resources"]').filter({ hasText: /Explore Resources/i });
    await expect(exploreResourcesBtn).toBeVisible();
  });

  test('Mission section is accessible via scroll indicator', async ({ page }) => {
    const scrollIndicator = page.locator('a[href="#mission"]');
    await expect(scrollIndicator).toBeVisible();

    // Click scroll indicator (force click to bypass animation stability)
    await scrollIndicator.click({ force: true });

    // Wait for scroll animation
    await page.waitForTimeout(1000);

    // Check mission section is visible
    const missionSection = page.locator('#mission');
    await expect(missionSection).toBeVisible();
  });

  test('feature cards link to internal resources', async ({ page }) => {
    // Scroll to features section
    await page.locator('#features').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check feature card links are internal (start with /resources)
    const featureLinks = page.locator('a[href^="/resources/"]');
    const count = await featureLinks.count();

    expect(count).toBeGreaterThan(0);

    // Verify first link is internal
    const firstLink = featureLinks.first();
    const href = await firstLink.getAttribute('href');
    expect(href).toMatch(/^\/resources\//);
  });

  test('footer CTA buttons use internal routes', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check Start Your Journey button links to /screening
    const startJourneyBtn = page.locator('a[href="/screening"]').filter({ hasText: /Start Your Journey/i });
    await expect(startJourneyBtn).toBeVisible();

    // Check Watch The Story button links to /about
    const watchStoryBtn = page.locator('a[href="/about"]').filter({ hasText: /Watch The Story/i });
    await expect(watchStoryBtn).toBeVisible();
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
});
