import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: process.env.CI ? 1 : 0,

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },

  // í±‡ THIS IS THE KEY PART
  webServer: {
    command: 'npm run build && npm run start',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: false,
  },
});

