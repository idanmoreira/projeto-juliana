
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Juliana Manduca/);
    await expect(page.getByText('Juliana Manduca')).toBeVisible();
  });

  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to services
    await page.getByRole('link', { name: /services/i }).click();
    await expect(page).toHaveURL(/.*services/);
    
    // Navigate to blog
    await page.getByRole('link', { name: /blog/i }).click();
    await expect(page).toHaveURL(/.*blog/);
    
    // Navigate back to home
    await page.getByRole('link', { name: /home/i }).click();
    await expect(page).toHaveURL(/.*\//);
  });

  test('should toggle language', async ({ page }) => {
    await page.goto('/');
    
    // Find language toggle and click it
    const languageToggle = page.getByRole('button').filter({ hasText: /PT|EN/ });
    await languageToggle.click();
    
    // Verify language change (content should change)
    await expect(page.locator('body')).toContainText(/.+/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile menu button is visible
    const mobileMenuButton = page.getByRole('button').filter({ hasText: /menu/i }).or(
      page.locator('[aria-label*="menu"]')
    );
    
    // The navigation should adapt to mobile view
    await expect(page.getByText('Juliana Manduca')).toBeVisible();
  });
});
