import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'
import settingsSelectors from '../../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../../selectors/element-selection-selectors.json'

describe('akeneo v1 showcase login open publication', () => {

    beforeEach(() => {
        cy.loginWithoutCaching(userData.userName,userData.userPassword,'Publisher',userData.login_url);
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

    let publications =  ['Brochure Clothing Summer 2021'
    ,'Catalog 2022','Catalog_2023'
 ,'Flyer Groceries 2022','Flyer Outdoor 2022', 
    'Flyer Outdoor 2023','Fresh Food','Groceries','Groceries 2023',
 'Jeans and Leggings','Packaged Food','Shirts and Hoodies','SKI']

    publications.forEach((publication) => {

        it(`IB Publisher generate showcase v1  - ${publication}`,() => {
    
            cy.visit(`${userData.publisherLogin_URL}/`)
            cy.get('#loaderBox',{timeout:50000000}).should('not.be.visible')
            cy.wait(5000)
            //cy.GenerateUsingPublisher('IB_Default_Showcase_V1',publication,'INDD')
            cy.GenerateINDDPackagingPublisher('IB_Default_Showcase_V1',publication)
         }) 

    })
  
    
})
