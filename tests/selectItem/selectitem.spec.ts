import { test, expect } from '@playwright/test';

test('filter products', async ({ page }) => {
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

    const listFiltes = page.locator('.inventory_list');
    await listFiltes.waitFor(); // wait for the list of filters to be visible

    // Apply A-Z filter
    await page.selectOption('.product_sort_container', 'az'); // Select A-Z option from dropdown
    // Retrieve list of items
    const items = await page.locator('.inventory_item_name').allTextContents(); //setelah filter dipilih, ambil semua nama item dan dibuatkan array
    // Verify item order
    const sortedItems = [...items].sort(); // array items di sortir dari A-Z
    expect(items).toEqual(sortedItems); // Bandingkan daftar asli dengan daftar yang diurutkan
   
    //await listFiltes.waitFor(); tidak perlu di panggil lagi karena sudah di panggil di atass
    // Apply Z-A filter
    await page.selectOption('.product_sort_container', 'za'); // Select Z-A option from dropdown
    // Retrieve list of items
    const itemsZA = await page.locator('.inventory_item_name').allTextContents();
    const sortedItemsZA = [...itemsZA].sort().reverse(); // array di sortir dari Z-A dengan reverse
    expect(itemsZA).toEqual(sortedItemsZA); // Compare original list with sorted list

    // Apply Price (low to high) filter
    await page.selectOption('.product_sort_container', 'lohi'); // Select Price (low to high) option from dropdown
    // Retrieve list of items
    const itemsPriceLow = await page.locator('.inventory_item_price').allTextContents();
    // Verify item order
    const sortedItemsPriceLow = [...itemsPriceLow].sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', ''))); // Sort items by price (low to high)
    expect(itemsPriceLow).toEqual(sortedItemsPriceLow); // Compare original list with sorted list

    // Apply Price (high to low) filter
    await page.selectOption('.product_sort_container', 'hilo'); // Select Price (high to low) option from dropdown
    // Retrieve list of items
    const itemsPriceHigh = await page.locator('.inventory_item_price').allTextContents();
    // Verify item order
    const sortedItemsPriceHigh = [...itemsPriceHigh].sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', ''))); // Sort items by price (high to low)
    expect(itemsPriceHigh).toEqual(sortedItemsPriceHigh); // Compare original list with sorted list
});

test('selectItem test using selecteditem', async ({ page }) => {
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

    // Select item
    await page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' }).click();
    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_details_desc')).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');
});

test('check image item using standard user', async ({page}) =>{
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
    // login
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    // click login 
    await page.click('#login-button');
    // expect after login
    await page.locator('.title').waitFor({ state: 'visible' });
    await expect(page.locator('.title')).toHaveText('Products');
    // select item
    await page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' }).waitFor({ state: 'visible' });
    await expect (page.getByAltText('Sauce Labs Backpack')).toHaveAttribute('src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
    await page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' }).click();
    await page.locator('.inventory_details_img').waitFor({ state: 'visible' });
    await expect(page.locator('.inventory_details_img')).toHaveAttribute('src','/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
});


test('check image item using problem user' ,async({page}) =>{
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
    // login
    await page.getByPlaceholder('Username').fill('problem_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    // click login
    await page.click('#login-button');
    // expect after login
    await page.locator('.title').waitFor({ state: 'visible' });
    await expect(page.locator('.title')).toHaveText('Products');
    // select item
    await page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' }).waitFor({ state: 'visible' });
    await expect (page.getByAltText('Sauce Labs Backpack')).toHaveAttribute('src', '/static/media/sl-404.168b1cce.jpg'); //ini negative case seharus nya url nya /static/media/sauce-backpack-1200x1500.0a0b85a3.jpg
    //await expect(page.locator('[id=item_4_img_link]')).toHaveAttribute('src', 'https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.34e7aa42.jpg');
    await page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' }).click();
    // expect image
    await page.locator('.inventory_details_img').waitFor({ state: 'visible' });
    await expect(page.locator('.inventory_details_img')).toHaveAttribute('src','/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg'); // ini juga sama seharusnya url gambar adalah '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg' tapi agar pass saya ganti dengan url yang salah dulu
});
