
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight, Bot, Target, ListChecks, BrainCircuit, Building, Users, User, Library, FileJson, Telescope, MessageCircle, Check, Shield, Workflow, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ShinyButton } from '@/components/ui/shiny-button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from '@/lib/utils';
import { MegaListingSimulation } from '@/components/mega-listing-simulation';
import { EstChatSimulation } from '@/components/est-chat-simulation';
import { FlowSimulation } from '@/components/flow-simulation';
import { ProSearchSimulation } from '@/components/pro-search-simulation';
import { tools } from '@/lib/tools-client';


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

const workflowSteps = [
    {
        step: "01",
        title: "Build Your Knowledge Base",
        description: "Your private library is the brain of the operation. Upload projects, brochures, and brand assets to give your AI a single source of truth.",
        icon: <Library className="h-8 w-8" />,
        cta: {
            text: "Go to Brand & Assets",
            href: "/dashboard/brand"
        }
    },
    {
        step: "02",
        title: "Deploy Intelligent Apps",
        description: "Activate specialized AI tools from our App Store. Each one is a 'superpower' designed to automate a specific part of your workflow.",
        icon: <Bot className="h-8 w-8" />,
        cta: {
            text: "Explore the App Store",
            href: "/apps"
        }
    },
     {
        step: "03",
        title: "Execute & Dominate",
        description: "Launch campaigns, generate leads, and close deals faster with AI-powered insights and assets, all perfectly on-brand.",
        icon: <Sparkles className="h-8 w-8" />,
        cta: {
            text: "Get Started",
            href: "/login",
            isShiny: true
        }
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

const flowLibraryExamples = [
    {
        title: "Full Listing Syndication",
        description: "Generate a perfect listing description and automatically publish it to both Property Finder and Bayut in one click.",
        apps: ["Listing Generator", "Property Finder Pilot", "Bayut Pilot"],
    },
    {
        title: "Automated Lead Nurturing",
        description: "When a new lead is captured, automatically investigate their profile and send a personalized welcome message via WhatsApp.",
        apps: ["CRM Memory Assistant", "Lead Investigator AI", "WhatsApp Manager"],
    },
    {
        title: "Meta Campaign Flow",
        description: "Generate ad copy, create an audience, and launch a campaign on Meta from a single brochure.",
        apps: ["Insta Ads Designer", "Audience Creator", "Meta Auto Pilot"],
    },
    {
        title: "Multi Projects Brochure",
        description: "Select multiple properties and generate a beautiful side-by-side comparison PDF for your client.",
        apps: ["Market Library", "Multi-Offer Builder"],
    }
];


export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  
  const workflowRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: workflowRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "10%"]);
  const y3 = useTransform(scrollYProgress, [0.2, 0.9], ["0%", "-15%"]);
  
  const flowSectionRef = React.useRef<HTMLDivElement>(null);


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

        <section id="pillars" className="py-20 md:py-32 bg-secondary">
            <div className="container mx-auto px-4 space-y-20">
                 <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-md">
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Explore the magical Realtors AI models</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        This is not a fancy product and no perfect website needed, they come with their perfection.
                    </p>
                </div>
                
                <Card className="p-8 bg-card/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                   <div className="space-y-4 text-left">
                       <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block"><Telescope className="h-8 w-8" /></div>
                       <h3 className="text-3xl font-bold font-heading">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">PRO SEARCH ENG. x3</span>
                       </h3>
                       <p className="text-2xl font-semibold !leading-tight">We turned the untouched search bar into an unmatched search engine.</p>
                        <p className="text-lg text-muted-foreground whitespace-pre-line">
                            This model switch the life on you website. 
We added a decentralized market libirary to it. 
try our discovery search to see how it works!
                       </p>
                       <Link href="/discover/search">
                           <Button variant="outline" className="mt-6 shadow">let's Go <ArrowRight className="ml-2 h-4 w-4"/></Button>
                       </Link>
                   </div>
                   <div>
                        <ProSearchSimulation />
                   </div>
                </Card>

                <Card className="p-8 bg-card/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="space-y-4 text-left md:order-2">
                       <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block"><MessageCircle className="h-8 w-8" /></div>
                        <h3 className="text-3xl font-bold font-heading">
                           <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">ESTCHAT X3</span>
                       </h3>
                       <p className="text-2xl font-semibold !leading-tight">The conversational frontline that unifies all communication into a single, intelligent, and commercially productive stream.</p>
                       <p className="text-lg text-muted-foreground whitespace-pre-line">
                            Imagine hiring a super agent with 15 years market experience.
He knows everything and comes with a learning dashboard.
Use it in social media, Landing pages, company site, or QR code on businesscard.
                       </p>
                       <Link href={`/products/estchat-x3`}>
                           <Button variant="outline" className="mt-6 shadow">Name your SuperAgent <ArrowRight className="ml-2 h-4 w-4"/></Button>
                       </Link>
                   </div>
                   <div className="md:order-1">
                        <EstChatSimulation />
                   </div>
                </Card>

                 <Card className="p-8 bg-card/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="space-y-4 text-left">
                       <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block"><FileJson className="h-8 w-8" /></div>
                        <h3 className="text-3xl font-bold font-heading">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">MEGA LISTING PRO 2</span>
                        </h3>
                        <p className="text-2xl font-semibold !leading-tight">From Listings to MEGA PRO Listings.</p>
                       <p className="text-lg text-muted-foreground whitespace-pre-line">
                            You don’t need more listings, you need a perfect listing manager.
Listing is a little far beyond good images, It’s word sensitive
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

        <section id="how-it-works" className="py-20 md:py-32 bg-background" ref={workflowRef}>
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your Path to a 10x Workflow</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Transform hours of manual work into an intelligent, automated process.
                </p>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-start max-w-5xl mx-auto">
                    {(['y1', 'y2', 'y3'] as const).map((y, index) => {
                        const step = workflowSteps[index];
                        const motionY = index === 0 ? y1 : index === 1 ? y2 : y3;
                        return (
                             <motion.div 
                                key={step.step}
                                style={{ y: motionY }}
                                className="md:even:pt-12 md:odd:pb-12"
                              >
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                <Card className="text-left bg-card/80 backdrop-blur-sm border h-full flex flex-col shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <p className="text-5xl font-bold text-primary/20">{step.step}</p>
                                            <div className="p-3 bg-primary/10 text-primary rounded-lg backdrop-blur-sm border border-primary/20">
                                                {step.icon}
                                            </div>
                                        </div>
                                        <CardTitle className="pt-4 text-2xl">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                         <Link href={step.cta.href} className="w-full">
                                            {step.cta.isShiny ? (
                                                <ShinyButton className="w-full">{step.cta.text} <ArrowRight /></ShinyButton>
                                            ) : (
                                                <Button variant="secondary" className="w-full">{step.cta.text}</Button>
                                            )}
                                        </Link>
                                    </CardFooter>
                                </Card>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
        
        <section ref={flowSectionRef} id="how-it-works-examples" className="py-20 md:py-32 text-center bg-gradient-to-t from-background to-primary/5">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter">Unlock Creative Automotion flows</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        NO time + NO mistakes X AI Magic = Full Perfection
                    </p>
                </div>
                
                <FlowSimulation />

                 <div className="relative mt-8">
                     <motion.div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 h-16 w-px"
                        style={{ background: 'linear-gradient(to top, hsl(var(--primary)), transparent)'}}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {flowLibraryExamples.map(flow => {
                            const flowApps = flow.apps.map(appName => tools.find(t => t.title === appName)).filter(Boolean);
                            return (
                                <Card key={flow.title} className="text-left bg-card/80 backdrop-blur-lg border border-border/20 h-full flex flex-col hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{flow.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-sm text-muted-foreground">{flow.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="flex items-center gap-2">
                                            {flowApps.map((app, index) => app && (
                                                <React.Fragment key={app.id}>
                                                    <div className="p-2 rounded-full bg-muted">
                                                        {React.cloneElement(app.icon, { className: 'h-4 w-4 text-muted-foreground' })}
                                                    </div>
                                                    {index < flowApps.length - 1 && <Plus className="h-4 w-4 text-muted-foreground" />}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                    
                    <div className="mt-16">
                        <Link href="/resources/flows">
                            <ShinyButton>
                                Follow the library and flow the Deals <ArrowRight />
                            </ShinyButton>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 md:py-32 bg-secondary">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">An Operating System for Every Role</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Whether you're a solo agent or a large developer, Entrestate is your competitive edge.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                   {personas.map((persona, index) => (
                       <motion.div
                          key={persona.title}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true, amount: 0.3 }}
                        >
                          <Card className="text-center bg-card flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 h-full">
                              <CardHeader className="items-center">
                                  <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit mb-3">{persona.icon}</div>
                                  <CardTitle>{persona.title}</CardTitle>
                                   <CardDescription>{persona.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="flex-grow">
                                   <ul className="text-left space-y-2 text-sm">
                                       {persona.benefits.map(benefit => (
                                           <li key={benefit} className="flex items-start gap-3">
                                               <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                               <span>{benefit}</span>
                                           </li>
                                       ))}
                                   </ul>
                              </CardContent>
                              <CardFooter>
                                  <Link href="/solutions" className="w-full">
                                    <Button variant="secondary" className="w-full">Learn More</Button>
                                  </Link>
                              </CardFooter>
                          </Card>
                        </motion.div>
                   ))}
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
