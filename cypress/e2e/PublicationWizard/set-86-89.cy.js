import projectData from '../../../fixtures/project_publication.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import userData from '../../../fixtures/user_info.json'

describe('Multiple machine generation scenario', () => {


    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('publication generation with multi-machine', () => {
        let renameFileName = 'multi_machine_generation.pdf'
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.coffeness.projectName,projectData.coffeness.masterPublication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
       cy.get('.preview_Publication').click();
        cy.wait(2000);
        cy.get('.buttonAfterLoading', { timeout: 25000 })
        .should('have.css','background-color')
        .and('include','rgb(255, 64, 129)')
        cy.get('.pageContainerInner').compareSnapshot('preview-publication',0.2)
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' PDF ').click();
        })
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 70000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);
    })
})