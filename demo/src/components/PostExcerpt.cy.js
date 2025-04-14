/* global describe, it, cy */
import PostExcerpt from "./PostExcerpt.vue";

describe("<PostExcerpt />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(PostExcerpt, {
      props: {
        post: {
          id: 1000,
          title: "Example title",
          content: "Example content",
        },
      },
    });
  });

  it("should limit content to 50 characters and end with ellipsis", () => {
    cy.mount(PostExcerpt, {
      props: {
        post: {
          id: 1000,
          title: "Lorem",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non sollicitudin eros. Sed molestie ipsum vitae porta luctus.",
        },
      },
    });

    cy.get("p").should("have.text", "Lorem ipsum dolor sit amet, consectetur adipiscing…");
  });

  it("should not limit content shorter than 50 characters", () => {
    cy.mount(PostExcerpt, {
      props: {
        post: {
          id: 1000,
          title: "Lorem",
          content: "Lorem ipsum dolor sit amet.",
        },
      },
    });

    cy.get("p").should("have.text", "Lorem ipsum dolor sit amet.");
  });
});
