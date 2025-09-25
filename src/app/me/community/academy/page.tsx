
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page has been moved to the public site at /academy.
// This component now just handles the redirect.
export default function AcademyRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/academy');
    }, [router]);
    
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-4">Redirecting to the Academy...</p>
        </div>
    );
}
