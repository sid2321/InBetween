import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info.json'
import loginScreenSelectors from '../../../selectors/login-screen-selectors.json'

describe('SingleMachine ', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('Singlemachine Allow Access Controln page', () => {
        cy.visit(`${userData.SingleMachine_AllowAccessControl_URL_IP}/#/PublicationWizard/home`)
        cy.get(loginScreenSelectors.ibLogo).should('be.visible')
    })

    it('Singlemachine Allow Access Controln page localhost', () => {
        cy.visit(`${userData.SingleMachine_AllowAccessControl_URL}/#/PublicationWizard/home`)
        cy.get(loginScreenSelectors.ibLogo).should('not.be.visible')
    })
})
