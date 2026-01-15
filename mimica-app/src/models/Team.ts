// src/models/Team.ts

export interface Team {
    id: number;
    name: string;
    players: string[];
    score: number;
    currentPlayerIndex: number;
}