import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/DevOps Assignment/);
});

test('backend url is displayed', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.locator('text=Backend URL:')
  ).toBeVisible();
});


