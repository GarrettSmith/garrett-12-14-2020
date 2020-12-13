describe("Search documents", () => {
  const filePath1 = "example.jpg";
  const filePath2 = "test.png";

  before(() => {
    cy.intercept({
      method: "POST",
      url:
        "https://firebasestorage.googleapis.com/v0/b/garrett-12-14-2020.appspot.com/o",
    }).as("uploadDocument");

    cy.get("#Upload-Input").attachFile(filePath1);
    cy.wait("@uploadDocument");

    cy.get("#Upload-Input").attachFile(filePath2);
    cy.wait("@uploadDocument");
  });

  beforeEach(() => {
    cy.visit("/");

    cy.intercept({
      method: "POST",
      url:
        "https://us-central1-garrett-12-14-2020.cloudfunctions.net/searchDocuments",
    }).as("searchDocuments");
  });

  it("Displays a search input", () => {
    cy.get("#Document-Search").should("exist");
  });

  it("Filters documents", () => {
    cy.get("#Document-Search").type("example");
    cy.wait("@searchDocuments");

    cy.get(".Document-Tile").contains(filePath1).should("exist");
    cy.get(".Document-Tile").contains(filePath2).should("not.exist");
  });

  it("Filters documents", () => {
    cy.get("#Document-Search").type("example");
    cy.wait("@searchDocuments");

    cy.get("#Document-Search").clear();
    cy.wait("@searchDocuments");

    cy.get(".Document-Tile").contains(filePath1).should("exist");
    cy.get(".Document-Tile").contains(filePath2).should("exist");
  });
});
