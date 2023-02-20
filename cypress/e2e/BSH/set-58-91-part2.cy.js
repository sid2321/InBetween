import projectData from '../../../fixtures/project_publication.json'
import userData from '../../../fixtures/user_info_bsh.json'

describe('Grouping/Sorting tests', () => {

    beforeEach(() => {
        cy.login(userData.userName,userData.userPassword,'Publication Wizard',userData.login_url);
        cy.pageLoaded();
    })

    function check_array_sort_order(arr){
        const c = [];
        for (let i = 1; i < arr.length; i++) {
        c.push(arr[i - 1].localeCompare(arr[i]));
        }
    
        if (c.every((n) => n <= 0)) return 'ascending';
        if (c.every((n) => n >= 0)) return 'descending';
    
        return 'unsorted';
    }

    function check_array_sort_order_numeric(arr){
        const c = [];
        for (let i = 1; i < arr.length; i++) {
        c.push(arr[i - 1].localeCompare(arr[i], 'en', { numeric: true }));
        }
        
        if (c.every((n) => n <= 0)) return 'ascending';
        if (c.every((n) => n >= 0)) return 'descending';
    
        return 'unsorted';
    }

    function sort_alphanumeric_array(arr){
        let c= []
        const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })
        const sorted = arr.sort(sortAlphaNum)
        return sorted;
    }    

    it('Sort by drop down Product', () => {

        let list = []
        let list_desc = []
        let list_asc = []
        let listactual = ['KI86VVFE0','KI87FHD40','KG36NVWEB','KG49NAI31']
        let listactual_asc =[]
        let listactual_desc = ['CM876GDW6S','HF15M551','HF15M541','CM876GDB6S']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectSiemens,projectData.bsh.pubSiemens);
        cy.wait(5000);
        cy.get('#PGS\\.0_0_FAR\\.1').as('page').click({force:true}).within(() => {
            cy.get('.elementsDropped').eq(0).scrollIntoView({ offset: { top: 150, left: 0 } })
        })
        cy.get('.sortByDropdown').within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('Product family').click({ force:true });
        })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list).as('list')
                    })
                }
            })
        })
        cy.get('@list').then(list => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual[i]){
                    assert.fail('ascending order is not proper')
                }
            }
        }) 
        cy.get('#sortByDescButton').click({force:true})
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_desc).as('list_desc')
                    })
                }
            })
        })
        cy.get('@list_desc').then(list_desc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_desc[i]){
                    assert.fail('Product family sort by descending order not working')
                }
            }
        })
    })

    it('Sort by drop down Sales Program', () => {

        let list = []
        let list_desc = []
        let listactual = ['KI86VVFE0','KG36NVWEB','KG36NVIEB','LI67RA540']
        let listactual_desc = ['CM876GDW6S','KI87FHD40','KG49NAI31','CM876GDB6S']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectSiemens,projectData.bsh.pubSiemens);
        cy.wait(5000);
        cy.get('#PGS\\.0_0_FAR\\.1').as('page').click({force:true}).within(() => {
            cy.get('.elementsDropped').eq(0).scrollIntoView({ offset: { top: 150, left: 0 } })
        })
        cy.get('.sortByDropdown').within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('Sales program').click({ force:true });
        })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list).as('list')
                    })
                }
            })
        })
        cy.get('@list').then(list => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual[i]){
                    assert.fail('ascending order is not proper')
                }
            }
        }) 
        cy.get('#sortByDescButton').click({force:true})
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_desc).as('list_desc')
                    })
                }
            })
        })
        cy.get('@list_desc').then(list_desc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_desc[i]){
                    assert.fail('Product family sort by descending order not working')
                }
            }
        })
    })

    it('Sort by drop down Subcategory', () => {

        let list = []
        let list_desc = []
        let listactual = ['KI86VVFE0','KI87FHD40','KI87SAD30','CM876GDW6S']
        let listactual_desc = ['LC64PBC20','LC94BBC50','LI64LB531','LI67RB531']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectSiemens,projectData.bsh.pubSiemens);
        cy.wait(5000);
        cy.get('#PGS\\.0_0_FAR\\.1').as('page').click({force:true}).within(() => {
            cy.get('.elementsDropped').eq(0).scrollIntoView({ offset: { top: 150, left: 0 } })
        })
        cy.get('.sortByDropdown').within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('Subcategory').click({ force:true });
        })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list).as('list')
                    })
                }
            })
        })
        cy.get('@list').then(list => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual[i]){
                    assert.fail('ascending order is not proper')
                }
            }
        }) 
        cy.get('#sortByDescButton').click({force:true})
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_desc).as('list_desc')
                    })
                }
            })
        })
        cy.get('@list_desc').then(list_desc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_desc[i]){
                    assert.fail('Product family sort by descending order not working')
                }
            }
        })
    })

    it('Sort by drop down Price', () => {

        let list = []
        let list_desc = []
        let listactual = ['HF15M541','LC64PBC20','LI64LB531','HF15M551']
        let listactual_desc = ['KI87FHD40','CM876GDW6S','KG49NAI31','KI87SAD30']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectSiemens,projectData.bsh.pubSiemens);
        cy.wait(5000);
        cy.get('#PGS\\.0_0_FAR\\.1').as('page').click({force:true}).within(() => {
            cy.get('.elementsDropped').eq(0).scrollIntoView({ offset: { top: 150, left: 0 } })
        })
        cy.get('.sortByDropdown').within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('Price').click({ force:true });
        })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list).as('list')
                    })
                }
            })
        })
        cy.get('@list').then(list => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual[i]){
                    assert.fail('ascending order is not proper')
                }
            }
        }) 
        cy.get('#sortByDescButton').click({force:true})
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_desc).as('list_desc')
                    })
                }
            })
        })
        cy.get('@list_desc').then(list_desc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_desc[i]){
                    assert.fail('Product family sort by descending order not working')
                }
            }
        })
    })

    it('Group by drop down Sales Program', () => {

        let list = []
        let list_desc = []
        let listactual = ['KI86VVFE0','KG36NVWEB','KG36NVIEB','LI67RA540']
        let listactual_desc = ['CM876GDW6S','KI87FHD40','KG49NAI31','CM876GDB6S']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectSiemens,projectData.bsh.pubSiemens);
        cy.wait(5000);
        cy.get('#PGS\\.0_0_FAR\\.1').as('page').click({force:true}).within(() => {
            cy.get('.elementsDropped').eq(0).scrollIntoView({ offset: { top: 150, left: 0 } })
        })
        cy.get('#groupBy').within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('Sales program').click({ force:true });
        })
        cy.wait(1000)
        cy.get('#groupByAscButton') .should('have.css', 'background-color')
        .and('include', 'rgb(119, 119, 119)')
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list).as('list')
                    })
                }
            })
        })
        cy.get('@list').then(list => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual[i]){
                    assert.fail('ascending order is not proper')
                }
            }
        }) 
        cy.get('#groupByDescButton').click({ force:true })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_desc).as('list_desc')
                    })
                }
            })
        })
        cy.get('@list_desc').then(list_desc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_desc[i]){
                    assert.fail('salesProgram ascending order is not proper')
                }
            }
        })
        cy.get('#sortByDescButton').click({ force :true })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_desc).as('list_desc')
                    })
                }
            })
        })
        cy.get('@list_desc').then(list_desc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_desc[i]){
                    assert.fail('salesProgram ascending order is not proper')
                }
            }
        })
    })

    
    it('Group by drop down Subcategory', () => {

        let list = []
        let list_desc = []
        let listactual = ['KI86VVFE0','KI87FHD40','KI87SAD30','CM876GDW6S']
        let listactual_desc = ['LC64PBC20','LC94BBC50','LI64LB531','LI67RB531']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectSiemens,projectData.bsh.pubSiemens);
        cy.wait(5000);
        cy.get('#PGS\\.0_0_FAR\\.1').as('page').click({force:true}).within(() => {
            cy.get('.elementsDropped').eq(0).scrollIntoView({ offset: { top: 150, left: 0 } })
        })
        cy.get('#groupBy').within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('Subcategory').click({ force:true });
        })
        cy.wait(1000)
        cy.get('#groupByAscButton') .should('have.css', 'background-color')
        .and('include', 'rgb(119, 119, 119)')
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list).as('list')
                    })
                }
            })
        })
        cy.get('@list').then(list => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual[i]){
                    assert.fail('ascending order is not proper')
                }
            }
        }) 
        cy.get('#groupByDescButton').click({ force:true })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_desc).as('list_desc')
                    })
                }
            })
        })
        cy.get('@list_desc').then(list_desc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_desc[i]){
                    assert.fail('salesProgram ascending order is not proper')
                }
            }
        })
        cy.get('#sortByDescButton').click({ force :true })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_desc).as('list_desc')
                    })
                }
            })
        })
        cy.get('@list_desc').then(list_desc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_desc[i]){
                    assert.fail('salesProgram ascending order is not proper')
                }
            }
        })
    })

    it('Group by drop down Price', () => {

        let list = []
        let list_desc = []
        let listactual = ['HF15M541','LC64PBC20','LI64LB531','HF15M551']
        let listactual_desc = ['KI87FHD40','CM876GDW6S','KG49NAI31','KI87SAD30']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectSiemens,projectData.bsh.pubSiemens);
        cy.wait(5000);
        cy.get('#PGS\\.0_0_FAR\\.1').as('page').click({force:true}).within(() => {
            cy.get('.elementsDropped').eq(0).scrollIntoView({ offset: { top: 150, left: 0 } })
        })
        cy.get('#groupBy').within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('Price').click({ force:true });
        })
        cy.wait(1000)
        cy.get('#groupByAscButton') .should('have.css', 'background-color')
        .and('include', 'rgb(119, 119, 119)')
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list).as('list')
                    })
                }
            })
        })
        cy.get('@list').then(list => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual[i]){
                    assert.fail('ascending order is not proper')
                }
            }
        }) 
        cy.get('#groupByDescButton').click({ force:true })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_desc).as('list_desc')
                    })
                }
            })
        })
        cy.get('@list_desc').then(list_desc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_desc[i]){
                    assert.fail('salesProgram ascending order is not proper')
                }
            }
        })
        cy.get('#sortByDescButton').click({ force :true })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_desc).as('list_desc')
                    })
                }
            })
        })
        cy.get('@list_desc').then(list_desc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_desc[i]){
                    assert.fail('salesProgram ascending order is not proper')
                }
            }
        })
    })
})