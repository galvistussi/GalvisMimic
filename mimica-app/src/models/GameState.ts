import { Team } from "./Team";
import { Category } from "../data/categories";

export type GameStatus = "setup" | "dice" | "reveal" | "action" | "result" | "victory";

export interface GameState {
    teams: Team[];
    currentTeamIndex: number;
    status: GameStatus;
    isGameOver: boolean;
    winningTeamId?: string;
    roundWords: Record<Category, string>;
    targetCategory?: Category;
    turnSuccess?: boolean;
}
