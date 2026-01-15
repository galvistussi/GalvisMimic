import type { Team } from "./Team";
import type { Category } from "../data/categories";

export interface GameState {
    teams: Team[];
    currentTeamIndex: number;
    status: 'setup' | 'dice' | 'reveal' | 'action' | 'result' | 'victory';
    isGameOver: boolean;
    roundWords: Record<Category, string>;
    targetCategory?: Category;
    turnSuccess?: boolean;
    winningTeamId?: string;
}