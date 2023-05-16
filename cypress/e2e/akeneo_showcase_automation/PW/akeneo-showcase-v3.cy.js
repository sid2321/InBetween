import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'
import elementSelectionSelectors from '../../../../selectors/element-selection-selectors.json'
import elementBuilderManager from '../../../../selectors/element-builder-selectors.json'
import generateSelectors from '../../../../selectors/generate-selectors.json'



describe('akeneo v3 showcase test cases', () => {

    let publication = ' Akeneo_Products '
    function retriveTableValue(){
        let list = []
        cy.get('table').find('tr').as('elements').then((row) => {
            for(let i=1; i<row.length-1; i++){
                let split = []
                cy.get('@elements')
                .eq(i).find('td')
                .eq(0).invoke('text').then(text => {
                    cy.log(text)
                    split = text.split(',');
                    cy.log(split[0])
                    list.push(split[0].trim())
                }).then(() => {
                    cy.wrap(list).as('list')
                })
            }
        })
    }

    function isAscendingOrder(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] > arr[i + 1]) {
            return false;
          }
        }
        return true;
      }
    
      function isDescendingOrder(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] < arr[i + 1]) {
            return false;
          }
        }
        return true;
      }


    function checkStackElements(value, index, array){
        cy.get('#Basket').within(() => {
            cy.get('tr').eq(index).find('td')
            .eq(1).contains(value)
        })
    }

    beforeEach(() => {
        cy.loginWithoutCaching(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    afterEach(() => {
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
        cy.clearAllLocalStorage()
    })

    let publications =  [' Brochure Clothing Summer 2021 ',' Catalog 2022 ',
    ' Catalog_2023 ',' Flyer Groceries 2022 ',' Flyer Outdoor 2022 ', 
    ' Flyer Outdoor 2023 ',' Fresh Food ',' Groceries ',' Groceries 2023 ',
    ' Jeans and Leggings ',' Packaged Food ',' Shirts and Hoodies ']

    publications.forEach((publication) => {
        it.skip(`check if publication are getting opened correctly - ${publication}`, () => {
            cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
            cy.selectPublication(projectData.akeneo.projectV1,publication);
            cy.wait(5000);
        })       
    })
    
    let master_publications = [' Clothing ',' Groceries ',' Outdoor ',' Publication ']
    master_publications.forEach((masterPublication) => {
        let newPub = `${masterPublication}_new`
        it.skip(`check if new publication are getting created - ${masterPublication}`, () => {
            cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
            cy.createNewPublication(projectData.akeneo.projectV1,masterPublication,newPub)
        })
    })

    let publications_dups =  [' Brochure Clothing Summer 2021 ',' Catalog 2022 ',
    ' Catalog_2023 ',' Flyer Groceries 2022 ',' Flyer Outdoor 2022 ', 
    ' Flyer Outdoor 2023 ',' Fresh Food ',' Groceries ',' Groceries 2023 ',
    ' Jeans and Leggings ',' Packaged Food ',' Shirts and Hoodies ']

    publications_dups.forEach((publications_dup) => {
    
        let newPub = `${publications_dup}_dup`
        it.skip(`check if publication are getting duplicated  correctly - ${publications_dup}`, () => {
            cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
            cy.duplicatePublication(projectData.akeneo.projectV1,publications_dup,newPub);
            cy.wait(5000);
        })       
    })

    it('Add elements to basket showcase v3', () => {
        let stacElem = ["Lexmark X632s MFP","Philips 37PFL9606H","Lexmark T652DN","Samsung 19IN LCD 910T SIL"]
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.wait(5000)
        cy.get('table')
        .find('tr').eq(3).find('td').eq(1).click();
        cy.get('table').find('tr').eq(6).click({
            ctrlKey:true,
            force:true,
        })  
        cy.get('table').find('tr').eq(8).click({
            ctrlKey:true,
            force:true,
        }) 
        cy.get('table').find('tr').eq(12).click({
            ctrlKey:true,
            force:true,
        }) 
        cy.get(elementSelectionSelectors.buttonGroup).within(() => {
            cy.get('button').eq(2).click();
        })
        stacElem.forEach(checkStackElements);
    })

    it('stack search functionality showcase v3', () => {

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.get(elementSelectionSelectors.stackPanelToolBar).within(()=>{
            cy.get('button').eq(0).click();
            cy.get('input').type('Lexmark')
        })
        cy.get('table')
        .find('tr').should('have.length.greaterThan',40).eq(1)
        .within(() => {
            cy.get('td').eq(1).contains('Lexmark');
        }) 
    })

    it('stack search ascending and descending order akeneo showcase v3', () => {

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        retriveTableValue()
        cy.get('@list').then(list => {
            const result = isAscendingOrder(list)
            if(!result) {
                assert.fail('order is not ascending')
            }
        })
        cy.contains(' ID ').click({force:true})
        retriveTableValue()
        cy.get('@list').then(list => {
            const result = isDescendingOrder(list)
            if(!result) {
                assert.fail('order is not descending')
            }
        })
        cy.get('table').find('tr').as('elements').then((row) => {
            for(let i=1; i<row.length-1; i++){
                cy.get('@elements').eq(i).click({force:true})
                cy.get(elementSelectionSelectors.quickPreview).should('be.visible')
                cy.get(elementSelectionSelectors.previewText).should('be.visible')
            }
        })
    })

    it('Drag drop page to builder tab v3', () => {
        let list = []
        let list_actual = ['Lexmark X632s MFP','Kodak i1410','Philips 37PFL9606H']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.wait(5000)
        cy.dragDropMasterPage(4,'product_92','1')
        cy.wait(2000)
        cy.dragCurentlinkstopage('#PGS\\.12_1_FAR\\.1',3)
        cy.get(elementBuilderManager.currentLinks).within(() => {
            cy.get('tr').eq(5).click({
                ctrlKey:true,
                force:true})
            cy.get('tr').eq(6).click({force:true,ctrlKey:true,})
        })
        cy.dragCurentlinkstopage('#PGS\\.12_1_FAR\\.1',6)
        cy.get("#PGS\\.12_1_FAR\\.1").within(() => {
            cy.get('.elementsDropped').as('elem').then((elem) => {
                for(let i=1; i<elem.length-1; i++){
                    cy.get('@elem')
                    .eq(i).find('div')
                    .eq(0).invoke('text').then(text => {
                        list.push(text.trim())
                    }).then(() => {
                        cy.wrap(list).as('list')
                    })
                }
            })
            cy.get('@list').then(list => {
                for (let i = 0; i <= list_actual; i++) {
                    let split = []
                    split = list[i].split(',');
                    cy.log(split[0])
                    if(split[0] != listactual[i]){
                        assert.fail('elements are not dropped properly')
                    }
                }
            })
        })
        cy.saveProject();

    })

    it('preview pages in builder tab', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.wait(5000)
        cy.get(elementBuilderManager.previewPage).eq(4).click({force:true})
        cy.get('[alt="Loading..."]',{ timeout: 200000 }).should('not.exist')
        cy.get('[alt="No Products To Preview"]',{ timeout: 200000 }).should('have.length.greaterThan',5)
    })

    it.skip('convert to indd marketing', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.wait(5000)
        cy.get('#PGS\\.1_0_page').as('page').within(() => {
            cy.contains(' album ').click();
            cy.wait(2000);
        })    
        cy.get('.mat-menu-panel').within(() => {
            cy.contains(' Media Design ').click({force:true});
        })
        cy.get('[role="dialog"]').within(() => {
            cy.get(elementBuilderManager.closeDialog).click();
        })
        cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(212, 14, 126)')
        })
        cy.get('#PGS\\.1_0_page').as('page').within(() => {
            cy.contains(' album ').click();
            cy.wait(2000);
        })    
        cy.get('.mat-menu-panel').within(() => {
            cy.contains(' Marketing ').click({force:true});
        })
        cy.get('[role="dialog"]').within(() => {
            cy.get(elementBuilderManager.closeDialog).click();
        })
        cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(0, 164, 238)')
        })

    })

    it('convert workflow stage marketing finishing', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.wait(5000)
        cy.get('#PGS\\.4_2_page').as('page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).click({force:true});
        })  
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('Finished').click({force:true});
        })
        cy.addCommentsToConversion('finishing')
        cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(24, 193, 108)')
        })
    })    

    it('convert workflow stage media design', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.wait(5000)
        cy.get('#PGS\\.4_2_page').as('page').within(() => {
            cy.contains(' album ').click();
            cy.wait(2000);
        })  
        cy.get('.mat-menu-panel').as('dropdown').within(() => {
            cy.contains(' Media Design ').click({force:true});
        })
        cy.addCommentsToConversion('Media Design')
        cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(212, 14, 126)')
            cy.get(elementBuilderManager.workFlowBar).click({force:true});
        })
        cy.get('@dropdown').within(() => {
            cy.contains('Edit').click({force:true});
        })
        cy.addCommentsToConversion('edit')
        cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(113, 0, 168)')
            cy.get(elementBuilderManager.workFlowBar).click({force:true});
        })
        cy.get('@dropdown').within(() => {
            cy.contains('Review').click({force:true});
        })
        cy.addCommentsToConversion('Review')
         cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(255, 204, 0)')
            cy.get(elementBuilderManager.workFlowBar).click({force:true});
        })
        cy.get('@dropdown').within(() => {
            cy.contains('Finished').click({force:true});
        })
        cy.addCommentsToConversion('Finished')
        cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(24, 193, 108)')
        })
    })    


    it('convert workflow stage Distribution', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.wait(5000)
        cy.get('#PGS\\.4_2_page').as('page').within(() => {
            cy.contains(' album ').click();
            cy.wait(2000);
        })  
        cy.get('.mat-menu-panel').as('dropdown').within(() => {
            cy.contains(' Distribution ').click({force:true});
        })
        cy.addCommentsToConversion('distribution')
        cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(143, 148, 152)')
            cy.get(elementBuilderManager.workFlowBar).click({force:true});
        })
        cy.get('@dropdown').within(() => {
            cy.contains('In Work').click({force:true});
        })
        cy.addCommentsToConversion('in work')
        cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(0, 164, 238)')
            cy.get(elementBuilderManager.workFlowBar).click({force:true});
        })
        cy.get('@dropdown').within(() => {
            cy.contains('Review').click({force:true});
        })
        cy.addCommentsToConversion('Review')
         cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(255, 204, 0)')
            cy.get(elementBuilderManager.workFlowBar).click({force:true});
        })
        cy.get('@dropdown').within(() => {
            cy.contains('Finished').click({force:true});
        })
        cy.addCommentsToConversion('Finished')
        cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(24, 193, 108)')
        })
    })

    it('convert in finishing page to indd', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.wait(5000)
        cy.get('#PGS\\.4_2_page').as('page').within(() => {
            cy.contains(' album ').click();
            cy.wait(2000);
        })  
        cy.get('.mat-menu-panel').as('dropdown').within(() => {
            cy.contains(' Media Design ').click({force:true});
        })
        cy.addCommentsToConversion('Media Design')
        cy.get('@page').within(() => {
            cy.get(elementBuilderManager.workFlowBar).should('have.css', 'background')
            .and('include', 'rgb(212, 14, 126)')
        })
        cy.get('#wholePage_PGS\\.4_2').within(() => {
            cy.get('#drag1').within(() =>{
                cy.get('#part1').click( {force: true });
            })
            cy.wait(2000);
        })
        cy.get(elementBuilderManager.conIndesign).parents('button').click();
        cy.get('[alt="Loading..."]', { timeout: 50000}).should('not.exist')
        cy.get('.imgdrop', { timeout: 50000 }).should('exist')
        cy.saveProject();
    })

    it('add section and add pages to a section', () => {

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.wait(5000)
        cy.get('#wholePage_PGS\\.12_1').within(() => {
           cy.get(elementBuilderManager.createSection).click({force:true})
        })
        cy.get(elementBuilderManager.sectionHeader, {timeout:15000}).dblclick({force:true})
        cy.get(elementBuilderManager.editSectionHeader).clear().type('akeneo_section');
        cy.get('#PGS\\.3_0_DAR\\.2').as('clothingGrid').dragTo('#PGS\\.12_1_FAR\\.1')
        cy.get('#PGS\\.3_1').find('[alt="minimize"]').should('exist')
        cy.saveProject();
    })

    it.only('generate pdf publications',() => {
        let renameFileName = 'akeneo-v3-hq-pdf.pdf'
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.wait(2000)
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.get(generateSelectors.previewPublication).as('previewButton').click({force:true})
        cy.get('@previewButton',{timeout:180000}).should('have.css', 'background')
            .and('include', 'rgb(255, 64, 129)')
        cy.get('.pageNum').as('elem').then((elem) => {
                cy.get('@elem')
                .invoke('text').then(text => {
                   let number = text.split("/")
                   let i = 0;
                   while (i < number[1]-2){
                    cy.contains('arrow_forward').click({force:true})
                    cy.get('[alt="No Products To Preview"]').should('exist')
                    i++;
                }      
            })
        })
        cy.get("[aria-label='Output Formats']").click();
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' HQ-PDF ').click();
        })
        cy.get("[placeholder='PDF Quality Settings']").click();
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(' PDFX3 2002 ').click();
        })
        cy.get("button[type='submit']").click();
        cy.get('.progress-bar',{ timeout: 150000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);  
    })  
    
    it.only('generate indd publications',() => {
        let renameFileName = 'akeneo-v3.indd'
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV3,publication);
        cy.wait(2000)
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
        cy.get("[aria-label='Output Formats']").click();
        cy.contains(' INDD ').click();
        cy.get("button[type='submit']").click();
        cy.get('.progress-bar',{ timeout: 175000000 }).should('not.exist');
        cy.get('.jobListContent').within(() => {
            cy.get('mat-cell').eq(0).find('span').as('filename')
        })
        cy.disablePopUp();
        cy.downloadGeneratedFile();
        cy.verifyAndRenameDownlodedFile(renameFileName);  
    })  
})
        
   // PGS.10_1_FAR.1

    /*it.only('annotations manager drag rectangle', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,' Catalog_2023 ');
        cy.contains('C').click({force:true})
        cy.waitforimageLoad()
        cy.get(annotationManager.rectangleComment).click()
        cy.wait(2000)
        cy.get(annotationManager.canvasAnnot).trigger('mouseover','center')
        cy.wait(5000)
        /*.trigger('mousedown', { which: 1, pageX: 100, pageY: 100 })
        .trigger('mousemove', { clientX: 200, clientY: 200 })
        .trigger('mouseup');
    })*/