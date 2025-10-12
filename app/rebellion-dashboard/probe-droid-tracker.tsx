'use client';

import { useState } from 'react';

import { useGameData } from '@hooks';

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

export default function ProbeDroidTracker() {
    const { playerData, updatePlayerData } = useGameData();
    const [newSystem, setNewSystem] = useState('');

    const addProbe = () => {
        if (newSystem.trim()) {
            updatePlayerData({
                probeDroids: [
                    ...playerData.probeDroids,
                    { id: Date.now(), system: newSystem.trim(), turn: playerData.currentTurn },
                ],
            });
            setNewSystem('');
        }
    };

    const removeProbe = (id: number) => {
        updatePlayerData({
            probeDroids: playerData.probeDroids.filter((probe: ProbeDroid) => probe.id !== id),
        });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="font-semibold mb-4 text-lg text-[var(--star-wars-yellow)]">
                Probe Droid Tracker
            </h2>
            <div className="space-y-1 mb-3 max-h-[150px] overflow-y-auto">
                {playerData.probeDroids.map((probe: ProbeDroid) => (
                    <div
                        key={probe.id}
                        className="flex items-center gap-2 p-1 rounded hover:bg-gray-700 text-sm"
                    >
                        <span className="flex-1 text-white">
                            {probe.system} <span className="text-white">(Turn {probe.turn})</span>
                        </span>
                        <button
                            onClick={() => removeProbe(probe.id)}
                            className="text-red-400 hover:text-red-300 px-1 text-xs"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                {playerData.probeDroids.length === 0 && (
                    <div className="text-white text-center py-2 text-sm">No probes deployed</div>
                )}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newSystem}
                    onChange={(e) => setNewSystem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addProbe()}
                    placeholder="System name..."
                    className="flex-1 px-2 py-1 bg-gray-900 text-white border border-gray-600 rounded text-sm placeholder:text-white"
                />
                <button
                    onClick={addProbe}
                    disabled={!newSystem.trim()}
                    className={`px-3 py-1 bg-blue-600 text-white font-semibold rounded hover:bg-blue-600 disabled:bg-gray-600 text-sm ${!newSystem.trim() ? 'cursor-not-allowed' : ''}`}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
