import { Schema, Model, Document, model } from "mongoose";
import { Player } from "../models/player";

const PlayerSchema = new Schema<Player>(
  {
    playerid: { type: String, required: true},
    name: { type: String, required: true},
    position: { type: String, trim: true},
    team: { type: String},
  },
  { collection: "sports" }
);

const PlayerModel = model<Player>("Player", PlayerSchema);

function index(): Promise<Player[]> {
  return PlayerModel.find();
}

function get(userid: String): Promise<Player> {
  return PlayerModel.find({ userid })
    .then((list) => list[0])
    .catch((err) => {
      throw `${userid} Not Found`;
    });
}

function create(profile: Player): Promise<Player> {
  const p = new PlayerModel(profile);
  return p.save();
}

function update(
  playerid: String,
  profile: Player
): Promise<Player> {
  return PlayerModel.findOne({ playerid })
    .then((found) => {
      if (!found) throw `${playerid} Not Found`;
      else
        return PlayerModel.findByIdAndUpdate(
          found._id,
          profile,
          {
            new: true
          }
        );
    })
    .then((updated) => {
      if (!updated) throw `${playerid} not updated`;
      else return updated as Player;
    });
}

export default { index, get, create, update };

