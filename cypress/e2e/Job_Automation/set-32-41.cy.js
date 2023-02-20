import userData from '../../../fixtures/user_info.json'
import jaDashboard from '../../../selectors/jobAutomation/ja-dashboard-selectors.json'
beforeEach(() => {
    cy.login('manager','manager','Job Automation',userData.login_url);
    cy.pageLoaded();

})


it('change data xml and generate', () => {
    cy.visit(`${userData.login_url}/#/JobAutomation/Dashboard`);
    cy.wait(1000)  
    cy.selectProject('IB_Demo_Coffeeness_V2 ')
    cy.uploadINDDFile('DC_Test_2020.indd')
    cy.outDirectoryFileName('DC_GENERATE_36_Update')
    cy.get(jaDashboard.updateDocument).click({force:true})
    cy.get(jaDashboard.updateGroup).as('uGroup').find('mat-select').eq(0).within(() => {
        cy.contains('expand_more').click({force:true});
    })
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains(' EN').click();
    })
    cy.get('@uGroup').find('mat-select').eq(2).within(() => {
        cy.contains('expand_more').click({force:true});
    })
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains('SimpleData_EN_DE_ForUpdate.xml').click();
    })
    cy.get(jaDashboard.updateGroup).find('[type="checkbox"]').eq(0).click({force:true})
    cy.saveJob();
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('#scheduler_0').find('.column-output').within(() => {
            cy.get('div').contains('DC_GENERATE_36_Update')
        })
        cy.get('mat-checkbox').find('[type="checkbox"]').click({force:true});
    })
    cy.get(jaDashboard.localUpdate).click({force:true})
    cy.exportJobAutomation()
    cy.wait('@waitforJAExport').its('response.statusCode').should('eq', 200)
    cy.get('app-job-notofications').find('button').click({force:true}) 
    cy.wait(45000);
    cy.get(jaDashboard.duplicateJob).find('button').click({force:true})
    cy.get('.jobClass').should('have.length',2)
    cy.get(jaDashboard.editJob).eq(0).click({force:true});
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('mat-checkbox').eq(0).find('[type="checkbox"]').click({force:true});
    })
    cy.outDirectoryFileName('DC_GENERATE_41_Update')
    cy.get(jaDashboard.jsxUpload).selectFile(['Test_Clesi.jsx'],{force:true})
    cy.wait(5000)
    cy.get(jaDashboard.closeFileUploader).click();
    cy.get(jaDashboard.jsFileSection).within(() => {
        cy.get('input').eq(0).click({force:true})
    })
    cy.get(jaDashboard.exportPDF).click();
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains(' [PDFX3 2002] ').click({force:true});
    })
    cy.saveJob();
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('#scheduler_0').find('.column-output').eq(1).within(() => {
            cy.get('div').eq(0).contains('DC_GENERATE_41_Update')
        })
        cy.get('mat-checkbox').eq(1).find('[type="checkbox"]').click({force:true});
    })
    cy.get(jaDashboard.localUpdate).click({force:true})
    cy.exportJobAutomation()
    cy.wait('@waitforJAExport').its('response.statusCode').should('eq', 200)
    cy.get('app-job-notofications').find('button').click({force:true}) 
    cy.wait(45000);
})
