import projectData from '../../../../fixtures/project_publication.json'
import userData from '../../../../fixtures/user_info_akeneo.json'
import settingsSelectors from '../../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../../selectors/element-selection-selectors.json'
import annotationManager from '../../../../selectors/annotation-selectors.json'



describe('akeneo v1 showcase login open publication', () => {


    function checkStackElements(value, index, array){
        cy.get('#Basket').within(() => {
            cy.get('tr').eq(index).find('td')
            .eq(1).contains(value)
        })
    }

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
    ' Catalog_2023 ',' Flyer Groceries 2022 ',' Flyer Outdoor 2022 ', 
    ' Flyer Outdoor 2023 ',' Fresh Food ',' Groceries ',' Groceries 2023 ',
    ' Jeans and Leggings ',' Packaged Food ',' Shirts and Hoodies ']

    publications.forEach((publication) => {
        it(`check if publication are getting opened correctly - ${publication}`, () => {
            cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
            cy.selectPublication(projectData.akeneo.projectV1,publication);
            cy.wait(5000);
        })       
    })
    
    let master_publications = [' Clothing ',' Groceries ',' Outdoor ',' Publication ']
    master_publications.forEach((masterPublication) => {
        let newPub = `${masterPublication}_new`
        it(`check if new publication are getting created - ${masterPublication}`, () => {
            cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
            cy.createNewPublication(projectData.akeneo.projectV1,masterPublication,newPub)
        })
    })

    let publications_dups =  [' Brochure Clothing Summer 2021 ',' Catalog 2022 ',
    ' Catalog_2023 ',' Flyer Groceries 2022 ',' Flyer Outdoor 2022 ', 
    ' Flyer Outdoor 2023 ',' Fresh Food ',' Groceries ',' Groceries 2023 ',
    ' Jeans and Leggings ',' Packaged Food ',' Shirts and Hoodies ']

    publications_dups.forEach((publications_dup) => {
    
        let newPub = `${publications_dup}_dup`
        it(`check if publication are getting opened correctly - ${publications_dup}`, () => {
            cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
            cy.duplicatePublication(projectData.akeneo.projectV1,publications_dup,newPub);
            cy.wait(5000);
        })       
    })

    it('Add elements to basket', () => {
        let stacElem = ["Clothing","Eternal","Juck & Joni"]
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,' Brochure Clothing Summer 2021 ');
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.wait(5000)
        cy.get('table')
        .find('tr').eq(1).find('td').eq(1).click();
        cy.get('table').find('tr').eq(3).click({
            ctrlKey:true,
            force:true,
        })  
        cy.get('table').find('tr').eq(5).click({
            ctrlKey:true,
            force:true,
        }) 
        cy.get(elementSelectionSelectors.buttonGroup).within(() => {
            cy.get('button').eq(2).click();
        })
        //stacElem.forEach(checkStackElements);
    })

    it.only('annotations manager drag rectangle', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.akeneo.projectV1,' Catalog_2023 ');
        cy.contains('C').click({force:true})
        cy.waitforimageLoad()
        cy.get(annotationManager.rectangleComment).click()
        cy.wait(2000)
        cy.get(annotationManager.canvasAnnot).trigger('mouseover','center')
        cy.wait(5000)
        /*.trigger('mousedown', { which: 1, pageX: 100, pageY: 100 })
        .trigger('mousemove', { clientX: 200, clientY: 200 })
        .trigger('mouseup');*/
    })
        
})