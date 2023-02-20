import userInfo_pa from '../../../fixtures/user_info_pa.json'
import dashboardSelectors from '../../../selectors/printAssistant/pa-dashboard-selectors.json'
import loginScreenSelectors from '../../../selectors/printAssistant/pa-login-selectors.json'

describe('set 47-55 print assistant', () => {

    it('check login and select project', () => {
        cy.visit(userInfo_pa.login_url)
        cy.get(loginScreenSelectors.userName).as('username')
        .should('have.css', 'background-color')
        .and('include', 'rgb(0, 255, 255)')
        cy.get('@username').should('have.css','color')
        .and('include','rgb(255, 255, 0)')
        cy.get('@username').should('have.css','border-color')
        .and('include','rgb(0, 255, 0)')
        cy.get(loginScreenSelectors.loginImage).should('have.text',' hello ')
        .within(() => {
            cy.get('img').eq(0).should('have.attr', 'src').and('include','Logo3')
        })
    })

    it('check dashboard customizaion', () => {
        let renameFileName = 'customization_IBPrintAssistant.pdf'
        cy.loginpa(userInfo_pa.userName,userInfo_pa.userPassword,userInfo_pa.login_url);
        cy.selectProjectPA('IB_Demo_Coffeeness_V2')
        cy.wait(2000)
        cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
        cy.get(2000)
        cy.get(dashboardSelectors.selectdropdown)
        .within(() => {
            cy.contains('Coffeeness ').click( { force: true })
        })
        cy.wait(2000);
        cy.get('nav').should('have.css','background-color')
        .and('include','rgb(255, 255, 0)')
        cy.get('.fCheckBox').eq(0).click();
        cy.wait(1000)
        cy.contains('Export to PDF').should('have.css','background-color')
        .and('include','rgb(0, 113, 190)')
        cy.contains('Export to PDF').click({ force:true })
        cy.get(dashboardSelectors.downloadBtn, { timeout:20000 }).click({ force:true })
        cy.get(dashboardSelectors.download).as('download').within(() => {
            cy.get('button').should('be.visible')
        })
        cy.contains('check', { timeout:20000 }).should('have.css','color')
        .and('include','rgb(33, 37, 41)')
        cy.wait(2000)
        cy.disablePopUp();
        cy.dowanloadIBPrintAssistantGeneration(renameFileName);
    }) 
})