import userData from '../../../fixtures/user_info_bsh.json'
import bshSettingsTab from '../../../selectors/bsh/bsh-setting-selectors.json'
import projectData from '../../../fixtures/project_publication.json'
import settingsSelectors from '../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import bshSelectors from '../../../selectors/bsh/bsh-selection-selectors.json'
import elementBuilderSelectors from '../../../selectors/element-builder-selectors.json';




describe('Missing Items Test', () => {

    beforeEach(() => {
        cy.loginWithoutCaching(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('create a new publication and check for missing items', () => {

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.createNewPublication(projectData.bsh.projectBosch,projectData.bsh.masterPublication,'automation_publication_missing')
       //cy.selectPublication(projectData.bsh.projectBosch,' automation_publication ');
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.contains('Got It').click();
        cy.get('.dataSourceDropdown').eq(0).within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.wait(2000);
        cy.get('.mat-select-panel').within(() => {
            cy.contains('IB_de-DE_A01.xml').click({force: true });
            cy.wait(2000);
        })
        cy.get('.changeDSCheck').click({ force: true})
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('B').click();
        })
        cy.dragDropMasterPage(0,'product_page',2);
        cy.get('#PGS\\.0_0_FAR\\.1').as('page_one').click({ force: true})
        cy.contains('input').click({ force: true})
        cy.get(bshSettingsTab.uploadcsvBuilder).attachFile(['csv_import_test.csv'])
        cy.get('@page_one').within(() => {
            cy.get('.elementsDropped').as('elements').should('have.length.greaterThan', 4)
        })
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.get('.dataSourceDropdown').eq(0).within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.wait(2000);
        cy.get('.mat-select-panel').within(() => {
            cy.contains('IB_el-GR_A01.xml').click({ force:true });
        })
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('B').click();
        })
        cy.wait(10000)
        cy.get('@elements').eq(3).should('have.css','background-color')
        .and('include', 'rgb(119, 119, 119)')
        cy.get('#PGS\\.1_1_FAR\\.1').as('page_two').click({ force: true})
        cy.contains('input').click({ force: true})
        cy.get("#txtArea")
            .type('B1ZAI0941W')
            .type('{shift}{enter}')
            .type('BBHL22140')
            .type('{shift}{enter}')
            .type('B1ZAI0940W')
            .type('{shift}{enter}')
            .type('B1ZAI1840W')
            .type('{shift}{enter}')
            .type('BCS82MAT14')
        cy.get('#addButton').click( { force: true})
        cy.get('@page_two').within(() => {
            cy.get('.elementsDropped').as('elements_two').should('have.length.greaterThan', 3)
        })
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.get('.dataSourceDropdown').eq(0).within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.wait(2000);
        cy.get('.mat-select-panel').within(() => {
            cy.contains('IB_de-DE_A01.xml').click({ force:true });
        })    
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('B').click();
        })
        cy.get('@elements').eq(3).should('have.css','background-color')
        .and('include', 'rgb(255, 255, 255)')
        cy.wait(5000)
        cy.saveProject();
    })

    it('open a new publication and check for missing items', () => {

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        //cy.createNewPublication(projectData.bsh.projectBosch,projectData.bsh.masterPublication,'automation_publication_nineeeee')
        cy.selectPublication(projectData.bsh.projectBosch,' automation_publication_missing ');
        cy.get('#PGS\\.0_0_FAR\\.1').find('.elementsDropped').should('have.css','background-color')
        .and('include', 'rgb(255, 255, 255)')
    })    
})