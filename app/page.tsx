import type { Metadata } from 'next';

import Crawl from './crawl';
import GenerateStars from './generate-stars';
import { CtaButton, Hero, HeroContent, StarfieldStyles, Subtitle } from './page-styles';
import Projects from './projects';

export const metadata: Metadata = {
    title: 'Star Wars Fan Page',
};

export default function page() {
    return (
        <>
            <Crawl />
            <Hero>
                <StarfieldStyles>
                    <GenerateStars />
                </StarfieldStyles>
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
