'use client';

import { useAppContext } from '@hooks';

import { ContentBox } from '../../retro-page/page-styles';

export default function Character() {
    const {
        currentCharacter: {
            name,
            height,
            mass,
            hair_color: hairColor,
            eye_color: eyeColor,
            birth_year: birthYear,
            // gender,
            // homeworld,
            // species,
            // vehicles,
            // starships,
        },
    } = useAppContext();

    const hasValue = (characteristic: string) => {
        return (
            characteristic &&
            characteristic !== 'unknown' &&
            characteristic !== 'none' &&
            characteristic !== 'n/a'
        );
    };

    return (
        <>
            <ContentBox>
                <h2>{name}</h2>
                <h3>Characteristics</h3>
                {hasValue(height) && <p>height: {height}cm</p>}
                {hasValue(mass) && <p>mass: {mass}kg</p>}
                {hasValue(hairColor) && <p>hair color: {hairColor}</p>}
                {hasValue(eyeColor) && <p>eye color: {eyeColor}</p>}
                {hasValue(birthYear) && <p>birth year: {birthYear}</p>}
            </ContentBox>
        </>
    );
}

// function getRandomNumber(min: number, max: number) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// const [
//     {
//         name,
//         height,
//         mass,
//         hair_color: hairColor,
//         eye_color: eyeColor,
//         birth_year: birthYear,
//         gender,
//         homeworld,
//         species,
//         vehicles,
//         starships,
//     },
//     setCharacter,
// ] = useState<Character>({
//     name: '',
//     height: '',
//     mass: '',
//     hair_color: '',
//     eye_color: '',
//     birth_year: '',
//     gender: '',
//     homeworld: '',
//     species: [],
//     vehicles: [],
//     starships: [],
// });
// const [characteristics, setCharacteristics] = useState<object>({
//     name: '',
//     height: '',
//     mass: '',
//     hair_color: '',
//     skin_color: '',
//     eye_color: '',
//     birth_year: '',
//     gender: '',
//     homeworld: '',
//     films: [],
//     species: [],
//     vehicles: [],
//     starships: [],
//     created: '',
//     edited: '',
//     url: '',
// });

// const person = {
//     name: 'Luke Skywalker',
//     height: '172',
//     mass: '77',
//     hair_color: 'blond',
//     eye_color: 'blue',
//     birth_year: '19BBY',
//     gender: 'male',
//     homeworld: 'https://swapi.py4e.com/api/planets/1/',
//     species: ['https://swapi.py4e.com/api/species/1/'],
//     vehicles: ['https://swapi.py4e.com/api/vehicles/14/'],
//     starships: ['https://swapi.py4e.com/api/starships/12/'],
// };
// const planet = {
//     name: 'Tatooine',
//     gravity: '1 standard',
//     terrain: 'desert',
// };
// const species = {
//     name: 'Human',
// };

// const vehicles = {
//     name: 'Snowspeeder',
//     model: 't-47 airspeeder',
//     manufacturer: 'Incom corporation',
//     length: '4.5',
//     max_atmosphering_speed: '650',
//     crew: '2',
//     vehicle_class: 'airspeeder',
// };

// const starShips = {
//     name: 'X-wing',
//     model: 'T-65 X-wing',
//     manufacturer: 'Incom Corporation',
//     length: '12.5',
//     max_atmosphering_speed: '1050',
//     crew: '1',
//     hyperdrive_rating: '1.0',
//     MGLT: '100',
//     starship_class: 'Starfighter',
// };
