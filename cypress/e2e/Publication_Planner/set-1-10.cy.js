import userData from '../../../fixtures/user_info_planner.json'
import plannerSelector from '../../../selectors/planner-selectors.json'


describe('check all the UI elements and tool tips in planner', () => {

    beforeEach(() => {
        cy.login('manager','manager','Publication Planner',userData.login_url);
        cy.pageLoaded();
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

    it.only('check ui tooltp of publication planner', () => {

        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.get(plannerSelector.appButton)
                .invoke('show')
                .trigger('mouseenter')
                .wait(10000)/*.then(() => {
                    cy.get('mat-tooltip').find('span')
                    .should('have.text','InBetween Apps')
                })  */      
    })

})




