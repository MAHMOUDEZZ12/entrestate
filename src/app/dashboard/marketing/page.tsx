
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
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Feature, tools as features, FilterCategory } from '@/lib/tools-client';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PageHeader } from '@/components/ui/page-header';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';


const filterCategories: FilterCategory[] = [
    'All', 'Marketing', 'Lead Gen', 'Creative', 'Sales Tools', 'Social & Comms', 
    'Web', 'Editing', 'Ads', 'Market Intelligence', 'CRM', 'Developer'
];

export default function MarketingDashboardPage() {
  const [activeFilter, setActiveFilter] = React.useState<FilterCategory>('All');
  const [addedApps, setAddedApps] = React.useState<string[]>([]);
  
   React.useEffect(() => {
    // Persist "added" state in localStorage to simulate a backend
    const savedState = localStorage.getItem('addedApps');
    if (savedState) {
        setAddedApps(JSON.parse(savedState));
    }
  }, []);

  const handleSetIsAdded = (toolId: string, isAdded: boolean) => {
    const newAddedApps = isAdded 
        ? [...addedApps, toolId]
        : addedApps.filter(id => id !== toolId);
    setAddedApps(newAddedApps);
    localStorage.setItem('addedApps', JSON.stringify(newAddedApps));
  }

  const getCategoryCount = (category: FilterCategory) => {
    if (category === 'All') return features.length;
    return features.filter(f => f.categories.includes(category)).length;
  }

  const filteredFeatures = activeFilter === 'All'
    ? features
    : features.filter(feature => feature.categories.includes(activeFilter));

  const appsThatNeedConnection: { [key: string]: string } = {
    'meta-ads-copilot': 'Facebook',
    'audience-creator': 'Facebook',
    'insta-ads-designer': 'Instagram',
    'instagram-admin-ai': 'Instagram',
    'email-creator': 'Gmail / Outlook',
    'whatsapp-manager': 'WhatsApp Business',
  };

  const appsThatNeedPayment: string[] = [
      'rebranding',
      'pdf-editor',
      'landing-pages',
      'investor-matching',
      'market-reports',
      'market-trends'
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-8">
        <PageHeader
            title="Apps"
            description="The complete arsenal for the modern real estate professional. Explore the tools, add them to your workspace, and dominate your market."
            icon={<LayoutTemplate />}
        />

        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg py-4 mb-8">
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
                      {category} <span className="hidden md:inline-block ml-2 opacity-70">({getCategoryCount(category)})</span>
                    </Button>
                  ))}
                </div>
            </div>
        </div>

        <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredFeatures.map((feature) => (
            <DashboardServiceCard 
                key={feature.id} 
                tool={feature}
                isAdded={addedApps.includes(feature.id)}
                setIsAdded={(isAdded) => handleSetIsAdded(feature.id, isAdded)}
                connectionRequired={appsThatNeedConnection[feature.id]}
                paymentRequired={appsThatNeedPayment.includes(feature.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
