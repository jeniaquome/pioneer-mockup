import { test, expect } from '@playwright/test';

/**
 * Critical Fix: Hamburger Menu Visibility
 * Tests to ensure hamburger menu is always visible on mobile
 */

const MOBILE_VIEWPORTS = [
  { name: 'iPhone 12 Pro', width: 390, height: 844 },
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'Galaxy Note II', width: 360, height: 640 },
  { name: 'Small Mobile', width: 320, height: 568 },
  { name: 'Large Mobile', width: 428, height: 926 },
];

test.describe('Hamburger Menu Visibility Fix', () => {
  test('hamburger menu should be visible on all mobile viewports', async ({ page }) => {
    for (const viewport of MOBILE_VIEWPORTS) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Find the hamburger menu button
      const hamburgerButton = page.locator('button[aria-label*="menu" i]').last();
      
      // Hamburger should exist and be visible
      await expect(hamburgerButton).toBeVisible();
      
      // Should have proper touch target
      const box = await hamburgerButton.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('hamburger menu should not be hidden by other elements', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburgerButton = page.locator('button[aria-label*="menu" i]').last();
    
    // Should be visible and clickable
    await expect(hamburgerButton).toBeVisible();
    await expect(hamburgerButton).toBeEnabled();
    
    // Should be clickable (not obscured)
    await hamburgerButton.click();
    await page.waitForTimeout(300);
    
    // Menu should open
    const mobileMenu = page.locator('nav + div, .lg\\:hidden').filter({ hasText: /Home|Resources|About/i });
    await expect(mobileMenu.first()).toBeVisible();
  });

  test('mobile navigation should not overflow horizontally', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that page doesn't cause horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });

  test('hamburger menu should have flex-shrink-0 to prevent squishing', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburgerButton = page.locator('button[aria-label*="menu" i]').last();
    
    // Check that button has flex-shrink-0 class
    const classes = await hamburgerButton.getAttribute('class');
    expect(classes).toContain('flex-shrink-0');
  });

  test('mobile menu should contain all necessary elements for non-authenticated users', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Open mobile menu
    const hamburgerButton = page.locator('button[aria-label*="menu" i]').last();
    await hamburgerButton.click();
    await page.waitForTimeout(300);

    // Should have Get Started button
    const getStartedButton = page.locator('button, a').filter({ hasText: /Get Started/i });
    expect(await getStartedButton.count()).toBeGreaterThan(0);

    // Should have navigation links
    const navLinks = page.locator('a').filter({ hasText: /Home|Resources|About/i });
    expect(await navLinks.count()).toBeGreaterThanOrEqual(3);

    // Should have Sign In and Sign Up buttons
    const signInButton = page.locator('button, a').filter({ hasText: /Sign In/i });
    const signUpButton = page.locator('button, a').filter({ hasText: /Sign Up/i });
    
    expect(await signInButton.count()).toBeGreaterThan(0);
    expect(await signUpButton.count()).toBeGreaterThan(0);
  });

  test('only essential elements should be in mobile nav bar', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Mobile nav should only have: Logo, Language Selector, Hamburger (and user avatar if authenticated)
    // Count visible buttons in the nav bar (not including mobile menu)
    const navBar = page.locator('nav').first();
    const visibleButtons = navBar.locator('button:visible, a:visible').filter({ hasNot: page.locator('[class*="lg:flex"]') });
    
    // Should have a reasonable number of elements (not overcrowded)
    const count = await visibleButtons.count();
    expect(count).toBeLessThanOrEqual(5); // Logo, Language, Hamburger, maybe user avatar
  });

  test('all navigation icons should be visible on very small screens', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Logo should be visible
    const logo = page.locator('img[alt*="Pittsburgh Tomorrow Pioneer"]').first();
    await expect(logo).toBeVisible();

    // Hamburger menu should be visible
    const hamburgerButton = page.locator('button[aria-label*="menu" i]').last();
    await expect(hamburgerButton).toBeVisible();

    // Check that the navigation bar fits within viewport (no horizontal overflow)
    const navBarOverflows = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(navBarOverflows).toBe(false);
  });

  test('tablet navigation should display all elements properly with hamburger menu', async ({ page }) => {
    // Test multiple tablet viewports - should use mobile nav (hamburger menu)
    const tabletViewports = [
      { name: 'iPad Pro Portrait', width: 1024, height: 1366 },
      { name: 'iPad Portrait', width: 768, height: 1024 },
      { name: 'Tablet Landscape', width: 1000, height: 600 },
    ];

    for (const viewport of tabletViewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Logo should be visible and properly sized
      const logo = page.locator('img[alt*="Pittsburgh Tomorrow Pioneer"]').first();
      await expect(logo).toBeVisible();
      
      const logoBox = await logo.boundingBox();
      if (logoBox) {
        // Logo should be at least 50px tall and 100px wide
        expect(logoBox.height).toBeGreaterThanOrEqual(50);
        expect(logoBox.width).toBeGreaterThanOrEqual(100);
      }

      // Hamburger menu should be visible on tablets (< xl: breakpoint of 1280px)
      const hamburgerButton = page.locator('button[aria-label*="menu" i]').last();
      await expect(hamburgerButton).toBeVisible();

      // Desktop nav should NOT be visible on tablets
      const desktopNav = page.locator('nav ul').first();
      await expect(desktopNav).not.toBeVisible();

      // Check no horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBe(false);
    }
  });

  test('desktop navigation should show on XL screens (1280px+)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Desktop nav should be visible
    const desktopNav = page.locator('nav ul').first();
    await expect(desktopNav).toBeVisible();

    // Hamburger menu should NOT be visible on XL screens
    const mobileMenuContainer = page.locator('div.xl\\:hidden').first();
    await expect(mobileMenuContainer).not.toBeVisible();

    // Logo should be properly sized
    const logo = page.locator('img[alt*="Pittsburgh Tomorrow Pioneer"]').first();
    await expect(logo).toBeVisible();
    
    const logoBox = await logo.boundingBox();
    if (logoBox) {
      expect(logoBox.height).toBeGreaterThanOrEqual(70); // Should be larger on desktop (h-20 = 80px)
    }
  });

  test('hamburger menu should open and show navigation items on tablets', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 1366 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click hamburger menu
    const hamburgerButton = page.locator('button[aria-label*="menu" i]').last();
    await expect(hamburgerButton).toBeVisible();
    await hamburgerButton.click();
    await page.waitForTimeout(300); // Wait for menu to open

    // Menu should be visible (the dropdown panel below the nav bar)
    const mobileMenu = page.locator('header + div.xl\\:hidden, nav + div.xl\\:hidden').first();
    await expect(mobileMenu).toBeVisible();

    // Navigation items should be visible in the mobile menu
    // Look for links within the mobile menu specifically (they have "block w-full" classes)
    const homeLink = mobileMenu.locator('a[href="/"]').filter({ hasText: /Home/i });
    const resourcesLink = mobileMenu.locator('a[href="/resources"]');
    const aboutLink = mobileMenu.locator('a[href="/about"]');

    await expect(homeLink).toBeVisible();
    await expect(resourcesLink).toBeVisible();
    await expect(aboutLink).toBeVisible();

    // Verify navigation items have proper touch targets
    const homeLinkBox = await homeLink.boundingBox();
    if (homeLinkBox) {
      expect(homeLinkBox.height).toBeGreaterThanOrEqual(44);
    }
  });
});

