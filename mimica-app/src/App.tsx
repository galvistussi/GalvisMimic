import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { GameState } from './models/GameState';
import { GameEngine } from './services/GameEngine';
import { SetupScreen } from './ui/screens/SetupScreen';
import { DiceScreen } from './ui/screens/DiceScreen';
import { WordRevealScreen } from './ui/screens/WordRevealScreen';
import { ActionScreen } from './ui/screens/ActionScreen';
import { ResultScreen } from './ui/screens/ResultScreen';
import { VictoryScreen } from './ui/screens/VictoryScreen';
import './App.css';

function App() {
  const [state, setState] = useState<GameState | null>(null);

  const handleStartGame = (t1: string, t1p: string[], t2: string, t2p: string[]) => {
    const initialState = GameEngine.createInitialState(t1, t1p, t2, t2p);
    setState(initialState);
    // Auto transition to dice screen
    setState(prev => prev ? { ...prev, status: 'dice' } : null);
  };

  const handleReveal = () => {
    setState(prev => prev ? GameEngine.prepareRound(prev) : null);
  };

  const handleStartAction = () => {
    setState(prev => prev ? GameEngine.startAction(prev) : null);
  };

  const handleFinishTurn = (success: boolean) => {
    setState(prev => prev ? GameEngine.finishTurn(prev, success) : null);
  };

  const handleContinue = () => {
    if (!state) return;

    if (state.status === 'result') {
      const nextState = GameEngine.nextTurn(state, state.turnSuccess || false);
      setState(nextState);
    }
  };

  const handleRestart = () => {
    setState(null);
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {!state && (
          <SetupScreen key="setup" onStart={handleStartGame} />
        )}

        {state?.status === 'dice' && (
          <DiceScreen
            key="dice"
            currentTeam={state.teams[state.currentTeamIndex]}
            onContinue={handleReveal}
            isFirstTurn={state.teams.every(t => t.score === 0)}
          />
        )}

        {state?.status === 'reveal' && (
          <WordRevealScreen
            key="reveal"
            roundWords={state.roundWords}
            targetCategory={state.targetCategory!}
            onStart={handleStartAction}
          />
        )}

        {state?.status === 'action' && (
          <ActionScreen
            key="action"
            onFinish={handleFinishTurn}
          />
        )}

        {state?.status === 'result' && (
          <ResultScreen
            key="result"
            success={state.turnSuccess || false}
            teams={state.teams}
            onContinue={handleContinue}
            isGameOver={state.isGameOver}
          />
        )}

        {state?.status === 'victory' && (
          <VictoryScreen
            key="victory"
            winningTeam={state.teams.find(t => t.id === state.winningTeamId)!}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
