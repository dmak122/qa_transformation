import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate thru UI like a real user
  async navigateToSubMenu(categoryName: string, subMenuName: string) {
  
    await this.page.goto('https://demoqa.com/');

    /*
    *await this.page.locator('.card').filter({ hasText: categoryName }).click(); - why we need "const categoryCard"?
    */
    const categoryCard = this.page.locator('.card').filter({ hasText: categoryName });
    await categoryCard.click();

    const menuItem = this.page.locator('.left-pannel').getByText(subMenuName, { exact: true });
    await menuItem.click();
  }

  // Navigate by URL
  //incorrect navagation
  async navigateTo(path: string) {
    await this.page.goto(`https://demoqa.com${path}`);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async verifyUrlContains(substring: string) {
    await expect(this.page).toHaveURL(new RegExp(substring));
  }
}