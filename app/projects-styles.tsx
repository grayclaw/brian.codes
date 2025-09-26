'use client';

import Link from 'next/link';

import styled from '@emotion/styled';

export const ProjectCard = styled.div`
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    padding: 40px;
    position: relative;
    transition: all 0.4s ease;

    h3 {
        color: #fff;
        font-size: 24px;
        margin-bottom: 12px;
    }

    p {
        color: #a0a0a0;
        line-height: 1.6;
        margin-bottom: 20px;
    }

    &::before {
        background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
        content: '';
        height: 200%;
        left: -50%;
        opacity: 0;
        position: absolute;
        top: -50%;
        transition: opacity 0.3s ease;
        width: 200%;
    }

    &:hover::before {
        opacity: 1;
    }

    &:hover {
        border-color: rgba(0, 212, 255, 0.3);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
        // transform: translateY(-10px);
    }
`;

export const ProjectGrid = styled.div`
    display: grid;
    gap: 40px;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    margin-top: 80px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ProjectIcon = styled.div`
    align-items: center;
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    border-radius: 15px;
    display: flex;
    font-size: 24px;
    height: 60px;
    justify-content: center;
    margin-bottom: 20px;
    width: 60px;
`;

export const RoutingLink = styled(Link)`
    text-decoration: none;
`;

export const Section = styled.section`
    margin: 0 auto;
    max-width: 1200px;
    padding: 120px 20px;

    @media (max-width: 768px) {
        padding: 80px 20px;
    }
`;

export const SectionSubtitle = styled.p`
    color: #666;
    font-size: 20px;
    margin: 0 auto;
    max-width: 600px;
    text-align: center;
`;

export const SectionTitle = styled.h2`
    text-align: center;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    background: linear-gradient(135deg, #fff, #a0a0a0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
`;

export const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const TechTag = styled.span`
    background: rgba(0, 212, 255, 0.2);
    border-radius: 20px;
    border: 1px solid rgba(0, 212, 255, 0.3);
    color: #00d4ff;
    font-size: 14px;
    padding: 6px 12px;
`;
