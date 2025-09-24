
'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { ArrowRight, PlusCircle, GanttChartSquare, LayoutGrid, Building, Library, Search, Sparkles, BrainCircuit } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<Project[]>([]);
  const hasSearched = !!query; // Determine if a search has been performed based on URL param

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery) return;
    setIsLoading(true);
    setSearchResults([]);
    try {
      const response = await fetch(`/api/projects/scan?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (data.ok) {
        setSearchResults(data.data);
      } else {
        console.error("Search failed:", data.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    // If there's a query in the URL on initial load, perform the search
    if (query) {
      setCurrentQuery(query);
      performSearch(query);
    }
  }, [query, performSearch]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuery.trim()) return;
    // Update the URL, which will trigger the useEffect to perform the search
    router.push(`/me/discover?q=${encodeURIComponent(currentQuery.trim())}`);
  };
  
  return (
    <div className="p-4 md:p-10 space-y-8 container mx-auto">
       <PageHeader
        title="Discovery Search"
        description="Your intelligent starting point. Search the market, or access your projects and apps."
        icon={<Sparkles className="h-8 w-8"/>}
      />
      
      <div className="space-y-8">
        <div className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
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
                            <CardTitle>Direct Results for "{query}"</CardTitle>
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
                            <CardTitle>AI-Interpreted Results for "{query}"</CardTitle>
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
                            <CardTitle>Deep Market Insights for "{query}"</CardTitle>
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
    </div>
  );
}


export default function DiscoverPage() {
    return (
        <Suspense>
            <DiscoverySearchComponent />
        </Suspense>
    )
}
