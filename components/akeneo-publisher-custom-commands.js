import projectData from '../fixtures/project_publication.json'
import userData from '../fixtures/user_info_akeneo.json'
import settingsSelectors from '../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../selectors/element-selection-selectors.json'
import publisherSelectors from '../selectors/akeneo-Publisher-selectors.json'

Cypress.Commands.add('GenerateUsingPublisher', (project,publication,format) => {
    cy.get(publisherSelectors.projectList).within(() =>{
        cy.get(publisherSelectors.selectArrow).click({force:true})
    })
    cy.wait(2000)
    cy.get(publisherSelectors.selectDropdown).within(() => {
        cy.contains(project).click({force:true})
    })
    cy.get(publisherSelectors.generationType).within(() => {
        cy.get(publisherSelectors.selectArrow).click({force:true})
    })
    cy.wait(2000)
    cy.get(publisherSelectors.selectDropdown).within(() => {
        cy.contains('Publication').click({force:true})
    })
    cy.get(publisherSelectors.publicationList).within(() => {
        cy.get(publisherSelectors.selectArrow).click({force:true})
    })
    cy.wait(2000)
    cy.get(publisherSelectors.selectDropdown).within(() => {
        cy.contains(publication).click({force:true})
    })
    cy.get(publisherSelectors.outputFormat).within(() => {
        cy.get(publisherSelectors.selectArrow).click({force:true})
    })
    cy.wait(2000)
    cy.get(publisherSelectors.selectDropdown).within(() => {
        cy.contains(format).click({force:true})
    })
    cy.get(publisherSelectors.generateBtn).click({force:true})
    cy.wait(10000)

    cy.get('#jobListTable').within(() => {
        cy.get('tbody').find('tr').as('generated').then((generated) => {
            cy.get('@generated').eq(generated.length-2).find(publisherSelectors.downloadProgressBar,
                { timeout: 25000000, interval: 600 }).should('have.attr','aria-valuenow','100')
        })
    })
    cy.get(publisherSelectors.downloadProgressBar, { timeout: 250000000, interval: 600 }).should('have.attr','aria-valuenow','100')
})

Cypress.Commands.add('DownloadandRenameFile', (newfilename) => {

    cy.window().document().then(function (doc) {
        doc.addEventListener('click', () => {
          setTimeout(() => { doc.location.reload( { force:true }) }, 2000)
        })
        cy.intercept('/', (req) => {
            req.reply((res) => {
              expect(res.statusCode).to.equal(200);
            });
        });
        cy.get('@jobList').find('button').as('downloadButton').eq(2).should('exist').click();
    })
    const { join } = require('path')
    cy.get('@filename').invoke('text').then((file) => {
        cy.verifyDownload(file, { timeout: 25000, interval: 600 });
        const downloadsFolder = Cypress.config('downloadsFolder');
        let downloadFilename = join(downloadsFolder, file)
        let result_downloadFilename = downloadFilename.replace("/", "\\");
        cy.log(result_downloadFilename);
        cy.exec(`rename "${result_downloadFilename}" "${newfilename}"`)

    }) 
    cy.get('@jobList').find('button').eq(3).should('exist').click();
    //cy.get('@downloadButton',{ timeout: 25000, interval: 600 }).should('not.exist');
    
}) 



