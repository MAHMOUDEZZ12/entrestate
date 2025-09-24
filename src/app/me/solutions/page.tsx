
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page has been moved. This component now just handles the redirect to the new, public path.
export default function SolutionsRedirectPage() {
    const router = useRouter();

    React.useEffect(() => {
        router.replace('/solutions');
    }, [router]);
    
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-4">Redirecting to our Solutions Hub...</p>
        </div>
    );
}
