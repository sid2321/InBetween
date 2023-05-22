import { test, expect } from '@playwright/test';
import userData from '../fixtures/user_info_akeneo.json';

test('test', async ({ page }) => {
await page.goto(userData.akeneo_PIM_Url);
await page.getByLabel('Username or Email').fill(userData.akeneo_PIM_Username);
await page.getByLabel('Username or Email').press('Tab');
await page.getByLabel('Password').fill(userData.akeneo_PIM_Username);
await page.getByRole('button', { name: 'Login' }).click();
await page.getByRole('menuitem', { name: 'Products' }).click();
await page.getByPlaceholder('Search by label or identifier').click();
await page.getByPlaceholder('Search by label or identifier').fill(userData.productID);
await page.getByRole('cell', { name: userData.productID }).click();
await page.getByLabel('Description').click();
await page.getByLabel('Description').fill(userData.productNewDesc);
await page.locator('div:nth-child(3) > .AknTextField').click();
await page.locator('div:nth-child(3) > .AknTextField').fill(userData.productNewPrice);
await page.getByRole('button', { name: 'Save' }).click();
await page.getByTitle('Super Admin').click();
await page.getByText('Logout').click();

});