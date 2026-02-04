import { test, expect } from '@playwright/test';

// Test that the app shell renders Navigation, Footer, and HomePage correctly

test.describe('App Shell', () => {
  test('renders Navigation, HomePage, and Footer on root route', async ({ page }) => {
    await page.goto('/');
    // Navigation
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('img[alt*="Pittsburgh Tomorrow Pioneer"]')).toBeVisible();
    await expect(page.locator('#nav-link-home')).toBeVisible();
    // HomePage hero
    await expect(page.locator('h1')).toContainText('Find Your Path in Pittsburgh');
    // Footer
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('#footer-link-home')).toBeVisible();
    await expect(page.locator('#footer-link-about')).toBeVisible();
    await expect(page.locator('#footer-link-get-started')).toBeVisible();
  });

  test('Navigation and Footer are sticky across navigation', async ({ page }) => {
    await page.goto('/');
    // Click About (should route to /about if implemented, but check nav/footer remain)
    await page.locator('#nav-link-about').click();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});
