
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, PlusCircle, GanttChartSquare, LayoutGrid, Building, Library } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { tools, Feature } from '@/lib/tools-client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useSpotlight } from '@/context/SpotlightContext';
import { ProjectCard } from '@/components/ui/project-card';
import type { Project } from '@/types';
import { Loader2 } from 'lucide-react';

const AppIcon = ({ tool, onOpen }: { tool: Feature; onOpen: (tool: Feature) => void }) => {
  const { setSpotlight, clearSpotlight } = useSpotlight();
  return (
    <div onMouseEnter={() => setSpotlight(tool)} onMouseLeave={clearSpotlight}>
      <Link
        href={tool.href}
        className="flex flex-col items-center justify-center text-center gap-2 group"
        aria-label={`Open ${tool.title}`}
        onClick={(e) => {
          e.preventDefault();
          onOpen(tool);
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-200"
          style={{ backgroundColor: tool.color }}
        >
          {React.cloneElement(tool.icon, { className: 'h-8 w-8' })}
        </div>
        <p className="text-xs font-medium text-foreground truncate w-20">{tool.title}</p>
      </Link>
    </div>
  );
};


export default function MePage() {
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth();
  const [myAppIds, setMyAppIds] = useState<string[]>([]);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsClient(true);
    try {
        const savedAppIds = JSON.parse(localStorage.getItem('addedApps') || '[]');
        setMyAppIds(savedAppIds);
    } catch(e) {
        // localStorage not available
    }
  }, []);

  useEffect(() => {
    const fetchUserProjects = async () => {
        if (!user) {
            setIsLoading(false);
            return;
        };
        try {
            const idToken = await user.getIdToken();
            const response = await fetch('/api/user/projects', {
                headers: { 'Authorization': `Bearer ${idToken}` }
            });
            const data = await response.json();
            if (data.ok) {
                setMyProjects(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch user projects:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchUserProjects();
  }, [user]);

  const myApps = React.useMemo(() => {
    if (!isClient) return [];
    return tools.filter(tool => myAppIds.includes(tool.id));
  }, [isClient, myAppIds]);


  const handleOpenApp = (tool: Feature) => {
    window.location.href = tool.href;
  };
  
  return (
    <div className="p-4 md:p-10 space-y-8 container mx-auto">
       <PageHeader
        title="My Workspace"
        description="Launch apps, run flows, and manage your real estate universe."
      >
            <Link href="/gem">
            <Button variant="outline">
                <GanttChartSquare className="mr-2 h-4 w-4" />
                Gem Admin
            </Button>
            </Link>
      </PageHeader>
      
      <Card>
        <CardHeader>
            <CardTitle>My Projects</CardTitle>
            <CardDescription>Your private library of projects. Add a project to start using it across your tools.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                 <div className="flex items-center justify-center h-40 text-muted-foreground">
                    <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                </div>
            ) : myProjects.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed rounded-lg">
                    <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-bold">Your Project Library is Empty</h3>
                    <p className="text-muted-foreground mt-2 mb-6">Add projects from the Market Library to start working with them.</p>
                    <Link href="/me/tool/projects-finder">
                        <Button>
                            <Library className="mr-2 h-4 w-4" />
                            Go to Market Library
                        </Button>
                    </Link>
                </div>
            ) : (
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {myProjects.map(project => <ProjectCard key={project.id} project={project} />)}
                </div>
            )}
        </CardContent>
      </Card>


      {myApps.length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle>My Apps</CardTitle>
                <CardDescription>Your personalized suite of AI-powered tools.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-10 gap-x-4 gap-y-6">
                    {myApps.map(app => (
                        <AppIcon key={app.id} tool={app} onOpen={handleOpenApp} />
                    ))}
                    <Link href="/me/marketing" className="flex flex-col items-center justify-center text-center gap-2 group">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-muted/50 border-2 border-dashed group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                            <PlusCircle className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">Add Apps</p>
                    </Link>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
