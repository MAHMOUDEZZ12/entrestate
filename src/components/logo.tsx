
import { cn } from '@/lib/utils';
import Image from 'next/image';

const LOGO_URL_DARK = 'https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.appspot.com/o/entrestate.com%20logo%20agaist-14.png?alt=media&token=7f6a4769-8534-4c14-b3f3-d08ca1f9aa5a';
const LOGO_URL_LIGHT = 'https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.appspot.com/o/entrestate.com%20logo%20agaist-13.png?alt=media&token=dc10fcca-c93a-407b-aa42-2c0517d70c63';


export const Logo = ({ className }: { className?: string }) => (
  <div className={cn("inline-flex items-center gap-3 group h-10", className)}>
    {/* Light mode logo */}
    <Image 
        src={LOGO_URL_LIGHT}
        alt="Entrestate Logo"
        width={140}
        height={32}
        className="object-contain h-8 w-auto dark:hidden"
        priority
    />
    {/* Dark mode logo */}
     <Image 
        src={LOGO_URL_DARK}
        alt="Entrestate Logo"
        width={140}
        height={32}
        className="object-contain h-8 w-auto hidden dark:block"
        priority
    />
  </div>
);
