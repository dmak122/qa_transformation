import { test, expect } from '@playwright/test';

test('Checking Title img', async ({ page }) => {
  //duplicated code should be extracted to the separate method
  await page.goto('https://demoqa.com/');
  await expect(
    
  page.locator('img[src="/assets/Toolsqa-DZdwt2ul.jpg"]')).toBeVisible();

});

test('Checking Contained text', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await expect(page.locator('span')).toContainText('© 2013-2026 TOOLSQA.COM | ALL RIGHTS RESERVED.');

});

test('Checking page elements', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await expect(page.getByRole('link', { name: 'Elements' })).toHaveAttribute('href', '/elements');
  await expect(page.getByRole('link', { name: 'Forms' })).toHaveAttribute('href', '/forms');
  await expect(page.getByRole('link', { name: 'Alerts, Frame & Windows' })).toHaveAttribute('href', '/alertsWindows');
  await expect(page.getByRole('link', { name: 'Widgets' })).toHaveAttribute('href', '/widgets');
  await expect(page.getByRole('link', { name: 'Interactions' })).toHaveAttribute('href', '/interaction');
  await expect(page.getByRole('link', { name: 'Book Store Application' })).toHaveAttribute('href', '/books');

});

test('Registration', async ({ page }) => {
  await page.goto('https://www.toolsqa.com/selenium-training/');
  await page.click("text=Go To Registration")
    
  await page.type('#first-name', 'Carl' );
  await page.type('#email', 'testemail@test.com' );
  await page.type('#mobile', '123456777' );
  await page.type('#message', 'test message' );
  await page.fill('#city', 'City' );

  await page.click("text=Send");

  //no verifications for the actions
});