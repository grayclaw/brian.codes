'use client';

import React, { useEffect, useState } from 'react';

import { StarStyles } from './star-field-styles';

type Star = {
    left: string;
    top: string;
    width: string;
    height: string;
    animationDelay: string;
    animationDuration: string;
};

const GenerateStars = React.memo(function GenerateStars() {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        const starArray = [...Array(250)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 1}s`,
        }));
        setStars(starArray);
    }, []);

    return stars.map((star, i) => (
        <StarStyles
            key={i}
            style={{
                left: star.left,
                top: star.top,
                width: star.width,
                height: star.height,
                animationDelay: star.animationDelay,
                animationDuration: star.animationDuration,
            }}
        />
    ));
});

export default GenerateStars;
