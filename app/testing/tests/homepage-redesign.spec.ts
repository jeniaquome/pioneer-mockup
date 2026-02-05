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

  test('Why section explains the purpose', async ({ page }) => {
    // Scroll to why section
    await page.locator('#why').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check for key content
    const whyText = await page.locator('#why').textContent();
    expect(whyText).toContain('Why Pittsburgh Tomorrow Pioneer');
    expect(whyText).toContain('starting from scratch');
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

  test('How Pioneer Helps section displays features', async ({ page }) => {
    // Scroll to mission section
    await page.locator('#mission').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check for feature content
    const missionText = await page.locator('#mission').textContent();
    expect(missionText).toContain('How Pittsburgh Tomorrow Pioneer Helps');
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
