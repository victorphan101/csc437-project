import { prepareTemplate } from "./template.js";

export class PlayerProfileElement extends HTMLElement {
  static styles = `
    * {
      margin: 0;
      box-sizing: border-box;
    }
    section {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      background-color: #f5f5f5;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    dl {
      margin-left: 1rem;
    }
    dt {
      font-weight: bold;
      margin-top: 0.5rem;
    }
    dd {
      margin-left: 0;
    }
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 1rem;
    }
    button {
      margin-top: 1rem;
    }
  `;

  static template = prepareTemplate(`
    <template>
      <section>
        <slot name="avatar"></slot>
        <div>
          <h1><slot name="name"></slot></h1>
          <dl>
            <dt>Team</dt>
            <dd><slot name="team"></slot></dd>
            <dt>Position</dt>
            <dd><slot name="position"></slot></dd>
            <dt>Height</dt>
            <dd><slot name="height"></slot></dd>
          </dl>
          <button id="editButton">Edit</button>
        </div>
      </section>
      <style>${PlayerProfileElement.styles}</style>
    </template>
  `);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      PlayerProfileElement.template.cloneNode(true)
    );

    this.editButton = this.shadowRoot.getElementById("editButton");
    this.editButton.addEventListener("click", this.showEditForm.bind(this));
  }

  get src() {
    return this.getAttribute("src");
  }

  connectedCallback() {
    if (this.src) {
      loadJSON(this.src, this, renderSlots);
    }
  }

  showEditForm() {
    const form = document.createElement("player-profile-form");
    form.setAttribute("src", this.src);
    form.setAttribute("data", JSON.stringify(this.data));
    form.addEventListener("formSubmitted", this.renderUpdatedData.bind(this));
    document.body.appendChild(form);
  }

  renderUpdatedData(event) {
    const updatedData = event.detail.data;
    loadJSON(this.src, this, renderSlots, updatedData);
  }
}

customElements.define("player-profile", PlayerProfileElement);

function renderSlots(json, existingData = null) {
  const entries = Object.entries(json);
  const slot = ([key, value]) => {
    if (key === "avatar") {
      return `<img slot="${key}" src="${value}" alt="${json.name}" />`;
    }
    return `<span slot="${key}">${value}</span>`;
  };

  this.data = json;
  return entries.map(slot).join("\n");
}