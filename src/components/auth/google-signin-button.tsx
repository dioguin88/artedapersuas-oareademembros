"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function GoogleSignInButton() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            console.error("Google sign in error", error);
            toast({
                variant: "destructive",
                title: "Falha ao Entrar",
                description: "Não foi possível entrar com o Google. Por favor, tente novamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant="outline" className="w-full rounded-2xl" onClick={handleSignIn} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 64.5C308.6 102.3 280.9 92 248 92c-71 0-129.2 58.2-129.2 129.2s58.2 129.2 129.2 129.2c79.2 0 117.2-59.8 122.3-92.4H248v-83.8h236.1c2.3 12.7 3.9 26.4 3.9 41.4z"></path></svg>
            }
            Entrar com Google
        </Button>
    );
}
