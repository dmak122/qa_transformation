import { Locator, Page } from '@playwright/test';
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

  // Opens login page directly
  async navigate(): Promise<void> {
    await this.page.goto('https://demoqa.com/login');
  }

  // Performs user authentication flow
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // Wait for response or redirect to confirm authentication finished
    await this.page.waitForURL('**/profile'); // DemoQA redirects to /profile on success
  }
}