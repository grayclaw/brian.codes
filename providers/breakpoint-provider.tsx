'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';

import { BreakpointType } from '@types';

export const BreakpointContext = createContext<BreakpointType | undefined>(undefined);

/**
 * Provider component that monitors window resize and provides breakpoint data to all children.
 * Wrap your app with this provider at the root level to enable breakpoint detection.
 */
export default function BreakpointProvider({ children }: { children: ReactNode }) {
    const [breakpoint, setBreakpoint] = useState<BreakpointType>({
        sm: true,
        md: false,
        lg: false,
        xl: false,
    });

    useEffect(() => {
        const updateBreakpoint = () => {
            const width = window.innerWidth;
            let sm = false;
            let md = false;
            let lg = false;
            let xl = false;

            if (width >= 1025) {
                xl = true;
            } else if (width >= 769) {
                lg = true;
            } else if (width >= 641) {
                md = true;
            } else {
                sm = true;
            }

            setBreakpoint({ sm, md, lg, xl });
        };

        updateBreakpoint();

        let timeoutId: ReturnType<typeof setTimeout>;
        const debouncedUpdate = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateBreakpoint, 150);
        };

        window.addEventListener('resize', debouncedUpdate);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', debouncedUpdate);
        };
    }, []);

    return <BreakpointContext.Provider value={breakpoint}>{children}</BreakpointContext.Provider>;
}
