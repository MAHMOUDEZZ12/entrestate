
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Sparkles, Building, BarChart, LayoutTemplate, ArrowRight, UserPlus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { tools } from '@/lib/tools-client';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Input } from '@/components/ui/input';


const mockChartData = [
  { name: 'Jan', value: 2.1 },
  { name: 'Feb', value: 2.3 },
  { name: 'Mar', value: 2.2 },
  { name: 'Apr', value: 2.5 },
  { name: 'May', value: 2.4 },
  { name: 'Jun', value: 2.6 },
  { name: 'Jul', value: 2.8 },
];

const ResultComponents = {
    Tool: ({ tool }: { tool: any }) => (
        <Card className="h-full hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all col-span-1 md:col-span-1 flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    {React.cloneElement(tool.icon, { className: 'h-6 w-6' })}
                </div>
                <div>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                </div>
            </CardHeader>
            <CardFooter className="mt-auto">
                 <Link href={`/dashboard/tool/${tool.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                        Go to Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    ),
    Project: ({ project }: { project: any }) => (
        <Card className="h-full hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all col-span-1 md:col-span-1 flex flex-col">
             <CardHeader className="flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    <Building className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle>Project: {project.name}</CardTitle>
                    <CardDescription>{project.developer} - {project.area}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm">Status: <span className="font-semibold">{project.status}</span></p>
                <p className="text-sm">Price From: <span className="font-semibold">{project.priceFrom}</span></p>
            </CardContent>
            <CardFooter className="mt-auto grid grid-cols-2 gap-2">
                 <Link href="/dashboard/tool/landing-pages">
                    <Button variant="outline" className="w-full text-xs h-auto py-2">Generate Landing Page</Button>
                 </Link>
                 <Link href="/dashboard/tool/meta-ads-copilot">
                    <Button variant="outline" className="w-full text-xs h-auto py-2">Create Ad Campaign</Button>
                 </Link>
            </CardFooter>
        </Card>
    ),
    Market: ({ query }: { query: string }) => (
        <Card className="h-full col-span-1 md:col-span-2 flex flex-col">
            <CardHeader>
                <CardTitle>Market Trend: {decodeURIComponent(query)}</CardTitle>
                <CardDescription>Live price index trend for properties in this area.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                 <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={mockChartData}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 0.2', 'dataMax + 0.2']} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
            <CardFooter className="mt-auto grid grid-cols-2 gap-2">
                 <Link href="/dashboard/tool/market-reports">
                    <Button variant="outline" className="w-full text-xs h-auto py-2">Generate Full Report (PDF)</Button>
                 </Link>
                 <Link href="/dashboard/tool/instagram-content-creator">
                    <Button variant="outline" className="w-full text-xs h-auto py-2">Create Social Post about this Trend</Button>
                 </Link>
            </CardFooter>
        </Card>
    ),
};

const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-full col-span-1 md:col-span-1 flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-60" />
                </div>
            </CardHeader>
            <CardFooter className="mt-auto">
                <Skeleton className="h-10 w-32" />
            </CardFooter>
        </Card>
        <Card className="h-full col-span-1 md:col-span-1 flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
                 <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-40" />
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
            </CardContent>
            <CardFooter className="mt-auto grid grid-cols-2 gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    </div>
);

export default function DiscoverResultsPage() {
    const params = useParams();
    const router = useRouter();
    const initialQuery = params.query as string || '';
    const [searchQuery, setSearchQuery] = useState(decodeURIComponent(initialQuery));
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState<any[] | null>(null);

    useEffect(() => {
        const runSearch = async (q: string) => {
            if (!q) return;
            setIsLoading(true);
            setResults(null);

            try {
                 const response = await fetch('/api/run', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        toolId: 'discover-engine',
                        payload: { query: q }
                    })
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Search failed");
                }
                
                const processedResults = (data.results || []).map((res: any) => {
                    if (res.type === 'Tool' && res.toolId) {
                        const tool = tools.find(t => t.id === res.toolId);
                        return tool ? { type: 'Tool', tool } : null;
                    }
                    return res;
                }).filter(Boolean);

                setResults(processedResults);

            } catch (error) {
                console.error("Search failed:", error);
                 setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (initialQuery) {
            runSearch(decodeURIComponent(initialQuery));
        } else {
            setIsLoading(false);
        }
    }, [initialQuery]);

     const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        router.push(`/discover/${encodeURIComponent(searchQuery.trim())}`);
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="mb-12">
                    <form onSubmit={handleSearch} className="relative z-10 mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='e.g., "create an ad for Emaar Beachfront"' 
                            className="w-full h-14 pl-12 pr-4 text-lg rounded-full shadow-md"
                        />
                         <button type="submit" className="hidden" aria-hidden="true">Submit</button>
                    </form>
                    <p className="text-muted-foreground">Showing results for:</p>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
                        {decodeURIComponent(initialQuery)}
                    </h1>
                </div>

                <div className="w-full">
                    <AnimatePresence>
                        {isLoading && (
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <p className="font-semibold">The AI is searching the market...</p>
                                </div>
                                <LoadingSkeleton />
                            </motion.div>
                        )}
                    </AnimatePresence>

                     <AnimatePresence>
                        {results && (
                             <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                             >
                                {results.map((res, index) => {
                                    const Component = ResultComponents[res.type as keyof typeof ResultComponents];
                                    return (
                                       <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                          {Component ? <Component {...res} /> : null}
                                       </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                 {!isLoading && results?.length === 0 && initialQuery && (
                     <div className="text-center py-16 text-muted-foreground">
                        <p>No results found for &quot;{decodeURIComponent(initialQuery)}&quot;.</p>
                     </div>
                 )}
            </main>
            <LandingFooter />
        </div>
    );
}

    
