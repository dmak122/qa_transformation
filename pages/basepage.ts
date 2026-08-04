import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string) {
    await this.page.goto(`https://demoqa.com${path}`);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async verifyUrlContains(substring: string) {
    await expect(this.page).toHaveURL(new RegExp(substring));
  }
}