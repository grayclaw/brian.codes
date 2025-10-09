'use client';

import { useEffect, useMemo, useState } from 'react';

import { useMergedPlanetData } from '@hooks';

import GenerateStars from '../generate-stars';
import { StarfieldStyles } from '../page-styles';
import './style.css';

export default function Systems() {
    const { data, error, loading, stats } = useMergedPlanetData();
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedSystem, setSelectedSystem] = useState<string>('');

    const regionOptions = useMemo(() => {
        if (!data) return [];

        const dataToUse = selectedSystem ? data.filter((p) => p.System === selectedSystem) : data;

        return [...new Set(dataToUse.map((p) => p.Region).filter(Boolean))];
    }, [data, selectedSystem]);

    const systemOptions = useMemo(() => {
        if (!data) return [];

        const dataToUse = selectedRegion ? data.filter((p) => p.Region === selectedRegion) : data;

        return [...new Set(dataToUse.map((p) => p.System).filter(Boolean))];
    }, [data, selectedRegion]);

    const filteredData = useMemo(() => {
        if (!data) return [];

        return data.filter((p) => {
            return (
                (!selectedRegion || p.Region === selectedRegion) &&
                (!selectedSystem || p.System === selectedSystem)
            );
        });
    }, [data, selectedRegion, selectedSystem]);

    useEffect(() => {
        if (selectedRegion && !regionOptions.includes(selectedRegion)) {
            setSelectedRegion('');
        }
    }, [selectedRegion, regionOptions]);

    useEffect(() => {
        if (selectedSystem && !systemOptions.includes(selectedSystem)) {
            setSelectedSystem('');
        }
    }, [selectedSystem, systemOptions]);

    const handleClearSelections = () => {
        setSelectedRegion('');
        setSelectedSystem('');
    };

    if (!data || loading) {
        return (
            <div>
                <StarfieldStyles>
                    <GenerateStars />
                </StarfieldStyles>
                <h1 className="text-7xl mb-20">Star Systems of the Galaxy</h1>
                <h2 className="loading">
                    loading <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <StarfieldStyles>
                    <GenerateStars />
                </StarfieldStyles>
                <h1 className="text-7xl mb-20">Star Systems of the Galaxy</h1>
                <h2 className="loading">We are having trouble loading your request</h2>
            </div>
        );
    }

    return (
        <div>
            <StarfieldStyles>
                <GenerateStars />
            </StarfieldStyles>
            <h1 className="text-7xl">Star Systems of the Galaxy</h1>
            <div>
                <h2 className="mt-12 mb-8 text-4xl">Galactic Planetary & System Statistics</h2>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-lg text-left rtl:text-right text-blue-100 dark:text-blue-100">
                        <thead className="text-md text-white uppercase bg-blue-700 dark:text-white">
                            <tr>
                                {stats?.planetsWithoutSystems && (
                                    <th scope="col" className="text-nowrap px-6 py-3">
                                        Planets Without Systems
                                    </th>
                                )}
                                {stats?.matchedLocations && (
                                    <th scope="col" className="px-6 py-3">
                                        Matched Locations
                                    </th>
                                )}
                                {stats?.newSystemRecords && (
                                    <th scope="col" className="px-6 py-3">
                                        New System Records
                                    </th>
                                )}
                                {stats?.originalPlanets && (
                                    <th scope="col" className="px-6 py-3">
                                        Original Planets
                                    </th>
                                )}
                                {stats?.originalSystems && (
                                    <th scope="col" className="px-6 py-3">
                                        Original Systems
                                    </th>
                                )}
                                {stats?.recordsWithSystemData && (
                                    <th scope="col" className="text-nowrap px-6 py-3">
                                        Records With System Data
                                    </th>
                                )}
                                {stats?.totalRecords && (
                                    <th scope="col" className="text-nowrap px-6 py-3">
                                        Total Records
                                    </th>
                                )}
                                {stats?.uniqueLocations && (
                                    <th scope="col" className="px-6 py-3">
                                        Unique Locations
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-blue-600 border-b border-blue-400">
                                {stats?.planetsWithoutSystems && (
                                    <td
                                        scope="row"
                                        className="text-nowrap px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                                    >
                                        {stats.planetsWithoutSystems}
                                    </td>
                                )}
                                {stats?.matchedLocations && (
                                    <td className="text-nowrap px-6 py-4">
                                        {stats?.matchedLocations}
                                    </td>
                                )}
                                {stats?.newSystemRecords && (
                                    <td className="text-nowrap px-6 py-4">
                                        {stats.newSystemRecords}
                                    </td>
                                )}
                                {stats?.originalPlanets && (
                                    <td className="text-nowrap px-6 py-4">
                                        {stats.originalPlanets}
                                    </td>
                                )}
                                {stats?.originalSystems && (
                                    <td className="text-nowrap px-6 py-4">
                                        {stats.originalSystems}
                                    </td>
                                )}
                                {stats?.recordsWithSystemData && (
                                    <td className="text-nowrap px-6 py-4">
                                        {stats.recordsWithSystemData}
                                    </td>
                                )}
                                {stats?.totalRecords && (
                                    <td className="text-nowrap px-6 py-4">{stats.totalRecords}</td>
                                )}
                                {stats?.uniqueLocations && (
                                    <td className="text-nowrap px-6 py-4">
                                        {stats.uniqueLocations}
                                    </td>
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="relative z-1 flex justify-center gap-10 m-12">
                <div className="flex flex-col w-1/6">
                    <label htmlFor="regionInput" className="mb-4 text-2xl">
                        Filter Galaxy by Region
                    </label>
                    <select
                        id="regionInput"
                        name="regionInput"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="p-3 border rounded bg-blue-600 text-lg h-12 cursor-pointer border-[var(--star-wars-yellow)]"
                    >
                        <option value="">Select Region</option>
                        {regionOptions.map((region, index) => (
                            <option key={region || `region${index}`} value={region || ''}>
                                {region}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col w-1/6">
                    <label htmlFor="systemInput" className="mb-4 text-2xl">
                        Filter Galaxy by System
                    </label>
                    <select
                        id="systemInput"
                        name="systemInput"
                        value={selectedSystem}
                        onChange={(e) => setSelectedSystem(e.target.value)}
                        className="p-3 border rounded bg-blue-600 text-lg h-12 cursor-pointer border-[var(--star-wars-yellow)]"
                    >
                        <option value="">Select System</option>
                        {systemOptions.map((system, index) => (
                            <option key={system || `system${index}`} value={system || ''}>
                                {system}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col justify-end w-1/6">
                    <button
                        className="p-2 border rounded bg-blue-600 text-lg h-12 border-[var(--star-wars-yellow)]"
                        onClick={handleClearSelections}
                    >
                        Clear Selection[s]
                    </button>
                </div>
            </div>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-md text-left rtl:text-right text-blue-100 dark:text-blue-100">
                        <thead className="text-md text-white uppercase bg-blue-700 dark:text-white">
                            <tr>
                                <th scope="col" className="text-nowrap px-6 py-3">
                                    Known Planet Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sector
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Region
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    System
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Grid
                                </th>
                                <th scope="col" className="text-nowrap px-6 py-3">
                                    Coruscant Coordinates System
                                </th>
                                <th scope="col" className="text-nowrap px-6 py-3">
                                    RA/Dec/Dist
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Wiki
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((planetaryData, index) => {
                                return (
                                    <tr
                                        key={`${planetaryData['Known Planet Name']}${planetaryData.Sector}${planetaryData.Region}${planetaryData.System}${index}`}
                                        className="bg-blue-600 border-b border-blue-400"
                                    >
                                        <td
                                            scope="row"
                                            className="text-nowrap px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                                        >
                                            {planetaryData['Known Planet Name'] || 'unavailable'}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            {planetaryData.Sector || 'unavailable'}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            {planetaryData.Region || 'unavailable'}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            {planetaryData.System || 'unavailable'}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            {planetaryData.Grid || 'unavailable'}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            {planetaryData.X &&
                                                planetaryData.Y &&
                                                `${planetaryData.X}, ${planetaryData.Y}`}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            {(planetaryData.RA &&
                                                planetaryData.Dec &&
                                                planetaryData['Rand. Dist.'] &&
                                                `${planetaryData.RA} / ${planetaryData.Dec} /
                                            ${planetaryData['Rand. Dist.']}`) ||
                                                'unavailable'}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            <a
                                                href={planetaryData.Link || ''}
                                                className="font-medium text-white hover:underline"
                                            >
                                                {planetaryData.Link || 'unavailable'}
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div></div>
        </div>
    );
}
