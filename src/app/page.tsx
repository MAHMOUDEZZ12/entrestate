
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight, Bot, Telescope, MessageCircle, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ShinyButton } from '@/components/ui/shiny-button';
import { motion } from "framer-motion";
import { ProSearchSimulation } from '@/components/pro-search-simulation';
import { EstChatSimulation } from '@/components/est-chat-simulation';
import { MegaListingSimulation } from '@/components/mega-listing-simulation';
import { SolutionsCta } from '@/components/solutions-cta';


export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/discover/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full">
        {/* New Hero Section */}
        <section className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden border-b bg-background">
          <motion.div
            className="absolute inset-0 z-0"
            style={{
                background: `radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.1), transparent 70%)`
            }}
            animate={{
                background: [
                    `radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.1), transparent 70%)`,
                    `radial-gradient(ellipse at 70% 40%, hsl(var(--accent) / 0.08), transparent 70%)`,
                    `radial-gradient(ellipse at 30% 40%, hsl(var(--primary) / 0.08), transparent 70%)`,
                    `radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.1), transparent 70%)`,
                ]
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
            }}
          />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tighter leading-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                The AI-Native Operating System for Real Estate
              </h1>
              <p className="mt-6 max-w-2xl text-lg md:text-xl text-foreground/70">
                Explore the magical Realtors AI models
              </p>
               <div className="mt-10 w-full max-w-2xl">
                     <div className="relative group">
                         <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-75 group-hover:opacity-100 transition-duration-1000 group-hover:duration-200 animate-gradient-pulse"></div>
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

        <section id="pillars" className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 space-y-20">
                 <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-md">
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Explore the magical Realtors AI models</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        This is not a fancy product and no perfect website needed, they come with their perfection.
                    </p>
                </div>
                
                <Card className="p-8 bg-card/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center border-border/30 shadow-xl">
                   <div className="space-y-4 text-left">
                       <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block"><Telescope className="h-8 w-8" /></div>
                       <h3 className="text-3xl font-bold font-heading">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">PRO SEARCH ENG. x3</span>
                       </h3>
                       <p className="text-2xl font-semibold !leading-tight">We turned the untouched search bar into an unmatched search engine.</p>
                        <p className="text-lg text-muted-foreground whitespace-pre-line">
                            This model switches the life of your website. 
We added a decentralized market library to it. 
Try our discovery search to see how it works!
                       </p>
                       <Link href="/products/pro-search-eng-x3">
                           <Button variant="outline" className="mt-6 shadow">Let's Go <ArrowRight className="ml-2 h-4 w-4"/></Button>
                       </Link>
                   </div>
                   <div>
                        <ProSearchSimulation />
                   </div>
                </Card>

                <Card className="p-8 bg-card/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center border-border/30 shadow-xl">
                    <div className="space-y-4 text-left md:order-2">
                       <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block"><MessageCircle className="h-8 w-8" /></div>
                        <h3 className="text-3xl font-bold font-heading">
                           <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">ESTCHAT X3</span>
                       </h3>
                       <p className="text-2xl font-semibold !leading-tight">The conversational frontline that unifies all communication into a single, intelligent, and commercially productive stream.</p>
                       <p className="text-lg text-muted-foreground whitespace-pre-line">
                            Imagine hiring a super agent with 15 years market experience.
He knows everything and comes with a learning dashboard.
Use it in social media, landing pages, company site, or QR code on business cards.
                       </p>
                       <Link href={`/products/estchat-x3`}>
                           <Button variant="outline" className="mt-6 shadow">Name your SuperAgent <ArrowRight className="ml-2 h-4 w-4"/></Button>
                       </Link>
                   </div>
                   <div className="md:order-1">
                        <EstChatSimulation />
                   </div>
                </Card>

                 <Card className="p-8 bg-card/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center border-border/30 shadow-xl">
                    <div className="space-y-4 text-left">
                       <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block"><FileJson className="h-8 w-8" /></div>
                        <h3 className="text-3xl font-bold font-heading">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">MEGA LISTING PRO 2</span>
                        </h3>
                        <p className="text-2xl font-semibold !leading-tight">From Listings to MEGA PRO Listings.</p>
                       <p className="text-lg text-muted-foreground whitespace-pre-line">
                            You don’t need more listings, you need a perfect listing manager.
A listing is a little far beyond good images, it’s word sensitive
and requires not less than stock market attention.
Name a project, and click "list it" - this is literally how it works.
                       </p>
                       <Link href={`/products/mega-listing-pro-2`}>
                           <Button variant="outline" className="mt-6 shadow">Use it to stop blaming Portals <ArrowRight className="ml-2 h-4 w-4"/></Button>
                       </Link>
                   </div>
                    <div>
                        <MegaListingSimulation />
                    </div>
                </Card>
            </div>
        </section>

        <SolutionsCta />
      </main>
      <LandingFooter />
    </div>
  );
}
