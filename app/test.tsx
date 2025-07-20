import { useEffect, useState } from 'react';

export default function Example({ userId }: { userId: string }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`/api/${userId}`)
            .then((res) => res.json())
            .then(setData);
    }, []); // ⛔ Should warn about missing `userId`

    return <div>{data}</div>;
}
