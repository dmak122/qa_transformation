import { BasePage } from './basepage';
import { Locator, Page, expect } from '@playwright/test';

export class ButtonsPage extends BasePage {

  readonly doubleClickBtn: Locator;
  readonly rightClickBtn: Locator;
  readonly dynamicClickBtn: Locator;

  readonly doubleClickMsg: Locator;
  readonly rightClickMsg: Locator;
  readonly dynamicClickMsg: Locator;

  constructor(page: Page) {
    super(page);
   
    this.doubleClickBtn = page.getByRole('button', { name: 'Double Click Me' });
    this.rightClickBtn = page.getByRole('button', { name: 'Right Click Me' });
    this.dynamicClickBtn = page.getByRole('button', { name: 'Click Me', exact: true });

    this.doubleClickMsg = page.getByText('You have done a double click');
    this.rightClickMsg = page.getByText('You have done a right click');
    this.dynamicClickMsg = page.getByText('You have done a dynamic click');
  }

  async open() {
    await this.navigateTo('/buttons');
  }

  async performDoubleClick() {
    await this.doubleClickBtn.dblclick();
  }

  async performRightClick() {
    await this.rightClickBtn.click({ button: 'right' });
  }

  async performDynamicClick() {
    await this.dynamicClickBtn.click();
  }

  async checkDoubleClickMessage() {
    await expect(this.doubleClickMsg).toBeVisible();
  }

  async checkRightClickMessage() {
    await expect(this.rightClickMsg).toBeVisible();
  }

  async checkDynamicClickMessage() {
    await expect(this.dynamicClickMsg).toBeVisible();
  }

}