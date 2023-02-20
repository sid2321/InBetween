import userData from '../../../fixtures/user_info.json'
import projectData from '../../../fixtures/project_publication.json';
import elementBuilderSelectors from '../../../selectors/element-builder-selectors.json';

describe('set 27-37 test cases', () => {

    beforeEach(() => {
      cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
      cy.pageLoaded();
    })

   it('drag elements from stack', () => {
    cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
      cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.dragDrop);
      cy.wait(5000);
      cy.contains(' more_horiz ').click({ force: true });
      cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
        cy.get('button').eq(2).click();
      })
      cy.get('#mPC').within(()=>{
        cy.get('.mContainer').eq(2).find('.cdk-drag').as('watchPage')
      })  
      cy.get('@watchPage').dragTo(elementBuilderSelectors.playAreaDrop)
      cy.wait(1000);
      cy.saveProject();
      cy.wait(1000);
      cy.get('#basket_table > .mat-card-content #StackTable > app-table > .table > .divWidth > #Stack > #stackelm > :nth-child(2)').then(el => {
          const draggable = el[0]  // Pick up this
          draggable.dispatchEvent(new MouseEvent('mousemove'));
          cy.wait(900)
          draggable.dispatchEvent(new MouseEvent('mousedown'));
          cy.get('#PGS\\.12_2_DAR\\.1').then(el => {
              const droppable = el[0]  // Drop over this
              const coords = droppable.getBoundingClientRect();
              draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
              draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 30, clientY: coords.y + 28 }));
              draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 20, clientY: coords.y + 28 }));
          })
       })
      cy.get('#PGS\\.12_2_DAR\\.1').parent('.ng-star-inserted').parent('.ng-star-inserted').as('newWatchPage')
      cy.get('@newWatchPage').siblings('#part1').click({ force: true})
      cy.wait(1000);
      cy.get(elementBuilderSelectors.toolBar).within(() => {
        cy.get('button').eq(2).click();
      })
      cy.get('#onpage_PGS\\.12_2').within(() => {
        cy.get('img', { timeout: 1000 }).should('be.visible')
      }) 
      cy.saveProject();
    })
    
    it('multiple master pages', () => {
      cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
      cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.dragDrop);
      cy.wait(5000);
      cy.get('.quantity_setting').within(() => {
        cy.get('input').clear().type('2');
      })
      cy.get('#mPC').within(()=>{
        cy.get('.mContainer').eq(2).find('.cdk-drag').as('watchPage')
      })  
      cy.get('@watchPage').dragTo(elementBuilderSelectors.playAreaDrop)
      cy.wait(1000);
      cy.get('.borderPage').then(el => {
        const draggable = el[0]  // Pick up this
        draggable.dispatchEvent(new MouseEvent('mousemove'));
        cy.wait(900)
        draggable.dispatchEvent(new MouseEvent('mousedown'));
        cy.get('#PGS\\.4').parent('#drag1').then(el => {
            const droppable = el[0]  // Drop over this
            const coords = droppable.getBoundingClientRect();
            draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
            draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 10, clientY: coords.y + 5 }));
            draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 10, clientY: coords.y + 5 }));
        })
     })
    })

    it('resize ui builder', () => {
      cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
      cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.dragDrop);
      cy.wait(5000);
      cy.get('.expand-btn-icon').click({ force:true });
      cy.get('.masterpage_bottom_closed').should('exist');
    })

})