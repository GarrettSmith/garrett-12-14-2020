describe("Upload document", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Displays an upload button", () => {
    cy.get("#Upload-Button").should("exist");
  });

  it("Uploads jpg files", () => {
    const filePath = "example.jpg";
    cy.get("#Upload-Input").attachFile(filePath);
    cy.get(".Document-Tile").contains(filePath).should('exist');
  });

  it("Uploads png files", () => {
    const filePath = "test.png";
    cy.get("#Upload-Input").attachFile(filePath);
    cy.get(".Document-Tile").contains(filePath).should('exist');
  });

  it("Fails to upload non-image files", () => {
    const filePath = "example.json";
    cy.get("#Upload-Input").attachFile(filePath);
    cy.get(".Document-Error").should("exist");
  });
});
