export type CharacterContextType = {
    allCharacters: CharacterType[];
    setCharacterNumber: (number: number) => void;
    characterNumber: number;
    currentCharacter: CharacterType;
    starShips: StarShipType[] | [];
    vehicles: VehicleType[] | [];
    species: SpeciesType[] | [];
    homeWorld: HomeWorldType[] | [];
};
export type CharacterType = {
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    index: number;
    mass: string;
    name: string;
    species: string[];
    starships: string[];
    vehicles: string[];
};

export type HomeWorldType = {
    name: string;
    gravity: string;
    terrain: string;
};

export type SpeciesType = {
    name: string;
};

export type StarShipType = {
    name: string;
    model: string;
    manufacturer: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
};

export type VehicleType = {
    name: string;
    model: string;
    manufacturer: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    vehicle_class: string;
};
