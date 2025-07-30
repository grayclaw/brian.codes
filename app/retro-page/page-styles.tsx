'use client';

import Link from 'next/link';

import styled from '@emotion/styled';

export const Body = styled.div`
    background-color: black;
    background-image: url('https://t3.ftcdn.net/jpg/06/79/34/38/360_F_679343861_GSs8KaWbPgvsNDhyesQeZQBrjs5fcv3I.jpg');
    background-repeat: repeat;
    color: yellow;
    font-family: var(--font-family);
    font-weight: 500;
    margin: 0;
    min-height: 100vh;
    text-align: center;
`;

export const Button = styled.button`
    all: unset;
    border: 1px solid yellow;
    border-radius: 4px;
    cursor: pointer;
    margin: 16px 0;
    padding: 8px 16px;
`;

export const ContentBox = styled.div`
    background-color: rgba(0, 0, 0, 0.8);
    border: 3px solid yellow;
    font-size: var(--font-size-md);
    margin: 20px auto 32px;
    max-width: 600px;
    padding: 20px;
`;

export const Footer = styled.footer`
    font-size: var(--font-size-sm);
    font-weight: 500;
    margin-top: 50px;
`;

export const RoutingLink = styled(Link)`
    color: cyan;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const Title = styled.h1`
    font-size: 40px;
    margin-top: 20px;
    text-shadow: 2px 2px 5px red;
`;

export const ScrollingText = styled.div`
    box-sizing: border-box;
    color: yellow;
    display: block;
    overflow: hidden;
    padding: 10px 0;
    position: relative;
    white-space: nowrap;
    width: 100%;
`;

export const ScrollingSpan = styled.span`
    animation: scroll 20s linear infinite;
    display: inline-block;
    font-size: 40px;
    padding-left: 100%;
    @keyframes scroll {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-100%);
        }
    }
`;
