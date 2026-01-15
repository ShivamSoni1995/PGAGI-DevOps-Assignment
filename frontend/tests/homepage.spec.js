import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/DevOps Assignment/);
});

test('backend status is visible on UI', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Backend')).toBeVisible();
});
