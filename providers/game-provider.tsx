'use client';

import {
    ReactElement,
    SetStateAction,
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { FIRST_PLAYER, FOURTH_PLAYER, SECOND_PLAYER, THIRD_PLAYER } from '@constants';

import { GameTrackerContextType, KeyValueQueue, Queue } from '@types';

export const GameTrackerProviderContext = createContext<GameTrackerContextType | null>(null);

interface ProviderProps {
    children: ReactElement | ReactElement[];
}

function deepMerge<T>(target: T, source: Partial<T>): T {
    if (Array.isArray(target) && Array.isArray(source)) {
        return [...target, ...source] as T;
    }

    if (
        typeof target === 'object' &&
        target !== null &&
        typeof source === 'object' &&
        source !== null &&
        !Array.isArray(target) &&
        !Array.isArray(source)
    ) {
        const result: any = { ...target };
        for (const key of Object.keys(source) as (keyof T)[]) {
            if (key in target) {
                result[key] = deepMerge((target as any)[key], (source as any)[key]);
            } else {
                result[key] = source[key];
            }
        }
        return result as T;
    }

    return source as T;
}

export function usePersistentState<T>(
    key: string,
    defaultValue: T,
    tab: string,
): [T, (update: SetStateAction<T>) => void] {
    const [state, setState] = useState<T>(() => {
        if (typeof window === 'undefined') return defaultValue;
        const stored = localStorage?.getItem(key);
        if (!stored) return defaultValue;

        try {
            const parsedData = JSON.parse(stored);
            return parsedData[tab] !== undefined ? (parsedData[tab] as T) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    const updateState = useCallback((update: SetStateAction<T>) => {
        setState((prev) => {
            let newState: T;
            if (typeof update === 'function') {
                newState = (update as (prev: T) => T)(prev);
            } else {
                newState = update;
            }
            return newState;
        });
    }, []);

    useEffect(() => {
        try {
            const stored = localStorage?.getItem(key);
            let existingData = {};

            if (stored) {
                try {
                    existingData = JSON.parse(stored);
                } catch {
                    existingData = {};
                }
            }

            const updatedData = { ...existingData, [tab]: state };
            localStorage.setItem(key, JSON.stringify(updatedData));
        } catch {}
    }, [key, state, tab]);

    return [state, updateState];
}

// Alternative version with merge capability
export function usePersistentStateWithMerge<T>(
    key: string,
    defaultValue: T,
    tab: string,
): [T, (update: SetStateAction<T> | Partial<T>) => void] {
    const [state, setState] = useState<T>(() => {
        if (typeof window === 'undefined') return defaultValue;
        const stored = localStorage?.getItem(key);
        if (!stored) return defaultValue;

        try {
            const parsedData = JSON.parse(stored);
            return parsedData[tab] !== undefined ? (parsedData[tab] as T) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    const mergeOrSet = useCallback((update: SetStateAction<T> | Partial<T>) => {
        setState((prev) => {
            let newState: T;
            if (typeof update === 'function') {
                // Functional update
                newState = (update as (prev: T) => T)(prev);
            } else if (
                typeof update === 'object' &&
                update !== null &&
                typeof prev === 'object' &&
                prev !== null
            ) {
                // Try to merge if both are objects/arrays
                newState = deepMerge(prev, update as Partial<T>);
            } else {
                // Replace
                newState = update as T;
            }
            return newState;
        });
    }, []);

    useEffect(() => {
        try {
            const stored = localStorage?.getItem(key);
            let existingData = {};

            if (stored) {
                try {
                    existingData = JSON.parse(stored);
                } catch {
                    existingData = {};
                }
            }

            const updatedData = { ...existingData, [tab]: state };
            localStorage.setItem(key, JSON.stringify(updatedData));
        } catch {}
    }, [key, state, tab]);

    return [state, mergeOrSet];
}

const tabs = [FIRST_PLAYER, SECOND_PLAYER, THIRD_PLAYER, FOURTH_PLAYER];

export default function GameProvider({ children }: ProviderProps) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
    const [buildQueue, setBuildQueue] = usePersistentState<Queue[]>('buildQueue', [], activeTab);
    const [combatTracker, setCombatTracker] = usePersistentState<string[]>(
        'combatTracker',
        [],
        activeTab,
    );
    const [crawlGenerator, setCrawlGenerator] = usePersistentState<string>(
        'crawlGenerator',
        '',
        activeTab,
    );
    const [droidTracker, setDroidTracker] = usePersistentState<string[]>(
        'droidTracker',
        [],
        activeTab,
    );
    const [holonetUpdates, setHolonetUpdates] = usePersistentState<string>(
        'holonetUpdates',
        '',
        activeTab,
    );
    const [leaderAssignment, setLeaderAssignment] = usePersistentStateWithMerge<KeyValueQueue[]>(
        'leaderAssignment',
        [],
        activeTab,
    );
    const [log, setLog] = usePersistentState<string>('log', '', activeTab);
    const [missionPlan, setMissionPlan] = usePersistentState<Queue[]>(
        'missionPlan',
        [],
        activeTab,
    );
    const [objectives, setObjectives] = usePersistentState<string[]>('objectives', [], activeTab);
    const [planetControl, setPlanetControl] = usePersistentState<KeyValueQueue[]>(
        'planetControl',
        [],
        activeTab,
    );
    const [probabilityEstimator, setProbabilityEstimator] = usePersistentState<number>(
        'probabilityEstimator',
        0,
        activeTab,
    );

    const contextValue = useMemo(
        () => ({
            buildQueue,
            combatTracker,
            crawlGenerator,
            droidTracker,
            holonetUpdates,
            leaderAssignment,
            log,
            missionPlan,
            objectives,
            planetControl,
            probabilityEstimator,
            setBuildQueue,
            setCombatTracker,
            setCrawlGenerator,
            setDroidTracker,
            setHolonetUpdates,
            setLeaderAssignment,
            setLog,
            setMissionPlan,
            setObjectives,
            setPlanetControl,
            setProbabilityEstimator,
            tabs,
            activeTab,
            setActiveTab,
        }),
        [
            buildQueue,
            combatTracker,
            crawlGenerator,
            droidTracker,
            holonetUpdates,
            leaderAssignment,
            log,
            missionPlan,
            objectives,
            planetControl,
            probabilityEstimator,
            activeTab,
        ],
    );
    console.log(`missionPlan:`, missionPlan);

    return (
        <GameTrackerProviderContext.Provider value={contextValue}>
            {children}
        </GameTrackerProviderContext.Provider>
    );
}
