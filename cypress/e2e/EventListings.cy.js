describe('Event Listings Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('has an h1 on the page', () => {
    cy.get('h1').should('exist')
  })

  it('should display the correct title and display select filters and options', () => {
    cy.get('h1').should('have.text', 'Top Erlebnisse in Deiner Nähe')
    cy.get('select').should('have.length', 3)
    cy.get('option').should('have.length.at.least', 1)
  })

  it('should show 10 cards and check if a card contains a specific title', () => {
    cy.get('[data-testid^="event-card-"]').should('have.length.at.least', 10)
    cy.get('[data-testid^="event-card-"]').each(($event) => {
      // check if an event card contains the specified text
      cy.wrap($event)
        .find('[data-testid^="cypress-title"]')
        .invoke('text')
        .then((text) => {
          if (text.includes('Weinhopping in Düsseldorf')) {
          }
        })
    })
  })

  it('should click the event card and assert that the URL changes', () => {
    cy.get('[data-testid^="event-card-"]').each(($event) => {
      cy.wrap($event)
        .find('[data-testid^="cypress-title"]')
        .invoke('text')
        .then((text) => {
          if (text.includes('Weinhopping in Düsseldorf')) {
            // The event card contains the specified text
            cy.wrap($event).as('foundEventCard')
          }
        })
    })

    // Click the event card with the specified text
    cy.get('@foundEventCard').click()

    // Assert that the URL changes to the expected value
    cy.url().should(
      'include',
      'http://localhost:3000/events/weinhopping-in-duesseldorf-z7e8pw'
    )
  })

  it('should filter events by city', () => {
    // Select a city
    cy.get('select').first().select('Berlin')
    cy.get('[data-testid^="event-card-"]').should('have.length.at.most', 10)
    // Check if the event cards contain the text "Berlin"
    cy.get('[data-testid^="event-card-"]').each(($event) => {
      cy.wrap($event)
        .find('[data-testid^="cypress-city"]')
        .should('contain.text', 'Berlin')
    })
  })

  it('should filter events by category', () => {
    // Select a category
    cy.get('select').eq(1).select('cocktailkurs')
    cy.get('[data-testid^="event-card-"]').should('have.length.at.most', 5)
    cy.get('[data-testid^="event-card-"]').each(($event) => {
      cy.wrap($event)
        .find('[data-testid^="cypress-title"]')
        .should('contain.text', 'Cocktail')
    })
  })

  it('should filter events by rating', () => {
    // Select a rating
    cy.get('select').last().select('5')
    cy.get('[data-testid^="event-card-"]').should('have.length.at.least', 10)
    cy.get('[data-testid^="event-card-"]').each(($event) => {
      cy.wrap($event)
        .find('[data-testid^="cypress-title"]')
        .invoke('text')
        .then((text) => {
          if (text.includes('Weinhopping in Düsseldorf')) {
            // The event card contains the specified text
            cy.wrap($event).as('foundEventCard')
          }
        })
    })

    // Assert that the URL matches the expected value
    cy.url().should('eq', 'http://localhost:3000/?rating=5')

    // Assert that the event card with the specified text was found
    cy.get('@foundEventCard').should('exist')
  })
})
