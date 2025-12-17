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

            <Menu open={open} className="bg-blue-600">
                <nav>
                    <a href="/">Home</a>
                    <a href="/resume">Behind the Code</a>
                    <a href="/rebellion-dashboard">Rebellion Dashboard</a>
                    <a href="/planetary-systems">Planetary Search</a>
                    <a href="/retro-page">Way Back Machine (Retro Page)</a>
                    <a href="/code-learning">Learning Code</a>
                </nav>
            </Menu>

            <ContentWrapper>{children}</ContentWrapper>
            <Footer>Star Wars is TM & © Lucasfilm Ltd. All Rights Reserved</Footer>
        </div>
    );
}
