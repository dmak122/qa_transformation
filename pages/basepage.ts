import { Page, expect, Locator } from '@playwright/test';

/**
 * Base Page Object class providing common navigation, interaction, and assertion utilities across all pages.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates through the DemoQA home page category card to a specific sidebar sub-menu item.
   * 
   * @param {string} categoryName - Name of the main category card on the home page (e.g. 'Book Store Application')
   * @param {string} subMenuName - Name of the target sub-menu item in the left sidebar
   * @returns {Promise<void>}
   */
  async navigateToSubMenu(categoryName: string, subMenuName: string): Promise<void> {
    await this.page.goto('https://demoqa.com/');

    const categoryCard = this.page.locator('.card').filter({ hasText: categoryName });
    await categoryCard.click();

    const menuItem = this.page.locator('.left-pannel').getByText(subMenuName, { exact: true });
    await menuItem.click();
  }

  /**
   * Navigates to a relative path utilizing Playwright's configured `baseURL`.
   * 
   * @param {string} path - Relative URL path (e.g. '/login')
   * @returns {Promise<void>}
   */
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Clicks a menu item inside the left sidebar navigation panel without triggering a full page reload.
   * 
   * @param {string} menuName - Target sidebar item label
   * @returns {Promise<void>}
   */
  async clickSidebarMenu(menuName: string): Promise<void> {
    const menuItem = this.page.locator('.left-pannel').getByText(menuName, { exact: true });
    await menuItem.scrollIntoViewIfNeeded();
    await menuItem.click({ force: true });;
  }

  /**
   * Retrieves the current browser tab title.
   * 
   * @returns {Promise<string>} Current page title text
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Asserts that the current URL matches the expected substring using a regular expression.
   * 
   * @param {string} substring - Expected text inside the current URL
   * @returns {Promise<void>}
   */
  async verifyUrlContains(substring: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(substring));
  }

  /**
   * Asserts element visibility state (visible or hidden) based on a boolean flag.
   * 
   * @param {Locator} locator - Target Playwright Locator
   * @param {boolean} isVisible - `true` to assert element is visible, `false` to assert hidden
   * @returns {Promise<void>}
   */
  async verifyElementVisibility(locator: Locator, isVisible: boolean): Promise<void> {
    if (isVisible) {
      await expect(locator).toBeVisible();
    } else {
      await expect(locator).toBeHidden();
    }
  }
}