import { useEffect, useState } from 'react';
import { useHttpClient } from '../context';

export function ExamplePage() {
    const { httpClient } = useHttpClient();
    const [messageArray, setMessageArray] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('useEffect client', httpClient);
                const result: any = await httpClient.get('http://localhost:3001/text/a');
                console.log('result', result);
                console.log('typeof result', typeof result);

                if (result?.texts !== undefined && Array.isArray(result?.texts)) {
                    setMessageArray(result.texts);
                }
            } catch (error) {
                console.log('error', error);
                setMessageArray(['no message received']);
            }
        };

        fetchData();
    }, [httpClient]);

    return (
        <div>
            <h1>
                {messageArray.map((message, index) => (
                    <span key={index}>{message}</span>
                ))}
            </h1>
        </div>
    );
}
