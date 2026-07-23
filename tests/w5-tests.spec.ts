import { test, expect } from '@playwright/test';

  test('Adding a user and finding him in a table', async ({ page }) => {

    const userEmail = 'dima@g00gle.com';
    
    await page.goto('https://demoqa.com/webtables');

    // Open a form
    await page.locator('#addNewRecordButton').click();

    // Fill up the form
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

    await page.goto('https://demoqa.com/automation-practice-form');

    // Basic text fields
    await page.locator('#firstName').fill(firstName);
    await page.locator('#lastName').fill(lastName);
    await page.locator('#userEmail').fill(userEmail);

    // Radio buttons 
    await page.getByText('Female', { exact: true }).click();
    
    // Phone number
    await page.locator('#userNumber').fill(userNumber);

    // Work with subjects
    const subjectsInput = page.locator('#subjectsInput');
    await subjectsInput.fill('Math');
    await page.locator('.subjects-auto-complete__menu').getByText('Maths').click();

    // Checkbox
    await page.getByText('Reading').click();

    // Submit the form
    await page.locator('#submit').click({ force: true });

    // Check results
    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();
    await expect(modal.locator('.modal-header')).toHaveText('Thanks for submitting the form');
    
    // Checking via variables
    const resultTable = modal.locator('.table-responsive');
    await expect(resultTable).toContainText(`${firstName} ${lastName}`);
    await expect(resultTable).toContainText(userEmail);
    await expect(resultTable).toContainText('Maths');
  });