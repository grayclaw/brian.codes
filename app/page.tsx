import type { Metadata } from 'next';

import { StarField } from '@components';

import Crawl from './crawl';
import { CtaButton, Hero, HeroContent, Subtitle } from './page-styles';
import Projects from './projects';

export const metadata: Metadata = {
    title: 'Star Wars Fan Page',
};

export default function page() {
    return (
        <>
            <Crawl />
            <Hero>
                <StarField />
                <HeroContent>
                    <h1>Junior&rsquo;s Homers</h1>
                    <Subtitle>Mastering the art of code across the galaxy</Subtitle>
                    <CtaButton href="#projects">Explore Projects</CtaButton>
                </HeroContent>
            </Hero>

            <Projects />
        </>
    );
}
