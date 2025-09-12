import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

export default function LockedContent() {
    return (
        <div className="bg-zinc-800 text-white rounded-xl p-6 text-center mt-10">
            <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2"><Lock size={20} /> Conteúdo Exclusivo PRO</h3>
            <p className="text-sm text-zinc-400 mb-4">Desbloqueie acesso completo a todos os módulos e materiais PRO.</p>
            <Button asChild variant="destructive" className="bg-red-600 hover:bg-red-700 transition hover:brightness-110 hover:animate-pulse">
                <Link href="/upsell">
                    Atualizar para PRO
                </Link>
            </Button>
        </div>
    );
}