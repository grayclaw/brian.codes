import { Accessibility, Closure, PropagationBubbling, ReverseString } from '@learnings';

import './styles.css';

export default function Page() {
    return (
        <div className="p-4 mx-auto masonry">
            <Closure />
            <PropagationBubbling />
            <Accessibility />
            <ReverseString />
        </div>
    );
}
