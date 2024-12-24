import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Expect after username and password are filled
  await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user');
  await expect(page.getByPlaceholder('Password')).toHaveValue('secret_sauce');

  await page.click('#login-button');

  await page.locator('.title').waitFor({ state: 'visible' });
  await expect(page.locator('.title')).toHaveText('Products');
});