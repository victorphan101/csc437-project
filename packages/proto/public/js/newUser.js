import { prepareTemplate } from "./template.js";
import { relayEvent } from "./relay-event.js";
import "./restful-form.js";

export class SignupFormElement extends HTMLElement {
  static template = prepareTemplate(`
    <template>
      <restful-form src="/auth/signup">
        <slot></slot>
      </restful-form>
    </template>
  `);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      SignupFormElement.template.cloneNode(true)
    );

    this.addEventListener("restful-form:created", (event) => {
      const { token } = event.detail.created;
      console.log("Signup successful", event.detail);

      relayEvent(event, "auth:message", [
        "auth/signin",
        { token, redirect: "/app" }
      ]);
    });
  }
}

customElements.define("signup-form", SignupFormElement);