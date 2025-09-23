'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Sparkles, BrainCircuit, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectCard } from '@/components/ui/project-card';
import { Badge } from '@/components/ui/badge';

const mockFastResults = [
    { id: 'emaar-beachfront', name: 'Emaar Beachfront', developer: 'Emaar', area: 'Dubai Harbour', status: 'Ready', priceFrom: 'AED 2.5M', thumbnailUrl: 'https://www.propertyfinder.ae/property/053b519598801584a2066d48888b1b86/856/550/MODE/ad801c/9184988-51841o.jpg?ctr=ae' },
    { id: 'damac-lagoons', name: 'Damac Lagoons', developer: 'Damac', area: 'Dubailand', status: 'Off-plan', priceFrom: 'AED 1.8M', thumbnailUrl: 'https://www.propertyfinder.ae/property/77b878241b714a796e67616552a4204c/856/550/MODE/18c45f/9216776-658fbo.jpg?ctr=ae' }
];

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


function SearchResultsComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [currentQuery, setCurrentQuery] = React.useState(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would re-fetch data
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                placeholder='Search the entire real estate universe...' 
                className="w-full h-14 pl-12 pr-4 text-lg rounded-full shadow-lg"
            />
          </form>
        </div>
        
        <Tabs defaultValue="smart-search" className="w-full">
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
                        <CardTitle>Direct Results</CardTitle>
                        <CardDescription>Keyword-based search for projects, developers, and locations.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mockFastResults.map(p => <ProjectCard key={p.id} project={p} />)}
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
      </main>
    </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResultsComponent />
        </Suspense>
    )
}
