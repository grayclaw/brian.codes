import { PageContainer } from '@components';

import { PURE_BLACK } from '@constants';

import { AppProvider, BreakpointProvider } from '@providers';

import '../styles/globals.css';
import '../styles/vars.css';

export const metadata = {
    title: 'Star Wars Fan Page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, background: PURE_BLACK }}>
                <AppProvider>
                    <BreakpointProvider>
                        <PageContainer>{children}</PageContainer>
                    </BreakpointProvider>
                </AppProvider>
            </body>
        </html>
    );
}
