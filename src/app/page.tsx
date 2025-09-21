
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Helper for smooth scrolling
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/discover/${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <main className="flex-1 w-full">
        {/* New Hero Section */}
        <section className="relative flex h-screen w-full items-center justify-center overflow-hidden border-b">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-primary/5 to-background">
             {/* Subtle background visuals can go here */}
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="flex flex-col items-center">
              <h1 className="text-5xl md:text-8xl font-bold font-heading tracking-tighter leading-tight max-w-4xl">
                The AI-Native Operating System for Real Estate
              </h1>
              <p className="mt-6 max-w-2xl text-xl md:text-2xl text-foreground/70">
                From intelligent public search to a complete suite of professional tools, Entrestate is the ecosystem that gives you an unparalleled advantage.
              </p>
               <div className="mt-10 w-full max-w-2xl">
                     <div className="relative group">
                         <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-pulse"></div>
                         <form onSubmit={handleSearch} className="relative z-10">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder='e.g., "create an ad for Emaar Beachfront"' 
                                className="w-full h-14 pl-12 pr-4 text-lg rounded-full shadow-lg"
                            />
                             <button type="submit" className="hidden" aria-hidden="true">Submit</button>
                        </form>
                     </div>
                </div>
                <Button variant="link" className="mt-6 text-muted-foreground group" onClick={() => scrollToSection('products')}>
                  Or Explore Our Platforms
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
            </div>
          </div>
        </section>
        
        {/* Placeholder for the rest of the landing page content */}
        <section id="products" className="py-20 text-center">
            <h2 className="text-3xl font-bold">More Content Here</h2>
            <p className="text-muted-foreground">The rest of your landing page sections would follow.</p>
        </section>
      </main>
    </>
  );
}
