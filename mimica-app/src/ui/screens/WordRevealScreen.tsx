import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { WordCard } from '../components/WordCard';
import { CATEGORIES, type Category } from '../../data/categories';

interface WordRevealScreenProps {
    roundWords: Record<Category, string>;
    targetCategory: Category;
    onStart: () => void;
}

export const WordRevealScreen: React.FC<WordRevealScreenProps> = ({
    roundWords,
    targetCategory,
    onStart
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6 py-6"
        >
            <header>
                <h2 style={{ fontSize: '1.75rem' }}>Tu Objetivo</h2>
                <p style={{ color: THEME.colors.textMuted }}>Solo debes actuar la categoría resaltada</p>
            </header>

            <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                    <WordCard
                        key={cat}
                        category={cat}
                        word={roundWords[cat]}
                        isTarget={cat === targetCategory}
                    />
                ))}
            </div>

            <div className="glass p-4 mt-2" style={{ borderColor: THEME.colors.primary, borderStyle: 'dashed' }}>
                <p style={{ fontSize: '0.875rem', margin: 0 }}>
                    Categoría a actuar: <strong style={{ color: THEME.colors.primary }}>{targetCategory.toUpperCase()}</strong>
                </p>
            </div>

            <PrimaryButton onClick={onStart}>
                ¡ESTOY LISTO!
            </PrimaryButton>
        </motion.div>
    );
};
