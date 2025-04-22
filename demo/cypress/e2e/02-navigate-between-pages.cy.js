/// <reference types="cypress" />

describe("Navigate between pages", () => {

    it("should allow navigation to a single post", () => {

        cy.visit("http://localhost:8080");

        cy.get(".post-excerpt a").first().click();

        cy.url().should("contain", "/posts/");

    });

    it("should allow navigation to the writing page", () => {

        cy.visit("http://localhost:8080");

        cy.get("nav a").contains("Write").click();

        cy.url().should("contain", "/write");

    });

    it("should allow navigation back to home page", () => {

        cy.visit("http://localhost:8080/write");

        cy.get("nav a").contains("Home").click();

        cy.url().should("equal", "http://localhost:8080/");
        
    });
});