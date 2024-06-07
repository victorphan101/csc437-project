import {
  define,
  Form,
  History,
  InputArray,
  View
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Player } from "server/models";
import { PlayerAvatarElement } from "../components/player-avatar";
import resetStyles from "../css/reset";
import { Msg } from "../messages.ts";
import { Model } from "../model.ts";

const gridStyles = css`
  slot[name="avatar"] {
    display: block;
    grid-row: 1 / span 4;
  }
  nav {
    display: contents;
    text-align: right;
  }
  nav > * {
    grid-column: controls;
  }
`;

class PlayerViewer extends LitElement {
  @property()
  name?: string;

  render() {
    return html`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a href="${this.name}/edit" class="edit">Edit</a>
        </nav>
        <dl>
          <dt>Username</dt>
          <dd><slot name="userid"></slot></dd>
          <dt>Position</dt>
          <dd><slot name="position"></slot></dd>
          <dt>Team</dt>
          <dd><slot name="team"></slot></dd>
        </dl>
      </section>
    `;
  }

  static styles = [
    resetStyles,
    gridStyles,
    css`
      * {
        margin: 0;
        box-sizing: border-box;
      }
      section {
        display: grid;
        grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
        gap: var(--size-spacing-medium)
          var(--size-spacing-xlarge);
        align-items: end;
      }
      h1 {
        grid-row: 4;
        grid-column: value;
      }
      dl {
        display: grid;
        grid-column: key / end;
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-xlarge);
        align-items: baseline;
      }
      dt {
        grid-column: key;
        justify-self: end;
        color: var(--color-accent);
        font-family: var(--font-family-display);
      }
      dd {
        grid-column: value;
      }
      ::slotted(ul) {
        list-style: none;
        display: flex;
        gap: var(--size-spacing-medium);
      }
    `
  ];
}

class PlayerEditor extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
  });
  @property()
  name?: string;

  @property({ attribute: false })
  init?: Player;

  render() {
    return html`
      <section>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a class="close" href="../${this.name}">Close</a>
          <button class="delete">Delete</button>
        </nav>
        <mu-form .init=${this.init}>
          <label>
            <span>Name</span>
            <input disabled name="userid" />
          </label>
          <label>
            <span>Avatar</span>
            <input
              name="avatar"
              type="file"
              @change=${this._handleAvatarSelected} />
          </label>
          <slot name="avatar"></slot>
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Position</span>
            <input name="position" />
          </label>
          <label>
            <span>Team</span>
            <input name="team "/>
          </label>
        </mu-form>
      </section>
    `;
  }

  static styles = [
    resetStyles,
    gridStyles,
    css`
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
      mu-form label:has(input[type="file"]) {
        grid-row-end: span 4;
      }
    `
  ];

  _handleAvatarSelected(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const selectedFile = (target.files as FileList)[0];

    const reader: Promise<string> = new Promise(
      (resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result as string);
        fr.onerror = (err) => reject(err);
        fr.readAsDataURL(selectedFile);
      }
    );

    reader.then((url: string) => {
      this.dispatchEvent(
        new CustomEvent("player:new-avatar", {
          bubbles: true,
          composed: true,
          detail: url
        })
      );
    });
  }
}

export class PlayerViewElement extends View<Model, Msg> {
  static uses = define({
    "player-viewer": PlayerViewer,
    "player-editor": PlayerEditor,
    "player-avatar": PlayerAvatarElement
  });

  @property({ type: Boolean, reflect: true })
  edit = false;

  @property({ attribute: "user-id", reflect: true })
  userid = "";

  @state()
  get player(): Player | undefined {
    return this.model.player;
  }

  @state()
  newAvatar?: string;

  constructor() {
    super("sport:model");

    this.addEventListener(
      "player:new-avatar",
      (event: Event) => {
        this.newAvatar = (event as CustomEvent)
          .detail as string;
      }
    );
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "user-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Profiler Page:", newValue);
      this.dispatchMessage([
        "player/select",
        { userid: newValue }
      ]);
    }
  }

  render() {
    const {
      avatar,
      name,
      userid,
      team,
      position,
    } = this.player || {};
    const initial = (name || userid || "?").slice(
      0,
      1
    );
    

    const fields = html`
      <player-avatar
        slot="avatar"
        team=${team}
        position=${position}
        src=${this.newAvatar || avatar}
        initial=${initial}></player-avatar>
    `;

    return this.edit
      ? html`
          <player-editor
            username=${userid}
            .init=${this.player}
            @mu-form:submit=${(
        event: Form.SubmitEvent<Player>
      ) => this._handleSubmit(event)}>
            ${fields}
          </player-editor>
        `
      : html`
          <player-viewer username=${userid}>
            ${fields}
            <span slot="name">${name}</span>
            <span slot="userid">${userid}</span>
            <span slot="team">${team}</span>
            <span slot="position">${position}</span>
          </player-viewer>
        `;
  }

  _handleSubmit(event: Form.SubmitEvent<Player>) {
    console.log("Handling submit of mu-form");
    const player = this.newAvatar
      ? { ...event.detail, avatar: this.newAvatar }
      : event.detail;
    this.dispatchMessage([
      "player/save",
      {
        userid: this.userid,
        player,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/player/${this.userid}`
          }),
        onFailure: (error: Error) =>
          console.log("ERROR:", error)
      }
    ]);
  }

  static styles = [resetStyles];
}