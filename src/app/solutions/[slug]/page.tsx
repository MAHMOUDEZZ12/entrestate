
'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Check, FileJson, MessageCircle, Telescope, Shield, Cpu, Workflow, BarChart } from 'lucide-react';
import { ShinyButton } from '@/components/ui/shiny-button';
import { SolutionDetails, solutionsData } from '@/lib/solutions-data';

// Import Simulations
import { ProSearchSimulation } from '@/components/pro-search-simulation';
import { EstChatSimulation } from '@/components/est-chat-simulation';
import { MegaListingSimulation } from '@/components/mega-listing-simulation';


export default function SolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (slug === 'ebram-judicial-ai') {
    notFound();
  }

  const solution: SolutionDetails | undefined = solutionsData[slug as keyof typeof solutionsData];

  if (!solution) {
    notFound();
  }

  const simulations: { [key: string]: React.ReactNode } = {
    'pro-search-eng-x3': <ProSearchSimulation />,
    'estchat-x3': <EstChatSimulation />,
    'mega-listing-pro-2': <MegaListingSimulation />
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-16">
        <PageHeader
          title={solution.title}
          description={solution.tagline}
          icon={solution.icon === 'Telescope' ? <Telescope className="h-8 w-8" /> : solution.icon === 'MessageCircle' ? <MessageCircle className="h-8 w-8" /> : <FileJson className="h-8 w-8" />}
          simulation={simulations[slug]}
        >
            <div className="mt-6 space-y-4">
                 <p className="text-lg text-muted-foreground max-w-xl">{solution.vision}</p>
                 <Link href={solution.cta.href}>
                    <Button variant="outline" size="lg">{solution.cta.text} <ArrowRight className="ml-2 h-4 w-4"/></Button>
                 </Link>
            </div>
        </PageHeader>
        
        <section>
            <Card className="bg-card/50 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/10">
                 <CardContent className="p-8 md:p-10 space-y-4">
                    <h2 className="text-2xl font-bold text-foreground mb-4">The DNA</h2>
                    <p className="text-lg text-foreground/80">
                        {solution.dna}
                    </p>
                 </CardContent>
            </Card>
        </section>

        <section>
             <h2 className="text-3xl font-bold text-center mb-8">Solution Core</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {solution.productCore.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Check className="h-6 w-6 text-primary mt-1 shrink-0" />
                        <p className="text-lg text-foreground/90">{feature}</p>
                    </div>
                ))}
             </div>
        </section>
        
        {solution.price && (
             <section>
                <Card className="max-w-md mx-auto text-center border-2 border-primary ring-4 ring-primary/10 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Get {solution.title} Standalone</CardTitle>
                        <CardDescription>Add this powerful solution to your arsenal.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-5xl font-bold font-heading">${solution.price}</p>
                        <p className="text-muted-foreground">per month</p>
                    </CardContent>
                    <CardFooter>
                         <Link href="/me" className="w-full">
                            <Button size="lg" className="w-full">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </section>
        )}

        <section>
            <h2 className="text-3xl font-bold text-center mb-8">Technology &amp; Architecture</h2>
            <Card className="bg-card/50">
                <CardContent className="p-8 space-y-4">
                    {Object.entries(solution.techStack).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                           <div className="font-semibold text-foreground/90 md:text-right md:pr-4 flex items-center md:justify-end gap-2"><Cpu className="h-4 w-4" />{key}</div>
                           <div className="md:col-span-2 text-muted-foreground">{String(value)}</div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </section>


         <section>
             <h2 className="text-3xl font-bold text-center mb-8">Personas &amp; Use Cases</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {solution.useCases.map((useCase: any, index: number) => (
                    <Card key={index} className="bg-muted/50">
                        <CardHeader>
                            <CardTitle>{useCase.persona}</CardTitle>
                            <CardDescription>"{useCase.query}"</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold text-primary">The Experience:</p>
                            <p>{useCase.experience}</p>
                        </CardContent>
                    </Card>
                ))}
             </div>
        </section>

         <section>
             <h2 className="text-3xl font-bold text-center mb-8">Growth Path</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {solution.growthPath.map((item: any, index: number) => (
                    <Card key={index} className="bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Workflow className="h-5 w-5 text-primary"/>
                                {item.tier}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
             </div>
        </section>
        
        <section className="text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Ready to Integrate This Power?</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                Our core solutions form the backbone of the Entrestate ecosystem. Get started and experience the future of real estate technology.
            </p>
            <div className="mt-8">
                <Link href="/me">
                    <ShinyButton>
                        Get Started <ArrowRight />
                    </ShinyButton>
                </Link>
            </div>
        </section>

      </main>
    </div>
  );
}
