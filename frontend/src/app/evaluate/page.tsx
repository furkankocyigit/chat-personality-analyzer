'use client';
import Auth from '@/ui/HOC/Auth';
import { ContextProvider } from '@/ui/context';
import { EvaluationResult } from '@/ui/pages/EvaluationResultPage';
import { useSearchParams } from 'next/navigation';

function EvaluationRoute() {
    const searchParams = useSearchParams();
    const username = searchParams.get('username');

    if (!username) {
        return <div> No username found </div>;
    }
    return (
        <ContextProvider>
            <EvaluationResult username={username} />
        </ContextProvider>
    );
}

export default Auth(EvaluationRoute);
