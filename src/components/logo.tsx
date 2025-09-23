
'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const Logo = ({ className, href = "/" }: { className?: string, href?: string }) => {
    const content = (
        <div className={cn("text-2xl font-bold font-heading tracking-tighter text-foreground hover:text-primary transition-colors", className)}>
            Entrestate
        </div>
    );

    return (
        <Link href={href} aria-label="Go to Homepage">
            {content}
        </Link>
    );
};
