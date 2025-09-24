'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight, Bot, Telescope, MessageCircle, FileJson, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ShinyButton } from '@/components/ui/shiny-button';
import { motion } from "framer-motion";
import { Loader2 } from 'lucide-react';
import { tools } from '@/lib/tools-client';

const ProSearchSimulation = dynamic(() => import('@/components/pro-search-simulation').then(mod => mod.ProSearchSimulation), {
  ssr: false,
  loading: () => <div className="h-[288px] flex items-center justify-center bg-muted rounded-lg"><Loader2 className="animate-spin" /></div>,
});
const EstChatSimulation = dynamic(() => import('@/components/est-chat-simulation').then(mod => mod.EstChatSimulation), {
  ssr: false,
  loading: () => <div className="h-[480px] flex items-center justify-center bg-muted rounded-lg"><Loader2 className="animate-spin" /></div>,
});
const MegaListingSimulation = dynamic(() => import('@/components/mega-listing-simulation').then(mod => mod.MegaListingSimulation), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg"><Loader2 className="animate-spin" /></div>,
});
const SalesPlannerSimulation = dynamic(() => import('@/components/sales-planner-simulation').then(mod => mod.SalesPlannerSimulation), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg"><Loader2 className="animate-spin" /></div>,
});


export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/discover/search?q=${encodeURIComponent(query.trim())}`);
  };

  const featuredTools = tools.slice(0, 12);

  return (
    <div className="flex flex-col min-h-screen">
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
                A complete ecosystem of Apps, Suites, and Services to give real estate professionals an unparalleled advantage.
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

        <section id="solutions" className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 space-y-20">
                 <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-md">
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Core AI Solutions</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        These are not just features; they are powerful, standalone products designed to transform a core aspect of your business.
                    </p>
                </div>
                
                <Card className="p-8 bg-card/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center border-border/30 shadow-xl">
                   <div className="space-y-4 text-left">
                       <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block"><Telescope className="h-8 w-8" /></div>
                       <h3 className="text-3xl font-bold font-heading">
                          Market Search Engine
                       </h3>
                       <p className="text-lg text-muted-foreground">
                            Redefine how you discover opportunities. Our triple-engine search combines keyword-based speed, semantic AI understanding, and predictive historical analysis to give you a complete market view.
                       </p>
                       <Link href="/solutions/pro-search-eng-x3">
                           <Button variant="outline" className="mt-6 shadow">Learn More <ArrowRight className="ml-2 h-4 w-4"/></Button>
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
                           SalesAgentChat AI
                       </h3>
                       <p className="text-lg text-muted-foreground">
                            Deploy a super-intelligent agent on your website or social media. It engages users proactively, answers complex questions with market data, and captures qualified leads 24/7.
                       </p>
                       <Link href="/solutions/estchat-x3">
                           <Button variant="outline" className="mt-6 shadow">Learn More <ArrowRight className="ml-2 h-4 w-4"/></Button>
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
                            AI Listing Portal
                        </h3>
                        <p className="text-lg text-muted-foreground">
                           Create a single source of truth for your property data. Our AI consolidates, verifies, and archives listings to eliminate noise, enforce accuracy, and syndicate perfectly formatted data to all major portals.
                       </p>
                       <Link href="/solutions/mega-listing-pro-2">
                           <Button variant="outline" className="mt-6 shadow">Learn More <ArrowRight className="ml-2 h-4 w-4"/></Button>
                       </Link>
                   </div>
                    <div>
                        <MegaListingSimulation />
                    </div>
                </Card>
            </div>
        </section>

         <section id="marketplace-showcase" className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                 <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Your AI-Powered Workplace</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        An entire ecosystem of specialized apps designed to automate every facet of your business. Add them to your workspace to build your personalized command center.
                    </p>
                </div>
                <div className="relative mt-16 flex justify-center">
                     <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {featuredTools.map((tool, i) => (
                            <motion.div 
                                key={tool.id}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                viewport={{ once: true, amount: 0.8 }}
                                className="flex flex-col items-center gap-2 text-center"
                            >
                                <div className="p-4 rounded-2xl text-white" style={{ backgroundColor: tool.color }}>
                                    {React.cloneElement(tool.icon, { className: 'h-8 w-8' })}
                                </div>
                                <p className="text-xs font-semibold">{tool.dashboardTitle || tool.title}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <Link href="/marketplace">
                        <ShinyButton>
                            Explore All Apps
                            <LayoutGrid className="ml-2" />
                        </ShinyButton>
                    </Link>
                </div>
            </div>
        </section>
        
        <section id="deal-planner" className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4">
                 <Card className="p-8 bg-card/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center border-border/30 shadow-xl">
                   <div className="space-y-4 text-left">
                       <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block"><Sparkles className="h-8 w-8" /></div>
                       <h3 className="text-3xl font-bold font-heading">
                          SuperSales AI
                       </h3>
                       <p className="text-lg text-muted-foreground">
                            Your interactive AI partner for creating and executing winning deals. It's like having a world-class sales manager in your pocket, guiding you on what to say and do next.
                       </p>
                       <Link href="/tool/deals-smart-planner">
                           <Button variant="outline" className="mt-6 shadow">Try The Planner <ArrowRight className="ml-2 h-4 w-4"/></Button>
                       </Link>
                   </div>
                   <div>
                        <SalesPlannerSimulation />
                   </div>
                </Card>
            </div>
        </section>

      </main>
    </div>
  );
}
