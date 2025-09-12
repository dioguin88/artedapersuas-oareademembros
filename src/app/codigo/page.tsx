"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BrainCircuit } from 'lucide-react';
import FullPageLoader from '@/components/full-page-loader';

export default function CodigoPage() {
    const { user, userData, loading: authLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [codigo, setCodigo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.replace('/login');
            } else if (userData?.acesso) {
                router.replace('/home');
            }
        }
    }, [user, userData, authLoading, router]);

    const handleSaveCode = async () => {
        if (!user) return;
        if (!codigo) {
            toast({ variant: 'destructive', title: 'Por favor, insira um código.' });
            return;
        }
        setLoading(true);

        let acesso: 'pro' | 'teste' | '' = '';
        const codigoFormatado = codigo.trim().toUpperCase();

        if (codigoFormatado === 'PERSUASAO-PRO-2025') {
            acesso = 'pro';
        } else if (codigoFormatado === 'PERSUASAO-TSTR-2025') {
            acesso = 'teste';
        } else {
            toast({ variant: 'destructive', title: 'Código Inválido', description: 'Verifique seu código de acesso e tente novamente.' });
            setLoading(false);
            return;
        }

        try {
            await setDoc(doc(db, 'usuarios', user.uid), {
                email: user.email,
                uid: user.uid,
                acesso,
            }, { merge: true });

            toast({ title: 'Sucesso!', description: 'Seu acesso foi concedido.' });
            router.push('/home');
        } catch (error) {
            console.error("Error saving code:", error);
            toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível salvar seu nível de acesso. Por favor, tente novamente.' });
            setLoading(false);
        }
    };
    
    if (authLoading || (!authLoading && ( !user || userData?.acesso))) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        <BrainCircuit className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-headline">Último Passo</CardTitle>
                    <CardDescription>Insira seu código de acesso para desbloquear seu conteúdo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            id="codigo"
                            placeholder="Digite o código de acesso recebido em seu E-Mail"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <Button onClick={handleSaveCode} className="w-full rounded-2xl hover:brightness-110 transition-all" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Confirmar Código'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
