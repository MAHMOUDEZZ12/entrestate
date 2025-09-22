

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight, Bot, Target, ListChecks, BrainCircuit, Building, Users, User, Library, FileJson, Telescope, MessageCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShinyButton } from '@/components/ui/shiny-button';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';


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
];

const ChatBubble = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn("text-sm p-2 px-3 rounded-2xl max-w-[80%]", className)}
    >
        {children}
    </motion.div>
);


const productPillars = [
    {
        name: "PRO SEARCH ENG. x3",
        slug: "pro-search-eng-x3",
        icon: <Telescope className="h-8 w-8" />,
        description: "The triple-engine of discovery, combining Fast, Smart, and Deep search to provide unparalleled real estate intelligence.",
        visual: (
            <Card className="w-full max-w-lg mx-auto overflow-hidden">
                <CardHeader className="p-4 border-b">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-muted rounded-md">
                        <Search className="h-4 w-4" />
                        <span>JVC Area expected rental ROI in 2029</span>
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                     <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">Deep Search Results: Predictive Analysis</h3>
                        <Badge variant="default">In-Use</Badge>
                     </div>
                     <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center p-4">
                        <Image src="https://picsum.photos/seed/jvc-2029-roi/800/600" alt="Search results for JVC 2029 ROI" width={800} height={600} className="rounded" data-ai-hint="predictive analytics chart" />
                     </div>
                </CardContent>
            </Card>
        ),
    },
    {
        name: "ESTCHAT X3",
        slug: "estchat-x3",
        icon: <MessageCircle className="h-8 w-8" />,
        description: "The conversational frontline that unifies all communication into a single, intelligent, and commercially productive stream.",
         visual: (
             <Card className="w-full max-w-sm mx-auto h-[480px] flex flex-col bg-muted/30">
                <CardHeader className="p-3 border-b flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                         <div className="relative">
                            <User className="h-6 w-6 text-muted-foreground" />
                            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-card" />
                        </div>
                        <p className="font-semibold text-sm">Live Chat</p>
                    </div>
                     <Badge variant="secondary">In-Use</Badge>
                </CardHeader>
                <CardContent className="p-3 flex-1 flex flex-col gap-2 justify-end">
                   <ChatBubble className="bg-card self-start">Hi! I'm looking for a 2BR villa in Dubai Hills.</ChatBubble>
                   <ChatBubble className="bg-primary text-primary-foreground self-end">I have 3 top options for you. Would you like to see the comparison?</ChatBubble>
                   <ChatBubble className="bg-card self-start">Yes, please. And what's the typical service charge there?</ChatBubble>
                   <ChatBubble className="bg-primary text-primary-foreground self-end">Generating comparison... Service charges in Dubai Hills average AED 4-6 per sq. ft. annually.</ChatBubble>
                </CardContent>
            </Card>
        ),
    },
    {
        name: "MEGA LISTING PRO 2",
        slug: "mega-listing-pro-2",
        icon: <FileJson className="h-8 w-8" />,
        description: "The unified market registry that creates a single source of truth by consolidating, verifying, and archiving all listings.",
        visual: (
             <Card className="w-full max-w-lg mx-auto overflow-hidden">
                <CardHeader className="p-4 border-b flex justify-between items-center">
                    <CardTitle className="text-lg">Unified Listing View</CardTitle>
                    <Badge variant="default">In-Use</Badge>
                </CardHeader>
                <CardContent className="p-4">
                     <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center p-4">
                        <Image src="https://picsum.photos/seed/listing-preview/800/600" alt="A preview of a property listing" width={800} height={600} className="rounded" data-ai-hint="property listing preview" />
                     </div>
                </CardContent>
            </Card>
        ),
    },
];

const workflowSteps = [
    {
        step: 1,
        title: "Build Your Knowledge Base",
        description: "Your private library is the brain of the operation. Upload projects, brochures, and brand assets to give your AI a single source of truth.",
        icon: <Library className="h-10 w-10" />,
    },
    {
        step: 2,
        title: "Deploy Intelligent Apps",
        description: "Activate specialized AI tools from our App Store. Each one is a 'superpower' designed to automate a specific part of your workflow.",
        icon: <Bot className="h-10 w-10" />,
    },
     {
        step: 3,
        title: "Execute & Dominate",
        description: "Launch campaigns, generate leads, and close deals faster with AI-powered insights and assets, all perfectly on-brand.",
        icon: <Sparkles className="h-10 w-10" />,
    }
];

const personas = [
    {
        title: "The Individual Agent",
        icon: <User className="h-8 w-8" />,
        description: "Become a 'Super Agent.' Automate marketing, access market intelligence that puts you ahead, and manage leads with an AI that never sleeps.",
        benefits: ["Launch Ads in Minutes", "Personalized Client Outreach", "24/7 AI Assistant"]
    },
    {
        title: "The Brokerage",
        icon: <Users className="h-8 w-8" />,
        description: "Equip your team with a unified OS. Ensure brand consistency, streamline workflows, and get a bird's-eye view of your agency's performance.",
        benefits: ["Standardized Workflows", "Team Performance Analytics", "Centralized Brand Control"]
    },
    {
        title: "The Developer",
        icon: <Building className="h-8 w-8" />,
        description: "Manage your project portfolio from a single dashboard. Track market trends and empower your sales network with cutting-edge marketing assets.",
        benefits: ["Portfolio Intelligence", "Automated Project Marketing", "Sales Network Enablement"]
    }
];


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
        <section className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden border-b bg-gradient-to-br from-background via-primary/5 to-background">
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tighter leading-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
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
        
        <section id="products" className="py-20 md:py-32 text-center bg-background">
           <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Entrestate Flywheel</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    A unified suite of intelligent tools designed to perfect your workflow, from listing to close.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                   {products.map((product) => (
                       <Card key={product.name} className="text-left hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all bg-card/50">
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
        
        <section id="pillars" className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 space-y-24">
                 <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Core Product Pillars</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Three powerful, interconnected systems that form the foundation of our AI-native ecosystem.
                    </p>
                </div>
                {productPillars.map((pillar, index) => (
                   <div key={pillar.name} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                       <div className={cn("space-y-4 text-center md:text-left", index % 2 !== 0 && "md:order-2")}>
                           <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block">{pillar.icon}</div>
                           <h3 className="text-3xl font-bold font-heading">{pillar.name}</h3>
                           <p className="text-lg text-muted-foreground">{pillar.description}</p>
                           <Link href={`/products/${pillar.slug}`}>
                               <Button variant="outline">Explore Product <ArrowRight className="ml-2 h-4 w-4"/></Button>
                           </Link>
                       </div>
                       <div className={cn(index % 2 !== 0 && "md:order-1")}>
                           {pillar.visual}
                       </div>
                   </div>
               ))}
            </div>
        </section>

        <section id="how-it-works" className="py-20 md:py-32 bg-background">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your Path to a 10x Workflow</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Transform hours of manual work into an intelligent, automated process.
                </p>
                <div className="relative mt-16">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block" />
                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                        {workflowSteps.map(step => (
                            <div key={step.step} className="flex flex-col items-center text-center">
                                <div className="p-4 bg-primary text-primary-foreground rounded-full mb-4 border-4 border-background">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold font-heading">{step.title}</h3>
                                <p className="mt-2 text-muted-foreground">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">An Operating System for Every Role</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Whether you're a solo agent or a large developer, Entrestate is your competitive edge.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                   {personas.map((persona) => (
                       <Card key={persona.title} className="text-center bg-card flex flex-col">
                           <CardHeader className="items-center">
                               <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit mb-3">{persona.icon}</div>
                               <CardTitle>{persona.title}</CardTitle>
                                <CardDescription>{persona.description}</CardDescription>
                           </CardHeader>
                           <CardContent className="flex-grow">
                                <ul className="text-left space-y-2 text-sm">
                                    {persona.benefits.map(benefit => (
                                        <li key={benefit} className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-green-500" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                           </CardContent>
                           <CardContent>
                                <Button variant="secondary" className="w-full">Learn More</Button>
                           </CardContent>
                       </Card>
                   ))}
                </div>
            </div>
        </section>

      </main>
      <LandingFooter />
    </>
  );
}

