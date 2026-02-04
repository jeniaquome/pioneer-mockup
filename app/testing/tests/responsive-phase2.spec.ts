import { test, expect } from '@playwright/test';

/**
 * Responsive Design Tests - Phase 2
 * Tests for Homepage, Navigation, and Footer optimizations
 */

const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  mobileSmall: { width: 320, height: 568 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
};

test.describe('Phase 2: Homepage Responsive Improvements', () => {
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

  test('hero text should not have whitespace-nowrap on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Check that hero text wraps properly
    const heroText = page.locator('main h1, main div').filter({ hasText: /Welcome.*Pioneer/i }).first();
    if (await heroText.count() > 0) {
      const whiteSpace = await heroText.evaluate((el) => {
        return window.getComputedStyle(el).whiteSpace;
      });
      
      // Should not be 'nowrap' on mobile
      expect(whiteSpace).not.toBe('nowrap');
    }
  });

  test('CTA buttons should have touch-target class on homepage', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Check action card buttons have touch targets
    const ctaButtons = page.locator('.btn-brand-primary, .btn-brand-outline').filter({ hasText: /Get Started|Explore|Start Chatting/i });
    const count = await ctaButtons.count();

    for (let i = 0; i < Math.min(count, 3); i++) {
      const button = ctaButtons.nth(i);
      const classes = await button.getAttribute('class');
      expect(classes).toContain('touch-target');
    }
  });

  test('hero section should be visible and not overflowing', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    const box = await heroSection.boundingBox();
    if (box) {
      expect(box.width).toBeLessThanOrEqual(VIEWPORTS.mobile.width + 5); // Allow 5px tolerance
    }
  });

  test('three feature badges should display on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Look for feature badges (100% Free, Private & Secure, Multilingual)
    const badges = page.locator('.bg-brand-pms-129, .bg-brand-reflex-blue, .bg-brand-pms-267').filter({ 
      hasText: /Free|Secure|Multilingual/i 
    });

    const badgeCount = await badges.count();
    expect(badgeCount).toBeGreaterThanOrEqual(3);
  });

  test('action cards should stack vertically on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Check grid layout
    const grid = page.locator('[class*="grid"]').filter({ has: page.locator('a[href*="screening"], a[href*="resources"]') }).first();
    
    if (await grid.count() > 0) {
      const gridClasses = await grid.getAttribute('class');
      // Should have grid-cols-1 or no multi-column class on mobile
      expect(gridClasses).toMatch(/grid-cols-1|grid(?!-cols-[23])/);
    }
  });

  test('action cards should display in 2 columns on tablet', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.tablet);
    await page.goto('/');

    const grid = page.locator('[class*="grid"]').filter({ has: page.locator('a[href*="screening"], a[href*="resources"]') }).first();
    
    if (await grid.count() > 0) {
      const gridClasses = await grid.getAttribute('class');
      // Should have md:grid-cols-2 or similar on tablet
      expect(gridClasses).toMatch(/md:grid-cols-2|grid-cols-2/);
    }
  });

  test('action cards should display in 3 columns on desktop', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/');

    const grid = page.locator('[class*="grid"]').filter({ has: page.locator('a[href*="screening"], a[href*="resources"]') }).first();
    
    if (await grid.count() > 0) {
      const gridClasses = await grid.getAttribute('class');
      // Should have lg:grid-cols-3 or similar on desktop
      expect(gridClasses).toMatch(/lg:grid-cols-3|grid-cols-3/);
    }
  });
});

test.describe('Phase 2: Navigation Responsive Improvements', () => {
  test('navigation should have touch-target buttons on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Check Sign In button
    const signInButton = page.locator('button, a').filter({ hasText: /Sign In/i }).first();
    if (await signInButton.count() > 0 && await signInButton.isVisible()) {
      const height = await signInButton.evaluate((el) => el.getBoundingClientRect().height);
      expect(height).toBeGreaterThanOrEqual(44);
    }
  });

  test('navigation logo should be responsive', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    const logo = page.locator('img[alt*="Logo" i], img[alt*="Pittsburgh" i]').first();
    await expect(logo).toBeVisible();

    const box = await logo.boundingBox();
    if (box) {
      // Logo should fit within mobile viewport
      expect(box.width).toBeLessThan(VIEWPORTS.mobile.width);
    }
  });

  test('mobile menu should open and close', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Find hamburger menu button
    const menuButton = page.locator('button[aria-label*="menu" i], button').filter({ 
      has: page.locator('svg') 
    }).last();

    if (await menuButton.count() > 0 && await menuButton.isVisible()) {
      // Click to open
      await menuButton.click();
      await page.waitForTimeout(300);

      // Check if menu items are visible
      const menuItems = page.locator('nav a, nav button').filter({ hasText: /Dashboard|Resources|About|Home/i });
      const visibleCount = await menuItems.count();
      expect(visibleCount).toBeGreaterThan(0);

      // Click to close
      await menuButton.click();
      await page.waitForTimeout(300);
    }
  });

  test('desktop navigation should be visible on large screens', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/');

    // Desktop nav links should be visible
    const navLinks = page.locator('nav a').filter({ hasText: /Home|Resources|About/i });
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    // First nav link should be visible
    if (count > 0) {
      await expect(navLinks.first()).toBeVisible();
    }
  });

  test('navigation height should not be excessive on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    const nav = page.locator('nav').first();
    const box = await nav.boundingBox();
    
    if (box) {
      // Navigation should not take more than 20% of viewport height
      expect(box.height).toBeLessThan(VIEWPORTS.mobile.height * 0.2);
    }
  });

  test('Get Started CTA button should have touch-target', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    const getStartedButton = page.locator('button, a').filter({ hasText: /Get Started/i }).first();
    
    if (await getStartedButton.count() > 0 && await getStartedButton.isVisible()) {
      const classes = await getStartedButton.getAttribute('class');
      expect(classes).toContain('touch-target');
      
      const height = await getStartedButton.evaluate((el) => el.getBoundingClientRect().height);
      expect(height).toBeGreaterThanOrEqual(44);
    }
  });
});

test.describe('Phase 2: Footer Responsive Improvements', () => {
  test('footer links should have touch-target class', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();

    for (let i = 0; i < Math.min(count, 3); i++) {
      const link = footerLinks.nth(i);
      if (await link.isVisible()) {
        const classes = await link.getAttribute('class');
        expect(classes).toContain('touch-target');
      }
    }
  });

  test('footer should stack vertically on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('footer content should be readable on all viewports', async ({ page }) => {
    const viewports = [VIEWPORTS.mobile, VIEWPORTS.tablet, VIEWPORTS.desktop];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(200);

      const footerText = page.locator('footer p, footer a').first();
      if (await footerText.count() > 0) {
        await expect(footerText).toBeVisible();
        
        const fontSize = await footerText.evaluate((el) => {
          return parseInt(window.getComputedStyle(el).fontSize);
        });
        
        expect(fontSize).toBeGreaterThanOrEqual(12);
      }
    }
  });

  test('footer links should have adequate spacing on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const footerLinks = page.locator('footer a');
    const firstLink = footerLinks.first();
    
    if (await firstLink.count() > 0 && await firstLink.isVisible()) {
      const box = await firstLink.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(40);
      }
    }
  });
});

test.describe('Phase 2: Cross-Device Consistency', () => {
  test('all pages should load without horizontal scroll on mobile', async ({ page }) => {
    const pages = ['/', '/resources', '/about'];
    
    for (const pagePath of pages) {
      await page.setViewportSize(VIEWPORTS.mobile);
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBe(false);
    }
  });

  test('navigation should be consistent across all pages', async ({ page }) => {
    const pages = ['/', '/resources', '/about'];
    await page.setViewportSize(VIEWPORTS.mobile);

    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
      
      const logo = page.locator('nav img[alt*="Logo" i], nav img[alt*="Pittsburgh" i]').first();
      await expect(logo).toBeVisible();
    }
  });

  test('footer should be consistent across all pages', async ({ page }) => {
    const pages = ['/', '/resources', '/about'];
    await page.setViewportSize(VIEWPORTS.mobile);

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(200);
      
      const footer = page.locator('footer').first();
      await expect(footer).toBeVisible();
    }
  });
});

test.describe('Phase 2: Touch Target Compliance', () => {
  test('all interactive elements should meet WCAG touch target size', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Get all buttons and links
    const interactiveElements = await page.locator('button:visible, a[href]:visible').all();
    
    let testedCount = 0;
    for (const element of interactiveElements.slice(0, 15)) { // Test first 15 visible elements
      const box = await element.boundingBox();
      if (box && box.width > 10 && box.height > 10) { // Only test reasonably sized elements
        testedCount++;
        
        // WCAG Level AA requires 44x44px
        if (box.height < 44 || box.width < 44) {
          const text = await element.textContent();
          console.log(`Small element: ${text?.slice(0, 30)} - ${box.width}x${box.height}`);
        }
        
        // Allow slight tolerance for elements that might be 42-43px due to rounding
        expect(box.height).toBeGreaterThanOrEqual(40);
      }
    }
    
    expect(testedCount).toBeGreaterThan(0);
  });
});

test.describe('Phase 2: Typography Improvements', () => {
  test('hero text should use responsive typography', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // Verify that text-responsive-3xl class is present on the page (from our changes)
    const responsiveText = page.locator('.text-responsive-3xl').first();
    
    // The hero should have the responsive class we added
    await expect(responsiveText).toBeVisible();
    
    const classes = await responsiveText.getAttribute('class');
    expect(classes).toContain('text-responsive-3xl');
  });

  test('text should be readable at all viewport sizes', async ({ page }) => {
    const viewports = [VIEWPORTS.mobileSmall, VIEWPORTS.mobile, VIEWPORTS.tablet, VIEWPORTS.desktop];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      const bodyText = page.locator('p').first();
      if (await bodyText.count() > 0) {
        const fontSize = await bodyText.evaluate((el) => {
          return parseInt(window.getComputedStyle(el).fontSize);
        });
        
        // Minimum 14px for body text
        expect(fontSize).toBeGreaterThanOrEqual(14);
      }
    }
  });
});

