
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { LayoutGrid, Library, PlusCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import type { Project } from '@/types';
import { tools } from '@/lib/tools-client';
import { ProjectCard } from '@/components/ui/project-card';
import { PageHeader } from '@/components/ui/page-header';

const GettingStarted = () => (
    <Card className="bg-primary/10 border-primary/20 text-center">
        <CardHeader>
            <CardTitle className="text-2xl text-primary">Welcome to Your Workspace!</CardTitle>
            <CardDescription>This is your Operations Hub. Let's get it set up.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2">1. Add Apps</h3>
                <p className="text-sm text-muted-foreground mb-4">Go to the Marketplace to add powerful AI tools to your workspace.</p>
                <Link href="/me/marketing"><Button variant="outline">Go to Marketplace</Button></Link>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2">2. Add Projects</h3>
                <p className="text-sm text-muted-foreground mb-4">Search the Market Library to add projects to your personal library.</p>
                 <Link href="/me/tool/projects-finder"><Button variant="outline">Search Projects</Button></Link>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2">3. Automate</h3>
                <p className="text-sm text-muted-foreground mb-4">Visit the Flow Builder to connect your apps and automate your workflows.</p>
                <Link href="/me/flows"><Button variant="outline">Build a Flow</Button></Link>
            </div>
        </CardContent>
    </Card>
);

const mottos = [
    "Hobbyists promise, professionals perform.",
    "Ideas are easy, execution is everything.",
    "Plan less, do more.",
    "Focus, act, deliver.",
    "Results speak louder than words.",
    "The future is built by those who ship.",
    "Don't talk, build.",
    "Done is better than perfect."
];

const WorkspaceHero = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentMotto, setCurrentMotto] = useState(mottos[0]);

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        });
        setCurrentDate(formattedDate);

        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % mottos.length;
            setCurrentMotto(mottos[index]);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="text-left py-8">
            <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
                Pro Workspace — Today is {currentDate}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground font-semibold">
                {currentMotto}
            </p>
        </div>
    );
};


export default function WorkspaceHomePage() {
    const { user } = useAuth();
    const [myProjects, setMyProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [addedApps, setAddedApps] = useState<string[]>([]);
    const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

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
                        // Check if onboarding is complete based on whether projects exist
                        setIsOnboardingComplete(data.data.length > 0 || localStorage.getItem('onboardingComplete') === 'true');
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
    <div className="p-4 md:p-10 space-y-12">
        <WorkspaceHero />
      
      {!isOnboardingComplete && !isLoadingProjects ? (
          <GettingStarted />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><LayoutGrid className="h-5 w-5"/> My Apps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {myApps.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {myApps.map(app => (
                                    <Link key={app.id} href={app.href} className="block group">
                                        <div className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-center">
                                            <div className="p-3 rounded-lg text-white" style={{ backgroundColor: app.color }}>
                                            {React.cloneElement(app.icon, { className: 'h-6 w-6' })}
                                            </div>
                                            <p className="text-xs font-semibold truncate w-24">{app.dashboardTitle || app.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground p-8">
                                <p className="mb-4">No apps added to your workspace yet.</p>
                                <Link href="/me/marketing">
                                    <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Go to Marketplace</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
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
                    {myProjects.length > 3 && (
                        <CardFooter>
                            <Link href="/me/tool/projects-finder" className="w-full">
                                <Button variant="secondary" className="w-full">View All Projects</Button>
                            </Link>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
      )}
    </div>
  );
}
