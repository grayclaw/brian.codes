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

export default function LeaderAssignmentBoard() {
    const { playerData, updatePlayerData } = useGameData();
    const [newLeader, setNewLeader] = useState('');
    const [newMission, setNewMission] = useState('');

    const addAssignment = () => {
        if (newLeader.trim() && newMission.trim()) {
            updatePlayerData({
                leaderAssignment: [
                    ...playerData.leaderAssignment,
                    {
                        id: Date.now(),
                        leader: newLeader.trim(),
                        mission: newMission.trim(),
                        completed: false,
                    },
                ],
            });
            setNewLeader('');
            setNewMission('');
        }
    };

    const toggleAssignment = (id: number) => {
        updatePlayerData({
            leaderAssignment: playerData.leaderAssignment.map((assign: LeaderAssignment) =>
                assign.id === id ? { ...assign, completed: !assign.completed } : assign,
            ),
        });
    };

    const removeAssignment = (id: number) => {
        updatePlayerData({
            leaderAssignment: playerData.leaderAssignment.filter(
                (assign: LeaderAssignment) => assign.id !== id,
            ),
        });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="font-semibold mb-4 text-xl text-[var(--star-wars-yellow)]">
                Leader Assignment
            </h2>
            <div className="space-y-2 mb-4 min-h-[120px] max-h-[250px] overflow-y-auto">
                {playerData.leaderAssignment.map((assign: LeaderAssignment) => (
                    <div
                        key={assign.id}
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
                    >
                        <input
                            type="checkbox"
                            checked={assign.completed}
                            onChange={() => toggleAssignment(assign.id)}
                            className="w-4 h-4"
                        />
                        <span
                            className={`flex-1 ${assign.completed ? 'line-through text-white' : 'text-white'}`}
                        >
                            <span className="text-blue-300 font-medium">{assign.leader}</span>:{' '}
                            {assign.mission}
                        </span>
                        <button
                            onClick={() => removeAssignment(assign.id)}
                            className="text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                {playerData.leaderAssignment.length === 0 && (
                    <div className="text-white text-center py-4">No assignments yet</div>
                )}
            </div>
            <div className="space-y-2">
                <input
                    type="text"
                    value={newLeader}
                    onChange={(e) => setNewLeader(e.target.value)}
                    placeholder="Leader (e.g., Han Solo)..."
                    className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded placeholder:text-white"
                />
                <input
                    type="text"
                    value={newMission}
                    onChange={(e) => setNewMission(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addAssignment()}
                    placeholder="Mission (e.g., Smuggling Run)..."
                    className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded placeholder:text-white"
                />
                <button
                    onClick={addAssignment}
                    disabled={!newLeader.trim() || !newMission.trim()}
                    className={`w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:text-white ${!newLeader.trim() || !newMission.trim() ? 'cursor-not-allowed' : ''}`}
                >
                    Add Assignment
                </button>
            </div>
        </div>
    );
}
