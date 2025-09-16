
'use client';

import React, { useState } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Sparkles, Building, BarChart, LayoutTemplate, ArrowRight, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { tools } from '@/lib/tools-client';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const popularQueries = [
    "Market trends in Dubai Marina",
    "Emaar Beachfront floor plans",
    "Generate a landing page for Sobha Hartland",
    "Compare Damac Hills 2 vs. Arabian Ranches",
];

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
                <CardTitle>Market Trend: {query}</CardTitle>
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


export default function DiscoverPage() {
    const { toast } = useToast();
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any[] | null>(null);
    const [searchCount, setSearchCount] = useState(0);
    const [showSignup, setShowSignup] = useState(false);
    const [email, setEmail] = useState('');

    const runSearch = () => {
        setIsLoading(true);
        setResults(null);

        // Simulate an AI-powered search and content generation
        setTimeout(() => {
            const lowerQuery = query.toLowerCase();
            let mockResults = [];

            // Intent 1: User is asking for a tool
            const toolKeywords = ['create', 'generate', 'build', 'design', 'edit', 'plan'];
            const foundTool = tools.find(t => 
                lowerQuery.includes(t.title.toLowerCase()) || 
                toolKeywords.some(kw => lowerQuery.includes(kw))
            );

            if (foundTool) {
                mockResults.push({ type: 'Tool', tool: foundTool });
            }

            // Intent 2: User is asking about market data
            if (lowerQuery.includes('market') || lowerQuery.includes('trend') || lowerQuery.includes('price')) {
                 mockResults.push({ type: 'Market', query: query });
            }
            
            // Intent 3: User is asking about a project
            if (lowerQuery.includes('emaar') || lowerQuery.includes('damac') || lowerQuery.includes('sobha')) {
                mockResults.push({ type: 'Project', project: { name: 'Emaar Beachfront', developer: 'Emaar', area: 'Dubai Harbour', status: 'Ready', priceFrom: 'AED 2.5M' }});
            }

            // Fallback for generic queries
            if (mockResults.length === 0) {
                 mockResults = [
                    { type: 'Tool', tool: tools.find(t => t.id === 'projects-finder') },
                    { type: 'Tool', tool: tools.find(t => t.id === 'market-reports') },
                    { type: 'Tool', tool: tools.find(t => t.id === 'landing-pages') },
                 ];
            }

            setResults(mockResults);
            setIsLoading(false);
        }, 2000);
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        if (searchCount > 0) {
            setShowSignup(true);
        } else {
            setSearchCount(prev => prev + 1);
            runSearch();
        }
    };
    
    const handleSignupAndSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast({ title: "Email required", description: "Please enter your email to create an account.", variant: "destructive"});
            return;
        }
        // Simulate account creation
        toast({ title: "Welcome!", description: "Your account has been created. Running your search now."});
        setShowSignup(false);
        setSearchCount(prev => prev + 1); // Increment to prevent modal on next search
        runSearch();
    }

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

                <div className="mt-16 w-full max-w-5xl">
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
                
                 <Dialog open={showSignup} onOpenChange={setShowSignup}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2"><UserPlus /> Enjoying the Discover experience?</DialogTitle>
                            <DialogDescription>
                                Create a free account to save your discoveries, access more tools, and continue searching.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSignupAndSearch} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <Button type="submit" className="w-full">Create Free Account & Continue</Button>
                        </form>
                    </DialogContent>
                </Dialog>

            </main>
            <LandingFooter />
        </div>
    );
}
