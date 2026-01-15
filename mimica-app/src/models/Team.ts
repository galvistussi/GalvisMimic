// src/models/Team.ts

export interface Team {
    id: string;
    name: string;
    players: string[];
    score: number;
    currentPlayerIndex: number;
}