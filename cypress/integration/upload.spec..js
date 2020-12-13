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
        cy.get("#Upload-Success", { timeout: 10000 }).contains(filePath);
    });

    it("Fails to upload non-image files", () => {
        const filePath = "example.json";
        cy.get("#Upload-Input").attachFile(filePath);
        cy.get("#Upload-Error", { timeout: 10000 });
    })

});