'use client';

import { useProjectCardObserver } from '@hooks/useProjectCardObserver';

import {
    ProjectCard,
    ProjectGrid,
    ProjectIcon,
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
                <ProjectCard className="project-card">
                    <ProjectIcon>🚀</ProjectIcon>
                    <h3>Rebellion Dashboard</h3>
                    <p>
                        A real-time monitoring system for tracking Imperial fleet movements across
                        the galaxy. Built with React and WebSocket connections for live updates.
                    </p>
                    <TechStack>
                        <TechTag>React</TechTag>
                        <TechTag>TypeScript</TechTag>
                        <TechTag>Next.js</TechTag>
                        <TechTag>Emotion.js</TechTag>
                    </TechStack>
                </ProjectCard>

                <ProjectCard className="project-card">
                    <ProjectIcon>⚡</ProjectIcon>
                    <h3>Lightsaber Configurator</h3>
                    <p>
                        An interactive 3D tool for customizing lightsaber designs with real-time
                        rendering and physics simulation. Features over 500 unique combinations.
                    </p>
                    <TechStack>
                        <TechTag>Three.js</TechTag>
                        <TechTag>WebGL</TechTag>
                        <TechTag>Vue.js</TechTag>
                        <TechTag>Node.js</TechTag>
                    </TechStack>
                </ProjectCard>

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
