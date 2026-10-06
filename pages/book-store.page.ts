import { Page } from '@playwright/test';
import { BasePage } from './basepage';
import { BookStoreLocators } from './book-store/book-store.locators';
import { BookStoreActions } from './book-store/book-store.actions';
import { BookStoreVerifications } from './book-store/book-store.verifications';

/**
 * Main Page Object façade aggregating locators, actions, and verifications for the Book Store page.
 */
export class BookStorePage extends BasePage {
  readonly locators: BookStoreLocators;
  readonly actions: BookStoreActions;
  readonly verifications: BookStoreVerifications;

  constructor(page: Page) {
    super(page);
    this.locators = new BookStoreLocators(page);
    this.actions = new BookStoreActions(this.locators);
    this.verifications = new BookStoreVerifications(this.locators);
  }
}