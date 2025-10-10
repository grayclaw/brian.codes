'use client';

import { useContext } from 'react';

import { GameContext } from '@providers';

export default function useGameData() {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGameData must be used within GameProvider');
    return context;
}
