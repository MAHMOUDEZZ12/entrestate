'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Feature } from '@/lib/tools-client';
import Image from 'next/image';
import { visuals } from '@/lib/visuals';

interface PublicToolPageLayoutProps {
  feature: Feature;
}

export function PublicToolPageLayout({ feature }: PublicToolPageLayoutProps) {
  // A helper to get the visual key from the feature id
  const getVisualKey = (id: string): keyof typeof visuals | undefined => {
    const keyMap: { [key:string]: keyof typeof visuals } = {
      'ai-video-presenter': 'aixa-intel', // Placeholder
      '3xchat': '3xchat',
      'pro-search': 'pro-search',
      'llm-model': 'llm-model',
      'aixa-intel': 'aixa-intel',
      'mega-listing': 'mega-listing',
    };
    return keyMap[id];
  }
  const visualKey = getVisualKey(feature.id);

  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative py-24 md:py-40 text-center bg-gradient-to-br from-background via-primary/5 to-background border-b">
        <div className="container mx-auto px-4">
          <div className="p-4 bg-white/10 backdrop-blur-lg rounded-full w-fit mx-auto mb-6 border">
            {React.cloneElement(feature.icon, { className: 'h-10 w-10 text-primary' })}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter max-w-3xl mx-auto">
            {feature.title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/70">
            {feature.longDescription}
          </p>
          <div className="mt-8">
            <Link href="/signup">
              <Button size="lg" className="group">
                Get Started with {feature.title}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Visual & Core Benefits Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-heading">How It Works</h2>
            <div className="space-y-6">
              {feature.details.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">{step.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">Step {i + 1}</h3>
                    <p className="text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {visualKey && (
            <Card className="w-full aspect-square mx-auto overflow-hidden shadow-2xl group relative">
              <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-0 h-full relative z-20">
                <Image src={visuals[visualKey]} alt={`${feature.title} visual`} width={500} height={500} className="w-full h-full object-contain"/>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      
      {/* Synergy Section */}
       <section className="py-24 md:py-32 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-heading">Plays Well With Others</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
              {feature.title} is powerful alone, but transformative when combined with other tools in the WhatsMAP ecosystem.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {feature.details.synergy.slice(0, 3).map((s, index) => (
                  <Card key={index} className="text-left bg-card/80 backdrop-blur-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-md">
                           <h4 className="font-semibold text-sm">{feature.title}</h4>
                        </div>
                        <Plus className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div className="p-2 bg-secondary text-secondary-foreground rounded-md">
                           <h4 className="font-semibold text-sm">{s.tool}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80">{s.benefit}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
        </div>
      </section>
    </main>
  );
}
