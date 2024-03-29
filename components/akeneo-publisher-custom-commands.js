import projectData from '../fixtures/project_publication.json'
import userData from '../fixtures/user_info_akeneo.json'
import settingsSelectors from '../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../selectors/element-selection-selectors.json'
import publisherSelectors from '../selectors/akeneo-Publisher-selectors.json'
import akeneoPIMSelectors from '../selectors/akeneo-PIM-selectors.json'

Cypress.Commands.add('generateINDD',(lang) => {
    let language = lang.trim();
    let renameFileName = `akeneo-v1-showcase-${language}.indd`
    cy.get("[aria-label='Output Formats']").click();
        cy.contains(' INDD ').click();
        cy.get("button[type='submit']").click();
        cy.get("[aria-label='Log Languages']").click();
        cy.contains(lang).click();
        cy.get('.progress-bar',{ timeout: 175000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);  
})

Cypress.Commands.add('GenerateHiresPDF', (lang) => {
    let language = lang.trim();
    let renameFileName = `akeneo-v1-showcase-pdf-${language}.pdf`
    cy.get("[aria-label='Output Formats']").click();
        cy.contains(' HIRES-PDF ').click({ force:true });
        cy.get("[aria-label='Log Languages']").click();
        cy.contains(lang).click();
        cy.get("button[type='submit']").click();
        cy.get('.progress-bar',{ timeout: 150000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);
})
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

Cypress.Commands.add('LoginAkeneoPIM', (akeneoPIMUrl,usernamePIM,passwordPIM) => {
    cy.visit(akeneoPIMUrl);
    cy.get(akeneoPIMSelectors.akeneoPIMUser).type(usernamePIM);
    cy.get(akeneoPIMSelectors.akeneoPIMPass).type(passwordPIM);
    cy.get(akeneoPIMSelectors.pimLogin).should('be.visible');
    cy.get(akeneoPIMSelectors.pimLogin).click();
    cy.get(akeneoPIMSelectors.pimProducts).should('be.visible').click();
    cy.log("Login to akeneo PIM successfull");
})

Cypress.Commands.add('GenerateINDDPackagingPublisher', (project,publication) => {
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
        cy.contains('INDD').click({force:true})
    })

    cy.log("Setup INDD Packaging");

    cy.wait(2000)
    cy.get(publisherSelectors.includeUpdateInfo).eq(0).check({force : true});
    cy.wait(100)
    cy.get(publisherSelectors.includeUpdateBiInfo).check({force : true});
    cy.wait(100)
    cy.get(publisherSelectors.includeUpdateVariable).check({force : true});
    cy.wait(100)
    cy.get(publisherSelectors.createIndesignPackage).check({force : true});
    cy.wait(2000)

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


Cypress.Commands.add('UpdatePIMChanges', (productID,pricetype,price) => {
    cy.get(akeneoPIMSelectors.pimProducts).click();
            cy.get(akeneoPIMSelectors.productSearchbox).type(productID);
            cy.contains(productID).click()
            cy.get(akeneoPIMSelectors.productTitle).should('be.visible');

            cy.xpath("//input[@data-currency='"+pricetype+"']").clear().type(price);
            cy.get('.save').click();
            cy.wait(100)

            cy.get('[title="Super Admin"]').click();
            cy.get('.logout').click();
            cy.log("Data Changed");


})



