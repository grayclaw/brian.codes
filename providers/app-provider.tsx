'use client';

import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';

import { useFetch } from '@hooks';

import {
    CharacterContextType,
    CharacterType,
    // HomeWorldType,
    // SpeciesType,
    StarShipType,
    // VehicleType,
} from '@types';

export const CharactersProviderContext = createContext<CharacterContextType | null>(null);

export default function AppProvider({ children }: { children: ReactNode }) {
    const [allCharacters, setAllCharacters] = useState<CharacterType[]>([]);
    const [characterNumber, setCharacterNumber] = useState<number>(0);
    const [currentCharacter, setCurrentCharacter] = useState<CharacterType>(
        allCharacters[0] ?? null,
    );
    const [nextPage, setNextPage] = useState<string>('');
    const [starShips] = useState<StarShipType[]>([]);
    const [vehicles] = useState([]);
    const [species] = useState([]);
    const [homeWorld] = useState([]);

    const { data: characterData, get: getCharacters } = useFetch();

    useEffect(() => {
        if (nextPage) {
            getCharacters(nextPage);
            setNextPage('');
        }
    }, [characterNumber, nextPage]);

    useEffect(() => {
        if (characterData) {
            setAllCharacters((curr) => [
                ...curr,
                ...characterData.results.map((char: CharacterType, index: number) => ({
                    ...char,
                    id: curr.length + index,
                })),
            ]);
            setNextPage(characterData.next);
        }
    }, [characterData]);

    // useEffect(() => {
    //     const fetchStarShips = async () => {
    //         try {
    //             if (currentCharacter?.starships?.length) {
    //                 const data = await fetchUrls(currentCharacter.starships);
    //                 setStarShips(data);
    //             }
    //         } catch (error) {}
    //     };

    //     fetchStarShips();
    // }, []);

    useEffect(() => {
        setCurrentCharacter(allCharacters[characterNumber]);
    }, [allCharacters, characterNumber]);

    const newValue = useMemo(() => {
        return {
            allCharacters,
            setAllCharacters,
            characterNumber,
            setCharacterNumber,
            currentCharacter,
            homeWorld,
            nextPage,
            setNextPage,
            species,
            starShips,
            vehicles,
        };
    }, [
        allCharacters,
        setCharacterNumber,
        characterNumber,
        currentCharacter,
        nextPage,
        starShips,
        vehicles,
        species,
        homeWorld,
    ]);

    return (
        <CharactersProviderContext.Provider value={newValue}>
            {children}
        </CharactersProviderContext.Provider>
    );
}
