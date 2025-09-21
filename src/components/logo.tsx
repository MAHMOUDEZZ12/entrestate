
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.firebasestorage.app/o/entrestate.com%20logo%20agaist-10%20(4).png?alt=media&token=92958e4e-b603-4f3d-bf12-780e72362652';

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("flex items-center gap-3 group", className)}>
    <Image 
        src={LOGO_URL}
        alt="Entrestate Logo"
        width={240}
        height={55}
        className="h-14 w-auto object-contain"
    />
  </Link>
);
