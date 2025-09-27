'use client';

import { ReactNode, useState } from 'react';

import { ContentWrapper, Footer, Hamburger, Line, Menu } from './styles';

type PageContainerProps = {
    children: ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Hamburger open={open} onClick={() => setOpen((prev) => !prev)}>
                <Line />
                <Line />
                <Line />
            </Hamburger>

            <Menu open={open}>
                <nav>
                    <a href="/">Home</a>
                    <a href="/rebellion-dashboard">Rebellion Dashboard</a>
                    <a href="/planetary-systems">Planetary Search</a>
                    <a href="/retro-page">Jedi Archive (Retro Page)</a>
                </nav>
            </Menu>

            <ContentWrapper>{children}</ContentWrapper>
            <Footer>Star Wars is TM & © Lucasfilm Ltd. All Rights Reserved</Footer>
        </div>
    );
}
