'use client';

import { useEffect } from 'react';

export function useProjectCardObserver() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const el = entry.target as HTMLElement;

                if (entry.isIntersecting) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                } else {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(50px)';
                }
            });
        }, observerOptions);

        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach((card, index) => {
            const el = card as HTMLElement;

            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';

            observer.observe(el);
        });

        return () => {
            observer.disconnect();
        };
    }, []);
}
