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

    it('sorting option A-Z', () => {

        let list = []
        let list_2= []
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectSiemens,projectData.bsh.pubSiemens);
        cy.wait(5000);
        cy.get('#PGS\\.0_0_FAR\\.1').as('page').click({force:true}).within(() => {
            cy.get('.elementsDropped').eq(0).scrollIntoView({ offset: { top: 150, left: 0 } })
        })
        cy.get('#alphaButton').click({ force: true })
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        list.push(text.trim())
                    }).then(() => {
                        cy.wrap(list).as('list')
                    })
                }
            })
        })
        cy.get('@list').then(list => {
            let order = check_array_sort_order(list)
            cy.log(order)
            if(order!='ascending'){
                assert.fail('order is not ascending')
            }
        })
        cy.get('#descSort').click({ force: true })
        cy.wait(2000);
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elementsasc').then((row) => {
                for(let i=0; i<row.length; i++){
                    cy.get('@elementsasc').find('div')
                    .eq(i).invoke('text').then(text => {
                        list_2.push(text.trim())
                    }).then(() => {
                        cy.wrap(list_2).as('asclist')
                    })
                }
            })
        })
        cy.get('@asclist').then(list => {
            let order = check_array_sort_order(list)
            cy.log(order)
            if(order!='descending'){
                assert.fail('order is not descending')
            }
        })

    })

    it('sorting option alphanumeric', () => {

        let list = []
        let list_2= []
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectSiemens,projectData.bsh.pubSiemens);
        cy.wait(5000);
        cy.get('#PGS\\.0_0_FAR\\.1').as('page').click({force:true}).within(() => {
            cy.get('.elementsDropped').eq(0).scrollIntoView({ offset: { top: 150, left: 0 } })
        })
        cy.get('.numericButton').click({ force: true })
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        cy.log(text)
                        split = text.split(',');
                        cy.log(split[0])
                        list.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list).as('list')
                    })
                }
            })
        })
        cy.get('@list').then(list => {
            let order = sort_alphanumeric_array(list)
            cy.log(order)
            /*if(order!='ascending'){
                assert.fail('order is not ascending')
            }*/
            const result = JSON.stringify(list) == JSON.stringify(order)
            if(!result) {
                assert.fail('order is not ascending')
            }
        })
        cy.get('#descSort').click({ force: true })
        cy.wait(2000);
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elementsasc').then((row) => {
                for(let i=0; i<row.length; i++){
                    cy.get('@elementsasc').find('div')
                    .eq(i).invoke('text').then(text => {
                        list_2.push(text.trim())
                    }).then(() => {
                        cy.wrap(list_2).as('asclist')
                    })
                }
            })
        })
        cy.get('@asclist').then(list => {
            let order = sort_alphanumeric_array(list.reverse())
            cy.log(order)
            /*if(order!='ascending'){
                assert.fail('order is not ascending')
            }*/

            const result = JSON.stringify(list) == JSON.stringify(order)
            if(!result) {
                assert.fail('order is not ascending')
            }
        })

    })

    it('numeric sorting', () => {

        let list = []
        let list_desc = []
        let listactual = ['HF15M541','HF15M551','KG36NVIEB']
        let listactual_desc = ['CM876GDW6S','CM876GDB6S','BF634LGS1']
        cy.visit(`${userData.login_url}/#/PublicationWizard/home`)
        cy.selectPublication(projectData.bsh.projectSiemens,projectData.bsh.pubSiemens);
        cy.wait(5000);
        cy.get('#PGS\\.0_0_FAR\\.1').as('page').click({force:true}).within(() => {
            cy.get('.elementsDropped').eq(0).scrollIntoView({ offset: { top: 150, left: 0 } })
        })
        cy.get('.numericButton').click({force:true});
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        cy.log(text)
                        split = text.split(',');
                        //cy.log(split[0])
                        list.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list).as('list')
                    })
                }
            })
        })
        cy.get('@list').then(list => {

            for (let i = 0; i <= 2; i++) {
                cy.log('test')
                let split = []
                split = list[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual[i]){
                    assert.fail('ascending order is not proper')
                }
            }
        }) 
        cy.get('#descSort').click({ force:true })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        cy.log(text)
                        split = text.split(',');
                        //cy.log(split[0])
                        list_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_desc).as('list_desc')
                    })
                }
            })
        })
        cy.get('@list_desc').then(list_desc => {

            for (let i = 0; i <= 2; i++) {
                let split = []
                split = list_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_desc[i]){
                    assert.fail('descending order is not proper')
                }
            }
        }) 

    })

    it('Group by and sort by drop down Sales Program', () => {

        let list = []
        let list_desc = []
        let list_asc = []
        let listactual = ['KI86VVFE0','KI87FHD40','KG36NVWEB','KG49NAI31']
        let listactual_asc =['KI86VVFE0','KG36NVWEB','KG36NVIEB','KI87FHD40']
        let listactual_desc = ['KI87FHD40','KG49NAI31','KI87SAD30','KI86VVFE0']
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
            cy.contains('Product family').click({ force:true });
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
        cy.get('.sortByDropdown').within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('Sales program').click({ force:true });
        })
        cy.get('#groupByAscButton') .should('have.css', 'background-color')
        .and('include', 'rgb(119, 119, 119)')
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_asc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_asc).as('list_asc')
                    })
                }
            })
        })
        cy.get('@list_asc').then(list_asc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_asc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_asc[i]){
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

    it('Group by and sort by drop down Subcategory', () => {

        let list = []
        let list_desc = []
        let list_asc = []
        let listactual = ['KI86VVFE0','KI87FHD40','KG36NVWEB','KG49NAI31']
        let listactual_asc =['KI86VVFE0','KI87FHD40','KI87SAD30','KG36NVWEB']
        let listactual_desc = ['KG36NVWEB','KG49NAI31','KG36NVIEB','KI86VVFE0']
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
            cy.contains('Product family').click({ force:true });
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
        cy.get('.sortByDropdown').within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('Subcategory').click({ force:true });
        })
        cy.get('#groupByAscButton') .should('have.css', 'background-color')
        .and('include', 'rgb(119, 119, 119)')
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_asc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_asc).as('list_asc')
                    })
                }
            })
        })
        cy.get('@list_asc').then(list_asc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_asc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_asc[i]){
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
   
    it('Group by and sort by drop down Price', () => {

        let list = []
        let list_desc = []
        let list_asc = []
        let listactual = ['KI86VVFE0','KI87FHD40','KG36NVWEB','KG49NAI31']
        let listactual_asc =['KG36NVWEB','KG36NVIEB','KI86VVFE0','KI87SAD30']
        let listactual_desc = ['KI87FHD40','KG49NAI31','KI87SAD30','KI86VVFE0']
        let list_group_desc = []
        let list_group_desc_actual = ['CM876GDW6S','CM876GDB6S','BF634LGS1','HF15M551']
        let list_sort_asc = []
        let list_sort_asc_actual = ['HF15M541','HF15M551','BF634LGS1','CM876GDB6S']
        let undo_list = []
        let undo_list_actual = ['HF15M541','HF15M551','BF634LGS1','CM876GDB6S']
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
            cy.contains('Product family').click({ force:true });
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
        cy.get('.sortByDropdown').within(() => {
            cy.get('mat-select').click({ force:true })
        })
        cy.get('.mat-select-panel').within(() => {
            cy.contains('Price').click({ force:true });
        })
        cy.get('#groupByAscButton') .should('have.css', 'background-color')
        .and('include', 'rgb(119, 119, 119)')
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_asc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_asc).as('list_asc')
                    })
                }
            })
        })
        cy.get('@list_asc').then(list_asc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_asc[i].split(',');
                cy.log(split[0])
                if(split[0] != listactual_asc[i]){
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
        cy.get('#groupByDescButton').click({ force:true })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_group_desc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_group_desc).as('list_group_desc')
                    })
                }
            })
        })
        cy.get('@list_group_desc').then(list_group_desc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_group_desc[i].split(',');
                cy.log(split[0])
                if(split[0] != list_group_desc_actual[i]){
                    assert.fail('salesProgram ascending order is not proper')
                }
            }
        })
        cy.get('#sortByAscButton').click({force:true})
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        list_sort_asc.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(list_sort_asc).as('list_sort_asc')
                    })
                }
            })
        })
        cy.get('@list_sort_asc').then(list_sort_asc => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = list_sort_asc[i].split(',');
                cy.log(split[0])
                if(split[0] != list_sort_asc_actual[i]){
                    assert.fail('salesProgram ascending order is not proper')
                }
            }
        })
        cy.get('.resetSort').eq(0).click({ force: true })
        cy.wait(1000)
        cy.get('@page').within(() => {
            cy.get('.elementsDropped').as('elements').then((row) => {
                for(let i=0; i<row.length; i++){
                    let split = []
                    cy.get('@elements').find('div')
                    .eq(i).invoke('text').then(text => {
                        split = text.split(',');
                        undo_list.push(split[0].trim())
                    }).then(() => {
                        cy.wrap(undo_list).as('undo_list')
                    })
                }
            })
        })
        cy.get('@undo_list').then(undo_list => {
            for (let i = 0; i <= 3; i++) {
                let split = []
                split = undo_list[i].split(',');
                cy.log(split[0])
                if(split[0] != undo_list_actual[i]){
                    assert.fail('undo ascending order is not proper')
                }
            }
        })
    })
})