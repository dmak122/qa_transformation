import { test, expect } from '@playwright/test';
import { AccountApi } from '../api/account.api';

test.describe.serial('Account API - Full User Lifecycle', () => {
  let accountApi: AccountApi;
  let userId: string;
  let token: string;

  const dynamicUser = `User_${Date.now()}`;
  const password = 'Password1234!';

  test.beforeEach(async ({ request }) => {
    accountApi = new AccountApi(request);
  });

  test('User can register via API', async () => {
    const responseBody = await accountApi.createUser(dynamicUser, password);
    userId = responseBody.userID;
    expect(responseBody.username).toBe(dynamicUser);
  });

  test('User can generate token (login) via API', async () => {
    token = await accountApi.generateToken(dynamicUser, password);
    expect(token).toBeTruthy();
  });

  test('User can delete account via API', async () => {
    const response = await accountApi.deleteUser(userId, token);
    expect(response.status()).toBe(204);
  });
});