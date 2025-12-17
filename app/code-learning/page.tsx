'use client';

import { Accessibility, Closure, PropagationBubbling, ReverseString } from '@learnings';

import { useBreakpoint } from '@hooks';

import './styles.css';

export default function Page() {
    const { xl } = useBreakpoint();
    let columns = 1;
    if (xl) {
        columns = 2;
    }
    console.log(`columns:`, columns);

    return (
        <div className={`p-4 mx-auto grid grid-cols-${columns} gap-2`}>
            <Closure />
            <PropagationBubbling />
            <Accessibility />
            <ReverseString />
        </div>
    );
}
