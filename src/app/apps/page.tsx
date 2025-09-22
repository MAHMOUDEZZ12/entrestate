
'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, LayoutTemplate
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Feature, tools as features, FilterCategory } from '@/lib/tools-client';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PageHeader } from '@/components/ui/page-header';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

const filterCategories: FilterCategory[] = [
    'All', 'Marketing', 'Lead Gen', 'Creative', 'Sales Tools', 'Social & Comms', 
    'Web', 'Editing', 'Ads', 'Market Intelligence', 'CRM', 'Developer'
];

const FeatureCard = ({
  feature,
}: {
  feature: Feature;
}) => {
  return (
    <Card 
        className="group flex flex-col h-full bg-card/80 backdrop-blur-lg border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
    >
      <CardContent className="flex flex-col flex-grow p-6">
        <div className='flex items-center justify-between mb-4'>
            <div 
              className="p-3 rounded-lg w-fit text-white"
              style={{ backgroundColor: feature.color }}
            >
                {React.cloneElement(feature.icon, { className: 'h-8 w-8' })}
            </div>
             {(feature.badge) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                     <span className={cn(
                        `px-2 py-0.5 text-xs font-semibold text-white rounded-full transition-all duration-200`,
                         feature.badge === 'NEW' ? 'bg-blue-500' : 
                         feature.badge === 'AUTO' ? 'bg-orange-500' : 'bg-gray-500'
                     )}>
                        {feature.badge}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{
                        feature.badge === 'NEW' ? 'This is a brand new feature!' : 
                        feature.badge === 'AUTO' ? 'This is an automated workflow pilot.' : 
                        'This feature is deprecated.'
                    }</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
        </div>
        <h2 className="text-2xl font-bold font-heading text-foreground mb-2">{feature.title}</h2>
        <p className="text-lg text-foreground/70 flex-grow">{feature.description}</p>
         <div className="mt-6 flex justify-end items-center">
            <Button variant="link" className="p-0 text-base text-primary">
                Explore App
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
         </div>
      </CardContent>
    </Card>
  );
};


export default function AppsPage() {
  const [activeFilter, setActiveFilter] = React.useState<FilterCategory>('All');

  const getCategoryCount = (category: FilterCategory) => {
    if (category === 'All') return features.length;
    return features.filter(f => f.categories.includes(category)).length;
  }

  const filteredFeatures = activeFilter === 'All'
    ? features
    : features.filter(feature => feature.categories.includes(activeFilter));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-full">
        <PageHeader
          icon={<LayoutTemplate className="h-8 w-8" />}
          title="The Entrestate App Store"
          description="The complete arsenal for the modern real estate professional. Explore the tools, train your assistant, and dominate your market."
        />

        <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-lg py-4 mb-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-center overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                    <div className="flex gap-2 md:gap-4 flex-nowrap">
                      {filterCategories.map(category => (
                        <Button
                          key={category}
                          variant={activeFilter === category ? 'default' : 'outline'}
                          onClick={() => setActiveFilter(category)}
                          className={cn(
                            'rounded-full px-4 py-2 text-sm md:text-base transition-all duration-200 shrink-0',
                            activeFilter === category && 'shadow-lg shadow-primary/20'
                          )}
                        >
                          {category} <span className="hidden md:inline-block ml-1 opacity-70">({getCategoryCount(category)})</span>
                        </Button>
                      ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 md:pb-20">
            <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
            >
              {filteredFeatures.map((feature) => (
                 <Link href={`/apps/${feature.id}`} key={feature.id}>
                    <FeatureCard 
                        feature={feature} 
                    />
                </Link>
              ))}
            </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}

    