import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useGameData } from '@hooks';

import LeaderAssignmentBoard from './leader-assignment-board';
import ObjectivesTracker from './objectives-tracker';
import PlanetControlTracker from './planet-control-tracker';
import ProbeDroidTracker from './probe-droid-tracker';
import TabWarningModal from './tab-warning-modal';
import TurnLogJournal from './turn-log-journal';

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

export default function Dashboard() {
    const {
        activePlayer,
        handlePlayerChange,
        clearAllData,
        showTabWarning,
        pendingPlayer,
        confirmPlayerChange,
        cancelPlayerChange,
        playerData,
        updatePlayerData,
    } = useGameData();
    const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <TabWarningModal
                show={showTabWarning}
                playerName={pendingPlayer}
                onConfirm={confirmPlayerChange}
                onCancel={cancelPlayerChange}
            />

            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-[var(--star-wars-yellow)]">
                        Star Wars: Rebellion Dashboard
                    </h1>
                    <button
                        onClick={clearAllData}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                    >
                        End Game & Clear Data
                    </button>
                </div>

                <div className="flex border-b border-gray-700 mb-6">
                    {players.map((player) => (
                        <button
                            key={player}
                            onClick={() => handlePlayerChange(player)}
                            className={`px-6 py-3 -mb-px border-b-2 transition-colors ${
                                activePlayer === player
                                    ? 'border-[var(--star-wars-yellow)] text-[var(--star-wars-yellow)]'
                                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                            }`}
                        >
                            {player}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <ObjectivesTracker />
                    <LeaderAssignmentBoard />
                    <PlanetControlTracker />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="md:col-span-2 bg-gray-800 p-4 rounded-lg">
                        <h2 className="font-semibold mb-3 text-lg text-[var(--star-wars-yellow)]">
                            Mission Planning
                        </h2>
                        <textarea
                            value={playerData.missionPlanning}
                            onChange={(e) => updatePlayerData({ missionPlanning: e.target.value })}
                            placeholder="Plan your missions here..."
                            rows={12}
                            className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
                        />
                    </div>
                    <div className="space-y-4">
                        <ProbeDroidTracker />
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h2 className="font-semibold mb-3 text-lg text-[var(--star-wars-yellow)]">
                                Reputation Track
                            </h2>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="14"
                                    value={playerData.reputationTrack}
                                    onChange={(e) =>
                                        updatePlayerData({
                                            reputationTrack: parseInt(e.target.value),
                                        })
                                    }
                                    className="flex-1"
                                />
                                <span className="text-2xl font-bold text-[var(--star-wars-yellow)] w-12 text-center">
                                    {playerData.reputationTrack}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h2 className="font-semibold mb-3 text-lg text-[var(--star-wars-yellow)]">
                            Intro Crawl Generator
                        </h2>
                        <textarea
                            value={playerData.introCrawl}
                            onChange={(e) => updatePlayerData({ introCrawl: e.target.value })}
                            placeholder="Write your opening crawl..."
                            rows={8}
                            className="w-full p-3 bg-gray-900 text-white border border-gray-600 rounded"
                        />
                    </div>
                    <TurnLogJournal />
                </div>
            </div>
        </div>
    );
}
