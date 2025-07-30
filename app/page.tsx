import Head from 'next/head';

import { BLACK } from '@constants';

import Crawl from './crawl';
import GenerateStars from './generate-stars';
import { CtaButton, Hero, HeroContent, StarfieldStyles, Subtitle } from './page-styles';
import Projects from './projects';

export default function page() {
    return (
        <html lang="en">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Star Wars Fan Page</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body style={{ margin: '0', background: BLACK }}>
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
            </body>
        </html>
    );
}
