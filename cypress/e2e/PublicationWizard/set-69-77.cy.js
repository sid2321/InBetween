import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info.json'
import pubScreenSelectors from '../../../selectors/publication-screen-selectors.json'
import generateSelectors from '../../../selectors/generate-selectors.json'

describe('Publication creation', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('conversion of static page', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.simple.projectName,projectData.simple.publication);
        cy.contains(' album ').click();
        cy.get('[role="menu"]').within(() => {
            cy.get('button').eq(2).click();
        })
        cy.get('[role="dialog"]').within(() => {
            cy.get('.dialogCloseButton').click();
        })
        cy.wait(2000)
        cy.get('#drag1').within(() =>{
            cy.get('#part1').click( {force: true });
        })
        cy.wait(2000)
        cy.get('.indesignConv').parents('button').click();
        cy.get('.spinner-gif2',{ timeout: 500000 }).should('not.exist');
        cy.get('.imgdrop').should('exist')
    })

    it('conversion of static page and save', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.simple.projectName,projectData.simple.publication);
        cy.wait(2000)
        cy.get('#drag1').within(() =>{
            cy.get('#part1').click( {force: true });
        })
        cy.wait(2000)
        cy.get('.indesignConv').parents('button').click();
        cy.get('.spinner-gif2',{ timeout: 500000 }).should('not.exist');
        cy.get('.imgdrop').should('exist')
        cy.saveProject();
    })

    it('conversion of static page and edit and save', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.simple.projectName,projectData.simple.publication);
        cy.wait(2000)
        cy.get('.workFlowBar').click();
        cy.get('[role="menu"]').within(() => {
            cy.get('button').click();
        })
        cy.get('[role="dialog"]').within(() => {
            cy.get('.dialogCloseButton').click();
        })
        cy.get('.workFlowBar').should('have.css', 'background-color')
        .and('include', 'rgb(113, 0, 168)')

    })

})    