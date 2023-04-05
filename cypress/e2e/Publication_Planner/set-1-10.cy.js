import userData from '../../../fixtures/user_info_planner.json'
import plannerSelector from '../../../selectors/planner-selectors.json'


describe('check all the UI elements and tool tips in planner', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Planner',userData.login_url);
        cy.pageLoaded();
    })
    
    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    it('check ui of publication planenr', () => {

        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.get(plannerSelector.appButton).click({force:true})
        cy.get(plannerSelector.dropDownPanel).within(() => {
            cy.get('a').eq(0).find('span').should('have.text',' Marketing Board ')
            cy.get('a').eq(1).find('span').should('have.text',' Publication Wizard ')
            cy.get('a').eq(2).find('span').should('have.text',' Publisher ')
            cy.get('a').eq(3).find('span').should('have.text',' JobAutomation ')
        })
    })

    it('check ui tooltp of publication planner', () => {

        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.get(plannerSelector.appButton)
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get('mat-tooltip-component').find('div')
                    .should('have.text','InBetween Apps')
                }) 
        cy.get('#majorText').click({force:true})        
        cy.contains('language')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get('mat-tooltip-component').find('div')
                    .should('have.text','Language')
                })  
        cy.get('#majorText').click({force:true})  
        cy.contains('E')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get('mat-tooltip-component').find('div')
                    .should('have.text','User : manager \nClick here to logout')
                })  
        cy.get('#majorText').click({force:true}) 
        cy.get("[alt='Logo']")
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get('mat-tooltip-component').find('div')
                    .should('have.text','IB Publication Planner')
                })  
        cy.get('#majorText').click({force:true})  
        cy.contains('library_books')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get('mat-tooltip-component').find('div')
                    .should('have.text','Publication')
                })  
    })

    it('change language to German', () => {
        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.contains('language').click({force:true})
        cy.get('.mat-menu-content').within(() => {
            cy.get('mat-radio-button').eq(1).find('input').click({force:true})
        })
        cy.get('.mat-menu-content').click({force:true})
        cy.wait(2000)
        cy.get('#majorText').click({force:true}).should('have.text',' Hallo. Willkommen im InBetween Publication Planner ')
        cy.get(plannerSelector.appButton)
                .invoke('show')
                .trigger('mouseenter',{force:true})
                .wait(1000).then(() => {
                    cy.get('mat-tooltip-component').find('div')
                    .should('have.text','InBetween Apps')
                }) 
        cy.get('#majorText').click({force:true})        
        cy.contains('language')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get('mat-tooltip-component').find('div')
                    .should('have.text','Sprache')
                })  
        cy.get('#majorText').click({force:true})  
        cy.contains('E')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get('mat-tooltip-component').find('div')
                    .should('have.text',"Benutzer : manager \nKlicken Sie hier, um sich abzumelden")
                })  
        cy.get('#majorText').click({force:true}) 
        cy.contains('library_books')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get('mat-tooltip-component').find('div')
                    .should('have.text','Veröffentlichung')
                })  
        cy.contains('language').click({force:true})
        cy.get('.mat-menu-content').within(() => {
            cy.get('mat-radio-button').eq(0).find('input').click({force:true})
        })
        cy.get('.mat-menu-content').click({force:true})
        cy.get(plannerSelector.appButton).click({force:true})
        cy.get(plannerSelector.dropDownPanel).each(($div) => {
            cy.wrap($div).within(() => {
                cy.get('a').eq(0).find('span').should('have.text',' Marketing Board ')
                cy.get('a').eq(1).find('span').should('have.text',' Publication Wizard ')
                cy.get('a').eq(2).find('span').should('have.text',' Publisher ')
                cy.get('a').eq(3).find('span').should('have.text',' JobAutomation ')
            })

        })

    })

    it('check dashboard tab', () => {
        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.contains('donut_large').click({force:true})
        cy.wait(5000)
        cy.compareSnapshot('preview',0.2)
        cy.contains('language').click({force:true})
        cy.get('.mat-menu-content').within(() => {
            cy.get('mat-radio-button').eq(1).find('input').click({force:true})
        })
        cy.get('.mat-menu-content').click({force:true})
        cy.contains('library_books')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get('mat-tooltip-component').find('div')
                    .should('have.text','Veröffentlichung')
                })  
        cy.contains('language').click({force:true})
        cy.get('.mat-menu-content').within(() => {
            cy.get('mat-radio-button').eq(0).find('input').click({force:true})
        })
        cy.get('.mat-menu-content').click({force:true})
        cy.contains('library_books')
                .invoke('show')
                .trigger('mouseenter')
                .wait(1000).then(() => {
                    cy.get('mat-tooltip-component').find('div')
                    .should('have.text','Publication')
                })  
    })

})




