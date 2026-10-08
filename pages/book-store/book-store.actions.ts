import { BookStoreLocators } from './book-store.locators';

/**
 * Contains interaction actions for the Book Store page.
 */
export class BookStoreActions {
  private locators: BookStoreLocators;

  constructor(locators: BookStoreLocators) {
    this.locators = locators;
  }

  /**
   * Navigates directly to the Book Store page URL.
   */
  async navigate(): Promise<void> {
    await this.locators.page.goto('/books');
  }

  /**
   * Adds the currently opened book to the user's collection and automatically accepts the native browser alert dialog.
   */
  async addCurrentBookToCollection(): Promise<void> {
    this.locators.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.locators.addToCollectionButton.click();
  }

  /**
   * Clicks the button to return back to the Book Store page.
   */
  async clickBackToStore(): Promise<void> {
    await this.locators.backToStoreButton.click();
  }
}