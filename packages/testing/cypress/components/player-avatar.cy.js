import { define } from "@calpoly/mustang";
import { html } from "lit";
import { PlayerAvatarElement } from "../../../app/src/components/player-avatar";

define({ "player-avatar": PlayerAvatarElement });

describe("PlayerAvatarElement", () => {
  beforeEach(() => {
    cy.viewport(1024, 768); 
  });

  it("renders the avatar with initial", () => {
    cy.mount(html`<player-avatar initial="JD"></player-avatar>`);
    cy.get(".avatar").should("contain.text", "JD");
  });

  it("renders the avatar with an image", () => {
    const imageUrl = "https://example.com/avatar.jpg";
    cy.mount(html`<player-avatar src="${imageUrl}"></player-avatar>`);
    cy.get(".avatar").should("have.css", "background-image", `url("${imageUrl}")`);
  });

  it("applies custom color", () => {
    const customColor = "red";
    cy.mount(html`<player-avatar color="${customColor}"></player-avatar>`);
    cy.get(".avatar").should("have.css", "--avatar-backgroundColor", customColor);
  });

  it("applies custom size", () => {
    const customSize = "50px";
    cy.mount(html`<player-avatar style="--avatar-size: ${customSize};"></player-avatar>`);
    cy.get(".avatar").should("have.css", "width", customSize);
    cy.get(".avatar").should("have.css", "line-height", customSize);
    cy.get(".avatar").should("have.css", "font-size", `calc(0.66 * ${customSize})`);
  });
});