
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, PlusCircle, GanttChartSquare, LayoutGrid } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { tools, Feature } from '@/lib/tools-client';
import { Button } from '@/components/ui/button';
import { useTabManager } from '@/context/TabManagerContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import type { Project } from '@/types';
import { ProjectCard } from '@/components/ui/project-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const AppIcon = ({ tool, onOpen }: { tool: Feature; onOpen: (tool: Feature) => void }) => {
  return (
    <button
      onClick={() => onOpen(tool)}
      className="flex flex-col items-center justify-center text-center gap-2 group"
      aria-label={`Open ${tool.title}`}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-200"
        style={{ backgroundColor: tool.color }}
      >
        {React.cloneElement(tool.icon, { className: 'h-8 w-8' })}
      </div>
      <p className="text-xs font-medium text-foreground truncate w-20">{tool.title}</p>
    </button>
  );
};

export default function MePage() {
  const [addedApps, setAddedApps] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  const router = useRouter();
  const { addTab } = useTabManager();
  const { user } = useAuth();

  useEffect(() => {
    setIsClient(true);
    const savedState = localStorage.getItem('addedApps');
    if (savedState) {
      setAddedApps(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    const fetchUserProjects = async () => {
        if (!user) {
            setIsLoadingProjects(false);
            return;
        };
        try {
            setIsLoadingProjects(true);
            const idToken = await user.getIdToken();
            const response = await fetch('/api/user/projects', {
                headers: { 'Authorization': `Bearer ${idToken}` }
            });
            const data = await response.json();
            if (data.ok) {
                setUserProjects(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch user projects:", error);
        } finally {
            setIsLoadingProjects(false);
        }
    };
    fetchUserProjects();
  }, [user]);

  const handleOpenApp = (tool: Feature) => {
    addTab({ href: tool.href, label: tool.title });
    router.push(tool.href);
    // track('app_opened', { toolId: tool.id });
  };

  const myApps = React.useMemo(() => {
    if (!isClient) return [];
    return tools.filter((tool) => addedApps.includes(tool.id));
  }, [addedApps, isClient]);

  return (
    <div className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Home"
        description="Your workspace. Launch apps, run flows, and manage your real estate universe."
      >
        <Link href="/dev">
          <Button variant="outline">
            <GanttChartSquare className="mr-2 h-4 w-4" />
            Dev Admin
          </Button>
        </Link>
      </PageHeader>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
            <h2 className="text-2xl font-bold font-heading mb-4">My Apps</h2>
            {isClient && myApps.length === 0 ? (
                 <div className="text-center py-16 border-2 border-dashed rounded-lg">
                     <LayoutGrid className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-bold">Your Workspace is Empty</h3>
                    <p className="text-muted-foreground mt-2 mb-6">Add apps from the App Store to get started.</p>
                     <Link href="/me/marketing">
                        <Button>
                            Go to App Store
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9 gap-x-4 gap-y-6">
                    {isClient && myApps.map((tool) => (
                        <AppIcon key={tool.id} tool={tool} onOpen={handleOpenApp} />
                    ))}
                    <Link href="/me/marketing" className="flex flex-col items-center justify-center text-center gap-2 group">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-muted/50 border-2 border-dashed group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                        <PlusCircle className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors truncate w-20">Add Apps</p>
                    </Link>
                </div>
            )}
        </div>
        <div className="xl:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>My Projects</CardTitle>
                    <CardDescription>Your personal library of projects.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoadingProjects ? (
                        <div className="flex justify-center items-center h-24">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : userProjects.length > 0 ? (
                        userProjects.slice(0, 3).map(p => <ProjectCard key={p.id} project={p} />)
                    ) : (
                        <div className="text-center py-8 border-2 border-dashed rounded-lg">
                            <p className="text-sm text-muted-foreground">No projects in your library yet.</p>
                            <Link href="/me/tool/projects-finder" className="mt-2 inline-block">
                                <Button size="sm" variant="outline">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add from Market Library
                                </Button>
                            </Link>
                        </div>
                    )}
                     <Link href="/me/tool/projects-finder" className="w-full">
                        <Button variant="outline" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {userProjects.length > 0 ? "Manage Projects" : "Add Projects"}
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
