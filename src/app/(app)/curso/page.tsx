
"use client";

import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LockedContent from "@/components/locked-content";
import FullPageLoader from "@/components/full-page-loader";
import { FileText, Youtube, Video, Book } from "lucide-react";

const aulasModulo1 = [
    {
        title: "📌 Aula 1: O que é Persuasão?",
        description: "Leandro Karnal & Maytê Carvalho explicam o conceito central de persuasão de forma filosófica e social.",
        embedUrl: "https://www.youtube.com/embed/PYQs6z5wsgw?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        title: "🗣 Aula 2: Como Falar de Forma Mais Convincente",
        description: "Princípios de oratória e postura que tornam sua comunicação mais poderosa.",
        embedUrl: "https://www.youtube.com/embed/9q4fjyKlSFc?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        title: "🎯 Aula 3: 4 Técnicas de Persuasão que Influenciam Pessoas",
        description: "Técnicas diretas, aplicáveis em qualquer conversa ou venda.",
        embedUrl: "https://www.youtube.com/embed/Nc1D5aCaiOc?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        title: "🚀 Aula 4: 10 Técnicas Rápidas para Melhorar sua Persuasão",
        description: "Checklist final com hacks mentais e de linguagem para aumentar seu poder de influência.",
        embedUrl: "https://www.youtube.com/embed/ETXKYNeI4FU?rel=0&modestbranding=1&showinfo=0&controls=1"
    }
];


export default function CursoPage() {
    const { userData, loading } = useAuth();

    if (loading) {
        return <FullPageLoader />;
    }

    return (
        <div className="container max-w-3xl py-12 px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <h1 className="text-4xl font-bold font-headline tracking-tight">Seu Curso</h1>
            </div>

            <div className="space-y-6">
                <Card className="bg-card rounded-xl shadow-lg overflow-hidden">
                    <Image
                        src="https://i.postimg.cc/nLtZfcWD/Chat-GPT-Image-12-de-set-de-2025-20-31-10.png"
                        alt="Capa do Módulo 1"
                        width={1200}
                        height={338}
                        className="w-full h-auto max-h-[338px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="p-4">
                        <CardTitle className="flex items-center gap-2 text-xl mb-4"><Youtube className="text-primary" /> MÓDULO 1 – Introdução à Persuasão Mental</CardTitle>
                        <div className="space-y-2">
                             {aulasModulo1.map((aula, index) => (
                                <details key={index} className="bg-secondary/30 p-4 rounded-xl group">
                                    <summary className="text-foreground font-semibold cursor-pointer list-none flex items-center justify-between">
                                        {aula.title}
                                        <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
                                    </summary>
                                    <div className="mt-4 text-muted-foreground text-sm space-y-3">
                                        <p>{aula.description}</p>
                                        <div className="aspect-video">
                                            <iframe
                                                className="w-full h-full rounded"
                                                src={aula.embedUrl}
                                                title={aula.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </Card>
                
                <hr className="border-t border-muted/20 my-6" />

                <Card className="bg-card rounded-xl shadow-lg overflow-hidden">
                     <Image
                        src="https://i.postimg.cc/65JNvQ91/Untitled-design.jpg"
                        alt="Capa do Módulo Extra"
                        width={1200}
                        height={338}
                        className="w-full h-auto max-h-[338px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                     <div className="p-4">
                        <CardTitle className="flex items-center gap-2 text-left text-xl text-muted-foreground"><Book /> Módulo Extra – Técnicas Iniciais de Persuasão + Leitura de Expressão</CardTitle>
                        <div className="p-4 pt-2 text-center text-muted-foreground">Em breve...</div>
                     </div>
                </Card>

                <hr className="border-t border-muted/20 my-6" />

                {userData?.acesso === 'pro' ? (
                    <div className="space-y-6">
                        <Card className="bg-card rounded-xl shadow-lg overflow-hidden p-4">
                            <CardTitle className="flex items-center gap-2 text-left text-xl text-muted-foreground"><Youtube /> Módulo 2: Técnicas Avançadas</CardTitle>
                            <div className="p-4 pt-2 text-center text-muted-foreground">Em breve...</div>
                        </Card>

                        <Card className="bg-card rounded-xl shadow-lg overflow-hidden p-4">
                             <CardTitle className="flex items-center gap-2 text-left text-xl text-muted-foreground"><FileText /> Módulo 3: Folha de Dicas Exclusiva</CardTitle>
                             <div className="p-4 pt-2 text-center text-muted-foreground">Em breve...</div>
                        </Card>
                    </div>
                ) : (
                    <LockedContent />
                )}
            </div>
        </div>
    );
}

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
)

    