import userData from '../../../fixtures/user_info.json'
import jaDashboard from '../../../selectors/jobAutomation/ja-dashboard-selectors.json'
import loginScreenSelectors from '../../../selectors/login-screen-selectors.json'
beforeEach(() => {
    cy.login('manager','manager','Job Automation',userData.login_url);
    cy.pageLoaded();

})


it('update indd files using style options and import export jobs', () => {
    cy.visit(`${userData.login_url}/#/JobAutomation/Dashboard`);
    cy.wait(1000)  
    cy.selectProject('IB_Demo_Coffeeness_V2 ')
    cy.uploadINDDFile('DC_Test_2020.indd')
    cy.outDirectoryFileName('DC_GENERATE_67_Update')
    cy.get(jaDashboard.updateDocument).click({force:true})
    cy.wait(1000)
    cy.get(jaDashboard.updateGroup).find('[type="checkbox"]').eq(0).click({force:true})
    cy.contains(' add ').click({force:true})
    cy.get(jaDashboard.advSetting).as('advSetting').find('mat-select').eq(0).within(() => {
        cy.contains('expand_more').click({force:true});
    })
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains(' DSR.2 - SimpleCoffee').click({force:true});
    })
    cy.get('@advSetting').find('mat-select').eq(1).within(() => {
        cy.contains('expand_more').click({force:true});
    })
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains('Reapply and refresh styles').click({force:true});
    })
    cy.saveJob();
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('#scheduler_0').find('.column-output').eq(0).within(() => {
              cy.get('div').eq(0).contains('DC_GENERATE_67_Update')
        })
        cy.get('mat-checkbox').eq(0).find('[type="checkbox"]').click({force:true});
    })

    cy.get(jaDashboard.localUpdate).click({force:true})
    cy.exportJobAutomation()
    cy.wait('@waitforJAExport').its('response.statusCode').should('eq', 200)
    cy.get('app-job-notofications').find('button').click({force:true}) 
    //cy.wait(45000);
    cy.selectProject('IB_Demo_Coffeeness_V2 ')
    cy.uploadINDDFile('DC_Test_2020.indd')
    cy.outDirectoryFileName('DC_GENERATE_71_Update')
    cy.get(jaDashboard.updateDocument).click({force:true})
    cy.wait(1000)
    cy.get(jaDashboard.updateGroup).find('[type="checkbox"]').eq(0).click({force:true})
    cy.contains(' add ').click({force:true})
    cy.get(jaDashboard.advSetting).as('advSetting').find('mat-select').eq(0).within(() => {
        cy.contains('expand_more').click({force:true});
    })
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains(' DSR.2 - SimpleCoffee').click({force:true});
    })
    cy.get('@advSetting').find('mat-select').eq(1).within(() => {
        cy.contains('expand_more').click({force:true});
    })
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains('Reapply but retain styles ').click({force:true});
    })
    cy.get(jaDashboard.outputDirectory).clear({force:true}).type('D:\Job_AUtomation', {force:true})
    cy.contains('SAVE').click({force:true})
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('#scheduler_1').find('.column-output').eq(0).within(() => {
              cy.get('div').eq(0).contains('DC_GENERATE_71_Update')
        })
        cy.get('mat-checkbox').eq(1).find('[type="checkbox"]').click({force:true});
        cy.get('mat-checkbox').eq(0).find('[type="checkbox"]').click({force:true});
    })

    cy.get(jaDashboard.localUpdate).click({force:true})
    cy.exportJobAutomation()
    cy.wait('@waitforJAExport').its('response.statusCode').should('eq', 200)
    cy.get('app-job-notofications').find('button').click({force:true}) 
    //cy.wait(45000);
    cy.selectProject('IB_Demo_Coffeeness_V2 ')
    cy.uploadINDDFile('DC_Test_2020.indd')
    cy.outDirectoryFileName('DC_GENERATE_75_Update')
    cy.get(jaDashboard.updateDocument).click({force:true})
    cy.wait(1000)
    cy.get(jaDashboard.updateGroup).find('[type="checkbox"]').eq(0).click({force:true})
    cy.contains(' add ').click({force:true})
    cy.get(jaDashboard.advSetting).as('advSetting').find('mat-select').eq(0).within(() => {
        cy.contains('expand_more').click({force:true});
    })
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains(' DSR.2 - SimpleCoffee').click({force:true});
    })
    cy.get('@advSetting').find('mat-select').eq(1).within(() => {
        cy.contains('expand_more').click({force:true});
    })
    cy.wait(1000)
    cy.get(jaDashboard.panel).within(() => {
        cy.contains('Retain applied styles').click({force:true});
    })
    cy.saveJob();
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('#scheduler_2').find('.column-output').eq(0).within(() => {
              cy.get('div').eq(0).contains('DC_GENERATE_75_Update')
        })
        cy.get('mat-checkbox').eq(2).find('[type="checkbox"]').click({force:true});
        cy.get('mat-checkbox').eq(1).find('[type="checkbox"]').click({force:true});
    })

    cy.get(jaDashboard.localUpdate).click({force:true})
    cy.exportJobAutomation()
    cy.wait('@waitforJAExport').its('response.statusCode').should('eq', 200)
    cy.get('app-job-notofications').find('button').click({force:true}) 
    //cy.wait(45000);
    cy.get(jaDashboard.exportJob).click({force:true})
    cy.get('.impExpclose').click({force:true})
    cy.verifyDownload('Scheduler.xml', { timeout: 25000, interval: 600 });
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('#scheduler_2').as('thirdjob').within(() => {
              cy.get(jaDashboard.deleteJob).click({force:true})
        })
    })
    cy.get('@thirdjob').should('not.exist')
    cy.get(jaDashboard.selectAll).click({force:true})
    cy.get(jaDashboard.exportJob).click({force:true})
    cy.get('.impExpclose').click({force:true})
    cy.verifyDownload('Schedulers.zip', { timeout: 25000, interval: 600 });
    cy.contains('Clear All').click({force:true})
    cy.get(jaDashboard.importFile)
    .selectFile(['cypress/downloads/Scheduler.xml'],{force:true})
    cy.wait(2000)
    cy.get(jaDashboard.impexpClose).click({force:true});
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('#scheduler_0').as('scheduler').find('.column-output').eq(0).within(() => {
              cy.get('div').eq(0).contains('DC_GENERATE_75_Update')
              
        })
        cy.get('@scheduler').within(() => {
            cy.contains(' more_vert ').click();
        })
        
    })
    cy.get('.detailsmenu').within(() => {
        cy.get('.detailsLabel')
        .siblings('.colData').should('have.text',' DSR.2 SimpleData_EN_DE.xmlDE TableFrame,TableImage,TableText,TableUnit,TableArticleNr.,HeaderTextFrame,HeaderTextField,ProductImageFrame,ProductImageField,ProductTextFrame,ProductTextField DSR.2Retain applied styles')
    })
    cy.get(jaDashboard.importFile)
    .selectFile(['cypress/downloads/Schedulers.zip'],{force:true})
    cy.wait(2000)
    cy.get(jaDashboard.impexpClose).click({force:true});
    cy.get(jaDashboard.jobSection).within(() => {
        cy.get('#scheduler_1').as('scheduler').find('.column-output').eq(0).within(() => {
              cy.get('div').eq(0).contains('DC_GENERATE_67_Update')
        })
        cy.get('#scheduler_2').as('scheduler').find('.column-output').eq(0).within(() => {
            cy.get('div').eq(0).contains('DC_GENERATE_71_Update')
        })
        cy.get(jaDashboard.editJob).eq(0).click({force:true});
    })
    cy.get(jaDashboard.langChange).eq(0).find('.bi-chevron-compact-down').click({force:true})
    cy.get('.mat-menu-panel').find('mat-radio-button').eq(1).within(() => {
        cy.get('input').click({force:true})
    })
    cy.get('.job-automation').should('have.text','Auftragsautomatisierung')
    cy.get(jaDashboard.langChange).eq(0).find('.bi-chevron-compact-down').click({force:true})
    cy.get('.mat-menu-panel').find('mat-radio-button').eq(0).within(() => {
        cy.get('input').click({force:true})
    })
    cy.contains('Logout').click({force:true})
    cy.title().should('eq','InBetween SSO');
    cy.get(loginScreenSelectors.userName).type('manager');
    cy.get(loginScreenSelectors.userPassword).type('manager');
    cy.get(loginScreenSelectors.loginButton).click();
    cy.url().should('contain', `/JobAutomation/`);
    cy.get('#scheduler_1').should('not.exist');
})
