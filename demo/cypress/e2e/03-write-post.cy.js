/// <reference types="cypress" />

describe("Write a new post", () => {
    const titleInput = "#post-title";
    const contentInput = "#post-content";
    const button = `form button[type="submit"]`;

    const exampleTitle = "A title from a Cypress test";
    const exampleContent = "Hello!\n\nThis is a post written from a Cypress test.";

    beforeEach(() => {

        cy.visit("http://localhost:8080/write");

    });

    it("should see post form", () => {

        cy.get(titleInput).should("be.visible");
        cy.get(contentInput).should("be.visible");
        cy.get(button).should("be.visible");

    });

    it("should be able to fill and see the preview", () => {

        cy.get(titleInput).type(exampleTitle);
        cy.get(contentInput).type(exampleContent);

        cy.get(".post-full h2").should("contain.text", exampleTitle);
        cy.get(".post-full p").first().should("contain.text", "Hello!");
        cy.get(".post-full p").eq(1).should("contain.text", "This is a post written from a Cypress test.");

    });

    it("should be able to fill submit the form", () => {

        cy.get(titleInput).type(exampleTitle);
        cy.get(contentInput).type(exampleContent);

        cy.get(button).click();

        cy.url().should("contain", "/posts/");

        cy.get(".post-full h2").should("contain.text", exampleTitle);
        cy.get(".post-full p").first().should("contain.text", "Hello!");
        cy.get(".post-full p").eq(1).should("contain.text", "This is a post written from a Cypress test.");

    });

});