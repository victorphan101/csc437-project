// src/models/player.ts
export interface Player {
    playerid: string;
    name: string;
    height: string;
    position: string;
    team: string | undefined;
    teamColor: string | undefined;
}