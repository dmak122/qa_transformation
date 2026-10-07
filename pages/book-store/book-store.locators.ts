import { Locator, Page } from '@playwright/test';
import { SearchComponent } from '../components/search.component';
import { TableComponent } from '../components/table.component';

/**
 * Stores and initializes all locators and components for the Book Store page.
 */
export class BookStoreLocators {
  readonly page: Page;
  readonly search: SearchComponent;
  readonly table: TableComponent;
  readonly addToCollectionButton: Locator;
  readonly backToStoreButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.search = new SearchComponent(page);
    this.table = new TableComponent(page);
    this.addToCollectionButton = page.getByRole('button', { name: 'Add To Your Collection' });
    this.backToStoreButton = page.getByRole('button', { name: 'Back To Book Store' });
  }
}