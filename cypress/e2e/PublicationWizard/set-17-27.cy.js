import userData from '../../../fixtures/user_info.json'
import projectData from '../../../fixtures/project_publication.json';
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json';

describe('basket Builder_Preview', () => {

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
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    const retryOptions = {
        limit: 5, // max number of retries
        delay: 500 // delay before next iteration, ms
    }

    it('add elements to basket via drag and drop', () => {
        const stacElem = ["Excalibur", "Original", "Knights of the Round Table","Spider"];

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.element_selection);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.selectStack(projectData.newRDU.sub);
        cy.wait(5000)
       cy.get('table')
        .find('tr').eq(1).find('td').eq(1).click();
        cy.get('table').find('tr').eq(2).click({
            shiftKey:true,
            force:true,
        })  
        cy.get(elementSelectionSelectors.buttonGroup).within(() => {
            cy.get('button').eq(2).click();
        })
        cy.get(elementSelectionSelectors.stackTable).find('tr').eq(3).click();
        cy.get(elementSelectionSelectors.stackTable).find('tr').eq(4).click({
            shiftKey: true,
        });
        cy.get(elementSelectionSelectors.stackTable).find('tr').eq(3).then(el => {

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

        stacElem.forEach(checkStackElements);
        cy.saveProject();

    })

    it('apply stack filter to add elements to master page', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.element_selection);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.selectStack(projectData.newRDU.stackRDU);
        cy.wait(10000)
        cy.get('[aria-label="PimLifeCycle"]').click();
        cy.wait(500);
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.contains('Maturity').click({force: true});   
        })
        cy.get('#StackTable')
        .find('tr').should('have.length',4).eq(1)
        .within(() => {
            cy.get('td').eq(4).contains('Maturity');
        }) 
        cy.get(elementSelectionSelectors.buttonGroup).within(() => {
            cy.get('button').eq(1).click();
            cy.get('button').eq(2).click();
        })
        cy.get('#Basket').find('tr').should('have.length',7);
        cy.saveProject();
    })

    it('add master page to playArea', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.element_selection);
        cy.wait(5000);
        cy.get('#mPC').within(()=>{
            cy.get('.mContainer').eq(2).find('.cdk-drag').as('watchPage')
        })
        cy.get('#playArea').find('cdk-virtual-scroll-viewport').as('playArea')

        cy.get('@watchPage').dragTo('#playArea > cdk-virtual-scroll-viewport')
        cy.get('.sPage').should('have.length',10)
        cy.saveProject();
    })

    it('add current link from basket', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.element_selection);
        cy.wait(5000);
        cy.get('#basket_table > .mat-card-content > #BasketTable > app-table > .table > .divWidth > #Basket > #stackelm > :nth-child(2)').then(el => {
            const draggable = el[0]  // Pick up this
            draggable.dispatchEvent(new MouseEvent('mousemove'));
            cy.wait(900)
            draggable.dispatchEvent(new MouseEvent('mousedown'));
            cy.get('#PGS\\.10_2_DAR\\.1').then(el => {
                const droppable = el[0]  // Drop over this
                const coords = droppable.getBoundingClientRect();
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 80, clientY: coords.y + 40 }));
                draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 80, clientY: coords.y + 40 }));

            })
        })
        cy.get('#PGS\\.10_2_DAR\\.1').find('.close').siblings().should('have.text',' RDDB500217, Excalibur Pirelli Pit Stop kit ')
        cy.saveProject();
    })

    it('check quick preview', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.element_selection);
        cy.wait(5000);
        cy.get('#Basket').find('tr').eq(1).click({ force: true})
        cy.get('#preview_properties').within(() => {
          cy.get('.floating-text').should('have.text','RDDB500217, Excalibur Pirelli Pit Stop kit')
        })
        cy.contains(' more_horiz ').click({ force: true });
        cy.get('.mat-menu-panel',{ timeout: 1000 }).within(() => {
          cy.get('button').eq(0).click();
        })
        cy.get('#basket_table').as('basketTable').find('input[type="search"]').type('Knights');
        cy.get('#Basket').find('tr').eq(0).within(() => {
          cy.get('td').eq(1).contains(' Knights of the Round Table ')
        })
      })
  
     it('apply filter in basket', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.newRDU.projectName,projectData.newRDU.element_selection);
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
          cy.get('td').eq(0).contains('RDDB500214')
        })
     }) 

})

  
      