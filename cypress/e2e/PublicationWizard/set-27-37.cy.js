import userData from '../../../fixtures/user_info.json'
import projectData from '../../../fixtures/project_publication.json';
import elementBuilderSelectors from '../../../selectors/element-builder-selectors.json';

describe('set 27-37 test cases', () => {

    beforeEach(() => {
      cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
      cy.pageLoaded();
    })

    it('check zoom', () => {
      cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
      cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.dragDrop);
      cy.get(elementBuilderSelectors.zoomPagePlanner).click();
      cy.contains(' 200% ').click();
      cy.compareSnapshot('check zoom',0.2);  
    })

    it('add new master page', () => {
      cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
      cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.dragDrop);
      cy.wait(5000);
       cy.get('#mPC').within(()=>{
          cy.get('.mContainer').eq(1).find('.cdk-drag').as('5_columns')
      })  
      cy.get('@5_columns').dragTo(elementBuilderSelectors.playAreaDrop) 
      cy.wait(1000);
      cy.get('#basket_table > .mat-card-content > #BasketTable > app-table > .table > .divWidth > #Basket > #stackelm > :nth-child(1)').then(el => {
        const draggable = el[0]  // Pick up this
        draggable.dispatchEvent(new MouseEvent('mousemove'));
        cy.wait(900)
        draggable.dispatchEvent(new MouseEvent('mousedown'));
        cy.get('#PGS\\.10_2_DAR\\.2').then(el => {
            const droppable = el[0]  // Drop over this
            const coords = droppable.getBoundingClientRect();
            draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
            draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 10, clientY: coords.y + 10 }));
            draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 2, clientY: coords.y + 5 }));
        })
      })
      cy.get('#PGS\\.10_2_DAR\\.2').find('.elementsDropped').within(() => {
        cy.get('div').should('have.text',' RDDBEX0273, Excalibur Essential MB ')
      })
      cy.saveProject();
    })

    it('preview without current links', () => {
      cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
      cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.dragDrop);
      cy.wait(5000);
      cy.get('#mPC').within(()=>{
          cy.get('.mContainer').eq(2).find('.cdk-drag').as('watchPage')
      })  
      cy.get('@watchPage').dragTo(elementBuilderSelectors.playAreaDrop)
      cy.wait(1000);
      cy.get(elementBuilderSelectors.toolBar).within(() => {
        cy.get('button').eq(2).click();
      })
      cy.wait(2000);
      cy.get('#onpage_PGS\\.11_2').within(() => {
        cy.get('.emptyPage').should('have.text',' No Product added to show preview ')
      })
      cy.saveProject();
    })

    it('check quick preview', () => {
      cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
      cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.dragDrop);
      cy.wait(5000);
      cy.get('#Basket').find('tr').eq(0).click({ force: true})
      cy.get('#preview_properties').within(() => {
        cy.get('.floating-text').should('have.text','RDDBEX0273, Excalibur Essential MB')
      })
      cy.contains(' more_horiz ').click({ force: true });
      cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
        cy.get('button').eq(0).click();
      })
      cy.get('#basket_table').as('basketTable').find('input[type="search"]').type('Excalibur');
      cy.get('@basketTable').within(() => 
      cy.get('#Basket').find('tr').eq(0).within(() => {
        cy.get('td').eq(1).contains(' RDDBEX0273, Excalibur Essential MB ')
      }))
    })

   it('apply filter in basket', () => {
      cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
      cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.dragDrop);
      cy.wait(5000);
      cy.contains(' more_horiz ').click({ force: true });
      cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
        cy.get('button').eq(1).click();
      })
      cy.get("#basket_table").find('.filter-container').within(() => {
        cy.contains('AvantPremiere').click();

      })
      cy.get('.mat-select-panel-wrap').find('mat-option').eq(0).click();
      cy.get('#Basket').find('tr').eq(0).within(() => {
        cy.get('td').eq(0).contains('RDDBEX0273')
      })
   }) 
})