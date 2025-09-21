
'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight, Bot, BrainCircuit, CheckCircle, Plus, Sparkles, Upload, Megaphone,
  User, ShieldQuestion, Search, MessageCircle, PenTool, Clock2, Wallet, BadgeCheck,
  ClipboardList, Target, LineChart, Users2, Network, LayoutTemplate
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Feature, tools as features, FilterCategory } from '@/lib/tools-client';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const filterCategories: FilterCategory[] = [
    'All', 'Marketing', 'Lead Gen', 'Creative', 'Sales Tools', 'Social & Comms', 
    'Web', 'Editing', 'Ads', 'Market Intelligence', 'CRM', 'Developer'
];

const announcements = [
    "The new Meta Auto Pilot can now orchestrate your entire ad workflow!",
    "You can now connect your Bayut account to sync listings automatically.",
    "The Investor Matching tool now supports commercial properties.",
];

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <Link href={`/apps/${feature.id}`} className="group flex flex-col h-full">
        <Card 
            className="flex flex-col flex-grow bg-card/80 backdrop-blur-lg border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 h-full"
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
             <div className="mt-6">
                <Button variant="link" className="p-0 text-base text-primary">
                    Explore App
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
             </div>
          </CardContent>
        </Card>
    </Link>
  );
};

export default function AppsPage() {
  const [activeFilter, setActiveFilter] = React.useState<FilterCategory>('All');
  const [currentAnnouncement, setCurrentAnnouncement] = React.useState(announcements[0]);

  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * announcements.length);
    setCurrentAnnouncement(announcements[randomIndex]);
  }, []);

  const getCategoryCount = (category: FilterCategory) => {
    if (category === 'All') return features.length;
    return features.filter(f => f.categories.includes(category)).length;
  }

  const filteredFeatures = activeFilter === 'All'
    ? features
    : features.filter(feature => feature.categories.includes(activeFilter));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-24 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold font-heading tracking-tighter mb-4 text-foreground">
            Your AI Tool Suite
          </h1>
          <p className="text-lg md:text-xl text-foreground/70">
            The complete arsenal for the modern real estate professional. Explore the tools, train your assistant, and dominate your market.
          </p>
        </div>

        <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-lg py-4 mb-8">
            <div className="flex justify-center overflow-x-auto pb-4 no-scrollbar">
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
                      {category} <span className="hidden md:inline-block ml-1">({getCategoryCount(category)})</span>
                    </Button>
                  ))}
                </div>
            </div>
            <div className="text-center text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">What's New?</span> {currentAnnouncement}
            </div>
        </div>

        <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 lg:gap-12 max-w-[120rem] mx-auto"
        >
          {filteredFeatures.map((feature) => (
            <FeatureCard 
                key={feature.id} 
                feature={feature} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}
