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
    await test.step('Add new user to the table', async () => {
      await webTablesPage.addUser(defaultUser);
    });

    await test.step('Search for created user by email', async () => {
      await webTablesPage.search(defaultUser.email);
    });

    await test.step('Verify user presence and details in the table', async () => {
      const tableRow = webTablesPage.getUserRow(defaultUser.email);
      await expect(tableRow).toBeVisible();
      await expect(tableRow).toContainText(defaultUser.firstName);
      await expect(tableRow).toContainText(defaultUser.department);
    });
  });

  test('Data editing in the table', async () => {
    const updatedLastName = 'Symonenko';
    const updatedDepartment = 'Development';
    const updatedSalary = '6600';

    await test.step('Add new user to the table', async () => {
      await webTablesPage.addUser(defaultUser);
    });

    await test.step('Verify initial user creation', async () => {
      const tableRow = webTablesPage.getUserRow(defaultUser.email);
      await expect(tableRow).toBeVisible();
    });

    await test.step('Edit user details (last name, department, salary)', async () => {
      await webTablesPage.editUser(defaultUser.email, {
        lastName: updatedLastName,
        department: updatedDepartment,
        salary: updatedSalary,
      });
    });

    await test.step('Verify updated user information in the table', async () => {
      const tableRow = webTablesPage.getUserRow(defaultUser.email);
      await expect(tableRow).toBeVisible();
      await expect(tableRow).toContainText(defaultUser.firstName);
      await expect(tableRow).toContainText(updatedLastName);
      await expect(tableRow).toContainText(updatedDepartment);
      await expect(tableRow).toContainText(updatedSalary);
    });
  });

  test('Delete the user', async () => {
    await test.step('Add new user to the table', async () => {
      await webTablesPage.addUser(defaultUser);
    });

    await test.step('Verify user creation before deletion', async () => {
      const tableRow = webTablesPage.getUserRow(defaultUser.email);
      await expect(tableRow).toBeVisible();
    });

    await test.step('Delete user from the table', async () => {
      await webTablesPage.deleteUser(defaultUser.email);
    });

    await test.step('Verify user row is removed from table', async () => {
      const tableRow = webTablesPage.getUserRow(defaultUser.email);
      await expect(tableRow).not.toBeVisible();
    });
  });
});