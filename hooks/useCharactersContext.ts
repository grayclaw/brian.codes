import { CharactersProviderContext } from 'app/character-provider';
import { useContext } from 'react';

import { CharacterContextType } from '@types';

export default function useCharactersContext(): CharacterContextType {
    const context = useContext(CharactersProviderContext);

    if (!context) {
        throw new Error('Characters Context not available');
    }

    return context;
}
