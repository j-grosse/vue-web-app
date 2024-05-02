describe('Event Details Page', () => {
  beforeEach(() => {
    cy.visit(
      'http://localhost:3000/events/weinhopping-in-duesseldorf-z7e8pw'
    )
  })

  it('has an h1 on the page', () => {
    cy.get('h1').first().should('exist')
  })

  it('should display the correct title', () => {
    cy.get('h1').first().should(
      'have.text',
      'Weinhopping in Düsseldorf: Weinprobe & Besuch von Weinbars'
    )
  })

  it('should click the back button and assert that the URL changes', () => {
    cy.contains('zurück').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

})
