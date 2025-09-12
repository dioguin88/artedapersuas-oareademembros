import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="container flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-12">
            <Card className="w-full max-w-lg text-center animate-in fade-in-50 duration-500">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Welcome Back!</CardTitle>
                    <CardDescription>You're all set. Ready to dive into your content?</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="rounded-2xl hover:brightness-110 transition-all transform hover:scale-105">
                        <Link href="/curso">
                            Go to Course
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
