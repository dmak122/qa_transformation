import { Locator, Page } from '@playwright/test';
import { BasePage } from './basepage';
import { SearchComponent } from './components/search.component';
import { TableComponent } from './components/table.component';

/**
 * Page Object representing the Book Store page and book details view.
 */
export class BookStorePage extends BasePage {
  // Reusable components
  readonly search: SearchComponent;
  readonly table: TableComponent;

  // Page specific locators
  readonly addToCollectionButton: Locator;
  readonly backToStoreButton: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize components
    this.search = new SearchComponent(page);
    this.table = new TableComponent(page);

    // Initialize page-specific elements (book details view)
    this.addToCollectionButton = page.getByRole('button', { name: 'Add To Your Collection' });
    this.backToStoreButton = page.getByRole('button', { name: 'Back To Book Store' });
  }

<<<<<<< HEAD
  /**
   * Navigates directly to the Book Store page URL.
   * 
   * @returns {Promise<void>}
   */
=======
  // looks like this is a bad habbit to hardcode the URL in the page object, it would be better to go as manual user goes
  // Opens book store page directly
>>>>>>> a2ab41a6cdfdbeada4ab93b93f4b24b8acc48e16
  async navigate(): Promise<void> {
    await this.page.goto('/books');
  }

<<<<<<< HEAD
  /**
   * Adds the currently opened book to the user's collection and automatically accepts the native browser alert dialog.
   * 
   * @returns {Promise<void>}
   */
=======
  // Adds currently opened book to collection and handles native browser alertf
>>>>>>> a2ab41a6cdfdbeada4ab93b93f4b24b8acc48e16
  async addCurrentBookToCollection(): Promise<void> {
    // Set up dialog handler before triggering action
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.addToCollectionButton.click();
  }
}