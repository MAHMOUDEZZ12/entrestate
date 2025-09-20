
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { visuals } from '@/lib/visuals';

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
              </div>
               <Card className="w-full aspect-square mx-auto overflow-hidden shadow-2xl group relative">
                 <div className="absolute inset-0 z-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <CardContent className="p-0 h-full relative z-20">
                    <Image src={visuals['3xchat']} alt="3XCHAT APP LITE visual" width={500} height={500} className="w-full h-full object-contain"/>
                 </CardContent>
               </Card>
            </div>

            {/* Product 2: PRO SEARCH ENG.x 3 */}
            <div id="product-pro-search" className="grid lg:grid-cols-2 gap-16 items-center">
               <Card className="w-full aspect-square mx-auto overflow-hidden shadow-2xl lg:order-2 group relative">
                 <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <CardContent className="p-0 h-full relative z-20">
                    <Image src={visuals['pro-search']} alt="PRO SEARCH ENG.x 3 visual" width={500} height={500} className="w-full h-full object-contain"/>
                 </CardContent>
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
              </div>
               <Card className="w-full aspect-square mx-auto overflow-hidden shadow-2xl group relative">
                 <div className="absolute inset-0 z-10 bg-gradient-to-br from-green-500/20 to-teal-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <CardContent className="p-0 h-full relative z-20">
                    <Image src={visuals['llm-model']} alt="LLM MODEL X3.5 visual" width={500} height={500} className="w-full h-full object-contain"/>
                 </CardContent>
               </Card>
            </div>

            {/* Product 4: AIXA INTEL RE5.2 */}
            <div id="product-aixa" className="grid lg:grid-cols-2 gap-16 items-center">
                <Card className="w-full aspect-square mx-auto overflow-hidden shadow-2xl lg:order-2 group relative">
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-red-500/20 to-orange-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-0 h-full relative z-20">
                        <Image src={visuals['aixa-intel']} alt="AIXA INTEL RE5.2 visual" width={500} height={500} className="w-full h-full object-contain"/>
                    </CardContent>
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
              </div>
              <Card className="w-full aspect-square mx-auto overflow-hidden shadow-2xl group relative">
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-0 h-full relative z-20">
                    <Image src={visuals['mega-listing']} alt="MEGA LISTING PRO 2 visual" width={500} height={500} className="w-full h-full object-contain"/>
                </CardContent>
              </Card>
            </div>
            
          </div>
        </section>
      </main>
    </div>
  );
}
