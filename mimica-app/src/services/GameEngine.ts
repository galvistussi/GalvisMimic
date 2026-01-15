import type { GameState } from "../models/GameState";
import type { Team } from "../models/Team";
import { Randomizer } from "./Randomizer";
import { GAME_CONFIG } from "../config/constants";

export class GameEngine {
    static createInitialState(team1Name: string, team1Players: string[], team2Name: string, team2Players: string[]): GameState {
        const teams: Team[] = [
            {
                id: "1",
                name: team1Name || "Equipo 1",
                players: team1Players,
                score: 0,
                currentPlayerIndex: 0,
            },
            {
                id: "2",
                name: team2Name || "Equipo 2",
                players: team2Players,
                score: 0,
                currentPlayerIndex: 0,
            },
        ];

        return {
            teams,
            currentTeamIndex: Randomizer.flipCoin(),
            status: "setup",
            isGameOver: false,
            roundWords: Randomizer.generateRoundWords(),
        };
    }

    static nextTurn(state: GameState, success: boolean): GameState {
        const newTeams = [...state.teams];
        const currentTeam = { ...newTeams[state.currentTeamIndex] };

        if (success) {
            currentTeam.score += 1;
        }

        // Check victory
        if (currentTeam.score >= GAME_CONFIG.MAX_SCORE) {
            return {
                ...state,
                teams: newTeams.map((t, i) => i === state.currentTeamIndex ? currentTeam : t),
                isGameOver: true,
                status: "victory",
                winningTeamId: currentTeam.id,
                turnSuccess: success,
            };
        }

        // Rotate player for the team that just finished
        currentTeam.currentPlayerIndex = (currentTeam.currentPlayerIndex + 1) % currentTeam.players.length;
        newTeams[state.currentTeamIndex] = currentTeam;

        // Switch team
        const nextTeamIndex = (state.currentTeamIndex + 1) % 2;

        return {
            ...state,
            teams: newTeams,
            currentTeamIndex: nextTeamIndex,
            status: "dice",
            turnSuccess: success,
            roundWords: Randomizer.generateRoundWords(),
            targetCategory: Randomizer.getRandomCategory(),
        };
    }

    static prepareRound(state: GameState): GameState {
        return {
            ...state,
            roundWords: Randomizer.generateRoundWords(),
            targetCategory: Randomizer.getRandomCategory(),
            status: "reveal",
        };
    }

    static startAction(state: GameState): GameState {
        return {
            ...state,
            status: "action",
        };
    }

    static finishTurn(state: GameState, success: boolean): GameState {
        return {
            ...state,
            status: "result",
            turnSuccess: success,
        };
    }
}
