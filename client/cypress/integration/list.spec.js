describe("List documents", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Displays a list of documents", () => {
    cy.get("#Document-List-Documents")
      .children(".Document-Tile")
      .should("exist");
  });

  it("Displays the count of documents", () => {
    cy.get("#Document-List-Header")
      .contains(/^\d+ documents?$/)
      .should("exist");
  });

  it("Displays the total size of documents", () => {
    cy.get("#Document-List-Documents")
      .contains(/^\d+(\.\d)?[kgm]?b$/)
      .should("exist");
  });

  describe("Document tile", () => {
    it("Displays the name of the document", () => {
      cy.get(".Document-Tile")
        .contains(/\w+\.(jpg|png)/)
        .should("exist");
    });

    it("Displays the filesize of the document", () => {
      cy.get(".Document-Tile")
        .contains(/^\d+(\.\d)?[gkm]?b$/)
        .should("exist");
    });
  });

  describe("Error state", () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: "POST",
          url:
            "https://us-central1-garrett-12-14-2020.cloudfunctions.net/searchDocuments",
        },
        {
          statusCode: 400,
        }
      );
      cy.visit("/");
    });

    it("Displays the error message", () => {
      cy.get("#Error-Page").should("exist");
    });
  });
});
