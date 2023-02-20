import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info.json'

describe('upload jsx file', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('upload jsx file and generate result', () => {

        let renameFileName = 'jsx_file_step_85.indd'
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.simple.projectName,projectData.simple.publication);
        cy.wait(2000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' INDD ').click();
        })

        cy.get('mat-checkbox').eq(3).as('Execute javascript')
        .within(() => {
            cy.get('input').click({force: true});
        })
        cy.disablePopUp();
        cy.get('#fileUpload')
        .attachFile(['AngleRotation.jsx', 'image_disappear.jsx','Test_Clesi.jsx']);
        cy.wait(3000)
        cy.get('.fileListCss').within(() => {
                cy.get('img').eq(3).click({force: true});
            cy.get('mat-checkbox').should('have.length',2)    
        })
        cy.get('.fileListCss').within(() => {
            cy.get('mat-checkbox').eq(0).within(() => {
                cy.get('input').click({force: true});
            })  
            cy.get('mat-checkbox').eq(1).within(() => {
                cy.get('input').click({force: true});
            })  
        })
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 50000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);
    })
})