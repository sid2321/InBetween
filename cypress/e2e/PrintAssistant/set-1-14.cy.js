import userInfo_pa from '../../../fixtures/user_info_pa.json'
import dashboardSelectors from '../../../selectors/printAssistant/pa-dashboard-selectors.json'

beforeEach(() => {
    cy.loginpa(userInfo_pa.userName,userInfo_pa.userPassword,userInfo_pa.login_url);
    cy.pageLoaded();
})

describe('set 1-14 print assistant', () => {

    it('select master publication and generate', () => {
        let renameFileName = 'set-1-14.pdf'
        cy.selectProjectPA('IB_Demo_Coffeeness_V2')
        cy.wait(2000);
        cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
        cy.wait(2000);
        cy.get(dashboardSelectors.selectdropdown)
        .within(() => {
            cy.contains('Coffeeness ').click( { force: true })
        })
        cy.wait(2000);
        //cy.get('body').should('be.visible').compareSnapshot('check-current-links');
        cy.get('.fCheckBox').eq(0).click();
        cy.wait(1000)
        cy.contains('Export to PDF').click({ force:true })
        cy.get(dashboardSelectors.downloadBtn, { timeout:20000 }).click({ force:true })
        cy.get(dashboardSelectors.download).as('download').within(() => {
            cy.get('button').should('be.visible')
        })
        cy.contains('check', { timeout:20000000 }).should('have.css','color')
        .and('include','rgb(33, 37, 41)')
        cy.wait(2000)
        cy.disablePopUp();
        cy.dowanloadIBPrintAssistantGeneration(renameFileName);
    })

    it('select master publication and search coffee', () => {
        let renameFileName = 'set-1-14_search.pdf'
        cy.selectProjectPA('IB_Demo_Coffeeness_V2')
        cy.wait(2000);
        cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
        cy.wait(2000);
        cy.get(dashboardSelectors.selectdropdown)
        .within(() => {
            cy.contains('Coffeeness ').click( { force: true })
        })
        cy.wait(2000);
        cy.get(dashboardSelectors.searchProduct)
        .siblings('input').as('searchbar').type('coffee{enter}')
        //cy.get('body').should('be.visible').compareSnapshot('check-current-links');
        cy.wait(2000)
        cy.get(dashboardSelectors.appTable).within(() => {
            cy.get('mat-checkbox').eq(0).find('input').click({force:true})
        })
        cy.wait(1000)
        cy.contains('Export to PDF').click({ force:true })
        cy.get(dashboardSelectors.downloadBtn, { timeout:20000 }).click({ force:true })
        cy.get(dashboardSelectors.download).as('download').within(() => {
            cy.get('button').should('be.visible')
        })
        cy.contains('check', { timeout:2000000000 }).should('have.css','color')
        .and('include','rgb(33, 37, 41)')
        cy.wait(2000)
        cy.disablePopUp();
        cy.dowanloadIBPrintAssistantGeneration(renameFileName);
    })

    it('select master publication and change language', () => {
        let renameFileName = 'set-1-14_en_language.pdf'
        cy.selectProjectPA('IB_Demo_Coffeeness_V2')
        cy.wait(2000);
        cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
        cy.wait(2000);
        cy.get(dashboardSelectors.selectdropdown)
        .within(() => {
            cy.contains('Coffeeness ').click( { force: true })
        })
        cy.wait(2000);
        cy.get(dashboardSelectors.logLang).click({  force:true })
        cy.wait(1000)
        cy.get(dashboardSelectors.flagDropdown).within(() => {
            cy.contains('EN').click({ force:true })
        })
        //cy.get('body').should('be.visible').compareSnapshot('check-current-links');
        cy.wait(2000)
        cy.get(dashboardSelectors.appTable).within(() => {
            cy.get('mat-checkbox').eq(0).find('input').click({force:true})
        })
        cy.wait(1000)
        cy.contains('Export to PDF').click({ force:true })
        cy.get(dashboardSelectors.downloadBtn, { timeout:20000 }).click({ force:true })
        cy.get(dashboardSelectors.download).as('download').within(() => {
            cy.get('button').should('be.visible')
        })
        cy.contains('check', { timeout:200000 }).should('have.css','color')
        .and('include','rgb(33, 37, 41)')
        cy.wait(2000)
        cy.disablePopUp();
        cy.dowanloadIBPrintAssistantGeneration(renameFileName);
    })

    it('select master publication and change language to DE', () => {
        cy.selectProjectPA('IB_Demo_Coffeeness_V2')
        cy.wait(2000)
        cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
        cy.wait(2000)
        cy.get(dashboardSelectors.selectdropdown)
        .within(() => {
            cy.contains('Coffeeness ').click( { force: true })
        })
        cy.get('#dropdownBasic1').click({force:true})
        cy.get('.dropdown-menu').within(() => {
            cy.contains('FR').click({force:true})
        })
        cy.wait(2000)
        cy.get('body').should('be.visible').compareSnapshot('check-language',0.5);
    })

})    
