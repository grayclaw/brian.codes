'use client';

import { createContext, useCallback, useEffect, useState } from 'react';

// Types
type ObjectiveItem = {
    id: number;
    name: string;
    completed: boolean;
};

type LeaderAssignment = {
    id: number;
    leader: string;
    mission: string;
    completed: boolean;
};

type PlanetControl = {
    id: number;
    planet: string;
    controller: 'Empire' | 'Rebel' | 'Neutral';
    notes?: string;
};

type ProbeDroid = {
    id: number;
    system: string;
    turn: number;
};

type TurnLogEntry = {
    id: number;
    turn: number;
    entry: string;
    timestamp: Date;
};

type PlayerData = {
    objectives: ObjectiveItem[];
    leaderAssignment: LeaderAssignment[];
    planetControl: PlanetControl[];
    missionPlanning: string;
    introCrawl: string;
    turnLog: TurnLogEntry[];
    probeDroids: ProbeDroid[];
    reputationTrack: number;
    currentTurn: number;
};

type GameData = {
    [key: string]: PlayerData;
};

// Default player data
const defaultPlayerData: PlayerData = {
    objectives: [],
    leaderAssignment: [],
    planetControl: [],
    missionPlanning: '',
    introCrawl: '',
    turnLog: [],
    probeDroids: [],
    reputationTrack: 0,
    currentTurn: 1,
};

// Context
export const GameContext = createContext<any>(null);

// Storage helper
const STORAGE_KEY = 'sw-rebellion-game-data';

function loadGameData(): GameData {
    try {
        const stored = window.localStorage?.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

function saveGameData(data: GameData) {
    try {
        window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save game data:', e);
    }
}

// Game Provider
export default function GameProvider({ children }: { children: React.ReactNode }) {
    const [activePlayer, setActivePlayer] = useState('Player 1');
    const [gameData, setGameData] = useState<GameData>(() => loadGameData());
    const [showTabWarning, setShowTabWarning] = useState(false);
    const [pendingPlayer, setPendingPlayer] = useState<string | null>(null);

    const playerData = gameData[activePlayer] || defaultPlayerData;

    useEffect(() => {
        saveGameData(gameData);
    }, [gameData]);

    const updatePlayerData = useCallback(
        (updates: Partial<PlayerData>) => {
            setGameData((prev) => ({
                ...prev,
                [activePlayer]: { ...playerData, ...updates },
            }));
        },
        [activePlayer, playerData],
    );

    const handlePlayerChange = (newPlayer: string) => {
        if (newPlayer !== activePlayer) {
            setPendingPlayer(newPlayer);
            setShowTabWarning(true);
        }
    };

    const confirmPlayerChange = () => {
        if (pendingPlayer) {
            setActivePlayer(pendingPlayer);
            setPendingPlayer(null);
        }
        setShowTabWarning(false);
    };

    const cancelPlayerChange = () => {
        setPendingPlayer(null);
        setShowTabWarning(false);
    };

    const clearAllData = () => {
        if (
            window.confirm(
                'Are you sure you want to end the game and clear all data? This cannot be undone.',
            )
        ) {
            setGameData({});
            window.localStorage?.removeItem(STORAGE_KEY);
        }
    };

    const value = {
        activePlayer,
        playerData,
        updatePlayerData,
        handlePlayerChange,
        clearAllData,
        showTabWarning,
        pendingPlayer,
        confirmPlayerChange,
        cancelPlayerChange,
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
