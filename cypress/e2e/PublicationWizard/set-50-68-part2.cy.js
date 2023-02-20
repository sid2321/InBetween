import projectData from '../../../fixtures/project_publication.json';
import userData from '../../../fixtures/user_info.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'


describe('set 50-68 part2 test cases', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })
    

    it('Generate in append mode use existing', () => {

        let renameFileName_one = 'generate_in_append_mode_use_existing.indd'
        let renameFileName_two = 'generate_in_append_mode_hq_use_existing.pdf'
        let renameFileName_three = 'generate_in_append_mode_int_use_existing.pdf'

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
        cy.get('input[value="USE_EXISTING_PAGES"]', {timeout: 3000}).check({ force:true }); 
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
        cy.get('input[value="USE_EXISTING_PAGES"]', {timeout: 3000}).check({ force:true }); 
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
        cy.get('input[value="USE_EXISTING_PAGES"]', {timeout: 3000}).check({ force:true }); 
        cy.wait(3000);
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 1500000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName_three);
    })

    it('Generate Indesign Package', () => {
        let renameFileName = 'generate_indesign_package.zip'
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
        cy.get('#divA').find('mat-checkbox').eq(2)
        .within(() => {
            cy.get('input').click({force: true});
        })
        cy.get('#divA').find('mat-checkbox').eq(3)
        .within(() => {
            cy.get('input').click({force: true});
        })
        cy.get('#divA').find('mat-checkbox').eq(4)
        .within(() => {
            cy.get('input').click({force: true});
        })
        cy.wait(2000);
        cy.get('#divA').find('mat-checkbox').eq(5).click({ force: true });
        cy.wait(10000)
        cy.get('#divA').find('mat-checkbox').eq(5)
        .within(() => {
            cy.get('input').check({force: true});
        })
        cy.wait(2000);
        cy.get('[placeholder=" Choose Quality"]').click({ force: true })
        cy.get('.mat-autocomplete-panel').within(() => {
            cy.contains('Press Quality').click();
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
