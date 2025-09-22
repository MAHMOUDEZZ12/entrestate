
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Search, Loader2, Building, Newspaper } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchResult {
    id: string;
    title: string;
    description: string;
    url: string;
    type: string;
}

function SearchResultsComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setIsLoading(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toolId: 'discover-engine', payload: { query } }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch search results.');
        }
        setResults(data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="w-full">
        <PageHeader
            title={`Search Results for "${query}"`}
            description="Powered by the native Entrestate Discovery Engine."
            icon={<Search className="h-8 w-8" />}
        />
        <div className="mt-8 space-y-6">
            {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                             <Skeleton className="h-4 w-full" />
                             <Skeleton className="h-4 w-5/6 mt-2" />
                        </CardContent>
                    </Card>
                ))
            ) : error ? (
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : results.length > 0 ? (
                 results.map(result => (
                    <a href={result.url} key={result.id} target="_blank" rel="noopener noreferrer" className="block">
                        <Card className="hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">{result.title}</CardTitle>
                                <CardDescription className="text-sm text-green-600 truncate">{result.url}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{result.description}</p>
                            </CardContent>
                        </Card>
                    </a>
                 ))
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <h3 className="text-xl font-bold">No Results Found</h3>
                    <p className="text-muted-foreground mt-2">Try searching for something else.</p>
                </div>
            )}
        </div>
    </div>
  );
}

export default function SearchResultsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
                <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin mx-auto" />}>
                    <SearchResultsComponent />
                </Suspense>
            </main>
            <LandingFooter />
        </div>
    );
}
