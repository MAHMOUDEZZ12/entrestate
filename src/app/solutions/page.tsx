
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Sparkles, Building, User, Users, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const solutionsData = [
  {
    persona: "For The Individual Agent",
    icon: <User className="h-8 w-8" />,
    tagline: "Become a 'Super Agent' with an AI-powered toolkit that automates marketing, finds leads, and closes deals faster.",
    challenges: [
      "Spending too much time on repetitive marketing tasks.",
      "Struggling to stand out in a crowded market.",
      "Losing track of leads and follow-ups."
    ],
    solutionApps: ["Meta Auto Pilot", "Insta Ads Designer", "Listing Generator", "CRM Memory Assistant", "WhatsApp Manager"]
  },
  {
    persona: "For The Brokerage",
    icon: <Users className="h-8 w-8" />,
    tagline: "Equip your entire team with a unified OS. Ensure brand consistency, streamline workflows, and get a bird's-eye view of performance.",
     challenges: [
      "Inconsistent branding across agent materials.",
      "Lack of standardized, efficient workflows.",
      "Difficulty tracking team and listing performance."
    ],
    solutionApps: ["Automated Rebranding", "Listing Manager", "Flow Builder", "Audience Creator", "Listing Performance"]
  },
  {
    persona: "For The Developer",
    icon: <Building className="h-8 w-8" />,
    tagline: "Manage your project portfolio from a single dashboard. Track market trends and empower your sales network with cutting-edge assets.",
    challenges: [
      "Effectively marketing entire off-plan projects at scale.",
      "Keeping the sales network equipped with the latest assets.",
      "Gauging market sentiment and pricing new launches."
    ],
    solutionApps: ["Market Reports", "Market Library", "AI Video Presenter", "Landing Page Builder", "Bayut Pilot"]
  }
];

const faqData = [
    {
        question: "What is Entrestate?",
        answer: "Entrestate is an AI-native operating system designed for the real estate industry. It integrates market intelligence, creative tooling, and campaign automation into a single, seamless cockpit to give professionals an unparalleled advantage."
    },
    {
        question: "Who is Entrestate for?",
        answer: "Entrestate is designed for the entire real estate ecosystem: individual agents who want to automate their marketing, brokerages looking to empower their teams with consistent tools, and developers needing to manage portfolios and launch large-scale campaigns."
    },
    {
        question: "Is my data secure?",
        answer: "Yes. Your data, including uploaded documents and client lists, is kept strictly private. It is used only to power your personal AI tools and is never shared or used for training external models."
    },
     {
        question: "How does the pricing work?",
        answer: "We offer flexible pricing. You can subscribe to individual apps, purchase bundles for specific needs (like Marketing or Creative), or unlock the entire suite with our Pro plan. Visit our Pricing page for full details."
    },
    {
        question: "Can I suggest a new app or feature?",
        answer: "Absolutely. We are constantly building and improving. You can assign tasks and suggest new features directly to our team via the Dev Admin dashboard, which is your shared workspace with our AI development team."
    }
];


export default function SolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full">
         <PageHeader
            title="Solutions for a New Era of Real Estate"
            description="Entrestate provides a tailored operating system for every role in the industry. Discover how our ecosystem can transform your workflow."
            icon={<Sparkles className="h-8 w-8" />}
          />
        
        <div className="container mx-auto px-4 py-16 md:py-24 space-y-24">
          {solutionsData.map((solution, index) => (
            <section key={solution.persona} id={solution.persona.toLowerCase().replace(/\s/g, '-')}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={cn("space-y-6", index % 2 !== 0 && "lg:order-2")}>
                      <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit">
                        {solution.icon}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold font-heading">{solution.persona}</h2>
                      <p className="text-lg text-muted-foreground">{solution.tagline}</p>
                      <ul className="space-y-3">
                          {solution.challenges.map((challenge, i) => (
                              <li key={i} className="flex items-start gap-3">
                                  <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                                  <span className="text-foreground/90">{challenge}</span>
                              </li>
                          ))}
                      </ul>
                       <Link href="/pricing">
                          <Button size="lg" className="mt-4">
                            View {solution.persona.split(' ').pop()} Plan <ArrowRight className="ml-2"/>
                          </Button>
                      </Link>
                  </div>
                  <div className={cn(index % 2 !== 0 && "lg:order-1")}>
                      <Card className="bg-card/50 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/10">
                          <CardHeader>
                              <CardTitle>Your Solution Bundle</CardTitle>
                              <CardDescription>A curated set of apps to solve your biggest challenges.</CardDescription>
                          </CardHeader>
                          <CardContent className="grid grid-cols-2 gap-4">
                              {solution.solutionApps.map(app => (
                                  <div key={app} className="p-3 bg-muted rounded-md text-sm font-medium">{app}</div>
                              ))}
                          </CardContent>
                      </Card>
                  </div>
              </div>
            </section>
          ))}
        </div>

        <section className="py-24 bg-muted/30">
           <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Frequently Asked Questions</h2>
                <p className="text-lg text-muted-foreground mt-4">Quick answers to common questions.</p>
              </div>
               <Card className="bg-card">
                  <CardContent className="p-6">
                     <Accordion type="single" collapsible className="w-full">
                        {faqData.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-left text-lg hover:no-underline">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground pt-2">
                                    {faq.answer}
                                </AccordionContent>
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
