
'use client';

import React, { useState } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Sparkles, Building, BarChart, LayoutTemplate } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const popularQueries = [
    "Market trends in Dubai Marina",
    "Emaar Beachfront floor plans",
    "Generate a landing page for Sobha Hartland",
    "Compare Damac Hills 2 vs. Arabian Ranches",
];

const SearchResultCard = ({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Link href={href}>
            <Card className="h-full hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all">
                <CardHeader className="flex-row items-center gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg">
                        {icon}
                    </div>
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    </motion.div>
);


export default function DiscoverPage() {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any[] | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setIsLoading(true);
        setResults(null);

        // Simulate an AI-powered search and content generation
        setTimeout(() => {
            const mockResults = [
                { icon: <Building className="h-6 w-6" />, title: `Project Details: ${query}`, description: "Explore units, prices, and handover dates for this project.", href: "/dashboard/tool/projects-finder" },
                { icon: <BarChart className="h-6 w-6" />, title: `Market Report: ${query}`, description: "Generate an in-depth market analysis PDF for this area.", href: "/dashboard/tool/market-reports" },
                { icon: <LayoutTemplate className="h-6 w-6" />, title: `Landing Page for ${query}`, description: "Create a dedicated, high-converting landing page.", href: "/dashboard/tool/landing-pages" },
            ];
            setResults(mockResults);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col items-center">
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

                <div className="w-full max-w-2xl sticky top-24 z-20">
                     <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Search for anything... e.g., "Emaar Beachfront"' 
                            className="w-full h-14 pl-12 pr-4 text-lg rounded-full shadow-lg"
                        />
                    </form>
                    <div className="text-center mt-4 space-x-2">
                        {popularQueries.map((q, i) => (
                             <Button key={i} variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => setQuery(q)}>
                                {q}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="mt-16 w-full max-w-4xl">
                     <AnimatePresence>
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center text-center text-muted-foreground"
                            >
                                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                                <p className="font-semibold">Searching the suite...</p>
                                <p className="text-sm">Generating intelligent results for you.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                     <AnimatePresence>
                        {results && (
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {results.map((res, index) => (
                                    <SearchResultCard key={index} {...res} />
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>

            </main>
            <LandingFooter />
        </div>
    );
}
