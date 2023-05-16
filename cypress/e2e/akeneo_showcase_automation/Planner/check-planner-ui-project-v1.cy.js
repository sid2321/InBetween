import userData from '../../../../fixtures/user_info_planner.json'
import plannerSelector from '../../../../selectors/planner-selectors.json'


describe('check all the UI elements and tool tips in planner', () => {

    const retryOptions = {
        limit: 5, // max number of retries
        delay: 500 // delay before next iteration, ms
    }


    before(() => {
        cy.login('Simon','Simon','Publication Planner',userData.login_url);
        cy.pageLoaded();
    })
    
    after(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    it('check ui of publication planenr', () => {

        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.get(plannerSelector.topToolbar).find('button').eq(0).as('app').click({force:true})
        cy.get(plannerSelector.dropDownPanel).within(() => {
            cy.get('a').eq(0).find('span').should('have.text',' Publication Wizard ')
        })
        cy.get(plannerSelector.topToolbar).compareSnapshot('check ui planner',0.2,retryOptions)
        cy.get(plannerSelector.appDashboard).compareSnapshot('check app dashboard',0.2,retryOptions)
        cy.reload();
        cy.get(plannerSelector.topToolbar).find('button').eq(0)
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get(plannerSelector.toolTip).find('div')
                    .should('have.text','InBetween Apps')
                }) 
        cy.get(plannerSelector.webText).click({force:true})        
        cy.contains('language')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get(plannerSelector.toolTip).find('div')
                    .should('have.text','Language')
                })  
        cy.get(plannerSelector.webText).click({force:true})  
        cy.contains('E')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get(plannerSelector.toolTip).find('div')
                    .should('have.text','User : Simon \nClick here to logout')
                })  
        cy.get(plannerSelector.webText).click({force:true}) 
        cy.get("[alt='Logo']")
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get(plannerSelector.toolTip).find('div')
                    .should('have.text','IB Publication Planner')
                })  
        cy.get(plannerSelector.webText).click({force:true})  
        cy.contains('library_books')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get(plannerSelector.toolTip).find('div')
                    .should('have.text','Publication')
                })  
        cy.contains('language').click({force:true})
        cy.get(plannerSelector.dropdownCard).within(() => {
            cy.get('mat-radio-button').eq(1).find('input').click({force:true})
        })
        cy.get(plannerSelector.dropdownCard).click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.webText).click({force:true}).should('have.text',' Hallo. Willkommen im InBetween Publication Planner ')
        cy.get(plannerSelector.topToolbar).find('button').eq(0)
                .invoke('show')
                .trigger('mouseenter',{force:true})
                .wait(1000).then(() => {
                    cy.get(plannerSelector.toolTip).find('div')
                    .should('have.text','InBetween Apps')
                }) 
        cy.get(plannerSelector.webText).click({force:true})        
        cy.contains('language')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get(plannerSelector.toolTip).find('div')
                    .should('have.text','Sprache')
                })  
        cy.get(plannerSelector.webText).click({force:true})  
        cy.contains('E')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get(plannerSelector.toolTip).find('div')
                    .should('have.text',"Benutzer : Simon \nKlicken Sie hier, um sich abzumelden")
                })  
        cy.get(plannerSelector.webText).click({force:true}) 
        cy.contains('library_books')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get(plannerSelector.toolTip).find('div')
                    .should('have.text','Veröffentlichung')
                })  
        cy.contains('language').click({force:true})
        cy.get(plannerSelector.dropdownCard).within(() => {
            cy.get('mat-radio-button').eq(0).find('input').click({force:true})
        })
        cy.get(plannerSelector.dropdownCard).click({force:true})
        cy.get(plannerSelector.topToolbar).find('button').eq(0).click({force:true})
        cy.get(plannerSelector.dropDownPanel).each(($div) => {
            cy.wrap($div).within(() => {
                cy.get('a').eq(0).find('span').should('have.text',' Publication Wizard ')
            })

        })
        cy.reload();
        cy.contains('donut_large').click({force:true})
        cy.wait(5000)
        cy.compareSnapshot('preview',0.2)
        cy.contains('language').click({force:true})
        cy.get(plannerSelector.dropdownCard).within(() => {
            cy.get('mat-radio-button').eq(1).find('input').click({force:true})
        })
        cy.get(plannerSelector.dropdownCard).click({force:true})
        cy.contains('library_books')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get(plannerSelector.toolTip).find('div')
                    .should('have.text','Veröffentlichung')
                })  
        cy.contains('language').click({force:true})
        cy.get(plannerSelector.dropdownCard).within(() => {
            cy.get('mat-radio-button').eq(0).find('input').click({force:true})
        })
        cy.get(plannerSelector.dropdownCard).click({force:true})
        cy.contains('library_books')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get(plannerSelector.toolTip).find('div')
                    .should('have.text','Publication')
                })  
    })

})




