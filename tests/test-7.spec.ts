import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://192.168.157.29/user/login');
  await page.getByLabel('Username or Email').fill('admin');
  await page.getByLabel('Username or Email').press('Tab');
  await page.getByLabel('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('menuitem', { name: 'Products' }).click();
  await page.getByPlaceholder('Search by label or identifier').click();
  await page.getByPlaceholder('Search by label or identifier').fill('C1S2P2');
  await page.getByRole('cell', { name: 'C1S2P2' }).click();
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('test');
  await page.locator('div:nth-child(3) > .AknTextField').click();
  await page.locator('div:nth-child(3) > .AknTextField').fill('50');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByTitle('Super Admin').click();
  await page.getByText('Logout').click();
});