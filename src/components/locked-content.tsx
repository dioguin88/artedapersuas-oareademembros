import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

export default function LockedContent() {
    return (
        <Card className="bg-accent/10 border-accent/20 text-center animate-in fade-in-50 duration-500">
            <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 mb-4">
                    <Lock className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Content Locked</CardTitle>
                <CardDescription className="text-accent-foreground/80">
                    Upgrade your plan to unlock this module and get access to all exclusive PRO content.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild variant="destructive" className="rounded-2xl hover:brightness-110 transition-all transform hover:scale-105">
                    <Link href="/upsell">
                        Unlock PRO Access
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
