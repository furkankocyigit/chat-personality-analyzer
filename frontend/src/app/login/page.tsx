'use client';
import { Login } from '@/ui/pages/Login';
import { Backdrop, Box, CircularProgress, Container } from '@mui/material';
import { blue } from '@mui/material/colors';
import Image from 'next/image';

export default function LoginPage() {
    return (
        <div>
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
                <Box sx={{ width: '50%' }}>
                    <Login />
                </Box>
            </Container>

            {/*will be implemented when authentication is implemented*/}
            <Backdrop open={false}>
                <CircularProgress
                    sx={{
                        color: blue,
                        marginLeft: '50%',
                        marginRight: '50%',
                    }}
                />
            </Backdrop>
        </div>
    );
}
