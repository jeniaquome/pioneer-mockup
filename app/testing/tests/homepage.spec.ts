import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section with heading and description', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText(/Find Your Path in Pittsburgh/);
    await expect(page.locator('p')).toContainText('Personalized checklists');
    await expect(page.locator('#hero-get-started-btn')).toBeVisible();
  });

  test('hero Get Started button navigates to /screening', async ({ page }) => {
    await page.locator('#hero-get-started-btn').click();
    await expect(page).toHaveURL(/\/screening/);
  });

  test('should display How It Works section', async ({ page }) => {
    await expect(page.locator('#how-it-works')).toBeVisible();
    await expect(page.locator('h2')).toHaveText(/How.*Pioneer.*Works/);
    await expect(page.locator('h3', { hasText: 'Answer a Few Questions' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Get a Personalized Checklist' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Connect & Thrive' })).toBeVisible();
  });

  test('should display Call To Action section', async ({ page }) => {
    await expect(page.locator('#cta-get-started-btn')).toBeVisible();
    await expect(page.locator('#cta-get-started-btn')).toHaveText(/Get Started/);
  });

  test('CTA Get Started button navigates to /screening', async ({ page }) => {
    await page.locator('#cta-get-started-btn').click();
    await expect(page).toHaveURL(/\/screening/);
  });
});
