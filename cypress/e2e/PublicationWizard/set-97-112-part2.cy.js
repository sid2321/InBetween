import pubScreenSelectors from '../../../selectors/publication-screen-selectors.json'
import elementBuilderSelectionSelectors from '../../../selectors/element-builder-selectors.json'
import projectData from '../../../fixtures/project_publication.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import userData from '../../../fixtures/user_info.json'

describe('Publication Wizard Customization Part - 1', ()=> {

    beforeEach(() => {
        cy.login('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    //functionality changed
    it('check the component color', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.contains('Got It').click();
        cy.get('#b_col1').within(() => {
            cy.get('input').eq(0).siblings('.mat-radio-inner-circle')
            .should('have.css','background-color')
            .and('include', 'rgb(35, 198, 198)')
        })

    })

    it('check icon selection color', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
           cy.get('.mat-list-item').eq(4)
           .should('have.css','background')
           .and('include', 'rgb(51, 153, 255)')
        })
    })

    it('check sidebar tool color', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
           cy.get('.mat-list-item').eq(4)
           .should('have.css','color')
           .and('include', 'rgb(255, 26, 26)')
        })
    })
})