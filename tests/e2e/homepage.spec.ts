
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check hero elements
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('button', { name: /consultation|book/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /explore|services/i })).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to features section
    await page.locator('section').filter({ hasText: /why choose/i }).scrollIntoViewIfNeeded();
    
    // Check features are visible
    await expect(page.getByText(/certified/i)).toBeVisible();
    await expect(page.getByText(/approach/i)).toBeVisible();
  });

  test('should display social media section', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to social media section
    await page.locator('section').filter({ hasText: /connect/i }).scrollIntoViewIfNeeded();
    
    // Check social media links
    await expect(page.getByText(/Instagram/i)).toBeVisible();
    await expect(page.getByText(/YouTube/i)).toBeVisible();
  });

  test('should display newsletter section', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to newsletter section
    await page.locator('section').filter({ hasText: /newsletter|stay connected/i }).scrollIntoViewIfNeeded();
    
    // Check newsletter form
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /subscribe/i })).toBeVisible();
  });
});
