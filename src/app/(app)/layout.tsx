"use client";

import { useEffect } from 'react';
import { usePathname, redirect } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import FullPageLoader from '@/components/full-page-loader';
import Header from '@/components/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { user, userData, loading } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                redirect('/login');
            } else if (!userData?.acesso && pathname !== '/codigo') {
                redirect('/codigo');
            }
        }
    }, [user, userData, loading, pathname]);

    if (loading || !user || (!userData?.acesso && pathname !== '/codigo')) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
