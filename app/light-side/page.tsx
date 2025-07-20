'use client';

import {
    // HTMLInputTypeAttribute,
    useState,
    // useTransition,
} from 'react';

export default function LightSide() {
    // const [filteredList, setFilteredList] = useState<number[]>([]);
    const [inputList, setInputList] = useState<string>('');
    // const [isPending, startTransition] = useTransition();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputList(e.currentTarget.value);
        // startTransition(() => {
        //     // const initialList = inputList.split(',');
        //     // const shallowList = initialList.map((input: string) => Number.parseInt(input, 10));
        // });
    };

    return <input type="input" value={inputList} onChange={handleChange} />;
}
