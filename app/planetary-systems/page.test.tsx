import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useMergedPlanetData } from '@hooks';

import Systems from './page';

// Mock the custom hook
jest.mock('@hooks', () => ({
    useMergedPlanetData: jest.fn(),
}));

// Mock the child components
jest.mock('../generate-stars', () => ({
    __esModule: true,
    default: () => <div data-testid="generate-stars">Stars</div>,
}));

jest.mock('../page-styles', () => ({
    StarfieldStyles: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="starfield-styles">{children}</div>
    ),
}));

const mockUseMergedPlanetData = useMergedPlanetData as jest.MockedFunction<
    typeof useMergedPlanetData
>;

const mockData = [
    {
        Dec: '-45.2',
        Grid: 'R-16',
        'Known Planet Name': 'Tatooine',
        Link: 'https://starwars.fandom.com/wiki/Tatooine',
        RA: '12.5',
        'Rand. Dist.': 50000,
        Region: 'Outer Rim Territories',
        Sector: 'Arkanis',
        System: 'Tatoo',
        X: 100,
        Y: 200,
        technicalId: 123,
    },
    {
        Dec: '0',
        Grid: 'L-9',
        'Known Planet Name': 'Coruscant',
        Link: 'https://starwars.fandom.com/wiki/Coruscant',
        RA: '0',
        'Rand. Dist.': 0,
        Region: 'Core Worlds',
        Sector: 'Corusca',
        System: 'Coruscant',
        X: 0,
        Y: 0,
        technicalId: 123,
    },
    {
        Dec: '10.5',
        Grid: 'M-10',
        'Known Planet Name': 'Alderaan',
        Link: 'https://starwars.fandom.com/wiki/Alderaan',
        RA: '5.2',
        'Rand. Dist.': 2000,
        Region: 'Core Worlds',
        Sector: 'Alderaan',
        System: 'Alderaan',
        X: 50,
        Y: 50,
        technicalId: 123,
    },
    {
        Dec: '-60.1',
        Grid: 'K-18',
        'Known Planet Name': 'Hoth',
        Link: 'https://starwars.fandom.com/wiki/Hoth',
        RA: '18.3',
        'Rand. Dist.': 60000,
        Region: 'Outer Rim Territories',
        Sector: 'Anoat',
        System: 'Hoth',
        X: 150,
        Y: 250,
        technicalId: 123,
    },
];

const mockStats = {
    planetsWithoutSystems: 5,
    matchedLocations: 100,
    newSystemRecords: 20,
    originalPlanets: 150,
    originalSystems: 80,
    recordsWithSystemData: 145,
    totalRecords: 150,
    uniqueLocations: 120,
};

describe('Systems Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Loading State', () => {
        it('should render loading state when loading is true', () => {
            mockUseMergedPlanetData.mockReturnValue({
                data: [],
                error: null,
                loading: true,
                stats: null,
                uniqueRegions: [],
                uniqueSystems: [],
            });

            render(<Systems />);

            expect(screen.getByText('Star Systems of the Galaxy')).toBeInTheDocument();
            expect(screen.getByText(/loading/i)).toBeInTheDocument();
            expect(screen.getByTestId('generate-stars')).toBeInTheDocument();
        });

        it('should render loading state when data array is empty', () => {
            mockUseMergedPlanetData.mockReturnValue({
                data: [],
                error: null,
                loading: false,
                stats: null,
                uniqueRegions: [],
                uniqueSystems: [],
            });

            render(<Systems />);

            expect(screen.getByText(/loading/i)).toBeInTheDocument();
        });
    });

    describe('Error State', () => {
        it('should render error message when error occurs', () => {
            mockUseMergedPlanetData.mockReturnValue({
                data: [],
                error: new Error('Failed to fetch'),
                loading: false,
                stats: null,
                uniqueRegions: [],
                uniqueSystems: [],
            });

            render(<Systems />);

            expect(screen.getByText('Star Systems of the Galaxy')).toBeInTheDocument();
            expect(
                screen.getByText('We are having trouble loading your request'),
            ).toBeInTheDocument();
        });
    });

    describe('Data Rendering', () => {
        beforeEach(() => {
            mockUseMergedPlanetData.mockReturnValue({
                data: mockData,
                error: null,
                loading: false,
                stats: mockStats,
                uniqueRegions: ['Outer Rim Territories', 'Core Worlds'],
                uniqueSystems: ['Tatoo', 'Coruscant', 'Alderaan', 'Hoth'],
            });
        });

        it('should render the main heading', () => {
            render(<Systems />);

            expect(screen.getByText('Star Systems of the Galaxy')).toBeInTheDocument();
        });

        it('should render statistics table with correct data', () => {
            render(<Systems />);

            expect(screen.getByText('Galactic Planetary & System Statistics')).toBeInTheDocument();
            expect(screen.getByText('5')).toBeInTheDocument(); // planetsWithoutSystems
            expect(screen.getByText('100')).toBeInTheDocument(); // matchedLocations
            expect(screen.getByText('150')).toBeInTheDocument(); // totalRecords
        });

        it('should render all planet data in the table', () => {
            render(<Systems />);

            expect(screen.getByText('Tatooine')).toBeInTheDocument();
            expect(screen.getByText('Coruscant')).toBeInTheDocument();
            expect(screen.getByText('Alderaan')).toBeInTheDocument();
            expect(screen.getByText('Hoth')).toBeInTheDocument();
        });

        it('should render table headers correctly', () => {
            render(<Systems />);

            expect(screen.getByText('Known Planet Name')).toBeInTheDocument();
            expect(screen.getByText('Sector')).toBeInTheDocument();
            expect(screen.getByText('Region')).toBeInTheDocument();
            expect(screen.getByText('System')).toBeInTheDocument();
            expect(screen.getByText('Grid')).toBeInTheDocument();
        });

        it('should render planet links correctly', () => {
            render(<Systems />);

            const links = screen.getAllByRole('link');
            expect(links.length).toBeGreaterThan(0);
            expect(links[0]).toHaveAttribute('href', 'https://starwars.fandom.com/wiki/Tatooine');
        });
    });

    describe('Filter Functionality', () => {
        beforeEach(() => {
            mockUseMergedPlanetData.mockReturnValue({
                data: mockData,
                error: null,
                loading: false,
                stats: mockStats,
                uniqueRegions: ['Outer Rim Territories', 'Core Worlds'],
                uniqueSystems: ['Tatoo', 'Coruscant', 'Alderaan', 'Hoth'],
            });
        });

        it('should render region and system filter dropdowns', () => {
            render(<Systems />);

            expect(screen.getByLabelText('Filter Galaxy by Region')).toBeInTheDocument();
            expect(screen.getByLabelText('Filter Galaxy by System')).toBeInTheDocument();
        });

        it('should populate region dropdown with unique regions', () => {
            render(<Systems />);

            const regionSelect = screen.getByLabelText('Filter Galaxy by Region');
            const options = within(regionSelect).getAllByRole('option');

            // Should have "Select Region" + 2 unique regions
            expect(options).toHaveLength(3);
            expect(options[0]).toHaveTextContent('Select Region');
            expect(options[1]).toHaveTextContent('Outer Rim Territories');
            expect(options[2]).toHaveTextContent('Core Worlds');
        });

        it('should populate system dropdown with unique systems', () => {
            render(<Systems />);

            const systemSelect = screen.getByLabelText('Filter Galaxy by System');
            const options = within(systemSelect).getAllByRole('option');

            // Should have "Select System" + 4 unique systems
            expect(options).toHaveLength(5);
            expect(options[0]).toHaveTextContent('Select System');
        });

        it('should filter data when region is selected', async () => {
            const user = userEvent.setup();
            render(<Systems />);

            const regionSelect = screen.getByLabelText('Filter Galaxy by Region');
            await user.selectOptions(regionSelect, 'Core Worlds');

            await waitFor(() => {
                expect(screen.getByText('Coruscant')).toBeInTheDocument();
                expect(screen.getByText('Alderaan')).toBeInTheDocument();
                expect(screen.queryByText('Tatooine')).not.toBeInTheDocument();
                expect(screen.queryByText('Hoth')).not.toBeInTheDocument();
            });
        });

        it('should filter data when system is selected', async () => {
            const user = userEvent.setup();
            render(<Systems />);

            const systemSelect = screen.getByLabelText('Filter Galaxy by System');
            await user.selectOptions(systemSelect, 'Tatoo');

            await waitFor(() => {
                expect(screen.getByText('Tatooine')).toBeInTheDocument();
                expect(screen.queryByText('Coruscant')).not.toBeInTheDocument();
                expect(screen.queryByText('Alderaan')).not.toBeInTheDocument();
            });
        });

        it('should update system options when region is selected', async () => {
            const user = userEvent.setup();
            render(<Systems />);

            const regionSelect = screen.getByLabelText('Filter Galaxy by Region');
            await user.selectOptions(regionSelect, 'Core Worlds');

            await waitFor(() => {
                const systemSelect = screen.getByLabelText('Filter Galaxy by System');
                const options = within(systemSelect).getAllByRole('option');

                // Should only show systems in Core Worlds
                const systemNames = options.map((opt) => opt.textContent);
                expect(systemNames).toContain('Coruscant');
                expect(systemNames).toContain('Alderaan');
                expect(systemNames).not.toContain('Tatoo');
                expect(systemNames).not.toContain('Hoth');
            });
        });

        it('should update region options when system is selected', async () => {
            const user = userEvent.setup();
            render(<Systems />);

            const systemSelect = screen.getByLabelText('Filter Galaxy by System');
            await user.selectOptions(systemSelect, 'Tatoo');

            await waitFor(() => {
                const regionSelect = screen.getByLabelText('Filter Galaxy by Region');
                const options = within(regionSelect).getAllByRole('option');

                // Should only show Outer Rim Territories
                const regionNames = options.map((opt) => opt.textContent);
                expect(regionNames).toContain('Outer Rim Territories');
                expect(regionNames).not.toContain('Core Worlds');
            });
        });

        it('should apply both filters simultaneously', async () => {
            const user = userEvent.setup();
            render(<Systems />);

            const regionSelect = screen.getByLabelText('Filter Galaxy by Region');
            const systemSelect = screen.getByLabelText('Filter Galaxy by System');

            await user.selectOptions(regionSelect, 'Outer Rim Territories');
            await user.selectOptions(systemSelect, 'Tatoo');

            await waitFor(() => {
                expect(screen.getByText('Tatooine')).toBeInTheDocument();
                expect(screen.queryByText('Hoth')).not.toBeInTheDocument();
                expect(screen.queryByText('Coruscant')).not.toBeInTheDocument();
            });
        });
    });

    describe('Clear Selections', () => {
        beforeEach(() => {
            mockUseMergedPlanetData.mockReturnValue({
                data: mockData,
                error: null,
                loading: false,
                stats: mockStats,
                uniqueRegions: ['Outer Rim Territories', 'Core Worlds'],
                uniqueSystems: ['Tatoo', 'Coruscant', 'Alderaan', 'Hoth'],
            });
        });

        it('should render clear button', () => {
            render(<Systems />);

            expect(screen.getByRole('button', { name: /clear selection/i })).toBeInTheDocument();
        });

        it('should clear all selections when clear button is clicked', async () => {
            const user = userEvent.setup();
            render(<Systems />);

            const regionSelect = screen.getByLabelText(
                'Filter Galaxy by Region',
            ) as HTMLSelectElement;
            const systemSelect = screen.getByLabelText(
                'Filter Galaxy by System',
            ) as HTMLSelectElement;

            // Select both filters
            await user.selectOptions(regionSelect, 'Core Worlds');
            await user.selectOptions(systemSelect, 'Coruscant');

            expect(regionSelect.value).toBe('Core Worlds');
            expect(systemSelect.value).toBe('Coruscant');

            // Click clear button
            const clearButton = screen.getByRole('button', { name: /clear selection/i });
            await user.click(clearButton);

            await waitFor(() => {
                expect(regionSelect.value).toBe('');
                expect(systemSelect.value).toBe('');
            });
        });

        it('should show all data after clearing selections', async () => {
            const user = userEvent.setup();
            render(<Systems />);

            // Apply filter
            const regionSelect = screen.getByLabelText('Filter Galaxy by Region');
            await user.selectOptions(regionSelect, 'Core Worlds');

            // Verify filtered
            await waitFor(() => {
                expect(screen.queryByText('Tatooine')).not.toBeInTheDocument();
            });

            // Clear selections
            const clearButton = screen.getByRole('button', { name: /clear selection/i });
            await user.click(clearButton);

            // Verify all data is shown
            await waitFor(() => {
                expect(screen.getByText('Tatooine')).toBeInTheDocument();
                expect(screen.getByText('Coruscant')).toBeInTheDocument();
                expect(screen.getByText('Alderaan')).toBeInTheDocument();
                expect(screen.getByText('Hoth')).toBeInTheDocument();
            });
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty data array', () => {
            mockUseMergedPlanetData.mockReturnValue({
                data: [],
                error: null,
                loading: false,
                stats: mockStats,
                uniqueRegions: [],
                uniqueSystems: [],
            });

            render(<Systems />);

            expect(screen.getByText('Star Systems of the Galaxy')).toBeInTheDocument();
            // Table should be empty
            const tbody = screen.getAllByRole('rowgroup')[1]; // Second rowgroup is tbody
            expect(within(tbody).queryAllByRole('row')).toHaveLength(0);
        });

        it('should handle missing optional data fields', () => {
            const incompleteData = [
                {
                    'Known Planet Name': 'Mystery Planet',
                    Sector: '',
                    Region: '',
                    System: '',
                    Grid: '',
                    X: null,
                    Y: null,
                    RA: '',
                    Dec: '',
                    'Rand. Dist.': null,
                    Link: '',
                    technicalId: 123,
                },
            ];

            mockUseMergedPlanetData.mockReturnValue({
                data: incompleteData,
                error: null,
                loading: false,
                stats: mockStats,
                uniqueRegions: [],
                uniqueSystems: [],
            });

            render(<Systems />);

            expect(screen.getByText('Mystery Planet')).toBeInTheDocument();
            expect(screen.getAllByText('unavailable').length).toBeGreaterThan(0);
        });

        it('should clear invalid selections when options change', async () => {
            const user = userEvent.setup();
            const { rerender } = render(<Systems />);

            mockUseMergedPlanetData.mockReturnValue({
                data: mockData,
                error: null,
                loading: false,
                stats: mockStats,
                uniqueRegions: ['Outer Rim Territories', 'Core Worlds'],
                uniqueSystems: ['Tatoo', 'Coruscant', 'Alderaan', 'Hoth'],
            });

            rerender(<Systems />);

            const regionSelect = screen.getByLabelText(
                'Filter Galaxy by Region',
            ) as HTMLSelectElement;
            await user.selectOptions(regionSelect, 'Core Worlds');

            // Now filter data to remove Core Worlds
            const filteredMockData = mockData.filter((p) => p.Region !== 'Core Worlds');

            mockUseMergedPlanetData.mockReturnValue({
                data: filteredMockData,
                error: null,
                loading: false,
                stats: mockStats,
                uniqueRegions: ['Outer Rim Territories'],
                uniqueSystems: ['Tatoo', 'Hoth'],
            });

            rerender(<Systems />);

            await waitFor(() => {
                expect(regionSelect.value).toBe('');
            });
        });
    });
});
