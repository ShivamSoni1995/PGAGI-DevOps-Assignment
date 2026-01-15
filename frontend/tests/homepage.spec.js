import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/DevOps Assignment/);
});

test('backend status section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Backend')).toBeVisible();
});

