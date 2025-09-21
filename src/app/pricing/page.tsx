
'use client';

import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Wallet, Check, Sparkles, ArrowRight, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { pricingData } from '@/lib/pricing';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  
  const allApps = pricingData.apps;
  const allBundles = pricingData.bundles;

  const handleAppSelection = (appName: string) => {
    setSelectedApps(prev => 
      prev.includes(appName)
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };
  
  const handleBundleSelection = (bundleName: string) => {
    const bundle = allBundles.find(b => b.name === bundleName);
    if (!bundle) return;
    
    // Check if all apps in the bundle are already selected
    const allAppsSelected = bundle.apps.every(app => selectedApps.includes(app));

    if (allAppsSelected) {
      // Deselect all apps from this bundle
      setSelectedApps(prev => prev.filter(app => !bundle.apps.includes(app)));
    } else {
      // Select all apps from this bundle, avoiding duplicates
      setSelectedApps(prev => [...new Set([...prev, ...bundle.apps])]);
    }
  };
  
  const individualAppsPrice = useMemo(() => {
    return allApps
      .filter(app => selectedApps.includes(app.name))
      .reduce((total, app) => total + app.pricing, 0);
  }, [selectedApps, allApps]);


  const activeBundle = useMemo(() => {
    return allBundles.find(bundle => 
        bundle.apps.length === selectedApps.length &&
        bundle.apps.every(app => selectedApps.includes(app))
    );
  }, [selectedApps, allBundles]);

  const finalPrice = activeBundle ? activeBundle.monthly_price : individualAppsPrice;
  const discount = activeBundle ? individualAppsPrice - finalPrice : 0;

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Plans & Pricing"
        description="Choose the perfect toolkit for your real estate ambitions. From individual apps to the full AI-powered ecosystem."
        icon={<Wallet className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="flex justify-center items-center gap-4 mb-12">
            <span className={cn(isAnnual ? 'text-muted-foreground' : 'text-foreground', 'font-medium')}>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Toggle billing frequency" />
            <span className={cn(isAnnual ? 'text-foreground' : 'text-muted-foreground', 'font-medium')}>
                Annually <span className="text-primary font-semibold">(-40%)</span>
            </span>
        </div>
        
        <Card className="bg-gradient-to-br from-blue-500/10 via-transparent to-transparent border-blue-500/20 shadow-2xl shadow-blue-500/10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 items-start">
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-3xl font-bold font-heading">Build Your Own Bundle</h2>
                    <p className="text-lg text-muted-foreground">Select one of our curated bundles or create your own by picking the apps you need.</p>
                     
                     {/* Preset Bundle Selectors */}
                    <div className="space-y-3 pt-4">
                         {allBundles.map(bundle => {
                            const isSelected = bundle.apps.every(app => selectedApps.includes(app));
                            return (
                                <button key={bundle.name} onClick={() => handleBundleSelection(bundle.name)} className={cn(
                                    "w-full p-4 rounded-lg border text-left transition-all",
                                    isSelected ? "bg-primary/10 border-primary/50 ring-2 ring-primary/50" : "bg-card/50 hover:bg-card"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <div className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center", isSelected ? 'bg-primary border-primary' : 'bg-background border-muted-foreground')}>
                                           {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{bundle.name}</p>
                                            <p className="text-xs text-muted-foreground">{bundle.description}</p>
                                        </div>
                                    </div>
                                </button>
                            )
                         })}
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="bg-background/50 rounded-xl p-6 border sticky top-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 max-h-[30rem] overflow-y-auto pr-3">
                             {allApps.map(app => (
                                <div key={app.name} className="flex items-center space-x-3 bg-muted/30 p-3 rounded-md">
                                    <Checkbox 
                                        id={app.name} 
                                        checked={selectedApps.includes(app.name)}
                                        onCheckedChange={() => handleAppSelection(app.name)}
                                    />
                                    <Label htmlFor={app.name} className="flex flex-col cursor-pointer w-full">
                                        <span className="font-semibold text-foreground">{app.name}</span>
                                        <span className="text-xs text-muted-foreground">${app.pricing.toFixed(2)}/mo</span>
                                    </Label>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 border-t pt-6 text-center">
                            {discount > 0 && (
                                <p className="text-destructive line-through">
                                    ${isAnnual ? (individualAppsPrice * 12 * 0.6 / 12).toFixed(2) : individualAppsPrice.toFixed(2)} / mo
                                </p>
                            )}
                            <div className="flex items-baseline justify-center gap-2 mt-1">
                               <span className="text-5xl font-bold text-primary">${isAnnual ? (finalPrice * 12 * 0.6 / 12).toFixed(2) : finalPrice.toFixed(2)}</span>
                               <span className="text-muted-foreground">/ month</span>
                            </div>
                            {discount > 0 && <p className="text-sm text-primary font-semibold">You're saving ${discount.toFixed(2)}/mo with this bundle!</p>}
                             <Button size="lg" className="w-full mt-4" disabled={selectedApps.length === 0}>
                                Get Started with {selectedApps.length} App{selectedApps.length !== 1 && 's'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
      </main>
    </div>
  );
}
