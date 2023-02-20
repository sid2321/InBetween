import publicationSeletorScreen from '../../../selectors/publication-screen-selectors.json';
import loginScreenSelectors from '../../../selectors/login-screen-selectors.json'
import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info.json'

describe('authenication', () => {

    beforeEach(() => {
        cy.pageLoaded();
    })

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    it('check ibLogo', () => {
        cy.visit(userData.login_url)
        cy.get(loginScreenSelectors.ibLogo).should('be.visible')
    })

    it('login to InBetween', () => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.get(publicationSeletorScreen.userManager).should('be.visible');
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    
    it('logout from PW', () => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.contains('E').click();
        cy.get(publicationSeletorScreen.logoutUser).click();
        cy.title().should('eq','InBetween SSO');
    })

    it('inValid Login', () =>{
        cy.visit(userData.login_url)
        cy.inValidLogin('manager','managers','Publication Wizard');
        cy.get(loginScreenSelectors.inValidPass)
            .should('be.visible')
            .and('have.text','Invalid username or password');
    })

    it('sync projects', () => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.get(publicationSeletorScreen.syncData).click();
        cy.wait('@waitforLoad', { timeout: 90000 }).then(($assert) => {
            expect($assert.response.statusCode).to.eq(200);
        })    
        cy.selectPublication(projectData.projectTouristic.projectName,projectData.projectTouristic.pubName);

    })

    it('Language change', () => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.get(publicationSeletorScreen.syncData).parent()
        .next().within(() => {
            cy.get('button').click();
        })
        cy.get('#mat-menu-panel-1').within(() => {
            cy.get('mat-radio-button').eq(1).click();
        })
        cy.get(publicationSeletorScreen.openPub).should('have.text','Publikation öffnen')
    })

})