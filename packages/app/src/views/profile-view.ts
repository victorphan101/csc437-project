import { define, Form, View } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";
import { ProfileAvatarElement } from "../components/profile-avatar";
import resetStyles from "../css/reset";
import { Tour } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class TourViewElement extends View<Model, Msg> {
  @property({ attribute: "tour-id", reflect: true })
  tourid = "";

  @property()
  get tour(): Tour | undefined {
    return this.model.tour;
  }

  constructor() {
    super("sport:model");
  }

  render() {
    return html`
    <div class="tour-details">
    ${this.tour
      ? html`
          <h2 class="tour-name">${this.tour.name}</h2>
          <p class="tour-description">${this.tour.description}</p>
          <p class="tour-dates">
            Start Date: ${this.tour.startDate}<br>
            End Date: ${this.tour.endDate}
          </p>
          <ul class="tour-locations">
            ${this.tour.locations.map(
                (              location: { city: unknown; country: unknown; }) => html`
                <li class="tour-location">
                  ${location.city}, ${location.country}
                </li>
              `
            )}
          </ul>
        `
      : html`
          <p>No tour found.</p>
        `}
  </div>
    `;
  }

}

class ProfileEditor extends LitElement {
    static uses = define({
      "mu-form": Form.Element,
      "input-array": InputArray.Element
    });
    @property()
    username?: string;
  
    @property({ attribute: false })
    init?: Profile;
  
    render() {
      return html`
        <section>
          <slot name="avatar"></slot>
          <h1><slot name="name"></slot></h1>
          <nav>
            <a class="close" href="../${this.username}">Close</a>
            <button class="delete">Delete</button>
          </nav>
          <mu-form .init=${this.init}>
            <label>
              <span>Username</span>
              <input disabled name="userid" />
            </label>
            <label>
              <span>Name</span>
              <input name="name" />
            </label>
            <label>
              <span>Nickname</span>
              <input name="nickname" />
            </label>
            <label>
              <span>Home City</span>
              <input name="home" />
            </label>
            <label>
              <span>Airports</span>
              <input-array name="airports">
                <span slot="label-add">Add an airport</span>
              </input-array>
            </label>
            <label>
              <span>Color</span>
              <input type="color" name="color" />
            </label>
            <label>
              <span>Avatar</span>
              <input name="avatar" />
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
      `
    ];
  }
  
  export class ProfileViewElement extends View<Model, Msg> {
    static uses = define({
      "profile-viewer": ProfileViewer,
      "profile-editor": ProfileEditor,
      "profile-avatar": ProfileAvatarElement
    });
  
    @property({ type: Boolean, reflect: true })
    edit = false;
  
    @property({ attribute: "user-id", reflect: true })
    userid = "";
  
    @state()
    get profile(): Profile | undefined {
      return this.model.profile;
    }
  
    constructor() {
      super("blazing:model");
      // this.addEventListener("mu-form:submit", (event) =>
      //   this._handleSubmit(event as Form.SubmitEvent<Profile>)
      // );
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
          "profile/select",
          { userid: newValue }
        ]);
      }
    }
  
    render() {
      const {
        color,
        avatar,
        name,
        userid,
        nickname,
        home,
        airports = []
      } = this.profile || {};
      const initial = (name || nickname || userid || "?").slice(
        0,
        1
      );
      const airports_html = airports.map(
        (s) =>
          html`
            <li>${s}</li>
          `
      );
  
      const fields = html`
        <profile-avatar
          slot="avatar"
          color=${color}
          src=${avatar}
          initial=${initial}></profile-avatar>
      `;
  
      return this.edit
        ? html`
            <profile-editor
              username=${userid}
              .init=${this.profile}
              @mu-form:submit=${(
          event: Form.SubmitEvent<Profile>
        ) => this._handleSubmit(event)}>
              ${fields}
            </profile-editor>
          `
        : html`
            <profile-viewer username=${userid}>
              ${fields}
              <span slot="name">${name}</span>
              <span slot="userid">${userid}</span>
              <span slot="nickname">${nickname}</span>
              <span slot="home">${home}</span>
              <ul slot="airports">
                ${airports_html}
              </ul>
            </profile-viewer>
          `;
    }
  
    _handleSubmit(event: Form.SubmitEvent<Profile>) {
      console.log("Handling submit of mu-form");
      this.dispatchMessage([
        "profile/save",
        {
          userid: this.userid,
          profile: event.detail,
          onSuccess: () =>
            History.dispatch(this, "history/navigate", {
              href: `/app/profile/${this.userid}`
            }),
          onFailure: (error: Error) =>
            console.log("ERROR:", error)
        }
      ]);
    }
  
    static styles = [resetStyles];
  }