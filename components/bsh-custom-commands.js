import elementBuilderSelectors from '../selectors/element-builder-selectors.json'
import elementSelectionSelectors from '../selectors/element-selection-selectors.json'

Cypress.Commands.add('dragDropMasterPage', (page, master_Page,quantity) => {

    cy.get('.quantity_setting').within(() => {
        cy.get('input').clear().type(`${parseInt(quantity)}`);
    })
    cy.get('#mPC').within(()=>{
        cy.get('.mContainer').eq(parseInt(page)).find('.cdk-drag').as(`${master_Page}`)
    })
    cy.get(`@${master_Page}`).dragTo(elementBuilderSelectors.playAreaDrop) 
})

Cypress.Commands.add('search_and_add_currentlinks', (searchParameter, page_id) => {

    cy.get('#basket_table').within(()=>{
        cy.get(elementSelectionSelectors.searchBar).clear().type(searchParameter)
    })
    cy.get('#basket_table > .mat-card-content #StackTable > app-table > .table > .divWidth > #Stack > #stackelm > :nth-child(1)').then(el => {
        const draggable = el[0]  // Pick up this
        draggable.dispatchEvent(new MouseEvent('mousemove'));
        cy.wait(900)
        draggable.dispatchEvent(new MouseEvent('mousedown'));
        cy.get(page_id).then(el => {
            const droppable = el[0]  // Drop over this
            const coords = droppable.getBoundingClientRect();
            cy.log(coords)
            cy.get(el).scrollIntoView({ easing: 'linear' },{ offset: { top: coords.top + 5} })
            draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
            draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 30, clientY: coords.y + 40 }));
            draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 20, clientY: coords.y + 40 }));
        })
    })
})

Cypress.Commands.add('check_current_links_on_product_page', ((page_id,currentLinks) => {
    let droppedLinks = []
    cy.get(page_id).within(() => {
        cy.get('.elementsDropped').then((links) => {
            for(let i=0; i<links.length; i++){
                cy.get('.elementsDropped')
                .eq(i)
                .find('div')
                .eq(0).invoke('text').then(text => {
                    droppedLinks.push(text)
                }).then(() => {
                    cy.wrap(droppedLinks).as('droppedLinks')
                })
            }
        })
    })
    cy.get('@droppedLinks').then((droppedLinks) => {
        for(let x in droppedLinks){
            let split = []
            split = droppedLinks[x].split(",");
            var isexist = false
                isexist = currentLinks.includes(split[0].trim())
                cy.log(isexist)
                    if(!isexist){
                        assert.fail();
                    }
        }
    }) 
}))