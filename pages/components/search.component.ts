import { Locator, Page } from '@playwright/test';

export class SearchComponent {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // Find a searchbox
    this.searchInput = page.locator('#searchBox');
  }

  // Fill up the field
  async search(query: string) {
    await this.searchInput.fill(query);
  }

  // Clean up the field
  async clear() {
    await this.searchInput.clear();
  }
}