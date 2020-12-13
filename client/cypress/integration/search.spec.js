describe("Search documents", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("Displays a search input", () => {
        cy.get("#Document-Search").should("exist");
    });

    it("Filters documents", () => {
        const filePath1 = "example.jpg";
        cy.get("#Upload-Input").attachFile(filePath1);
        
        const filePath2 = "test.png";
        cy.get("#Upload-Input").attachFile(filePath2);
        
        // cy.get(".Document-Tile").contains(filePath1).should('exist');
        // cy.get(".Document-Tile").contains(filePath2).should('exist');

        cy.intercept({
            method: "POST",
            url: 'https://us-central1-garrett-12-14-2020.cloudfunctions.net/searchDocuments',
        }).as('searchDocuments');

        cy.get("#Document-Search").type("example");        
        cy.wait("@searchDocuments");

        cy.get(".Document-Tile").contains(filePath1).should('exist');        
        cy.get(".Document-Tile").contains(filePath2).should('not.exist');
    });

});