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

export default function ObjectivesTracker() {
    const { playerData, updatePlayerData } = useGameData();
    const [newObjective, setNewObjective] = useState('');

    const addObjective = () => {
        if (newObjective.trim()) {
            updatePlayerData({
                objectives: [
                    ...playerData.objectives,
                    { id: Date.now(), name: newObjective.trim(), completed: false },
                ],
            });
            setNewObjective('');
        }
    };

    const toggleObjective = (id: number) => {
        updatePlayerData({
            objectives: playerData.objectives.map((obj: ObjectiveItem) =>
                obj.id === id ? { ...obj, completed: !obj.completed } : obj,
            ),
        });
    };

    const removeObjective = (id: number) => {
        updatePlayerData({
            objectives: playerData.objectives.filter((obj: ObjectiveItem) => obj.id !== id),
        });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="font-semibold mb-4 text-xl text-[var(--star-wars-yellow)]">
                Objectives Tracker
            </h2>
            <div className="space-y-2 mb-4 min-h-[120px] max-h-[250px] overflow-y-auto">
                {playerData.objectives.map((obj: ObjectiveItem) => (
                    <div
                        key={obj.id}
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors"
                    >
                        <input
                            type="checkbox"
                            checked={obj.completed}
                            onChange={() => toggleObjective(obj.id)}
                            className="w-4 h-4"
                        />
                        <span
                            className={`flex-1 ${obj.completed ? 'line-through text-white' : 'text-white'}`}
                        >
                            {obj.name}
                        </span>
                        <button
                            onClick={() => removeObjective(obj.id)}
                            className="text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                {playerData.objectives.length === 0 && (
                    <div className="text-white text-center py-4">No objectives yet</div>
                )}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addObjective()}
                    placeholder="Add objective..."
                    className="flex-1 px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded placeholder:text-white"
                />
                <button
                    onClick={addObjective}
                    disabled={!newObjective.trim()}
                    className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-600 ${!newObjective.trim() ? 'cursor-not-allowed' : ''}`}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
