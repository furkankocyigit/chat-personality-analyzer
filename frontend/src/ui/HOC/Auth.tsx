'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Auth = <P extends object>(Component: React.ComponentType<P>) => {
    const AuthenticatedComponent = (props: P) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
            }
        }, [router]);

        return <Component {...props} />;
    };
    return AuthenticatedComponent;
};

export default Auth;
