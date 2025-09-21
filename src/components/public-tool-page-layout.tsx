
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Feature } from '@/lib/tools-client';
import Image from 'next/image';
import { ShinyButton } from './ui/shiny-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';


interface PublicToolPageLayoutProps {
  feature: Feature;
}

export function PublicToolPageLayout({ feature }: PublicToolPageLayoutProps) {

  return (
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
          <div className="mt-8">
            <Link href="/signup">
                <ShinyButton>
                    Get Started with {feature.title.split(" ")[0]}
                    <ArrowRight />
                </ShinyButton>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-20">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">A Radically Simple Workflow</h2>
                 <p className="mt-4 text-lg text-muted-foreground">Transform hours of manual work into a simple, elegant process powered by AI.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="lg:sticky lg:top-24">
                     <Card className="w-full shadow-2xl shadow-primary/10 border-primary/20">
                        <CardContent className="p-4">
                            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                                <Image
                                    src={`https://picsum.photos/seed/${feature.id}/1280/720`}
                                    alt={`${feature.title} visual concept`}
                                    width={1280}
                                    height={720}
                                    className="w-full h-full object-cover"
                                    data-ai-hint={feature.title}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-16">
                     {feature.details.steps.map((step, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <div className="flex items-start gap-6">
                                <div className="flex flex-col items-center gap-2">
                                     <div className="p-3 bg-primary/10 text-primary rounded-full w-fit">
                                        {React.cloneElement(step.icon, { className: 'h-6 w-6' })}
                                    </div>
                                    <div className="w-px h-full bg-border flex-grow"></div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold font-heading mb-2">Step {i+1}</h3>
                                    <p className="text-lg text-muted-foreground">{step.text}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>
      
      {/* AI vs Manual */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-2xl mx-auto mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">The AI Advantage</h2>
                 <p className="mt-4 text-lg text-muted-foreground">See how much time and effort you save by using the AI.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {feature.details.aiVsManual.map((item, index) => (
                    <Card key={index} className="text-center bg-card/80">
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
                                <p className="text-sm text-primary">WITH WHATSMAP AI</p>
                                <p className="font-semibold text-lg text-primary">{item.ai}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* Synergy Section */}
       <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Plays Well With Others</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {feature.title} is powerful alone, but transformative when combined with other tools in the WhatsMAP ecosystem.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {feature.details.synergy.slice(0, 3).map((s, index) => (
                  <Card key={index} className="text-left bg-card">
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
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
             <div className="text-center max-w-2xl mx-auto mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Good to Know</h2>
                 <p className="mt-4 text-lg text-muted-foreground">Answers to common questions.</p>
            </div>
            <Card className="max-w-3xl mx-auto">
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
  );
}
