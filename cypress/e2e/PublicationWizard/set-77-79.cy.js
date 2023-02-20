import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info.json'
import pubScreenSelectors from '../../../selectors/publication-screen-selectors.json'
import generateSelectors from '../../../selectors/generate-selectors.json'

describe('Convert to InBetween', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('check edited page in indesign', () => {
        let renameFileName_one = 'indesign_edited_page.indd'
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.simple.projectName,projectData.simple.publication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' INDD ').click();
        })
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 50000 }).should('not.exist');
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName_one);
    })

    it('convert to inBetween page', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.simple.projectName,projectData.simple.publication);
        cy.contains(' album ').click();
        cy.wait(2000);
        cy.get('[role="menu"]').within(() => {
            cy.get('button').eq(1).click();
        })
        cy.get('[role="dialog"]').within(() => {
            cy.get('.dialogCloseButton').click();
        })
        cy.get('.workFlowBar').should('have.css', 'background-color')
        .and('include', 'rgb(0, 164, 238)')
        cy.wait(2000)
        cy.contains(' album ').click();
        cy.get('[role="menu"]').within(() => {
            cy.get('button').eq(2).click();
        })
        cy.get('[role="dialog"]').within(() => {
            cy.get('.dialogCloseButton').click();
        })
        cy.wait(2000);
        cy.get('#drag1').within(() =>{
            cy.get('#part1').click( {force: true });
        })
        cy.wait(2000);
        cy.get('.indesignConv').parents('button').click();
        cy.get('#dialogBox').within(() => {
            cy.get('#convertYes').click()
        })
        cy.get('.imgdrop', { timeout: 50000 }).should('not.exist')
        cy.saveProject();
    })
})