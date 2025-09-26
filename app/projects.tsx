'use client';

import { useProjectCardObserver } from '@hooks';

import {
    ProjectCard,
    ProjectGrid,
    ProjectIcon,
    RoutingLink,
    Section,
    SectionSubtitle,
    SectionTitle,
    TechStack,
    TechTag,
} from './projects-styles';

export default function Projects() {
    useProjectCardObserver();

    return (
        <Section id="projects">
            <SectionTitle>Featured Projects</SectionTitle>
            <SectionSubtitle>
                A collection of galactic-scale applications built with modern technologies
            </SectionSubtitle>

            <ProjectGrid>
                <RoutingLink href="/rebellion-dashboard">
                    <ProjectCard className="project-card">
                        <ProjectIcon>🚀</ProjectIcon>
                        <h3>Rebellion Dashboard</h3>
                        <p>
                            A real-time monitoring system for tracking Imperial fleet movements
                            across the galaxy. Built with React and WebSocket connections for live
                            updates.
                        </p>
                        <TechStack>
                            <TechTag>React</TechTag>
                            <TechTag>TypeScript</TechTag>
                            <TechTag>Next.js</TechTag>
                            <TechTag>Tailwind</TechTag>
                        </TechStack>
                    </ProjectCard>
                </RoutingLink>

                <RoutingLink href="/planetary-systems">
                    <ProjectCard className="project-card">
                        <ProjectIcon>🪐</ProjectIcon>
                        <h3>Planetary Search</h3>
                        <p>Find known planets, systems, and regions in the galaxy.</p>
                        <TechStack>
                            <TechTag>HTML</TechTag>
                            <TechTag>React</TechTag>
                            <TechTag>TypeScript</TechTag>
                            <TechTag>Emotion.js</TechTag>
                            <TechTag>Next.js</TechTag>
                        </TechStack>
                    </ProjectCard>
                </RoutingLink>

                <RoutingLink href="/retro-page">
                    <ProjectCard className="project-card">
                        <ProjectIcon>🌌</ProjectIcon>
                        <h3>Jedi Archive</h3>
                        <p>Travel back to a long, long time ago and a little closer galaxy.</p>
                        <TechStack>
                            <TechTag>HTML</TechTag>
                            <TechTag>React</TechTag>
                            <TechTag>TypeScript</TechTag>
                            <TechTag>Emotion.js</TechTag>
                            <TechTag>Next.js</TechTag>
                        </TechStack>
                    </ProjectCard>
                </RoutingLink>

                <ProjectCard className="project-card">
                    <ProjectIcon>🌌</ProjectIcon>
                    <h3>Galactic Trade Network</h3>
                    <p>
                        A decentralized marketplace for trading rare artifacts and resources between
                        star systems. Implements blockchain technology for secure transactions.
                    </p>
                    <TechStack>
                        <TechTag>Blockchain</TechTag>
                        <TechTag>Web3</TechTag>
                        <TechTag>Solidity</TechTag>
                        <TechTag>Next.js</TechTag>
                    </TechStack>
                </ProjectCard>

                <ProjectCard className="project-card">
                    <ProjectIcon>🤖</ProjectIcon>
                    <h3>Protocol Droid AI</h3>
                    <p>
                        A sophisticated chatbot trained on diplomatic protocols from across the
                        galaxy. Capable of translating between 6 million forms of communication.
                    </p>
                    <TechStack>
                        <TechTag>Python</TechTag>
                        <TechTag>TensorFlow</TechTag>
                        <TechTag>NLP</TechTag>
                        <TechTag>FastAPI</TechTag>
                    </TechStack>
                </ProjectCard>
            </ProjectGrid>
        </Section>
    );
}
