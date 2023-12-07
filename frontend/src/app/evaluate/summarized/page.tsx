'use client';
import { ContextProvider } from '@/ui/context';
import Auth from '@/ui/HOC/Auth';
import { SummarizedResultPage } from '@/ui/pages/SummarizedResultPage';
import { useSearchParams } from 'next/navigation';

function SummarizedEvaluationRoute() {
    const searchParams = useSearchParams();
    const username = searchParams.get('username');

    if (!username) {
        return <div> No username found </div>;
    }
    return (
        <ContextProvider>
            <SummarizedResultPage username={username} />
        </ContextProvider>
    );
}

export default Auth(SummarizedEvaluationRoute);
