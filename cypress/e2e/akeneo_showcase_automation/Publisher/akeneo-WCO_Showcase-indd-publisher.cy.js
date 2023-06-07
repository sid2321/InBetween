import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'
import settingsSelectors from '../../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../../selectors/element-selection-selectors.json'

describe('akeneo wco showcase login open publication', () => {

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
        cy.renamezipfile('WCO_Showcase_INDD')
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
        cy.clearAllLocalStorage()
        
    })

    let publications =  ['Clothing_Catalog','Clothing_Dress','PriceList_Catalog',
    'Summer_Catalog','Trousers']

    publications.forEach((publication) => {

        it(`WCO_Showcase  - ${publication}`,() => {
    
            cy.visit(`${userData.publisherLogin_URL}/`)
            cy.get('#loaderBox',{timeout:50000000}).should('not.be.visible')
            cy.wait(5000)
            cy.GenerateINDDPackagingPublisher('WCO_Showcase',publication)
         }) 

    })
  
    
})
