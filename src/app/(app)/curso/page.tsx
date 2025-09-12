"use client";

import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LockedContent from "@/components/locked-content";
import FullPageLoader from "@/components/full-page-loader";
import { FileText, Youtube, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const aulasModulo1 = [
    {
        title: "Aula 1: O que é Persuasão?",
        description: "🧠 Leandro Karnal & Maytê Carvalho explicam o conceito central de persuasão de forma filosófica e social.",
        link: "#"
    },
    {
        title: "Aula 2: Como Falar de Forma Mais Convincente",
        description: "🗣️ Princípios de oratória e postura que tornam sua comunicação mais poderosa.",
        link: "#"
    },
    {
        title: "Aula 3: 4 Técnicas de Persuasão que Influenciam Pessoas",
        description: "🎯 Técnicas diretas, aplicáveis em qualquer conversa ou venda.",
        link: "#"
    },
    {
        title: "Aula 4: 10 Técnicas Rápidas para Melhorar sua Persuasão",
        description: "🚀 Checklist final com hacks mentais e de linguagem para aumentar seu poder de influência.",
        link: "#"
    }
];


export default function CursoPage() {
    const { userData, loading } = useAuth();

    if (loading) {
        return <FullPageLoader />;
    }

    return (
        <div className="container max-w-4xl py-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <h1 className="text-4xl font-bold font-headline tracking-tight">Seu Curso</h1>
                {userData?.acesso && (
                    <Badge variant={userData.acesso === 'pro' ? 'default' : 'secondary'} className="capitalize mt-2 sm:mt-0 bg-primary/20 text-primary border-primary/30">
                        Acesso {userData.acesso}
                    </Badge>
                )}
            </div>

            <div className="mb-8">
                <Image
                    src="https://i.postimg.cc/FsjDnr0q/rea-de-Membros.png"
                    alt="Capa do Módulo 1"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-lg object-cover"
                />
            </div>

            <Accordion type="single" collapsible className="w-full space-y-6">
                <AccordionItem value="item-1" className="border rounded-lg overflow-hidden">
                    <AccordionTrigger className="p-6 bg-secondary/30 hover:no-underline">
                        <CardTitle className="flex items-center gap-2 text-left"><Youtube className="text-primary" /> MÓDULO 1 – Introdução à Persuasão Mental</CardTitle>
                    </AccordionTrigger>
                    <AccordionContent className="p-0">
                        <div className="divide-y divide-border border-t">
                            {aulasModulo1.map((aula, index) => (
                                <div key={index} className="p-6 grid gap-4 sm:grid-cols-[1fr_auto] items-start">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold flex items-center gap-2"><Video size={16} /> {aula.title}</h3>
                                        <p className="text-muted-foreground text-sm">{aula.description}</p>
                                    </div>
                                    <Button asChild variant="outline" size="sm">
                                        <a href={aula.link}>Assistir</a>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {userData?.acesso === 'pro' ? (
                    <>
                        <AccordionItem value="item-2" className="border rounded-lg overflow-hidden">
                            <AccordionTrigger className="p-6 bg-secondary/30 hover:no-underline">
                                <CardTitle className="flex items-center gap-2 text-left"><Youtube className="text-primary" /> Módulo 2: Técnicas Avançadas</CardTitle>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="p-6">
                                    <div className="aspect-video w-full overflow-hidden rounded-lg border flex items-center justify-center bg-muted">
                                        <p className="text-muted-foreground">Em breve...</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border rounded-lg overflow-hidden">
                            <AccordionTrigger className="p-6 bg-secondary/30 hover:no-underline">
                                <CardTitle className="flex items-center gap-2 text-left"><FileText className="text-primary" /> Módulo 3: Folha de Dicas Exclusiva</CardTitle>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="p-6">
                                    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border flex items-center justify-center bg-muted">
                                        <p className="text-muted-foreground">Em breve...</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </>
                ) : (
                    <div className="mt-8">
                      <LockedContent />
                    </div>
                )}
            </Accordion>
        </div>
    );
}
