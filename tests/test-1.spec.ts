import {chromium, test, expect } from '@playwright/test';

test('test', async () => {
  const browser = await chromium.launch();
  const plannercontext = await browser.newContext();
  const page = await plannercontext.newPage();

  await page.goto('http://192.168.158.212:8080/InBetween/');
  await page.waitForLoadState("networkidle");
  await page.getByPlaceholder('User ID').fill('manager');
  await page.getByPlaceholder('Password').fill('manager');
  await page.click("[id='login-btn']",{timeout: 12000});
  await page.waitForLoadState("networkidle");
  const openPubButton = page.locator('#open_pub_button');
  await openPubButton.waitFor();
  await Promise.all([
      expect(page.url()).toContain('/PublicationWizard/home')
  ]);
  await page.locator("#sel_proj").click();
  await page.getByRole('option', { name: 'IB_Default_Showcase_V1' }).getByText('IB_Default_Showcase_V1').click();
  await page.locator("#sel_pub").click();
  await page.getByRole('option', { name: 'Catalog_2023' }).getByText('Catalog_2023').click();
  await page.locator("#open_pub_button").click()
  //await expect(page.locator('mat-chip').filter({ has: page.getByText('Catalog_2023') })).toBeVisible();
  await page.locator('[id="PGS\\.14_3_page"] > .pageTtileContainer > .pageTitleOverlay').click();
  await page.locator('a').filter({ hasText: /^C$/ }).click();
  await page.waitForTimeout(3000)
  await page.getByAltText('rectangle').click();
  await page.waitForTimeout(15000)
  const sourcePlaceHolder = page.locator('svg').first();
  if (sourcePlaceHolder) {
      const srcBoundPlace = await sourcePlaceHolder.boundingBox()
      if (srcBoundPlace) {
          await page.mouse.move(srcBoundPlace.x + srcBoundPlace.width / 2, srcBoundPlace.y + 10)
          await page.mouse.down();
          await page.mouse.move(srcBoundPlace.x + (srcBoundPlace.width / 2 + 30), srcBoundPlace.y + 40 );
          await page.mouse.up();
      } else {
          throw new Error("No Element")
      }
  }
  await new Promise((resolve) => {
    page.on('close', resolve); // <-- add this
  });
});