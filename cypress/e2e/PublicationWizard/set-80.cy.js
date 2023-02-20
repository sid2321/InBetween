import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info.json'

describe('Convert to InBetween', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('convert to inBetween page', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.simple.projectName,projectData.simple.publication);
        cy.wait(2000);
        cy.get('#drag1').within(() =>{
            cy.get('#part1').click( {force: true });
        })
        //cy.exec()
        cy.wait(2000);
        cy.get('.indesignConv').parents('button').click();
        cy.get('.data', { timeout: 500000 }).should('have.text','No renderer found, please add InDesign renderer and try again.')
    })
})