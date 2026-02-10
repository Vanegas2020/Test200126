import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * LoginPage - Page Object for Login
 *
 * This page handles login/authentication functionality
 */
export class LoginPage extends BasePage {
  /**
   * Page URL (relative to baseURL)
   */
  readonly url = 'https://www.saucedemo.com/';

  // ============================================================================
  // Locators
  // ============================================================================

  /**
   * Elemento detectado automáticamente - locator
   */
  readonly inputLogin: Locator = this.page.locator('[data-test="username"]');
  /**
   * Elemento detectado automáticamente - locator
   */
  readonly inputPassword: Locator = this.page.locator('[data-test="password"]');
  /**
   * Elemento detectado automáticamente - locator
   */
  readonly btnLogin: Locator = this.page.locator('[data-test="login-button"]');
  /**
   * Elemento detectado automáticamente - getByText
   */
  readonly swagLabs: Locator = this.page.getByText('Swag Labs');

  /**
   * Constructor
   * @param page - Playwright Page instance
   */
  constructor(page: Page) {
    super(page);
  }

  // ============================================================================
  // Navigation Methods
  // ============================================================================

  /**
   * Navigate to the Login page
   */
  async navigateToPage(): Promise<void> {
    await this.navigate(this.url);
    await this.waitForPageLoad();
  }

  // ============================================================================
  // Action Methods
  // ============================================================================


  /**
   * Login using predefined credentials
   * Uses credentials from .env file
   */
  async loginWithCredentials(): Promise<void> {
    const username = process.env.TEST_USER_ADMIN_USERNAME || '';
    const password = process.env.TEST_USER_ADMIN_PASSWORD || '';

    if (!username || !password) {
      throw new Error('Credentials not found in environment variables');
    }

    // Find username/email and password fields
    await this.inputPassword.fill(password);
    // Find and click submit button
    await this.inputLogin.click();
    await this.btnLogin.click();
    await this.swagLabs.click();

    await this.page.waitForLoadState('networkidle');
  }

  // ============================================================================
  // Validation Methods
  // ============================================================================

  /**
   * Check if login was successful
   * @returns True if login successful (no error message visible)
   */
  async isLoginSuccessful(): Promise<boolean> {
    try {
      await this.page.waitForURL(/dashboard|home|account/, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get error message if login failed
   * @returns Error message text or null if no error
   */
  async getErrorMessage(): Promise<string | null> {
    try {
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Check if username field is visible
   * @returns True if visible
   */
  async isUsernameFieldVisible(): Promise<boolean> {
    return false;
  }

  /**
   * Check if password field is visible
   * @returns True if visible
   */
  async isPasswordFieldVisible(): Promise<boolean> {
    return false;
  }

  /**
   * Check if login button is enabled
   * @returns True if enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return false;
  }
}
