import { test, expect } from '@playwright/test';

test.describe('Navigation Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the logo and brand name', async ({ page }) => {
    const logo = page.locator('img[alt*="Pittsburgh Tomorrow Pioneer"]');
    await expect(logo).toBeVisible();
    const brand = page.locator('span', { hasText: 'Pittsburgh Tomorrow Pioneer' });
    await expect(brand).toBeVisible();
  });

  test('should have Home, How It Works, and About nav links', async ({ page }) => {
    await expect(page.locator('#nav-link-home')).toBeVisible();
    await expect(page.locator('#nav-link-how-it-works')).toBeVisible();
    await expect(page.locator('#nav-link-about')).toBeVisible();
  });

  test('should have Get Started button in nav', async ({ page }) => {
    await expect(page.locator('#nav-get-started-btn')).toBeVisible();
  });

  test('Get Started button should link to /screening', async ({ page }) => {
    const btn = page.locator('#nav-get-started-btn');
    await btn.click();
    // Should navigate to /screening (route may not exist yet, so just check URL)
    await expect(page).toHaveURL(/\/screening/);
  });
});
