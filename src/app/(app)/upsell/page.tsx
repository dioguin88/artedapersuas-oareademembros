import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function UpsellPage() {
    const upsellImage = PlaceHolderImages.find(p => p.id === 'upsell-hero');

    const proFeatures = [
        "Access to all current and future modules",
        "Exclusive bonus content and resources",
        "Downloadable materials and cheat sheets",
        "Priority support from our team",
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
                    <h1 className="text-4xl lg:text-5xl font-bold font-headline tracking-tighter text-primary">Go PRO and Unlock Everything</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Your 'Teste' access is just the beginning. Upgrade to PRO to get the complete experience and accelerate your results.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">What You'll Get:</h3>
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
                        <h4 className="text-2xl font-bold">Limited Time Offer</h4>
                        <p className="text-5xl font-bold tracking-tight text-primary">$97</p>
                        <p className="text-muted-foreground">One-time payment. Lifetime access.</p>
                        <Button size="lg" className="w-full rounded-2xl text-lg py-6 hover:brightness-110 transition-all transform hover:scale-105">
                            {/* Replace with your actual payment link */}
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                Unlock Full Access Now
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
