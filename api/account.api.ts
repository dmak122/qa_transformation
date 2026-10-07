import { APIRequestContext, expect } from '@playwright/test';

export class AccountApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(username: string, password: string) {
    const response = await this.request.post('/Account/v1/User', {
      data: {
        userName: username,
        password: password,
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.userID).toBeTruthy();
    expect(body.username).toBe(username);

    return body;
  }

  async generateToken(username: string, password: string) {
    const response = await this.request.post('/Account/v1/GenerateToken', {
      data: {
        userName: username,
        password: password,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('Success');
    expect(body.token).toBeTruthy();

    return body.token;
  }

  async deleteUser(userId: string, token: string) {
    const response = await this.request.delete(`/Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(204);
    return response;
  }
}