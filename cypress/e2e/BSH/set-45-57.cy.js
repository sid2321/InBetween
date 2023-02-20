import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info_bsh.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import bshSettings from '../../../selectors/bsh/bsh-setting-selectors.json'
import publicationSeletorScreen from '../../../selectors/publication-screen-selectors.json';

describe('bsh generation BSH_Pricelist_Neff', () => {

    beforeEach(() => {
        cy.loginWithoutCaching(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('create a new publication and select a data source', () => {
        let currentLinks = ['S125HBS01D','S213Q60S2D','S125HBS00D','S125HAS24E']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.createNewPublication(projectData.bsh.projectNeff,projectData.bsh.masterPublication,'automation_publication')
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('B').click();
        })
        cy.dragDropMasterPage(0,'product_page',1);
        cy.contains(' more_horiz ').click({ force: true });
        cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
          cy.get('button').eq(0).click()
        })
        for(let x in currentLinks){
            cy.search_and_add_currentlinks(currentLinks[x],'#PGS\\.0_0_FAR\\.1');
            
        }
        cy.check_current_links_on_product_page('#PGS\\.0_0_FAR\\.1',currentLinks)
        cy.saveProject();
    })

    it('select data source in settings tab', () => {
        let renameFileName = "bsh_generation_step_51.pdf"
        let generations  = [] 
        let formats = ['INDD','HQ-PDF']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectNeff,' automation_publication ');
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.contains('Got It').click();
        cy.get('.dataSourceDropdown').eq(1).within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.contains('additional_info.csv').click({ force:true });
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click( { force:true });
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.get('mat-option').then((options) => {
                for(let i=0; i<options.length; i++){
                    cy.get('mat-option')
                    .eq(i)
                    .find('span')
                    .eq(0).invoke('text').then(text => {
                        generations.push(text)
                    }).then(() => {
                        cy.wrap(generations).as('generations')
                    })
                }
            })
            /*cy.get('@generations').then((generations) => {
                for(let x in generations){
                    var isexist = false
                        isexist = formats.includes(generations[x].trim())
                        cy.log(isexist)
                            if(!isexist){
                                assert.fail();
                            }
                }
            })*/
            cy.contains(' HQ-PDF ').click();
        })
        cy.get('form').within(() => {
            cy.get("[placeholder='PDF Quality Settings']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' PDFX3 2002 ').click();
        })
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 1500000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);  
    })

    it('select data source in settings tab file csv_1', () => {

        let renameFileName = "bsh_generation_step_53.pdf"
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectNeff,' automation_publication ');
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.contains('Got It').click();
        cy.get(bshSettings.uploadCsv).attachFile(['additional_info_csv_selection_1.csv'])
        cy.get(bshSettings.uploadButton).within(() => {
            cy.get('button').click();
        })
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' HQ-PDF ').click();
        })
        cy.get('form').within(() => {
            cy.get("[placeholder='PDF Quality Settings']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' PDFX3 2002 ').click();
        })
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 1500000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);  
    })

    it('select data source in settings tab file csv_2', () => {

        let renameFileName = "bsh_generation_step_53_csv_2.pdf"
        let renameFileName_two = "bsh_generation_step_53_csv.pdf"
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectNeff,' automation_publication ');
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.contains('Got It').click();
        cy.get(bshSettings.uploadCsv).attachFile(['additional_info_csv_selection_2.csv'])
        cy.get(bshSettings.uploadButton).within(() => {
            cy.get('button').click();
        })
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' HQ-PDF ').click();
        })
        cy.get('form').within(() => {
            cy.get("[placeholder='PDF Quality Settings']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' PDFX3 2002 ').click();
        })
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 1500000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);  
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.get('.dataSourceDropdown').eq(1).within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.contains('additional_info.csv').click( { force: true });
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.get('form').within(() => {
            cy.get("[aria-label='Output Formats']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' HQ-PDF ').click();
        })
        cy.get('form').within(() => {
            cy.get("[placeholder='PDF Quality Settings']").click();
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' PDFX3 2002 ').click();
        })
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })
        cy.get('.progress-bar',{ timeout: 15000000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName_two);  

    })
})