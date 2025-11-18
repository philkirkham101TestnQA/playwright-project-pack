import { test, expect } from '@playwright/test';


test('search on Google', async ({ page }) => {
  // Go to Google
  await page.goto('https://www.google.com');
  
  // Find search box and type
  await page.getByRole('combobox', { name: 'Search' }).fill('Playwright');
  
  // Press Enter to search
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  
  // Wait for results
  await page.waitForURL(/.*search/);

  await page.screenshot({ path: 'screenshot.png' });

  
  // Verify results loaded
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
