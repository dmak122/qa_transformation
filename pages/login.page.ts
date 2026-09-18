import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basepage';

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

  // looks like this is a bad habbit to hardcode the URL in the page object, it would be better to as manual user goes
  // Opens login page directly
  //in base page we have the same method, why do we need this one?
  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  // Performs user authentication flow
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