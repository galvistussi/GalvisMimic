import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { Dice6 } from 'lucide-react';
import type { Team } from '../../models/Team';

interface DiceScreenProps {
    currentTeam: Team;
    onContinue: () => void;
    isFirstTurn?: boolean;
}

export const DiceScreen: React.FC<DiceScreenProps> = ({ currentTeam, onContinue, isFirstTurn = false }) => {
    const currentPlayer = currentTeam.players[currentTeam.currentPlayerIndex];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 gap-8"
        >
            <header>
                <h2 style={{ fontSize: '2rem' }}>
                    {isFirstTurn ? '¡Sorteo Inicial!' : 'Siguiente Turno'}
                </h2>
                <p style={{ color: THEME.colors.textMuted }}>Le toca a:</p>
            </header>

            <motion.div
                animate={{
                    rotateY: [0, 360],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="glass p-12 flex flex-col items-center gap-4"
                style={{ borderColor: THEME.colors.primary }}
            >
                <Dice6 size={64} color={THEME.colors.primary} />
                <h3 style={{ fontSize: '2.5rem', margin: 0, color: THEME.colors.text }}>
                    {currentTeam.name}
                </h3>
                <p style={{ fontSize: '1.25rem', color: THEME.colors.primary, fontWeight: 'bold' }}>
                    {currentPlayer.name}
                </p>
            </motion.div>

            <PrimaryButton onClick={onContinue}>
                REVELAR PALABRAS
            </PrimaryButton>
        </motion.div>
    );
};
