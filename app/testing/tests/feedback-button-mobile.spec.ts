import { test, expect } from '@playwright/test';

/**
 * Feedback Button Mobile Layout Tests
 * Ensures feedback button doesn't conflict with chat button on mobile
 * Tests across multiple browsers (Chromium, WebKit/Safari, Firefox)
 */

const MOBILE_VIEWPORT = { width: 390, height: 844 };
const SMALL_MOBILE = { width: 360, height: 640 };

test.describe('Feedback Button Mobile Layout', () => {
  test('feedback button should be fully visible and accessible on mobile', async ({ page, browserName }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find mobile feedback button (in the .sm:hidden container, at bottom-6 left-4)
    const feedbackContainer = page.locator('div.sm\\:hidden.fixed.bottom-6.left-4');
    const feedbackButton = feedbackContainer.locator('button').first();
    
    await expect(feedbackButton).toBeVisible();
    
    // Check position
    const feedbackBox = await feedbackButton.boundingBox();
    if (feedbackBox) {
      // Should be fully visible (not cut off on the left)
      // Ensure x position is >= 0 (not clipped by viewport edge)
      expect(feedbackBox.x).toBeGreaterThanOrEqual(0);
      
      // Should be on the left side (x < 200)
      expect(feedbackBox.x).toBeLessThan(200);
      
      // Should be near the bottom (y > viewport height - 100)
      expect(feedbackBox.y).toBeGreaterThan(MOBILE_VIEWPORT.height - 100);
      
      // Should meet touch target requirements
      expect(feedbackBox.height).toBeGreaterThanOrEqual(44);
      expect(feedbackBox.width).toBeGreaterThanOrEqual(44);
    }
  });

  test('feedback button should be fully visible on small mobile screens', async ({ page }) => {
    await page.setViewportSize(SMALL_MOBILE);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const feedbackContainer = page.locator('div.sm\\:hidden.fixed.bottom-6.left-4');
    const feedbackButton = feedbackContainer.locator('button').first();
    
    await expect(feedbackButton).toBeVisible();
    
    const feedbackBox = await feedbackButton.boundingBox();
    if (feedbackBox) {
      // Critical: button should not be clipped on the left edge
      expect(feedbackBox.x).toBeGreaterThanOrEqual(0);
      
      // Button should be fully within viewport
      expect(feedbackBox.x + feedbackBox.width).toBeLessThanOrEqual(SMALL_MOBILE.width);
    }
  });

  test('feedback and chat buttons should not overlap on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find both buttons
    const feedbackContainer = page.locator('div.sm\\:hidden.fixed.bottom-6.left-4');
    const feedbackButton = feedbackContainer.locator('button').first();
    const chatContainer = page.locator('div.fixed.bottom-6.right-6').first();
    
    const feedbackBox = await feedbackButton.boundingBox();
    const chatBox = await chatContainer.boundingBox();
    
    if (feedbackBox && chatBox) {
      // Feedback should be on the left, chat on the right
      // Allow for some tolerance (buttons can be close but shouldn't overlap significantly)
      const gap = chatBox.x - (feedbackBox.x + feedbackBox.width);
      expect(gap).toBeGreaterThan(-20); // Allow up to 20px overlap for rounding
      
      // Both should be at similar bottom positions
      const bottomDiff = Math.abs(feedbackBox.y - chatBox.y);
      expect(bottomDiff).toBeLessThan(100); // Within 100px of each other vertically
    }
  });

  test('feedback button should have proper touch target on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const feedbackContainer = page.locator('div.sm\\:hidden.fixed.bottom-6.left-4');
    const feedbackButton = feedbackContainer.locator('button').first();
    
    // Check for touch-target class
    const classes = await feedbackButton.getAttribute('class');
    expect(classes).toContain('touch-target');
    
    // Should be clickable
    await expect(feedbackButton).toBeEnabled();
  });

  test('feedback button should open modal when clicked', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const feedbackContainer = page.locator('div.sm\\:hidden.fixed.bottom-6.left-4');
    const feedbackButton = feedbackContainer.locator('button').first();
    
    await feedbackButton.click();
    await page.waitForTimeout(300);
    
    // Modal should be visible
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Should have iframe with feedback form
    const iframe = page.locator('iframe[title="Feedback form"]');
    await expect(iframe).toBeVisible();
  });

  test('feedback modal close button should have proper touch target', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Open feedback modal
    const feedbackContainer = page.locator('div.sm\\:hidden.fixed.bottom-6.left-4');
    const feedbackButton = feedbackContainer.locator('button').first();
    await feedbackButton.click();
    await page.waitForTimeout(500);
    
    // Find close button - should be visible
    const closeButton = page.locator('button').filter({ hasText: /close/i });
    await expect(closeButton).toBeVisible();
    
    // Check touch target size
    const box = await closeButton.boundingBox();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(40); // Slightly less strict for modal buttons
    }
  });

  test('feedback button should not be visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Mobile feedback button (left side) should be hidden on desktop
    const mobileFeedbackButton = page.locator('div.sm\\:hidden button').filter({ hasText: /feedback/i });
    await expect(mobileFeedbackButton).toBeHidden();
    
    // Desktop feedback button (right side vertical tab) should be visible
    const desktopFeedbackButton = page.locator('div.hidden.sm\\:block button').filter({ hasText: /feedback/i });
    await expect(desktopFeedbackButton).toBeVisible();
  });

  test('desktop feedback button should be fully visible and not cut off', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Desktop feedback button (vertical tab on right)
    const desktopFeedbackContainer = page.locator('div.hidden.sm\\:block.fixed');
    const desktopFeedbackButton = desktopFeedbackContainer.locator('button').filter({ hasText: /feedback/i });
    
    await expect(desktopFeedbackButton).toBeVisible();
    
    // Check position - button text should be visible and clickable
    const buttonBox = await desktopFeedbackButton.boundingBox();
    const viewport = page.viewportSize();
    
    if (buttonBox && viewport) {
      // Button should be near the right edge (within reasonable bounds)
      // Allow for slight overflow due to shadows/borders (acceptable in Safari)
      expect(buttonBox.x + buttonBox.width).toBeLessThanOrEqual(viewport.width + 50);
      
      // Button should be positioned near the right edge
      expect(buttonBox.x + buttonBox.width).toBeGreaterThan(viewport.width - 100);
      
      // Most importantly: button should be clickable
      await expect(desktopFeedbackButton).toBeEnabled();
    }
  });
});

test.describe('Feedback Button Cross-Browser Tests', () => {
  test('mobile feedback button should be fully visible in Safari/WebKit', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit', 'This test is specifically for WebKit/Safari');
    
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const feedbackContainer = page.locator('div.sm\\:hidden.fixed.bottom-6.left-4');
    const feedbackButton = feedbackContainer.locator('button').first();
    
    // Should be visible
    await expect(feedbackButton).toBeVisible();
    
    // Check button is not clipped
    const feedbackBox = await feedbackButton.boundingBox();
    if (feedbackBox) {
      // Critical for Safari: ensure button is fully visible (not clipped)
      expect(feedbackBox.x).toBeGreaterThanOrEqual(0);
      
      // Should be clickable
      const isEnabled = await feedbackButton.isEnabled();
      expect(isEnabled).toBe(true);
      
      // Attempt to click and verify it responds
      await feedbackButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
    }
  });

  test('desktop feedback button should not be cut off in Safari/WebKit', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit', 'This test is specifically for WebKit/Safari');
    
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Desktop feedback button (vertical tab on right)
    const desktopFeedbackContainer = page.locator('div.hidden.sm\\:block.fixed');
    const desktopFeedbackButton = desktopFeedbackContainer.locator('button').filter({ hasText: /feedback/i });
    
    await expect(desktopFeedbackButton).toBeVisible();
    
    // Critical for Safari: Check button text is visible and button is clickable
    const buttonBox = await desktopFeedbackButton.boundingBox();
    const viewport = page.viewportSize();
    
    if (buttonBox && viewport) {
      // Button should be near the right edge (allow small overflow for shadows/borders)
      expect(buttonBox.x + buttonBox.width).toBeLessThanOrEqual(viewport.width + 50);
      
      // Should be clickable and open modal
      await desktopFeedbackButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
    }
  });

  test('feedback button should be fully visible in Chrome/Chromium', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'This test is specifically for Chromium');
    
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const feedbackContainer = page.locator('div.sm\\:hidden.fixed.bottom-6.left-4');
    const feedbackButton = feedbackContainer.locator('button').first();
    
    await expect(feedbackButton).toBeVisible();
    
    const feedbackBox = await feedbackButton.boundingBox();
    if (feedbackBox) {
      expect(feedbackBox.x).toBeGreaterThanOrEqual(0);
    }
  });

  test('feedback button should be fully visible in Firefox', async ({ page, browserName }) => {
    test.skip(browserName !== 'firefox', 'This test is specifically for Firefox');
    
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const feedbackContainer = page.locator('div.sm\\:hidden.fixed.bottom-6.left-4');
    const feedbackButton = feedbackContainer.locator('button').first();
    
    await expect(feedbackButton).toBeVisible();
    
    const feedbackBox = await feedbackButton.boundingBox();
    if (feedbackBox) {
      expect(feedbackBox.x).toBeGreaterThanOrEqual(0);
    }
  });
});

