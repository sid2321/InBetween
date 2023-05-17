// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loginScreenSelectors from '../../selectors/login-screen-selectors.json'
import projSelection from '../../selectors/publication-screen-selectors.json'
import elementBuilderSelectors from '../../selectors/element-builder-selectors.json'
import pubScreenSelectors from '../../selectors/publication-screen-selectors.json'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

Cypress.Commands.add('selectPublication', (projName,pubName) => {
    const publication = pubName.trim();
    cy.wait(5000);
    cy.get(projSelection.projectSelector).within(() => {
            cy.get(projSelection.projectDropDown).within(() => {
                cy.get('span').click()
            })
    })
    cy.get(projSelection.projPanel).should('be.visible');
    cy.contains(projName).click();
    cy.get(projSelection.publicatiionSelector).within(() => {
        cy.get('span').click();
    })
    cy.get(projSelection.pubPanel).should('be.visible').within(() => {
        cy.contains(pubName).click();
    });
    cy.get(projSelection.openPub).click();
    cy.wait('@waitforLoad').its('response.statusCode').should('eq', 200);
    cy.get(elementBuilderSelectors.topSubMenu,{ timeout: 150000 }).within(() => {
        cy.get('span').eq(0).contains(publication)
    })
});

Cypress.Commands.add('duplicatePublication', (projName,masterPubName,newPubName) => {

    const publication = newPubName.trim();
    cy.wait(2000);
    cy.contains('Duplicate Publication').click();
    cy.get(pubScreenSelectors.dupSelectProj).click()
    cy.wait(3000);
    cy.get(pubScreenSelectors.deupSelProjPanel).within(() => {
        cy.contains(projName).click();
    })
    cy.get(pubScreenSelectors.dupSelPub).click();
    cy.get(pubScreenSelectors.dupSelPubPanel).within(() => {
        cy.contains(masterPubName).click();
    })
    cy.get(pubScreenSelectors.dupNewPubName).type(newPubName);
    cy.get(pubScreenSelectors.buttonDupPub).click();
    cy.wait('@waitforLoad').its('response.statusCode').should('eq', 200);
    cy.get(elementBuilderSelectors.topSubMenu).within(() => {
        cy.get('span').eq(0).contains(publication)
    })
})

Cypress.Commands.add('createNewPublication',(projName,masterPubName,newPubName) => {

    cy.contains('New Publication').click();
    cy.wait(2000);
    cy.get(pubScreenSelectors.newSelProject).click();
    cy.get(pubScreenSelectors.newPubProjSelectPanel).within(() => {
        cy.contains(projName).should('be.visible').click();
    })
    cy.get(pubScreenSelectors.newMasterPublication).click();
    cy.get(pubScreenSelectors.newMasterPubSelectPanel).within(() => {
        cy.contains(masterPubName).should('be.visible').click();
    })
    cy.get(pubScreenSelectors.newPubName).type(newPubName);
    cy.get(pubScreenSelectors.createNewPub).should('be.visible').click({ force: true });
    cy.wait('@waitforLoad').its('response.statusCode').should('eq', 200);
    cy.get(elementBuilderSelectors.topSubMenu, { timeout: 150000 }).within(() => {
        cy.get('span').eq(0).contains(newPubName.trim())
    })
})

Cypress.Commands.add('loginWithoutCaching', (userID, password, product,url) => {
    let app = product.replace(/ /g, ""); 
        cy.visit(url);
        cy.title().should('eq','InBetween SSO');
        cy.get(loginScreenSelectors.userName).type(userID);
        cy.get(loginScreenSelectors.userPassword).type(password);
        cy.get(loginScreenSelectors.selectProductDropdown).within(() => {
            cy.get('input').click();
        })
        cy.get(loginScreenSelectors.loginForm).within(() => {
            switch(product) {
                case 'Publication Wizard':     
                        cy.get('ul').find('li').eq(1).click();
                    break;
                case 'Publisher':
                        cy.get('ul').find('li').eq(2).click();
                    break;  
                case 'Marketing Board':
                        cy.get('ul').find('li').eq(3).click();
                    break;         
                case 'Publication Planner':
                        cy.get('ul').find('li').eq(4).click();
                    break;
                case 'Job Automation':
                        cy.get('ul').find('li').eq(5).click();
                    break;               
                default:
                cy.get(loginScreenSelectors.loginForm).within(() => {
                        cy.get('ul').find('li').eq(1).click();
                })       
            }
            cy.get(loginScreenSelectors.loginButton).click();
            if(product==='Publisher'){
                cy.url().should('contain', `/IBPublisher/`)
            }else{

            cy.url().should('contain', `/${app}/`)
            }
            
        })
})

Cypress.Commands.add('inValidLogin', (userID, password, product) => {
        cy.title().should('eq','InBetween SSO');
        cy.get(loginScreenSelectors.userName).type(userID);
        cy.get(loginScreenSelectors.userPassword).type(password);
        cy.get(loginScreenSelectors.selectProductDropdown).within(() => {
            cy.get('input').click();
        })
        cy.get(loginScreenSelectors.loginForm).within(() => {
            switch(product) {
                case 'Publication Wizard':     
                        cy.get('ul').find('li').eq(1).click();
                    break;
                case 'Publisher':
                        cy.get('ul').find('li').eq(2).click();
                    break;  
                case 'Marketing Board':
                        cy.get('ul').find('li').eq(3).click();
                    break;        
                case 'Marketing Board':
                        cy.get('ul').find('li').eq(4).click();
                    break;    
                case 'Publication Planner':
                        cy.get('ul').find('li').eq(5).click();
                    break;
                case 'Job Automation':
                        cy.get('ul').find('li').eq(6).click();           
                default:
                cy.get(loginScreenSelectors.loginForm).within(() => {
                        cy.get('ul').find('li').eq(1).click();
                })       
            }
            cy.get(loginScreenSelectors.loginButton).click();
        })
})

Cypress.Commands.add('toolTipValidate', (selector) => {
    cy.get(selector)
    .invoke('show')
    .trigger('mouseenter')
    .wait(1000).then(() => {
        cy.get('mat-tooltip-component').find('div')
        .should('have.text','InBetween Apps')
    })   
})

Cypress.Commands.add('logintoplannerinDifferentbrowser',() => {
    cy.task('loginPlanner')
})
const compareSnapshotCommand = require('cypress-image-diff-js/dist/command')
compareSnapshotCommand()
