import userInfo_pa from '../../../fixtures/user_info_pa.json'
import dashboardSelectors from '../../../selectors/printAssistant/pa-dashboard-selectors.json'

beforeEach(() => {
    cy.loginpa(userInfo_pa.userName,userInfo_pa.userPassword,userInfo_pa.login_url);
    cy.pageLoaded();
})

it('select master publication and generate all en generations', () => {
    let renameFileName = 'test_project_23_EN.pdf'
    cy.selectProjectPA('Test_Project_Print_Assistant')
    cy.wait(2000)
    cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
    cy.wait(2000)
    cy.get(dashboardSelectors.selectdropdown)
    .within(() => {
        cy.contains('dynamisch ').click( { force: true })
    })
    cy.wait(2000);
    cy.get(dashboardSelectors.logLang).click({  force:true })
    cy.wait(1000)
    cy.get(dashboardSelectors.flagDropdown).within(() => {
        cy.contains('EN').click({ force:true })
    })
    //cy.get('body').should('be.visible').compareSnapshot('check-current-links');
    cy.get(dashboardSelectors.appTable).within(() => {
        cy.get('mat-checkbox').eq(0).find('input').click({force:true})
    })
    cy.wait(1000)
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

it('select master publication and generate all en generations', () => {
    let renameFileName = 'test_project_23_DE.pdf'
    cy.selectProjectPA('Test_Project_Print_Assistant')
    cy.wait(2000)
    cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
    cy.wait(2000)
    cy.get(dashboardSelectors.selectdropdown)
    .within(() => {
        cy.contains('dynamisch ').click( { force: true })
    })
    cy.wait(2000);
    cy.get(dashboardSelectors.logLang).click({  force:true })
    cy.wait(1000)
    cy.get(dashboardSelectors.flagDropdown).within(() => {
        cy.contains('DE').click({ force:true })
    })
    //cy.get('body').should('be.visible').compareSnapshot('check-current-links');
    cy.get(dashboardSelectors.appTable).within(() => {
        cy.get('mat-checkbox').eq(0).find('input').click({force:true})
    })
    cy.wait(1000)
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

it('select master publication and generate all filter1 generations', () => {
    let renameFileName = 'test_project_DE_filter1.pdf'
    cy.selectProjectPA('Test_Project_Print_Assistant')
    cy.wait(2000)
    cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
    cy.wait(2000)
    cy.get(dashboardSelectors.selectdropdown)
    .within(() => {
        cy.contains('dynamisch ').click( { force: true })
    })
    cy.wait(2000);
    cy.get(dashboardSelectors.logLang).click({  force:true })
    cy.wait(1000)
    cy.get(dashboardSelectors.flagDropdown).within(() => {
        cy.contains('DE').click({ force:true })
    })
    cy.get(dashboardSelectors.filterDiv).within(() => {
        cy.get('mat-select').eq(0).click({ force:true })
    })
    cy.get('.mat-select-panel').within(() => {
        cy.contains(' Green').click({force:true})
    })
    cy.get(dashboardSelectors.appTable).within(() => {
        cy.get('mat-checkbox').eq(0).find('input').click({force:true})
    })
    cy.wait(1000)
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


it('select master publication and generate all filter2 generations', () => {
    let renameFileName = 'test_project_DE_filter2.pdf'
    cy.selectProjectPA('Test_Project_Print_Assistant')
    cy.wait(2000)
    cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
    cy.wait(2000)
    cy.get(dashboardSelectors.selectdropdown)
    .within(() => {
        cy.contains('dynamisch ').click( { force: true })
    })
    cy.wait(2000);
    cy.get(dashboardSelectors.logLang).click({  force:true })
    cy.wait(1000)
    cy.get(dashboardSelectors.flagDropdown).within(() => {
        cy.contains('DE').click({ force:true })
    })
    cy.get(dashboardSelectors.filterDiv).within(() => {
        cy.get('mat-select').eq(0).click({ force:true })
    })
    cy.get('.mat-select-panel').within(() => {
        cy.contains(' Green').click({force:true})
    })
    cy.get(dashboardSelectors.appTable).within(() => {
        cy.get('mat-checkbox').eq(0).find('input').click({force:true})
    })
    cy.wait(1000)
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

it('select master publication and generate all filter and search generations', () => {
    let renameFileName = 'test_project_DE_filter1_search.pdf'
    cy.selectProjectPA('Test_Project_Print_Assistant')
    cy.wait(2000)
    cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
    cy.wait(2000)
    cy.get(dashboardSelectors.selectdropdown)
    .within(() => {
        cy.contains('dynamisch ').click( { force: true })
    })
    cy.wait(2000);
    cy.get(dashboardSelectors.logLang).click({  force:true })
    cy.wait(1000)
    cy.get(dashboardSelectors.flagDropdown).within(() => {
        cy.contains('DE').click({ force:true })
    })
    cy.get(dashboardSelectors.filterDiv).within(() => {
        cy.get('mat-select').eq(0).click({ force:true })
    })
    cy.get('.mat-select-panel').within(() => {
        cy.contains(' Green').click({force:true})
    })
    cy.get(dashboardSelectors.searchProduct).siblings('input').type('Produktkapitel 4{enter}')
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
    cy.contains('check', { timeout:20000 }).should('have.css','color')
    .and('include','rgb(33, 37, 41)')
    cy.wait(2000)
    cy.disablePopUp();
    cy.dowanloadIBPrintAssistantGeneration(renameFileName);
})

it('select master publication and generate reset filter and search generations', () => {
    cy.selectProjectPA('Test_Project_Print_Assistant')
    cy.wait(2000)
    cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
    cy.wait(2000)
    cy.get(dashboardSelectors.selectdropdown)
    .within(() => {
        cy.contains('dynamisch ').click( { force: true })
    })
    cy.wait(2000);
    cy.get(dashboardSelectors.logLang).click({  force:true })
    cy.wait(1000)
    cy.get(dashboardSelectors.flagDropdown).within(() => {
        cy.contains('DE').click({ force:true })
    })
    cy.get(dashboardSelectors.filterDiv).within(() => {
        cy.get('mat-select').eq(0).click({ force:true })
    })
    cy.get('.mat-select-panel').within(() => {
        cy.contains(' Green').click({force:true})
    })
    cy.get(dashboardSelectors.searchProduct)
    .siblings('input').as('searchbar').type('Produktkapitel 4{enter}')
    cy.wait(2000)
    cy.contains('Reset Filter').click({force:true})
    cy.get('@searchbar').clear();
    cy.wait(1000)
    cy.get('.matTable').find('tr').should('have.length',6)
    cy.get(dashboardSelectors.logLang).click({  force:true })
    cy.wait(1000)
    cy.get(dashboardSelectors.flagDropdown).within(() => {
        cy.contains('EN').click({ force:true })
    })
    cy.get('.matTable').find('tr').should('have.length',7)
    cy.get('@searchbar').type('Test{enter}')
    cy.get('.matTable').find('tr').should('have.length',1)
    cy.get('@searchbar').clear();
    cy.wait(1000)
    cy.get(dashboardSelectors.logLang).click({  force:true })
    cy.wait(1000)
    cy.get(dashboardSelectors.flagDropdown).within(() => {
        cy.contains('CN').click({ force:true })
    })
    cy.get('.matTable').find('tr').should('have.length',1)
})