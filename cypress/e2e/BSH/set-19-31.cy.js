import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info_bsh.json'
import settingsSelectors from '../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import bshSelectors from '../../../selectors/bsh/bsh-selection-selectors.json'
import elementBuilderSelectors from '../../../selectors/element-builder-selectors.json';

describe('bsh check filters TEST_UI-Performance_S', () => {

    beforeEach(() => {
        cy.login(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('drag drop to basket', () => {
        let stack = []
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(2000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.get('table').within(() => {
            cy.get('tr').eq(2).find('td')
            .eq(0).click().invoke('text').then((text1) => {
                stack.push(text1.trim())
            })
            cy.get('tr').eq(5).click({
                    ctrlKey:true,
                    force:true,
            }).as('drag').find('td')
            .eq(0).invoke('text').then((text2) => {
                stack.push(text2.trim())
            }).then(() => {
                cy.wrap(stack).as('stack')
            })  
        })    
        cy.get('@drag').then(el => {

            const draggable = el[0]  // Pick up this
            draggable.dispatchEvent(new MouseEvent('mousemove'));
            cy.wait(900)
            draggable.dispatchEvent(new MouseEvent('mousedown'));
    
            cy.get(elementSelectionSelectors.Basket).find('tbody').then(el => {
                const droppable = el[0]  // Drop over this
                const coords = droppable.getBoundingClientRect();
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 220, clientY: 100 }));
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 125, clientY: coords.y + 160 }));
                draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 5, clientY: coords.y + 10 }));
            })
        })
        cy.saveProject();
    })

    it('remove element from basket', () => {

        let basket = []
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(2000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.get(elementSelectionSelectors.Basket)
        .find('tr')
        .eq(1).click({force: true})
        .find('td')
        .eq(0).invoke('text').as('text')
        cy.contains(' arrow_back').click();
        cy.get('#Basket').within(() => {
            cy.get('tr').then((row) => {
                for(let i=0; i<row.length; i++){
                    cy.get('tr')
                    .eq(i)
                    .find('td')
                    .eq(0).invoke('text').then(text => {
                        basket.push(text.trim())
                    }).then(() => {
                        cy.wrap(basket).as('basket')
                    })
                }
            })
        })
        cy.get('@basket').then(basket => {
            cy.get('@text').then(text => {
                var isexist = true
                isexist = basket.includes(text.trim())
                cy.log(isexist)
                    if(isexist){
                        assert.fail();
                    }
            })       
        })
        cy.saveProject();
    })

    it('select element from basket', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(2000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.get('.select_all_right').eq(1).click();
        cy.get(elementSelectionSelectors.Basket).within(() => {
            cy.get('tr').then((row) => {
                for(let i=1; i<=row.length-1; i++){
                    cy.get('tr')
                    .eq(i)
                    .find('.stackEleBasket')
                    .should('have.css','background-color')
                    .and('include', 'rgb(233, 30, 99)')
                }
            })
        })
    })

    it('drag drop product_page to page_planning', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(2000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.dragDropMasterPage(0,'product_page',1);
        cy.dragDropMasterPage(1,'index_page',1);
        cy.dragDropMasterPage(2,'cover_page',1);
        cy.dragDropMasterPage(3,'empty_page',1);
        cy.dragDropMasterPage(0,'empty_page',5);
        cy.get(elementBuilderSelectors.playAreaDrop).within(() => {
            cy.get('.pPageContainer').should('have.length','19')
        })  
    })

    it('switch between Basket and Stack', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(2000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.contains(' more_horiz ').click({ force: true });
        cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
          cy.get('button').eq(2).invoke('text').as('text1')
        })
        cy.get('@text1').then(text => {
            cy.log(text);
            switch(text.trim()) {
                case 'swap_horiz  Go to Stacks':     
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).click()
                    })
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).contains(' Go to Basket ')
                    })
                    break;
                case 'swap_horiz  Go to Basket':     
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).click()
                    })
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).contains(' Go to Stacks ')
                    })
                    break;             
                default:
                    case 'Go to Stacks':     
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).click()
                    })
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).contains('have.text',' Go to Basket ')
                    })      
            }
        })
        cy.contains(' more_horiz ').click({ force: true });
        cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
          cy.get('button').eq(2).invoke('text').as('text1')
        })
        cy.get('@text1').then(text => {
            cy.log(text);
            switch(text.trim()) {
                case 'swap_horiz  Go to Stacks':     
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).click()
                    })
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).contains(' Go to Basket ')
                    })
                    break;
                case 'swap_horiz  Go to Basket':     
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).click()
                    })
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).contains(' Go to Stacks ')
                    })
                    break;             
                default:
                    case 'Go to Stacks':     
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).click()
                    })
                    cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                        cy.get('button').eq(2).contains('have.text',' Go to Basket ')
                    })      
            }
        })         
    })

    it('select elements from basket', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(2000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.get(elementSelectionSelectors.Basket)
        .find('tr')
        .eq(1).click({force: true}).within(() => {
            cy.get('div').eq(0)
            .should('have.css','background-color')
            .and('include', 'rgb(233, 30, 99)')
        })
        cy.wait(2000);
        cy.get('.quick-preview-withBasketData').compareSnapshot('elementDetails',0.8);
        cy.get('#Basket').within(() => {
            cy.get('tr').then((row) => {
                cy.get('tr').eq(row.length-1).click({ force: true}).within(() => {
                    cy.get('div').eq(0)
                    .should('have.css','background-color')
                    .and('include', 'rgb(233, 30, 99)')
                });
            })
        })
    })

    it('select elements from basket using ctrl key and drag drop on master page', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.get('#Basket').within(() => {
            cy.get('tr').eq(0).click({ force:true})
            cy.get('tr').then((row) => {
                cy.get('tr').eq(row.length-1).click({ 
                    ctrlKey: true,
                    force: true
                });
            })
        })
        cy.get('#basket_table > .mat-card-content > #BasketTable > app-table > .table > .divWidth > #Basket > #stackelm > :nth-child(1)').then(el => {
            const draggable = el[0]  // Pick up this
            draggable.dispatchEvent(new MouseEvent('mousemove'));
            cy.wait(900)
            draggable.dispatchEvent(new MouseEvent('mousedown'));
            cy.get('#PGS\\.9_2_FAR\\.1').then(el => {
                const droppable = el[0]  // Drop over this
                const coords = droppable.getBoundingClientRect();
                cy.log(coords)
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 30, clientY: coords.y + 40 }));
                draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 20, clientY: coords.y + 40 }));
            })
        })
        cy.get('#PGS\\.9_2_FAR\\.1').find('.elementsDropped').within(() => {
            cy.get('div').should('have.length', 2)
        })    
    })  
    
    it('select elements from stack using ctrl key and drag drop on master page', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(2000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.contains(' more_horiz ').click({ force: true });
        cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
          cy.get('button').eq(2).click()
        })
        cy.get('#Stack').within(() => {
            cy.get('tr').eq(0).click({ force:true})
            cy.get('tr').then((row) => {
                cy.get('tr').eq(row.length-1).click({ 
                    ctrlKey: true,
                    force: true
                });
            })
        })
        cy.get('#basket_table > .mat-card-content #StackTable > app-table > .table > .divWidth > #Stack > #stackelm > :nth-child(1)').then(el => {
            const draggable = el[0]  // Pick up this
            draggable.dispatchEvent(new MouseEvent('mousemove'));
            cy.wait(900)
            draggable.dispatchEvent(new MouseEvent('mousedown'));
            cy.get('#PGS\\.9_2_FAR\\.1').then(el => {
                const droppable = el[0]  // Drop over this
                const coords = droppable.getBoundingClientRect();
                cy.log(coords)
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 30, clientY: coords.y + 40 }));
                draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 20, clientY: coords.y + 40 }));
            })
        })
        cy.get('#PGS\\.9_2_FAR\\.1').find('.elementsDropped').within(() => {
            cy.get('div').should('have.length', 2)
        })    
    })

    it.skip('select three elements from stack using ctrl key and drag drop on master page', (() => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(2000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.contains(' more_horiz ').click({ force: true });
        cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
          cy.get('button').eq(2).invoke('text').as('text1')
        })
        cy.get('@text1').then(text => {
            if(text.trim()==='swap_horiz  Go to Stacks'){
                cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
                    cy.get('button').eq(2).click()
                })
            }else{
                cy.log('already on stack')
            }
        })
        cy.get('#basket_table').find('#Stack').within(() => {
            cy.get('tr').eq(1).within(() => {
                cy.get('#stackEle').click({force:true});
            });
        })
        cy.get('#basket_table > .mat-card-content #StackTable > app-table > .table > .divWidth > #Stack > #stackelm > :nth-child(2)').then(el => {
            cy.get(el).dragTo('#PGS\\.9_2_FAR\\.1') 
            const draggable = el[0]  // Pick up this
            draggable.dispatchEvent(new MouseEvent('mousemove'));
            cy.wait(900)
            draggable.dispatchEvent(new MouseEvent('mousedown'));
            cy.get('#PGS\\.9_2_FAR\\.1').then(el => {
                const droppable = el[0]  // Drop over this
                const coords = droppable.getBoundingClientRect();
                cy.log(coords)
                cy.get(el).scrollIntoView({ easing: 'linear' },{ offset: { top: coords.top + 5} })
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 30, clientY: coords.y + 40 }));
                draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 20, clientY: coords.y + 40 }));
            })
        })
        cy.get('#PGS\\.9_2_FAR\\.1').find('.elementsDropped').within(() => {
            cy.get('div').should('have.length', 3)
        })
    }))
})
