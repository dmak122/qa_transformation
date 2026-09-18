import { Page, expect, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate thru UI like a real user
  async navigateToSubMenu(categoryName: string, subMenuName: string) {
  
    await this.page.goto('https://demoqa.com/');

    const categoryCard = this.page.locator('.card').filter({ hasText: categoryName });
    await categoryCard.click();

    const menuItem = this.page.locator('.left-pannel').getByText(subMenuName, { exact: true });
    await menuItem.click();
  }

// Navigate by relative path using baseURL
  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  // Navigate via sidebar UI without reloads
  async clickSidebarMenu(menuName: string) {
    const menuItem = this.page.locator('.left-pannel').getByText(menuName, { exact: true });
    await menuItem.scrollIntoViewIfNeeded();
    await menuItem.click();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async verifyUrlContains(substring: string) {
    await expect(this.page).toHaveURL(new RegExp(substring));
  }

  async verifyElementVisibility(locator: Locator, isVisible: boolean): Promise<void> {
    if (isVisible) {
      await expect(locator).toBeVisible();
    } else {
      await expect(locator).toBeHidden();
    }
  }
}