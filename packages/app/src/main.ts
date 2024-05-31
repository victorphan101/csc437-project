import { Auth, History, Store, Switch, define, html } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { SportHeaderElement } from "./components/sport-header";

define({
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "sport:auth");
    }
  },
  "sport-header": SportHeaderElement,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history");
    }
  },
});

const routes = [
    {
      path: "/app/tour/:id",
      view: (params: Switch.Params) => html`
        <tour-view tour-id=${params.id}></tour-view>
      `
    },
    {
      path: "/app/profile/:id",
      view: (params: Switch.Params) => html`
        <profile-view user-id=${params.id}></profile-view>
      `
    },
    {
      path: "/app",
      view: () => html`
        <landing-view></landing-view>
      `
    },
    {
      path: "/",
      redirect: "/app"
    }
  ];