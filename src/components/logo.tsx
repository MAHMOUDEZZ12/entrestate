
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.firebasestorage.app/o/entrestate.com%20logo-10%20(1).png?alt=media&token=3fda1757-c752-4fae-a7b3-c50e8435b17a';

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("flex items-center gap-3 group", className)}>
    <Image 
        src={LOGO_URL}
        alt="Entrestate Logo"
        width={140}
        height={32}
        className="h-8 w-auto object-contain"
    />
  </Link>
);
