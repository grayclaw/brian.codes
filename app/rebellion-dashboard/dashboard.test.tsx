import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Page from './page';

// Adjust import path as needed

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock window.confirm
global.confirm = jest.fn();

describe('Star Wars Rebellion Dashboard', () => {
    beforeEach(() => {
        localStorageMock.clear();
        jest.clearAllMocks();
        (global.confirm as jest.Mock).mockReturnValue(true);
    });

    describe('Initial Render', () => {
        it('renders the dashboard with main title', () => {
            render(<Page />);
            expect(screen.getByText('Star Wars: Rebellion Dashboard')).toBeInTheDocument();
        });

        it('renders all player tabs', () => {
            render(<Page />);
            expect(screen.getByRole('button', { name: 'Player 1' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Player 2' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Player 3' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Player 4' })).toBeInTheDocument();
        });

        it('renders all main sections', () => {
            render(<Page />);
            expect(screen.getByText('Objectives Tracker')).toBeInTheDocument();
            expect(screen.getByText('Leader Assignment')).toBeInTheDocument();
            expect(screen.getByText('Planet Control')).toBeInTheDocument();
            expect(screen.getByText('Mission Planning')).toBeInTheDocument();
            expect(screen.getByText('Probe Droid Tracker')).toBeInTheDocument();
            expect(screen.getByText('Reputation Track')).toBeInTheDocument();
            expect(screen.getByText('Intro Crawl Generator')).toBeInTheDocument();
            expect(screen.getByText('Turn Log')).toBeInTheDocument();
        });

        it('renders End Game button', () => {
            render(<Page />);
            expect(
                screen.getByRole('button', { name: 'End Game & Clear Data' }),
            ).toBeInTheDocument();
        });

        it('has Player 1 tab active by default', () => {
            render(<Page />);
            const player1Tab = screen.getByRole('button', { name: 'Player 1' });
            expect(player1Tab).toHaveClass('text-yellow-500');
        });
    });

    describe('Objectives Tracker', () => {
        it('displays empty state message when no objectives exist', () => {
            render(<Page />);
            expect(screen.getByText('No objectives yet')).toBeInTheDocument();
        });

        it('adds a new objective', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const input = screen.getByPlaceholderText('Add objective...');
            const addButton = screen.getByRole('button', { name: 'Add' });

            await user.type(input, 'Destroy Death Star');
            await user.click(addButton);

            expect(screen.getByText('Destroy Death Star')).toBeInTheDocument();
            expect(screen.queryByText('No objectives yet')).not.toBeInTheDocument();
        });

        it('clears input after adding objective', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const input = screen.getByPlaceholderText('Add objective...') as HTMLInputElement;
            const addButton = screen.getByRole('button', { name: 'Add' });

            await user.type(input, 'Rescue Princess');
            await user.click(addButton);

            expect(input.value).toBe('');
        });

        it('toggles objective completion', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const input = screen.getByPlaceholderText('Add objective...');
            const addButton = screen.getByRole('button', { name: 'Add' });

            await user.type(input, 'Train Jedi');
            await user.click(addButton);

            const objective = screen.getByText('Train Jedi');
            const checkbox = objective.previousElementSibling as HTMLInputElement;

            expect(checkbox).not.toBeChecked();
            expect(objective).not.toHaveClass('line-through');

            await user.click(checkbox);

            expect(checkbox).toBeChecked();
            expect(objective).toHaveClass('line-through');
        });

        it('removes an objective', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const input = screen.getByPlaceholderText('Add objective...');
            const addButton = screen.getByRole('button', { name: 'Add' });

            await user.type(input, 'Evacuate Hoth');
            await user.click(addButton);

            expect(screen.getByText('Evacuate Hoth')).toBeInTheDocument();

            const removeButton = screen.getByText('✕');
            await user.click(removeButton);

            expect(screen.queryByText('Evacuate Hoth')).not.toBeInTheDocument();
        });

        it('adds objective on Enter key press', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const input = screen.getByPlaceholderText('Add objective...');

            await user.type(input, 'Find Luke{Enter}');

            expect(screen.getByText('Find Luke')).toBeInTheDocument();
        });

        it('does not add empty objective', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const addButton = screen.getByRole('button', { name: 'Add' });

            expect(addButton).toBeDisabled();

            await user.click(addButton);

            expect(screen.getByText('No objectives yet')).toBeInTheDocument();
        });
    });

    describe('Leader Assignment Board', () => {
        it('displays empty state message', () => {
            render(<Page />);
            expect(screen.getByText('No assignments yet')).toBeInTheDocument();
        });

        it('adds a new leader assignment', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const leaderInput = screen.getByPlaceholderText('Leader (e.g., Han Solo)...');
            const missionInput = screen.getByPlaceholderText('Mission (e.g., Smuggling Run)...');
            const addButton = screen.getByRole('button', { name: 'Add Assignment' });

            await user.type(leaderInput, 'Luke Skywalker');
            await user.type(missionInput, 'Rescue Mission');
            await user.click(addButton);

            expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
            expect(screen.getByText(': Rescue Mission')).toBeInTheDocument();
        });

        it('requires both leader and mission to add assignment', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const leaderInput = screen.getByPlaceholderText('Leader (e.g., Han Solo)...');
            const addButton = screen.getByRole('button', { name: 'Add Assignment' });

            await user.type(leaderInput, 'Leia');

            expect(addButton).toBeDisabled();
        });

        it('toggles assignment completion', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const leaderInput = screen.getByPlaceholderText('Leader (e.g., Han Solo)...');
            const missionInput = screen.getByPlaceholderText('Mission (e.g., Smuggling Run)...');
            const addButton = screen.getByRole('button', { name: 'Add Assignment' });

            await user.type(leaderInput, 'Han Solo');
            await user.type(missionInput, 'Kessel Run');
            await user.click(addButton);

            const assignments = screen.getByText('Han Solo').closest('div');
            const checkbox = assignments?.querySelector(
                'input[type="checkbox"]',
            ) as HTMLInputElement;

            await user.click(checkbox);

            expect(checkbox).toBeChecked();
        });

        it('removes an assignment', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const leaderInput = screen.getByPlaceholderText('Leader (e.g., Han Solo)...');
            const missionInput = screen.getByPlaceholderText('Mission (e.g., Smuggling Run)...');
            const addButton = screen.getByRole('button', { name: 'Add Assignment' });

            await user.type(leaderInput, 'Lando');
            await user.type(missionInput, 'Cloud City');
            await user.click(addButton);

            expect(screen.getByText('Lando')).toBeInTheDocument();

            const assignment = screen.getByText('Lando').closest('div');
            const removeButton = assignment?.querySelector('button') as HTMLButtonElement;
            await user.click(removeButton);

            expect(screen.queryByText('Lando')).not.toBeInTheDocument();
        });
    });

    describe('Planet Control Tracker', () => {
        it('displays empty state message', () => {
            render(<Page />);
            expect(screen.getByText('No planets tracked')).toBeInTheDocument();
        });

        it('adds a new planet with default Neutral controller', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const planetInput = screen.getByPlaceholderText('Planet name (e.g., Kashyyyk)...');
            const addButtons = screen.getAllByRole('button', { name: 'Add' });
            const planetAddButton = addButtons[addButtons.length - 1]; // Last Add button is for planets

            await user.type(planetInput, 'Tatooine');
            await user.click(planetAddButton);

            expect(screen.getByText('Tatooine')).toBeInTheDocument();
        });

        it('changes planet controller', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const planetInput = screen.getByPlaceholderText('Planet name (e.g., Kashyyyk)...');
            const addButtons = screen.getAllByRole('button', { name: 'Add' });
            const planetAddButton = addButtons[addButtons.length - 1];

            await user.type(planetInput, 'Hoth');
            await user.click(planetAddButton);

            const planet = screen.getByText('Hoth').closest('div');
            const select = planet?.querySelector('select') as HTMLSelectElement;

            expect(select.value).toBe('Neutral');

            await user.selectOptions(select, 'Rebel');

            expect(select.value).toBe('Rebel');
        });

        it('removes a planet', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const planetInput = screen.getByPlaceholderText('Planet name (e.g., Kashyyyk)...');
            const addButtons = screen.getAllByRole('button', { name: 'Add' });
            const planetAddButton = addButtons[addButtons.length - 1];

            await user.type(planetInput, 'Endor');
            await user.click(planetAddButton);

            expect(screen.getByText('Endor')).toBeInTheDocument();

            const planet = screen.getByText('Endor').closest('div');
            const removeButton = within(planet as HTMLElement).getByText('✕');
            await user.click(removeButton);

            expect(screen.queryByText('Endor')).not.toBeInTheDocument();
        });
    });

    describe('Probe Droid Tracker', () => {
        it('displays empty state message', () => {
            render(<Page />);
            expect(screen.getByText('No probes deployed')).toBeInTheDocument();
        });

        it('adds a probe droid with current turn number', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const systemInput = screen.getByPlaceholderText('System name...');
            const addButtons = screen.getAllByRole('button', { name: 'Add' });
            const probeAddButton = addButtons.find(
                (btn) =>
                    btn.closest('div')?.querySelector('h2')?.textContent === 'Probe Droid Tracker',
            ) as HTMLButtonElement;

            await user.type(systemInput, 'Dagobah');
            await user.click(probeAddButton);

            expect(screen.getByText(/Dagobah/)).toBeInTheDocument();
            expect(screen.getByText(/Turn 1/)).toBeInTheDocument();
        });

        it('removes a probe', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const systemInput = screen.getByPlaceholderText('System name...');
            const addButtons = screen.getAllByRole('button', { name: 'Add' });
            const probeAddButton = addButtons.find(
                (btn) =>
                    btn.closest('div')?.querySelector('h2')?.textContent === 'Probe Droid Tracker',
            ) as HTMLButtonElement;

            await user.type(systemInput, 'Alderaan');
            await user.click(probeAddButton);

            expect(screen.getByText(/Alderaan/)).toBeInTheDocument();

            const probe = screen.getByText(/Alderaan/).closest('div');
            const removeButton = probe?.querySelector('button') as HTMLButtonElement;
            await user.click(removeButton);

            expect(screen.queryByText(/Alderaan/)).not.toBeInTheDocument();
        });
    });

    describe('Turn Log Journal', () => {
        it('displays empty state message', () => {
            render(<Page />);
            expect(screen.getByText('No log entries')).toBeInTheDocument();
        });

        it('displays current turn number', () => {
            render(<Page />);
            const turnInput = screen.getByDisplayValue('1');
            expect(turnInput).toBeInTheDocument();
        });

        it('updates turn number', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const turnInput = screen.getByDisplayValue('1') as HTMLInputElement;

            await user.clear(turnInput);
            await user.type(turnInput, '5');

            expect(turnInput.value).toBe('5');
        });

        it('adds a turn log entry', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const textarea = screen.getByPlaceholderText('Record turn events...');
            const addButton = screen.getByRole('button', { name: 'Add Entry' });

            await user.type(textarea, 'Rebels evacuated Echo Base');
            await user.click(addButton);

            expect(screen.getByText('Rebels evacuated Echo Base')).toBeInTheDocument();
            expect(screen.getByText('Turn 1')).toBeInTheDocument();
        });

        it('removes a turn log entry', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const textarea = screen.getByPlaceholderText('Record turn events...');
            const addButton = screen.getByRole('button', { name: 'Add Entry' });

            await user.type(textarea, 'Test entry');
            await user.click(addButton);

            expect(screen.getByText('Test entry')).toBeInTheDocument();

            const entry = screen.getByText('Test entry').closest('div');
            const removeButton = entry?.querySelector('button') as HTMLButtonElement;
            await user.click(removeButton);

            expect(screen.queryByText('Test entry')).not.toBeInTheDocument();
        });
    });

    describe('Reputation Track', () => {
        it('displays reputation slider with default value of 0', () => {
            render(<Page />);
            const slider = screen.getByRole('slider') as HTMLInputElement;
            expect(slider.value).toBe('0');
        });

        it('updates reputation value', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const slider = screen.getByRole('slider') as HTMLInputElement;

            fireEvent.change(slider, { target: { value: '7' } });

            expect(slider.value).toBe('7');
            expect(screen.getByText('7')).toBeInTheDocument();
        });
    });

    describe('Text Areas', () => {
        it('updates mission planning textarea', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const textarea = screen.getByPlaceholderText(
                'Plan your missions here...',
            ) as HTMLTextAreaElement;

            await user.type(textarea, 'Attack the Death Star');

            expect(textarea.value).toBe('Attack the Death Star');
        });

        it('updates intro crawl textarea', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const textarea = screen.getByPlaceholderText(
                'Write your opening crawl...',
            ) as HTMLTextAreaElement;

            await user.type(textarea, 'A long time ago...');

            expect(textarea.value).toBe('A long time ago...');
        });
    });

    describe('Tab Navigation with Warning Modal', () => {
        it('shows warning modal when switching players', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const player2Tab = screen.getByRole('button', { name: 'Player 2' });
            await user.click(player2Tab);

            expect(screen.getByText('⚠️ Player Switch Warning')).toBeInTheDocument();
            expect(screen.getByText(/You are about to switch to/)).toBeInTheDocument();
            expect(screen.getByText(/Player 2/)).toBeInTheDocument();
        });

        it('switches player when confirming modal', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const player2Tab = screen.getByRole('button', { name: 'Player 2' });
            await user.click(player2Tab);

            const continueButton = screen.getByRole('button', { name: 'Continue' });
            await user.click(continueButton);

            await waitFor(() => {
                expect(player2Tab).toHaveClass('text-yellow-500');
            });
        });

        it('cancels player switch when clicking cancel', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const player1Tab = screen.getByRole('button', { name: 'Player 1' });
            const player2Tab = screen.getByRole('button', { name: 'Player 2' });

            await user.click(player2Tab);

            const cancelButton = screen.getByRole('button', { name: 'Cancel' });
            await user.click(cancelButton);

            await waitFor(() => {
                expect(player1Tab).toHaveClass('text-yellow-500');
                expect(player2Tab).not.toHaveClass('text-yellow-500');
            });
        });

        it('does not show modal when clicking already active player', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const player1Tab = screen.getByRole('button', { name: 'Player 1' });
            await user.click(player1Tab);

            expect(screen.queryByText('⚠️ Player Switch Warning')).not.toBeInTheDocument();
        });
    });

    describe('Data Persistence per Player', () => {
        it('maintains separate data for different players', async () => {
            const user = userEvent.setup();
            render(<Page />);

            // Add objective for Player 1
            const objectiveInput = screen.getByPlaceholderText('Add objective...');
            await user.type(objectiveInput, 'Player 1 Objective');
            await user.click(screen.getByRole('button', { name: 'Add' }));

            expect(screen.getByText('Player 1 Objective')).toBeInTheDocument();

            // Switch to Player 2
            const player2Tab = screen.getByRole('button', { name: 'Player 2' });
            await user.click(player2Tab);
            await user.click(screen.getByRole('button', { name: 'Continue' }));

            // Player 2 should have empty objectives
            await waitFor(() => {
                expect(screen.getByText('No objectives yet')).toBeInTheDocument();
                expect(screen.queryByText('Player 1 Objective')).not.toBeInTheDocument();
            });
        });

        it('persists data when switching back to player', async () => {
            const user = userEvent.setup();
            render(<Page />);

            // Add data for Player 1
            const objectiveInput = screen.getByPlaceholderText('Add objective...');
            await user.type(objectiveInput, 'Persistent Objective');
            await user.click(screen.getByRole('button', { name: 'Add' }));

            // Switch to Player 2
            await user.click(screen.getByRole('button', { name: 'Player 2' }));
            await user.click(screen.getByRole('button', { name: 'Continue' }));

            // Switch back to Player 1
            await waitFor(() => {
                expect(screen.getByText('No objectives yet')).toBeInTheDocument();
            });

            await user.click(screen.getByRole('button', { name: 'Player 1' }));
            await user.click(screen.getByRole('button', { name: 'Continue' }));

            // Data should still be there
            await waitFor(() => {
                expect(screen.getByText('Persistent Objective')).toBeInTheDocument();
            });
        });
    });

    describe('End Game Functionality', () => {
        it('clears all data when end game is confirmed', async () => {
            const user = userEvent.setup();
            (global.confirm as jest.Mock).mockReturnValue(true);

            render(<Page />);

            // Add some data
            const objectiveInput = screen.getByPlaceholderText('Add objective...');
            await user.type(objectiveInput, 'Test Objective');
            await user.click(screen.getByRole('button', { name: 'Add' }));

            expect(screen.getByText('Test Objective')).toBeInTheDocument();

            // End game
            const endGameButton = screen.getByRole('button', { name: 'End Game & Clear Data' });
            await user.click(endGameButton);

            await waitFor(() => {
                expect(screen.getByText('No objectives yet')).toBeInTheDocument();
                expect(screen.queryByText('Test Objective')).not.toBeInTheDocument();
            });
        });

        it('does not clear data when end game is cancelled', async () => {
            const user = userEvent.setup();
            (global.confirm as jest.Mock).mockReturnValue(false);

            render(<Page />);

            // Add some data
            const objectiveInput = screen.getByPlaceholderText('Add objective...');
            await user.type(objectiveInput, 'Keep This');
            await user.click(screen.getByRole('button', { name: 'Add' }));

            // Try to end game but cancel
            const endGameButton = screen.getByRole('button', { name: 'End Game & Clear Data' });
            await user.click(endGameButton);

            // Data should still be there
            expect(screen.getByText('Keep This')).toBeInTheDocument();
        });
    });

    describe('LocalStorage Integration', () => {
        it('saves data to localStorage', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const objectiveInput = screen.getByPlaceholderText('Add objective...');
            await user.type(objectiveInput, 'Storage Test');
            await user.click(screen.getByRole('button', { name: 'Add' }));

            await waitFor(() => {
                const stored = localStorageMock.getItem('sw-rebellion-game-data');
                expect(stored).toBeTruthy();
                const parsed = JSON.parse(stored!);
                expect(parsed['Player 1'].objectives[0].name).toBe('Storage Test');
            });
        });

        it('loads data from localStorage on mount', () => {
            const mockData = {
                'Player 1': {
                    objectives: [{ id: 1, name: 'Pre-loaded Objective', completed: false }],
                    leaderAssignment: [],
                    planetControl: [],
                    missionPlanning: '',
                    introCrawl: '',
                    turnLog: [],
                    probeDroids: [],
                    reputationTrack: 0,
                    currentTurn: 1,
                },
            };

            localStorageMock.setItem('sw-rebellion-game-data', JSON.stringify(mockData));

            render(<Page />);

            expect(screen.getByText('Pre-loaded Objective')).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('has proper input labels', () => {
            render(<Page />);

            expect(screen.getByPlaceholderText('Add objective...')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Leader (e.g., Han Solo)...')).toBeInTheDocument();
            expect(
                screen.getByPlaceholderText('Mission (e.g., Smuggling Run)...'),
            ).toBeInTheDocument();
            expect(
                screen.getByPlaceholderText('Planet name (e.g., Kashyyyk)...'),
            ).toBeInTheDocument();
        });

        it('has disabled state for empty inputs', () => {
            render(<Page />);

            const addButton = screen.getByRole('button', { name: 'Add' });
            expect(addButton).toBeDisabled();
        });

        it('enables button when input has value', async () => {
            const user = userEvent.setup();
            render(<Page />);

            const input = screen.getByPlaceholderText('Add objective...');
            const addButton = screen.getByRole('button', { name: 'Add' });

            expect(addButton).toBeDisabled();

            await user.type(input, 'Test');

            expect(addButton).not.toBeDisabled();
        });
    });
});
