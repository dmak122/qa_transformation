import { test, expect } from '@playwright/test';

test('Checking Contained text', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await expect(page.locator('span')).toContainText('© 2013-2026 TOOLSQA.COM | ALL RIGHTS RESERVED.');

});

test('Checking page elements urls', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await expect(page.getByRole('link', { name: 'Elements' })).toHaveAttribute('href', '/elements');
  await expect(page.getByRole('link', { name: 'Forms' })).toHaveAttribute('href', '/forms');
  await expect(page.getByRole('link', { name: 'Alerts, Frame & Windows' })).toHaveAttribute('href', '/alertsWindows');
  await expect(page.getByRole('link', { name: 'Widgets' })).toHaveAttribute('href', '/widgets');
  await expect(page.getByRole('link', { name: 'Interactions' })).toHaveAttribute('href', '/interaction');
  await expect(page.getByRole('link', { name: 'Book Store Application' })).toHaveAttribute('href', '/books');

});

test('Filling up Text Box', async ({ page }) => {
    await page.goto('https://demoqa.com/');

    await page.locator('a[href="/elements"]').click();
    await page.click('#item-0')

    await page.locator('#userName').fill('Carl Woldberg');
    await page.locator('#userEmail').fill('test3434@gogo.com');
    await page.locator('#currentAddress').fill('Sunny av., 78, apt. 23');
    await page.locator('#permanentAddress').fill('Moon str,, 1 apt. 23');

    await page.locator('#submit').click();

    await expect(page.locator('#name')).toContainText('Name:Carl Woldberg');
    await expect(page.locator('#email')).toContainText('Email:test3434@gogo.com');
    //await expect(page.locator('#currentAddress')).toContainText('Current Address :Sunny av., 78, apt. 23');
    //await expect(page.locator('#permanentAddress')).toContainText('Permanent Address :Moon str,, 1 apt. 23');
  });

  test('Checking Check Box', async ({ page }) => {
    await page.goto('https://demoqa.com/');

    await page.locator('a[href="/elements"]').click();
    await page.getByText('Check Box').click();
    //await page.click('#item-1')
    await page.click('.rc-tree-switcher.rc-tree-switcher_close')
    await page.getByRole('checkbox', { name: 'Select Documents' }).click();
    //await page.locator('div:has-text("Documents") .rc-tree-checkbox').click();
    await expect(page.locator('#result')).toContainText('You have selected :documentsworkspaceofficereactangularveupublicprivateclassifiedgeneral');
  });