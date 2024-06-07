import {
  Auth,
  History,
  Switch,
  define
} from "@calpoly/mustang";
import { html } from "lit";
import { SportHeaderElement } from "./components/sport-header";
import { PlayerViewElement } from "./views/player-view";

const routes: Switch.Route[] = [
  {
    auth: "protected",
    path: "/app/player/:id/edit",
    view: (params: Switch.Params) => html`
      <player-view edit user-id=${params.id}></player-view>
    `
  },
  {
    auth: "protected",
    path: "/app/player/:id",
    view: (params: Switch.Params) => html`
      <player-view user-id=${params.id}></player-view>
    `
  },
  {
    auth: "protected",
    path: "/app",
    view: () => html`
      <sport-header></sport-header>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "sport:history", "sport:auth");
    }
  },
  "sport-header": SportHeaderElement,
  "player-view": PlayerViewElement,
});