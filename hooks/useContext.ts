import { CharactersProviderContext, GameTrackerProviderContext } from '@providers';

import { CharacterContextType, GameTrackerContextType } from '@types';

import {
    useGenericContext,
    useGenericContextNullable,
    useGenericContextWithNull,
} from './useGenericContext';

export function useAppContext(): CharacterContextType {
    return useGenericContextWithNull(CharactersProviderContext, 'CharactersProviderContext');
}

export function useGameContext(): GameTrackerContextType {
    return useGenericContextWithNull(GameTrackerProviderContext, 'GameTrackerProviderContext');
}
