
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, Check, Target, LineChart, Users2, User, Sparkles, Plus, ListChecks, Filter, Bot, Megaphone } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { tools } from '@/lib/tools-client';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

const solutionCategories = [
    {
        name: "Listing Intelligence",
        icon: <ListChecks className="h-8 w-8 text-primary" />,
        description: "From market analysis to crafting the perfect description, these apps give you an unfair advantage in showcasing your properties.",
        apps: tools.filter(t => ['market-reports', 'ai-price-estimator', 'listing-generator', 'aerial-view-generator'].includes(t.id))
    },
    {
        name: "Lead Gen Apps",
        icon: <Target className="h-8 w-8 text-primary" />,
        description: "Go beyond basic ads. Find high-intent buyers and sellers with AI-powered targeting and creative generation.",
        apps: tools.filter(t => ['audience-creator', 'meta-auto-pilot', 'insta-ads-designer', 'landing-pages'].includes(t.id))
    },
    {
        name: "Sales Pro Apps",
        icon: <Sparkles className="h-8 w-8 text-primary" />,
        description: "Automate your sales workflow, from creating stunning assets to generating multi-property offers for clients.",
        apps: tools.filter(t => ['rebranding', 'multi-offer-builder', 'payment-planner', 'ai-video-presenter'].includes(t.id))
    },
    {
        name: "Lead Management Apps",
        icon: <Filter className="h-8 w-8 text-primary" />,
        description: "Nurture your leads with intelligent, automated tools that transform your database into a deal-making engine.",
        apps: tools.filter(t => ['investor-matching', 'lead-investigator', 'whatsapp-manager', 'crm-assistant'].includes(t.id))
    }
];


export default function SolutionsPage() {
  return (
    <>
      <LandingHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-24">
         <PageHeader
            title="An AI Co-pilot for Every Realtor"
            description="Stop juggling a dozen apps. Entrestate is a unified ecosystem of intelligent tools designed to perfect your workflow, from listing to close."
            icon={<Sparkles className="h-8 w-8" />}
          />
        {solutionCategories.map(category => (
            <section key={category.name}>
                <div className="text-center max-w-2xl mx-auto">
                    {category.icon}
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mt-4">{category.name}</h2>
                    <p className="text-lg text-muted-foreground mt-2">{category.description}</p>
                </div>
                <Accordion type="single" collapsible className="w-full space-y-8 mt-12">
                    {category.apps.map((app, index) => (
                        <AccordionItem value={`item-${index}`} key={app.id} className="bg-card/80 backdrop-blur-lg border rounded-2xl shadow-lg shadow-primary/10">
                        <AccordionTrigger className="p-6 text-left hover:no-underline">
                            <div className="flex items-start md:items-center gap-6">
                            <div className="hidden md:block p-3 bg-primary/10 text-primary rounded-lg">
                                {React.cloneElement(app.icon, { className: 'h-8 w-8' })}
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold font-heading">{app.title}</h3>
                                <p className="text-md text-muted-foreground mt-1">{app.description}</p>
                            </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-6 pt-0">
                            <div className="border-t pt-6">
                            <h4 className="font-semibold text-lg mb-2">The Realtor's Advantage:</h4>
                            <p className="text-foreground/80 mb-4">{app.longDescription}</p>
                            
                            <h4 className="font-semibold text-lg mb-2 mt-6">Flow Example:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {app.details.synergy.slice(0, 2).map(synergy => (
                                    <div key={synergy.tool} className="bg-muted/50 p-4 rounded-lg border">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-primary/10 text-primary rounded-md"><h5 className="font-semibold text-sm">{app.title.split(' ')[0]}</h5></div>
                                            <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
                                            <div className="p-2 bg-secondary text-secondary-foreground rounded-md"><h5 className="font-semibold text-sm">{synergy.tool.split(' ')[0]}</h5></div>
                                        </div>
                                        <p className="text-sm text-foreground/80">{synergy.benefit}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <Link href={`/apps/${app.id}`}>
                                    <Button variant="outline">
                                    Explore the {app.title.split(' ')[0]} App <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                            </div>
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        ))}

        <div className="text-center mt-24">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Ready to Become a Super Agent?</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                Train your assistant, explore the apps, and start closing faster today.
            </p>
            <div className="mt-8">
                <Link href="/signup">
                    <Button size="lg">
                        Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
        </div>
      </main>
      <LandingFooter />
    </>
  );
}
