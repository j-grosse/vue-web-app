describe('Event Listings Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should display the correct title and filter options', () => {
    cy.get('h1').should('have.text', 'Top Erlebnisse in Deiner Nähe')
    cy.get('select').should('have.length', 3)
    cy.get('option').should('have.length.at.least', 1)
  })

  it('should filter events by city', () => {
    // Select a city
    cy.get('select').first().select('Berlin');
    cy.get('[data-testid^="event-card-"]').should('have.length.at.most', 10);
    cy.get('[data-testid^="event-card-"]').each(($event) => {
      cy.wrap($event)
        .find('[data-testid^="cypress-city"]')
        .should('have.text', 'Berlin');
    });
  });

  it('should filter events by category', () => {
    // Select a category
    cy.get('select').eq(1).select('cocktailkurs');
    cy.get('[data-testid^="event-card-"]').should('have.length.at.most', 10);
    cy.get('[data-testid^="event-card-"]').each(($event) => {
      cy.wrap($event)
        .find('[data-testid^="cypress-title"]')
        .should('contain.text', 'Cocktailkurs');
    });
  });

  it('should filter events by rating', () => {
    // Select a rating
    cy.get('select').last().select('5');
    cy.get('[data-testid^="event-card-"]').should('have.length.at.most', 10);
    cy.get('[data-testid^="event-card-"]').each(($event) => {
      cy.wrap($event)
        .find('[data-testid^="cypress-title"]')
        .shouldNot('contain.text', 'Teambuilding Kochkurs in Berlin');
    });
  })
})
