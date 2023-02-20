import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info_bsh.json'
import settingsSelectors from '../../../selectors/settings-selection-selectors.json'
import elementSelectionSelectors from '../../../selectors/element-selection-selectors.json'
import bshSelectors from '../../../selectors/bsh/bsh-selection-selectors.json'
import publicationSeletorScreen from '../../../selectors/publication-screen-selectors.json';

describe('bsh check filters TEST_UI-Performance_S', () => {

    beforeEach(() => {
        cy.login(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    it('select xml file', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.get(publicationSeletorScreen.syncData).click();
        cy.wait('@waitforLoad', { timeout: 90000 }).then(($assert) => {
            expect($assert.response.statusCode).to.eq(200);
        })
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('D').click();
        })
        cy.contains('Got It').click();
        cy.get(settingsSelectors.editSourceColumn).within(() => {
            cy.get('mat-select').eq(1).click({ force:true })
        })
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains('IB_de-DE_A15.xml').click();
        })
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.get(bshSelectors.productFamily).click({ force:true });
        cy.wait(500);
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.get('mat-option').should('have.length.greaterThan',5)  
        })
        cy.get(bshSelectors.salesProgram).click({ force:true });
        cy.wait(500);
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.get('mat-option').should('have.length.greaterThan',1)
        })
        cy.get(bshSelectors.subCategory).click({ force:true });
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.get('mat-option').should('have.length.greaterThan',5)
        })    
    })

    it('filter stack', () =>{
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(5000)
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.get('table')
        .find('tr').eq(2).find('td').eq(1).click();
        cy.get('.preview-content-withBasketData').within(() => {
            cy.get('.floating-text').should('have.text','RA097600, Sonderzubehör')
        })
        cy.get('[alt="Quick preview"]').should('have.attr', 'src').should('include','http://media3.bsh-group.com/Product_Shots/1200x1200_print/MCSA01318237_G0990_RA097600_833154_def.jpg')
    })

    it('apply filters', () => {
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(5000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.get(bshSelectors.productFamily).click({ force:true });
        cy.wait(500);
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.get('mat-option').eq(0).click();
        })
        cy.get(bshSelectors.salesProgram).click({ force:true });
        cy.wait(500);
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.get('mat-option').eq(0).click({ force:true });
        })
        cy.get(elementSelectionSelectors.stackElem).find('tr',{ timeout:25000 })
        .should('have.length',1).within(() =>{
            cy.get('td').eq(0).contains('RA450600')
        })
        cy.get('.close').eq(0).click({ force:true })
        cy.get(elementSelectionSelectors.stackElem).find('tr',{ timeout:25000 })
        .should('have.length',1).within(() =>{
            cy.get('td').eq(0).contains('RA450600')
        })
        cy.get(bshSelectors.subCategory).click({ force:true})
        cy.wait(500);
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.get('mat-option').eq(0).click();
        })
        cy.get(elementSelectionSelectors.stackElem).find('tr',{ timeout:25000 })
        .should('have.length',1).within(() =>{
            cy.get('td').eq(0).contains('RA450600')
        })
        cy.get(elementSelectionSelectors.clearStack).click();
        cy.wait(500);
        cy.get(elementSelectionSelectors.stackElem).find('tr',{ timeout:25000 })
        .should('have.length.greaterThan',5)
    })

    it('apply filters and add to basket', () => {
        let stack = [];
        let basket = [];
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.wait(5000);
        cy.selectPublication(projectData.bsh.projectGaggeanau,projectData.bsh.pubGaggenau);
        cy.wait(5000);
        cy.get(elementSelectionSelectors.sideToolBar).within(() => {
            cy.contains('list').click();
        })
        cy.get(bshSelectors.productFamily).click({ force:true });
        cy.wait(500);
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.get('mat-option').eq(2).click();
        })
        cy.get(bshSelectors.salesProgram).click({ force:true });
        cy.wait(500);
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.get('mat-option').eq(0).click({ force:true });
        })
        cy.get(bshSelectors.subCategory).click({ force:true})
        cy.wait(500);
        cy.get('.cdk-virtual-scroll-viewport').within(() => {
            cy.get('mat-option').eq(0).click();
        })
        cy.get('table').within(() => {
            cy.get('tr').eq(1).find('td')
            .eq(0).click().invoke('text').then((text1) => {
                stack.push(text1.trim())
            })
            cy.get('tr').eq(5).click({
                ctrlKey:true,
                force:true,
            }).find('td')
            .eq(0).invoke('text').then((text2) => {
                stack.push(text2.trim())
            })
            cy.get('tr').eq(3).click({
                ctrlKey:true,
                force:true,
            }).find('td')
            .eq(0).invoke('text').then((text3) => {
                stack.push(text3.trim())
            }).then(() => {
                cy.wrap(stack).as('stack')
            })
        })  
        cy.contains(' arrow_forward').click();
        cy.get('#Basket').within(() => {
            cy.get('tr').then((row) => {
                for(let i=0; i<row.length; i++){
                    cy.get('tr')
                    .eq(i)
                    .find('td')
                    .eq(0).invoke('text').then(text => {
                        basket.push(text.trim())
                    }).then(() => {
                        cy.wrap(basket).as('basket')
                    })
                }
            })
        })
        cy.get('@stack').then(stack => {
            for(let i =0; i<stack.length; i++){
                cy.get('@basket').then(basket => {
                    var isexist = true
                    isexist = basket.includes(stack[i])
                    cy.log(isexist)
                    if(!isexist){
                        assert.fail();
                    }
                })
            }
        })
        cy.get(elementSelectionSelectors.clearStack).click();
        cy.wait(500);
        cy.get(elementSelectionSelectors.stackElem).find('tr',{ timeout:25000 })
        .should('have.length.greaterThan',15)
    })   
})