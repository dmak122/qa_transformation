import { test, expect } from '@playwright/test';
import { User } from '../models/user';
import { Student } from '../models/student';
import { WebTablesPage } from '../pages/webtables.page';
import { PracticeFormPage } from '../pages/practice-form.page';

test('Adding a user and finding him in a table', async ({ page }) => {
  const user = new User(
    'Dima',
    'Makarov',
    'dima@g00gle.com',
    '30',
    '5000',
    'QA Automation'
  );

  const webTablesPage = new WebTablesPage(page);

  await webTablesPage.open();
  await webTablesPage.addUser(user);
  await webTablesPage.search(user.email);

  const tableRow = webTablesPage.getUserRow(user.email);

  await expect(tableRow).toBeVisible();
  await expect(tableRow).toContainText(user.firstName);
  await expect(tableRow).toContainText(user.department);
});

test('Fill up and send students form', async ({ page }) => {
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

  const practiceFormPage = new PracticeFormPage(page);

  await practiceFormPage.open();
  await practiceFormPage.fillForm(student);
  await practiceFormPage.submit();
  await practiceFormPage.verifySubmittedData(student);
});