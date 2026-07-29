import { test, expect } from '@playwright/test';
import { User } from '../classes/user';

test.describe() {

const user = new User(
      'Dima',
      'Makarov',
      'dima@g00gle.com',
      '30',
      '5000',
      'QA Automation'
    );
    
const updatedLastName = 'Symonenko';
    const updatedDepartment = 'Development';
    const updatedSalary = '6600'

    test('Adding a user and finding him in a table', async ({ page }) => {


    //Create method for login - base class
    //create method for go to elements - element page object
    //create method for open Web Tables - element page object

    await page.goto('https://demoqa.com/webtables');

    //why css not default roles?
    await page.locator('#addNewRecordButton').click();

    await page.getByPlaceholder('First Name').fill(user.firstName);
    //explane this locator
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


    // all predifine data should be out of the test and at the beginin of test sute 
    // New data for the table
    

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

    // a lot of duplicated code
    // newMethod(locator: string, updatedValue: string) {
  //   const lastNameInput = page.locator(locator);
  //   await lastNameInput.click();
  //   await lastNameInput.clear();
  //   await lastNameInput.fill(updatedValue);
    
  // }
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

    // Save - why do we need such comments?
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
    
    

    await page.goto('https://demoqa.com/webtables');

    // Add a new user
    // duplicated code should be extrated to the new method
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
    //not enaugh verification
    await expect(tableRow).toBeVisible();

    // Click on Delete
    await tableRow.locator('[title="Delete"]').click();

    // Check deletion
    await expect(tableRow).not.toBeVisible();
  });

}