describe('MovieCard Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('renders all movie cards with correct data-testid attributes', () => {
    cy.get('[data-testid^="movie-"]').each(($el) => {
      cy.wrap($el)
        .invoke('attr', 'data-testid')
        .should('match', /^movie-\d+$/);
    });
  });

  it('displays correct details for all movie cards', () => {
    cy.get('[data-testid^="movie-"]').each(($el) => {
      cy.wrap($el).within(() => {
        // Überprüfen, ob der Titel angezeigt wird
        cy.get('h3').should('not.be.empty');
  
        // Überprüfen, ob die Bewertung korrekt ist oder "N/A" angezeigt wird
        cy.get('.rating p').should('not.be.empty');
  
        // Überprüfen, ob die Sprache angezeigt wird
        cy.get('.lang').should('not.be.empty');
  
        // Überprüfen, ob das Jahr korrekt ist oder "N/A" angezeigt wird
        cy.get('.year').should('not.be.empty');
      });
    });
  });

  it('displays the correct image for all movie cards', () => {
    cy.get('[data-testid^="movie-"]').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('img').invoke('attr', 'src').then((src) => {
          if (src.includes('/no-movie.png')) {
            // Überprüfen, ob das Platzhalterbild korrekt ist
            expect(src).to.include('/no-movie.png');
          } else {
            // Überprüfen, ob ein gültiger Bildpfad vorhanden ist
            expect(src).to.match(/^https:\/\/image\.tmdb\.org\/t\/p\/w500\/.+$/);
          }
        });
      });
    });
  });
});