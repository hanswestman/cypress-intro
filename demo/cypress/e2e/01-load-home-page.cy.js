/// <reference types="cypress" />

describe("Load home page", () => {
    it("should load and display multiple posts", () => {

        cy.visit("http://localhost:8080");

        cy.get(".post-excerpt").should("have.length.at.least", 2);
        
    });
});