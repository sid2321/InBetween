import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'
import elementSelectionSelectors from '../../../../selectors/element-selection-selectors.json'
import elementBuilderManager from '../../../../selectors/element-builder-selectors.json'
import generateSelectors from '../../../../selectors/generate-selectors.json'



describe('akeneo v1 showcase login open publication', () => {

    let publication = ' Catalog_2023 '
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
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
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
    ' Jeans and Leggings ',' Packaged Food ',' Shirts and Hoodies ',' SKI ']

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
        it.skip(`check if publication are getting duplicated correctly - ${publications_dup}`, () => {
            cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
            cy.duplicatePublication(projectData.akeneo.projectV1,publications_dup,newPub);
            cy.wait(5000);
        })       
    })

    it('Add elements to basket', () => {
        let stacElem = ["Eternal","Samy","Outdoor overview","Hurricane Hedwig"]
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,publication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.wait(5000)
        cy.get('table')
        .find('tr').eq(3).find('td').eq(0).click();
        cy.get('table').find('tr').eq(6).click({
            ctrlKey:true,
            force:true,
        })  
        cy.get('table').find('tr').eq(11).click({
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

    it('stack search functionality showcase v1', () => {

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,publication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.get(elementSelectionSelectors.stackPanelToolBar).within(()=>{
            cy.get('button').eq(0).click();
            cy.get('input').type('Samy')
        })
        cy.get('table')
        .find('tr').should('have.length',3).eq(1)
        .within(() => {
            cy.get('td').eq(1).contains('Samy');
        }) 
        cy.get(elementSelectionSelectors.stackPanelToolBar).within(()=>{
            cy.contains('clear ').click({force:true})
        })
        cy.wait(1000)
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

    it('apply filter and chek if filters are applied', () => {
       
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,publication);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.get('.mat_card_filter').find('mat-select').eq(0).click({ force:true })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('White').click({force:true})
        })
        cy.wait(1000)
        cy.get('.mat_card_filter').find('mat-select').eq(1).click({ force:true })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('in stock').click({force:true})
        })
        cy.get('table')
        .find('tr').should('have.length',3).eq(1)
        .within(() => {
            cy.get('td').eq(1).contains('Transient');
        })
    })

    it('Drag drop page to builder tab', () => {
        let list = []
        let list_actual = ['Tomato ketchup','Vanilla sugar']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,publication);
        cy.wait(5000)
        cy.contains('keyboard_arrow_right').click({force:true})
        cy.contains('keyboard_arrow_right').click({force:true})
        cy.dragDropMasterPage(5,'groceries flow','1')
        cy.dragDropMasterPage(6,'groceries grid','1')
        cy.contains(' more_horiz ').click({force:true})
        cy.get('.mat-menu-panel').within(() => {
            cy.contains('search').click({force:true})
        })
        cy.get('#basket_table').as('search').within(() => {
            cy.get('[placeholder="search"]').click().type('C3S1P2');
        })
        cy.dragCurentlinkstopage('#PGS\\.15_2_DAR\\.1',1)
        cy.get('#PGS\\.15_2_DAR\\.1').find('.elementsDropped').within(() => {
            cy.get('div').should('have.text',' Truffle Pralinen ')
          })
        cy.get('@search').find('[placeholder="search"]').click().clear().type('C3S1P12');
        cy.dragCurentlinkstopage('#PGS\\.15_2_DAR\\.2',1)
        cy.get('#PGS\\.15_2_DAR\\.2').find('.elementsDropped').within(() => {
            cy.get('div').should('have.text',' Fusilli ')
          })
        cy.get('@search').find('[placeholder="search"]').click().clear().type('C3S1P6');
        cy.get('#PGS\\.14_3_FAR\\.1').scrollIntoView().should('be.visible')
        cy.dragCurentlinkstopage('#PGS\\.14_3_FAR\\.1',1)
        cy.get('#PGS\\.14_3_FAR\\.1').find('.elementsDropped').within(() => {
            cy.get('div').should('have.text',' Tomato ketchup ')
          })
        cy.get('@search').find('[placeholder="search"]').click().clear().type('C3S1P');
        cy.get(elementBuilderManager.currentLinks).within(() => {
            cy.get('tr').eq(0).click({
                ctrlKey:true,
                force:true})
        })
        cy.dragCurentlinkstopage('#PGS\\.14_3_FAR\\.1',21)
        cy.get("#PGS\\.14_3_FAR\\.1").within(() => {
            cy.get('.elementsDropped').as('elem').then((elem) => {
                for(let i=0; i<elem.length-1; i++){
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
                    if(split[0] != list_actual[i]){
                        assert.fail('elements are not dropped properly')
                    }
                }
            })
        })
        cy.saveProject();
        cy.get('#PGS\\.2_0_page').find('.pageTitleOverlay').click({force:true});
        cy.wait(2000);
        cy.get(elementBuilderManager.previewPage).eq(4).click({force:true})
        cy.get('[alt="Loading..."]',{ timeout: 200000 }).should('not.exist')
        cy.get('[alt="No Products To Preview"]',{ timeout: 200000 }).should('have.length',1)
        cy.get(elementBuilderManager.previewPage).eq(4).click({force:true})
        cy.get('#imgdrop_PGS\\.2_0', { timeout: 20000}).should('not.exist')
        cy.get(elementBuilderManager.previewPage).eq(4).click({force:true})
        cy.get('[alt="Loading..."]',{ timeout: 200000 }).should('not.exist')
        cy.get('[alt="No Products To Preview"]',{ timeout: 200000 }).should('have.length.greaterThan',10)
    })

    it('convert to indd and availaible for finishing', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,publication);
        cy.wait(2000)
        cy.get('#PGS\\.14_3_FAR\\.1').scrollIntoView().should('be.visible')
        cy.get('#PGS\\.14_3_page').as('page').within(() => {
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
        cy.get('#wholePage_PGS\\.14_3').within(() => {
            cy.get('#drag1').within(() =>{
                cy.get('#part1').click( {force: true });
            })
            cy.wait(2000);
        })
        cy.get(elementBuilderManager.conIndesign).parents('button').click();
        cy.get('[alt="Loading..."]', { timeout: 50000}).should('not.exist')
        cy.saveProject();

    })

    it('annotations manager', () => {
        cy.drawusingAnnotationsMnanager();

    })

    it('convert workflow stage marketing finishing', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,publication);
        cy.wait(5000)
        cy.get('#PGS\\.15_2_page').as('page').within(() => {
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
        cy.selectPublication(projectData.akeneo.projectV1,publication);
        cy.wait(5000)
        cy.get('#PGS\\.15_2_page').as('page')
        
        cy.get('@page').within(() => {
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
        cy.selectPublication(projectData.akeneo.projectV1,publication);
        cy.wait(5000)
        cy.get('#PGS\\.15_2_page').as('page').within(() => {
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


    it('add sections and add pages to a section', () => {

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,publication);
        cy.wait(5000)
        cy.get('#wholePage_PGS\\.2_0').as('page').within(() => {
           cy.get(elementBuilderManager.createSection).click({force:true})
        })
        cy.get('@page').siblings('#header').as('header')
        cy.get('@header').find(elementBuilderManager.sectionHeader, {timeout:15000}).dblclick({force:true})
        cy.get('@header').find(elementBuilderManager.editSectionHeader).clear().type('Cover');
        cy.get('@header').within(() => {
            cy.get('.colorpicker').click({ force:true })
        })
        cy.get('#ct_PGS\\.2').find('color-twitter').within(() => {
            cy.get('[title="#FF94C2FF"]').click({ force:true })
        })
        cy.get('@header').find('.sectionCreate').should('have.css', 'background')
        .and('include', 'rgb(255, 148, 194)')
        cy.dragDropMasterPage(2,'groceries flow','1')
        cy.get('#PGS\\.16').parent('#drag1').as('newClothingGrid')
        cy.get('@newClothingGrid').as('cover').dragTo('#PGS\\.2_0_SAR\\.1')
        cy.get('#PGS\\.16_1').find('[alt="minimize"]').should('exist')
        cy.contains('swap_horiz').click({ force:true })
        cy.contains('swap_horiz').click({ force:true })
        cy.get('.staticPageImport').dragTo('.dummyPage')
        cy.wait(2000)
        cy.get('#PGS\\.2_1_SAR\\.1').dragTo('#section_section5_PGS\\.17_0')
        cy.get('#PGS\\.2_0').find('[alt="minimize"]').should('exist')
        cy.dragCurentlinkstopage('#PGS\\.16_1_DAR\\.1',1)
        cy.saveProject();
    })

    it('generate hires-pdf pulications',() => {
        
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,publication);
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
                    do {
                    cy.get('[alt="No Products To Preview"]').should('exist')
                    cy.contains('arrow_forward').click({force:true})
                    i++;
                    }
                    while (i < number[1]-1);
                })
        })
        let languages =  [' en_GB ',' de_DE ',' fr_FR ',' en_US ']
        languages.forEach((language) => {
            cy.GenerateHiresPDF(language) 
        })  
    })  
    
    it('generate indd pulications',() => {
        let languages =  [' en_GB ',' de_DE ',' fr_FR ',' en_US ']
        languages.forEach((language) => {
            cy.GenerateHiresPDF(language) 
        })
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,publication);
        cy.wait(2000)
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('A').click();
        })
    }) 
    
    it.skip('refresh data from pim', () => {
        const product = {
            productID:"C3S1P13",
            description:"Demo",
            price:"2.3"
        }
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,publication);
        cy.makechangesToPIM(product)
    })
})
        