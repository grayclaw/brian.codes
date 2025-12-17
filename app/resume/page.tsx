'use client';

import { JSX } from 'react';
import { DiCss3, DiHtml5, DiJsBadge, DiReact, DiSass, DiScrum, DiW3C } from 'react-icons/di';
import { FaBookOpen, FaRocket, FaTools } from 'react-icons/fa';
import { SiJest, SiNextdotjs, SiRedux, SiTestinglibrary, SiTypescript } from 'react-icons/si';

import { StarField } from '@components';

type SectionProps = {
    icon?: JSX.Element;
    title: string;
};

function Section({ title, icon }: SectionProps) {
    return (
        <h3 className="text-blue-500 text-2xl font-bold mb-6 flex items-center gap-2">
            {icon}
            {title}
        </h3>
    );
}

type BadgeProps = {
    icon?: JSX.Element;
    label: string;
};

function Badge({ label, icon }: BadgeProps) {
    return (
        <span className="flex items-center gap-2 bg-blue-600 hover:bg-blue-800 text-white text-md px-4 py-1 rounded-full mr-2 mb-2">
            {icon}
            {label}
        </span>
    );
}

type CardProps = {
    description: string;
    icon?: JSX.Element;
    last?: boolean;
    title: string;
};

function Card({ title, description, icon, last }: CardProps) {
    return (
        <div
            className={`bg-gray-800 hover:bg-gray-700 transition-colors p-4 rounded-lg shadow-md ${last ? 'mb-8' : 'mb-4'}`}
        >
            <div className="flex items-center gap-2 mb-2 text-blue-400 text-xl font-semibold">
                {icon}
                {title}
            </div>
            <p className="text-white text-base">{description}</p>
        </div>
    );
}

export default function Page() {
    return (
        <>
            <StarField />
            <div className="body text-white text-lg font-[Arial] mt-[2%] mx-[10%] text-left">
                <div className="max-w-[740px]">
                    <h1 className="text-blue-500 text-3xl font-extrabold mb-3">
                        Brian L. Homer Jr.
                    </h1>
                    <p className="mb-8">
                        West Jordan, Utah &#124;{' '}
                        <a href="mailto:brian.homer.jr@gmail.com">brian.homer.jr@gmail.com</a>{' '}
                        &#124;{' '}
                        <a
                            className="underline"
                            href="https://www.linkedin.com/in/brian-homer-jr-07309751/"
                            target="_blank"
                        >
                            LinkedIn Profile
                        </a>
                    </p>

                    <Section title="Career Highlights" icon={<FaRocket />} />
                    <Card
                        title="Scalable Product Pages"
                        description="Led development of high-traffic product pages using Next.js, improving performance and accessibility."
                    />
                    <Card
                        title="Ratings & Reviews App"
                        description="Architected a scalable app with real-time RESTful API integration for customer feedback."
                    />
                    <Card
                        title="Internal Tooling"
                        description="Built a UI-based tool replacing CLI workflows, reducing development time by 20%."
                        last
                    />

                    <Section title="Tech Stack & Tools" icon={<FaTools />} />
                    <div className="flex flex-wrap mb-8">
                        {[
                            { name: 'React.js', icon: <DiReact /> },
                            { name: 'Next.js', icon: <SiNextdotjs /> },
                            { name: 'TypeScript', icon: <SiTypescript /> },
                            { name: 'JavaScript', icon: <DiJsBadge /> },
                            { name: 'HTML5', icon: <DiHtml5 /> },
                            { name: 'CSS3', icon: <DiCss3 /> },
                            { name: 'SASS', icon: <DiSass /> },
                            { name: 'Redux', icon: <SiRedux /> },
                            { name: 'Context API' },
                            { name: 'Jotai' },
                            { name: 'Jest', icon: <SiJest /> },
                            { name: 'Testing Library', icon: <SiTestinglibrary /> },
                            { name: 'CI/CD' },
                            { name: 'WCAG', icon: <DiW3C /> },
                            { name: 'Agile', icon: <DiScrum /> },
                        ].map(({ name: skill, icon }) => (
                            <Badge key={skill} label={skill} icon={icon} />
                        ))}
                    </div>

                    <Section title="Learning & Growth" icon={<FaBookOpen />} />
                    <Card
                        title="Python & Node.js"
                        description="Currently studying backend technologies to expand full-stack capabilities."
                    />
                    <Card
                        title="Algorithm Practice"
                        description="Daily problem-solving via LeetCode and GeeksforGeeks to strengthen system-level thinking."
                    />
                    <Card
                        title="Tech Trends"
                        description="Staying current with MDN, CSS-Tricks, and JavaScript Weekly."
                        last
                    />
                </div>
            </div>
        </>
    );
}
