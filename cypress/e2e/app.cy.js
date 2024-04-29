describe('Top Erlebnisse in Deiner Nähe', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('should display the correct title and filter options', () => {
      cy.get('h1').should('have.text', 'Top Erlebnisse in Deiner Nähe')
      cy.get('select').should('have.length', 2)
      cy.get('option').should('have.length.at.least', 1)
    })
  
    it('should filter events by city and category', () => {
      // Select a city
      cy.get('select').first().select('Berlin')
      cy.get('[data-testid^="event-card-"]').should('have.length.at.most', 10)
      cy.get('[data-testid^="event-card-"]').each(($event) => {
        cy.wrap($event).find('[data-testid^="cypress-city"]').should('have.text', 'Berlin')
      })
  
      // Select a category
      cy.get('select').last().select('cocktailkurs')
      cy.get('[data-testid^="event-card-"]').should('have.length.at.most', 10)
      cy.get('[data-testid^="event-card-"]').each(($event) => {
        cy.wrap($event).find('[data-testid^="cypress-title"]').should('contain', 'Cocktailkurs')
      })
    })
  })