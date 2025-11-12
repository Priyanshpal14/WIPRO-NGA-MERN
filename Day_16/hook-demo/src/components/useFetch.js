//  we can create custom hooks to fetch data from an API
import { useState, useEffect, use } from 'react';
export const useFetch = (url) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [url]);
    return data;
}
