import { test, expect } from '@playwright/test';

test("checkout with valid user", async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // expect after username and password are filled
    await page.locator('[data-test="login-button"]').click();

    await page.locator('.title').waitFor({ state: 'visible' });
    await expect(page.locator('.title')).toHaveText('Products');

    // Select item
    await page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' }).click();
    await page.locator('.inventory_details_name').waitFor({ state: 'visible' });

    // Expect after item is selected
    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_details_desc')).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');

    // Add item to cart
    await page.locator('[data-test="shopping-cart-link"]').click();
});

test("checkout with valid user and back again after landing on checkout page", async ({ page})=> {
    await page.locator('[data-test="back-to-products"]').click();
    await page.locator('.title').waitFor({ state: 'visible' });
    await expect(page.locator('.title')).toHaveText('Products');
    await page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' }).click();
});
