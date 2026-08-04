import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basepage';
import { Student } from '../models/student';

export class PracticeFormPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly mobileInput: Locator;
  readonly subjectsInput: Locator;
  readonly addressInput: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly submitButton: Locator;
  readonly modalContent: Locator;
  readonly resultTable: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.mobileInput = page.locator('#userNumber');
    this.subjectsInput = page.locator('#subjectsInput');
    this.addressInput = page.locator('#currentAddress');
    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');
    this.submitButton = page.locator('#submit');
    this.modalContent = page.locator('.modal-content');
    this.resultTable = page.locator('.table-responsive');
  }

  async open(): Promise<void> {
    await this.navigateTo('/automation-practice-form');
  }

  async fillForm(student: Student): Promise<void> {
    await this.firstNameInput.fill(student.firstName);
    await this.lastNameInput.fill(student.lastName);
    await this.emailInput.fill(student.email);
    
    await this.page.getByText(student.gender, { exact: true }).click();
    await this.mobileInput.fill(student.mobile);

    await this.subjectsInput.fill(student.subject);
    await this.page.locator('.subjects-auto-complete__menu').getByText(student.subject).click();

    await this.page.getByText(student.hobby, { exact: true }).click();
    await this.addressInput.fill(student.address);

    await this.selectStateAndCity(student.state, student.city);
  }

  private async selectStateAndCity(state: string, city: string): Promise<void> {
    await this.stateDropdown.click();
    await this.page.getByText(state, { exact: true }).click();

    await this.cityDropdown.click();
    await this.page.getByText(city, { exact: true }).click();
  }

  async submit(): Promise<void> {
    await this.submitButton.click({ force: true });
  }

  async verifySubmittedData(student: Student): Promise<void> {
    await expect(this.modalContent).toBeVisible();
    await expect(this.modalContent.locator('.modal-header')).toHaveText('Thanks for submitting the form');

    await expect(this.resultTable).toContainText(`${student.firstName} ${student.lastName}`);
    await expect(this.resultTable).toContainText(student.email);
    await expect(this.resultTable).toContainText(student.gender);
    await expect(this.resultTable).toContainText(student.mobile);
    await expect(this.resultTable).toContainText(student.subject);
    await expect(this.resultTable).toContainText(student.hobby);
    await expect(this.resultTable).toContainText(student.address);
    await expect(this.resultTable).toContainText(`${student.state} ${student.city}`);
  }
}