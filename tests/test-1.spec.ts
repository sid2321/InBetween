import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/InBetween/#/PublicationPlanner/Table');
  await page.goto('http://localhost:8080/InBetween/#/');
  await page.goto('http://localhost:8080/InBetween/#/Login?returnUrl=%2FPublicationPlanner%2FTable');
  await page.goto('http://localhost:8080/IBSSO/?clientId=hwy60kjcr91qs45mab23pfvlxudot8&redirectUrl=http://localhost:8080/InBetween&appType=pw&location=PublicationPlanner');
  await page.getByPlaceholder('User ID').click();
  await page.getByPlaceholder('User ID').click();
  await page.getByPlaceholder('User ID').fill('manager');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('manager');
  await page.locator('#selectDropdown').getByRole('textbox').click();
  await page.locator('#select-options-797887dd-c7f9-65d0-3a56-f912275537894').getByText('Publication Planner').click();
  await page.getByText('Login', { exact: true }).click();
  await page.getByText('expand_moreProject').click();
  await page.getByText('BSH_Pricelist_Siemens').click();
  await page.locator('#editEnabled_lena1 svg').first().click();
  await page.getByRole('row', { name: 'preview 0 DD.MM.YYYY Open calendar iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAM5JREFUeF7t2LENgDAQQ1GyGxMwCSUjUDIM07BMmIA01kmRePQXJEN8/m7LdvclePp5DafbsQen1482AvgDXAEekFgNE7QFrEE5YKSAICQJisLJli2fxQJgCAyBITCUWC0YAkNgCAyBoYECaBANosEkZpTPosH+rFEULv9ExS9oBPAHuAI8oNhnpj6eCf5+C2iFtcJa4WgNKkWVokpRpahSVCn6rYBWWCusFZ4bh8EQGAJDYChxKTSIBtEgGkSDaBANfioAh+EwHE6CZvnsCx7uMkjfxh2+AAAAAElFTkSuQmCC In Planning 0% Marketing Media Design Assignee' }).getByRole('img').nth(2).click();
});