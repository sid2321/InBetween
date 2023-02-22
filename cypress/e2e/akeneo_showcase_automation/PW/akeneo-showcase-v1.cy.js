import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'
import settingsSelectors from '../../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../../selectors/element-selection-selectors.json'
import bshSelectors from '../../../../selectors/bsh/bsh-selection-selectors.json'
import publicationSeletorScreen from '../../../../selectors/publication-screen-selectors.json';


describe('akeneo v1 showcase login open publication', () => {

    beforeEach(() => {
        cy.loginWithoutCaching(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    afterEach(() => {
        cy.clearAllCookies()
        cy.clearAllSessionStorage()
        cy.clearAllLocalStorage()
    })

    let publications =  [' Brochure Clothing Summer 2021 ',' Catalog 2022 ',
    ' catalog 2023 ',' Flyer Groceries 2022 ',' Flyer Outdoor 2022 ', 
    ' Flyer Outdoor 2023 ',' Fresh Food ',' Groceries ',' Groceries 2023 ',
    ' Jeans and Leggings ',' Packages Food ',' Shirts and Hoodies ']

    publications.forEach((publication) => {
        it(`check if publication are getting opened correctly - ${publication}`, () => {
            cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
            cy.selectPublication(projectData.akeneo.projectV1,publication);
            cy.wait(5000);
        })    
        
    })
    
})