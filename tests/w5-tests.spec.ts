import { test, expect } from '@playwright/test';
import { User } from '../models/user';
import { Student } from '../models/student';
import { WebTablesPage } from '../pages/webtables.page';
import { PracticeFormPage } from '../pages/practice-form.page';

test.describe('WebTables and Practice Form Flow', () => {
  let webTablesPage: WebTablesPage;
  let practiceFormPage: PracticeFormPage;

  const user = new User(
    'Dima',
    'Makarov',
    'dima@g00gle.com',
    '30',
    '5000',
    'QA Automation'
  );

  const student = new Student(
    'Olena',
    'Guk',
    'olenag@test.com',
    'Female',
    '1234567890',
    'Maths',
    'Reading',
    'Main St. 12',
    'NCR',
    'Delhi'
  );

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    practiceFormPage = new PracticeFormPage(page);
  });

  test('Adding a user and finding him in a table', async () => {
    await test.step('Open web tables page', async () => {
      await webTablesPage.open();
    });

    await test.step('Add new user to the table', async () => {
      await webTablesPage.addUser(user);
    });

    await test.step('Search for the created user by email', async () => {
      await webTablesPage.search(user.email);
    });

    await test.step('Verify user presence and details in the table', async () => {
      const tableRow = webTablesPage.getUserRow(user.email);
      await expect(tableRow).toBeVisible();
      await expect(tableRow).toContainText(user.firstName);
      await expect(tableRow).toContainText(user.department);
    });
  });

  test('Fill up and send students form', async () => {
    await test.step('Open practice form page', async () => {
      await practiceFormPage.open();
    });

    await test.step('Fill form with student details', async () => {
      await practiceFormPage.fillForm(student);
    });

    await test.step('Submit form', async () => {
      await practiceFormPage.submit();
    });

    await test.step('Verify submitted student data', async () => {
      await practiceFormPage.verifySubmittedData(student);
    });
  });
});