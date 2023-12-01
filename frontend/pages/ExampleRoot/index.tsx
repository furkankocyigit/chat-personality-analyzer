import { ContextProvider } from '@/ui/context';
import { ExamplePage } from '@/ui/pages/ExamplePage';

export default function ExampleRoute() {
    return (
        <ContextProvider>
            <ExamplePage />
        </ContextProvider>
    );
}
