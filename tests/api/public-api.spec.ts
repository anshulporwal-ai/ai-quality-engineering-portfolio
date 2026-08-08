import { expect, test } from '@playwright/test';

test.describe('Public API contract checks', () => {
  test('post resource satisfies the expected contract', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
      userId: expect.any(Number),
      id: 1,
      title: expect.any(String),
      body: expect.any(String)
    }));
  });

  test('unknown resource returns 404', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/999999');
    expect(response.status()).toBe(404);
  });
});
