import projectData from '../../../fixtures/project_publication.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import userData from '../../../fixtures/user_info.json'

describe('Publication Wizard Customization Part - 2', ()=> {

    beforeEach(() => {
        cy.login('manager','manager','Publication Wizard');
        cy.pageLoaded();
    })

        it('check the table selection color and background color', () => {
            cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
            cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
            cy.get(elementSelectionSelectors.sideToolBar).within(() => {
                cy.contains('list').click();
            })
            cy.selectStack(projectData.newRDU.sub);
            cy.wait(5000)
            cy.get('table')
            .find('tr').eq(1).find('td').eq(1).as('first').click();
            cy.get('table')
            .find('tr').eq(2).find('td').eq(1).as('second').click({
                shiftKey:true,
                force:true,
            })
            cy.get('@first').parent()
            .should('have.css','background-color')
            .and('include', 'rgb(198, 188, 35)')

            cy.get('@first').parent()
            .should('have.css','color')
            .and('include', 'rgb(198, 35, 193)')

            cy.get('@second').parent()
            .should('have.css','background-color')
            .and('include', 'rgb(198, 188, 35)')

            cy.get('@second').parent()
            .should('have.css','color')
            .and('include', 'rgb(198, 35, 193)')
        })


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
                .and('include', 'rgb(211, 18, 70)')
            })

        })

        it('check sidebar tool color', () => {
            cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
            cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
            cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.get('.mat-list-item').eq(0)
            .should('have.css','color')
            .and('include', 'rgb(0, 0, 0)')
            })
        })

        it('check sidebar tool color', () => {
            cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
            cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
            cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.get('.mat-list-item').eq(4)
            .should('have.css','color')
            .and('include', 'rgb(35, 198, 37)')
            })
        })
})