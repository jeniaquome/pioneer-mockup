import { test, expect } from '@playwright/test';

test.describe('Pittsburgh Pioneer CTAs and Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5175');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/pioneer-mockup/i);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigation logo links to Pittsburgh Pioneer homepage', async ({ page }) => {
    const logoLink = page.locator('nav a[href="https://www.pittsburghpioneer.com"]');
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute('target', '_blank');
  });

  test('navigation links are present and have correct hrefs', async ({ page }) => {
    // Neighborhoods link (internal)
    const neighborhoodsLink = page.locator('nav a[href="#neighborhoods"]');
    await expect(neighborhoodsLink).toBeVisible();
    await expect(neighborhoodsLink).toContainText('Neighborhoods');

    // Resources link - use getByRole for more specific selection
    const resourcesLink = page.getByRole('link', { name: 'Resources', exact: true });
    await expect(resourcesLink).toBeVisible();
    await expect(resourcesLink).toHaveAttribute('href', 'https://www.pittsburghpioneer.com/resources');

    // About link
    const aboutLink = page.getByRole('link', { name: 'The Pioneer Story' });
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveAttribute('href', 'https://www.pittsburghpioneer.com/about');
  });

  test('Get Your Guide CTA in header links to resources', async ({ page }) => {
    const getGuideBtn = page.locator('nav a[href="https://www.pittsburghpioneer.com/resources"]').filter({ hasText: 'Get Your Guide' });
    await expect(getGuideBtn).toBeVisible();
    await expect(getGuideBtn).toHaveAttribute('target', '_blank');
  });

  test('Begin Your Journey CTA links to resources', async ({ page }) => {
    const beginJourneyBtn = page.locator('a[href="https://www.pittsburghpioneer.com/resources"]').filter({ hasText: 'Begin Your Journey' });
    await expect(beginJourneyBtn).toBeVisible();
    await expect(beginJourneyBtn).toHaveAttribute('target', '_blank');
  });

  test('Explore The Map CTA links to neighborhoods section', async ({ page }) => {
    const exploreMapBtn = page.locator('a[href="#neighborhoods"]').filter({ hasText: 'Explore The Map' });
    await expect(exploreMapBtn).toBeVisible();
  });

  test('internal neighborhoods link scrolls to section', async ({ page }) => {
    const exploreMapBtn = page.locator('a[href="#neighborhoods"]').first();
    await exploreMapBtn.click();

    // Wait for scroll animation
    await page.waitForTimeout(1000);

    // Check that the neighborhoods section is visible
    const neighborhoodsSection = page.locator('#neighborhoods');
    await expect(neighborhoodsSection).toBeVisible();
  });

  test('feature cards link to resources with correct anchors', async ({ page }) => {
    const featureCards = [
      { title: 'Housing', anchor: '#housing' },
      { title: 'Education', anchor: '#education' },
      { title: 'Community', anchor: '#community' },
      { title: 'Language', anchor: '#language' },
      { title: 'Settling In', anchor: '#settling-in' },
    ];

    // Scroll to the section first
    await page.locator('#neighborhoods').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    for (const card of featureCards) {
      // Use h4 title to find the specific card
      const cardLink = page.locator(`a[href*="pittsburghpioneer.com/resources"][href*="${card.anchor}"]`).first();
      await expect(cardLink).toBeVisible();
      await expect(cardLink).toHaveAttribute('target', '_blank');
      const href = await cardLink.getAttribute('href');
      expect(href).toContain(card.anchor);
    }

    // Test Neighborhoods card separately (has different anchor)
    const neighborhoodsCard = page.locator('a[href*="pittsburghpioneer.com/resources?lang=en#neighborhoods"]');
    await expect(neighborhoodsCard).toBeVisible();
  });

  test('Start Your Journey CTA in footer links to resources', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const startJourneyBtn = page.locator('footer a[href="https://www.pittsburghpioneer.com/resources"]').filter({ hasText: 'Start Your Journey' });
    await expect(startJourneyBtn).toBeVisible();
    await expect(startJourneyBtn).toHaveAttribute('target', '_blank');
  });

  test('Watch The Story CTA links to about page', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const watchStoryBtn = page.locator('footer a[href="https://www.pittsburghpioneer.com/about"]').filter({ hasText: 'Watch The Story' });
    await expect(watchStoryBtn).toBeVisible();
    await expect(watchStoryBtn).toHaveAttribute('target', '_blank');
  });

  test('footer links are present and have correct hrefs', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Terms link
    const termsLink = page.locator('footer a').filter({ hasText: 'Terms' });
    await expect(termsLink).toBeVisible();
    await expect(termsLink).toHaveAttribute('href', 'https://www.pittsburghpioneer.com/privacy');

    // Privacy link
    const privacyLink = page.locator('footer a').filter({ hasText: 'Privacy' });
    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toHaveAttribute('href', 'https://www.pittsburghpioneer.com/privacy');

    // Contact link
    const contactLink = page.locator('footer a').filter({ hasText: 'Contact' });
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute('href', 'https://www.pittsburghpioneer.com/about');
  });

  test('all external links open in new tab', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
