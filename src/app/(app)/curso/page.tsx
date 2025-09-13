
"use client";

import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LockedContent from "@/components/locked-content";
import FullPageLoader from "@/components/full-page-loader";
import { FileText, Youtube, Video, Book, ChevronDown, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

const aulasModulo1 = [
    {
        id: "aula1",
        title: "📌 Aula 1: O que é Persuasão?",
        description: "Leandro Karnal & Maytê Carvalho explicam o conceito central de persuasão de forma filosófica e social.",
        embedUrl: "https://www.youtube.com/embed/PYQs6z5wsgw?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula2",
        title: "🗣 Aula 2: Como Falar de Forma Mais Convincente",
        description: "Princípios de oratória e postura que tornam sua comunicação mais poderosa.",
        embedUrl: "https://www.youtube.com/embed/9q4fjyKlSFc?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula3",
        title: "🎯 Aula 3: 4 Técnicas de Persuasão que Influenciam Pessoas",
        description: "Técnicas diretas, aplicáveis em qualquer conversa ou venda.",
        embedUrl: "https://www.youtube.com/embed/Nc1D5aCaiOc?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula4",
        title: "🚀 Aula 4: 10 Técnicas Rápidas para Melhorar sua Persuasão",
        description: "Checklist final com hacks mentais e de linguagem para aumentar seu poder de influência.",
        embedUrl: "https://www.youtube.com/embed/ETXKYNeI4FU?rel=0&modestbranding=1&showinfo=0&controls=1"
    }
];

const aulasModulo2 = [
    {
        id: "aula1",
        title: "🧠 O QUE É HIPNOSE CONVERSACIONAL?",
        description: "Descubra o fundamento da técnica para influenciar de forma sutil e poderosa.",
        embedUrl: "https://www.youtube.com/embed/oZK4bjuS0Mg?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula2",
        title: "✨ Hipnose Conversacional: 3 Simples Passos EXPLICADOS!",
        description: "Um guia prático para aplicar a hipnose em qualquer conversa.",
        embedUrl: "https://www.youtube.com/embed/5FVgPcgBUIw?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula3",
        title: "💰 Hipnose Conversacional Para Vendas - Copywriting",
        description: "Aprenda a usar gatilhos hipnóticos para criar textos de venda irresistíveis.",
        embedUrl: "https://www.youtube.com/embed/URUrECR89_Q?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula4",
        title: "🔧 Estratégias de PNL com Hipnose Conversacional",
        description: "Combine PNL e Hipnose para potencializar sua capacidade de persuasão.",
        embedUrl: "https://www.youtube.com/embed/ecmsswqVJig?rel=0&modestbranding=1&showinfo=0&controls=1"
    }
];

const aulasModulo3 = [
    {
        id: "aula1",
        title: "🔺 Triângulo da Persuasão: Ethos | Pathos | Logos",
        description: "A base da retórica de Aristóteles para construir argumentos inabaláveis.",
        embedUrl: "https://www.youtube.com/embed/ZHQdhtvcnBU?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula2",
        title: "👑 As Armas da Persuasão – Autoridade",
        description: "Como o gatilho da autoridade pode fazer as pessoas confiarem e seguirem suas ideias.",
        embedUrl: "https://www.youtube.com/embed/TPdiUoa1HNc?rel=0&modestbranding=1&showinfo=0&controls=1"
    }
];


type ProgressoModulo = {
    [key: string]: boolean;
};

type ProgressoGeral = {
    modulo1?: ProgressoModulo;
    modulo2?: ProgressoModulo;
    modulo3?: ProgressoModulo;
}

export default function CursoPage() {
    const { user, userData, loading } = useAuth();
    const [progresso, setProgresso] = useState<ProgressoGeral>({});
    const [pdfModalOpen, setPdfModalOpen] = useState(false);

    useEffect(() => {
        if (!user) return;

        const progressoRef = doc(db, "progresso", user.uid);
        const unsubscribe = onSnapshot(progressoRef, (docSnap) => {
            if (docSnap.exists()) {
                setProgresso(docSnap.data());
            }
        });

        return () => unsubscribe();
    }, [user]);

    const marcarConcluida = async (moduloId: keyof ProgressoGeral, aulaId: string) => {
        if (!user) return;
        const progressoRef = doc(db, "progresso", user.uid);
        
        const statusAtual = progresso[moduloId]?.[aulaId] || false;
        const novoStatus = !statusAtual;
        const campo = `${moduloId}.${aulaId}`;

        try {
            const snap = await getDoc(progressoRef);
            if (snap.exists()) {
                 await updateDoc(progressoRef, { [campo]: novoStatus });
            } else {
                 await setDoc(progressoRef, { [moduloId]: { [aulaId]: novoStatus } });
            }
        } catch (error) {
            console.error("Erro ao marcar aula como concluída:", error);
        }
    };
    
    const calcularProgresso = (progressoModulo: ProgressoModulo | undefined, totalAulas: number) => {
        const aulasConcluidas = progressoModulo ? Object.values(progressoModulo).filter(Boolean).length : 0;
        const progressoPercentual = totalAulas > 0 ? (aulasConcluidas / totalAulas) * 100 : 0;
        return { aulasConcluidas, progressoPercentual };
    };

    const progressoModulo1 = calcularProgresso(progresso.modulo1, aulasModulo1.length);
    const progressoModulo2 = calcularProgresso(progresso.modulo2, aulasModulo2.length);
    const progressoModulo3 = calcularProgresso(progresso.modulo3, aulasModulo3.length);

    if (loading) {
        return <FullPageLoader />;
    }

    const ModuloUI = ({
        moduloId,
        titulo,
        capaSrc,
        aulas,
        progressoModulo,
        totalAulas,
    }: {
        moduloId: keyof ProgressoGeral;
        titulo: string;
        capaSrc: string;
        aulas: typeof aulasModulo1;
        progressoModulo: { aulasConcluidas: number; progressoPercentual: number; };
        totalAulas: number;
    }) => (
        <div className="bg-zinc-900 rounded-xl shadow-lg overflow-hidden mb-6 border border-yellow-500">
            <Image
                src={capaSrc}
                alt={`Capa do ${titulo}`}
                width={1200}
                height={338}
                className="w-full h-auto max-h-[338px] object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4">
                <h2 className="text-white font-bold text-xl mb-4">{titulo}</h2>
                <div className="px-4 pb-2">
                    <p className="text-xs text-muted-foreground mb-2">
                        {progressoModulo.aulasConcluidas}/{totalAulas} aulas concluídas
                    </p>
                    <Progress value={progressoModulo.progressoPercentual} className="h-2" />
                </div>
                <div className="space-y-2 p-2">
                    {aulas.map((aula) => (
                        <details key={aula.id} className="bg-secondary/30 p-4 rounded-xl group">
                            <summary className="text-foreground font-semibold cursor-pointer list-none flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        id={`${moduloId}-${aula.id}`}
                                        checked={!!progresso[moduloId]?.[aula.id]}
                                        onCheckedChange={() => marcarConcluida(moduloId, aula.id)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <label htmlFor={`${moduloId}-${aula.id}`} className="cursor-pointer">{aula.title}</label>
                                </div>
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
        </div>
    );


    return (
        <div className="container max-w-3xl py-12 px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <h1 className="text-4xl font-bold font-headline tracking-tight">Seu Curso</h1>
            </div>

            <div className="space-y-6">
                
                <ModuloUI
                    moduloId="modulo1"
                    titulo="MÓDULO 1 – Introdução à Persuasão Mental"
                    capaSrc="https://i.postimg.cc/nLtZfcWD/Chat-GPT-Image-12-de-set-de-2025-20-31-10.png"
                    aulas={aulasModulo1}
                    progressoModulo={progressoModulo1}
                    totalAulas={aulasModulo1.length}
                />
                
                <hr className="border-t border-muted/20 my-6" />

                <div className="bg-zinc-900 rounded-xl border border-yellow-500 shadow-lg mb-6 overflow-hidden">
                    <Image
                        src="https://i.postimg.cc/65JNvQ91/Untitled-design.jpg"
                        alt="Módulo Extra"
                        width={1200}
                        height={338}
                        className="w-full h-auto sm:max-h-[338px] object-cover transition-transform duration-300 hover:scale-105"
                    />

                    <div className="p-4">
                        <h2 className="text-white text-xl font-bold mb-2">
                        📘 Módulo Extra – Técnicas Iniciais de Persuasão + Leitura de Expressão
                        </h2>

                        <p className="text-zinc-300 text-sm mb-4">
                        Acesse um material interativo em PDF para dominar os fundamentos da
                        leitura de expressões faciais, linguagem corporal e técnicas mentais
                        de persuasão.
                        </p>

                        <button
                        onClick={() => setPdfModalOpen(true)}
                        className="bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-400 transition"
                        >
                        Abrir PDF em Tela Cheia
                        </button>
                    </div>
                </div>

                {pdfModalOpen && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
                    <div className="bg-zinc-900 rounded-lg overflow-hidden max-w-5xl w-full h-[90vh] relative shadow-2xl border border-yellow-500">
                        <button
                        className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-yellow-400 transition z-10"
                        onClick={() => setPdfModalOpen(false)}
                        >
                        ✕
                        </button>

                        <iframe
                        src="https://gamma.app/embed/tihmtnjgfpd558i"
                        className="w-full h-full"
                        allow="fullscreen"
                        title="PDF – Técnicas de Persuasão"
                        ></iframe>
                    </div>
                    </div>
                )}


                <hr className="border-t border-muted/20 my-6" />

                {userData?.acesso === 'pro' ? (
                    <div className="space-y-6">
                        <ModuloUI
                            moduloId="modulo2"
                            titulo="Módulo 2: Técnicas de Hipnose Conversacional"
                            capaSrc="https://i.postimg.cc/K8SCRp5X/Chat-GPT-Image-12-de-set-de-2025-20-38-00.png"
                            aulas={aulasModulo2}
                            progressoModulo={progressoModulo2}
                            totalAulas={aulasModulo2.length}
                        />
                         <ModuloUI
                            moduloId="modulo3"
                            titulo="Módulo 3: Como Criar Presença de Autoridade Instantânea"
                            capaSrc="https://i.postimg.cc/65JNvQ91/Untitled-design.jpg"
                            aulas={aulasModulo3}
                            progressoModulo={progressoModulo3}
                            totalAulas={aulasModulo3.length}
                        />

                         <Card className="bg-card rounded-xl shadow-lg overflow-hidden p-4">
                             <CardTitle className="flex items-center gap-2 text-left text-xl text-muted-foreground"><FileText /> Módulo 4: Scripts Prontos: Influência, Venda e Negociação</CardTitle>
                             <div className="p-4 pt-2 text-center text-muted-foreground">Em breve...</div>
                        </Card>
                         <Card className="bg-card rounded-xl shadow-lg overflow-hidden p-4">
                             <CardTitle className="flex items-center gap-2 text-left text-xl text-muted-foreground"><Video /> Módulo 5: Persuasão em Alta Performance (situações reais)</CardTitle>
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

    