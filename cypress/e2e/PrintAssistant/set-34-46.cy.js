import userInfo_pa from '../../../fixtures/user_info_pa.json'
import dashboardSelectors from '../../../selectors/printAssistant/pa-dashboard-selectors.json'
import loginScreenSelectors from '../../../selectors/printAssistant/pa-login-selectors.json'

beforeEach(() => {
    cy.loginpa(userInfo_pa.userName,userInfo_pa.userPassword,userInfo_pa.login_url);
    cy.pageLoaded();
})

describe('set 34-46 print assistant', () => {

    it('select master publication and generate', () => {
        cy.selectProjectPA('Project_Variables_15-04-2020')
        cy.wait(2000)
        cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
        cy.wait(2000)
        cy.get(dashboardSelectors.generationVariable).click({ force : true })
        cy.get(dashboardSelectors.selectdropdown)
        .within(() => {
            cy.contains('dynamisch ').click( { force: true })
        })
        cy.wait(2000);
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.contains('India').click({ force:true })
        })
        cy.wait(2000);
        cy.contains(' Germany ').click({ force:true })
        cy.get('.fCheckBox').eq(0).click();
        cy.wait(1000)
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(0).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' Goa ').click({ force:true })    
        })
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(1).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' 3 ').click({ force:true })    
        })
        cy.get('[placeholder="Single_withoutLOV_Text"]').eq(0).clear({force:true}).type('InBetween-Test')
        cy.get('[placeholder="Single_withoutLOV_Number"]').eq(1).clear({force:true}).type('1001',{force:true})
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(5).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' a, e ').click({ force:true })    
        })
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(6).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' 5,7,9 ').click({ force:true })    
        })
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(7).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' Red ').click({ force:true })    
        })
        cy.get('.testBtn').click({force:true})
        cy.wait(2000)
        cy.get('.testBtn').click({force:true})
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(0).find('span').children('span')
            .should('have.text','Goa')
            
        })
    })

    it('select master publication and generate 42', () => {
        let renameFileName = 'project_variables_42.pdf'
        cy.selectProjectPA('Project_Variables_15-04-2020')
        cy.wait(2000)
        cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
        cy.wait(2000)
        cy.get(dashboardSelectors.generationVariable).click({ force : true })
        cy.get(dashboardSelectors.selectdropdown)
        .within(() => {
            cy.contains('dynamisch ').click( { force: true })
        })
        cy.wait(2000);
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.contains('India').click({ force:true })
        })
        cy.wait(2000);
        cy.contains(' Germany ').click({ force:true })
        cy.get(dashboardSelectors.appTable).within(() => {
            cy.get('mat-checkbox').eq(0).find('input').click({force:true})
        })
        cy.wait(1000)
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(11).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' Srilanka ').click({ force:true })    
        })
        cy.get('[placeholder="Single_withoutLOV_Text_document"]').eq(0).clear({force:true}).type('InBetween_test')
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(13).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' 2,4,5, 5,4,3 ').click({ force:true })    
        })
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(14).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' chickoo ').click({ force:true })    
        })
        cy.get('[placeholder="Single_withoutLOV_number_document"]').eq(1).clear({force:true}).type('22')
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(17).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' 23 ').click({ force:true })    
        })
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(18).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' 78, 34 ').click({ force:true })    
        })
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(19).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' 7 ').click({ force:true })    
        })
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

    it('select master publication and generate 44', () => {
        let renameFileName = 'project_variables_44.pdf'
        cy.selectProjectPA('Project_Variables_15-04-2020')
        cy.wait(2000)
        cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
        cy.wait(2000)
        cy.get(dashboardSelectors.generationVariable).click({ force : true })
        cy.get(dashboardSelectors.selectdropdown)
        .within(() => {
            cy.contains('dynamisch ').click( { force: true })
        })
        cy.wait(2000);
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.contains('India').click({ force:true })
        })
        cy.wait(2000);
        cy.contains(' Germany ').click({ force:true })
        cy.get('.fCheckBox').eq(2).click();
        cy.wait(1000)
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(0).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' Goa ').click({ force:true })    
        })
        cy.get('.fCheckBox').eq(1).click();
        cy.wait(1000)
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(0).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' India ').click({ force:true })    
        })
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

    it('select master publication and generate 45', () => {
        let renameFileName = 'project_variables_45.pdf'
        cy.selectProjectPA('Project_Variables_15-04-2020')
        cy.wait(2000)
        cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
        cy.wait(2000)
        cy.get(dashboardSelectors.generationVariable).click({ force : true })
        cy.get(dashboardSelectors.selectdropdown)
        .within(() => {
            cy.contains('dynamisch ').click( { force: true })
        })
        cy.wait(2000);
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.contains('India').click({ force:true })
        })
        cy.wait(2000);
        cy.contains(' Germany ').click({ force:true })
        cy.get('.fCheckBox').eq(0).click();
        cy.wait(1000)
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(0).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' InBetween ').click({ force:true })    
        })
        cy.get('.fCheckBox').eq(1).click();
        cy.wait(1000)
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(0).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' India ').click({ force:true })    
        })
        cy.get('.fCheckBox').eq(2).click();
        cy.wait(1000)
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(0).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' Goa ').click({ force:true })    
        })
        cy.get('.fCheckBox').eq(3).click();
        cy.wait(1000)
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(0).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' InBetween ').click({ force:true })    
        })
        cy.get('.fCheckBox').eq(4).click();
        cy.wait(1000)
        cy.get(dashboardSelectors.genSelection).within(() => {
            cy.get('mat-select').eq(0).click({ force:true })
            
        })
        cy.get('.genVar').within(() => {
            cy.contains(' India ').click({ force:true })    
        })
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

    it('check logout', () => {
        cy.selectProjectPA('Project_Variables_15-04-2020')
        cy.wait(2000)
        cy.get(dashboardSelectors.selectMasterPublication).click({ force:true })
        cy.wait(2000)
        cy.get(dashboardSelectors.generationVariable).click({ force : true })
        cy.get(dashboardSelectors.selectdropdown)
        .within(() => {
            cy.contains('dynamisch ').click( { force: true })
        })
        cy.wait(2000);
        cy.get('[alt="Login"]').eq(1).click({force:true})
        cy.get(loginScreenSelectors.loginBtn).should('be.visible')
    })
})    
