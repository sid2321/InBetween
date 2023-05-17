import userData from '../../../fixtures/user_info_planner.json'
import projectData from '../../../fixtures/project_publication.json'
import dayjs from 'dayjs'
Cypress.dayjs = dayjs;

describe('check test cases from 43-47', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })
    
    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    it('add current links to master page', () =>{

        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectSiemensPlanner,' lena1 ');
        cy.wait(5000);
        cy.get('#basket_table > .mat-card-content > #StackTable > app-table > .table > .divWidth > #Stack > #stackelm > :nth-child(1)').then(el => {
            const draggable = el[0]  // Pick up this
            draggable.dispatchEvent(new MouseEvent('mousemove'));
            cy.wait(900)
            draggable.dispatchEvent(new MouseEvent('mousedown'));
            cy.get('#PGS\\.0_0_FAR\\.1').then(el => {
                const droppable = el[0]  // Drop over this
                const coords = droppable.getBoundingClientRect();
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
                draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 10, clientY: coords.y + 10 }));
                draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 2, clientY: coords.y + 5 }));
            })
          })
          cy.get('#PGS\\.0_0_FAR\\.1').find('.elementsDropped').within(() => {
            cy.get('div').should('have.text',' BF425LMB0, Mikrobølgeovne ')
          })
          cy.saveProject(); 
          cy.logintoplannerinDifferentbrowser();
    })
})