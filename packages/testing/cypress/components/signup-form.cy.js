import { define } from "@calpoly/mustang";
import { html } from "lit";
import { SignupFormElement } from "../../../app/src/components/signup-form";

define({ "signup-form": SignupFormElement });

describe("SignupFormElement", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("renders the sign-up form", () => {
    cy.mount(html`<signup-form></signup-form>`);
    cy.get("restful-form").should("exist");
  });

  it("handles successful sign-up", () => {
    const token = "dummy_token";
    const redirect = "/dashboard";

    cy.mount(html`<signup-form></signup-form>`);

    // Listen for the "auth:message" event
    cy.on("window:message", (eventName, data) => {
      expect(eventName).to.equal("auth:message");
      expect(data[0]).to.equal("auth/signin");
      expect(data[1].token).to.equal(token);
      expect(data[1].redirect).to.equal(redirect);
    });

    // Simulate successful sign-up
    cy.get("restful-form").then((form) => {
      form[0].dispatchEvent(
        new CustomEvent("mu-rest-form:created", {
          detail: { created: { token } },
        })
      );
    });
  });
});