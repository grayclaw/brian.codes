'use client';

import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';

interface CrawlProps {
    isPlaying: boolean;
}

interface ContainerProps {
    shouldHide: boolean;
}

export const ButtonContainerStyles = styled.div`
    display: flex;
    gap: 16px;
    left: 16px;
    position: absolute;
    top: 16px;
    z-index: 20;
`;

const buttonStyles = `
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    padding: 8px 16px;
    transition: background-color 0.3s ease;
`;

export const ContainerStyles = styled.div<ContainerProps>`
    background-color: black;
    color: #ffe81f;
    font-family: Impact, 'Arial Black', Gadget, sans-serif, monospace;
    overflow: hidden;
    position: relative;

    transition:
        max-height 1s ease,
        opacity 1s ease,
        padding 1s ease;

    ${({ shouldHide }) =>
        shouldHide
            ? `
                max-height: 0;
                opacity: 0;
                padding: 0;
                pointer-events: none;
            `
            : `
                max-height: 100vh; // a safe high value to ensure full expansion
                opacity: 1;
                padding: 32px;
            `}
`;

export const CrawlContainerStyles = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    perspective: 400px;
`;

const crawlAnimation = keyframes`
    0% {
      transform: translateZ(0) rotateX(20deg) translateY(90vh);
    }
    100% {
      transform: translateZ(0) rotateX(20deg) translateY(-100vh);
    }
  `;

export const CrawlContentStyles = styled.div<CrawlProps>`
    transform-style: preserve-3d;
    transform: translateZ(0) rotateX(20deg)
        ${({ isPlaying }) => (isPlaying ? '' : 'translateY(0vh)')};

    ${({ isPlaying }) =>
        isPlaying &&
        `
            animation: ${crawlAnimation} 87s linear 1;
        `}
`;

export const MainTitleStyles = styled.h1`
    font-size: 80px;
    font-weight: bold;
    letter-spacing: 0.1em;
    margin-bottom: 16px;

    @media (max-width: 768px) {
        font-size: 48px;
    }
`;

export const ParagraphStyles = styled.p`
    margin-bottom: 24px;
`;

export const ResetButtonStyles = styled.button`
    ${buttonStyles};
    background-color: #4b5563;
    color: white;

    &:hover {
        background-color: #6b7280;
    }
`;

export const SpacerStyles = styled.div`
    height: 100vh;
`;

export const StarfieldStyles = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

export const StartButtonStyles = styled.button`
    ${buttonStyles};
    background-color: #ffe81f;
    color: black;

    &:hover {
        background-color: #ffe81f;
    }
`;

export const SubTitleStyles = styled.h2`
    font-size: 36px;
    font-weight: bold;
    letter-spacing: 0.15em;

    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

export const TextContainerStyles = styled.div`
    font-size: 16px;
    line-height: 1.6;
    max-width: 512px;
    text-align: justify;

    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

export const TitleContainerStyles = styled.div`
    margin-bottom: 32px;
    text-align: center;
`;
