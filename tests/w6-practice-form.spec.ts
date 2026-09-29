import { test } from '@playwright/test';
import { Student } from '../models/student';
import { PracticeFormPage } from '../pages/practice-form.page';

test.describe('Practice Form Validation', () => {
  let practiceFormPage: PracticeFormPage;

  // Data preparation (Test object)
  const student = new Student(
    'Ivan',
    'Biliy',
    'ivan.b@test.com',
    'Male',
    '1236543210',
    'Maths',
    'Sports',
    'NYC, 5th av, ap.t 23',
    'NCR',
    'Delhi'
  );

  test.beforeEach(async ({ page }) => {
    practiceFormPage = new PracticeFormPage(page);
  });

  test('Student registration with filling up all the fields', async () => {
    await test.step('Open practice form page', async () => {
      await practiceFormPage.open();
    });

    await test.step('Fill form with student details', async () => {
      await practiceFormPage.fillForm(student);
    });

    await test.step('Submit form', async () => {
      await practiceFormPage.submit();
    });

    await test.step('Verify submitted data in modal', async () => {
      await practiceFormPage.verifySubmittedData(student);
    });
  });

  test('Student registration with adding up a file and date', async () => {
    await test.step('Open practice form page', async () => {
      await practiceFormPage.open();
    });

    await test.step('Fill form with student details', async () => {
      await practiceFormPage.fillForm(student);
    });

    await test.step('Submit form', async () => {
      await practiceFormPage.submit();
    });
    //no verification steps
  });
});