
'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const Logo = ({ className }: { className?: string }) => (
    <Link href="/" aria-label="Go to Homepage">
        <svg
            className={cn("text-foreground h-7 w-auto", className)}
            viewBox="0 0 452 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M60.33 0V78H0V0H60.33ZM49.95 10.38H10.38V67.62H49.95V10.38Z"
                fill="currentColor"
            />
            <path
                d="M136.98 0V10.38H86.94V33.84H129.18V44.22H86.94V78H76.56V0H136.98Z"
                fill="currentColor"
            />
            <path
                d="M211.77 0V10.38H183.15V78H172.77V10.38H144.15V0H211.77Z"
                fill="currentColor"
            />
            <path
                d="M285.836 0V10.38H244.556V33.84H278.456V44.22H244.556V67.62H287.636V78H234.176V0H285.836Z"
                fill="currentColor"
            />
            <path
                d="M363.36 0V78H352.98L304.5 14.94V78H294.12V0H304.5L352.98 63.06V0H363.36Z"
                fill="currentColor"
            />
            <path
                d="M439.699 0V10.38H398.419V33.84H432.319V44.22H398.419V67.62H441.499V78H388.039V0H439.699Z"
                fill="currentColor"
            />
        </svg>
    </Link>
);
