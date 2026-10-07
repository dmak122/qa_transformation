import { Locator, Page } from '@playwright/test';
import { BasePage } from './basepage';
import { SearchComponent } from './components/search.component';
import { TableComponent } from './components/table.component';

/**
 * Page Object representing the User Profile page functionality.
 */
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

  /**
   * Navigates directly to the User Profile page URL.
   * 
   * @returns {Promise<void>}
   */
  async navigate(): Promise<void> {
    await this.page.goto('/profile');
  }

  /**
   * Triggers bulk deletion of all books in the user's collection and confirms via modal dialog.
   * 
   * @returns {Promise<void>}
   */
  async deleteAllBooks(): Promise<void> {
    // Open confirmation modal
    await this.deleteAllBooksButton.scrollIntoViewIfNeeded();
    await this.deleteAllBooksButton.click({ force: true });

    // Confirm deletion inside modal (Playwright will auto-dismiss the native alert)
    await this.confirmDeleteModalButton.waitFor({ state: 'visible' });
    await this.confirmDeleteModalButton.click({ force: true });
  }
}