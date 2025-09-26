'use client';

import { ReactElement, createContext, useEffect, useMemo, useState } from 'react';

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

interface Provider {
    value: { characters: CharacterType[]; nextCharacterPage: string };
    children: ReactElement[] | ReactElement;
}

export default function AppProvider({ value, children }: Provider) {
    const { characters, nextCharacterPage } = value;
    const [allCharacters, setAllCharacters] = useState<CharacterType[]>(() => [
        ...characters.map((char, index) => ({ ...char, index })),
    ]);
    const [characterNumber, setCharacterNumber] = useState<number>(0);
    const [currentCharacter, setCurrentCharacter] = useState<CharacterType>(allCharacters[0]);
    const [nextPage, setNextPage] = useState<string>(nextCharacterPage);
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
            setCharacterNumber,
            characterNumber,
            currentCharacter,
            starShips,
            vehicles,
            species,
            homeWorld,
        };
    }, [
        allCharacters,
        setCharacterNumber,
        characterNumber,
        currentCharacter,
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

// const fetchUrls = async (urls: string[]) => {
//     try {
//         const fetchPromises = urls.map(async (url) => {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
//             }
//             return response.json();
//         });

//         const results = await Promise.all(fetchPromises);
//         return results;
//     } catch (error) {
//         console.error('Error fetching URLs:', error);
//         throw error;
//     }
// };
