import { PURE_BLACK, SW_API } from '@constants';

import { AppProvider } from '@providers';

import { CharacterType } from '@types';

import '../styles/globals.css';
import '../styles/vars.css';

export const metadata = {
    title: 'Star Wars Fan Page',
};

export default async function RootLayout({ children }: { children: React.ReactElement }) {
    let characters: CharacterType[] = [];
    let nextCharacterPage = '';
    try {
        const res = await fetch(`${SW_API}/people`);
        if (!res.ok) {
            throw new Error('Network response failed');
        }
        const json = await res.json();
        characters = json.results;
        nextCharacterPage = json.next;
    } catch (error) {
        console.error('Server side fetch failed: ', error);
    }

    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body style={{ margin: '0', background: PURE_BLACK }}>
                <AppProvider value={{ characters, nextCharacterPage }}>{children}</AppProvider>
            </body>
        </html>
    );
}
