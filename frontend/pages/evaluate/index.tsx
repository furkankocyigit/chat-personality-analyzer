import { ContextProvider } from '@/ui/context';
import { EvaluationResult } from '@/ui/pages/EvaluationResultPage';

export default function ExampleRoute() {
    return (
        <ContextProvider>
            <EvaluationResult />
        </ContextProvider>
    );
}
