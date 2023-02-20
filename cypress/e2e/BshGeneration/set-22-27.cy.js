import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info_bsh.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import bshSettings from '../../../selectors/bsh/bsh-setting-selectors.json'

describe('bsh generation BSH_Pricelist_Bosch', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('BSH_Pricelist_Bosch Generation', () => {

        let renameFileName = "BSH_Pricelist_Bosch_Generation.pdf";
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.createNewPublication(projectData.bsh.projectBosch,projectData.bsh.masterPublication,'Test_Performance_XL')
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('B').click();
        })
        cy.wait(2000)
        cy.dragDropMasterPage(0,'product_page',1);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.contains('Got It').click();
        cy.get('.dataSourceDropdown').eq(0).within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.wait(2000);
        cy.get('.mat-select-panel').within(() => {
            cy.contains('IB_de-DE_A01.xml').click({force: true });
            cy.wait(2000);
        })
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('B').click();
        })
        cy.contains('select_all').click({ force:true });
        cy.get('#basket_table > .mat-card-content #StackTable > app-table > .table > .divWidth > #Stack > #stackelm > :nth-child(1)').then(el => {
            const draggable = el[0]  // Pick up this
            draggable.dispatchEvent(new MouseEvent('mousemove'));
            cy.wait(900)
            draggable.dispatchEvent(new MouseEvent('mousedown'));
            cy.get('#PGS\\.0_0_FAR\\.1').then(el => {
                const droppable = el[0]  // Drop over this
                const coords = droppable.getBoundingClientRect();
                cy.log(coords)
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 30, clientY: coords.y + 40 }));
                draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 20, clientY: coords.y + 40 }));
            })
        })
        cy.get('#PGS\\.0_0_FAR\\.1').find('.elementsDropped').within(() => {
            cy.get('div').should('have.length.greaterThan', 40)
        }) 
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
        cy.get('.progress-bar',{ timeout: 150000000000000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('td').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        var StartTime = performance.now()
        cy.downloadGeneratedFile();
        var endTime = performance.now()
        cy.log(endTime - StartTime)
        cy.verifyAndRenameDownlodedFile(renameFileName);      
    })
})