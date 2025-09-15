import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default defineConfig({
  testDir: './src/specs',
  testMatch: '**/*.spec.ts',
  tsconfig: './tsconfig.json',
  // globalSetup: require.resolve('./global-setup'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30000,
  reporter: [
    ['list'],
    ['allure-playwright', { detail: false, outputFolder: 'allure-results', suiteTitle: false }],
  ],
  use: {
    baseURL: 'https://excel.cloud.microsoft/',
    headless: process.env.HEADLESS === 'true',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
