
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Search, Loader2, Library, ArrowRight } from 'lucide-react';
import type { Project } from '@/types';
import { ProjectCard } from '@/components/ui/project-card';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

function SearchResultsComponent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const { toast } = useToast();
    const [searchResults, setSearchResults] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (query) {
            const performSearch = async () => {
                setIsLoading(true);
                setSearchResults([]);
                try {
                    const response = await fetch(`/api/projects/scan?q=${encodeURIComponent(query)}`);
                    const data = await response.json();
                    if (data.ok) {
                        setSearchResults(data.data);
                    } else {
                        toast({ title: "Search Failed", description: data.error, variant: "destructive" });
                    }
                } catch (error) {
                    toast({ title: "Error", description: "Could not fetch projects.", variant: "destructive" });
                } finally {
                    setIsLoading(false);
                }
            };
            performSearch();
        }
    }, [query, toast]);

    return (
        <main className="p-4 md:p-10 space-y-8 container mx-auto">
            <PageHeader
                title={query ? `Search Results for "${query}"` : 'Discover Projects'}
                description={query ? "Live results from our AI-powered Market Library." : "Search our Market Library to discover new projects."}
                icon={<Search className="h-8 w-8" />}
            />

            {isLoading ? (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                    <span>Searching the market...</span>
                </div>
            ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {searchResults.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            actions={
                                <Link href="/me">
                                    <Button size="sm">
                                        <Library className="mr-2 h-4 w-4" />
                                        Add to Library
                                    </Button>
                                </Link>
                            }
                        />
                    ))}
                </div>
            ) : query && (
                <Card className="text-center py-16">
                    <CardContent>
                        <h3 className="text-xl font-bold">No Projects Found</h3>
                        <p className="text-muted-foreground mt-2 mb-6">We couldn't find any projects matching your search. Please try a different query.</p>
                    </CardContent>
                </Card>
            )}
             <Card className="mt-12 bg-primary/10 border-primary/20">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-primary">Ready to build your workspace?</h3>
                        <p className="text-primary/80">Go to your workspace to create a private library, access our full suite of AI tools, and automate your workflow.</p>
                    </div>
                    <Link href="/me">
                        <Button size="lg">
                            Go to Workspace <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <SearchResultsComponent />
        </Suspense>
    );
}
