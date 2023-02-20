import userData from '../../../fixtures/user_info.json'
import jaDashboard from '../../../selectors/jobAutomation/ja-dashboard-selectors.json'
beforeEach(() => {
    cy.login('manager','manager','Job Automation',userData.login_url);
    cy.pageLoaded();

})


it('multiple jsx file', () => {
    cy.visit(`${userData.login_url}/#/JobAutomation/Dashboard`);
    cy.wait(1000)  
    cy.selectProject('IB_Demo_Coffeeness_V2 ')
    cy.uploadINDDFile('DC_Test_2020.indd')
    cy.outDirectoryFileName('DC_GENERATE_15_Update')
    cy.get(jaDashboard.jsxUpload).selectFile(['Test_Clesi.jsx','AngleRotation.jsx'],{force:true})
    cy.wait(5000)
    cy.get(jaDashboard.closeFileUploader).click();
    cy.get(jaDashboard.jsFileSection).within(() => {
        cy.get('input').eq(0).click({force:true})
        cy.get('input').eq(1).click({force:true})
    })
    cy.get(jaDashboard.exportPDF).click();
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains(' [PDFX3 2002] ').click({force:true});
    })
    cy.saveJob();
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('#scheduler_0').find('.column-output').within(() => {
            cy.get('div').should('have.text','DC_GENERATE_15_Update')
        })
        cy.get('mat-checkbox').find('[type="checkbox"]').click({force:true});
    })
    cy.get(jaDashboard.localUpdate).click({force:true})
    cy.exportJobAutomation()
    cy.wait('@waitforJAExport').its('response.statusCode').should('eq', 200)
    cy.get('app-job-notofications').find('button').click({force:true}) 
    cy.wait(5000);
    cy.get(jaDashboard.editJob).click({force:true});
    cy.get(jaDashboard.jsFileSection).within(() => {
        cy.get(jaDashboard.deleteJS).eq(0).find('button').click({force:true})
        cy.get('input').eq(0).click({force:true})
    })
    cy.get(jaDashboard.jsxUpload).selectFile(['image_disappear.jsx'],{force:true})
    cy.wait(5000)
    cy.get(jaDashboard.closeFileUploader).click({force:true});
    cy.get(jaDashboard.jsFileSection).within(() => {
        cy.get('input').eq(0).click({force:true})
        cy.get('input').eq(1).click({force:true})
    })
    cy.wait(1000)
    cy.outDirectoryFileName('DC_GENERATE_18_Update')
    cy.contains('SAVE').click({force:true})
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('#scheduler_0').find('.column-output').within(() => {
            cy.get('div').should('have.text','DC_GENERATE_18_Update')
        })
        cy.get('mat-checkbox').find('[type="checkbox"]').click({force:true});
    })
    cy.get(jaDashboard.localUpdate).click({force:true})
    cy.exportJobAutomation()
    cy.wait('@waitforJAExport').its('response.statusCode').should('eq', 200)
    cy.get('app-job-notofications').find('button').click({force:true}) 
    cy.wait(5000);
})
