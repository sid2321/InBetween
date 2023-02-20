import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'

describe('Element Selection Test', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    const retryOptions = {
        limit: 5, // max number of retries
        delay: 500 // delay before next iteration, ms
    }

    it('Element Selection Test and clear filter - RDU Project', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.element_selection);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.selectStack(projectData.newRDU.stackRDU);
        cy.get('[aria-label="LegalValidationStatus"]').click();
        cy.wait(500);
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.contains('To be validated').click({force: true});   
        })

        cy.get('[aria-label="RangeStatus"]').click();
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.contains('In range 15').click({force: true});   
        })
        cy.get('table')
            .find('tr').should('have.length',3).eq(1)
            .within(() => {
                cy.get('td').eq(3).contains('To be validated');
            }) 
        cy.get(elementSelectionSelectors.stackTable).compareSnapshot('stack-filter',0.5,retryOptions);   
        cy.get(elementSelectionSelectors.clearStack).click();
        cy.get('table')
            .find('tr').then(($tr) => {
                expect($tr).to.have.lengthOf.greaterThan(2);
            })
        cy.get(elementSelectionSelectors.stackTable).compareSnapshot('stack-clear-filter',0.5,retryOptions);    
    })


    it('stack search functionality', () => {

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.element_selection);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.selectStack(projectData.newRDU.sub);
        cy.get('table')
        .find('tr', { timeout:25000 }).should('have.length',6).eq(4)
        .within(() => {
            cy.get('td').eq(1).contains('Spider');
        }) 
        cy.get(elementSelectionSelectors.stackPanelToolBar).within(()=>{
            cy.get('button').eq(0).click();
            cy.get('input').type('spider')
        })
        cy.get('table')
        .find('tr').should('have.length',3).eq(1)
        .within(() => {
            cy.get('td').eq(1).contains('Spider');
        }) 
    })

    it('move element to basket', () => {

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.element_selection);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.selectStack(projectData.RDU.sub);
        cy.waitUntil(() => cy.get('#stackelm').find('tr').should('have.length.greaterThan',4))
        cy.get(elementSelectionSelectors.stackPanelToolBar).within(()=>{
            cy.get('button').eq(0).click();
            cy.get('input').type('origi')
        })
        cy.wait(2000)
        cy.get('#stackelm').find('tr').eq(0).within(() => {
            cy.get('td', { timeout: 150000 }).eq(1).contains("Original")
        })
        cy.get(elementSelectionSelectors.buttonGroup).within(() => {
            cy.get('button').eq(1).click();
            cy.get('button').eq(2).click();
        })
        
        //cy.saveProject();
        //cy.wait(500);
        cy.get(elementSelectionSelectors.buttonGroup).within(() => {
            cy.get('button').eq(3).click();
            cy.wait(500);
            cy.get('button').eq(3).click();
            cy.get('button').eq(4).click();
        })
        cy.get(elementSelectionSelectors.Basket)
            .find('tr').should('have.length',1)
        cy.saveProject();
    })



})