import { useContext } from 'react';

import { CharactersProviderContext } from '@providers';

import { CharacterContextType } from '@types';

export default function useCharactersContext(): CharacterContextType {
    const context = useContext(CharactersProviderContext);

    if (!context) {
        throw new Error('Characters Context not available');
    }

    return context;
}
