import { Locator, Page } from '@playwright/test';

/**
 * Reusable component representing search box interactions across pages.
 */
export class SearchComponent {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // Find a searchbox
    this.searchInput = page.locator('#searchBox');
  }

  /**
   * Fills the search input field with the provided search query.
   * 
   * @param query - The search keyword or title to filter by
   */
  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  /**
   * Clears all text from the search input field.
   * 
   */
  async clear(): Promise<void> {
    await this.searchInput.clear();
  }
}