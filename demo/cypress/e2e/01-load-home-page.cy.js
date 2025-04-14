/// <reference types="cypress" />

describe("Load home page", () => {

    beforeEach(() => {
        cy.visit("http://localhost:8080");
    });

    it("should load and display multiple posts", () => {
        cy.get(".post-excerpt").should("have.length.at.least", 2);
    });
});