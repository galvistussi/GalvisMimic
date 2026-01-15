import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { GAME_CONFIG } from '../../config/constants';
import { Team } from '../../models/Team';
import { Trophy, Frown, Users } from 'lucide-react';

interface ResultScreenProps {
    success: boolean;
    teams: Team[];
    onContinue: () => void;
    isGameOver: boolean;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
    success,
    teams,
    onContinue,
    isGameOver
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-8 py-12"
        >
            <div className="flex flex-col items-center gap-4">
                {success ? (
                    <>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <Trophy size={80} color={THEME.colors.success} />
                        </motion.div>
                        <h2 className="success-text" style={{ fontSize: '3rem', margin: 0 }}>
                            {GAME_CONFIG.SUCCESS_MESSAGE}
                        </h2>
                        <p style={{ color: THEME.colors.textMuted }}>+1 punto para el equipo</p>
                    </>
                ) : (
                    <>
                        <motion.div
                            animate={{ x: [-10, 10, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <Frown size={80} color={THEME.colors.danger} />
                        </motion.div>
                        <h2 className="danger-text" style={{ fontSize: '3rem', margin: 0 }}>
                            {GAME_CONFIG.FAIL_MESSAGE}
                        </h2>
                        <p style={{ color: THEME.colors.textMuted }}>Se acabó el tiempo</p>
                    </>
                )}
            </div>

            <div className="w-full flex gap-4 mt-8">
                {teams.map((team, idx) => (
                    <div key={team.id} className="glass flex-1 p-4 flex flex-col items-center gap-2">
                        <span style={{ fontSize: '0.75rem', color: THEME.colors.textMuted, textTransform: 'uppercase' }}>
                            {team.name}
                        </span>
                        <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                            {team.score}
                        </span>
                        <div className="w-full h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(team.score / GAME_CONFIG.MAX_SCORE) * 100}%` }}
                                className="h-full"
                                style={{ backgroundColor: idx === 0 ? THEME.colors.primary : THEME.colors.secondary }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <PrimaryButton onClick={onContinue} className="mt-8">
                {isGameOver ? 'VER VICTORIA' : 'SIGUIENTE TURNO'}
            </PrimaryButton>
        </motion.div>
    );
};
