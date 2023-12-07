'use client';
import { ContextProvider } from '@/ui/context';
import { Login } from '@/ui/pages/Login';
import { Container } from '@mui/material';
import Image from 'next/image';

export default function LoginPage() {
    return (
        <ContextProvider>
            <Container
                sx={{
                    minHeight: '60vh',
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
                <br />
                <Login />
            </Container>
        </ContextProvider>
    );
}
