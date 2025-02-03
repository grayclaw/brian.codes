'use client';

import jokes from 'public/jokes';
import { useState } from 'react';

import { getRandomNumber } from '@utils';

import { Button, ContentBox } from './page-styles';

interface JokeProps {
    randomNumber: number;
}

export default function Joke({ randomNumber }: JokeProps) {
    const allJokes = jokes();
    const [{ q, a }, setJoke] = useState(allJokes[randomNumber]);

    const handleJokeChange = () => {
        setJoke(allJokes[getRandomNumber(0, 137)]);
    };

    return (
        <ContentBox>
            <h2>Today's Joke</h2>
            <p>
                {a ? 'question: ' : ''}
                {q}
            </p>
            {a && <p>answer: {a}</p>}
            <br />
            <p>or if you don't find this one funny</p>
            <Button onClick={handleJokeChange}>try another joke</Button>
        </ContentBox>
    );
}
