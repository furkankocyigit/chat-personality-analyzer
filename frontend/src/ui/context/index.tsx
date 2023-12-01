import { PropsWithChildren } from 'react';
import { HTTPClientProvider, useHttpClient } from './HttpClientContext';

function ContextProvider({ children }: PropsWithChildren) {
    return (
        <>
            <HTTPClientProvider>{children}</HTTPClientProvider>
        </>
    );
}

export { ContextProvider, useHttpClient };
