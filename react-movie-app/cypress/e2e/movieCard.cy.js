describe('MovieCard Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('checks whether each movie card has a valid data-testid attribute', () => {
    cy.get('[data-testid^="movie-"]').each(($el) => {
      cy.wrap($el)
        .invoke('attr', 'data-testid')
        .should('match', /^movie-\d+$/);
    });
  });

  it('ensures each movie card displays essential details', () => {
    cy.get('[data-testid^="movie-"]').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('h3').should('not.be.empty');
        cy.get('.rating p').should('not.be.empty');
        cy.get('.lang').should('not.be.empty');
        cy.get('.year').should('not.be.empty');
      });
    });
  });

  it('renders the correct movie poster or fallback image for each movie card', () => {
    cy.get('[data-testid^="movie-"]').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('img').invoke('attr', 'src').then((src) => {
          if (src.includes('/no-movie.png')) {
            expect(src).to.include('/no-movie.png');
          } else {
            expect(src).to.match(/^https:\/\/image\.tmdb\.org\/t\/p\/w500\/.+$/);
          }
        });
      });
    });
  });
});