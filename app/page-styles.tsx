'use client';

import styled from '@emotion/styled';

export const CtaButton = styled.a`
    background: linear-gradient(135deg, #0071e3, #005bb5);
    border-radius: 30px;
    border: none;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    padding: 16px 40px;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, #0077ed, #0061c2);
        box-shadow: 0 20px 40px rgba(0, 113, 227, 0.3);
        transform: translateY(-2px);
    }
`;

export const Hero = styled.section`
    align-items: center;
    background: radial-gradient(ellipse at center, #1a1a2e 0%, #000 70%);
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    overflow: hidden;
    position: relative;

    h1 {
        font-size: clamp(3rem, 8vw, 6rem);
        font-weight: 700;
        background: linear-gradient(135deg, #00d4ff, #0099cc, #004466);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 1rem;
        line-height: 1.1;
    }
`;

export const HeroContent = styled.div`
    animation: fadeInUp 1.5s ease-out 0.5s forwards;
    background-color: transparent;
    opacity: 0;
    text-align: center;
    transform: translateY(50px);

    @keyframes fadeInUp {
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

export const Subtitle = styled.p`
    color: #a0a0a0;
    font-size: clamp(18px, 3vw, 32px);
    font-weight: 300;
    margin-bottom: 32px;
`;
