import { test, expect } from '@playwright/test';

test('positive login-logout test using datatest', async ({ page }) => {
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

test('positive login-logout test using placeholder', async ({ page }) => {
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

test('negative username & password empty', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  // expect username and password empty
  expect(await page.locator('[data-test="username"]').inputValue()).toBe('');
  expect(await page.locator('[data-test="password"]').inputValue()).toBe('');
  // Login
  await page.locator('[id="login-button"]').click();
  // Expect after login button is clicked
  await page.locator('.error-button').waitFor({ state: 'visible' });
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');// error message ada didalam heading h3 dengan data-test="error"
});

test('negative login-logout invalid creadential', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  // Login
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // Expect after username and password are filled
  await expect(page.locator('[data-test="username"]')).toHaveValue('locked_out_user');
  await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');

  await page.locator('[data-test="login-button"]').click();
  // Expect after login button is clicked
  await page.locator('[data-test="error"]').waitFor({ state: 'visible' });
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});