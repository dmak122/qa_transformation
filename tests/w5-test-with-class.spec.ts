import { test, expect } from '@playwright/test';
import { User } from '../models/user';
import { WebTablesPage } from '../pages/webtables.page';

test.describe('Web Tables functionality', () => {
  let webTablesPage: WebTablesPage;

  const defaultUser = new User(
    'Dima',
    'Makarov',
    'dima@g00gle.com',
    '30',
    '5000',
    'QA Automation'
  );

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.open();
  });

  test('Adding a user and finding him in a table', async () => {
    await webTablesPage.addUser(defaultUser);
    await webTablesPage.search(defaultUser.email);

    const tableRow = webTablesPage.getUserRow(defaultUser.email);

    await expect(tableRow).toBeVisible();
    await expect(tableRow).toContainText(defaultUser.firstName);
    await expect(tableRow).toContainText(defaultUser.department);
  });

  test('Data editing in the table', async () => {
    const updatedLastName = 'Symonenko';
    const updatedDepartment = 'Development';
    const updatedSalary = '6600';

    await webTablesPage.addUser(defaultUser);

    const tableRow = webTablesPage.getUserRow(defaultUser.email);
    await expect(tableRow).toBeVisible();

    await webTablesPage.editUser(defaultUser.email, {
      lastName: updatedLastName,
      department: updatedDepartment,
      salary: updatedSalary,
    });

    await expect(tableRow).toBeVisible();
    await expect(tableRow).toContainText(defaultUser.firstName);
    await expect(tableRow).toContainText(updatedLastName);
    await expect(tableRow).toContainText(updatedDepartment);
    await expect(tableRow).toContainText(updatedSalary);
  });

  test('Delete the user', async () => {
    await webTablesPage.addUser(defaultUser);

    const tableRow = webTablesPage.getUserRow(defaultUser.email);
    await expect(tableRow).toBeVisible();

    await webTablesPage.deleteUser(defaultUser.email);

    await expect(tableRow).not.toBeVisible();
  });
});