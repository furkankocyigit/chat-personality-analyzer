import { PropsWithChildren } from 'react';
import { HTTPClientProvider, useHttpClient } from './HttpClientContext';
import { EvaluationServiceProvider, useEvaluationService } from './EvaluationServiceContext';
import { AuthenticationServiceProvider } from './AuthenticationServiceContext';

function ContextProvider({ children }: PropsWithChildren) {
    return (
        <>
            <HTTPClientProvider>
                <AuthenticationServiceProvider>
                    <EvaluationServiceProvider>{children}</EvaluationServiceProvider>
                </AuthenticationServiceProvider>
            </HTTPClientProvider>
        </>
    );
}

export { ContextProvider, useHttpClient, useEvaluationService };
