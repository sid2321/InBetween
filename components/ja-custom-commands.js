import jaDashboard from '../selectors/jobAutomation/ja-dashboard-selectors.json'

Cypress.Commands.add('saveJob',() => {
    cy.get(jaDashboard.outputDirectory).clear({force:true}).type('D:\JobAUtomation', {force:true})
    cy.contains('SAVE').click({force:true})
})

Cypress.Commands.add('selectProject', (projName) => {
    cy.get(jaDashboard.selectProject).eq(0).find('mat-select').within(() => {
        cy.contains('expand_more').click({force:true});
    })
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains(projName).click();
    })
})

Cypress.Commands.add('uploadINDDFile',(file) => {
    cy.get(jaDashboard.docfile).selectFile([file],{force:true})
    cy.wait(5000)
    cy.get(jaDashboard.closeFileUploader).click();
})

Cypress.Commands.add('outDirectoryFileName', (fileName) => {
    cy.get(jaDashboard.outputFileName).clear({force:true}).type(fileName,{force:true})
})