
'use client';

import React, { useEffect } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Search } from 'lucide-react';

export default function SearchResultsPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://cse.google.com/cse.js?cx=507222cc63ead4dd7`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <PageHeader
          title="Search Results"
          description="Powered by Google Programmable Search Engine, focused on the real estate market."
          icon={<Search className="h-8 w-8" />}
        />
        <div className="gcse-searchresults-only"></div>
      </main>
      <LandingFooter />
    </div>
  );
}
