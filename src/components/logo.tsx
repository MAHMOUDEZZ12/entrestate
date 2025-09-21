
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.appspot.com/o/entrestate-logo.png?alt=media&token=4242d50e-b833-4f3c-b7b5-21245c3639ae';

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("inline-flex items-center gap-3 group h-10", className)}>
    <Image 
        src={LOGO_URL}
        alt="Entrestate Logo"
        width={140}
        height={32}
        className="object-contain h-8 w-auto"
        priority
    />
  </Link>
);
