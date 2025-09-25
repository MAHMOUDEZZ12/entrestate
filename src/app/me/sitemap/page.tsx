
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page has been moved. This component now just handles the redirect.
export default function SitemapRedirectPage() {
    const router = useRouter();

    React.useEffect(() => {
        router.replace('/gem/sitemap');
    }, [router]);
    
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-4">Redirecting...</p>
        </div>
    );
}
