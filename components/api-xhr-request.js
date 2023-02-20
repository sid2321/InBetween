Cypress.Commands.add('pageLoaded', () => {
    Cypress.log({
      name: 'pageLoaded',
    });
  
    cy.intercept('POST', '/InBetween/MiddlewareServlet').as('waitforLoad');
  });

  Cypress.Commands.add('exportJobAutomation', () => {
    Cypress.log({
      name: 'waitforJAExport',
    });
  
    cy.intercept('POST', '/ScheduleJobAutomation').as('waitforJAExport');
  });