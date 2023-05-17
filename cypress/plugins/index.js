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




