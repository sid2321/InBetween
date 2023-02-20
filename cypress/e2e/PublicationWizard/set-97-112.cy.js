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
    it('check font family', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.get(pubScreenSelectors.mainToolbar).as('toolbar').should('have.css', 'font-family', '"Times New Roman", sans-serif');
        cy.get('@toolbar').should('be.visible').compareSnapshot('font-family',0.5);
    })

    it('header logo should not be displayed', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.get(pubScreenSelectors.mainToolbar).as('toolbar').within(() => {
            cy.get(pubScreenSelectors.ibLogo).should('not.exist');;
        })
        cy.get('@toolbar').should('be.visible').compareSnapshot('header-logo-not-exist',0.5);
    })

    it('Customer Logo and text should be displayed', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.get(elementBuilderSelectionSelectors.mainMenu).within(() => {
            cy.get('.text-modify').should('have.text','NEW LOGO')
            cy.waitUntil(() => cy.get('img').should('have.attr', 'src').should('include','logo.png'));
            cy.get('img').should('be.visible').compareSnapshot('customer-logo',0.5);
        })
    })

    it('check the top page panel color and background color', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.get('mat-toolbar').eq(0).as('panel')
        .should('have.css', 'background-color')
        .and('include', 'rgb(233, 150, 122)')
        
        cy.get('@panel').should('have.css', 'color')
        .and('include', 'rgba(0, 0, 128, 0.5)')
    })

    it('check the tab panel color and background colour', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.get('mat-ink-bar')
        .should('have.css', 'background')
        .and('include', 'rgb(159, 212, 88)')
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
                .and('include', 'rgb(110, 111, 42)')

                cy.get('@project').should('have.css', 'background-color')
                .and('include', 'rgb(159, 191, 223)')
            });

    })

    it('check the table header color', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.get(elementBuilderSelectionSelectors.stacktable).within(() => {
            cy.get('thead').as('tableHead')
            .should('have.css','background-color')
            .and('include', 'rgb(144, 213, 169)')

            cy.get('@tableHead').should('have.css','color')
            .and('include', 'rgb(204, 0, 0)')
        })
    })

    it('check the table selection color and background color', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click({force:true});
        })
        cy.selectStack(projectData.newRDU.sub);
        cy.wait(5000)
        cy.get('table')
        .find('tr').eq(1).find('td').eq(1).as('first').click({force:true});
        cy.get('table')
        .find('tr').eq(2).find('td').eq(1).as('second').click({
            shiftKey:true,
            force:true,
        })
        cy.get('@first').parent()
        .should('have.css','background-color')
        .and('include', 'rgb(198, 35, 173)')

        cy.get('@first').parent()
        .should('have.css','color')
        .and('include', 'rgb(255, 255, 255)')

        cy.get('@second').parent()
        .should('have.css','background-color')
        .and('include', 'rgb(198, 35, 173)')

        cy.get('@second').parent()
        .should('have.css','color')
        .and('include', 'rgb(255, 255, 255)')
    })


})