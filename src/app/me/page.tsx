
'use client';

import React, { useState, Suspense, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users2, Rss, Building, Sparkles, Wand2, Search, ArrowRight, Library, LayoutGrid, PlusCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { smartInputRouter } from '@/ai/flows/utility/smart-input-router';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import type { Project } from '@/types';
import { tools } from '@/lib/tools-client';
import { ProjectCard } from '@/components/ui/project-card';
import { dealsSmartPlanner } from '@/ai/flows/sales/deals-smart-planner';


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
    { type: 'DailyAction', title: 'Plan a new deal', description: 'Let the AI guide you step-by-step in creating your next winning deal strategy.', toolId: 'deals-smart-planner' },
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

function WorkspaceHome() {
    const { user } = useAuth();
    const [myProjects, setMyProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [addedApps, setAddedApps] = useState<string[]>([]);

    useEffect(() => {
        if(user) {
            const fetchProjects = async () => {
                setIsLoadingProjects(true);
                try {
                    const idToken = await user.getIdToken();
                    const response = await fetch('/api/user/projects', {
                        headers: { 'Authorization': `Bearer ${idToken}` }
                    });
                    const data = await response.json();
                    if (data.ok) {
                        setMyProjects(data.data);
                    }
                } catch(e) {
                    console.error("Failed to fetch user projects", e);
                } finally {
                    setIsLoadingProjects(false);
                }
            };
            fetchProjects();
        } else {
            setIsLoadingProjects(false);
        }
        
        try {
            const savedState = localStorage.getItem('addedApps');
            if (savedState) setAddedApps(JSON.parse(savedState));
        } catch (e) {
            console.error("Could not load app state from localStorage", e);
        }
    }, [user]);

    const myApps = tools.filter(tool => addedApps.includes(tool.id));

  return (
    <div className="p-4 md:p-10 space-y-12 container mx-auto">
      <SmartInput />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Today's Feed</h2>
            <CommunityFeed />
        </div>

        <div className="lg:col-span-1 space-y-8 sticky top-24">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Library className="h-5 w-5"/> My Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoadingProjects ? (
                        <div className="flex justify-center items-center h-24"><Loader2 className="animate-spin" /></div>
                    ) : myProjects.length > 0 ? (
                        <div className="space-y-3">
                            {myProjects.slice(0,3).map(p => (
                                <ProjectCard key={p.id} project={p} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground p-6">
                            <p className="mb-4">Your project library is empty.</p>
                             <Link href="/me/tool/projects-finder">
                                <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Projects</Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><LayoutGrid className="h-5 w-5"/> My Apps</CardTitle>
                </CardHeader>
                <CardContent>
                    {myApps.length > 0 ? (
                         <div className="grid grid-cols-2 gap-3">
                            {myApps.slice(0, 4).map(app => (
                                <Link key={app.id} href={app.href} className="block group">
                                     <div className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-center">
                                        <div className="p-3 rounded-lg text-white" style={{ backgroundColor: app.color }}>
                                           {React.cloneElement(app.icon, { className: 'h-6 w-6' })}
                                        </div>
                                        <p className="text-xs font-semibold truncate w-20">{app.dashboardTitle || app.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                         <div className="text-center text-muted-foreground p-6">
                            <p className="mb-4">No apps added to your workspace yet.</p>
                             <Link href="/me/marketing">
                                <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Go to Marketplace</Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}


export default function MePage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <WorkspaceHome />
        </Suspense>
    )
}

    