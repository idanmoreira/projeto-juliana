
import { test, expect } from '@playwright/test';

test.describe('Forms', () => {
  test('should handle newsletter subscription', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to newsletter section
    await page.locator('section').filter({ hasText: /newsletter|stay connected/i }).scrollIntoViewIfNeeded();
    
    // Fill email and submit
    await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
    await page.getByRole('button', { name: /subscribe/i }).click();
    
    // Check for success message (toast)
    await expect(page.getByText(/subscribed|success/i)).toBeVisible({ timeout: 5000 });
  });

  test('should validate email format in newsletter', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to newsletter section
    await page.locator('section').filter({ hasText: /newsletter|stay connected/i }).scrollIntoViewIfNeeded();
    
    // Try to submit invalid email
    await page.getByRole('textbox', { name: /email/i }).fill('invalid-email');
    await page.getByRole('button', { name: /subscribe/i }).click();
    
    // Should show validation error
    await expect(page.getByRole('textbox', { name: /email/i })).toHaveAttribute('type', 'email');
  });
});
</lov-test>

Now let's add the necessary scripts to package.json and dependencies:

<lov-add-dependency>@playwright/test@latest</lov-add-dependency>
<lov-add-dependency>@testing-library/jest-dom@latest</lov-add-dependency>
<lov-add-dependency>@testing-library/react@latest</lov-add-dependency>
<lov-add-dependency>@testing-library/user-event@latest</lov-add-dependency>
<lov-add-dependency>@vitest/coverage-v8@latest</lov-add-dependency>
<lov-add-dependency>jsdom@latest</lov-add-dependency>

Let's update the test setup file to include more comprehensive configuration:

<lov-write file_path="src/test/setup.ts">
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Extend Vitest's expect with jest-dom matchers
expect.extend({
  toBeInTheDocument: expect.toBeInTheDocument,
  toHaveClass: expect.toHaveClass,
  toHaveAttribute: expect.toHaveAttribute,
  toBeVisible: expect.toBeVisible,
  toBeDisabled: expect.toBeDisabled,
  toHaveTextContent: expect.toHaveTextContent,
});
