import userData from '../../../../fixtures/user_info_planner.json'
import plannerSelector from '../../../../selectors/planner-selectors.json'


describe('check test cases from creating new publication and section v2', () => {
    
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
            cy.contains(' IB_Default_Showcase_V2 ').click({force:true})
        })
        cy.get('app-table').should('be.visible')
        cy.wait(2000)
        cy.get(plannerSelector.projectPubPlanner).click({force:true})
        cy.get(plannerSelector.projectPubPlannerPanel).within(() => {
            cy.contains(' Groceries ').click({force:true})
        })
        cy.get(plannerSelector.searchPublication).as('search').type('Flyer Groceries 2022')
        cy.get('app-table').within(() => {
            cy.get('mat-row').should('have.length',1)
        })
        cy.get('@search').clear().type('Groceries')
        cy.get('app-table').within(() => {
            cy.get('mat-row').as('elements').should('have.length',3)
            cy.get('@elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    cy.get('@elements').eq(i).find('mat-cell')
                    .eq(0).within(() =>{
                        cy.get('span')
                        .invoke('text').then(text => {
                            let result = text.toLocaleLowerCase().includes('groceries')
                            if(!result){ assert.fail('doesnt include Groceries')}
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
        cy.contains(' IB_Default_Showcase_V2 ').click({force:true})
        cy.get(plannerSelector.createNewPubForm).within(() => {
            cy.get('[panelclass="panelClassForCNPublications"]').click({force:true})
        })
        cy.contains(' Groceries ').click({force:true})
        cy.get(plannerSelector.createNewPubForm).within(() => {
            cy.get('mat-form-field').eq(2).find('input')
            .type('Groceries_Demo')
        })
        cy.get('[title="Next"]').click({force:true})
        cy.contains('en_GB').click({force:true})
        cy.get('[title="OK"]').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projSelPlanner).find('span').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projecSelPlannerpanel).within(() =>{
            cy.contains(' IB_Default_Showcase_V2 ').click({force:true})
        })
        cy.get('app-table').should('be.visible')
        cy.wait(2000)
        cy.get(plannerSelector.projectPubPlanner).click({force:true})
        cy.get(plannerSelector.projectPubPlannerPanel).within(() => {
            cy.contains(' Groceries ').click({force:true})
        })
        cy.get(plannerSelector.searchPublication).as('search').type('Groceries_Demo')
        cy.get('#EDIT').click({force:true})
        cy.get('.editLanguageFlagIcon').click({force:true})
        cy.get('.editlanguageflags').within(() => {
            cy.get('#en_US').click({force:true})
        })
        cy.get('.editLanguageFlagIcon').click({force:true})
        cy.get('.workflowStageInput').find('svg').click({force:true})
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('Distribution').click({force:true})
        })
        cy.get('#userName_Groceries_Demo').find('svg').click({force:true})
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('InBetween Project Manager').click({force:true})
        })

        cy.get('#editDisabled_Groceries_Demo').within(() => {
            cy.get('span').eq(1).find('img').click({force:true})
        })
        cy.get('#workflowStageText_Groceries_Demo').should('have.text',' Marketing ')
        cy.get('#userName_Groceries_Demo').find('span').eq(0).should('have.text',' Assignee ')
       

    })


    it('check publication preview', () => {

        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.wait(2000)
        cy.get(plannerSelector.projSelPlanner).find('span').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projecSelPlannerpanel).within(() =>{
            cy.contains(' IB_Default_Showcase_V2 ').click({force:true})
        })
        cy.get(plannerSelector.searchPublication).as('search').type('Groceries_Demo')
        cy.get('#titleSpan_Groceries_Demo').should('be.visible')
        cy.wait(2000)
        cy.get('#expandButton_Groceries_Demo').click({ force:true })
        cy.get('#detail_row_Groceries_Demo').as('section_detail')
        cy.get('@section_detail').find('.pageImageDimensions').as('page').should('be.visible').and('have.length',2)
        cy.get('.pub_preview-btn').click({force:true})
        cy.wait(5000)
        cy.get('[alt="Loading..."]',{ timeout: 200000 }).should('not.exist')
        cy.get('#detail_row_Groceries_Demo').compareSnapshot('check preview v2 showcase',0.2,retryOptions)

    })
})