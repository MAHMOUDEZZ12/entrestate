
'use client';

// This page is deprecated in favor of /discover/search which uses Google CSE.
// It is kept for URL compatibility but can be removed if not needed.
import React from 'react';
import { useRouter } from 'next/navigation';

export default function DeprecatedDiscoverQueryPage() {
    const router = useRouter();
    React.useEffect(() => {
        // Redirect to the new search page
        const path = window.location.pathname;
        const query = path.split('/').pop();
        if (query) {
             router.replace(`/discover/search?q=${query}`);
        } else {
            router.replace('/discover');
        }
    }, [router]);
    
    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Redirecting to new search experience...</p>
        </div>
    );
}
