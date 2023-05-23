import loginScreenSelectors from '../selectors/login-screen-selectors.json'
import elementSelectionSelectors from '../selectors/element-selection-selectors.json'
import annotationManager from '../selectors/annotation-selectors.json'
import elementBuilderManager from '../selectors/element-builder-selectors.json'

Cypress.Commands.add('dragCurentlinkstopage', (pageID,element) => {

    cy.get(`#basket_table > .mat-card-content #StackTable > app-table > .table > .divWidth > #Stack > #stackelm > :nth-child(${element})`).then(el => {
        const draggable = el[0]  // Pick up this
        draggable.dispatchEvent(new MouseEvent('mousemove'));
        cy.wait(900)
        draggable.dispatchEvent(new MouseEvent('mousedown'));
        cy.get(pageID).then(el => {
            const droppable = el[0]  // Drop over this
            const coords = droppable.getBoundingClientRect();
            cy.log(coords)
            draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
            draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: coords.x + 30, clientY: coords.y + 40 }));
            draggable.dispatchEvent(new MouseEvent('mouseup', { clientX: coords.x + 20, clientY: coords.y + 40 }));
        })
    })
})
//This Command will login user based on product
// userID : userID of the user
// password : password of the user
// product : product user wants to launch
Cypress.Commands.add('login', (userID, password, product,url) => {
    let app = product.replace(/ /g, ""); 
    cy.session([userID, password, product], () => {
        cy.visit(url);
        cy.title().should('eq','InBetween SSO');
        cy.get(loginScreenSelectors.userName).type(userID);
        cy.get(loginScreenSelectors.userPassword).type(password);
        cy.get(loginScreenSelectors.selectProductDropdown).within(() => {
            cy.get('input').click();
        })
        cy.get(loginScreenSelectors.loginForm).within(() => {
            switch(product) {
                case 'Publication Wizard':     
                        cy.get('ul').find('li').eq(1).click();
                    break;
                case 'Publisher':
                        cy.get('ul').find('li').eq(2).click();
                    break;  
                case 'Marketing Board':
                        cy.get('ul').find('li').eq(3).click();
                    break;         
                case 'Publication Planner':
                        cy.get('ul').find('li').eq(4).click();
                    break;
                case 'Job Automation':
                        cy.get('ul').find('li').eq(5).click();
                    break;               
                default:
                cy.get(loginScreenSelectors.loginForm).within(() => {
                        cy.get('ul').find('li').eq(1).click();
                })       
            }
            cy.get(loginScreenSelectors.loginButton).click();
            if(product==='Publisher'){
                cy.url().should('contain', `/IBPublisher/`)
            }else{

            cy.url().should('contain', `/${app}/`)
            }
        })
    })
})

Cypress.Commands.add('selectStack',(stackName) => {

    cy.get('#elementTab1').within(() => {
        cy.get(elementSelectionSelectors.selectStack).eq(0).click();

    })
    cy.get(elementSelectionSelectors.stackPanel).within(() => {
        cy.contains(stackName).click();
    })

})

Cypress.Commands.add('saveProject',() => {
    cy.get(elementSelectionSelectors.saveProject).click({force:true});
    cy.get('snack-bar-container').should('be.visible');
})

Cypress.Commands.add('downloadGeneratedFile', () => {
    cy.window().document().then(function (doc) {
        doc.addEventListener('click', () => {
          setTimeout(() => { doc.location.reload( { force:true }) }, 2000)
        })
        cy.intercept('/', (req) => {
            req.reply((res) => {
              expect(res.statusCode).to.equal(200);
            });
        });
        cy.get('.downloadButton').parent().should('exist').click();
    })
})

Cypress.Commands.add('deleteGeneration', () => {
    cy.get('.jobListContent').within(() => {
        cy.get('mat-cell').eq(4).find('.geneDeleteButton').click();
    })
       
})

Cypress.Commands.add('disablePopUp',() => {
    cy.window().then((win) => {
        // ✅ removes it
        win.onbeforeunload = null
    })
})

Cypress.Commands.add('addCommentsToConversion', (message) => {
    cy.get(elementBuilderManager.dialogBox).within(() => {
        cy.get('input').type(message)
        cy.get(elementBuilderManager.okMessage).click({force:true})
    })
})

Cypress.Commands.add('verifyAndRenameDownlodedFile',(renameFileName) => {
    const { join } = require('path')
    cy.get('@filename').invoke('text').then((file) => {
        cy.verifyDownload(file, { timeout: 125000, interval: 600 });
        const downloadsFolder = Cypress.config('downloadsFolder');
        let downloadFilename = join(downloadsFolder, file)
        let result_downloadFilename = downloadFilename.replace("/", "\\");
        cy.log(result_downloadFilename);
        cy.exec(`rename "${result_downloadFilename}" "${renameFileName}"`)

    }) 
    cy.get('.jobListContent').within(() => {
        cy.get('mat-cell').eq(4).find('.geneDeleteButton').click();
    })
    cy.get('.downloadButton',{ timeout: 25000, interval: 600 }).should('not.exist');
})

Cypress.Commands.add('verifyAndRenameDownlodedFileakeneo',(renameFileName) => {
    const { join } = require('path')
    cy.get('@filename').invoke('text').then((file) => {
        cy.window().document().then(function (doc) {
            doc.addEventListener('click', () => {
              setTimeout(() => { doc.location.reload( { force:true }) }, 2000)
            })
            cy.intercept('/', (req) => {
                req.reply((res) => {
                  expect(res.statusCode).to.equal(200);
                });
            });
            cy.get('.downloadButton').parent().should('exist').click();
        })
        cy.verifyDownload(file, { timeout: 25000, interval: 600 });
        const downloadsFolder = Cypress.config('downloadsFolder');
        let downloadFilename = join(downloadsFolder, file)
        let result_downloadFilename = downloadFilename.replace("/", "\\");
        cy.log(result_downloadFilename);
        cy.exec(`rename "${result_downloadFilename}" ${renameFileName}`)

    }) 
    /*cy.get('.jobListContent').within(() => {
        cy.get('mat-cell').eq(4).find('.geneDeleteButton').click();
    })*/
    cy.get('.downloadButton',{ timeout: 25000, interval: 600 }).should('not.exist');
})


Cypress.Commands.add('waitforimageLoad',() => {
    cy.get('.spinner',{ timeout: 2500000000, interval: 600 }).as('spinner').should('exist')
    cy.get(annotationManager.image,{ timeout: 2500000000, interval: 600 }).should('exist')

})

Cypress.Commands.add('generateExcelFiles', (mode) => {
    cy.get('form').within(() => {
        cy.get("[aria-label='Output Formats']").click();
    })
    cy.get('.cdk-overlay-pane').within(() => {
        cy.contains(' EXCEL ').click();
    })
    cy.disablePopUp();
    cy.get('#divA')
        .within(() => {
            cy.get('input[type="checkbox"]').eq(0).check({force: true});
        })
        cy.get('#uploadappendpage').should('exist')
        .selectFile('AppendText.xlsx',{force:true})
        cy.wait(1000);
        switch(mode){
            case 'append':
                    cy.get('input[value="Append_page"]',{timeout: 3000})
                    .should('not.be.hidden').check({ force: true});
                break;   
            case 'beginning':
                    cy.get('input[value="USE_EXISTING_PAGES"]',{timeout: 3000})
                    .should('not.be.hidden').check({ force: true});
                break;
            default:     
                cy.get('input[value="Append_page"]',{timeout: 3000})
                .should('not.be.hidden').check({ force: true});
        }
        cy.wait(1000);
        cy.get('form').within(() => {
            cy.get("button[type='submit']").click();
        })      
})

