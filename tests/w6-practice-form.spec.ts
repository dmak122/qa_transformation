import { test } from '@playwright/test';
import { Student } from '../models/student';
import { PracticeFormPage } from '../pages/practice-form.page';

test.describe('Practice Form Validation', () => {

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

  test('Student registration with filling up all the fileds', async ({ page }) => {
    
    // 1. Initializing the page object
    const practiceFormPage = new PracticeFormPage(page);

    // 2. Executing test steps through high-level methods
    await practiceFormPage.open();
    await practiceFormPage.fillForm(student);
    await practiceFormPage.submit();

    // 3. Verification of final data
    await practiceFormPage.verifySubmittedData(student);
  });


  test('Student registration with adding up a file and date', async ({ page }) => {
  
    const practiceFormPage = new PracticeFormPage(page);

    await practiceFormPage.open();
    await practiceFormPage.fillForm(student);
    await practiceFormPage.submit();


});
});