import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'
import settingsSelectors from '../../../../selectors/settings-selection-selectors.json'
import akeneoPIMSelectors from '../../../../selectors/akeneo-PIM-selectors.json'

describe('Akeneo PIM changes & Generations', () => {

    beforeEach(() => {
        cy.login(userData.publisherUserName,userData.publisherUserPassword,'Publisher',userData.login_url);
        cy.pageLoaded();
    })

it('Login to Akeneo PIM & Make changes', () => {

    cy.visit(`${userData.publisherLogin_URL}/`)
    cy.get('#loaderBox',{timeout:50000000}).should('not.be.visible')
    cy.wait(5000)

    cy.makechangesToPIM();

    cy.get(akeneoPIMSelectors.dataRefresh).click()
    cy.wait(1000)
    cy.contains('OK').click();

    cy.contains('Clear Cache').click();
    cy.contains('OK').click();

    cy.wait(5000)
    cy.GenerateUsingPublisher('IB_Default_Showcase_V1','Jeans and Leggings','PDF')
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
cy.get('#noJobsMessage').should('exist')

cy.clearAllCookies()
cy.clearAllSessionStorage()
cy.clearAllLocalStorage()
    
        

})

      
it('Revert Akeneo PIM changes', () => {

            cy.LoginAkeneoPIM(userData.akeneo_PIM_Url,userData.akeneo_PIM_Username,userData.akeneo_PIM_Password);

            cy.get(akeneoPIMSelectors.pimProducts).click();
            cy.get(akeneoPIMSelectors.productSearchbox).type(userData.productID);
            cy.contains('Sivel').should('be.visible');
            cy.contains(userData.productID).click()
            cy.get(akeneoPIMSelectors.productTitle).should('be.visible');

            cy.get('[data-attribute="ib_description"]')
            .find('textarea')
            .clear().type(userData.oldProductDesc);
       
            cy.get('[data-attribute="ib_price"]')
            .find('.price-input').eq(2)
            .clear().type(userData.oldProductPrice);
        
            cy.get('.save').click();
            cy.wait(100)

            cy.get('[title="Super Admin"]').click();
            cy.get('.logout').click();

            cy.log("PIM data reverted");
                
        })
        
    
      })

