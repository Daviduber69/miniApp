import React, { useEffect, useState } from 'react';


const MyComponent: React.FC = () => {
  //  const apiUrl = process.env.REACT_APP_API_URL;
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            if (!apiUrl) {
                console.error('API URL is not defined');
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/v1/auth/login`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchData();
    }, [apiUrl]);

    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Data:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};


export default MyComponent;