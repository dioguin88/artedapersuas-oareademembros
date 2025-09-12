"use client";

import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LockedContent from "@/components/locked-content";
import FullPageLoader from "@/components/full-page-loader";
import { FileText, Youtube, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            
            <div className="space-y-8">
                <Card className="overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Youtube className="text-primary"/> MÓDULO 1 – Introdução à Persuasão Mental</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
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
                    </CardContent>
                </Card>

                {userData?.acesso === 'pro' ? (
                    <>
                        <Card className="overflow-hidden animate-in fade-in-50 duration-500">
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Youtube className="text-primary"/> Módulo 2: Técnicas Avançadas</CardTitle>
                            </CardHeader>
                            <CardContent>
                               <div className="aspect-video w-full overflow-hidden rounded-lg border flex items-center justify-center bg-muted">
                                    <p className="text-muted-foreground">Em breve...</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden animate-in fade-in-50 duration-500 delay-100">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><FileText className="text-primary"/> Módulo 3: Folha de Dicas Exclusiva</CardTitle>
                            </CardHeader>
                            <CardContent>
                               <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border flex items-center justify-center bg-muted">
                                    <p className="text-muted-foreground">Em breve...</p>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <LockedContent />
                )}
            </div>
        </div>
    );
}
