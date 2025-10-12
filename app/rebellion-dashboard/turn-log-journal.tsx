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

export default function TurnLogJournal() {
    const { playerData, updatePlayerData } = useGameData();
    const [newEntry, setNewEntry] = useState('');

    const addEntry = () => {
        if (newEntry.trim()) {
            updatePlayerData({
                turnLog: [
                    ...playerData.turnLog,
                    {
                        id: Date.now(),
                        turn: playerData.currentTurn,
                        entry: newEntry.trim(),
                        timestamp: new Date(),
                    },
                ],
            });
            setNewEntry('');
        }
    };

    const removeEntry = (id: number) => {
        updatePlayerData({
            turnLog: playerData.turnLog.filter((log: TurnLogEntry) => log.id !== id),
        });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg h-full">
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg text-[var(--star-wars-yellow)]">Turn Log</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-white">Turn:</span>
                    <input
                        type="number"
                        min="1"
                        value={playerData.currentTurn}
                        onChange={(e) =>
                            updatePlayerData({ currentTurn: parseInt(e.target.value) || 1 })
                        }
                        className="w-16 px-2 py-1 bg-gray-900 text-white border border-gray-600 rounded text-sm"
                    />
                </div>
            </div>
            <div className="space-y-2 mb-3 max-h-[200px] overflow-y-auto">
                {playerData.turnLog.map((log: TurnLogEntry) => (
                    <div key={log.id} className="p-2 bg-gray-900 rounded text-sm">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-white font-medium">Turn {log.turn}</span>
                            <button
                                onClick={() => removeEntry(log.id)}
                                className="text-red-400 hover:text-red-300 text-xs"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="text-gray-200">{log.entry}</p>
                    </div>
                ))}
                {playerData.turnLog.length === 0 && (
                    <div className="text-white text-center py-4 text-sm">No log entries</div>
                )}
            </div>
            <div className="space-y-2">
                <textarea
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="Record turn events..."
                    rows={3}
                    className="w-full px-2 py-2 bg-gray-900 text-white border border-gray-600 rounded text-sm placeholder:text-white"
                />
                <button
                    onClick={addEntry}
                    disabled={!newEntry.trim()}
                    className={`w-full px-3 py-1 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-600 text-sm ${!newEntry.trim() ? 'cursor-not-allowed' : ''}`}
                >
                    Add Entry
                </button>
            </div>
        </div>
    );
}
