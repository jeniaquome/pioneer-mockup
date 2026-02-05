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

  test('Create Your Roadmap CTA links to screening', async ({ page }) => {
    const roadmapBtn = page.locator('a[href="/screening"]').filter({ hasText: /Create Your Roadmap/i });
    await expect(roadmapBtn.first()).toBeVisible();

    // Click and verify navigation
    await roadmapBtn.first().click();
    await expect(page).toHaveURL(/\/screening/);
  });

  test('Explore Resources CTA links to resources', async ({ page }) => {
    const resourcesBtn = page.locator('a[href="/resources"]').filter({ hasText: /Explore Resources/i });
    await expect(resourcesBtn).toBeVisible();
  });

  test('Story section has You Are the Pioneer content', async ({ page }) => {
    // Scroll to story section
    await page.locator('#story').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check story section is visible
    await expect(page.locator('#story')).toBeVisible();

    // Check for key content
    const storyText = await page.locator('#story').textContent();
    expect(storyText).toContain('Pioneer');
  });

  test('How Pioneer Helps section displays features', async ({ page }) => {
    // Scroll to why/features section (consolidated)
    await page.locator('#why').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check for feature content
    const whyText = await page.locator('#why').textContent();
    expect(whyText).toContain('How Pittsburgh Tomorrow Pioneer Helps');
    expect(whyText).toContain('starting from scratch');
  });

  test('Resources navigation links to resources page', async ({ page }) => {
    // Click on Resources nav link
    const resourcesLink = page.locator('nav a[href="/resources"]').first();
    await expect(resourcesLink).toBeVisible();

    // Verify it links to the resources page (not a section)
    const href = await resourcesLink.getAttribute('href');
    expect(href).toBe('/resources');
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

  test('About Pittsburgh Tomorrow section is at the bottom', async ({ page }) => {
    // Scroll to bottom area
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1000));
    await page.waitForTimeout(500);

    // Check for About Pittsburgh Tomorrow content
    const pageText = await page.textContent('body');
    expect(pageText).toContain('About Pittsburgh Tomorrow');
    expect(pageText).toContain('nonprofit organization');
  });

  test('final CTA section has Create Your Roadmap button', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check final CTA button
    const ctaBtn = page.locator('a[href="/screening"]').filter({ hasText: /Create Your Roadmap/i });
    await expect(ctaBtn.last()).toBeVisible();
  });
});
