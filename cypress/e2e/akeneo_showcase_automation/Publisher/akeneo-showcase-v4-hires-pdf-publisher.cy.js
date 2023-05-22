import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'
import settingsSelectors from '../../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../../selectors/element-selection-selectors.json'

describe('akeneo v4 showcase login open publication', () => {

    beforeEach(() => {
       cy.login(userData.publisherUserName,userData.publisherUserPassword,'Publisher',userData.login_url); 
       cy.pageLoaded();
    })
   
    after(() => {
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
            cy.get('#downloadAll').click({force:true})
        })
        cy.wait(2000)
        cy.get('#loaderBox',{timeout:50000000}).should('not.be.visible')
        cy.verifyDownload('.zip', { contains: true });
        cy.get('#deleteAll').click({force:true})
        cy.wait(2000)
        cy.get('#noJobsMessage').should('exist')
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
        cy.clearAllLocalStorage()
        
    })

    let publications =  ['Akeneo Demo 2023','Akeneo Products','Catalog 2022','Catalog_2023']
    publications.forEach((publication) => {

        it(`IB Publisher generate showcase v4  - ${publication}`,() => {

            cy.visit(`${userData.publisherLogin_URL}/`)
            cy.get('#loaderBox',{timeout:50000000}).should('not.be.visible')
            cy.wait(5000)
            cy.GenerateUsingPublisher('IB_Akeneo_Showcase_V4',publication,'HIRES-PDF')
         }) 

    })
    
})
