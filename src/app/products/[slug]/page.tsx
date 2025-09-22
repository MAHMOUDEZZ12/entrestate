'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Check, FileJson, MessageCircle, Telescope } from 'lucide-react';
import { ShinyButton } from '@/components/ui/shiny-button';

const productsData: {[key: string]: any} = {
  'estchat-x3': {
    title: 'ESTCHAT X3',
    icon: <MessageCircle className="h-8 w-8" />,
    tagline: 'The Conversational Frontline',
    vision: 'ESTCHAT X3 exists to solve the timeless problem of communication in real estate. It unifies all conversations into a single intelligent stream — proactive, context-aware, and commercially productive.',
    features: [
      'Engages users on Instagram, websites, campaigns, landing pages, and CRMs.',
      'Includes a prompt builder for brokers to customize dialogues.',
      'Translates conversations into structured data, knowledge, or contracts.',
      'Evolves through use, continuously improving its accuracy and proposals.'
    ],
    useCases: [
      { persona: 'The Homebuyer', query: '“2BR in Dubai Marina with balcony under AED 2M.”', experience: 'ESTCHAT provides matching listings, side-by-side comparisons, and even school/lifestyle data.' },
      { persona: 'The Investor', query: '“What is ROI for Emaar Beachfront vs DAMAC Lagoons?”', experience: 'ESTCHAT provides an investment comparison, then proposes creating a structured plan.' },
    ]
  },
  'mega-listing-pro-2': {
    title: 'MEGA LISTING PRO 2',
    icon: <FileJson className="h-8 w-8" />,
    tagline: 'The Unified Market Registry',
    vision: 'MEGA LISTING PRO 2 was born to create one single source of truth in a fragmented market. It consolidates, verifies, and archives all listings, ensuring every participant operates from the same foundation of trust.',
    features: [
      'Aggregates listings from portals, developers, and brokers.',
      'Uses AI to detect duplicates, expired data, and false pricing.',
      'Outputs a clean, verified feed for websites, CRMs, and regulators.',
      'Archives every property record since 2005 for deep analytics.'
    ],
    useCases: [
        { persona: 'The Buyer', query: 'Overwhelmed by duplicate listings.', experience: 'Gets a single, verified property catalog to search from.' },
        { persona: 'The Broker', query: 'Manual data entry is time consuming.', experience: 'Uploads once, and the listing is synchronized everywhere.' },
    ]
  },
  'pro-search-eng-x3': {
    title: 'PRO SEARCH ENG. x3',
    icon: <Telescope className="h-8 w-8" />,
    tagline: 'The Triple Engine of Discovery',
    vision: 'PRO SEARCH ENG. x3 redefines search by combining three engines: Fast Search (keyword), Smart Search (semantic AI), and Deep Search (historical & predictive). It extends beyond listings into trends, history, and opportunity discovery.',
    features: [
      'Multi-Layered Engine optimized for different personas.',
      'Predictive Insights using archived data to project appreciation trends.',
      'Personalized results based on buyer profile or investor goals.',
      'Universal Connector that works natively with the entire Entrestate ecosystem.'
    ],
    useCases: [
      { persona: 'The Investor', query: '“Which areas under AED 2M will appreciate 15% in 3 years?”', experience: 'Uses Deep Search to get predictive market insights.' },
      { persona: 'The Buyer', query: '“Family villa near top schools with private garden.”', experience: 'Uses Smart Search for natural language queries.' },
    ]
  }
};


export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = productsData[slug];

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-16">
        <PageHeader
          title={product.title}
          description={product.tagline}
          icon={product.icon}
        />
        
        <section>
            <Card className="bg-card/50 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/10">
                 <CardContent className="p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-foreground mb-4">The Vision & DNA</h2>
                    <p className="text-lg text-foreground/80">
                        {product.vision}
                    </p>
                 </CardContent>
            </Card>
        </section>

        <section>
             <h2 className="text-3xl font-bold text-center mb-8">Core Features</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                        <Check className="h-6 w-6 text-primary mt-1 shrink-0" />
                        <p className="text-lg text-foreground/90">{feature}</p>
                    </div>
                ))}
             </div>
        </section>

         <section>
             <h2 className="text-3xl font-bold text-center mb-8">Personas & Use Cases</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.useCases.map((useCase: any, index: number) => (
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
        
        <section className="text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Ready to Integrate This Power?</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                Our core products form the backbone of the Entrestate ecosystem. Get started and experience the future of real estate technology.
            </p>
            <div className="mt-8">
                <Link href="/login">
                    <ShinyButton>
                        Start Your Free Trial <ArrowRight />
                    </ShinyButton>
                </Link>
            </div>
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}
