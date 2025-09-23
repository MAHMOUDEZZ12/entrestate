
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Briefcase, Check, ArrowRight, Bot, Database, Search, Code, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShinyButton } from '@/components/ui/shiny-button';

const servicesData = [
  {
    title: "Market Data Listing",
    description: "We handle the entire process of sourcing, verifying, and listing your property portfolio across all relevant market portals and our own internal library.",
    icon: <Database className="h-8 w-8" />,
    cta: "Request Data Service"
  },
  {
    title: "Intel. Lead Generation",
    description: "Our team runs targeted, AI-powered campaigns to find and qualify high-intent leads, delivering them directly to your sales team.",
    icon: <Search className="h-8 w-8" />,
    cta: "Get Qualified Leads"
  },
  {
    title: "Onsite SEO",
    description: "We optimize your web properties with targeted keywords, technical improvements, and content strategies to dominate search engine rankings for your niche.",
    icon: <ArrowRight className="h-8 w-8" />,
    cta: "Improve My Ranking"
  },
  {
    title: "Web Development",
    description: "From stunning project microsites to robust brokerage portals, our team builds high-performance web applications tailored to the real estate industry.",
    icon: <Code className="h-8 w-8" />,
    cta: "Build My Website"
  },
  {
    title: "Mobile Apps",
    description: "Launch a custom-branded mobile app for your clients or agents, providing on-the-go access to listings, market data, and communication tools.",
    icon: <Smartphone className="h-8 w-8" />,
    cta: "Develop My App"
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full">
         <PageHeader
            title="Our Services"
            description="Let our expert team deliver end-to-end results for your business. We handle the execution, so you can focus on what you do best."
            icon={<Briefcase className="h-8 w-8" />}
          />
        
        <div className="container mx-auto px-4 py-16 md:py-24">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesData.map((service, index) => (
                    <Card key={index} className="flex flex-col bg-card/50 backdrop-blur-lg border-primary/10 shadow-lg text-center hover:-translate-y-1 transition-transform">
                        <CardHeader>
                            <div className="p-4 bg-primary/10 text-primary rounded-full w-fit mx-auto mb-4">
                                {service.icon}
                            </div>
                            <CardTitle>{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <p className="text-muted-foreground">{service.description}</p>
                        </CardContent>
                        <CardContent>
                             <Button size="lg" variant="outline">
                                {service.cta}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        <section className="py-24 bg-muted/30">
           <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-heading">Ready to Outsource Your Growth?</h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                  Focus on what you do best—building relationships and closing deals—while our team handles the rest. Contact us to get a custom quote.
              </p>
              <div className="mt-8">
                  <Link href="/login">
                      <ShinyButton>
                          Book a Free Consultation <Bot className="ml-2" />
                      </ShinyButton>
                  </Link>
              </div>
           </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
