import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables from .env file (if exists)
// Don't override existing environment variables (important for CI/CD)
dotenv.config({ override: false });

/**
 * Playwright Configuration
 *
 * Documentation: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: './tests',

  // Maximum time one test can run
  timeout: 30000,

  // Maximum time for expect() calls
  expect: {
    timeout: 5000
  },

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['junit', { outputFile: 'playwright-report/results.xml' }],
    ['list']
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'off',

    // Maximum time each action (click, fill, etc.) can take
    actionTimeout: 10000,

    // Navigation timeout
    navigationTimeout: 30000,
  },

  // Global setup for authentication
  // Note: Authentication is handled via fixtures (see fixtures/auth.fixture.ts)
  // globalSetup: './utils/auth.setup.ts',

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },




  ],

  // Output directory for test artifacts
  outputDir: 'test-results/',

});
