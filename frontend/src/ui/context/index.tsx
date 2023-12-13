import { PropsWithChildren } from 'react';
import { HTTPClientProvider, useHttpClient } from './HttpClientContext';
import { EvaluationServiceProvider, useEvaluationService } from './EvaluationServiceContext';
import { AuthenticationServiceProvider } from './AuthenticationServiceContext';
import { UserServiceProvider } from './UserServiceContext';

function ContextProvider({ children }: PropsWithChildren) {
    return (
        <>
            <HTTPClientProvider>
                <AuthenticationServiceProvider>
                    <UserServiceProvider>
                        <EvaluationServiceProvider>{children}</EvaluationServiceProvider>
                    </UserServiceProvider>
                </AuthenticationServiceProvider>
            </HTTPClientProvider>
        </>
    );
}

export { ContextProvider, useHttpClient, useEvaluationService };
