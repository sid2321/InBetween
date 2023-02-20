import pubScreenSelectors from '../../../selectors/publication-screen-selectors.json'
import elementBuilderSelectionSelectors from '../../../selectors/element-builder-selectors.json'
import projectData from '../../../fixtures/project_publication.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import userData from '../../../fixtures/user_info.json'

describe('Publication Wizard Customization Part - 2', ()=> {

    beforeEach(() => {
        cy.login('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    //functionality changed
    it('check font family', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.get(pubScreenSelectors.mainToolbar).as('toolbar').should('have.css', 'font-family', 'Roboto, sans-serif');
        cy.get('@toolbar').should('be.visible').compareSnapshot('font-family',0.2);
    })

    it('header logo should be displayed', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.get(pubScreenSelectors.mainToolbar).as('toolbar').within(() => {
            cy.get("[alt='Logo']").should('exist');
        })
        cy.get('@toolbar').should('be.visible').compareSnapshot('header-logo-exist-2',0.5);
    })

    it('Customer Logo and text should be displayed', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.get(elementBuilderSelectionSelectors.mainMenu).within(() => {
            cy.get('.text-modify').should('not.exist');
            cy.get('img').should('not.exist');
        })
    })

    it('check the tab panel color and background colour', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.get(pubScreenSelectors.mainToolbar)
        .should('have.css', 'background')
        .and('include', 'rgb(85, 85, 85)')
        cy.get(pubScreenSelectors.mainToolbar).compareSnapshot('tab-panel-colour-2',0.2)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.get('#builderTab1')
        .should('have.css', 'background-color')
        .and('include', 'rgb(119, 119, 119)')
        cy.compareSnapshot('builder-tab');
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.wait(2000);
        cy.compareSnapshot('generation-tab');
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.contains('Got It').click();
        cy.compareSnapshot('settings-tab');

    })

    it('drop down selection color and background colour', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(2000);
        cy.get(pubScreenSelectors.projectSelector).within(() => {
            cy.get(pubScreenSelectors.projectDropDown).within(() => {
                cy.get('span').click();
        })
    })
        cy.get(pubScreenSelectors.projPanel).should('be.visible').within(() => {
                cy.get('mat-option').eq(0).as('project')
                .should('have.css', 'color')
                .and('include', 'rgb(0, 0, 0)')

                cy.get('@project').should('have.css', 'background-color')
                .and('include', 'rgb(255, 255, 255)')
            });
        cy.get(pubScreenSelectors.projPanel).compareSnapshot('drop-down-selection-color-and-background-colour-2',0.5)

    })

    it('check the table header color', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.get(elementBuilderSelectionSelectors.stacktable).within(() => {
            cy.get('thead').as('tableHead')
            .should('have.css','background-color')
            .and('include', 'rgb(103, 162, 192)')

            cy.get('@tableHead').should('have.css','color')
            .and('include', 'rgb(255, 255, 255)')
        })
    })

  
})