describe("Delete document", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Displays a delete button", () => {
    cy.get(".Document-Tile").within(() => cy.get(".Delete-Button"));
  });

  it("Deletes the document", () => {
    const filePath = "example.jpg";
    cy.get("#Upload-Input").attachFile(filePath);

    cy.get(".Document-Tile")
      .contains(filePath)
      .parentsUntil(".Document-Tile")
      .within(() => {
        cy.get(".Delete-Button").click();
      });

    cy.get(".Document-Tile").contains(filePath).should("not.exist");
  });

  it("Shows a message on errors", () => {
    cy.intercept(
      {
        method: "DELETE",
        url:
          "https://firebasestorage.googleapis.com/v0/b/garrett-12-14-2020.appspot.com/o/documents%2F",
      },
      {
        statusCode: 400,
      }
    );
    cy.get(".Delete-Button").first().click();
    cy.get(".Document-Error").should("exist");
  });
});
