import userData from '../../../../fixtures/user_info_planner.json'
import plannerSelector from '../../../../selectors/planner-selectors.json'


describe('check test cases from creating new publication and section v4', () => {

    const retryOptions = {
        limit: 5, // max number of retries
        delay: 500 // delay before next iteration, ms
    }

    beforeEach(() => {
        cy.loginWithoutCaching('Simon','Simon','Publication Planner',userData.login_url);
        cy.pageLoaded();
    })
    
    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    function todaysDate () {
        const dateObject = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
        let date = dateObject.toLocaleString('en-IN', options);
        return date;
    }

    it('check publication data', () => {

        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.wait(2000)
        cy.get(plannerSelector.projSelPlanner).find('span').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projecSelPlannerpanel).within(() =>{
            cy.contains(' IB_Akeneo_Showcase_V4 ').click({force:true})
        })
        cy.get('app-table').should('be.visible')
        cy.wait(2000)
        cy.get(plannerSelector.projectPubPlanner).click({force:true})
        cy.get(plannerSelector.projectPubPlannerPanel).within(() => {
            cy.contains(' Akeneo_Catalog ').click({force:true})
        })
        cy.get(plannerSelector.searchPublication).as('search').type('Akeneo Products')
        cy.get('app-table').within(() => {
            cy.get('mat-row').should('have.length',1)
        })
        cy.get('@search').clear().type('Akeneo')
        cy.get('app-table').within(() => {
            cy.get('mat-row').as('elements').should('have.length',2)
            cy.get('@elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    cy.get('@elements').eq(i).find('mat-cell')
                    .eq(0).within(() =>{
                        cy.get('span').eq(1)
                        .invoke('text').then(text => {
                            console.log(text)
                            let result = text.includes('Akeneo')
                            if(!result){ assert.fail('doesnt include Akeneo')}
                        })
                    })
                }
            })
        })
    })

    it('check for new publication', () => {

        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.wait(2000)
        cy.get(plannerSelector.newPub).click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.createNewPubForm).within(() => {
            cy.get(plannerSelector.projectPanel).click({force:true})
        })
        cy.contains(' IB_Akeneo_Showcase_V4 ').click({force:true})
        cy.get(plannerSelector.createNewPubForm).within(() => {
            cy.get('[panelclass="panelClassForCNPublications"]').click({force:true})
        })
        cy.contains(' Akeneo_Catalog ').click({force:true})
        cy.get(plannerSelector.createNewPubForm).within(() => {
            cy.get('mat-form-field').eq(2).find('input')
            .type('Akeneo Products_Demo')
        })
        cy.get('[title="Next"]').click({force:true})
        cy.contains('en_US').click({force:true})
        cy.get('[title="OK"]').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projSelPlanner).find('span').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projecSelPlannerpanel).within(() =>{
            cy.contains(' IB_Akeneo_Showcase_V4 ').click({force:true})
        })
        cy.get('app-table').should('be.visible')
        cy.wait(2000)
        cy.get(plannerSelector.projectPubPlanner).click({force:true})
        cy.get(plannerSelector.projectPubPlannerPanel).within(() => {
            cy.contains(' Akeneo_Catalog ').click({force:true})
        })
        cy.get(plannerSelector.searchPublication).as('search').type('Akeneo Products_Demo')
        cy.get('#EDIT').click({force:true})
        cy.get('.editLanguageFlagIcon').click({force:true})
        cy.get('.editlanguageflags').within(() => {
            cy.get('#de_DE').click({force:true})
        })
        cy.get('.editLanguageFlagIcon').click({force:true})
        cy.get('.workflowStageInput').find('svg').click({force:true})
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('Distribution').click({force:true})
        })
        cy.get('#userName_Akeneo\\ Products_Demo').find('svg').click({force:true})
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('InBetween Project Manager').click({force:true})
        })

        cy.get('#editDisabled_Akeneo\\ Products_Demo').within(() => {
            cy.get('span').eq(1).find('img').click({force:true})
        })
        cy.get('#workflowStageText_Akeneo\\ Products_Demo').should('have.text',' Marketing ')
        cy.get('#userName_Akeneo\\ Products_Demo').find('span').eq(0).should('have.text',' Assignee ')
       

    })


    it('check publication preview', () => {

        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.wait(2000)
        cy.get(plannerSelector.projSelPlanner).find('span').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projecSelPlannerpanel).within(() =>{
            cy.contains(' IB_Akeneo_Showcase_V4 ').click({force:true})
        })
        cy.get(plannerSelector.searchPublication).as('search').type('Akeneo Products_Demo')
        cy.get('#titleSpan_Akeneo\\ Products_Demo').should('be.visible')
        cy.wait(2000)
        cy.get('#expandButton_Akeneo\\ Products_Demo').click({ force:true })
        cy.get('#detail_row_Akeneo\\ Products_Demo').as('section_detail')
        cy.get('@section_detail').find('.pageImageDimensions').as('page').should('be.visible').and('have.length.greaterThan',50)
        cy.get('.pub_preview-btn').click({force:true})
        cy.wait(5000)
        cy.get('[alt="Loading..."]',{ timeout: 500000 }).should('not.exist')
        cy.get('@page').should('have.length.greaterThan',200)
        cy.get('#detail_row_Akeneo\\ Products_Demo').compareSnapshot('check preview v4 showcase',0.2,retryOptions)
    })
})