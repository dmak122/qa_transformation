import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basepage';

/**
 * Page Object representing the Login Page functionality.
 */
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
  }

  /**
   * Navigates directly to the Login page URL.
   * @returns {Promise<void>}
   */
  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  /**
   * Performs the full user authentication flow and asserts successful login.
   * 
   * @param {string} username - User account username
   * @param {string} password - User account password
   * @returns {Promise<void>}
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    // Scroll button into view and force click to prevent ad overlay blockage
    await this.loginButton.scrollIntoViewIfNeeded();
    await this.loginButton.click({ force: true });

    // Assert authentication by verifying user profile element state in DOM
    await expect(this.page.locator('#userName-value')).toBeVisible();
  }
}