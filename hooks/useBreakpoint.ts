import { useContext } from 'react';

import { BreakpointContext } from '@providers';

import { BreakpointType } from '@types';

/**
 * Custom React hook that returns the current breakpoint based on window width.
 *
 * This hook must be used within a BreakpointProvider. It returns an object with boolean flags
 * for each breakpoint, making it easy to conditionally render components.
 *
 * @example
 * function MyComponent() {
 *   const { md, lg } = useBreakpoint();
 *
 *   return (
 *     <div>
 *       {!md && <MobileMenu />}
 *       {lg && <DesktopMenu />}
 *     </div>
 *   );
 * }
 *
 * @remarks
 * Breakpoint thresholds:
 * - sm: ≤ 640px
 * - md: ≤ 768px (641-768px)
 * - lg: ≤ 1024px (769-1024px)
 * - xl: ≥ 1025px
 *
 * The hook automatically cleans up event listeners on component unmount.
 */
export default function useBreakpoint(): BreakpointType {
    const context = useContext(BreakpointContext);

    if (context === undefined) {
        throw new Error('useBreakpoint must be used within a BreakpointProvider');
    }

    return context;
}
