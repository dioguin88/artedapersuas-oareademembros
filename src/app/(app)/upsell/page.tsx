import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function UpsellPage() {
    const upsellImage = PlaceHolderImages.find(p => p.id === 'upsell-hero');

    const proFeatures = [
        "Acesso a todos os módulos atuais e futuros",
        "Conteúdo bônus e recursos exclusivos",
        "Materiais para download e folhas de dicas",
        "Suporte prioritário da nossa equipe",
    ];

    return (
        <div className="container max-w-4xl py-12">
            <div className="grid gap-8">
                {upsellImage && (
                     <div className="w-full aspect-video relative overflow-hidden rounded-2xl">
                        <Image
                            src={upsellImage.imageUrl}
                            alt={upsellImage.description}
                            data-ai-hint={upsellImage.imageHint}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                     </div>
                )}
               
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold font-headline tracking-tighter text-primary">Seja PRO e Desbloqueie Tudo</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Seu acesso 'Teste' é apenas o começo. Faça o upgrade para PRO para ter a experiência completa e acelerar seus resultados.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">O Que Você Vai Receber:</h3>
                        <ul className="space-y-3">
                            {proFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="rounded-2xl border bg-secondary/30 p-8 text-center space-y-4">
                        <h4 className="text-2xl font-bold">Oferta Por Tempo Limitado</h4>
                        <p className="text-5xl font-bold tracking-tight text-primary">R$29,90</p>
                        <p className="text-muted-foreground">Pagamento único. Acesso vitalício.</p>
                        <Button size="lg" className="w-full rounded-2xl text-lg py-6 hover:brightness-110 transition-all transform hover:scale-105">
                            {/* Replace with your actual payment link */}
                            <a href="https://www.ggcheckout.com/checkout/v2/CFyJgHWtmg8FpQNuncfw?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=" target="_blank" rel="noopener noreferrer">
                                Desbloquear Acesso Completo Agora
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
