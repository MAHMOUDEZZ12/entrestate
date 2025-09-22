'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const Logo = ({ className }: { className?: string }) => (
    <Link href="/" aria-label="Go to Homepage" className={cn("text-2xl font-bold font-heading tracking-tighter text-foreground hover:text-primary transition-colors", className)}>
        Entrestate
    </Link>
);
