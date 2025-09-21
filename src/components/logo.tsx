
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.firebasestorage.app/o/entrestate.com%20logo%20agaist-10%20(4).png?alt=media&token=92958e4e-b603-4f3d-bf12-780e72362652';

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("inline-flex items-center gap-3 group h-10", className)}>
    <Image 
        src={LOGO_URL}
        alt="Entrestate Logo"
        width={140}
        height={32}
        className="object-contain"
        priority
    />
  </Link>
);
