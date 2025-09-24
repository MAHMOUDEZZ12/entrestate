
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, PlusCircle, GanttChartSquare, LayoutGrid, Building, Library, Search, Sparkles, BrainCircuit } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { tools, Feature } from '@/lib/tools-client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ProjectCard } from '@/components/ui/project-card';
import type { Project } from '@/types';
import { Loader2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';


const mockSmartResults = [
    { title: 'Highest ROI (Off-Plan)', project: 'Sobha Hartland II', details: 'Projected 8.5% ROI due to location and amenities.'},
    { title: 'Best for Families', project: 'Arabian Ranches III', details: 'Top-rated schools, parks, and community facilities nearby.'},
    { title: 'Emerging Hotspot', project: 'Rashid Yachts & Marina', details: 'High potential for appreciation due to new infrastructure.' },
];

const mockDeepResults = [
    { title: 'Price Trend: Dubai Marina', insight: 'Average price per sqft is up 12% YoY, but transaction volume has slowed by 5% this quarter, suggesting a potential stabilization.', source: 'Market Library Archives' },
    { title: 'Developer Reputation: Nakheel', insight: 'Consistently delivered projects on time over the past 5 years with an average resale premium of 15%.', source: 'Developer Archive' },
    { title: 'Search Interest Anomaly', insight: 'Unusually high search interest for "villas with private pools" in JVC, an area not typically known for them. This could signal a new market opportunity.', source: 'User Signals (Layer 4)' },
];

function DiscoverySearchComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [currentQuery, setCurrentQuery] = React.useState(query);
  const [hasSearched, setHasSearched] = React.useState(!!query);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<Project[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuery.trim()) return;
    setIsLoading(true);
    setHasSearched(true);
    router.push(`/me?q=${encodeURIComponent(currentQuery.trim())}`);
    try {
      const response = await fetch(`/api/projects/scan?q=${encodeURIComponent(currentQuery.trim())}`);
      const data = await response.json();
      if (data.ok) {
        setSearchResults(data.data);
      }
    } catch(e) {
      console.error(e);
    } finally {
        setIsLoading(false);
    }
  };
  
  return (
      <div className="space-y-8">
        <div className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                placeholder='Search projects by name, developer, or area...' 
                className="w-full h-14 pl-12 pr-4 text-lg rounded-full shadow-lg"
            />
          </form>
        </div>
        
        {hasSearched && (
            <Tabs defaultValue="fast-search" className="w-full">
                <div className="flex justify-center mb-8">
                    <TabsList className="grid grid-cols-3 w-full max-w-2xl">
                        <TabsTrigger value="fast-search"><Search className="mr-2 h-4 w-4"/>Fast Search</TabsTrigger>
                        <TabsTrigger value="smart-search"><Sparkles className="mr-2 h-4 w-4"/>Smart Search</TabsTrigger>
                        <TabsTrigger value="deep-search"><BrainCircuit className="mr-2 h-4 w-4"/>Deep Search</TabsTrigger>
                    </TabsList>
                </div>
                
                <TabsContent value="fast-search">
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>Direct Results for "{currentQuery}"</CardTitle>
                            <CardDescription>Real-time results from the Market Library.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {isLoading ? (
                                <div className="col-span-full flex justify-center items-center h-40"><Loader2 className="animate-spin" /></div>
                            ) : searchResults.length > 0 ? (
                                searchResults.map(p => <ProjectCard key={p.id} project={p} />)
                            ) : (
                                <p className="col-span-full text-center text-muted-foreground">No projects found.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="smart-search">
                     <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>AI-Interpreted Results for "{currentQuery}"</CardTitle>
                            <CardDescription>The AI understands your intent and finds the best options.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {mockSmartResults.map((result, i) => (
                                <div key={i} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <h3 className="font-semibold text-primary">{result.title}</h3>
                                    <p><span className="font-bold">{result.project}:</span> {result.details}</p>
                                </div>
                             ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="deep-search">
                     <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>Deep Market Insights for "{currentQuery}"</CardTitle>
                            <CardDescription>The AI analyzes historical data and market signals to provide predictive insights.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockDeepResults.map((result, i) => (
                                <div key={i} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <h3 className="font-semibold text-primary">{result.title}</h3>
                                    <p className="text-sm">{result.insight}</p>
                                    <Badge variant="outline" className="mt-2 text-xs">{result.source}</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        )}
      </div>
  );
}


const AppIcon = ({ tool, onOpen }: { tool: Feature; onOpen: (tool: Feature) => void }) => {
  return (
    <div>
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


function WorkspaceHome() {
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
        title="Discovery"
        description="Your intelligent starting point. Search the market, or access your projects and apps."
        icon={<Sparkles className="h-8 w-8"/>}
      >
            <Link href="/gem">
            <Button variant="outline">
                <GanttChartSquare className="mr-2 h-4 w-4" />
                Gem Admin
            </Button>
            </Link>
      </PageHeader>
      
      <DiscoverySearchComponent />

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

    </div>
  );
}


export default function MePage() {
    return (
        <Suspense>
            <WorkspaceHome />
        </Suspense>
    )
}
