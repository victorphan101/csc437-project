import { Player } from "../models/player";
import express, { Request, Response } from "express";
import players from "../services/player-svc";

const router = express.Router();

router.get("/:playerid", (req: Request, res: Response) => {
  const { playerid } = req.params;

  players
    .get(playerid)
    .then((player: Player) => res.json(player))
    .catch((err) => res.status(404).end());
});

router.post("/players", (req: Request, res: Response) => {
  const newPlayer = req.body;

  players
    .create(newPlayer)
    .then((player: Player) => res.status(201).send(player))
    .catch((err) => res.status(500).send(err));
});

router.get("/", (req: Request, res: Response) => {
  players
    .index()
    .then((list: Player[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.put("/:playerid", (req: Request, res: Response) => {
  const { playerid } = req.params;
  const newPlayer = req.body;

  players
    .update(playerid, newPlayer)
    .then((profile: Player) => res.json(profile))
    .catch((err) => res.status(404).end());
});

router.post("/", (req: Request, res: Response) => {
  const newProfile = req.body;

  players
    .create(newPlayer)
    .then((player: Player) => res.status(201).send(player))
    .catch((err) => res.status(500).send(err));
});


export default router;