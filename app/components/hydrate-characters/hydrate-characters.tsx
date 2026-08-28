'use client';

import { useEffect } from 'react';

import { useCharactersContext } from '@hooks';

import { CharacterType } from '@types';

type Props = {
    initialCharacters: CharacterType[];
    nextPage: string;
};

export default function HydrateCharacters({ initialCharacters, nextPage }: Props) {
    const { setAllCharacters, setNextPage } = useCharactersContext();

    useEffect(() => {
        setAllCharacters(() => [...initialCharacters.map((char, index) => ({ ...char, index }))]);
        setNextPage(nextPage);
    }, [initialCharacters, nextPage, setAllCharacters, setNextPage]);

    return null;
}
