/**
 * Test200126 - Authentication Fixture
 *
 * This fixture provides authenticated browser contexts and pages.
 * Use this to skip login steps in tests that require authentication.
 *
 * @see {@link https://playwright.dev/docs/auth|Authentication Guide}
 * @see {@link https://playwright.dev/docs/test-fixtures|Test Fixtures}
 */

import { test as base, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '@pages';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Storage state file path for authenticated sessions
 */
const STORAGE_STATE_PATH = path.join(__dirname, '..', '.auth', 'user.json');

/**
 * Extended test fixtures with authentication
 */
type AuthFixtures = {
  /**
   * Authenticated page - automatically logged in
   */
  authenticatedPage: Page;

  /**
   * Authenticated context - reusable browser context with auth state
   */
  authenticatedContext: BrowserContext;

};

/**
 * Setup authentication storage state
 * This function runs once to create the auth state file
 *
 * @param page - Playwright page instance
 * @returns Promise that resolves when authentication is complete
 */
async function setupAuthState(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);

  // Navigate to login page
  await loginPage.navigate('//login');

  // Login with credentials from environment
  await loginPage.loginWithCredentials();

  // Wait for successful login
  const isSuccess = await loginPage.isLoginSuccessful();
  if (!isSuccess) {
    throw new Error('Authentication failed during fixture setup');
  }

  // Ensure .auth directory exists
  const authDir = path.dirname(STORAGE_STATE_PATH);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Save authentication state
  await page.context().storageState({ path: STORAGE_STATE_PATH });
}


/**
 * Extended test with authentication fixtures
 */
export const test = base.extend<AuthFixtures>({
  /**
   * Authenticated page fixture
   * Automatically provides a page with authentication state loaded
   */
  authenticatedPage: async ({ browser }, use) => {
    // Check if auth state file exists, if not create it
    if (!fs.existsSync(STORAGE_STATE_PATH)) {
      const setupContext = await browser.newContext();
      const setupPage = await setupContext.newPage();

      try {
        await setupAuthState(setupPage);
      } finally {
        await setupContext.close();
      }
    }

    // Create context with stored auth state
    const context = await browser.newContext({
      storageState: STORAGE_STATE_PATH,
    });

    const page = await context.newPage();

    // Use the authenticated page in the test
    await use(page);

    // Cleanup
    await context.close();
  },

  /**
   * Authenticated context fixture
   * Provides a reusable browser context with authentication
   */
  authenticatedContext: async ({ browser }, use) => {
    // Check if auth state file exists, if not create it
    if (!fs.existsSync(STORAGE_STATE_PATH)) {
      const setupContext = await browser.newContext();
      const setupPage = await setupContext.newPage();

      try {
        await setupAuthState(setupPage);
      } finally {
        await setupContext.close();
      }
    }

    // Create context with stored auth state
    const context = await browser.newContext({
      storageState: STORAGE_STATE_PATH,
    });

    // Use the authenticated context in the test
    await use(context);

    // Cleanup
    await context.close();
  },

});

/**
 * Re-export expect for convenience
 */
export { expect } from '@playwright/test';

/**
 * Helper function to clear all authentication states
 * Useful for test cleanup or resetting authentication
 */
export function clearAuthStates(): void {
  const authDir = path.join(__dirname, '..', '.auth');

  if (fs.existsSync(authDir)) {
    const files = fs.readdirSync(authDir);
    files.forEach(file => {
      const filePath = path.join(authDir, file);
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    });
  }
}

/**
 * Helper function to check if user is authenticated
 * Can be used in tests to verify auth state
 *
 * @param page - Playwright page instance
 * @returns Promise resolving to true if authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  try {
    // Check for common authentication indicators
    // Check if user is redirected to login page
    const currentUrl = page.url();
    return !currentUrl.includes('//login');
  } catch (error) {
    return false;
  }
}


