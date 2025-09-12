"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { LogOut } from 'lucide-react';

export default function Header() {
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({ title: 'Sessão Encerrada', description: 'Você foi desconectado com sucesso.' });
            router.push('/login');
        } catch (error) {
            toast({ variant: 'destructive', title: 'Falha ao Sair', description: 'Não foi possível encerrar a sessão. Por favor, tente novamente.' });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                <Link href="/home" className="flex items-center gap-2">
                    <Logo className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-foreground">AccessAlly</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full">
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Sair</span>
                </Button>
            </div>
        </header>
    );
}
