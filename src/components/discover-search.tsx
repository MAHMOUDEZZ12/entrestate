
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, ExternalLink } from 'lucide-react';

interface SearchResult {
    id: string;
    title: string;
    description: string;
    url: string;
    type: string;
}

export default function DiscoverSearch({ query }: { query: string }) {
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
                    body: JSON.stringify({
                        toolId: 'discover-engine',
                        payload: { query }
                    }),
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

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-4">
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-3" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }
    
    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Search Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }

    if (results.length === 0) {
        return <p>No results found for your query.</p>;
    }

    return (
        <div className="space-y-6">
            {results.map((result) => (
                <Card key={result.id} className="bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-lg">
                             <a href={result.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                                {result.title}
                            </a>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                         <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                            {new URL(result.url).hostname} <ExternalLink className="h-3 w-3"/>
                        </a>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
