import { BasePage } from './basepage';
import { Locator, Page, expect } from '@playwright/test';

export class CheckBoxPage extends BasePage {
  readonly toggleSwitcher: Locator;
  readonly documentsCheckbox: Locator;
  readonly resultContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.toggleSwitcher = page.locator('.rc-tree-switcher');
    this.documentsCheckbox = page.getByRole('checkbox', { name: 'Select Documents' });
    this.resultContainer = page.locator('#result');
  }
  async open() {
    await this.navigateTo('/checkbox');
  }

  async expandFolder() {
    await this.toggleSwitcher.click();
  }

  async selectDocuments() {
    await this.documentsCheckbox.click();
  }

  async checkResultText(expectedText: string) {
    await expect(this.resultContainer).toContainText(expectedText);
  }
}