
'use client';

import React, { Suspense } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Search, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import DiscoverSearch from '@/components/discover-search';

function SearchResultsComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="w-full">
        <PageHeader
            title={query ? `Search Results for "${query}"` : 'Discover'}
            description="Powered by the native Entrestate Discovery Engine."
            icon={<Search className="h-8 w-8" />}
        />
        <div className="mt-8">
            <DiscoverSearch query={query} />
        </div>
    </div>
  );
}

export default function SearchResultsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <LandingHeader />
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
                <Suspense fallback={<div className="flex w-full justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>}>
                    <SearchResultsComponent />
                </Suspense>
            </main>
            <LandingFooter />
        </div>
    );
}
