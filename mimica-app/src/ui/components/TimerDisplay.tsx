import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { THEME } from '../../config/theme';
import { formatTime } from '../../utils/formatters';

interface TimerDisplayProps {
    seconds: number;
    initialSeconds: number;
    onTimeUp: () => void;
    isActive: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
    seconds,
    initialSeconds,
    onTimeUp,
    isActive
}) => {
    const controls = useAnimation();
    const percentage = (seconds / initialSeconds) * 100;

    useEffect(() => {
        if (seconds <= 10 && isActive) {
            controls.start({
                scale: [1, 1.1, 1],
                transition: { duration: 0.5, repeat: Infinity }
            });
        } else {
            controls.stop();
        }
    }, [seconds, isActive, controls]);

    return (
        <div className="relative flex items-center justify-center my-8">
            <svg width="200" height="200" viewBox="0 0 100 100">
                <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke={THEME.colors.surface}
                    strokeWidth="8"
                />
                <motion.circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke={seconds <= 10 ? THEME.colors.danger : THEME.colors.primary}
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * percentage) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <motion.div
                animate={controls}
                className="absolute flex flex-col items-center"
            >
                <span style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: seconds <= 10 ? THEME.colors.danger : THEME.colors.text
                }}>
                    {seconds}
                </span>
                <span style={{ fontSize: '0.875rem', color: THEME.colors.textMuted }}>
                    SEGUNDOS
                </span>
            </motion.div>
        </div>
    );
};
