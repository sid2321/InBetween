import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'
import settingsSelectors from '../../../../selectors/settings-selection-selectors.json'
import akeneoPIMSelectors from '../../../../selectors/akeneo-PIM-selectors.json'


let oldProdDesc;
let oldProdPrice;
describe('Akeneo PIM chnages & Generations', () => {


it('Login to Akeneo PIM & Make changes', () => {

    cy.LoginAkeneoPIM(userData.akeneo_PIM_Url,userData.akeneo_PIM_Username,userData.akeneo_PIM_Password);
     cy.get(akeneoPIMSelectors.productSearchbox).type(userData.productID);
     cy.contains('Sivel').should('be.visible');
    
     cy.contains(userData.productID).click()
     cy.get(akeneoPIMSelectors.productTitle).should('be.visible');
    
     cy.get('[data-attribute="ib_description"]')
     .find('textarea')
     .as('proddesc').then(($value) => {
         oldProdDesc = $value.text()
     })

     cy.get('[data-attribute="ib_price"]')
     .find('.price-input').eq(2)
     .as('prodprice').then(($value) => {
         oldProdPrice = $value.text()
     })
    cy.get('@proddesc').clear().type(userData.productNewDesc);
    cy.get('@prodprice').clear().type(userData.productNewPrice);

    cy.get('.save').click();
    cy.wait(100)

    cy.get('[title="Super Admin"]').click();
    cy.get('.logout').click();
    cy.log("PIM data reverted");
        

})

        it(`IB Publisher generate showcase v1`,() => {
            let renameFileName
           cy.loginWithoutCaching(userData.userName,userData.userPassword,'Publisher',userData.login_url);
            cy.pageLoaded();
             cy.visit(`${userData.publisherLogin_URL}/`)
            cy.get('#loaderBox',{timeout:50000000}).should('not.be.visible')
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

