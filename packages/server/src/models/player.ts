// src/models/player.ts
export interface Player {
    playerid: string;
    name: string;
    position: string;
    team: string | undefined;
}