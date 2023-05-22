import userData from '../../../fixtures/user_info_planner.json'
import plannerSelector from '../../../selectors/planner-selectors.json'


describe('check test cases from 11-21', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Planner',userData.login_url);
        cy.pageLoaded();
    })
    
    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    it('check publication data', () => {

        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.wait(2000)
        cy.get(plannerSelector.projSelPlanner).find('span').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projecSelPlannerpanel).within(() =>{
            cy.contains(' BSH_Pricelist_Siemens ').click({force:true})
        })
        cy.get('app-table').should('be.visible')
        cy.wait(2000)
        cy.get('#sel_pub_for_Planner').click({force:true})
        cy.get('#sel_pub_for_Planner-panel').within(() => {
            cy.contains(' Pricelist ').click({force:true})
        })
        cy.get('[placeholder="Search"]').as('search').type('siemens_test')
        cy.get('app-table').within(() => {
            cy.get('mat-row').should('have.length',1)
        })
        cy.get('@search').clear().type('test')
        cy.get('app-table').within(() => {
            cy.get('mat-row').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    cy.get('@elements').eq(i).find('mat-cell')
                    .eq(0).within(() =>{
                        cy.get('span')
                        .invoke('text').then(text => {
                            let result = text.toLocaleLowerCase().includes('test')
                            if(!result){ assert.fail('doesnt include test')}
                        })
                    })
                }
            })
        })
    })

    it('check for new publication', () => {

        cy.visit(`${userData.login_url}/#/PublicationPlanner/Home`)
        cy.wait(2000)
        cy.get('#addButton').click({force:true})
        cy.wait(2000)
        cy.get('mat-dialog-container').within(() => {
            cy.get('[panelclass="panelClassForCNProjects"]').click({force:true})
        })
        cy.get('.panelClassForCNProjects').within(() => {
            cy.contains(' BSH_Pricelist_Siemens ').click({force:true})
        })
        cy.get('mat-dialog-container').within(() => {
            cy.get('[panelclass="panelClassForCNPublications"]').click({force:true})
        })
        cy.get('.panelClassForCNPublications').within(() => {
            cy.contains(' Pricelist ').click({force:true})
        })
        cy.get('mat-dialog-container').within(() => {
            cy.get('mat-form-field').eq(2).find('input')
            .type('testpublication')
        })
        cy.get('[title="Next"]').click({force:true})
        cy.contains('EN').click({force:true})
        cy.get('[title="OK"]').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projSelPlanner).find('span').click({force:true})
        cy.wait(2000)
        cy.get(plannerSelector.projecSelPlannerpanel).within(() =>{
            cy.contains(' BSH_Pricelist_Siemens ').click({force:true})
        })
        cy.get('app-table').should('be.visible')
        cy.wait(2000)
        cy.get('#sel_pub_for_Planner').click({force:true})
        cy.get('#sel_pub_for_Planner-panel').within(() => {
            cy.contains(' Pricelist ').click({force:true})
        })
        cy.get('[placeholder="Search"]').as('search').type('testpublication')
        cy.get('#EDIT').click({force:true})
        cy.get('.editLanguageFlagIcon').click({force:true})
        cy.get('.editlanguageflags').within(() => {
            cy.get('#DE').click({force:true})
        })
        cy.get('.editLanguageFlagIcon').click({force:true})
        cy.get('.workflowStageInput').find('svg').click({force:true})
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('Media Design').click({force:true})
        })
        cy.get('#editDisabled_testpublication').within(() => {
            cy.get('span').eq(1).find('img').click({force:true})
        })
        cy.get('#workflowStageText_testpublication').should('have.text',' Marketing ')
        cy.get('#EDIT').click({force:true})
        cy.get('.editLanguageFlagIcon').click({force:true})
        cy.get('.editlanguageflags').within(() => {
            cy.get('#DE').click({force:true})
        })
        cy.get('.editLanguageFlagIcon').click({force:true})
        cy.get('.workflowStageInput').find('svg').click({force:true})
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('Media Design').click({force:true})
        })
        cy.get('#editDisabled_testpublication').within(() => {
            cy.get('span').eq(0).find('img').click({force:true})
        })
        cy.get('#workflowStageText_testpublication').should('have.text',' Media Design ')


    })
})