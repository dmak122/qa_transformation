import { Locator, Page } from '@playwright/test';
import { BasePage } from './basepage';
import { SearchComponent } from './components/search.component';
import { TableComponent } from './components/table.component';

export class ProfilePage extends BasePage {
  // Reusable components
  readonly search: SearchComponent;
  readonly table: TableComponent;

  // Page specific locators
  readonly deleteAllBooksButton: Locator;
  readonly confirmDeleteModalButton: Locator;

  constructor(page: Page) {
    super(page);

    // Reusing components
    this.search = new SearchComponent(page);
    this.table = new TableComponent(page);

    // Profile specific elements
    this.deleteAllBooksButton = page.getByRole('button', { name: 'Delete All Books' });
    this.confirmDeleteModalButton = page.locator('#closeSmallModal-ok');
  }

  // Opens profile page directly
  async navigate(): Promise<void> {
    await this.page.goto('/profile');
  }

  // Deletes all books from user collection via confirmation modal
  async deleteAllBooks(): Promise<void> {
    // Open confirmation modal
    await this.deleteAllBooksButton.scrollIntoViewIfNeeded();
    await this.deleteAllBooksButton.click({ force: true });

    // Confirm deletion inside modal (Playwright will auto-dismiss the native alert)
    await this.confirmDeleteModalButton.waitFor({ state: 'visible' });
    await this.confirmDeleteModalButton.click({ force: true });
  }
}