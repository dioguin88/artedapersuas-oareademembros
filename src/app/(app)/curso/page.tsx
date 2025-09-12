"use client";

import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LockedContent from "@/components/locked-content";
import FullPageLoader from "@/components/full-page-loader";
import { FileText, Youtube } from "lucide-react";

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
                        <CardTitle className="flex items-center gap-2"><Youtube className="text-primary"/> Módulo 1: Fundamentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video w-full overflow-hidden rounded-lg border">
                           <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
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
                               <div className="aspect-video w-full overflow-hidden rounded-lg border">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/L_LUpnjgPso"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden animate-in fade-in-50 duration-500 delay-100">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><FileText className="text-primary"/> Módulo 3: Folha de Dicas Exclusiva</CardTitle>
                            </CardHeader>
                            <CardContent>
                               <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                        title="PDF Viewer"
                                        frameBorder="0"
                                    ></iframe>
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
