import type { Metadata } from 'next';

import { HydrateCharacters, StarField } from '@components';

import { SW_API } from '@constants';

import Crawl from './crawl';
import { CtaButton, Hero, HeroContent, Subtitle } from './page-styles';
import Projects from './projects';

export const metadata: Metadata = {
    title: 'Star Wars Fan Page',
};

export default async function Page() {
    const res = await fetch(`${SW_API}/people`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch characters');
    }

    const json = await res.json();

    return (
        <>
            <HydrateCharacters initialCharacters={json.results} nextPage={json.next} />

            <Crawl />

            <Hero>
                <StarField />
                <HeroContent>
                    <h1>Junior’s Homers</h1>
                    <Subtitle>Mastering the art of code across the galaxy</Subtitle>
                    <CtaButton href="#projects">Explore Projects</CtaButton>
                </HeroContent>
            </Hero>

            <Projects />
        </>
    );
}
