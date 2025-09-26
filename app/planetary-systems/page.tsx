'use client';

import { useEffect, useMemo, useState } from 'react';

import { useMergedPlanetData } from '@hooks';

import { PlanetRecord } from '@types';

import GenerateStars from '../generate-stars';
import { StarfieldStyles } from '../page-styles';

export default function Systems() {
    const { data, error, loading, stats, uniqueRegions, uniqueSystems } = useMergedPlanetData();
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedSystem, setSelectedSystem] = useState<string>('');
    const regionOptions = useMemo(() => {
        if (!data) return [];
        return [...new Set(data.map((p) => p.Region).filter(Boolean))];
    }, [data]);

    const systemOptions = useMemo(() => {
        if (!data) return [];
        return [...new Set(data.map((p) => p.System).filter(Boolean))];
    }, [data]);
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
        // console.log(`data:`, data);
        console.log(`filteredData:`, filteredData);
        console.log(`selectedRegion:`, selectedRegion);
        console.log(`selectedSystem:`, selectedSystem);
        console.log(`regionOptions:`, regionOptions);
        console.log(`systemOptions:`, systemOptions);
        // console.log(`uniqueRegions:`, uniqueRegions);
        // console.log(`uniqueSystems:`, uniqueSystems);
    }, [
        data,
        filteredData,
        selectedRegion,
        selectedSystem,
        regionOptions,
        systemOptions,
        uniqueRegions,
        uniqueSystems,
    ]);

    return (
        <div>
            <StarfieldStyles>
                <GenerateStars />
            </StarfieldStyles>
            <h1 className="text-7xl">Star Systems of the Galaxy</h1>
            <div className="relative z-1 flex justify-center gap-8 m-12">
                <div className="flex flex-col">
                    <label htmlFor="regionInput" className="mb-2">
                        Filter Galaxy by Region
                    </label>
                    <select
                        id="regionInput"
                        name="regionInput"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">Select Region</option>
                        {regionOptions.map((region, index) => (
                            <option key={region || `region${index}`} value={region || ''}>
                                {region}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="systemInput" className="mb-2">
                        Filter Galaxy by System
                    </label>
                    <select
                        id="systemInput"
                        name="systemInput"
                        value={selectedSystem}
                        onChange={(e) => setSelectedSystem(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">Select System</option>
                        {systemOptions.map((system, index) => (
                            <option key={system || `system${index}`} value={system || ''}>
                                {system}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                        <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
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
                                        className="bg-blue-500 border-b border-blue-400"
                                    >
                                        <th
                                            scope="row"
                                            className="text-nowrap px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                                        >
                                            {planetaryData['Known Planet Name']}
                                        </th>
                                        <td className="text-nowrap px-6 py-4">
                                            {planetaryData.Sector}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            {planetaryData.Region}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            {planetaryData.System}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            {planetaryData.Grid}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            {planetaryData.X}, {planetaryData.Y}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            {planetaryData.RA} / {planetaryData.Dec} /
                                            {planetaryData['Rand. Dist.']}
                                        </td>
                                        <td className="text-nowrap px-6 py-4">
                                            <a
                                                href={planetaryData.Link || ''}
                                                className="font-medium text-white hover:underline"
                                            >
                                                {planetaryData.Link}
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
