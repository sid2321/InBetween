import loginScreenSelectors from '../selectors/printAssistant/pa-login-selectors.json'
import dashboardSelectors from '../selectors/printAssistant/pa-dashboard-selectors.json'

Cypress.Commands.add('loginpa', (userID, password,url) => {
    cy.visit(url);
    cy.get(loginScreenSelectors.userName).type(userID);
    cy.get(loginScreenSelectors.password).type(password);
    cy.get(loginScreenSelectors.loginBtn).click();
    cy.url().should('contain', `/IBPrintAssistant/#/Project-selection`)
    cy.get(loginScreenSelectors.proceed).should('be.visible')
})

Cypress.Commands.add('selectProjectPA', (projName) => {
    cy.get(loginScreenSelectors.selecProj).within(() => {
        cy.contains(projName).click({ force:true })
    })
    cy.get(loginScreenSelectors.proceed).click();
    cy.get(dashboardSelectors.projectName).should('have.text',projName)
})

Cypress.Commands.add('dowanloadIBPrintAssistantGeneration', (renameFileName) => {
    cy.get('@download').within(() => {
        cy.get('button').within(() => {
            cy.get('.fileName').as('filename').find('.tooltiptext').invoke('text').then(file => {
                cy.window().document().then(function (doc) {
                    doc.addEventListener('click', () => {
                      setTimeout(() => { doc.location.reload( { force:true }) }, 2000)
                    })
                    cy.intercept('/', (req) => {
                        req.reply((res) => {
                          expect(res.statusCode).to.equal(200);
                        });
                    });
                    cy.get('@filename').click( { force:true })
                })
                const { join } = require('path')
                cy.verifyDownload(file, { timeout: 25000, interval: 600 });
                const downloadsFolder = Cypress.config('downloadsFolder');
                let downloadFilename = join(downloadsFolder, file)
                let result_downloadFilename = downloadFilename.replace("/", "\\");
                cy.log(result_downloadFilename);
                cy.exec(`rename ${result_downloadFilename} ${renameFileName}`)
            
            })
        })
    })   
})