import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-background border-t border-border/50">
            <div className="container mx-auto py-4 px-4 flex justify-center items-center text-center">
                <p className="text-xs text-muted-foreground">
                    © {currentYear} Renato Miranda ·{' '}
                    <Link href="#" className="hover:text-primary transition-colors">
                        Suporte
                    </Link>
                </p>
            </div>
        </footer>
    );
}