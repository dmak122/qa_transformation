import { BasePage } from './basepage';
import { Locator, Page, expect } from '@playwright/test';

export class TextBoxPage extends BasePage {

  // === LOCATORS ===

  readonly fullNameInput: Locator;
  readonly emailInput: Locator;           
  readonly currentAddressInput: Locator;   
  readonly permanentAddressInput: Locator; 
  readonly submitButton: Locator;
  readonly outputContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.getByPlaceholder('Full Name');
    this.emailInput = page.getByPlaceholder('name@example.com');     
    this.currentAddressInput = page.getByPlaceholder('Current Address');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.outputContainer = page.locator('#output');
  }

  async open() {
    await this.navigateTo('/text-box');
  }

async fillForm(name: string, email: string, currentAddress: string, permanentAddress: string) {
    await this.fullNameInput.fill(name);
    await this.emailInput.fill(email);
    await this.currentAddressInput.fill(currentAddress);
    await this.permanentAddressInput.fill(permanentAddress);
  }

async submit() {
    await this.submitButton.click();
  }

async verifyOutput(name: string, email: string) {
    await expect(this.outputContainer).toBeVisible();
    await expect(this.outputContainer.getByText(`Name:${name}`)).toBeVisible();
    await expect(this.outputContainer.getByText(`Email:${email}`)).toBeVisible();
  }
}

