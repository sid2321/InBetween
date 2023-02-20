import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'


describe('akeneo_publisher_generation_steps', () => {

    beforeEach(() => {
        cy.login(userData.userName,userData.userPassword,'Publisher',userData.login_url);
        cy.pageLoaded();
    })

    it('open publisher', () => {
        cy.visit(`${userData.login_url}/IBPublisher`)
    })
})