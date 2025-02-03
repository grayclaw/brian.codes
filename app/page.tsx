import Image from 'next/image';

import { SW_API } from '@constants';

import { CharacterType } from '@types';

import { getRandomNumber } from '@utils';

import CharacterProvider from './character-provider';
import ButtonCarousel from './components/button-carousel/button-carousel';
import Character from './components/character/character';
import Joke from './joke';
import {
    Body,
    ContentBox,
    Footer,
    RoutingLink,
    ScrollingSpan,
    ScrollingText,
    Title,
} from './page-styles';

export default async function Home() {
    const jokeNum = getRandomNumber(0, 137);
    let characters: CharacterType[] = [];
    let nextCharacterPage = '';
    try {
        const res = await fetch(`${SW_API}/people`);
        if (!res.ok) {
            throw new Error('Network response failed');
        }
        const json = await res.json();
        characters = json.results;
        console.log(`json:`, json);
        nextCharacterPage = json.next;
    } catch (error) {
        console.error('Server side fetch failed: ', error);
    }

    return (
        <CharacterProvider value={{ characters, nextCharacterPage }}>
            <Body>
                <Title>Welcome to the Galaxy!</Title>
                <ScrollingText>
                    <ScrollingSpan>
                        "A long time ago in a galaxy far, far away..." — Welcome to the ultimate
                        Star Wars fan page!
                    </ScrollingSpan>
                </ScrollingText>
                <ContentBox>
                    <h2>Latest News</h2>
                    <p>
                        The Empire is expanding! Stay tuned for the next adventure in a galaxy far,
                        far away.
                    </p>
                </ContentBox>
                <ContentBox>
                    <h2>Choose Your Side</h2>
                    <p>
                        Will you join the <RoutingLink href="/light-side">Rebellion</RoutingLink>,
                        or embrace the <RoutingLink href="/dark-side">Dark&nbsp;Side?</RoutingLink>
                    </p>
                </ContentBox>
                <Joke randomNumber={jokeNum} />
                <ContentBox>
                    <Image
                        alt="Luke Skywalker"
                        height={300}
                        src="https://art.pixilart.com/5990002c63e1151.png"
                        style={{ height: '100%', width: '100%' }}
                        width={400}
                    />
                </ContentBox>
                <ButtonCarousel />
                <Character />
                <Footer>May the Force be with you! &copy; 1999 Star Wars Fan Club</Footer>
            </Body>
        </CharacterProvider>
    );
}
