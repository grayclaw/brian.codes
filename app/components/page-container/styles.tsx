import styled from '@emotion/styled';

export const Line = styled.span`
    width: 30px;
    height: 3px;
    background-color: var(--white);
    margin: 5px auto;
    transition: all 0.3s ease-in-out;
`;

export const Hamburger = styled.button<{ open: boolean }>`
    all: unset;
    cursor: pointer;
    display: block;
    padding: 10px;
    z-index: 20;
    position: fixed;
    top: 1rem;
    right: 1rem;

    span {
        background-color: var(--white);
        display: block;
        height: 3px;
        margin: 5px auto;
        transition: all 0.3s ease-in-out;
        width: 30px;
    }

    ${({ open }) =>
        open &&
        `
      span:nth-of-type(1) { transform: rotate(45deg) translate(5px, 5px); }
      span:nth-of-type(2) { opacity: 0; }
      span:nth-of-type(3) { transform: rotate(-45deg) translate(6px, -6px); }
    `}
`;

export const Menu = styled.div<{ open: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    width: 20vw;
    height: 0;
    background: var(--gray-800);
    color: white;
    overflow: hidden;
    transition: height 0.4s ease;
    z-index: 15;

    nav {
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    ${({ open }) => open && `height: 220px;`}
`;

export const ContentWrapper = styled.main`
    padding: 2rem;
    padding-bottom: 4rem;
`;

export const Footer = styled.footer`
    margin-bottom: 2rem;
`;
