'use client';

import Link from 'next/link';
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
                    <Link href="/">Home</Link>
                    <Link href="/resume">Behind the Code</Link>
                    <Link href="/rebellion-dashboard">Rebellion Dashboard</Link>
                    <Link href="/planetary-systems">Planetary Search</Link>
                    <Link href="/retro-page">Way Back Machine (Retro Page)</Link>
                    <Link href="/code-learning">Learning Code</Link>
                </nav>
            </Menu>

            <ContentWrapper>{children}</ContentWrapper>
            <Footer>Star Wars is TM & © Lucasfilm Ltd. All Rights Reserved</Footer>
        </div>
    );
}
