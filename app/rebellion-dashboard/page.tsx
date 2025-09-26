'use client';

import { GameProvider } from '@providers';

import Dashboard from './dashboard';

export default function Page() {
    return (
        <GameProvider>
            <Dashboard />
        </GameProvider>
    );
}
