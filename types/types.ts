export type BreakpointType = {
    /** True when width is ≤ 640px */
    sm: boolean;
    /** True when width is ≤ 768px */
    md: boolean;
    /** True when width is ≤ 1024px */
    lg: boolean;
    /** True when width is ≥ 1025 */
    xl: boolean;
};

export type CharacterContextType = {
    allCharacters: CharacterType[];
    setCharacterNumber: (number: number) => void;
    characterNumber: number;
    currentCharacter: CharacterType;
    starShips: StarShipType[] | [];
    vehicles: VehicleType[] | [];
    species: SpeciesType[] | [];
    homeWorld: HomeWorldType[] | [];
};
export type CharacterType = {
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    index: number;
    mass: string;
    name: string;
    species: string[];
    starships: string[];
    vehicles: string[];
};

// Rebellion Game Tracker
export type GameTrackerContextType = {
    buildQueue: Queue[];
    combatTracker: string[];
    crawlGenerator: string;
    droidTracker: string[];
    holonetUpdates: string;
    leaderAssignment: KeyValueQueue[];
    log: string;
    missionPlan: Queue[];
    objectives: string[];
    planetControl: KeyValueQueue[];
    probabilityEstimator: number;
    tabs: string[];
    activeTab: string;
    setActiveTab: (string: string) => void;
    setBuildQueue: (queue: Queue[]) => void;
    setCombatTracker: (string: string[]) => void;
    setCrawlGenerator: (string: string) => void;
    setDroidTracker: (string: string[]) => void;
    setHolonetUpdates: (string: string) => void;
    setLeaderAssignment: (keyValueQueue: KeyValueQueue[]) => void;
    setLog: (string: string) => void;
    setMissionPlan: (queue: Queue[]) => void;
    setObjectives: (string: string[]) => void;
    setPlanetControl: (string: KeyValueQueue[]) => void;
    setProbabilityEstimator: (number: number) => void;
};

export type HomeWorldType = {
    name: string;
    gravity: string;
    terrain: string;
};

export type KeyValueQueue = {
    id: number;
    key: string;
    value: string;
    completed: boolean;
};

export type MergeResult = {
    success: boolean;
    data: PlanetRecord[];
    statistics: MergeStatistics;
    columns: string[];
    timestamp: string;
    error?: string;
    uniqueSystems: (string | null | undefined)[];
    uniqueRegions: (string | null)[];
};

export type MergeStatistics = {
    totalRecords: number;
    originalPlanets: number;
    originalSystems: number;
    newSystemRecords: number;
    recordsWithSystemData: number;
    planetsWithoutSystems: number;
    uniqueLocations: number;
    matchedLocations: number;
};

export type PlanetControlType = {
    planet: string;
    control: string;
};

export type PlanetRecord = {
    Dec: string | null;
    Grid: string | null;
    'Known Planet Name': string | null;
    Link: string | null;
    RA: string | null;
    'Rand. Dist.': number | null;
    Region: string | null;
    Sector: string | null;
    System?: string | null;
    X: number | null;
    Y: number | null;
    technicalId: string | number;
};

export type Queue = {
    id: number;
    text: string;
    completed: boolean;
};

export type SpeciesType = {
    name: string;
};

export type StarShipType = {
    name: string;
    model: string;
    manufacturer: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
};

export type SystemRecord = {
    System: string;
    Sector: string;
    Region: string;
    Grid: string;
};

export type VehicleType = {
    name: string;
    model: string;
    manufacturer: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    vehicle_class: string;
};

// export type ObjectivesTrackerType = {
//     objective: string;
// };

// export type BuildQueueType = {
//     buildQueue: string;
// };

// export type LeaderAssignmentType = {
//     leaderAssignment: string;
// };

// export type CombatTrackerType = {
//     combatTracker: string;
// };

// export type HolonetUpdatesType = {
//     updates: string;
// };

// export type CrawlGeneratorType = {
//     crawlGenerator: string;
// };

// export type TurnLogType = {
//     log: string;
// };

// export type MissionPlanningType = {
//     missionPlan: string;
// };

// export type ProbeDroidTrackerType = {
//     droidTracker: string[];
// };

// export type WinProbabilityEstimatorType = {
//     probabilityEstimator: string;
// };
