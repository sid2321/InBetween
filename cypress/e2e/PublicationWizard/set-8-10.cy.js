import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info.json'
import elementBuilderSelectors from '../../../selectors/element-builder-selectors.json'
 
describe('touristic Builder_Preview Test', () => {

    beforeEach(() => {
        cy.login('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    const retryOptions = {
        limit: 5, // max number of retries
        delay: 500 // delay before next iteration, ms
    }

    it('touristic Project Open Publication', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.projectTouristic.projectName,projectData.projectTouristic.pubName);
        
    })

    it('grid view preview', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.projectTouristic.projectName,projectData.projectTouristic.pubName);
        cy.compareSnapshot('grid-preview',0.2,retryOptions)
        cy.get(elementBuilderSelectors.toolBar).within(() => {
            cy.get('button').eq(3).click();
        })
        cy.wait(25000)
       /* cy.intercept('GET','data:image/PNG;base64,**').as('waitforpreview');
        cy.wait('@waitforpreview', { timeout: 90000 }).then(($assert) => {
            expect($assert.response.statusCode).to.eq(200);
          });*/
        
        cy.get(elementBuilderSelectors.playArea).within(() => {
            cy.get('img')
            .eq(0)
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.equal(1240);
            });
        })
        cy.compareSnapshot('preview',0.2,retryOptions)
    })



})