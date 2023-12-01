'use client';
import { ContextProvider } from '@/ui/context';
import { EvaluationResult } from '@/ui/pages/EvaluationResultPage';

export default function EvaluationRoute({ params }: { params: { username: string } }) {
    const username = params.username;
    return (
        <ContextProvider>
            <EvaluationResult username={username} />
        </ContextProvider>
    );
}
