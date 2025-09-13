
"use client";

import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LockedContent from "@/components/locked-content";
import FullPageLoader from "@/components/full-page-loader";
import { FileText, Youtube, Video, Book, ChevronDown, Check, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

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
    },
     {
        id: "aula3",
        title: "🌐 Sua Presença Digital Criando Autoridade",
        description: "Aprenda a construir e projetar autoridade no ambiente online para se destacar.",
        embedUrl: "https://www.youtube.com/embed/hhManfbWKZ8?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula4",
        title: "⚖️ A Diferença entre Autoritária e Autoridade",
        description: "Entenda a distinção crucial para liderar e influenciar de forma positiva e respeitada.",
        embedUrl: "https://www.youtube.com/embed/yd7_KHtb7HY?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula5",
        title: "🎤 Como se Comunicar com Autoridade",
        description: "Técnicas de comunicação verbal e não verbal para transmitir confiança e credibilidade.",
        embedUrl: "https://www.youtube.com/embed/rB9PVf-yEko?rel=0&modestbranding=1&showinfo=0&controls=1"
    }
];

const aulasModulo4 = [
    {
        id: "aula1",
        title: "✍️ Scripts de Vendas que Multiplicam Sua Conversão",
        description: "Modelos prontos e adaptáveis de scripts para abordar clientes e fechar mais vendas.",
        embedUrl: "https://www.youtube.com/embed/qTkXjbsQJ4Q?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula2",
        title: "📞 4 passos para criar um script de cobrança ativa",
        description: "Aprenda a estruturar uma abordagem de cobrança eficaz e profissional, mantendo o bom relacionamento.",
        embedUrl: "https://www.youtube.com/embed/rZR7q331vKE?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula3",
        title: "📱 Script de Vendas Para WhatsApp Poderoso",
        description: "Domine a arte de vender pelo WhatsApp com um roteiro que gera conversas e conversões.",
        embedUrl: "https://www.youtube.com/embed/Sx4ghv7h_HM?rel=0&modestbranding=1&showinfo=0&controls=1"
    }
];

const aulasModulo5 = [
    {
        id: "aula1",
        title: "🏆 Os Segredos da Alta Performance",
        description: "Insights de um especialista para alcançar o máximo de seu potencial pessoal e profissional.",
        embedUrl: "https://www.youtube.com/embed/pZN7K6_lSVI?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula2",
        title: "🤝 O Poder das Equipes de Alta Performance",
        description: "Como construir, motivar e liderar equipes que entregam resultados extraordinários.",
        embedUrl: "https://www.youtube.com/embed/UZqwtkKkoGE?rel=0&modestbranding=1&showinfo=0&controls=1"
    },
    {
        id: "aula3",
        title: "🚀 Palestra “Alta Performance: como alcançar a sua?”",
        description: "Uma palestra inspiradora com estratégias práticas para você elevar seu desempenho em todas as áreas da vida.",
        embedUrl: "https://www.youtube.com/embed/RPUsuQCbOww?rel=0&modestbranding=1&showinfo=0&controls=1"
    }
];

const pdfsPro = {
    modulo2: {
        title: "Desvende o Poder da Hipnose",
        embedUrl: "https://gamma.app/embed/mpeb4bott56xoov"
    },
    modulo3: {
        title: "Módulo 3: Presença de Autoridade",
        embedUrl: "https://gamma.app/embed/61m4mlhd92pywv1"
    },
    modulo4: {
        title: "Módulo 4: Scripts de Venda e Negociação",
        embedUrl: "https://gamma.app/embed/rd003chsc002c9g"
    },
    modulo5: {
        title: "Módulo 5: Guia de Aplicação Prática",
        embedUrl: "https://gamma.app/embed/0d8l35us0yaceuh"
    },
}

type ProgressoModulo = {
    [key: string]: boolean;
};

type ProgressoGeral = {
    modulo1?: ProgressoModulo;
    modulo2?: ProgressoModulo;
    modulo3?: ProgressoModulo;
    modulo4?: ProgressoModulo;
    modulo5?: ProgressoModulo;
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
    const progressoModulo4 = calcularProgresso(progresso.modulo4, aulasModulo4.length);
    const progressoModulo5 = calcularProgresso(progresso.modulo5, aulasModulo5.length);

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
        pdfInfo,
    }: {
        moduloId: keyof ProgressoGeral;
        titulo: string;
        capaSrc: string;
        aulas: typeof aulasModulo1;
        progressoModulo: { aulasConcluidas: number; progressoPercentual: number; };
        totalAulas: number;
        pdfInfo?: { title: string; embedUrl: string; };
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
                {pdfInfo && (
                    <div className="text-center p-4">
                       <Button asChild>
                           <a href={pdfInfo.embedUrl} target="_blank" rel="noopener noreferrer">
                                Abrir PDF em Tela Cheia
                           </a>
                       </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                            Material de apoio em PDF.
                        </p>
                    </div>
                )}
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

                {userData?.acesso === 'pro' ? (
                    <div className="space-y-6">
                        <ModuloUI
                            moduloId="modulo2"
                            titulo="Módulo 2: Técnicas de Hipnose Conversacional"
                            capaSrc="https://i.postimg.cc/bYW3Y6xQ/M-dulo-2.png"
                            aulas={aulasModulo2}
                            progressoModulo={progressoModulo2}
                            totalAulas={aulasModulo2.length}
                            pdfInfo={pdfsPro.modulo2}
                        />
                         <ModuloUI
                            moduloId="modulo3"
                            titulo="Módulo 3: Como Criar Presença de Autoridade Instantânea"
                            capaSrc="https://i.postimg.cc/Mp85VvrH/M-dulo-3.png"
                            aulas={aulasModulo3}
                            progressoModulo={progressoModulo3}
                            totalAulas={aulasModulo3.length}
                            pdfInfo={pdfsPro.modulo3}
                        />

                         <ModuloUI
                            moduloId="modulo4"
                            titulo="Módulo 4: Scripts Prontos: Influência, Venda e Negociação"
                            capaSrc="https://i.postimg.cc/L6PvJzDG/M-dulo-4.png"
                            aulas={aulasModulo4}
                            progressoModulo={progressoModulo4}
                            totalAulas={aulasModulo4.length}
                            pdfInfo={pdfsPro.modulo4}
                        />
                         <ModuloUI
                            moduloId="modulo5"
                            titulo="Módulo 5: Persuasão em Alta Performance (situações reais)"
                            capaSrc="https://i.postimg.cc/y6kLHqZ1/M-dulo-5.png"
                            aulas={aulasModulo5}
                            progressoModulo={progressoModulo5}
                            totalAulas={aulasModulo5.length}
                            pdfInfo={pdfsPro.modulo5}
                        />
                        <div className="bg-zinc-900 rounded-xl shadow-lg p-6 border border-yellow-500 text-center">
                            <h2 className="text-white font-bold text-2xl mb-4 flex items-center justify-center gap-2">
                                <Star className="text-yellow-400" /> Bônus Exclusivos (Acesso PRO)
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
                                    <h3 className="text-lg font-semibold text-foreground">📘 Mini Curso de Comunicação Assertiva</h3>
                                    <Button asChild>
                                        <a href="#" target="_blank" rel="noopener noreferrer">
                                            Abrir PDF em Tela Cheia
                                        </a>
                                    </Button>
                                </div>
                                <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
                                    <h3 className="text-lg font-semibold text-foreground">📙 Guia Prático de Gatilhos Mentais Avançados</h3>
                                    <Button asChild>
                                        <a href="#" target="_blank" rel="noopener noreferrer">
                                            Abrir PDF em Tela Cheia
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <LockedContent />
                )}

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
            </div>
        </div>
    );
}

    