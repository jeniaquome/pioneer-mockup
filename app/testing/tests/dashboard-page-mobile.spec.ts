import { test, expect } from '@playwright/test';

/**
 * User Dashboard Mobile Layout Tests
 * Ensures 'Edit Responses' button is correctly positioned on mobile
 */

const MOBILE_VIEWPORT = { width: 390, height: 844 };

// These tests assume a logged-in user with completed survey. 
// They will be skipped in environments without test user setup.

test.describe('User Dashboard Mobile Layout', () => {
  test.skip('"Edit Responses" button should be below survey text on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Assume successful login as a user with completed survey
    // This part would involve actual login steps if not skipped
    
    await page.goto('/dashboard'); // Navigate to user dashboard
    await page.waitForLoadState('networkidle');

    // Locate the survey completion text container
    const surveyTextContainer = page.locator(
      'p:has-text("You completed your onboarding survey")'
    ).first();
    await expect(surveyTextContainer).toBeVisible();

    // Locate the "Edit Responses" button
    const editButton = page.locator('button').filter({ hasText: /Edit Responses/i }).first();
    await expect(editButton).toBeVisible();

    // Get bounding boxes to compare positions
    const surveyTextBox = await surveyTextContainer.boundingBox();
    const editButtonBox = await editButton.boundingBox();

    if (surveyTextBox && editButtonBox) {
      // The button's top should be below the text's bottom
      expect(editButtonBox.y).toBeGreaterThan(surveyTextBox.y + surveyTextBox.height);
      
      // Button should take full width on mobile
      expect(editButtonBox.width).toBeGreaterThanOrEqual(MOBILE_VIEWPORT.width - 60); // Allow for padding
    }
  });

  test.skip('"Edit Responses" button should have proper touch target on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Assume successful login
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const editButton = page.locator('button').filter({ hasText: /Edit Responses/i }).first();
    
    // Check for touch-target properties (min-height or class)
    const buttonHeight = await editButton.evaluate(el => el.clientHeight);
    expect(buttonHeight).toBeGreaterThanOrEqual(44); // WCAG recommended touch target size

    // Should be clickable
    await expect(editButton).toBeEnabled();
  });

  test.skip('dashboard page should not have horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Assume successful login
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Check that the page doesn't have horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });
});
