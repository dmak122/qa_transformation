import { test } from '@playwright/test';
import { Student } from '../models/student';
import { PracticeFormPage } from '../pages/practice-form.page';

test.describe('Practice Form Validation', () => {
  test('Student registration with filling up all the fileds', async ({ page }) => {
    
    // 1. Data preparation (Test object)
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

    // 2. Initializing the page object
    const practiceFormPage = new PracticeFormPage(page);

    // 3. Executing test steps through high-level methods
    await practiceFormPage.open();
    await practiceFormPage.fillForm(student);
    await practiceFormPage.submit();

    // 4. Verification of final data
    await practiceFormPage.verifySubmittedData(student);
  });
});