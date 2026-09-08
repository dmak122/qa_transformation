import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BookStorePage } from '../pages/book-store.page';
import { ProfilePage } from '../pages/profile.page';

test.describe('Book Store Application - E2E Flow', () => {
  // Credentials and test data
  const username = 'BookLover';
  const password = 'Password123!';
  const targetBook = 'Git Pocket Guide';
  /////
  let bookRow = '';

  // Page Object declarations at the suite level
  let loginPage: LoginPage;
  let bookStorePage: BookStorePage;
  let profilePage: ProfilePage;

  // Initialize Page Objects before each test run
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    bookStorePage = new BookStorePage(page);
    profilePage = new ProfilePage(page);
  });

  test('User can search, add, verify and delete a book from collection', async () => {
    await test.step('Login to the system', async () => {
      // expected that navidate will have some parameter e.g. loginPage.navigate("MainPage") or loginPage.navigate("LoginPage") to make it more flexible;
      await loginPage.navigate();
      await loginPage.login(username, password);
    });

    await test.step('Search and add book to collection', async () => {
      // the same as previous
      // looks like this step is owerlap the previous one
      await bookStorePage.navigate();
      await bookStorePage.search.search(targetBook);
      await bookStorePage.table.clickBookTitle(targetBook);
      await bookStorePage.addCurrentBookToCollection();
    });

    await test.step('Verify book exists in Profile collection', async () => {
      //
      await profilePage.navigate();
      await profilePage.search.search(targetBook);
      //create several times the same variable, create it once and reuse it
      bookRow = profilePage.table.getRowByTitle(targetBook);
      // pretty the same verification as next one, except method isBookRowVisible(true/false)
      await expect(bookRow).toBeVisible();
    });

    await test.step('Delete book from collection and confirm removal', async () => {
      // explaine how it works, if it works in this case will it work if we declare this variable before test?
      bookRow = profilePage.table.getRowByTitle(targetBook);
      await profilePage.table.deleteBookByTitle(targetBook);
      await profilePage.confirmDeleteModalButton.click();
      // pretty the same verification as previous one
      await expect(bookRow).toBeHidden();
    });
  });

  test('User can clear the entire book collection from the profile', async () => {
    await test.step('Login to the system', async () => {
      //
      await loginPage.navigate();
      await loginPage.login(username, password);
    });

    await test.step('Add a book to ensure the collection is not empty', async () => {
      //
      await bookStorePage.navigate();
      await bookStorePage.search.search(targetBook);
      await bookStorePage.table.clickBookTitle(targetBook);
      await bookStorePage.addCurrentBookToCollection();
      //in this step only action no validations that action perform well ??? - for discuss
    });

    await test.step('Go to profile and use the bulk delete feature', async () => {
      //
      await profilePage.navigate();
      await profilePage.deleteAllBooks();
    });

    await test.step('Verify the table no longer contains the added book', async () => {
      const bookRow = profilePage.table.getRowByTitle(targetBook);
      // pretty the same verification as previous one
      await expect(bookRow).toBeHidden();
    });
  });

  test('User can filter books using search in the Book Store', async () => {
    //all test data at the beginning of the test
    const searchKeyword = 'Learning JavaScript';
    const otherBookTitle = 'Git Pocket Guide';

    await test.step('Open book store directly (guest user)', async () => {
      //
      await bookStorePage.navigate();
    });

    await test.step('Use search component to filter the table', async () => {
      await bookStorePage.search.search(searchKeyword);
    });

    await test.step('Verify target book is visible and other books are hidden', async () => {
      const matchingRow = bookStorePage.table.getRowByTitle(searchKeyword);
      const hiddenRow = bookStorePage.table.getRowByTitle(otherBookTitle);

      // pretty the same verification as previous one
      await expect(matchingRow).toBeVisible();
      await expect(hiddenRow).toBeHidden();
    });
  });

  test('Search for a non-existent book returns empty results', async () => {
    //all test data at the beginning of the test
    const nonExistentBook = 'NonExistentBook12345';

    await test.step('Open book store', async () => {
      //
      await bookStorePage.navigate();
    });

    await test.step('Search for something that does not exist', async () => {
      await bookStorePage.search.search(nonExistentBook);
    });

    await test.step('Verify the table row for this book is hidden', async () => {
      const row = bookStorePage.table.getRowByTitle(nonExistentBook);
      // pretty the same verification as previous one
      await expect(row).toBeHidden();
    });
  });

  test('User can open book details and return back to the store', async () => {
    await test.step('Open book store', async () => {
      // the same as previous
      await bookStorePage.navigate();
    });

    await test.step('Click on the book title to view details', async () => {
      //
      await bookStorePage.table.clickBookTitle(targetBook);
    });

    await test.step('Verify book details view is displayed', async () => {
      await expect(bookStorePage.backToStoreButton).toBeVisible();
    });

    await test.step('Navigate back to the store and verify table is visible', async () => {
      await bookStorePage.backToStoreButton.click();
      await expect(bookStorePage.table.table).toBeVisible();
    });
  });
});