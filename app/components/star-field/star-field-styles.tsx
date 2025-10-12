'use client';

import styled from '@emotion/styled';

export const StarStyles = styled.div`
    animation: pulse 2s infinite;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    z-index: -1;

    @keyframes pulse {
        0%,
        100% {
            opacity: 0.3;
        }
        50% {
            opacity: 1;
        }
    }
`;

export const StarfieldStyles = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
`;
