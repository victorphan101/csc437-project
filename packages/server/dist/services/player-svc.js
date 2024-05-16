"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var player_svc_exports = {};
__export(player_svc_exports, {
  default: () => player_svc_default
});
module.exports = __toCommonJS(player_svc_exports);
var import_mongoose = require("mongoose");
const PlayerSchema = new import_mongoose.Schema(
  {
    playerid: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: String, trim: true },
    height: { type: String, trim: true },
    team: { type: String },
    teamColor: { type: String, trim: true }
  },
  { collection: "sports" }
);
const PlayerModel = (0, import_mongoose.model)("Player", PlayerSchema);
function index() {
  return PlayerModel.find();
}
function get(userid) {
  return PlayerModel.find({ userid }).then((list) => list[0]).catch((err) => {
    throw `${userid} Not Found`;
  });
}
function create(profile) {
  const p = new PlayerModel(profile);
  return p.save();
}
function update(playerid, profile) {
  return PlayerModel.findOne({ playerid }).then((found) => {
    if (!found) throw `${playerid} Not Found`;
    else
      return PlayerModel.findByIdAndUpdate(
        found._id,
        profile,
        {
          new: true
        }
      );
  }).then((updated) => {
    if (!updated) throw `${playerid} not updated`;
    else return updated;
  });
}
var player_svc_default = { index, get, create, update };
