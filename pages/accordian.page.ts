import { Locator, Page, expect } from '@playwright/test';
import { WidgetsPage } from './widgets.page';

export class AccordianPage extends WidgetsPage {
  // Locators
  readonly section1Heading: Locator;
  readonly section2Heading: Locator;
  readonly section3Heading: Locator;

  readonly section1Content: Locator;
  readonly section2Content: Locator;
  readonly section3Content: Locator;

  constructor(page: Page) {
    super(page);

    this.section1Heading = page.getByRole('button', { name: 'What is Lorem Ipsum?' });
    this.section2Heading = page.getByRole('button', { name: 'Where does it come from?' });
    this.section3Heading = page.getByRole('button', { name: 'Why do we use it?' });

    const accordionItems = page.locator('.accordion-item');
    this.section1Content = accordionItems.nth(0).locator('.accordion-body');
    this.section2Content = accordionItems.nth(1).locator('.accordion-body');
    this.section3Content = accordionItems.nth(2).locator('.accordion-body');
  }

// --- Navigation ---   

  async open() {
    await this.openWidget('Accordian');
  }

  // --- Actions ---
  async clickSection1() {
    await this.section1Heading.click();
  }

  async clickSection2() {
    await this.section2Heading.click();
  }

  async clickSection3() {
    await this.section3Heading.click();
  }

  // --- Assertions ---
  async verifySection1Visible() {
    await expect(this.section1Content).toBeVisible();
  }

  async verifySection1Hidden() {
    await expect(this.section1Content).toBeHidden();
  }

  async verifySection2Visible() {
    await expect(this.section2Content).toBeVisible();
  }

  async verifySection2Hidden() {
    await expect(this.section2Content).toBeHidden();
  }

  async verifySection3Visible() {
    await expect(this.section3Content).toBeVisible();
  }

  async verifySection3Hidden() {
    await expect(this.section3Content).toBeHidden();
  }

  // --- Text Assertions ---
async verifySection1Text(expectedText: string) {
  await expect(this.section1Content).toContainText(expectedText);
}

async verifySection2Text(expectedText: string) {
  await expect(this.section2Content).toContainText(expectedText);
}

async verifySection3Text(expectedText: string) {
  await expect(this.section3Content).toContainText(expectedText);
}
}