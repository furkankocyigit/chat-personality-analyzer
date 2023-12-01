import { PropsWithChildren } from 'react';
import { HTTPClientProvider, useHttpClient } from './HttpClientContext';
import { EvaluationServiceProvider, useEvaluationService } from './EvaluationServiceContext';

function ContextProvider({ children }: PropsWithChildren) {
    return (
        <>
            <HTTPClientProvider>
                <EvaluationServiceProvider>{children}</EvaluationServiceProvider>
            </HTTPClientProvider>
        </>
    );
}

export { ContextProvider, useHttpClient, useEvaluationService };
