// frontend/playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    headless: true,
  },
});
