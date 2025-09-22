
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, BrainCircuit, Code, Sparkles, Wand2 } from 'lucide-react';
import { ShinyButton } from '@/components/ui/shiny-button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function TechnologyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full">
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
             <div className="container mx-auto px-4 md:px-6 text-center">
                <PageHeader 
                    icon={<Sparkles className="h-12 w-12" />}
                    title="Powered by Google AI"
                    description="Entrestate is an AI-native ecosystem, built from the ground up with Gemini, Google's most capable AI model. This is more than a feature; it's our foundation."
                />
                 <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                     <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer">
                        <ShinyButton>Chat with Gemini <ArrowRight /></ShinyButton>
                    </a>
                    <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">
                       <Button variant="outline" size="lg">Explore AI Studio</Button>
                    </a>
                 </div>
            </div>
        </section>

        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <Badge>The Engine</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">What is Gemini?</h2>
                        <p className="text-lg text-muted-foreground">
                            Gemini is a family of multimodal AI models developed by Google. It's not just a language model; it can understand, operate across, and combine different types of information seamlessly. It understands text, code, images, and video, allowing it to reason about complex subjects and perform sophisticated tasks.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            Every feature on the Entrestate platform, from generating a market report to creating a video presenter, is powered by a specialized Gemini-based AI flow. This is what makes our tools "AI-native"—they are not just using AI, they are built with it at their core.
                        </p>
                    </div>
                    <div className="p-4 bg-muted rounded-2xl">
                         <Card className="w-full mx-auto overflow-hidden shadow-2xl">
                            <div className="aspect-video bg-background flex items-center justify-center relative">
                                <Image src="https://picsum.photos/seed/gemini-abstract/800/450" alt="Abstract AI visualization" layout="fill" objectFit="cover" data-ai-hint="abstract neural network" />
                            </div>
                            <div className="p-4 bg-card">
                                <h3 className="font-bold">Multimodal by Nature</h3>
                                <p className="text-sm text-muted-foreground mt-1">Understanding across text, images, and video is the key to true intelligence.</p>
                            </div>
                         </Card>
                    </div>
                 </div>
            </div>
        </section>
        
        <GeminiSignature />
        
      </main>
      <LandingFooter />
    </div>
  );
}

    