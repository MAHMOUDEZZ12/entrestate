

'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Wallet, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { PricingCard } from '@/components/pricing-card';
import { pricingData, AppData, PlanData } from '@/lib/pricing-data';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  const individualApps = pricingData.apps;
  const plans = pricingData.plans;

  const handleAppSelection = (appName: string) => {
    setSelectedApps(prev =>
      prev.includes(appName)
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };
  
  const calculateCustomPrice = () => {
    const monthlyPrice = selectedApps.reduce((total, appName) => {
      const app = individualApps.find(a => a.name === appName);
      return total + (app?.price_monthly || 0);
    }, 0);

    return isAnnual ? monthlyPrice * 12 * 0.8 : monthlyPrice; // 20% discount for annual
  }
  
  const customPrice = calculateCustomPrice();

  const groupedApps = individualApps.reduce((acc, app) => {
    const category = app.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(app);
    return acc;
  }, {} as Record<string, AppData[]>);


  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <PageHeader
          title="Plans &amp; Pricing"
          description="Choose the perfect toolkit for your real estate ambitions. From individual apps to the full AI-powered ecosystem."
          icon={<Wallet className="h-8 w-8" />}
        />
        <div className="flex justify-center items-center gap-4 my-12">
          <span className={cn(!isAnnual ? 'text-foreground' : 'text-muted-foreground', 'font-medium')}>Pay Monthly</span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Toggle billing frequency" />
          <span className={cn(isAnnual ? 'text-foreground' : 'text-muted-foreground', 'font-medium')}>
            Pay Annually <span className="text-primary font-semibold">(-20%)</span>
          </span>
        </div>
        
        <Tabs defaultValue="plans" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="plans">Plans</TabsTrigger>
                <TabsTrigger value="custom">Build Your Own</TabsTrigger>
            </TabsList>
            <TabsContent value="plans" className="mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                  {plans.map((plan) => (
                    <PricingCard key={plan.id} plan={plan} isAnnual={isAnnual} />
                  ))}
                </div>
            </TabsContent>
            <TabsContent value="custom" className="mt-12">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="md:col-span-2 space-y-8">
                        {Object.entries(groupedApps).map(([category, apps]) => (
                            <div key={category}>
                                <h3 className="font-semibold text-lg mb-4">{category}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {apps.map(app => (
                                    <div key={app.name} className="flex items-center space-x-3 bg-muted/50 p-3 rounded-md hover:bg-muted/80 transition-colors">
                                      <Checkbox
                                        id={app.name}
                                        checked={selectedApps.includes(app.name)}
                                        onCheckedChange={() => handleAppSelection(app.name)}
                                      />
                                      <Label htmlFor={app.name} className="flex flex-col cursor-pointer w-full">
                                        <span className="font-medium text-foreground text-sm">{app.name}</span>
                                        <span className="text-xs text-muted-foreground">${app.price_monthly.toFixed(2)}/mo</span>
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                            </div>
                        ))}
                     </div>
                     <div className="sticky top-24">
                        <PricingCard 
                            plan={{
                                id: 'custom',
                                name: 'Your Custom Plan',
                                tagline: `${selectedApps.length} app(s) selected.`,
                                price_monthly: isAnnual ? (customPrice > 0 ? (customPrice / 12 * (1/0.8)) : 0) : customPrice,
                                popular: false,
                                features: selectedApps.length > 0 ? selectedApps : ['Select apps to see them here.']
                            }}
                            isAnnual={isAnnual}
                        />
                     </div>
                 </div>
            </TabsContent>
        </Tabs>
        
      </main>
      <LandingFooter />
    </div>
  );
}

    