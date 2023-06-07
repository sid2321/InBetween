import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'
import settingsSelectors from '../../../../selectors/settings-selection-selectors.json'
import akeneoPIMSelectors from '../../../../selectors/akeneo-PIM-selectors.json'

it('Login to Akeneo PIM & Make changes', () => {
    cy.LoginAkeneoPIM(userData.akeneo_PIM_Url,userData.akeneo_PIM_Username,userData.akeneo_PIM_Password);
    cy.UpdatePIMChanges('C1S2P1','USD','56.99');

    cy.LoginAkeneoPIM(userData.akeneo_PIM_Url,userData.akeneo_PIM_Username,userData.akeneo_PIM_Password);
    cy.UpdatePIMChanges('102774','EUR','399');

})