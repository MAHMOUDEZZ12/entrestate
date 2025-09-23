
'use client';

import React from 'react';
import {
  LayoutTemplate
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Feature, tools as allTools, FilterCategory } from '@/lib/tools-client';
import { PageHeader } from '@/components/ui/page-header';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';
import { pricingData } from '@/lib/pricing-data';

// Merge pricing data into tools
const features: (Feature & { price: number })[] = allTools.map(tool => {
  const priceInfo = pricingData.apps.find(app => app.name.toLowerCase().replace(/\s/g, '-') === tool.id.toLowerCase());
  return {
    ...tool,
    price: priceInfo?.price_monthly || 0,
  };
});

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

  const appsThatNeedPayment: string[] = features.filter(f => f.price > 0).map(f => f.id);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-8">
        <PageHeader
            title="App Store"
            description="The complete arsenal for the modern real estate professional. Explore the tools, add them to your workspace, and dominate your market."
            icon={<LayoutTemplate />}
        />

        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg py-4 mb-8 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8">
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
                      {category} <span className="hidden md:inline-block ml-2 opacity-70">({getCategoryCount(category)})</span>
                    </Button>
                  ))}
                </div>
            </div>
        </div>

        <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
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
