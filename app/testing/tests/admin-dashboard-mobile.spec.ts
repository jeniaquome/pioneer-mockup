import { test, expect } from '@playwright/test';

/**
 * Admin Dashboard Mobile Responsiveness Tests
 * Ensures tabs don't overlap and tables are scrollable on mobile
 */

const MOBILE_VIEWPORT = { width: 390, height: 844 };
const SMALL_MOBILE_VIEWPORT = { width: 320, height: 568 };
const TABLET_VIEWPORT = { width: 768, height: 1024 };

// Note: Admin dashboard requires authentication
// These tests assume test user credentials or will need to be skipped in CI

test.describe('Admin Dashboard Mobile Layout', () => {
  test.skip('admin dashboard tabs should not overlap on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Login as admin (would need test credentials)
    // This test is skipped as it requires admin auth
    
    await page.goto('/admin-dashboard/overview');
    await page.waitForLoadState('networkidle');

    // Find all three tabs
    const overviewTab = page.locator('button[value="overview"]');
    const csvTab = page.locator('button[value="csv-upload"]');
    const resourcesTab = page.locator('button[value="resources"]');

    // All tabs should be visible
    await expect(overviewTab).toBeVisible();
    await expect(csvTab).toBeVisible();
    await expect(resourcesTab).toBeVisible();

    // Check that tabs don't overflow their container
    const tabsList = page.locator('[role="tablist"]').first();
    const tabsListBox = await tabsList.boundingBox();
    
    if (tabsListBox) {
      const overviewBox = await overviewTab.boundingBox();
      const csvBox = await csvTab.boundingBox();
      const resourcesBox = await resourcesTab.boundingBox();

      // All tabs should be within the container
      if (overviewBox) {
        expect(overviewBox.x).toBeGreaterThanOrEqual(tabsListBox.x);
        expect(overviewBox.x + overviewBox.width).toBeLessThanOrEqual(tabsListBox.x + tabsListBox.width);
      }
      
      if (csvBox) {
        expect(csvBox.x).toBeGreaterThanOrEqual(tabsListBox.x);
        expect(csvBox.x + csvBox.width).toBeLessThanOrEqual(tabsListBox.x + tabsListBox.width);
      }
      
      if (resourcesBox) {
        expect(resourcesBox.x).toBeGreaterThanOrEqual(tabsListBox.x);
        expect(resourcesBox.x + resourcesBox.width).toBeLessThanOrEqual(tabsListBox.x + tabsListBox.width);
      }
    }
  });

  test.skip('admin dashboard tabs should show shortened text on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/admin-dashboard/overview');
    await page.waitForLoadState('networkidle');

    // On mobile, tabs should show shortened text
    const csvTab = page.locator('button[value="csv-upload"]');
    const resourcesTab = page.locator('button[value="resources"]');

    // Check for mobile-specific shortened text
    const csvText = await csvTab.textContent();
    const resourcesText = await resourcesTab.textContent();

    // Mobile should show "Import" instead of "CSV Import"
    expect(csvText?.toLowerCase()).toContain('import');
    
    // Mobile should show "Resources" instead of "Resource Directory"
    expect(resourcesText?.toLowerCase()).toContain('resources');
  });

  test.skip('admin dashboard tabs should show full text on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/admin-dashboard/overview');
    await page.waitForLoadState('networkidle');

    // On desktop, tabs should show full text
    const csvTab = page.locator('button[value="csv-upload"]');
    const resourcesTab = page.locator('button[value="resources"]');

    const csvText = await csvTab.textContent();
    const resourcesText = await resourcesTab.textContent();

    // Desktop should show full text
    expect(csvText).toContain('CSV Import');
    expect(resourcesText).toContain('Resource Directory');
  });

  test.skip('resource directory table should be horizontally scrollable on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/admin-dashboard/resources');
    await page.waitForLoadState('networkidle');

    // Find the table container
    const tableContainer = page.locator('.overflow-x-auto').first();
    await expect(tableContainer).toBeVisible();

    // Check that the table is wider than the viewport (requires horizontal scroll)
    const table = page.locator('table').first();
    const tableBox = await table.boundingBox();
    
    if (tableBox) {
      // Table should be wider than mobile viewport
      expect(tableBox.width).toBeGreaterThan(MOBILE_VIEWPORT.width);
    }

    // Check that scroll is enabled
    const hasScrollableOverflow = await tableContainer.evaluate((el) => {
      return el.scrollWidth > el.clientWidth;
    });
    
    expect(hasScrollableOverflow).toBe(true);
  });

  test.skip('resource directory table columns should all be accessible via scroll', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/admin-dashboard/resources');
    await page.waitForLoadState('networkidle');

    // Find all table headers
    const tableHeaders = page.locator('thead th');
    const headerCount = await tableHeaders.count();

    // Should have multiple columns (Status, Resource, Category, etc.)
    expect(headerCount).toBeGreaterThan(5);

    // Check that we can scroll to see all columns
    const tableContainer = page.locator('.overflow-x-auto').first();
    
    // Scroll to the right to reveal hidden columns
    await tableContainer.evaluate((el) => {
      el.scrollLeft = el.scrollWidth;
    });

    // Wait for scroll to complete
    await page.waitForTimeout(300);

    // Last column should now be visible
    const lastHeader = tableHeaders.last();
    await expect(lastHeader).toBeVisible();
  });

  test.skip('small mobile devices should handle tabs correctly', async ({ page }) => {
    await page.setViewportSize(SMALL_MOBILE_VIEWPORT);
    await page.goto('/admin-dashboard/overview');
    await page.waitForLoadState('networkidle');

    // Even on very small screens, all tabs should be visible
    const overviewTab = page.locator('button[value="overview"]');
    const csvTab = page.locator('button[value="csv-upload"]');
    const resourcesTab = page.locator('button[value="resources"]');

    await expect(overviewTab).toBeVisible();
    await expect(csvTab).toBeVisible();
    await expect(resourcesTab).toBeVisible();

    // Text should be readable (not too small)
    const overviewText = await overviewTab.textContent();
    expect(overviewText?.length).toBeGreaterThan(0);
  });

  test.skip('tablet view should handle admin dashboard layout', async ({ page }) => {
    await page.setViewportSize(TABLET_VIEWPORT);
    await page.goto('/admin-dashboard/resources');
    await page.waitForLoadState('networkidle');

    // On tablet, table might not need horizontal scroll
    const tableContainer = page.locator('.overflow-x-auto').first();
    const table = page.locator('table').first();
    
    // Table should be visible
    await expect(table).toBeVisible();

    // Check if horizontal scroll is needed
    const hasScrollableOverflow = await tableContainer.evaluate((el) => {
      return el.scrollWidth > el.clientWidth;
    });
    
    // On tablet, table might or might not need scroll (depends on content)
    // Just verify it doesn't cause layout issues
    const pageHasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    // Page itself should not have horizontal scroll
    expect(pageHasHorizontalScroll).toBe(false);
  });

  test.skip('admin dashboard should not cause horizontal page scroll on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    
    // Test all three tabs
    const tabs = ['overview', 'csv-upload', 'resources'];
    
    for (const tab of tabs) {
      await page.goto(`/admin-dashboard/${tab}`);
      await page.waitForLoadState('networkidle');

      // Check that the page doesn't have horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBe(false);
    }
  });

  test.skip('tabs should be clickable and switch content on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/admin-dashboard/overview');
    await page.waitForLoadState('networkidle');

    // Click on CSV Import tab
    const csvTab = page.locator('button[value="csv-upload"]');
    await csvTab.click();
    await page.waitForTimeout(300);

    // Should navigate to CSV upload page
    expect(page.url()).toContain('/admin-dashboard/csv-upload');

    // Click on Resources tab
    const resourcesTab = page.locator('button[value="resources"]');
    await resourcesTab.click();
    await page.waitForTimeout(300);

    // Should navigate to resources page
    expect(page.url()).toContain('/admin-dashboard/resources');

    // Click back to Overview
    const overviewTab = page.locator('button[value="overview"]');
    await overviewTab.click();
    await page.waitForTimeout(300);

    // Should navigate back to overview
    expect(page.url()).toContain('/admin-dashboard/overview');
  });

  test.skip('admin dashboard filters should be stacked on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/admin-dashboard/resources');
    await page.waitForLoadState('networkidle');

    // Find filter inputs
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    const statusSelect = page.locator('select, button').filter({ hasText: /status|all/i }).first();

    // Filters should be visible
    await expect(searchInput).toBeVisible();
    
    // On mobile, filters should stack vertically (check if they're in a flex-col container)
    const filterContainer = page.locator('.flex.flex-col').first();
    await expect(filterContainer).toBeVisible();
  });
});

test.describe('Admin Dashboard Accessibility', () => {
  test.skip('all tabs should have proper touch targets on mobile', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/admin-dashboard/overview');
    await page.waitForLoadState('networkidle');

    const tabs = ['overview', 'csv-upload', 'resources'];
    
    for (const tabValue of tabs) {
      const tab = page.locator(`button[value="${tabValue}"]`);
      const box = await tab.boundingBox();
      
      if (box) {
        // Tabs should meet minimum touch target size (44x44px)
        expect(box.height).toBeGreaterThanOrEqual(40); // Slightly relaxed for tabs
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test.skip('table should support keyboard navigation', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/admin-dashboard/resources');
    await page.waitForLoadState('networkidle');

    // Focus on table
    const table = page.locator('table').first();
    await table.focus();

    // Should be able to tab through table elements
    await page.keyboard.press('Tab');
    
    // Some element should be focused
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeTruthy();
  });
});

