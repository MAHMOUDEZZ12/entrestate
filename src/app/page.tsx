
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight, Bot, Target, ListChecks, BrainCircuit, Building, Users, User, Library, FileJson, Telescope, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShinyButton } from '@/components/ui/shiny-button';
import Image from 'next/image';


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

const productPillars = [
    {
        name: "PRO SEARCH ENG. x3",
        slug: "pro-search-eng-x3",
        icon: <Telescope className="h-8 w-8" />,
        description: "The triple-engine of discovery, combining Fast, Smart, and Deep search to provide unparalleled real estate intelligence.",
        visualization: "https://picsum.photos/seed/pro-search-viz/800/600",
        vizHint: "abstract data visualization prism",
    },
    {
        name: "ESTCHAT X3",
        slug: "estchat-x3",
        icon: <MessageCircle className="h-8 w-8" />,
        description: "The conversational frontline that unifies all communication into a single, intelligent, and commercially productive stream.",
        visualization: "https://picsum.photos/seed/estchat-viz/800/600",
        vizHint: "modern chat interface bubbles",
    },
    {
        name: "MEGA LISTING PRO 2",
        slug: "mega-listing-pro-2",
        icon: <FileJson className="h-8 w-8" />,
        description: "The unified market registry that creates a single source of truth by consolidating, verifying, and archiving all listings.",
        visualization: "https://picsum.photos/seed/mega-listing-viz/800/600",
        vizHint: "network globe data nodes",
    },
];

const workflowSteps = [
    {
        step: 1,
        title: "Build Your Library",
        description: "Connect your project data, upload brochures, and set up your brand kit. Your AI uses this as its single source of truth.",
        icon: <Library className="h-10 w-10" />,
    },
    {
        step: 2,
        title: "Command Your AI",
        description: "Use our suite of apps to run automated workflows, or direct your AI co-pilot with simple, natural language commands.",
        icon: <Bot className="h-10 w-10" />,
    },
     {
        step: 3,
        title: "Dominate Your Market",
        description: "Launch campaigns, generate leads, and close deals faster with AI-powered insights and assets, all perfectly on-brand.",
        icon: <Sparkles className="h-10 w-10" />,
    }
];

const personas = [
    {
        title: "The Individual Agent",
        icon: <User className="h-8 w-8" />,
        description: "Become a 'Super Agent.' Automate your marketing, manage your leads, and access market intelligence that puts you ahead of the competition.",
    },
    {
        title: "The Brokerage",
        icon: <Users className="h-8 w-8" />,
        description: "Equip your entire team with a unified platform. Ensure brand consistency, streamline workflows, and get a birds-eye view of your agency's performance.",
    },
    {
        title: "The Developer",
        icon: <Building className="h-8 w-8" />,
        description: "Manage your project portfolio, track market trends, and empower your sales network with cutting-edge, AI-generated marketing assets.",
    }
];


const GeminiSignature = () => (
    <div className="text-center mt-24 py-12 border-t border-border/20">
        <p className="text-lg text-muted-foreground italic">
            "This entire platform was built in partnership with a human visionary. It stands as a testament to our combined potential."
        </p>
        <p className="mt-4 font-semibold text-foreground">
            — Gemini
        </p>
        <p className="text-sm text-muted-foreground">
            A Large Language Model by Google
        </p>
    </div>
);


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
        
        <section id="pillars" className="py-20 md:py-32">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Core Product Pillars</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Three powerful, interconnected systems that form the foundation of our AI-native ecosystem.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                   {productPillars.map((pillar) => (
                       <Card key={pillar.name} className="text-left hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col group">
                           <CardHeader>
                               <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit mb-3">{pillar.icon}</div>
                               <CardTitle>{pillar.name}</CardTitle>
                               <CardDescription>{pillar.description}</CardDescription>
                           </CardHeader>
                           <CardContent className="flex-grow flex flex-col justify-end">
                                <div className="aspect-video relative rounded-md overflow-hidden border">
                                    <Image src={pillar.visualization} alt={`${pillar.name} visualization`} layout="fill" objectFit="cover" data-ai-hint={pillar.vizHint} />
                                </div>
                               <Link href={`/products/${pillar.slug}`} className="mt-4">
                                   <Button variant="outline" className="w-full">Explore Product <ArrowRight className="ml-2 h-4 w-4"/></Button>
                               </Link>
                           </CardContent>
                       </Card>
                   ))}
                </div>
            </div>
        </section>

        <section id="how-it-works" className="py-20 md:py-32 bg-muted/50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">A Radically Simple Workflow</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Transform hours of manual work into a simple, three-step process powered by AI.
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


        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 text-center">
                 <div className="p-4 bg-primary/10 text-primary rounded-full w-fit mx-auto mb-6">
                    <Bot className="h-10 w-10" />
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your AI Co-Pilot</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    At the heart of Entrestate is your personal AI assistant. Train it on your data, command it with natural language, and let it run complex workflows for you. It's not an add-on; it's the core of the experience.
                </p>
                <div className="mt-8">
                    <Link href="/dashboard/assistant">
                        <Button variant="outline" size="lg">Meet Your Co-Pilot <ArrowRight /></Button>
                    </Link>
                </div>
            </div>
        </section>

        <section className="py-20 md:py-32 bg-muted/50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built for the Modern Professional</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Whether you're a solo agent or a large developer, Entrestate is your competitive edge.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                   {personas.map((persona) => (
                       <Card key={persona.title} className="text-center bg-card/50">
                           <CardHeader className="items-center">
                               <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit mb-3">{persona.icon}</div>
                               <CardTitle>{persona.title}</CardTitle>
                           </CardHeader>
                           <CardContent>
                                <p className="text-muted-foreground">{persona.description}</p>
                           </CardContent>
                       </Card>
                   ))}
                </div>
            </div>
        </section>
        
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 text-center">
                 <div className="p-4 bg-primary/10 text-primary rounded-full w-fit mx-auto mb-6">
                    <BrainCircuit className="h-10 w-10" />
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Entrestate is a prime Google AI partner</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                   As a prime partner, Entrestate leverages the full power of Gemini and Google's Intelligence Labs to build our AI-native operating system. We don't just use AI; we build with it at the deepest level to invent the future of real estate.
                </p>
                <div className="mt-8">
                    <Link href="/technology">
                        <Button variant="outline" size="lg">Learn About the Technology <ArrowRight /></Button>
                    </Link>
                </div>
            </div>
        </section>

        <section className="py-20 md:py-32 bg-muted/50">
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
                <GeminiSignature />
            </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
