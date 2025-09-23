
'use client';

import React from 'react';
import {
  LayoutTemplate, Check, Package, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Feature, tools as allTools } from '@/lib/tools-client';
import { PageHeader } from '@/components/ui/page-header';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';
import { pricingData } from '@/lib/pricing-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Suite } from '@/lib/tools-data';

// Merge pricing data into tools
const features: (Feature & { price: number })[] = allTools.map(tool => {
  const priceInfo = pricingData.apps.find(app => app.name.toLowerCase().replace(/\s/g, '-') === tool.id.toLowerCase());
  return {
    ...tool,
    price: priceInfo?.price_monthly || 0,
  };
});

const suiteOrder: Suite[] = [
    'Meta Marketing Suite',
    'AI Listing Portal',
    'AI Creative Studio',
    'Lead Intelligence AI',
    'Marketing Management',
    'Google Ads Suite',
    'Web Development Lab',
    'Core AI',
    'Utility',
];

const suiteIcons: Record<Suite, React.ReactNode> = {
    'Meta Marketing Suite': <Sparkles />,
    'AI Listing Portal': <Package />,
    'AI Creative Studio': <Sparkles />,
    'Lead Intelligence AI': <Sparkles />,
    'Marketing Management': <Sparkles />,
    'Google Ads Suite': <Sparkles />,
    'Web Development Lab': <Sparkles />,
    'Core AI': <Sparkles />,
    'Utility': <Sparkles />,
};


export default function MarketingDashboardPage() {
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

  const appsThatNeedConnection: { [key: string]: string } = {
    'meta-ads-copilot': 'Facebook',
    'audience-creator': 'Facebook',
    'insta-ads-designer': 'Instagram',
    'instagram-admin-ai': 'Instagram',
    'email-creator': 'Gmail / Outlook',
    'whatsapp-manager': 'WhatsApp Business',
  };

  const appsThatNeedPayment: string[] = features.filter(f => f.price > 0).map(f => f.id);
  
  const groupedTools = features.reduce((acc, tool) => {
    const suite = tool.suite || 'Utility';
    if (!acc[suite]) {
      acc[suite] = [];
    }
    acc[suite].push(tool);
    return acc;
  }, {} as Record<Suite, Feature[]>);


  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-8">
        <PageHeader
            title="Suite Store"
            description="The complete arsenal for the modern real estate professional. Explore the tool suites, add them to your workspace, and dominate your market."
            icon={<LayoutTemplate />}
        />
        
        <div className="space-y-12 mt-8">
            {suiteOrder.map(suiteName => {
                const toolsInSuite = groupedTools[suiteName];
                if (!toolsInSuite) return null;

                const allInSuiteAdded = toolsInSuite.every(tool => addedApps.includes(tool.id));

                return (
                    <Card key={suiteName} className="bg-card/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl">
                                {suiteIcons[suiteName]}
                                {suiteName}
                                {allInSuiteAdded && <Check className="h-6 w-6 text-green-500" />}
                            </CardTitle>
                            <CardDescription>A collection of tools designed for {suiteName.toLowerCase()}.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                {toolsInSuite.map((feature) => (
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
                        </CardContent>
                    </Card>
                )
            })}
        </div>
      </main>
    </div>
  );
}
