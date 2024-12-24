import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');

  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');

  // Expect after username and password are filled
  await expect(page.getByTestId('username')).toHaveValue('standard_user');
  await expect(page.getByTestId('password')).toHaveValue('secret_sauce');

  await page.getByTestId('login-button').click();

  await page.locator('.title').waitFor({ state: 'visible' });
  await expect(page.locator('.title')).toHaveText('Products');
});
