// app/layout.tsx
import { PURE_BLACK } from '@constants';

import '../styles/globals.css';
import '../styles/vars.css';

export const metadata = {
    title: 'Star Wars Fan Page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
            <body style={{ margin: '0', background: PURE_BLACK }}>{children}</body>
        </html>
    );
}
