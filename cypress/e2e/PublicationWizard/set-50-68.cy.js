import projectData from '../../../fixtures/project_publication.json';
import userData from '../../../fixtures/user_info.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'


describe('set 50-68 test cases', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })
    

    it('Generate selected pages', () => {
        let renameFileName = 'generate_selected_pages_step_56.pdf'
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.wait(5000);
        cy.get('#PGS\\.6').find('#part1').click({ force: true});
        cy.wait(900);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.contains(' chevron_right ').click({ force:true })
        cy.get('.pubCheck', {timeout:1000}).within(() =>{
            cy.get('[type="checkbox"]').should('be.checked')
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' PDF ').click();
        })
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 150000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);  
    })

    it('Generate in append mode', () => {

        let renameFileName_one = 'generate_in_append_mode.indd'
        let renameFileName_two = 'generate_in_append_mode_hq.pdf'
        let renameFileName_three = 'generate_in_append_mode_int.pdf'

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.wait(5000);
        cy.get('#PGS\\.6').find('#part1').click({ force: true});
        cy.wait(900);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.contains(' chevron_right ').click({ force:true })
        cy.get('.pubCheck', {timeout:1000}).within(() =>{
            cy.get('[type="checkbox"]').should('be.checked')
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' INDD ').click();
        })
        cy.get('#divA').find('mat-checkbox').eq(0).as('Append_Mode')
        .within(() => {
            cy.get('input').click({force: true});
        })
        cy.get('#divA')
        .within(() => {
            cy.get('button').eq(1).click({force: true});
        })
        cy.disablePopUp();
        cy.wait(1000);
        cy.get('#uploadappendpage')
        .selectFile('append2020.indd', { force: true});
        cy.wait(3000)
        cy.get('input[value="INDESIGN_STYLES"]', {timeout: 3000}).check({ force:true }); 
        cy.wait(1000);
        cy.get('input[value="Append_page"]', {timeout: 3000}).check({ force:true }); 
        cy.wait(3000);
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 150000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName_one);
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' HQ-PDF ').click();
        })
        cy.get('#divA').find('mat-checkbox').eq(0).as('Append_Mode')
        .within(() => {
            cy.get('input').click({force: true});
        })
        cy.get('#divA')
        .within(() => {
            cy.get('button').eq(1).click({force: true});
        })
        cy.disablePopUp();
        cy.wait(1000);
        cy.get('#uploadappendpage')
        .selectFile('append2020.indd', { force: true});
        cy.wait(3000)
        cy.get('input[value="INDESIGN_STYLES"]', {timeout: 3000}).check({ force:true }); 
        cy.wait(1000);
        cy.get('input[value="Append_page"]', {timeout: 3000}).check({ force:true }); 
        cy.wait(3000);
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 150000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName_two);
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' INT-PDF ').click();
        })
        cy.get('#divA').find('mat-checkbox').eq(0).as('Append_Mode')
        .within(() => {
            cy.get('input').click({force: true});
        })
        cy.get('#divA')
        .within(() => {
            cy.get('button').eq(1).click({force: true});
        })
        cy.disablePopUp();
        cy.wait(1000);
        cy.get('#uploadappendpage')
        .selectFile('append2020.indd', { force: true});
        cy.wait(3000)
        cy.get('input[value="INDESIGN_STYLES"]', {timeout: 3000}).check({ force:true }); 
        cy.wait(1000);
        cy.get('input[value="Append_page"]', {timeout: 3000}).check({ force:true }); 
        cy.wait(3000);
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 150000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName_three);
    })


    it('Generation using excel file', () => {

        let renameFileName_one = 'generate_excel_in_append_mode.xlsx'
        let renameFileName_two = 'generate_excel_in_beginning_mode.xlsx'
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.wait(5000);
        cy.get('#PGS\\.6').find('#part1').click({ force: true});
        cy.wait(900);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.contains(' chevron_right ').click({ force:true })
        cy.get('.pubCheck', {timeout:1000}).within(() =>{
            cy.get('[type="checkbox"]').should('be.checked')
        })
        cy.generateExcelFiles('append');
        cy.get('.progress-bar',{ timeout: 150000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName_one);
        cy.generateExcelFiles('beginning');
        cy.get('.progress-bar',{ timeout: 270000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName_two);
    })

    it.skip('Generation using data source', () => {
        let renameFileName = 'generate_using_data_source.pdf'
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.masterPublication);
        cy.wait(5000);
        cy.get('#PGS\\.6').find('#part1').click({ force: true});
        cy.wait(900);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.contains('Got It').click();
        cy.get('#file').should('exist')
        .selectFile('REST_XML_Export_1.xml',{ force:true })
        cy.get('.uploadButton').within(() => {
            cy.get('button').click({ force:true })
        })
        cy.wait(1000);
        cy.get('#convertYes').click();
        cy.wait(2000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' PDF ').click();
        })
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 150000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);
    })

})