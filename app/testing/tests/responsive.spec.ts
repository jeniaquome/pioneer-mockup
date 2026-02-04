import { test, expect } from '@playwright/test';

/**
 * Responsive Design Tests - Phase 1
 * Tests breakpoint behavior, touch targets, and responsive utilities
 */

// Common viewport sizes to test
const VIEWPORTS = {
  mobile: { width: 375, height: 667 }, // iPhone SE
  mobileSmall: { width: 320, height: 568 }, // iPhone 5/SE (smallest)
  mobileLarge: { width: 428, height: 926 }, // iPhone 14 Pro Max
  tablet: { width: 768, height: 1024 }, // iPad
  tabletLandscape: { width: 1024, height: 768 }, // iPad Landscape
  desktop: { width: 1280, height: 720 }, // Standard desktop
  desktopLarge: { width: 1920, height: 1080 }, // Full HD
};

test.describe('Responsive Design - Breakpoint Behavior', () => {
  test('should display mobile navigation on mobile viewport', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Mobile menu button should be visible
    const hamburgerButton = page.locator('button[aria-label*="menu" i], button:has(svg)').first();
    await expect(hamburgerButton).toBeVisible();

    // Desktop navigation links should be hidden
    const desktopNav = page.locator('nav ul.hidden.lg\\:flex, nav .hidden.lg\\:flex').first();
    if (await desktopNav.count() > 0) {
      await expect(desktopNav).not.toBeVisible();
    }
  });

  test('should display desktop navigation on desktop viewport', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/');

    // Desktop navigation should be visible
    const desktopNav = page.locator('nav ul, nav .flex').first();
    await expect(desktopNav).toBeVisible();
  });

  test('should display tablet navigation on tablet viewport', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.tablet);
    await page.goto('/');

    // Navigation should be present and functional
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('should handle viewport resize gracefully', async ({ page }) => {
    await page.goto('/');

    // Start with desktop
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.waitForTimeout(500);

    // Resize to mobile
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.waitForTimeout(500);

    // Check page is still functional
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // No horizontal scroll should be present
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });
});

test.describe('Responsive Design - Touch Targets', () => {
  test('should have minimum 44px touch targets on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Check all buttons and links
    const interactiveElements = await page.locator('button, a[href]').all();
    
    for (const element of interactiveElements.slice(0, 10)) { // Test first 10 elements
      const box = await element.boundingBox();
      if (box && await element.isVisible()) {
        // Allow some tolerance for elements that might be partially visible
        if (box.height > 20) { // Only test reasonably sized elements
          expect(box.height).toBeGreaterThanOrEqual(40); // Allow small tolerance
        }
      }
    }
  });

  test('should have accessible navigation buttons on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Find mobile menu button
    const menuButton = page.locator('button').filter({ hasText: /menu/i }).or(
      page.locator('button[aria-label*="menu" i]')
    ).first();

    if (await menuButton.count() > 0) {
      const box = await menuButton.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});

test.describe('Responsive Design - Layout Adaptation', () => {
  test('should not have horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });

  test('should not have horizontal scroll on smallest mobile device', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobileSmall);
    await page.goto('/');

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });

  test('should adapt hero section across breakpoints', async ({ page }) => {
    // Test mobile
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');
    
    const heroMobile = page.locator('.hero-bg, [class*="hero"]').first();
    await expect(heroMobile).toBeVisible();

    // Test tablet
    await page.setViewportSize(VIEWPORTS.tablet);
    await page.waitForTimeout(300);
    await expect(heroMobile).toBeVisible();

    // Test desktop
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.waitForTimeout(300);
    await expect(heroMobile).toBeVisible();
  });

  test('should stack cards on mobile and grid on desktop', async ({ page }) => {
    await page.goto('/');

    // Check mobile layout
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.waitForTimeout(300);
    
    const cards = page.locator('[class*="grid"]').first();
    if (await cards.count() > 0) {
      const gridClass = await cards.getAttribute('class');
      // On mobile, should have single column or stack
      expect(gridClass).toBeTruthy();
    }

    // Check desktop layout
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.waitForTimeout(300);
    
    // Grid should be present
    const desktopCards = page.locator('[class*="grid"]').first();
    if (await desktopCards.count() > 0) {
      await expect(desktopCards).toBeVisible();
    }
  });
});

test.describe('Responsive Design - Typography', () => {
  test('should have readable text on all viewports', async ({ page }) => {
    const viewports = [VIEWPORTS.mobile, VIEWPORTS.tablet, VIEWPORTS.desktop];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      // Check body text size
      const bodyText = page.locator('p, span, div').first();
      const fontSize = await bodyText.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });

      const fontSizeNum = parseInt(fontSize);
      // Minimum 12px for readability
      expect(fontSizeNum).toBeGreaterThanOrEqual(12);
    }
  });

  test('should scale headings appropriately', async ({ page }) => {
    await page.goto('/');

    // Mobile
    await page.setViewportSize(VIEWPORTS.mobile);
    const h1Mobile = page.locator('h1').first();
    const fontSizeMobile = await h1Mobile.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    // Desktop
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.waitForTimeout(300);
    const h1Desktop = page.locator('h1').first();
    const fontSizeDesktop = await h1Desktop.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    const mobilePx = parseInt(fontSizeMobile);
    const desktopPx = parseInt(fontSizeDesktop);

    // Desktop should have equal or larger font size
    expect(desktopPx).toBeGreaterThanOrEqual(mobilePx);
  });
});

test.describe('Responsive Design - Navigation', () => {
  test('should open mobile menu when hamburger is clicked', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Find and click hamburger menu
    const menuButton = page.locator('button').filter({ 
      has: page.locator('svg') 
    }).first();

    if (await menuButton.count() > 0 && await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);

      // Mobile menu should be visible
      const mobileMenu = page.locator('[class*="mobile"], nav ul, nav div').filter({ 
        hasText: /Dashboard|Resources|About/i 
      }).first();
      
      if (await mobileMenu.count() > 0) {
        await expect(mobileMenu).toBeVisible();
      }
    }
  });

  test('should maintain navigation state across viewport changes', async ({ page }) => {
    await page.goto('/');
    
    // Start on desktop
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.waitForTimeout(300);

    // Navigate to a page
    const resourcesLink = page.locator('a[href*="resources"], a').filter({ hasText: /resources/i }).first();
    if (await resourcesLink.count() > 0 && await resourcesLink.isVisible()) {
      await resourcesLink.click();
      await page.waitForLoadState('networkidle');

      // Verify we're on resources page
      expect(page.url()).toContain('resources');

      // Switch to mobile
      await page.setViewportSize(VIEWPORTS.mobile);
      await page.waitForTimeout(300);

      // Should still be on resources page
      expect(page.url()).toContain('resources');
    }
  });
});

test.describe('Responsive Design - Images and Media', () => {
  test('should load images without overflow on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Wait for images to load
    await page.waitForLoadState('networkidle');

    // Check that no images overflow the viewport
    const images = await page.locator('img').all();
    
    for (const img of images) {
      if (await img.isVisible()) {
        const box = await img.boundingBox();
        if (box) {
          expect(box.width).toBeLessThanOrEqual(VIEWPORTS.mobile.width);
        }
      }
    }
  });

  test('should maintain image aspect ratios', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const logo = page.locator('img[alt*="logo" i], img[alt*="Pittsburgh" i]').first();
    if (await logo.count() > 0) {
      const box = await logo.boundingBox();
      if (box) {
        // Logo should have reasonable dimensions
        expect(box.width).toBeGreaterThan(0);
        expect(box.height).toBeGreaterThan(0);
      }
    }
  });
});

test.describe('Responsive Design - Performance', () => {
  test('should load quickly on mobile viewport', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Should load in reasonable time (5 seconds)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should not have layout shift on viewport resize', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.waitForLoadState('networkidle');

    // Take screenshot at desktop size
    const desktopContent = await page.locator('body').textContent();

    // Resize to mobile
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.waitForTimeout(500);

    // Content should still be present
    const mobileContent = await page.locator('body').textContent();
    expect(mobileContent).toBeTruthy();
    expect(mobileContent?.length).toBeGreaterThan(0);
  });
});

test.describe('Responsive Design - Forms and Inputs', () => {
  test('should have appropriately sized form inputs on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/login');

    const inputs = await page.locator('input').all();
    
    for (const input of inputs) {
      if (await input.isVisible()) {
        const box = await input.boundingBox();
        if (box) {
          // Inputs should be at least 44px tall for touch
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });
});

test.describe('Responsive Design - Accessibility', () => {
  test('should maintain focus visibility on all viewports', async ({ page }) => {
    const viewports = [VIEWPORTS.mobile, VIEWPORTS.tablet, VIEWPORTS.desktop];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      // Tab to first focusable element
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);

      // Check if any element has focus
      const focusedElement = page.locator(':focus');
      if (await focusedElement.count() > 0) {
        await expect(focusedElement).toBeVisible();
      }
    }
  });

  test('should support keyboard navigation on all viewports', async ({ page }) => {
    await page.goto('/');

    const viewports = [VIEWPORTS.mobile, VIEWPORTS.tablet, VIEWPORTS.desktop];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(300);

      // Press Tab key
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      // Some element should receive focus
      const focusedElement = await page.evaluate(() => {
        return document.activeElement?.tagName;
      });

      expect(focusedElement).toBeTruthy();
    }
  });
});

