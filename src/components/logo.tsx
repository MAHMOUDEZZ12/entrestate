
'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const LOGO_URL_DARK = 'https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.appspot.com/o/entrestate.com%20logo%20agaist-14.png?alt=media&token=7f6a4769-8534-4c14-b3f3-d08ca1f9aa5a';
const LOGO_URL_LIGHT = 'https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.appspot.com/o/entrestate.com%20logo%20agaist-13-light.png?alt=media&token=5a72c1c2-3e2c-4b69-86d1-b55250468903';


export const Logo = ({ className }: { className?: string }) => (
  <div className={cn("relative inline-block h-8 w-[140px]", className)}>
    <Image 
        src={LOGO_URL_LIGHT}
        alt="Entrestate Logo"
        fill
        className="object-contain dark:hidden"
        priority
    />
    <div 
        className="hidden dark:block h-full w-full bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${LOGO_URL_DARK})` }}
        role="img"
        aria-label="Entrestate Logo"
    />
  </div>
);
