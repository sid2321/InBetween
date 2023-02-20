import userData from '../../../fixtures/user_info.json'
import jaDashboard from '../../../selectors/jobAutomation/ja-dashboard-selectors.json'
beforeEach(() => {
    cy.login('manager','manager','Job Automation',userData.login_url);
    cy.pageLoaded();

})

it('Update with log language', () => {
    cy.visit(`${userData.login_url}/#/JobAutomation/Dashboard`);
    cy.wait(1000)  
    cy.selectProject('IB_Demo_Coffeeness_V2 ')
    cy.uploadINDDFile('DC_Test_2020.indd')
    cy.outDirectoryFileName('DC_GENERATE_31_Update')
    cy.get(jaDashboard.updateDocument).click({force:true})
    cy.get(jaDashboard.updateGroup).find('mat-select').eq(0).within(() => {
        cy.contains('expand_more').click({force:true});
    })
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains(' EN').click();
    })
    cy.get(jaDashboard.updateGroup).find('[type="checkbox"]').eq(0).click({force:true})
    cy.saveJob();
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('#scheduler_0').find('.column-output').within(() => {
            cy.get('div').contains('DC_GENERATE_31_Update')
        })
        cy.get('mat-checkbox').find('[type="checkbox"]').click({force:true});
    })
    cy.get(jaDashboard.localUpdate).click({force:true})
    cy.exportJobAutomation()
    cy.wait('@waitforJAExport').its('response.statusCode').should('eq', 200)
    cy.get('app-job-notofications').find('button').click({force:true}) 
    cy.wait(25000);

})
