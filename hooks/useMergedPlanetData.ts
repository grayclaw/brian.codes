'use client';

import { useEffect, useState } from 'react';

import { PlanetRecord } from '@types';

type Result = {
    columns: string[];
    data: PlanetRecord[];
    error: any;
    statistics: Statistics;
    success: boolean;
    timestamp: string;
    uniqueRegions: string[];
    uniqueSystems: string[];
};

type Statistics = {
    planetsWithoutSystems: number;
    matchedLocations: number;
    newSystemRecords: number;
    originalPlanets: number;
    originalSystems: number;
    recordsWithSystemData: number;
    totalRecords: number;
    uniqueLocations: number;
};

/**
 * Custom React hook to fetch and merge planet + system data from `/api/planets-systems`.
 *
 * @function useMergedPlanetData
 * @returns {Object} Hook state object
 * @returns {Array<Object>|null} return.data - The merged planet/system data from the API, or null if not yet loaded.
 * @returns {boolean} return.loading - Whether the request is currently loading.
 * @returns {string} return.error - Error message if the request failed, or empty string otherwise.
 * @returns {Object|null} return.stats - Statistics object returned by the API, or null if not yet loaded.
 *
 * @example
 * const { data, loading, error, stats } = useMergedPlanetData();
 *
 * if (loading) return <p>Loading...</p>;
 * if (error) return <p>Error: {error}</p>;
 * return <PlanetTable planets={data} stats={stats} />;
 */
export default function useMergedPlanetData() {
    const [data, setData] = useState<PlanetRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>('');
    const [stats, setStats] = useState<Statistics | null>(null);
    const [uniqueRegions, setUniquesRegions] = useState<string[] | []>([]);
    const [uniqueSystems, setUniquesSystems] = useState<string[] | []>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch('/api/planetary-systems');
                const result: Result = await response.json();

                if (result.success) {
                    console.log(`result:`, result);
                    setData(result.data);
                    setStats(result.statistics);
                    setUniquesRegions(result.uniqueRegions);
                    setUniquesSystems(result.uniqueSystems);
                } else {
                    setError(result.error);
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error(err.message);
                    setError(err.message);
                } else {
                    console.error(String(err));
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { data, loading, error, stats, uniqueRegions, uniqueSystems };
}
