import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';

interface WordCardProps {
    category: string;
    word: string;
    isTarget?: boolean;
    isRevealed?: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({
    category,
    word,
    isTarget = false,
    isRevealed = true
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 mb-3 rounded-2xl flex flex-col items-center justify-center transition-all ${isTarget ? 'pulse' : ''}`}
            style={{
                backgroundColor: isTarget ? THEME.colors.primary + '20' : THEME.colors.surface,
                border: `2px solid ${isTarget ? THEME.colors.primary : 'rgba(255,255,255,0.05)'}`,
                minHeight: '80px',
                width: '100%'
            }}
        >
            <span style={{ fontSize: '0.75rem', color: THEME.colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {category}
            </span>
            <span style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: isTarget ? THEME.colors.primary : THEME.colors.text,
                marginTop: '4px'
            }}>
                {isRevealed ? word : "???"}
            </span>
        </motion.div>
    );
};
