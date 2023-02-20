import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info_bsh.json'
import settingsSelectors from '../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import bshSelectors from '../../../selectors/bsh/bsh-selection-selectors.json'
import elementBuilderSelectors from '../../../selectors/element-builder-selectors.json';

describe('bsh toggle between the stacks and basket', () => {

    beforeEach(() => {
        cy.login(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('bsh toggle between the stacks and basket', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(2000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.contains(' more_horiz ').click({ force: true });
        cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
          cy.get('button').eq(2).click({ force: true });
        })
        cy.get(elementSelectionSelectors.stackTable)
        .find('tr')
        .eq(1).click({force: true}).within(() => {
            cy.get('div').eq(0)
            .should('have.css','background-color')
            .and('include', 'rgb(233, 30, 99)')
        })
        cy.wait(2000);
        cy.get('#preview_properties').as('preview').compareSnapshot('previewelementDetails',0.8);
        cy.get('@preview').within(() => {
            cy.get('.floating-text').should('have.text','AA010410, Sonderzubehör')
        })
        cy.get('#Stack').scrollTo('bottom',{ ensureScrollable: false })
    })

    it('bsh toggle between the stacks and basket', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(2000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.get(elementSelectionSelectors.Basket)
        .find('tr')
        .eq(1).click({force: true}).within(() => {
            cy.get('div').eq(0)
            .should('have.css','background-color')
            .and('include', 'rgb(233, 30, 99)')
        })
        cy.wait(2000);
        cy.get('#preview_properties').as('preview').compareSnapshot('previewelementDetails_basket',0.8);
        cy.get('@preview').within(() => {
            cy.get('.floating-text').should('have.text','AA010410, Sonderzubehör')
        })
    })
})