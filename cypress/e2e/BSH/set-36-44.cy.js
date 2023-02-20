import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info_bsh.json'
import settingsSelectors from '../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import bshSelectors from '../../../selectors/bsh/bsh-selection-selectors.json'
import elementBuilderSelectors from '../../../selectors/element-builder-selectors.json';

describe('bsh add elements from basket and stack', () => {

    beforeEach(() => {
        cy.login(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('bsh add elements from basket', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.contains('select_all').click({force: true});
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
            cy.get('div').should('have.length.greaterThan', 3)
        })  
    })

    it('bsh add 50 elements from stack', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.contains(' more_horiz ').click({ force: true });
        cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
          cy.get('button').eq(2).click({ force: true });
        })
        cy.get('#Stack').within(() => {
            cy.get('tr').eq(0).click({ force:true})
            cy.get('tr').eq(49).click({ 
                    shiftKey: true,
                    force: true
                });
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
            cy.get('div').should('have.length.greaterThan', 40)
        })
    })

    it('bsh delete all product pages', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.get('#PGS\\.0_0_page').within(() =>{
            cy.get('.pageTtileContainer').click()
        })
        cy.get('#deletePage').click();
        cy.get('#delete').click();
        /*cy.get('#PGS\\.14_3_page').within(() =>{
            cy.get('.pageTtileContainer').click()
        })
        cy.get('#deletePage').click();
        cy.get('#delete').click();*/
        cy.get('#PGS\\.6_5_page').within(() =>{
            cy.get('.pageTtileContainer').click()
        })
        cy.get('#deletePage').click();
        cy.get('#delete').click();
        cy.get('#PGS\\.7_4_page').within(() =>{
            cy.get('.pageTtileContainer').click()
        })
        cy.get('#deletePage').click();
        cy.get('#delete').click();
        cy.get('#PGS\\.8_4_page').within(() =>{
            cy.get('.pageTtileContainer').click()
        })
        cy.get('#deletePage').click();
        cy.get('#delete').click();
        cy.get('#PGS\\.9_1_FAR\\.1').click();
        cy.wait(2000)
        cy.contains('select_all').click({ force:true });
        cy.get('#basket_table > .mat-card-content #StackTable > app-table > .table > .divWidth > #Stack > #stackelm > :nth-child(1)').then(el => {
            const draggable = el[0]  // Pick up this
            draggable.dispatchEvent(new MouseEvent('mousemove'));
            cy.wait(900)
            draggable.dispatchEvent(new MouseEvent('mousedown'));
            cy.get('#PGS\\.9_1_FAR\\.1').then(el => {
                const droppable = el[0]  // Drop over this
                const coords = droppable.getBoundingClientRect();
                cy.log(coords)
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 30, clientY: coords.y + 40 }));
                draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 20, clientY: coords.y + 40 }));
            })
        })
        cy.get('#PGS\\.9_1_FAR\\.1').find('.elementsDropped').within(() => {
            cy.get('div').should('have.length.greaterThan', 40)
        }) 
        cy.get('#PGS\\.9_1_FAR\\.1').find('.elementsDropped').eq(0).click({ force:true})
        cy.get('#preview_properties_element').within(() => {
            cy.get('[type="checkbox"]').click({ force:true})
            cy.get('[placeholder="product notice"]').type('test')
        })
        cy.get('#PGS\\.9_1_FAR\\.1').find('.elementsDropped').eq(1).within(() => {
            cy.get('.close').click({ force:true})
        })
        cy.get('#PGS\\.9_1_FAR\\.1').find('.elementsDropped').as('element').then((elements) => {
            cy.get('@element').should('have.length',elements.length)
        })
        cy.dragDropMasterPage(0,'product_page',1);
        cy.get('.pPageContainer').should('have.length',7)
        cy.saveProject();
    })
})    
