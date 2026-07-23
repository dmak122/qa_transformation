import { test, expect } from '@playwright/test';
import { User } from '../classes/user';

    test('Adding a user and finding him in a table', async ({ page }) => {
    
    const user = new User(
      'Dima',
      'Makarov',
      'dima@g00gle.com',
      '30',
      '5000',
      'QA Automation'
    );

    await page.goto('https://demoqa.com/webtables');

    await page.locator('#addNewRecordButton').click();

    await page.getByPlaceholder('First Name').fill(user.firstName);
    await page.locator('.mr-sm-2.form-control#lastName').fill(user.lastName);
    await page.locator('#userEmail').fill(user.email);
    await page.locator('#age').fill(user.age);
    await page.locator('#salary').fill(user.salary);
    await page.locator('#department').fill(user.department);

    await page.locator('#submit').click();

    await page.getByPlaceholder('Type to search').fill(user.email);

    const tableRow = page.getByRole('row', { name: user.email });
    
    await expect(tableRow).toBeVisible();
    await expect(tableRow).toContainText(user.firstName);
    await expect(tableRow).toContainText(user.department);
  });

    //===

  test('Data editing in the table', async ({ page }) => {
    
    const user = new User(
      'Dima',
      'Makarov',
      'dima@g00gle.com',
      '30',
      '5000',
      'QA Automation'
    );

    // New data for the table
    const updatedLastName = 'Symonenko';
    const updatedDepartment = 'Development';
    const updatedSalary = '6600'

    await page.goto('https://demoqa.com/webtables');

    // New user
    await page.locator('#addNewRecordButton').click();
    await page.getByPlaceholder('First Name').fill(user.firstName);
    await page.locator('#lastName').fill(user.lastName);
    await page.locator('#userEmail').fill(user.email);
    await page.locator('#age').fill(user.age);
    await page.locator('#salary').fill(user.salary);
    await page.locator('#department').fill(user.department);
    await page.locator('#submit').click();

    // Find the user by email
    const tableRow = page.getByRole('row', { name: user.email });
    await expect(tableRow).toBeVisible();

    // Edit the table
    await tableRow.locator('[title="Edit"]').click();

    // Clear and fill up the fields with new values
    const lastNameInput = page.locator('#lastName');
    await lastNameInput.click();
    await lastNameInput.clear();
    await lastNameInput.fill(updatedLastName);

    const departmentInput = page.locator('#department');
    await departmentInput.click();
    await departmentInput.clear();
    await departmentInput.fill(updatedDepartment);

    const salaryInput = page.locator('#salary');
    await salaryInput.click();
    await salaryInput.clear();
    await salaryInput.fill(updatedSalary);  

    // Save
    await page.locator('#submit').click();

    // Checks
    const updatedRow = page.getByRole('row', { name: user.email });
    
    await expect(updatedRow).toBeVisible();
    await expect(updatedRow).toContainText(user.firstName);
    await expect(updatedRow).toContainText(updatedLastName); 
    await expect(updatedRow).toContainText(updatedDepartment); 
    await expect(updatedRow).toContainText(updatedSalary);
  });

  // ===

  test('Delete the user', async ({ page }) => {
    
    const user = new User(
      'Dima',
      'Makarov',
      'dima@g00gle.com',
      '30',
      '5000',
      'QA Automation'
    );

    await page.goto('https://demoqa.com/webtables');

    // Add a new user
    await page.locator('#addNewRecordButton').click();
    await page.getByPlaceholder('First Name').fill(user.firstName);
    await page.locator('#lastName').fill(user.lastName);
    await page.locator('#userEmail').fill(user.email);
    await page.locator('#age').fill(user.age);
    await page.locator('#salary').fill(user.salary);
    await page.locator('#department').fill(user.department);
    await page.locator('#submit').click();

    // Check that the user is added
    const tableRow = page.getByRole('row', { name: user.email });
    
    await expect(tableRow).toBeVisible();

    // Click on Delete
    await tableRow.locator('[title="Delete"]').click();

    // Check deletion
    await expect(tableRow).not.toBeVisible();
  });