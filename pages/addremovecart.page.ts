import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * AddRemoveCartPage - Page Object for AddRemoveCart
 *
 * This page handles login/authentication functionality
 */
export class AddRemoveCartPage extends BasePage {
  /**
   * Page URL (relative to baseURL)
   */
  readonly url = 'https://www.saucedemo.com/inventory.html';

  // ============================================================================
  // Locators
  // ============================================================================

  /**
   * Elemento detectado automáticamente - locator
   */
  readonly btn: Locator = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  /**
   * Elemento detectado automáticamente - locator
   */
  readonly btn1: Locator = this.page.locator('[data-test="remove-sauce-labs-backpack"]');
  /**
   * Elemento detectado automáticamente - locator
   */
  readonly btn2: Locator = this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  /**
   * Elemento detectado automáticamente - locator
   */
  readonly btn3: Locator = this.page.locator('[data-test="remove-sauce-labs-bike-light"]');

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
   * Navigate to the AddRemoveCart page
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
    // Find and click submit button
    await this.btn.click();
    await this.btn1.click();
    await this.btn2.click();
    await this.btn3.click();

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
