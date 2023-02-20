import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info.json'
import loginScreenSelectors from '../../../selectors/login-screen-selectors.json'

describe('Multimachine Allow Access Control', () => {

    beforeEach(() => {
        cy.loginWithoutCaching('manager','manager','Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('Multimachine Allow Access Controln page localhost', () => {
        cy.visit(`${userData.AllowAccessControl_URL}/#/PublicationWizard/home`)
        cy.get(loginScreenSelectors.ibLogo).should('not.be.visible')
    })
})
