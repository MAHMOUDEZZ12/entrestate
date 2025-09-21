
'use client';

import React, { useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { BrainCircuit } from 'lucide-react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

export default function SearchPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=c4d7e9ede8a4347d3';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Find the script and remove it
      const existingScript = document.querySelector(
        'script[src="https://cse.google.com/cse.js?cx=c4d7e9ede8a4347d3"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      // Google CSE might leave other elements or scripts, clean them up if necessary
      const gsceElements = document.querySelectorAll('.gcse-search, .gsc-control-cse, .gsc-clear-button');
      gsceElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <>
      <LandingHeader />
      <div className="flex flex-col min-h-screen">
        <PageHeader
          title="Market Search Engine"
          description="Your AI-powered second brain for the real estate market. Search across verified portals, news, and project sites."
          icon={<BrainCircuit className="h-6 w-6" />}
        />

        <main className="flex-1 container mx-auto p-4 md:p-6">
          <div key="gcse-search-container" className="gcse-search"></div>
        </main>
      </div>
      <LandingFooter />
    </>
  );
}
