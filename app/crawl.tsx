'use client';

import { useEffect, useRef, useState } from 'react';

import {
    ButtonContainerStyles,
    ContainerStyles,
    CrawlContainerStyles,
    CrawlContentStyles,
    MainTitleStyles,
    ParagraphStyles,
    ResetButtonStyles,
    SpacerStyles,
    StarfieldStyles,
    StartButtonStyles,
    SubTitleStyles,
    TextContainerStyles,
    TitleContainerStyles,
} from './crawl-styles';
import GenerateStars from './generate-stars';

export default function Crawl() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [shouldHide, setShouldHide] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const startCrawl = () => {
        setIsPlaying(true);
        audioRef.current?.play();
    };

    const resetCrawl = () => {
        setIsPlaying(false);
        // audioRef.current?.pause();
        audioRef.current && (audioRef.current.currentTime = 0);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShouldHide(true);
        }, 87000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            {/* <audio ref={audioRef} src="/star-wars-crawl.m4a" controls autoPlay /> */}
            <ContainerStyles shouldHide={shouldHide}>
                <StarfieldStyles>
                    <GenerateStars />
                </StarfieldStyles>

                <ButtonContainerStyles>
                    <StartButtonStyles onClick={startCrawl}>Start Crawl</StartButtonStyles>
                    <ResetButtonStyles onClick={resetCrawl}>Reset</ResetButtonStyles>
                </ButtonContainerStyles>

                <CrawlContainerStyles>
                    <CrawlContentStyles isPlaying={isPlaying}>
                        <TitleContainerStyles>
                            <MainTitleStyles>Star Wars</MainTitleStyles>
                            <SubTitleStyles>Fan Page</SubTitleStyles>
                            <MainTitleStyles>Episode IV</MainTitleStyles>
                            <SubTitleStyles>A NEW HOPE</SubTitleStyles>
                        </TitleContainerStyles>

                        <TextContainerStyles>
                            <ParagraphStyles>
                                It is a period of civil war. Rebel spaceships, striking from a
                                hidden base, have won their first victory against the evil Galactic
                                Empire.
                            </ParagraphStyles>

                            <ParagraphStyles>
                                During the battle, Rebel spies managed to steal secret plans to the
                                Empire's ultimate weapon, the DEATH STAR, an armored space station
                                with enough power to destroy an entire planet.
                            </ParagraphStyles>

                            <ParagraphStyles>
                                Pursued by the Empire's sinister agents, Princess Leia races home
                                aboard her starship, custodian of the stolen plans that can save her
                                people and restore freedom to the galaxy....
                            </ParagraphStyles>

                            <SpacerStyles />
                        </TextContainerStyles>
                    </CrawlContentStyles>
                </CrawlContainerStyles>
            </ContainerStyles>
        </>
    );
}
