import { ContextProvider } from '@/ui/context';
import { EvaluationResult } from '@/ui/pages/ExamplePage';

export default function ExampleRoute() {
    return (
        <ContextProvider>
            <EvaluationResult />
        </ContextProvider>
    );
}
