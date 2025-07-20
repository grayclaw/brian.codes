'use client';

// @ts-expect-error splide causing type error
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/dist/css/splide.min.css';
import { Button } from 'app/page-styles';

import { useCharactersContext } from '@hooks';

import { CharacterType } from '@types';

export default function ButtonCarousel() {
    const { allCharacters, setCharacterNumber } = useCharactersContext();

    const handleClick = (index: number) => {
        console.log(`index:`, index);
        setCharacterNumber(index);
    };

    return (
        <>
            <h2>Click on character to view characteristics below</h2>
            <Splide
                options={{
                    arrows: false,
                    autoScroll: {
                        speed: 1,
                    },
                    autoWidth: true,
                    clones: 20,
                    gap: '16px',
                    label: 'Click on character to view characteristics',
                    pagination: false,
                    type: 'loop',
                }}
                extensions={{ AutoScroll }}
            >
                {allCharacters.map((character: CharacterType, index: number) => (
                    <SplideSlide key={`${character.name}${index}`}>
                        <Button onClick={() => handleClick(index)}>{character.name}</Button>
                    </SplideSlide>
                ))}
            </Splide>
        </>
    );
}
