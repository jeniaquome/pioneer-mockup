import { test, expect } from '@playwright/test';

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display About Pittsburgh Tomorrow Pioneer section', async ({ page }) => {
    await expect(page.locator('h3', { hasText: 'About Pittsburgh Tomorrow Pioneer' })).toBeVisible();
    await expect(page.locator('p')).toContainText('Pittsburgh Tomorrow Pioneer helps newcomers');
  });

  test('should have Quick Links with correct navigation', async ({ page }) => {
    await expect(page.locator('#footer-link-home')).toBeVisible();
    await expect(page.locator('#footer-link-about')).toBeVisible();
    await expect(page.locator('#footer-link-get-started')).toBeVisible();

    // Test navigation
    await page.locator('#footer-link-home').click();
    await expect(page).toHaveURL('/');
    await page.locator('#footer-link-about').click();
    await expect(page).toHaveURL('/about');
    await page.goBack();
    await page.locator('#footer-link-get-started').click();
    await expect(page).toHaveURL(/\/screening/);
  });

  test('should display Contact info', async ({ page }) => {
    await expect(page.locator('p', { hasText: 'Pittsburgh, PA' })).toBeVisible();
    await expect(page.locator('p', { hasText: 'hello@pioneerpa.org' })).toBeVisible();
  });

  test('should show social icons with correct aria-labels', async ({ page }) => {
    await expect(page.locator('#footer-facebook')).toBeVisible();
    await expect(page.locator('#footer-twitter')).toBeVisible();
    await expect(page.locator('#footer-instagram')).toBeVisible();
    await expect(page.locator('#footer-github')).toBeVisible();
  });

  test('should display copyright with current year', async ({ page }) => {
    const year = new Date().getFullYear();
    await expect(page.locator('footer')).toContainText(year.toString());
  });
});
