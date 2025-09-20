'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, Frown, BarChart3, Bot, BrainCircuit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';

// Mock data to simulate search results
const mockResults = [
  { id: 1, title: 'Emaar Beachfront - 3 Bedroom Apartment', description: 'High ROI potential, stunning sea views, and direct beach access. Ideal for investors looking for premium rental yields.' },
  { id: 2, title: 'Downtown Dubai - Luxury Penthouse', description: 'Experience the height of luxury with panoramic views of the Burj Khalifa. Perfect for high-net-worth individuals.' },
  { id: 3, title: 'JVC - Family Villa', description: 'Spacious family home with a private garden and community amenities. Great for end-users seeking a quiet neighborhood.' },
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aiSummary, setAiSummary] = useState('');

  useEffect(() => {
    // Simulate fetching results based on the query
    setIsLoading(true);
    setAiSummary('');

    const timer = setTimeout(() => {
      if (query) {
        setResults(mockResults);
        setAiSummary(`Based on current market data, properties in "${query}" are showing strong rental demand, with an average yield of 6.5%. The AI recommends focusing on units with sea views for the highest appreciation potential.`);
      } else {
        setResults([]);
      }
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [query]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuery = (e.target as HTMLFormElement).search.value;
    router.push(`/search?q=${encodeURIComponent(newQuery)}`);
    setQuery(newQuery);
  };

  return (
    <div className="flex flex-col min-h-screen">
       <PageHeader 
          title="Intelligent Discovery Engine"
          description="Your AI-powered second brain for the real estate market."
          icon={<BrainCircuit className="h-6 w-6" />}
        />
        
        <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-lg p-4 border-b">
             <form onSubmit={handleSearch} className="relative container mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    name="search"
                    defaultValue={query}
                    placeholder='Search for anything... e.g., "Emaar Beachfront"' 
                    className="w-full h-12 pl-12 pr-4 text-lg rounded-full shadow-lg"
                />
            </form>
        </div>

        <main className="flex-1 container mx-auto p-4 md:p-6">
            {isLoading ? (
                 <div className="text-center py-20">
                    <Sparkles className="h-12 w-12 text-primary animate-pulse mx-auto" />
                    <p className="mt-4 text-muted-foreground">AI is analyzing your query...</p>
                 </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                        {results.length > 0 ? (
                            results.map(result => (
                                <Card key={result.id} className="hover:border-primary/50 transition-colors">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold font-heading mb-2 text-primary">{result.title}</h3>
                                        <p className="text-foreground/80">{result.description}</p>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center py-20">
                                <Frown className="h-12 w-12 text-muted-foreground mx-auto" />
                                <p className="mt-4 text-muted-foreground">No direct results found. Try a different query.</p>
                            </div>
                        )}
                    </div>
                    <aside className="lg:col-span-1">
                        <Card className="sticky top-36 bg-card/80 backdrop-blur-lg">
                            <CardContent className="p-6">
                                <h3 className="font-bold font-heading flex items-center gap-2 mb-4">
                                    <Bot className="h-5 w-5 text-primary" />
                                    AI Co-pilot Summary
                                </h3>
                                {aiSummary ? (
                                    <p className="text-sm text-foreground/80">{aiSummary}</p>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Enter a query to get an AI-powered market summary.</p>
                                )}
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            )}
        </main>
    </div>
  );
}
