import { Context, useContext } from 'react';

/**
 * Generic hook for consuming React contexts with error handling
 * @param context - The React context to consume
 * @param contextName - Name of the context for error messages
 * @returns The context value
 * @throws Error if context is not available (used outside provider)
 */
export function useGenericContext<T>(context: Context<T | undefined>, contextName: string): T {
    const contextValue = useContext(context);

    if (contextValue === undefined) {
        throw new Error(`${contextName} must be used within its Provider`);
    }

    return contextValue;
}

// Alternative version with null check instead of undefined
export function useGenericContextWithNull<T>(context: Context<T | null>, contextName: string): T {
    const contextValue = useContext(context);

    if (!contextValue) {
        throw new Error(`${contextName} must be used within its Provider`);
    }

    return contextValue;
}

// Generic version that handles both null and undefined
export function useGenericContextNullable<T>(
    context: Context<T | null | undefined>,
    contextName: string,
): T {
    const contextValue = useContext(context);

    if (contextValue == null) {
        // Checks both null and undefined
        throw new Error(`${contextName} must be used within its Provider`);
    }

    return contextValue;
}
