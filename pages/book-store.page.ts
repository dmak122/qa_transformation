import { Locator, Page } from '@playwright/test';
import { BasePage } from './basepage';
import { SearchComponent } from './components/search.component';
import { TableComponent } from './components/table.component';

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

  // looks like this is a bad habbit to hardcode the URL in the page object, it would be better to go as manual user goes
  // Opens book store page directly
  async navigate(): Promise<void> {
    await this.page.goto('https://demoqa.com/books');
  }

  // Adds currently opened book to collection and handles native browser alertf
  async addCurrentBookToCollection(): Promise<void> {
    // Set up dialog handler before triggering action
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.addToCollectionButton.click();
  }
}