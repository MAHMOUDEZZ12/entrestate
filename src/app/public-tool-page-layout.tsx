
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Plus, Sparkles, Wand2, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Feature } from '@/lib/tools-client';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { CodeBlock } from '@/components/code-block';
import { PurchaseDialog } from '@/components/ui/purchase-dialog';
import { AutoPilotPlan } from '@/components/ui/autopilot-plan';


interface PublicToolPageLayoutProps {
  feature: Feature & { price: number };
}


export function PublicToolPageLayout({ feature }: PublicToolPageLayoutProps) {
  const isAutoPilot = feature.id === 'meta-auto-pilot';

  return (
    <div className="flex min-h-screen flex-col bg-background">
    <LandingHeader />
    <main className="flex-1 w-full bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-center border-b overflow-hidden">
         <div 
            className="absolute inset-0 z-0"
            style={{
                background: `radial-gradient(ellipse at 50% 20%, ${feature.color}1A, transparent 70%)`
            }}
         />
        <div className="container mx-auto px-4 relative z-10">
          <div className="p-4 bg-card border rounded-full w-fit mx-auto mb-6 shadow-lg">
            {React.cloneElement(feature.icon, { className: 'h-10 w-10 text-primary' })}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter max-w-4xl mx-auto">
            {feature.title}
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
            {feature.longDescription}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/login">
                <ShinyButton>
                    Get Started
                    <ArrowRight />
                </ShinyButton>
            </Link>
            {feature.price > 0 && (
                <PurchaseDialog tool={feature}>
                    <Button variant="outline" size="lg">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Buy for ${feature.price}/mo
                    </Button>
                </PurchaseDialog>
            )}
          </div>
        </div>
      </section>
      
       {/* How it works section */}
       <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">The AI-Powered Plan</h2>
             <p className="mt-4 text-lg text-muted-foreground">The Auto Pilot executes a complete, intelligent plan to build and launch your campaign.</p>
          </div>

          <AutoPilotPlan />

        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Powered for Professionals</h2>
            <p className="mt-4 text-lg text-muted-foreground">From individual agents to large brokerages, see how {feature.title} is a game-changer.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(feature.details.use_cases || []).map((useCase, index) => (
              <Card key={index} className="bg-card/80">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>{useCase}</span>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI vs Manual */}
       <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-2xl mx-auto mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">The AI Advantage</h2>
                 <p className="mt-4 text-lg text-muted-foreground">See how much time and effort you save by using the AI.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {feature.details.aiVsManual.map((item, index) => (
                    <Card key={index} className="text-center bg-card">
                        <CardHeader>
                            <div className="p-4 bg-primary/10 text-primary rounded-full w-fit mx-auto mb-4">
                                {React.cloneElement(item.icon, { className: 'h-8 w-8' })}
                            </div>
                            <CardTitle>{item.metric}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">MANUAL</p>
                                <p className="font-semibold text-lg">{item.manual}</p>
                            </div>
                             <div>
                                <p className="text-sm text-primary">WITH ENTRESTATE AI</p>
                                <p className="font-semibold text-lg text-primary">{item.ai}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>


      {/* Synergy Section */}
       <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Plays Well With Others</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {feature.title} is powerful alone, but transformative when combined with other tools in the Entrestate ecosystem.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {feature.details.synergy.slice(0, 3).map((s, index) => (
                  <Card key={index} className="text-left bg-card/80">
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
      
       {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
             <div className="text-center max-w-2xl mx-auto mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Good to Know</h2>
                 <p className="mt-4 text-lg text-muted-foreground">Answers to common questions.</p>
            </div>
            <Card className="max-w-3xl mx-auto bg-card">
                <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                        {feature.details.faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </section>

    </main>
    <LandingFooter />
    </div>
  );
}
