'use client';
import Auth from '@/ui/HOC/Auth';
import { ContextProvider } from '@/ui/context';
import { HomePage } from '@/ui/pages/HomePage';

function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ContextProvider>
                <HomePage />
            </ContextProvider>
        </main>
    );
}

export default Auth(Home);
