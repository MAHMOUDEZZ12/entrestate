
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight, Bot, Target, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShinyButton } from '@/components/ui/shiny-button';


const products = [
    {
        name: "Listing Intelligence",
        icon: <ListChecks className="h-8 w-8" />,
        description: "From market analysis to crafting the perfect description, these apps give you an unfair advantage in showcasing your properties.",
        href: "/solutions"
    },
    {
        name: "Lead Gen Apps",
        icon: <Target className="h-8 w-8" />,
        description: "Go beyond basic ads. Find high-intent buyers and sellers with AI-powered targeting and creative generation.",
        href: "/solutions"
    },
    {
        name: "AI Co-Pilot",
        icon: <Bot className="h-8 w-8" />,
        description: "Your personal AI assistant that learns from your data to automate tasks, answer questions, and run campaigns.",
        href: "/dashboard/assistant"
    }
]

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/discover/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <LandingHeader />
      <main className="flex-1 w-full">
        {/* New Hero Section */}
        <section className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden border-b">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-primary/5 to-background">
             {/* Subtle background visuals can go here */}
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tighter leading-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                The AI-Native Operating System for Real Estate
              </h1>
              <p className="mt-6 max-w-2xl text-lg md:text-xl text-foreground/70">
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
                                placeholder='e.g., "Emaar Beachfront price trends"' 
                                className="w-full h-14 pl-12 pr-4 text-lg rounded-full shadow-lg"
                            />
                             <button type="submit" className="hidden" aria-hidden="true">Submit</button>
                        </form>
                     </div>
                </div>
            </div>
          </div>
        </section>
        
        <section id="products" className="py-20 md:py-32 text-center bg-muted/50">
           <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Entrestate Flywheel</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    A unified suite of intelligent tools designed to perfect your workflow, from listing to close.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                   {products.map((product) => (
                       <Card key={product.name} className="text-left hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all">
                           <CardHeader>
                               <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit mb-3">{product.icon}</div>
                               <CardTitle>{product.name}</CardTitle>
                               <CardDescription>{product.description}</CardDescription>
                           </CardHeader>
                           <CardContent>
                               <Link href={product.href}>
                                   <Button variant="link" className="p-0">Learn More <ArrowRight className="ml-2 h-4 w-4"/></Button>
                               </Link>
                           </CardContent>
                       </Card>
                   ))}
                </div>
           </div>
        </section>

        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Become a Super Agent?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                   Train your assistant, explore the apps, and start closing faster today.
                </p>
                <div className="mt-8">
                    <Link href="/signup">
                        <ShinyButton>Start Your Free Trial <ArrowRight /></ShinyButton>
                    </Link>
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
