describe('Listing Restaurants', () => {
  it('shows restaurants from the server', () => {
    const pastaPlace = 'Pasta Place';
    const saladPlace = 'Salad Place';

    cy.server({ force404: true });

    cy.route({
      method: 'GET',
      url: 'https://outside-in-dev-api.herokuapp.com/AHLTTTdUTAOdwOt9cCzvbJpIp0Z8922n/restaurants',
      response: [
        { id: 644, name: pastaPlace },
        { id: 645, name: saladPlace },
      ],
    });

    cy.visit('/');
    cy.contains(pastaPlace);
    cy.contains(saladPlace);
  });
});
