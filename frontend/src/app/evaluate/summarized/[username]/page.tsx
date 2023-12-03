'use client';
import { ContextProvider } from '@/ui/context';
import { SummarizedResultPage } from '@/ui/pages/SummarizedResultPage';

export default function SummarizedEvaluationRoute({ params }: { params: { username: string } }) {
    const username = params.username;
    return (
        <ContextProvider>
            <SummarizedResultPage username={username} />
        </ContextProvider>
    );
}
