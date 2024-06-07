import { define } from "@calpoly/mustang";
import { html } from "lit";
import { LoginFormElement } from "../../../app/src/components/login-form"; 

define({ "login-form": LoginFormElement });

describe("LoginFormElement", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("renders the login form", () => {
    cy.mount(html`<login-form></login-form>`);
    cy.get("restful-form").should("exist");
  });

  it("displays an error message for invalid credentials", () => {
    cy.mount(html`<login-form></login-form>`);

    // Simulate invalid login attempt
    cy.get("restful-form").then((form) => {
      form[0].dispatchEvent(
        new CustomEvent("mu-rest-form:error", {
          detail: { error: new Error("Invalid credentials") },
        })
      );
    });

    cy.get(".error").should("contain.text", "Invalid Username or Password");
  });

  it("handles successful login", () => {
    const token = "dummy_token";
    const redirect = "/dashboard";

    cy.mount(html`<login-form></login-form>`);

    // Listen for the "auth:message" event
    cy.on("window:message", (eventName, data) => {
      expect(eventName).to.equal("auth:message");
      expect(data[0]).to.equal("auth/signin");
      expect(data[1].token).to.equal(token);
      expect(data[1].redirect).to.equal(redirect);
    });

    // Simulate successful login
    cy.get("restful-form").then((form) => {
      form[0].dispatchEvent(
        new CustomEvent("mu-rest-form:created", {
          detail: { created: { token } },
        })
      );
    });
  });
});