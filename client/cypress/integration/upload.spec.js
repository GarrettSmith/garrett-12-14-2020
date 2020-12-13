describe("Upload document", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("Displays an upload button", () => {
        cy.get("#Upload-Button");
    });

    it("Uploads files", () => {
        const filePath = "example.jpg";
        cy.get("#Upload-Input").attachFile(filePath);
        cy.get("#Upload-Success").contains(filePath).should('exist');
        // TODO add to DOM
        // cy.get(".Document-Tile").contains(filePath).should('exist');
    });

    it("Fails to upload non-image files", () => {
        const filePath = "example.json";
        cy.get("#Upload-Input").attachFile(filePath);
        cy.get("#Upload-Error").should('exist');
    })

});