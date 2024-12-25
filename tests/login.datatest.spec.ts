import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // Expect after username and password are filled
  await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
  await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');

  await page.locator('[data-test="login-button"]').click();
  // Expect after login button is clicked
  await page.locator('.title').waitFor({ state: 'visible' });
  await expect(page.locator('.title')).toHaveText('Products');
});
