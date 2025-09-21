
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const DiscoverPage = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        
        // Navigate to the dynamic results page
        router.push(`/discover/${encodeURIComponent(query.trim())}`);
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col items-center justify-center">
                <div className="text-center mb-12">
                    <div className="inline-block p-4 mb-6 text-white rounded-2xl bg-gradient-to-br from-primary to-accent">
                        <Sparkles className="h-12 w-12" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                        Discover Your Next Move
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
                        This is more than a search bar. Ask for a project, a service, or a market trend, and get intelligent, actionable results.
                    </p>
                </div>

                <div className="w-full max-w-2xl">
                     <div className="relative group">
                         <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-pulse"></div>
                         <form onSubmit={handleSearch} className="relative z-10">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder='e.g., "create an ad for Emaar Beachfront"' 
                                className="w-full h-14 pl-12 pr-4 text-lg rounded-full shadow-lg"
                            />
                        </form>
                     </div>
                </div>
            </main>
        </div>
    );
}

export default DiscoverPage;

