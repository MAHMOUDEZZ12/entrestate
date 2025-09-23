
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Briefcase, Check, ArrowRight, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShinyButton } from '@/components/ui/shiny-button';

const servicesData = [
  {
    title: "Done-for-You Ad Campaigns",
    description: "Our expert team, powered by our own AI tools, will design, launch, and manage your entire ad campaign on platforms like Meta and Google. We handle everything from audience creation to ad copy and optimization.",
    deliverables: ["Full campaign setup", "Audience research & targeting", "Ad creative & copy", "Weekly performance reports"],
    price: "From $999/mo + Ad Spend",
    cta: "Request a Campaign"
  },
  {
    title: "Full Market Listing Service",
    description: "We'll take your entire property portfolio and create optimized, high-quality listings for all major portals. This includes professional copywriting, data verification, and syndication management.",
    deliverables: ["Professional listing copywriting", "Data verification & cleanup", "Multi-portal syndication (Bayut, Property Finder, etc.)", "Performance tracking"],
    price: "From $499/project",
    cta: "List Your Portfolio"
  },
  {
    title: "Lead Generation for Teams",
    description: "A complete lead generation service for your brokerage or team. We use our AI to identify high-intent leads, run targeted outreach campaigns, and deliver qualified prospects directly to your CRM.",
    deliverables: ["Guaranteed number of qualified leads per month", "Custom landing pages", "Multi-channel outreach (Email, WhatsApp)", "CRM integration"],
    price: "Custom Pricing",
    cta: "Get a Quote"
  },
  {
    title: "CRM System Setup & AI Integration",
    description: "Let us set up and configure your entire CRM. We will structure your data, train your AI Assistant on your client history, and build automated workflows to streamline your sales process.",
    deliverables: ["CRM setup & data migration", "AI Assistant training", "Custom workflow automation", "Team training session"],
    price: "One-time fee from $2,499",
    cta: "Book a Consultation"
  }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full">
         <PageHeader
            title="Our Services"
            description="Let us do the heavy lifting. Our team of experts, augmented by our powerful AI, can deliver end-to-end results for your business."
            icon={<Briefcase className="h-8 w-8" />}
          />
        
        <div className="container mx-auto px-4 py-16 md:py-24 space-y-12">
          {servicesData.map((service, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-lg border-primary/10 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-8">
                  <h3 className="text-2xl font-bold font-heading mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted/50 p-8 rounded-b-lg lg:rounded-r-lg lg:rounded-l-none flex flex-col items-center justify-center text-center">
                  <p className="text-lg font-semibold">Pricing</p>
                  <p className="text-3xl font-bold my-2">{service.price}</p>
                  <Button size="lg" className="w-full mt-4">
                    {service.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
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
