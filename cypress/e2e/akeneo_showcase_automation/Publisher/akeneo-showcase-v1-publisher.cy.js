import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'
import settingsSelectors from '../../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../../selectors/element-selection-selectors.json'
import annotationManager from '../../../../selectors/annotation-selectors.json'



describe('akeneo v1 showcase login open publication', () => {

    beforeEach(() => {
        cy.login(userData.userName,userData.userPassword,'Publisher',userData.login_url);
        cy.pageLoaded();
    })


    /*afterEach(() => {
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
        cy.clearAllLocalStorage()
    })*/

   
    it('IB Publisher generate showcase v1', () => {

        let renameFileName  = 'fresh Food_dup.pdf'
        cy.visit(`${userData.publisherLogin_URL}/`)
        cy.get('#loaderBox',{timeout:50000000}).should('not.be.visible')
        cy.wait(5000)
        cy.GenerateUsingPublisher('IB_Default_Showcase_V1','Fresh Food _dup','PDF')
        cy.get('#jobListTable').as('jobList').within(() => {
            cy.get('td').eq(1).as('filename')
        })
        cy.disablePopUp();
        cy.window().document().then(function (doc) {
            doc.addEventListener('click', () => {
              setTimeout(() => { doc.location.reload( { force:true }) }, 2000)
            })
            cy.intercept('/', (req) => {
                req.reply((res) => {
                  expect(res.statusCode).to.equal(200);
                });
            });
            cy.get('@jobList').find('button').as('downloadButton').eq(0).should('exist').click();
        })
        const { join } = require('path')
        cy.get('@filename').invoke('text').then((file) => {
            cy.verifyDownload(file, { timeout: 25000, interval: 600 });
            const downloadsFolder = Cypress.config('downloadsFolder');
            let downloadFilename = join(downloadsFolder, file)
            let result_downloadFilename = downloadFilename.replace("/", "\\");
            cy.log(result_downloadFilename);
            cy.exec(`rename ${result_downloadFilename} ${renameFileName}`)
    
        }) 
        cy.get('@jobList').find('button').eq(1).should('exist').click();
        cy.get('@downloadButton',{ timeout: 25000, interval: 600 }).should('not.exist');
        
    })    
})