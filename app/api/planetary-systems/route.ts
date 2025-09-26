import fs from 'fs';
import path from 'path';

import { MergeResult, MergeStatistics, PlanetRecord, SystemRecord } from '@types';

import { randomFiveDigit, toTitleCase } from '@utils';

export const runtime = 'nodejs';

function createMergeKey(sector: string | null, region: string | null, grid: string | null): string {
    return [sector, region, grid]
        .map((val) => (val || 'NULL').toString().toUpperCase().trim())
        .join('|');
}

async function mergePlanetSystemData(
    planetsFilePath: string,
    systemsFilePath: string,
): Promise<MergeResult> {
    try {
        if (!fs.existsSync(planetsFilePath)) {
            throw new Error(`Planets file not found: ${planetsFilePath}`);
        }

        if (!fs.existsSync(systemsFilePath)) {
            throw new Error(`Systems file not found: ${systemsFilePath}`);
        }

        const XLSX = await import('xlsx');
        const planetsBuffer = fs.readFileSync(planetsFilePath);
        const systemsBuffer = fs.readFileSync(systemsFilePath);
        const planetsWorkbook = XLSX.read(planetsBuffer, { type: 'buffer' });
        const systemsWorkbook = XLSX.read(systemsBuffer, { type: 'buffer' });

        const planetsSheet = planetsWorkbook.Sheets[planetsWorkbook.SheetNames[0]];
        const systemsSheet = systemsWorkbook.Sheets[systemsWorkbook.SheetNames[0]];

        const planetsData: PlanetRecord[] = XLSX.utils.sheet_to_json(planetsSheet);
        const systemsData: SystemRecord[] = XLSX.utils.sheet_to_json(systemsSheet);

        console.log(`Processing ${planetsData.length} planets, ${systemsData.length} systems`);

        if (planetsData.length === 0) {
            throw new Error('Planets file is empty or invalid');
        }

        if (systemsData.length === 0) {
            throw new Error('Systems file is empty or invalid');
        }

        const planetsColumns = Object.keys(planetsData[0] || {});
        const systemsColumns = Object.keys(systemsData[0] || {});

        const requiredPlanetCols = ['Sector', 'Region', 'Grid'];
        const requiredSystemCols = ['Sector', 'Region', 'Grid', 'System'];

        const missingPlanetCols = requiredPlanetCols.filter((col) => !planetsColumns.includes(col));
        const missingSystemCols = requiredSystemCols.filter((col) => !systemsColumns.includes(col));

        if (missingPlanetCols.length > 0) {
            throw new Error(`Missing columns in planets file: ${missingPlanetCols.join(', ')}`);
        }

        if (missingSystemCols.length > 0) {
            throw new Error(`Missing columns in systems file: ${missingSystemCols.join(', ')}`);
        }

        const systemsMap = new Map<string, SystemRecord[]>();
        const planetsMap = new Map<string, PlanetRecord[]>();

        // Index systems by location
        systemsData.forEach((system) => {
            const mergeKey = createMergeKey(system.Sector, system.Region, system.Grid);
            if (!systemsMap.has(mergeKey)) {
                systemsMap.set(mergeKey, []);
            }
            systemsMap.get(mergeKey)!.push(system);
        });

        // Index planets by location
        planetsData.forEach((planet) => {
            const mergeKey = createMergeKey(planet.Sector, planet.Region, planet.Grid);
            if (!planet.technicalId) {
                planet.technicalId = randomFiveDigit();
            }
            if (!planetsMap.has(mergeKey)) {
                planetsMap.set(mergeKey, []);
            }
            planetsMap.get(mergeKey)!.push(planet);
        });

        const mergedData: PlanetRecord[] = [];

        // Step 1: Process all planets and add system data where available
        planetsData.forEach((planet) => {
            const mergeKey = createMergeKey(planet.Sector, planet.Region, planet.Grid);
            const matchingSystems = systemsMap.get(mergeKey) || [];

            mergedData.push({
                ...planet,
                System: matchingSystems.length > 0 ? matchingSystems[0].System : null,
            });
        });

        // Step 2: Add systems that don't have matching planets as new records
        systemsData.forEach((system) => {
            const mergeKey = createMergeKey(system.Sector, system.Region, system.Grid);
            const matchingPlanets = planetsMap.get(mergeKey) || [];

            if (matchingPlanets.length === 0) {
                // Create new record for system without matching planet
                const systemOnlyRecord: PlanetRecord = {
                    'Known Planet Name': null,
                    X: null,
                    Y: null,
                    RA: null,
                    Dec: null,
                    'Rand. Dist.': null,
                    Region: system.Region ? toTitleCase(system.Region) : null,
                    Sector: system.Sector ? toTitleCase(system.Sector) : null,
                    Grid: system.Grid ? system.Grid.toUpperCase() : null,
                    Link: null,
                    technicalId: randomFiveDigit(),
                    System: system.System,
                };

                mergedData.push(systemOnlyRecord);
            }
        });
        const uniqueRegions = [...new Set(mergedData.map((p) => p.Region))];
        const uniqueSystems = [...new Set(mergedData.map((p) => p.System))];

        const stats: MergeStatistics = {
            totalRecords: mergedData.length,
            originalPlanets: planetsData.length,
            originalSystems: systemsData.length,
            newSystemRecords: mergedData.length - planetsData.length,
            recordsWithSystemData: mergedData.filter((record) => record.System !== null).length,
            planetsWithoutSystems: mergedData.filter(
                (record) => record['Known Planet Name'] !== null && record.System === null,
            ).length,
            uniqueLocations: new Set([...planetsMap.keys(), ...systemsMap.keys()]).size,
            matchedLocations: Array.from(planetsMap.keys()).filter((key) => systemsMap.has(key))
                .length,
        };

        return {
            columns: Object.keys(mergedData[0] || {}),
            data: mergedData,
            statistics: stats,
            success: true,
            timestamp: new Date().toISOString(),
            uniqueRegions,
            uniqueSystems,
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Merge error:', errorMessage);

        return {
            columns: [],
            data: [],
            error: errorMessage,
            statistics: {} as MergeStatistics,
            success: false,
            timestamp: new Date().toISOString(),
            uniqueRegions: [],
            uniqueSystems: [],
        };
    }
}

export async function GET(request: Request): Promise<Response> {
    try {
        const { searchParams } = new URL(request.url);

        const dataDir = path.join(process.cwd(), 'data');
        const planetsPath = searchParams.get('planetsFile')
            ? path.join(dataDir, searchParams.get('planetsFile')!)
            : path.join(dataDir, 'planets.xlsx');
        const systemsPath = searchParams.get('systemsFile')
            ? path.join(dataDir, searchParams.get('systemsFile')!)
            : path.join(dataDir, 'systems.xlsx');

        const result = await mergePlanetSystemData(planetsPath, systemsPath);

        return Response.json(result, {
            status: result.success ? 200 : 400,
        });
    } catch (err) {
        if (err instanceof Error) {
            console.error('API Error:', err.message);
        } else {
            console.error(String(err));
        }

        return Response.json(
            {
                success: false,
                error: 'Internal server error',
                data: [],
                statistics: {} as MergeStatistics,
                columns: [],
                timestamp: new Date().toISOString(),
            },
            { status: 500 },
        );
    }
}
