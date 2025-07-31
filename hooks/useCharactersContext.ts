import { useContext } from 'react';

import { CharacterContextType } from '@types';

import { CharactersProviderContext } from '../app/retro-page/character-provider';

export default function useCharactersContext(): CharacterContextType {
    const context = useContext(CharactersProviderContext);

    if (!context) {
        throw new Error('Characters Context not available');
    }

    return context;
}
