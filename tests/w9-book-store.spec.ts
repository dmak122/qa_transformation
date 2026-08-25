import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BookStorePage } from '../pages/book-store.page';
import { ProfilePage } from '../pages/profile.page';

test.describe('Book Store Application - E2E Flow', () => {
  // Test credentials (make sure to use a valid DemoQA account or set up one)
  const username = 'BookLover';
  const password = 'Password123!';
  const targetBook = 'Git Pocket Guide';

  test('User can search, add, verify and delete a book from collection', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bookStorePage = new BookStorePage(page);
    const profilePage = new ProfilePage(page);

    // Step 1: Login to the system
    await loginPage.navigate();
    await loginPage.login(username, password);

    // Step 2: Search and add book to collection
    await bookStorePage.navigate();
    await bookStorePage.search.search(targetBook);
    await bookStorePage.table.clickBookTitle(targetBook);
    await bookStorePage.addCurrentBookToCollection();

    // Step 3: Verify book exists in Profile collection
    await profilePage.navigate();
    await profilePage.search.search(targetBook);
    const bookRow = profilePage.table.getRowByTitle(targetBook);
    await expect(bookRow).toBeVisible();

    // Step 4: Delete book from collection and confirm removal
    await profilePage.table.deleteBookByTitle(targetBook);
    await profilePage.confirmDeleteModalButton.click();
    await expect(bookRow).toBeHidden();
  });

  test('User can clear the entire book collection from the profile', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bookStorePage = new BookStorePage(page);
    const profilePage = new ProfilePage(page);

    // Step 1: Login to the system
    await loginPage.navigate();
    await loginPage.login(username, password);

    // Step 2: Add a book to ensure the collection is not empty
    await bookStorePage.navigate();
    await bookStorePage.search.search(targetBook);
    await bookStorePage.table.clickBookTitle(targetBook);
    await bookStorePage.addCurrentBookToCollection();

    // Step 3: Go to profile and use the bulk delete feature
    await profilePage.navigate();
    await profilePage.deleteAllBooks();

    // Step 4: Verify the table no longer contains the added book
    const bookRow = profilePage.table.getRowByTitle(targetBook);
    await expect(bookRow).toBeHidden();
  });

test('User can filter books using search in the Book Store', async ({ page }) => {
    const bookStorePage = new BookStorePage(page);
    const searchKeyword = 'Learning JavaScript';
    const otherBookTitle = 'Git Pocket Guide';

    // Step 1: Open book store directly (guest user)
    await bookStorePage.navigate();

    // Step 2: Use search component to filter the table
    await bookStorePage.search.search(searchKeyword);

    // Step 3: Verify target book is visible and other books are hidden
    const matchingRow = bookStorePage.table.getRowByTitle(searchKeyword);
    const hiddenRow = bookStorePage.table.getRowByTitle(otherBookTitle);

    await expect(matchingRow).toBeVisible();
    await expect(hiddenRow).toBeHidden();
  });

  test('Search for a non-existent book returns empty results', async ({ page }) => {
    const bookStorePage = new BookStorePage(page);
    const nonExistentBook = 'NonExistentBook12345';

    // Step 1: Open book store
    await bookStorePage.navigate();

    // Step 2: Search for something that doesn't exist
    await bookStorePage.search.search(nonExistentBook);

    // Step 3: Verify the table row for this book is hidden/not visible
    const row = bookStorePage.table.getRowByTitle(nonExistentBook);
    await expect(row).toBeHidden();
  });

  });