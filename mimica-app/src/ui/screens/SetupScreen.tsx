import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, X, Play } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { THEME } from '../../config/theme';

interface SetupScreenProps {
    onStart: (team1: string, team1Players: string[], team2: string, team2Players: string[]) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
    const [team1Name, setTeam1Name] = useState('Equipo Alpha');
    const [team2Name, setTeam2Name] = useState('Equipo Beta');
    const [team1Players, setTeam1Players] = useState<string[]>(['Jugador 1']);
    const [team2Players, setTeam2Players] = useState<string[]>(['Jugador 1']);

    const addPlayer = (team: 1 | 2) => {
        if (team === 1) setTeam1Players([...team1Players, `Jugador ${team1Players.length + 1}`]);
        else setTeam2Players([...team2Players, `Jugador ${team2Players.length + 1}`]);
    };

    const removePlayer = (team: 1 | 2, index: number) => {
        if (team === 1) setTeam1Players(team1Players.filter((_, i) => i !== index));
        else setTeam2Players(team2Players.filter((_, i) => i !== index));
    };

    const updatePlayer = (team: 1 | 2, index: number, name: string) => {
        if (team === 1) {
            const newPlayers = [...team1Players];
            newPlayers[index] = name;
            setTeam1Players(newPlayers);
        } else {
            const newPlayers = [...team2Players];
            newPlayers[index] = name;
            setTeam2Players(newPlayers);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-8 py-8"
        >
            <header>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Mímica Party</h1>
                <p style={{ color: THEME.colors.textMuted }}>Configura tus equipos</p>
            </header>

            <div className="flex flex-col gap-6">
                {[1, 2].map((teamNum) => {
                    const teamName = teamNum === 1 ? team1Name : team2Name;
                    const setTeamName = teamNum === 1 ? setTeam1Name : setTeam2Name;
                    const players = teamNum === 1 ? team1Players : team2Players;

                    return (
                        <div key={teamNum} className="glass p-6 text-left">
                            <div className="flex items-center gap-3 mb-4">
                                <Users size={24} color={teamNum === 1 ? THEME.colors.primary : THEME.colors.secondary} />
                                <input
                                    type="text"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    className="bg-transparent border-none text-xl font-bold focus:outline-none w-full"
                                    style={{ color: teamNum === 1 ? THEME.colors.primary : THEME.colors.secondary }}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <AnimatePresence>
                                    {players.map((player, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="flex items-center gap-2 bg-slate-700/50 rounded-lg p-2"
                                            style={{ background: 'rgba(255,255,255,0.05)' }}
                                        >
                                            <input
                                                type="text"
                                                value={player}
                                                onChange={(e) => updatePlayer(teamNum as 1 | 2, idx, e.target.value)}
                                                className="bg-transparent border-none text-slate-200 focus:outline-none w-full px-2"
                                            />
                                            {players.length > 1 && (
                                                <button
                                                    onClick={() => removePlayer(teamNum as 1 | 2, idx)}
                                                    className="p-1 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <button
                                onClick={() => addPlayer(teamNum as 1 | 2)}
                                className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                            >
                                <Plus size={16} /> Añadir Jugador
                            </button>
                        </div>
                    );
                })}
            </div>

            <PrimaryButton
                onClick={() => onStart(team1Name, team1Players, team2Name, team2Players)}
                className="mt-4"
            >
                <Play size={20} fill="currentColor" /> EMPEZAR JUEGO
            </PrimaryButton>
        </motion.div>
    );
};
