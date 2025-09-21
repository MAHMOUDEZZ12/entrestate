
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Sparkles, Search, Building, BarChart, LayoutTemplate, Star, Wallet, AreaChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { visuals } from '@/lib/visuals';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';


const ChatSimulation = () => {
    const messages = [
        { from: 'ai', text: "Hello! How can I help you with our projects today?" },
        { from: 'user', text: "I'm interested in a 3-bedroom with a sea view." },
        { from: 'ai', text: "Excellent choice. We have several stunning options. Do you have a preferred location, like Emaar Beachfront or Palm Jumeirah?" },
        { from: 'user', text: "Emaar Beachfront sounds interesting. What's available?" },
        { from: 'ai', text: "We have a beautiful 3-bedroom apartment on the 25th floor of 'Azure Tower' with panoramic views of the Palm. Would you like me to send you the brochure?" },
        { from: 'user', text: "Yes please!" },
    ];

    return (
        <div className="h-full w-full bg-muted/50 rounded-xl p-4 overflow-hidden mask-gradient-vertical">
             <motion.div
                animate={{ y: [0, -100] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                }}
                className="space-y-3"
            >
                {/* Duplicate messages for seamless loop */}
                {[...messages, ...messages].map((msg, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-end gap-2",
                            msg.from === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                         {msg.from === 'ai' && <div className="h-6 w-6 rounded-full bg-primary/20 flex-shrink-0" />}
                        <div
                            className={cn(
                                "max-w-[80%] rounded-lg p-2 px-3 text-sm",
                                msg.from === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-background border'
                            )}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

const SearchSimulation = () => {
    const features = ["Santorini - Blue & White theme", "Venice - Gondola Rides", "Costa Brava - Spanish Style", "Malta - Play & Learn Hub"];
    const layouts = [
        { name: "3-Bed Townhouse", size: "2,012 sqft", image: "https://placehold.co/400x300/e2e8f0/64748b?text=Layout+1", hint: "house interior" },
        { name: "4-Bed Townhouse", size: "2,280 sqft", image: "https://placehold.co/400x300/e2e8f0/64748b?text=Layout+2", hint: "living room" },
        { name: "5-Bed Villa", size: "3,700 sqft", image: "https://placehold.co/400x300/e2e8f0/64748b?text=Layout+3", hint: "luxury villa" },
    ];

    return (
        <div className="w-full h-full bg-muted/50 rounded-xl p-4 flex flex-col gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 h-10 bg-background"
                    defaultValue="Damac Lagoons"
                    disabled
                />
            </div>
            <div className="space-y-3">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                    <Card className="bg-background/80">
                        <CardHeader>
                            <CardTitle>Project Overview: Damac Lagoons</CardTitle>
                            <CardDescription>Developer: DAMAC Properties</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">A Mediterranean-inspired community of villas and townhouses centered around a swimmable crystal lagoon.</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
                    <Card className="bg-background/80">
                        <CardHeader>
                            <CardTitle>Layouts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Carousel opts={{ loop: true }} className="w-full max-w-sm mx-auto">
                                <CarouselContent>
                                    {layouts.map((layout, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                             <Image src={layout.image} alt={layout.name} width={400} height={300} className="rounded-lg mb-2" data-ai-hint={layout.hint} />
                                            <p className="font-semibold text-center">{layout.name} - <span className="text-muted-foreground">{layout.size}</span></p>
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="-left-4" /><CarouselNext className="-right-4" />
                            </Carousel>
                        </CardContent>
                    </Card>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
                     <Card className="bg-background/80">
                        <CardHeader><CardTitle>Key Features</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-2 text-sm">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                 </motion.div>

                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
                    <Card className="bg-background/80">
                         <CardHeader><CardTitle>Investment Study</CardTitle></CardHeader>
                        <CardContent className="flex items-center justify-between text-sm">
                           <div>
                             <p>Est. ROI: <span className="font-bold text-primary">8-10%</span></p>
                             <p>Type: <span className="font-bold">High Growth / Rental</span></p>
                           </div>
                           <Link href="/dashboard/tool/deal-analyzer">
                               <Button variant="outline" size="sm">Run Full Analysis <ArrowRight /></Button>
                           </Link>
                        </CardContent>
                    </Card>
                 </motion.div>
            </div>
        </div>
    )
}


// Helper for smooth scrolling
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 w-full">
        {/* New "iPhone-level" Hero Section */}
        <section className="relative flex h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden border-b">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-primary/5 to-background">
             {/* Placeholder for a subtle, dynamic background animation (e.g., glowing grid or particles) */}
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-8xl font-bold font-heading tracking-tighter leading-tight max-w-4xl">
                The AI-Native Operating System for Real Estate
              </h1>
              <p className="mt-6 max-w-2xl text-xl md:text-2xl text-foreground/70">
                From intelligent public search to a complete suite of professional tools, WhatsMAP is the ecosystem that gives you an unparalleled advantage.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <p className="text-lg text-foreground/80">
                  Press <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[12px] font-medium text-muted-foreground"><span className="text-sm">⌘</span>K</kbd> to discover what's possible.
                </p>
                <Button
                  size="lg"
                  className="group"
                  onClick={() => scrollToSection('products')}
                >
                  Or Explore Our Platforms
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Detailed Product Sections */}
        <section id="products" className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
            
            {/* Product 1: 3XCHAT APP LITE */}
            <div id="product-3xchat" className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-foreground">
                  3XCHAT APP LITE
                </h3>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Transform customer interactions with an application engineered for immediate, impactful engagement. 3XCHAT APP LITE redefines responsiveness, ensuring every customer feels heard and valued, around the clock.
                </p>
                 <div className="space-y-4">
                  <h4 className="font-semibold text-xl">Key Features:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">24/7 Availability:</span><br /><span className="text-muted-foreground">Provides uninterrupted support, capturing leads and answering queries globally.</span></div></li>
                    <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Proactive Lead Qualification:</span><br /><span className="text-muted-foreground">Identifies high-intent prospects and gathers critical information for your sales teams.</span></div></li>
                     <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Contextual Recall:</span><br /><span className="text-muted-foreground">Retains conversation history for personalized, multi-turn dialogues.</span></div></li>
                  </ul>
                </div>
                 <Link href="/products/3xchat">
                    <Button variant="outline" size="lg">Discover More <ArrowRight className="ml-2 h-4 w-4"/></Button>
                 </Link>
              </div>
               <Card className="w-full h-[500px] mx-auto shadow-2xl group relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex flex-col items-center justify-center p-2">
                 <ChatSimulation />
              </Card>
            </div>

            {/* Product 2: PRO SEARCH ENG.x 3 */}
            <div id="product-pro-search" className="grid lg:grid-cols-2 gap-16 items-center">
               <Card className="w-full h-[600px] mx-auto overflow-hidden shadow-2xl lg:order-2 group relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex flex-col items-center justify-center text-center p-2">
                    <SearchSimulation />
               </Card>
              <div className="space-y-8 lg:order-1">
                <h3 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-foreground">
                  PRO SEARCH ENG.x 3
                </h3>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Move beyond keyword matching. Our advanced search engine dives into the semantic fabric of information, revealing connections and insights that traditional systems miss.
                </p>
                 <div className="space-y-4">
                  <h4 className="font-semibold text-xl">Key Features:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Hyper-Relevant Results:</span><br /><span className="text-muted-foreground">Drastically reduces time spent sifting through irrelevant information.</span></div></li>
                    <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Hidden Pattern Discovery:</span><br /><span className="text-muted-foreground">Identifies non-obvious correlations and emerging trends.</span></div></li>
                    <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Cross-Source Synthesis:</span><br /><span className="text-muted-foreground">Unifies information from disparate internal and external repositories.</span></div></li>
                  </ul>
                </div>
                 <Link href="/products/pro-search">
                    <Button variant="outline" size="lg">Discover More <ArrowRight className="ml-2 h-4 w-4"/></Button>
                 </Link>
              </div>
            </div>

             {/* Product 3: LLM MODEL X3.5 */}
            <div id="product-llm-x35" className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-foreground">
                  LLM MODEL X3.5
                </h3>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Harness the cutting edge of generative intelligence to craft contextually rich, persuasive, and perfectly tailored content that resonates with your audience, at scale.
                </p>
                 <div className="space-y-4">
                  <h4 className="font-semibold text-xl">Key Features:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Hyper-Personalized Content:</span><br /><span className="text-muted-foreground">Generate unique messages for individual clients or market segments.</span></div></li>
                    <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Stylistic Flexibility:</span><br /><span className="text-muted-foreground">Adapts tone, voice, and format to match any brand guideline or audience.</span></div></li>
                     <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Creative Ideation Engine:</span><br /><span className="text-muted-foreground">Generates innovative concepts, headlines, and narrative structures.</span></div></li>
                  </ul>
                </div>
                 <Link href="/products/llm-model">
                    <Button variant="outline" size="lg">Discover More <ArrowRight className="ml-2 h-4 w-4"/></Button>
                 </Link>
              </div>
               <Card className="w-full aspect-square mx-auto overflow-hidden shadow-2xl group relative bg-gradient-to-br from-green-500/10 to-teal-500/10 flex flex-col items-center justify-center text-center p-8">
                  <h3 className="text-4xl font-bold font-heading">LLM MODEL X3.5</h3>
                   <Link href="/products/llm-model" className="mt-4">
                      <Button variant="outline">Discover More <ArrowRight className="ml-2 h-4 w-4"/></Button>
                  </Link>
               </Card>
            </div>

            {/* Product 4: AIXA INTEL RE5.2 */}
            <div id="product-aixa" className="grid lg:grid-cols-2 gap-16 items-center">
                <Card className="w-full aspect-square mx-auto overflow-hidden shadow-2xl lg:order-2 group relative bg-gradient-to-br from-red-500/10 to-orange-500/10 flex flex-col items-center justify-center text-center p-8">
                    <h3 className="text-4xl font-bold font-heading">AIXA INTEL RE5.2</h3>
                     <Link href="/products/aixa-intel" className="mt-4">
                        <Button variant="outline">Discover More <ArrowRight className="ml-2 h-4 w-4"/></Button>
                    </Link>
                </Card>
                <div className="space-y-8 lg:order-1">
                    <h3 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-foreground">
                        AIXA INTEL RE5.2
                    </h3>
                    <p className="text-xl text-foreground/70 leading-relaxed">
                        Navigate the future with unparalleled clarity. AIXA INTEL RE5.2 processes vast streams of data to not just report, but to predict market movements and identify opportunities.
                    </p>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-xl">Key Features:</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Proactive Opportunity Identification:</span><br /><span className="text-muted-foreground">Discover untapped markets or emerging client needs.</span></div></li>
                            <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Multi-factor Predictive Models:</span><br /><span className="text-muted-foreground">Considers hundreds of variables for robust forecasts.</span></div></li>
                            <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Risk Mitigation:</span><br /><span className="text-muted-foreground">Anticipate and prepare for potential market downturns or operational challenges.</span></div></li>
                        </ul>
                    </div>
                     <Link href="/products/aixa-intel">
                        <Button variant="outline" size="lg">Discover More <ArrowRight className="ml-2 h-4 w-4"/></Button>
                     </Link>
                </div>
            </div>

            {/* Product 5: MEGA LISTING PRO 2 */}
            <div id="product-mega-listing" className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-foreground">
                  MEGA LISTING PRO 2
                </h3>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Streamline your property marketing across every channel, ensuring maximum exposure with minimal effort.
                </p>
                 <div className="space-y-4">
                  <h4 className="font-semibold text-xl">Key Features:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Maximized Market Reach:</span><br /><span className="text-muted-foreground">Distribute listings to hundreds of platforms with a single click.</span></div></li>
                    <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Automated Content Adaptation:</span><br /><span className="text-muted-foreground">Tailors listing details for various portal requirements.</span></div></li>
                    <li className="flex items-start gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><div><span className="font-semibold">Eliminated Manual Entry:</span><br /><span className="text-muted-foreground">Drastically reduce administrative burden and data entry errors.</span></div></li>
                  </ul>
                </div>
                 <Link href="/products/mega-listing">
                    <Button variant="outline" size="lg">Discover More <ArrowRight className="ml-2 h-4 w-4"/></Button>
                 </Link>
              </div>
              <Card className="w-full aspect-square mx-auto overflow-hidden shadow-2xl group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex flex-col items-center justify-center text-center p-8">
                <h3 className="text-4xl font-bold font-heading">MEGA LISTING PRO 2</h3>
                 <Link href="/products/mega-listing" className="mt-4">
                    <Button variant="outline">Discover More <ArrowRight className="ml-2 h-4 w-4"/></Button>
                </Link>
              </Card>
            </div>
            
          </div>
        </section>
      </main>
    </div>
  );
}

    

    

    

    

