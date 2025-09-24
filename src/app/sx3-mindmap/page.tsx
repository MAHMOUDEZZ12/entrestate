
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page has been moved to /gem. This component now just handles the redirect.
export default function SX3MindMapRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/gem');
    }, [router]);
    
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-4">Redirecting to the Gem Ecosystem Map...</p>
        </div>
    );
}
