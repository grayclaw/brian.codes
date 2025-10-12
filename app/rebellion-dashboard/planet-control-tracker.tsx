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

export default function PlanetControlTracker() {
    const { playerData, updatePlayerData } = useGameData();
    const [newPlanet, setNewPlanet] = useState('');
    const [newController, setNewController] = useState<'Empire' | 'Rebel' | 'Neutral'>('Neutral');

    const addPlanet = () => {
        if (newPlanet.trim()) {
            updatePlayerData({
                planetControl: [
                    ...playerData.planetControl,
                    { id: Date.now(), planet: newPlanet.trim(), controller: newController },
                ],
            });
            setNewPlanet('');
            setNewController('Neutral');
        }
    };

    const updateController = (id: number, controller: 'Empire' | 'Rebel' | 'Neutral') => {
        updatePlayerData({
            planetControl: playerData.planetControl.map((pc: PlanetControl) =>
                pc.id === id ? { ...pc, controller } : pc,
            ),
        });
    };

    const removePlanet = (id: number) => {
        updatePlayerData({
            planetControl: playerData.planetControl.filter((pc: PlanetControl) => pc.id !== id),
        });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="font-semibold mb-4 text-xl text-[var(--star-wars-yellow)]">
                Planet Control
            </h2>
            <div className="space-y-2 mb-4 min-h-[120px] max-h-[250px] overflow-y-auto">
                {playerData.planetControl.map((pc: PlanetControl) => (
                    <div
                        key={pc.id}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
                    >
                        <span className="flex-1 text-white font-medium">{pc.planet}</span>
                        <select
                            value={pc.controller}
                            onChange={(e) => updateController(pc.id, e.target.value as any)}
                            className="px-2 py-1 bg-gray-900 text-white border border-gray-600 rounded text-sm"
                        >
                            <option value="Empire">Empire</option>
                            <option value="Rebel">Rebel</option>
                            <option value="Neutral">Neutral</option>
                        </select>
                        <button
                            onClick={() => removePlanet(pc.id)}
                            className="text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                {playerData.planetControl.length === 0 && (
                    <div className="text-white text-center py-4">No planets tracked</div>
                )}
            </div>
            <div className="space-y-2">
                <input
                    type="text"
                    value={newPlanet}
                    onChange={(e) => setNewPlanet(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addPlanet()}
                    placeholder="Planet name (e.g., Kashyyyk)..."
                    className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded placeholder:text-white"
                />
                <div className="flex gap-2">
                    <select
                        value={newController}
                        onChange={(e) => setNewController(e.target.value as any)}
                        className="flex-1 px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded"
                    >
                        <option value="Neutral">Neutral</option>
                        <option value="Empire">Empire</option>
                        <option value="Rebel">Rebel</option>
                    </select>
                    <button
                        onClick={addPlanet}
                        disabled={!newPlanet.trim()}
                        className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-600 ${!newPlanet.trim() ? 'cursor-not-allowed' : ''}`}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
