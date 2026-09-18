import { BasePage } from './basepage';
import { Locator, Page, expect } from '@playwright/test';

export class HomePage extends BasePage {
  readonly footerSpan: Locator;
  readonly elementsLink: Locator;
  readonly formsLink: Locator;
  readonly alertsLink: Locator;
  readonly widgetsLink: Locator;
  readonly interactionsLink: Locator;
  readonly booksLink: Locator;

  constructor(page: Page) {
    super(page);
    this.footerSpan = page.locator('span');
    this.elementsLink = page.getByRole('link', { name: 'Elements' });
    this.formsLink = page.getByRole('link', { name: 'Forms' });
    this.alertsLink = page.getByRole('link', { name: 'Alerts, Frame & Windows' });
    this.widgetsLink = page.getByRole('link', { name: 'Widgets' });
    this.interactionsLink = page.getByRole('link', { name: 'Interactions' });
    this.booksLink = page.getByRole('link', { name: 'Book Store Application' });
  }

  async open() {
    await this.navigateTo('/');
  }

  async checkCopyright() {
    await expect(this.footerSpan).toContainText('© 2013-2026 TOOLSQA.COM | ALL RIGHTS RESERVED.');
  }

  async checkCategoryLinks() {
    await expect(this.elementsLink).toHaveAttribute('href', '/elements');
    await expect(this.formsLink).toHaveAttribute('href', '/forms');
    await expect(this.alertsLink).toHaveAttribute('href', '/alertsWindows');
    await expect(this.widgetsLink).toHaveAttribute('href', '/widgets');
    await expect(this.interactionsLink).toHaveAttribute('href', '/interaction');
    await expect(this.booksLink).toHaveAttribute('href', '/books');
  }
}