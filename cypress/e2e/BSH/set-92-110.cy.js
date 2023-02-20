import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info_bsh.json'
import settingsSelectors from '../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import bshSelectors from '../../../selectors/bsh/bsh-selection-selectors.json'
import elementBuilderSelectors from '../../../selectors/element-builder-selectors.json';

describe('Test with Extra Large Data XML: XL', () => {


    it('IB_el-GR_A01.xml generation', () => {

        cy.loginWithoutCaching(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
        let renameFileName = 'IB_el-GR_A01.pdf';
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectBosch,projectData.bsh.pubBosch)
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.contains('Got It').click();
        cy.get('.dataSourceDropdown').eq(0).within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.contains('IB_el-GR_A01.xml').click({ force:true });
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click( { force:true });
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' HQ-PDF ').click();
        })
        cy.get('form').within(() => {
            cy.get("[placeholder='PDF Quality Settings']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' PDFX3 2002 ').click();
        })

        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 150000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);  
    })

    it('cover page Test', () => {

        cy.loginWithoutCaching(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
        let renameFileName = 'cover_page_101.pdf';
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.createNewPublication(projectData.bsh.projectBosch,projectData.bsh.masterPublication,'automation_publication')
        //cy.selectPublication(projectData.bsh.projectBosch,' automation_publication ');
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('B').click();
        })
        cy.dragDropMasterPage(2,'cover_page',1);
        cy.get('#PGS\\.0_0_DAR\\.1').click({ force: true})
        cy.wait(2000)
        cy.get('#stackelm').find('tr').eq(0).click({ force:true }).within(() => {
            cy.get('td').eq('1').contains('Bosch Standard')
        })
        cy.get('#preview_properties').find('.floating-text').should('have.text','Bosch Standard')
        cy.get('#PGS\\.0_0_page').find('input').siblings().click({ force: true});
        cy.wait(2000)
        cy.get('[placeholder="Headline"]').type('_cover');
        cy.get('[placeholder="Subheadline"]').type('_cover')
        cy.get('#basket_table').find('#Stack').within(() => {
            cy.get('tr').eq(0).click();
        })
        cy.get('#basket_table > .mat-card-content #StackTable > app-table > .table > .divWidth > #Stack > #stackelm > :nth-child(1)').then(el => {
            const draggable = el[0]  // Pick up this
            draggable.dispatchEvent(new MouseEvent('mousemove'));
            cy.wait(900)
            draggable.dispatchEvent(new MouseEvent('mousedown'));
            cy.get('#PGS\\.0_0_DAR\\.1').then(el => {
                const droppable = el[0]  // Drop over this
                const coords = droppable.getBoundingClientRect();
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 30, clientY: coords.y + 40 }));
                draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 20, clientY: coords.y + 40 }));
            })
        })
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' HQ-PDF ').click();
        })
        cy.get('form').within(() => {
            cy.get("[placeholder='PDF Quality Settings']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' PDFX3 2002 ').click();
        })

        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 150000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);
    })

    it('index page Test and Product page test', () => {

        cy.login(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
        let renameFileName = 'cover_page_104.pdf';
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        //cy.createNewPublication(projectData.bsh.projectBosch,projectData.bsh.masterPublication,'automation_publication')
        cy.selectPublication(projectData.bsh.projectBosch,' automation_publication ');
        cy.wait(5000);
        cy.dragDropMasterPage(1,'index_page',1);
        cy.get('#PGS\\.0_0_SAR\\.1').click({ force: true})
        cy.wait(5000)
        cy.get('#PGS\\.0_0_page').find('input').siblings().click({ force: true});
        cy.saveProject()
        cy.get('[placeholder="Index Headline"]').type('_index');
        cy.dragDropMasterPage(0,'product_page',1);
        cy.get('#PGS\\.1_1_FAR\\.1').click({ force: true})
        cy.get('#basket_table').find('#Stack').within(() => {
            cy.get('tr').eq(1).click({ force: true});
        })
        cy.get('#basket_table > .mat-card-content #StackTable > app-table > .table > .divWidth > #Stack > #stackelm > :nth-child(2)').then(el => {
            const draggable = el[0]  // Pick up this
            draggable.dispatchEvent(new MouseEvent('mousemove'));
            cy.wait(900)
            draggable.dispatchEvent(new MouseEvent('mousedown'));
            cy.get('#PGS\\.1_1_FAR\\.1').then(el => {
                const droppable = el[0]  // Drop over this
                const coords = droppable.getBoundingClientRect();
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 30, clientY: coords.y + 40 }));
                draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 20, clientY: coords.y + 40 }));
            })
        })
        cy.get('#PGS\\.1_1_FAR\\.1').find('.elementsDropped').eq(0).click({ force:true})
        cy.get('#preview_properties_element').within(() => {
            cy.get('[type="checkbox"]').click({ force:true})
            cy.get('[placeholder="product notice"]').type('Manual note')
            cy.get('[placeholder="campaign price"]').type('1999')
            cy.get('[placeholder="manual price"]').type('2000')
        })
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' HQ-PDF ').click();
        })
        cy.get('form').within(() => {
            cy.get("[placeholder='PDF Quality Settings']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' PDFX3 2002 ').click();
        })

        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 150000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);
    })

})    