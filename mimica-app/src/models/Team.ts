export interface Player {
    id: string;
    name: string;
}

export interface Team {
    id: string;
    name: string;
    players: Player[];
    score: number;
    currentPlayerIndex: number;
}
