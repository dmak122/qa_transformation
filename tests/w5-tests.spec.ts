import { test, expect } from '@playwright/test';

  test('Adding a user and finding him in a table', async ({ page }) => {

    const userEmail = 'dima@g00gle.com';
    
    //Create method for login - base class
    await page.goto('https://demoqa.com/webtables');

    // Open a form
    await page.locator('#addNewRecordButton').click();

    // Fill up the form
    //create a data set in helper and use it for both tests (this one and previous)
    await page.getByPlaceholder('First Name').fill('Dima');
    await page.locator('.mr-sm-2.form-control#lastName').fill('Makarov');
    await page.locator('#userEmail').fill(userEmail);
    await page.locator('#age').fill('30');
    await page.locator('#salary').fill('5000');
    await page.locator('#department').fill('QA Automation');

    // Save the form
    await page.locator('#submit').click();

    // Find the user using Search
    await page.getByPlaceholder('Type to search').fill(userEmail);

    // Check the needed line is in the table
    const tableRow = page.getByRole('row', { name: userEmail });
    
    // Basic assertions
    await expect(tableRow).toBeVisible();
    await expect(tableRow).toContainText('Dima');
    await expect(tableRow).toContainText('QA Automation');
  });

//===

  test('Fill up and send students form', async ({ page }) => {

    const firstName = 'Olena';
    const lastName = 'Guk';
    const userEmail = 'olenag@test.com';
    const userNumber = '1234567890';

    //create a method with step by step opening necessary page
    await page.goto('https://demoqa.com/automation-practice-form');

    // Basic text fields
    await page.locator('#firstName').fill(firstName);
    await page.locator('#lastName').fill(lastName);
    await page.locator('#userEmail').fill(userEmail);

    // Radio buttons 
    // better to use getByRole('radio', 'Female')
    await page.getByText('Female', { exact: true }).click();
    
    // Phone number
    await page.locator('#userNumber').fill(userNumber);

    // Work with subjects
    const subjectsInput = page.locator('#subjectsInput');
    await subjectsInput.fill('Math');
    await page.locator('.subjects-auto-complete__menu').getByText('Maths').click();

    // Checkbox
    // better to use getByRole('checkbox', 'Reading')
    await page.getByText('Reading').click();

    // Submit the form
    // better to use getByRole('button', 'Submit')
    await page.locator('#submit').click({ force: true });

    // Check results
    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();
    await expect(modal.locator('.modal-header')).toHaveText('Thanks for submitting the form');
    
    // Checking via variables
    //looks like .table-responsive is a part of modal try to use modal itself
   // const resultTable = modal.locator('.table-responsive');
    await expect(modal).toContainText(`${firstName} ${lastName}`);
    await expect(modal).toContainText(userEmail);
    await expect(modal).toContainText('Maths');
  });