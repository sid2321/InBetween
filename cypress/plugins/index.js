/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const { chromium, test, expect } = require('@playwright/test');
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin')
  getCompareSnapshotsPlugin(on, config)


  on('task', {
    drawusingAnnotationsMnanager(){
      return (async() => {
        const browser = await chromium.launch({ headless: false });
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
        return null;
      })();
    },
  })

  on('task', {
    loginPlanner() {
      return (async () => {
        // If
        const browser = await chromium.launch({ headless: false });
        const plannercontext = await browser.newContext();
        const plannerPage = await plannercontext.newPage();
  
        await plannerPage.goto('http://192.168.0.143:8080/InBetween/');
        await plannerPage.waitForLoadState("networkidle");
        await plannerPage.getByPlaceholder('User ID').fill('manager');
        await plannerPage.getByPlaceholder('Password').fill('manager');
        await plannerPage.click("[id='login-btn']",{timeout: 12000});
        await plannerPage.waitForLoadState("networkidle");
        const openPubButton = plannerPage.locator('#open_pub_button');
        await openPubButton.waitFor();
        await Promise.all([
            expect(plannerPage.url()).toContain('/PublicationWizard/home')
        ]);
        await plannerPage.goto('http://192.168.0.143:8080/InBetween/#/PublicationPlanner/Home');
        await plannerPage.waitForLoadState("networkidle");
        await Promise.all([
            expect(plannerPage.url()).toContain('PublicationPlanner/Home')
        ]);
        const addButton = plannerPage.locator('#addButton');
        await addButton.waitFor();
        await plannerPage.getByRole('listbox', { name: 'Project' }).locator('span').click();
        await plannerPage.getByText('BSH_Pricelist_Siemens').click();
        await plannerPage.waitForLoadState("networkidle");
        await plannerPage.waitForTimeout(5000)
        await plannerPage.getByPlaceholder('Search').type('lena1', {delay:200})
        await plannerPage.waitForTimeout(5000)
        await plannerPage.locator('#expandButton_lena1').click();
        await plannerPage.locator('#expandArrowInner_lena1_section1').click();
        await expect(plannerPage.locator("[src='assets/images/InBetween_Pages.png']")).toBeVisible();
        await plannerPage.locator('.pub_preview-btn').click();
        await plannerPage.waitForTimeout(15000)
        await browser.close();
        return null
      })();
    },
  });
}




