import { BasePage } from './basepage';
import { Locator, Page } from '@playwright/test';
import { User } from '../models/user';

export class WebTablesPage extends BasePage {
  readonly addButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;
  readonly submitButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.addButton = page.locator('#addNewRecordButton');
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.ageInput = page.locator('#age');
    this.salaryInput = page.locator('#salary');
    this.departmentInput = page.locator('#department');
    this.submitButton = page.locator('#submit');
    this.searchInput = page.getByPlaceholder('Type to search');
  }

  async open() {
    await this.navigateTo('/webtables');
  }

  async addUser(user: User) {
    await this.addButton.click();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.ageInput.fill(user.age);
    await this.salaryInput.fill(user.salary);
    await this.departmentInput.fill(user.department);
    await this.submitButton.click();
  }

  async search(query: string) {
    await this.searchInput.fill(query);
  }

  getUserRow(email: string): Locator {
    return this.page.getByRole('row', { name: email });
  }

  async editUser(
    email: string,
    newData: { lastName?: string; department?: string; salary?: string }
  ) {
    const row = this.getUserRow(email);
    await row.locator('[title="Edit"]').click();

    if (newData.lastName) {
      await this.lastNameInput.clear();
      await this.lastNameInput.fill(newData.lastName);
    }
    if (newData.department) {
      await this.departmentInput.clear();
      await this.departmentInput.fill(newData.department);
    }
    if (newData.salary) {
      await this.salaryInput.clear();
      await this.salaryInput.fill(newData.salary);
    }

    await this.submitButton.click();
  }

  async deleteUser(email: string) {
    const row = this.getUserRow(email);
    await row.locator('[title="Delete"]').click();
  }
}