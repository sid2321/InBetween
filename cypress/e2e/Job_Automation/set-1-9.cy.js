import userData from '../../../fixtures/user_info.json'
import jaDashboard from '../../../selectors/jobAutomation/ja-dashboard-selectors.json'
beforeEach(() => {
    cy.login('manager','manager','Job Automation',userData.ja_login_url);
    cy.pageLoaded();

})


it('check if all the web clients are accessible', () => {
    cy.visit(`${userData.ja_login_url}/#/JobAutomation/Dashboard`);
    //cy.get(jaDashboard.menuButton).click({force:true})
    /*cy.get(jaDashboard.menu).within(() => {
        cy.get('a').eq(0).as('wizard').should($a => {
            expect($a.attr('target'), 'target').to.equal('_blank')
            $a.attr('target', '_self')
        })
        cy.wait(2000)
        cy.get('@wizard').click();
    })
    cy.url()
      .should('include', 'PublicationWizard')*/
      cy.wait(1000)  
      cy.selectProject('IB_Demo_Coffeeness_V2 ')
      cy.uploadINDDFile('DC_Test_2020.indd')
      cy.outDirectoryFileName('DC_GENERATE_8_Update')
  
      cy.get(jaDashboard.exportPDF).click();
      cy.wait(1000)
      cy.get(jaDashboard.panel).within(() => {
          cy.contains(' [PDFX3 2002] ').click({force:true});
      })
      cy.saveJob();
      cy.get(jaDashboard.jobSection).within(() => {
          cy.get('#scheduler_0').find('.column-output').within(() => {
              cy.get('div').should('have.text','DC_GENERATE_8_Update')
          })
          cy.get('mat-checkbox').find('[type="checkbox"]').click({force:true});
      })
      cy.get(jaDashboard.localUpdate).click({force:true})
      cy.exportJobAutomation()
      cy.wait('@waitforJAExport').its('response.statusCode').should('eq', 200)
      cy.get('app-job-notofications').find('button').click({force:true}) 
      cy.wait(10000);
})
