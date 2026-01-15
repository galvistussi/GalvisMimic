import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { TimerDisplay } from '../components/TimerDisplay';
import { GAME_CONFIG } from '../../config/constants';
import { Check, X } from 'lucide-react';
import { TimerService } from '../../services/TimerService';

interface ActionScreenProps {
    onFinish: (success: boolean) => void;
}

export const ActionScreen: React.FC<ActionScreenProps> = ({ onFinish }) => {
    const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.TURN_DURATION_SEC);

    useEffect(() => {
        const timer = new TimerService(
            GAME_CONFIG.TURN_DURATION_SEC,
            (time) => setTimeLeft(time),
            () => onFinish(false)
        );
        timer.start();
        return () => timer.stop();
    }, [onFinish]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-between py-12 h-full"
            style={{ minHeight: '80vh' }}
        >
            <header>
                <h2 style={{ fontSize: '2rem' }}>¡ACTÚA YA!</h2>
                <p style={{ color: THEME.colors.textMuted }}>El tiempo corre...</p>
            </header>

            <TimerDisplay
                seconds={timeLeft}
                initialSeconds={GAME_CONFIG.TURN_DURATION_SEC}
                onTimeUp={() => onFinish(false)}
                isActive={true}
            />

            <div className="flex flex-col gap-4 w-full">
                <PrimaryButton
                    variant="success"
                    onClick={() => onFinish(true)}
                    className="w-full"
                >
                    <Check size={24} /> ¡LO ADIVINARON!
                </PrimaryButton>

                <button
                    onClick={() => onFinish(false)}
                    className="bg-transparent border-none text-slate-500 hover:text-red-400 transition-colors cursor-pointer flex items-center justify-center gap-2 py-2"
                >
                    <X size={16} /> Me doy por vencido
                </button>
            </div>
        </motion.div>
    );
};
