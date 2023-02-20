import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info.json'

describe('Publication creation', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('create a new publication', () => {
        const basketElements = ["Excalibur","Knights of the Round Table"];
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        /*this function is to create new publication
        {
            Step 40
            param:
             projectName: Eg: RDU
             publication: TimePiecesCard
             newPublication Name: <name>
        }*/
        cy.createNewPublication(projectData.newRDU.projectName,projectData.newRDU.publication,"Test_new_pub");
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        //
        cy.selectStack(projectData.newRDU.sub);
        cy.wait(5000);
        cy.get('table')
        .find('tr').eq(1).find('td').eq(1).click();
        cy.get('table').find('tr').eq(3).click({
            ctrlKey:true,
            force:true,
        }) 
        cy.get(elementSelectionSelectors.buttonGroup).within(() => {
            cy.get('button').eq(2).click();
        })
        for(let i = 0; i < basketElements.length; i++) {
            cy.get(elementSelectionSelectors.Basket)
            .find('tr').should('have.length',3).eq(i+1)
            .within(() => {
                cy.get('td').eq(1).contains(basketElements[i]);
            })
        }
        cy.saveProject();
    })

    it('duplicate and generate an existing publication', () => {
        let renameFileName = 'duplicate_and_generate_existing_pub.indd'
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.duplicatePublication(projectData.newRDU.projectName,
            projectData.newRDU.masterPublication,
            "test")  

        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.contains('Got It').click();
        cy.get('#b_col1').within(() => {
            cy.get('input').eq(0).click( {force:true} );
        })
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        }) 
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' INDD ').click();
        })
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 175000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);
    })
})