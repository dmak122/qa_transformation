import { Locator, Page } from '@playwright/test';

export class TableComponent {
  readonly page: Page;
  readonly table: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;

    // Target the main wrapper containing the books table
    // explaine this locator
    this.table = page.locator('.books-wrapper table, .profile-wrapper table').first();

    // Chain locator: search tr STRICTLY inside this.table
    // why do we need to use this.rows in the constructor? we can use it in the methods directly
    this.rows = this.table.locator('tbody tr');
  }

  // Returns locator for the table row containing the target book title
  getRowByTitle(title: string): Locator {
    return this.rows.filter({ hasText: title });
  }

  // Clicks on the title link specifically inside the filtered row
  async clickBookTitle(title: string): Promise<void> {
    const row = this.getRowByTitle(title);
    await row.getByRole('link', { name: title }).click();
  }

// Clicks delete icon inside the specific row (for Profile page)
  async deleteBookByTitle(title: string): Promise<void> {
    const row = this.getRowByTitle(title);
    
    // Using the 'title' attribute since it is generic for all delete buttons
    await row.locator('[title="Delete"]').click();
  }
}