import { Player  } from "server/models";

export interface Model {
  player?: Player;
}

export const init: Model = {};