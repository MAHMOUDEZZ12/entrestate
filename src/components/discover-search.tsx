
'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DiscoverSearch() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    
    // This is a public-facing CX ID. It is safe to be here.
    const cx = 'b5924ea43734440c8';

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://cse.google.com/cse.js?cx=${cx}`;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [cx]);

    return (
        <div className="w-full">
            <div className="gcse-searchresults-only" data-queryparametername="q" data-linktarget="_blank"></div>
        </div>
    );
}
