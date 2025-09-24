
'use client';

import React, { useState, Suspense } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users2, Rss, Building, Sparkles, Wand2, Search, ArrowRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { smartInputRouter } from '@/ai/flows/utility/smart-input-router';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { solutions } from '@/lib/solutions-data';

function SmartInput() {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleAction = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input) return;
        setIsLoading(true);
        try {
            const result = await smartInputRouter({ query: input });
            
            toast({
                title: `AI Intent: ${result.intent}`,
                description: `Routing to the best tool for your request...`
            });

            switch (result.intent) {
                case 'Search':
                    router.push(`/me/discover?q=${encodeURIComponent(input)}`);
                    break;
                case 'Command':
                    if (result.toolId) {
                        router.push(`/me/tool/${result.toolId}`);
                    } else {
                         router.push('/me/marketing');
                    }
                    break;
                case 'Post':
                default:
                     router.push('/me/community');
                    break;
            }

        } catch (e: any) {
            toast({ title: "Error", description: e.message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
            setInput('');
        }
    };

    return (
        <Card className="w-full max-w-3xl mx-auto shadow-2xl border-primary/20 ring-1 ring-primary/10">
            <CardContent className="p-6">
                <form onSubmit={handleAction} className="relative">
                    <Wand2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="What do you want to create, find, or do today?"
                        className="w-full h-14 pl-12 pr-28 text-lg rounded-full"
                    />
                    <Button 
                        type="submit"
                        size="lg" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                        disabled={isLoading}
                    >
                         {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}


const mockFeedItems = [
    { type: 'DailyAction', title: 'Generate a Market Report for JVC', description: 'JVC is showing high search interest this week. Generate a report to share with potential investors.', toolId: 'market-reports' },
    { type: 'UserPost', user: 'Ali T.', content: 'Just closed a deal in Dubai Hills using the Deal Analyzer. The ROI projections were spot on and helped convince the client. Highly recommend this tool!' },
    { type: 'NewProject', projectName: 'Volta by DAMAC', area: 'Downtown Dubai', description: 'A new luxury high-rise focused on wellness and active living has just been added to the Market Library.' },
    { type: 'AppUpdate', appName: 'AI Video Presenter', update: 'Now supports custom virtual backgrounds. Try it now!' },
];

function CommunityFeed() {
    return (
        <div className="w-full space-y-6">
            {mockFeedItems.map((item, index) => {
                 if (item.type === 'UserPost') {
                    return (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="text-lg">{item.user} shared a note</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">"{item.content}"</p>
                            </CardContent>
                        </Card>
                    )
                }
                 if (item.type === 'NewProject') {
                    return (
                        <Card key={index} className="bg-primary/10 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><Building className="h-5 w-5"/> New Project Alert</CardTitle>
                                <CardDescription>{item.projectName} in {item.area}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{item.description}</p>
                            </CardContent>
                        </Card>
                    )
                }
                if (item.type === 'DailyAction') {
                    return (
                        <Card key={index} className="bg-accent/10 border-accent/20">
                            <CardHeader>
                                 <CardTitle className="text-lg flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent"/> Daily Action Idea</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </CardContent>
                             <CardFooter>
                                <Link href={`/me/tool/${item.toolId}`}>
                                    <Button>Click to Run <ArrowRight className="ml-2 h-4 w-4"/></Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    )
                 }
                 return null;
            })}
        </div>
    );
}

function CommunityHub() {
  return (
    <div className="p-4 md:p-10 space-y-16 container mx-auto">
       <PageHeader
        title="Community Hub"
        description="Your intelligent starting point. Ask the AI, see what's new, and act on today's opportunities."
        icon={<Users2 className="h-8 w-8"/>}
      >
        <Link href="/me/discover">
            <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Go to Discovery Search
            </Button>
        </Link>
      </PageHeader>
      
      {/* Block 1 */}
      <SmartInput />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Block 2 */}
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Today's Feed</h2>
            <CommunityFeed />
        </div>

        {/* Block 3 */}
        <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Our Solutions</h2>
            <div className="space-y-4">
                {solutions.map(solution => (
                    <Link href={`/me/solutions/${solution.slug}`} key={solution.slug}>
                        <Card className="hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <CardTitle>{solution.title}</CardTitle>
                                <CardDescription>{solution.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}


export default function MePage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <CommunityHub />
        </Suspense>
    )
}
