import { Player } from "server/models";

export type Msg =
  | ["player/select", { userid: string }]
  | [
    "player/save",
    {
      userid: string;
      player: Player;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ];