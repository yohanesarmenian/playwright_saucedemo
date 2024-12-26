import { test, expect } from '@playwright/test';

test('login-logout test using datatest', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  // Login
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // Expect after username and password are filled
  await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
  await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');

  await page.locator('[data-test="login-button"]').click();
  // Expect after login button is clicked
  await page.locator('.title').waitFor({ state: 'visible' });
  await expect(page.locator('.title')).toHaveText('Products');

  // Logout
  await page.getByRole('button', {name: 'Open Menu'}).click();
  await page.locator('[data-test="logout-sidebar-link"]').waitFor({ state: 'visible' });
  await expect(page.locator('[data-test="logout-sidebar-link"]')).toHaveText('Logout');
  await page.locator('[data-test="logout-sidebar-link"]').click();

  // Expect after logout button is clicked
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  await page.locator('[data-test="username"]').waitFor({ state: 'visible' });
  await expect(page.locator('[data-test="username"]')).toHaveValue('');
  await expect(page.locator('[data-test="password"]')).toHaveValue('');
});

test('login-logout test using placeholder', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Expect after username and password are filled
  await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user');
  await expect(page.getByPlaceholder('Password')).toHaveValue('secret_sauce');

  await page.click('#login-button');
  // Expect after login button is clicked
  await page.locator('.title').waitFor({ state: 'visible' });
  await expect(page.locator('.title')).toHaveText('Products');

  //Logout
  await page.getByRole('button', {name: 'Open Menu'}).click();
  await page.locator('[id="logout_sidebar_link"]').waitFor({ state: 'visible' });
  await page.locator('[id="logout_sidebar_link"]').click();

  // Expect after logout button is clicked
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  await page.locator('[data-test="username"]').waitFor({ state: 'visible' });
  await expect(page.getByPlaceholder('Username')).toHaveValue('');
  await expect(page.getByPlaceholder('Password')).toHaveValue('');
});