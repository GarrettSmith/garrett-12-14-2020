describe("List documents", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("Displays a list of documents", () => {
        cy.get("#Document-List-Documents").children(".Document-Tile").should('exist');
    });

    it("Displays the count of documents", () => {
        cy.get("#Document-List-Header").contains(/^\d+ documents?$/).should('exist');
    });

    it("Displays the total size of documents", () => {        
        cy.get("#Document-List-Documents").contains(/^\d+(\.\d)?[KM]B$/).should('exist');
    });
    
    describe("Document tile", () => {
        it("Displays the name of the document", () => {
            cy.get(".Document-Tile").contains(/\w+\.(jpg|png)/).should('exist');
        });
    
        it("Displays the filesize of the document", () => {
            cy.get(".Document-Tile").contains(/^\d+(\.\d)?[KM]B$/).should('exist');
        });
    });

    describe("Error state", () => {
        beforeEach(() => {
            cy.intercept({
                method: "GET",
                url: "https://firebasestorage.googleapis.com/v0/b/garrett-12-14-2020.appspot.com/o?prefix=documents%2F&delimiter=%2F"
            }, {
                statusCode: 400,
            });
        });

        it("Displays the error message", () => {
            cy.get("#Document-List-Error").should('exist');
        });
    });
});