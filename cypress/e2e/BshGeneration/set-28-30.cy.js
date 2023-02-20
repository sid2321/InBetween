import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info_bsh.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import bshSettings from '../../../selectors/bsh/bsh-setting-selectors.json'

describe('bsh generation BSH_Pricelist_Catalog', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('BSH_Catalog Generation', () => {

        let renameFileName = "BSH_Catalog_Generation.pdf";
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(' BSH_Catalog ',' Test_Catalog_v13_2021-06-14 ')
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