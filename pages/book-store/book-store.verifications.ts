import { expect } from '@playwright/test';
import { BookStoreLocators } from './book-store.locators';

/**
 * Contains UI assertions and checks for the Book Store page.
 */
export class BookStoreVerifications {
  private locators: BookStoreLocators;

  constructor(locators: BookStoreLocators) {
    this.locators = locators;
  }

  /**
   * Verifies that the 'Back To Book Store' button is visible on the page.
   * 
   * @returns {Promise<void>}
   */
  async verifyBackToStoreButtonVisible(): Promise<void> {
    await expect(this.locators.backToStoreButton).toBeVisible();
  }
}