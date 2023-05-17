const { chromium, test, expect } = require('@playwright/test');
  
    test('planner lock functionality', async({ }) => {

        const browser = await chromium.launch();
        const pwcontext = await browser.newContext();
        const plannercontext = await browser.newContext();

        const pwPage = await pwcontext.newPage();
        const plannerPage = await plannercontext.newPage();

        await pwPage.goto('http://192.168.0.143:8080/InBetween/');
        await pwPage.getByPlaceholder('User ID').fill('manager');
        await pwPage.getByPlaceholder('Password').fill('manager');
        await pwPage.click("[id='login-btn']",{timeout: 12000});
        await pwPage.waitForLoadState("networkidle");
        await Promise.all([
            expect(pwPage.url()).toContain('/PublicationWizard/home')
        ]);
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
        await pwPage.bringToFront();
        await pwPage.locator("#sel_proj").click();
        await pwPage.getByRole('option', { name: 'BSH_Pricelist_Siemens' }).getByText('BSH_Pricelist_Siemens').click();
        await pwPage.locator("#sel_pub").click();
        await pwPage.getByRole('option', { name: 'lena1' }).getByText('lena1').click();
        await pwPage.locator("#open_pub_button").click()
        await expect(pwPage.locator('mat-chip').filter({ has: pwPage.getByText('lena1') })).toBeVisible();
        const source = pwPage.locator(':text("product_page") + div').first();
        const target = pwPage.locator('#playAreaContainer');
        if (source && target) {
            const srcBound = await source.boundingBox()
            const dstBound = await target.boundingBox();
            if (srcBound && dstBound) {
                await pwPage.mouse.move(srcBound.x + srcBound.width / 2, srcBound.y + srcBound.height / 2)
                await pwPage.mouse.down();
                await pwPage.mouse.move(dstBound.x + 50, dstBound.y + (dstBound.height - 70));
                await pwPage.mouse.click(dstBound.x + 50, dstBound.y + (dstBound.height - 70));
            } else {
                throw new Error("No Element")
            }
        }
        await expect(pwPage.locator('#PGS\\.0_0_FAR\\.1')).toBeInViewport();
        await plannerPage.bringToFront();
        await plannerPage.getByRole('listbox', { name: 'Project' }).locator('span').click();
        await plannerPage.getByText('BSH_Pricelist_Siemens').click();
        await expect(plannerPage.locator('#editEnabled_lena1').getByRole('img').first()).toHaveAttribute('src','assets/images/PubLock.png');
        await plannerPage.locator('#editEnabled_lena1').getByRole('img').click();
        await plannerPage.getByRole('button', { name: 'Request Unlock' }).click();
        await expect(plannerPage.getByText('Request sent by \'manager\' to unlock this publication.')).toBeVisible();
        await pwPage.bringToFront();
        await expect(pwPage.getByText('User \'manager\' requested you to exit from editing the publication \'lena1\'')).toBeVisible();
        await pwPage.locator('#save').click();
        await plannerPage.bringToFront();
        await expect(plannerPage.getByText('The Publication has been Unlocked')).toBeVisible();
        await expect(plannerPage.locator('#editEnabled_lena1').locator('#Add_Section')).toBeVisible();
        await plannerPage.locator('#editEnabled_lena1 svg').first().click();
        await expect(plannerPage.locator('#editDisabled_lena1').getByRole('img').first()).toHaveAttribute('src','assets/images/Save.png')
        await pwPage.bringToFront();
        await expect(pwPage.getByText('\'manager\' is editing the publication please wait until it finished')).toBeVisible();
        await plannerPage.waitForTimeout(5000)
        await plannerPage.bringToFront();
        await plannerPage.waitForTimeout(5000)
        await plannerPage.locator('#editDisabled_lena1').getByRole('img').first().click();
        await plannerPage.waitForTimeout(2000)
        await pwPage.bringToFront();    
        await pwPage.locator('.glyphicon-download-alt').click();  //await expect(pwPage.getByRole('simple-snack-bar').getByText('A new version of the publication is available now.')).toBeVisible()
        await expect(pwPage.locator('.glyphicon-download-alt')).toBeHidden();
        await pwPage.getByText('swap_horiz').click()
        await pwPage.getByText('swap_horiz').click()
        await expect(pwPage.locator('.staticPageImport')).toBeVisible();
        const sourcePlaceHolder = pwPage.locator('.staticPageImport').first();
        const targetPlaceHolder = pwPage.locator('#playAreaContainer');
        if (sourcePlaceHolder && targetPlaceHolder) {
            const srcBoundPlace = await sourcePlaceHolder.boundingBox()
            const dstBoundPlace = await targetPlaceHolder.boundingBox();
            if (srcBoundPlace && dstBoundPlace) {
                await pwPage.mouse.move(srcBoundPlace.x + srcBoundPlace.width / 2, srcBoundPlace.y + srcBoundPlace.height / 2)
                await pwPage.mouse.down();
                await pwPage.mouse.move(dstBoundPlace.x + dstBoundPlace.width / 2, dstBoundPlace.y + dstBoundPlace.height / 2);
                await pwPage.mouse.click(dstBoundPlace.x + dstBoundPlace.width / 2, dstBoundPlace.y + dstBoundPlace.height / 2);
            } else {
                throw new Error("No Element")
            }
        }
        await pwPage.locator('#save').click();
        await expect(plannerPage.getByText('Saved')).toBeVisible();
        await pwPage.waitForTimeout(2000)
        await expect(pwPage.locator('#PGS\\.1_1_page')).toBeInViewport();
        await pwcontext.close();
        await plannercontext.close();
        await browser.close();
        /*const currentLink = pwPage.locator('#basket_table > .mat-card-content > #StackTable > app-table > .table > .divWidth > #Stack > #stackelm > :nth-child(2)');
        const targetPage =pwPage.locator('#PGS\\.0_0_FAR\\.1');
        if (currentLink && targetPage) {
            const currentLinkSrc = await currentLink.boundingBox()
            const currentLinkTrgt = await targetPage.boundingBox();
            if (currentLinkSrc && currentLinkTrgt) {
                await currentLink.click();
                await pwPage.mouse.move(currentLinkSrc.x + currentLinkSrc.width / 2, currentLinkSrc.y + currentLinkSrc.height / 2)
                await pwPage.mouse.down();
                await pwPage.mouse.move(currentLinkTrgt.x + currentLinkTrgt.width / 2, currentLinkTrgt.y + currentLinkTrgt.height / 2);
                await pwPage.mouse.up();
            } else {
                throw new Error("No Element")
            }
        }

        /*await source.dragTo(target, {
            sourcePosition: { x: 34, y: 7 },
            targetPosition: { x: 10, y: 20 },
          });
        await new Promise((resolve) => {
            pwcontext.on('close', resolve); // <-- add this
        });*/

    })

