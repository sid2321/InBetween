import userData from '../../../fixtures/user_info_planner.json'
import plannerSelector from '../../../selectors/planner-selectors.json'
import dayjs from 'dayjs'
Cypress.dayjs = dayjs;

describe('check test cases from 22-28', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Planner',userData.login_url);
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

    it('check publication preview', () => {

        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.wait(2000)
        cy.get(plannerSelector.projSelPlanner).find('span').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projecSelPlannerpanel).within(() =>{
            cy.contains(' IB_Simple_Project_V2 ').click({force:true})
        })
        cy.get('#titleSpan_dynamisch').should('be.visible')
        cy.wait(2000)
        cy.get('#expandButton_dynamisch').click({ force:true })
        cy.get('.pageImageDimensions').as('page').should('be.visible')
        cy.get('.pub_preview-btn').click({force:true})
        cy.get('@page').should('have.length',2)

    })

    it.only('create section', () => {

        let date = todaysDate();
        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.wait(2000)
        cy.get(plannerSelector.projSelPlanner).find('span').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projecSelPlannerpanel).within(() =>{
            cy.contains(' IB_Simple_Project_V2 ').click({force:true})
        })
        cy.get(plannerSelector.dynamicshTitle).should('be.visible')
        cy.wait(2000)
        cy.get(plannerSelector.addSection).click({force:true})
        cy.get('app-create-new-section').as('newSecton').within(() => {
            cy.get('input').eq(0).clear().type('new section')
            cy.get('input').eq(1).clear().type('3')
            cy.get('[aria-label="Open calendar"]').click({force:true})
        })
        cy.get(`[aria-label="${date}"]`).click()
        cy.get('#sel_proj_for_newSection').click()
        cy.contains('InBetween Guest User ').click();
        cy.get('[data-original-title="Next"]').click({force:true})
        cy.get('#titleSpan_dynamisch_section1').should('be.visible')
        cy.get('#detail_row_dynamisch').as('newSection').find('.pageImageDimensions').should('have.length',14)
        cy.get('@newSection').find('#EDIT').click({force:true})
        cy.get('@newSection').find('#workflowStage_dynamisch_section1').as('workflow').within(() => {
            cy.get('svg').click({force:true})
        }) 
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('Media Design').click({force:true})
        })  
        cy.get('@newSection').find('#userName_dynamisch_section1').within(() => {
            cy.get('svg').click({force:true})
        }) 
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('InBetween Project Manager').click({force:true})
        })  
        cy.get('#editDisabled_dynamisch_section1').find('[src="assets/images/Cancel.png"]').click({force:true})
        cy.wait(2000)
        cy.get('@workflow').should('have.text',' Marketing ')
        cy.get('@newSection').find('#EDIT').click({force:true})
        cy.get('@newSection').find('#workflowStage_dynamisch_section1').as('workflow').within(() => {
            cy.get('svg').click({force:true})
        }) 
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('Media Design').click({force:true})
        })  
        cy.get('@newSection').find('#userName_dynamisch_section1').within(() => {
            cy.get('svg').click({force:true})
        }) 
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('InBetween Project Manager').click({force:true})
        })  
        cy.get('#editDisabled_dynamisch_section1').find('#savesection_dynamisch_section1').click({force:true})
        cy.wait(2000)
        cy.get('@workflow').should('have.text',' Media Design ')
     })

})