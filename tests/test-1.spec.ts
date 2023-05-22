import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://192.168.158.212:8080/InBetween/');
  await page.goto('http://192.168.158.212:8080/InBetween/#/Login');
  await page.goto('http://192.168.158.212:8080/IBSSO/?clientId=g41ak6103689adf83df6e7202f597k88&redirectUrl=http://192.168.158.212:8080/InBetween&appType=pw&location=PublicationWizard');
  await page.getByPlaceholder('User ID').click();
  await page.getByPlaceholder('User ID').fill('manager');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('manager');
  await page.getByText('Login', { exact: true }).click();
  await page.getByRole('listbox', { name: 'Project' }).getByText('Project').click();
  await page.getByRole('option', { name: 'IB_Default_Showcase_V1' }).getByText('IB_Default_Showcase_V1').click();
  await page.getByRole('listbox', { name: 'Publication' }).getByText('Publication').click();
  await page.getByRole('option', { name: 'Catalog_2023' }).getByText('Catalog_2023').click();
  await page.getByRole('button', { name: 'Open Publication' }).click();
  await page.locator('div').filter({ hasText: /^C$/ }).nth(1).click();
  await page.locator('a').filter({ hasText: /^B$/ }).click();
  await page.locator('[id="PGS\\.14_3_page"] > .pageTtileContainer > .pageTitleOverlay').click();
  await page.locator('a').filter({ hasText: /^C$/ }).click();
  await page.locator('#rectangle-0').click();
  await page.locator('#rectangle-0').click();
  await page.locator('#status_div_0').getByPlaceholder('Enter comment').click();
  await page.locator('#status_div_0').getByPlaceholder('Enter comment').click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.locator('#status_div_0').getByPlaceholder('Enter comment').click();
  await page.locator('app-annotation-manager').getByRole('button', { name: 'H' }).click();
  await page.locator('app-annotation-manager').getByRole('button', { name: 'H' }).click();
  await page.locator('#status_div_0').getByPlaceholder('Enter comment').click();
  await page.locator('#status_div_0').getByPlaceholder('Enter comment').fill('test');
  await page.locator('app-annotation-manager').getByRole('button', { name: 'H' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '2' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#status_div_0').getByPlaceholder('Enter comment').click();
});