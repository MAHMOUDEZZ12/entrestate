
'use client';

import React from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This is a client component that will redirect to the new, authenticated path.
// The actual content has been moved to /solutions/[slug].
export default function SolutionRedirectPage() {
    const router = useRouter();
    const { slug } = useParams<{ slug: string }>();

    React.useEffect(() => {
        if (slug) {
            router.replace(`/solutions/${slug}`);
        } else {
            router.replace('/solutions');
        }
    }, [slug, router]);
    
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-4">Redirecting...</p>
        </div>
    );
}
