
'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Feature, tools as clientTools } from '@/lib/tools-client';
import Image from 'next/image';
import { visuals } from '@/lib/visuals';
import { PageHeader } from '@/components/ui/page-header';
import { blogContent } from '@/lib/blog-content';

const AppDetailLayout = ({ feature }: { feature: Feature }) => {
  const getVisualKey = (id: string): keyof typeof visuals | undefined => {
    const keyMap: { [key:string]: keyof typeof visuals } = {
      '3xchat': '3xchat',
      'pro-search': 'pro-search',
      'llm-model': 'llm-model',
      'aixa-intel': 'aixa-intel',
      'mega-listing': 'mega-listing',
    };
    return keyMap[id];
  }
  const visualKey = getVisualKey(feature.id);
  const blogPost = blogContent[feature.id];

  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-center bg-gradient-to-b from-background to-muted/50 border-b">
        <div className="container mx-auto px-4">
          <div className="p-4 bg-card border rounded-full w-fit mx-auto mb-6">
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
              <Button size="lg" className="group text-lg py-7 px-8">
                Get Started with {feature.title}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works & Visual */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-heading">How It Works</h2>
            <p className="text-lg text-muted-foreground">A simple, three-step process to get your desired results.</p>
            <div className="space-y-6">
              {feature.details.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary mt-1">{step.icon}</div>
                  <div>
                    <h3 className="font-semibold text-xl">Step {i + 1}: {step.text.split('.')[0]}</h3>
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
      
      {/* AI vs Manual & FAQs */}
      <section className="py-24 md:py-32 bg-muted/50">
        <div className="container mx-auto px-4 grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-3 space-y-6">
                 <h2 className="text-3xl font-bold font-heading">The AI Advantage</h2>
                 <p className="text-lg text-muted-foreground">See how much time and effort you save by using the AI.</p>
                 <div className="space-y-4">
                     {feature.details.aiVsManual.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 items-center">
                            <div className="col-span-1 flex items-center gap-2 font-semibold">{item.icon} {item.metric}</div>
                            <div className="col-span-1 text-center bg-card/50 p-2 rounded-md border">{item.manual}</div>
                            <div className="col-span-1 text-center bg-primary/10 text-primary font-semibold p-2 rounded-md border border-primary/20">{item.ai}</div>
                        </div>
                     ))}
                 </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-3xl font-bold font-heading">Good to Know</h2>
                <p className="text-lg text-muted-foreground">Answers to common questions.</p>
                 <div className="space-y-4">
                    {feature.details.faqs.map((faq, index) => (
                        <div key={index} className="p-4 bg-card rounded-lg border">
                           <h4 className="font-semibold">{faq.question}</h4>
                           <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </section>

      {/* Synergy Section */}
       <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-heading">Plays Well With Others</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
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

      {/* Related Blog Posts */}
      {blogPost && (
        <section className="py-24 md:py-32 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold font-heading">From the Handbook</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Learn more strategies and use cases for the {feature.title}.
                    </p>
                </div>
                 <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle>{blogPost.title}</CardTitle>
                        <CardDescription>{blogPost.intro}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         {blogPost.sections.map((section, index) => (
                            <div key={index}>
                                <h4 className="font-semibold">{section.heading}</h4>
                                <p className="text-sm text-muted-foreground">{section.body}</p>
                            </div>
                        ))}
                    </CardContent>
                 </Card>
            </div>
        </section>
      )}

    </main>
  );
}

export default function ToolPage() {
  const params = useParams();
  const tool = clientTools.find(t => t.id === params.toolId);

  if (!tool) {
    notFound();
  }
  
  return <AppDetailLayout feature={tool} />;
}

// Generate static pages for each tool for better SEO and performance
export async function generateStaticParams() {
    return clientTools.map((tool) => ({
        toolId: tool.id,
    }));
}
