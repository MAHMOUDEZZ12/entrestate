
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
  const bundles = pricingData.bundles.filter(b => b.name !== 'ENTRESTATE PRO');
  const proPlan = pricingData.bundles.find(b => b.name === 'ENTRESTATE PRO');

  const handleAppSelection = (appName: string) => {
    setSelectedApps(prev => 
      prev.includes(appName)
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };
  
  const handleBundleSelection = (bundleName: string) => {
    const bundle = bundles.find(b => b.name === bundleName);
    if (!bundle) return;
    
    const allAppsInBundleSelected = bundle.apps.every(app => selectedApps.includes(app));

    if (allAppsInBundleSelected) {
      setSelectedApps(prev => prev.filter(app => !bundle.apps.includes(app)));
    } else {
      setSelectedApps(prev => [...new Set([...prev, ...bundle.apps])]);
    }
  };

  const handleSelectPro = () => {
    const isCurrentlyPro = allApps.length === selectedApps.length && allApps.every(app => selectedApps.includes(app.name));
    if (isCurrentlyPro) {
        setSelectedApps([]);
    } else {
        setSelectedApps(allApps.map(app => app.name));
    }
  };
  
  const individualAppsPrice = useMemo(() => {
    return allApps
      .filter(app => selectedApps.includes(app.name))
      .reduce((total, app) => total + app.pricing, 0);
  }, [selectedApps, allApps]);


  const activeBundle = useMemo(() => {
     return bundles.find(bundle => 
        bundle.apps.length === selectedApps.length &&
        bundle.apps.every(app => selectedApps.includes(app))
    );
  }, [selectedApps, bundles]);
  
  const isProSelected = useMemo(() => {
    return allApps.length === selectedApps.length && allApps.every(app => selectedApps.includes(app.name));
  }, [selectedApps, allApps]);


  const finalPrice = isProSelected && proPlan ? proPlan.monthly_price : activeBundle ? activeBundle.monthly_price : individualAppsPrice;
  const discount = activeBundle ? individualAppsPrice - activeBundle.monthly_price : isProSelected && proPlan ? individualAppsPrice - proPlan.monthly_price : 0;

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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                 <Card className="bg-gradient-to-br from-blue-500/10 via-transparent to-transparent border-blue-500/20 shadow-2xl shadow-blue-500/10">
                     <CardHeader>
                        <CardTitle className="text-2xl font-bold font-heading">Build Your Plan</CardTitle>
                        <CardDescription>Select apps individually, or choose a preset bundle to get started.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 max-h-[40rem] overflow-y-auto pr-3 rounded-lg border bg-background/50 p-4">
                             {allApps.map(app => (
                                <div key={app.name} className="flex items-center space-x-3 bg-muted/30 p-3 rounded-md hover:bg-muted/50 transition-colors">
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
                    </CardContent>
                </Card>
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold font-heading text-center">Or Start with a Bundle</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {bundles.map(bundle => {
                            const isSelected = bundle.apps.length > 0 && selectedApps.length > 0 && bundle.apps.every(app => selectedApps.includes(app));
                            return (
                                <button key={bundle.name} onClick={() => handleBundleSelection(bundle.name)} className={cn(
                                    "w-full p-4 rounded-lg border text-left transition-all h-full",
                                    isSelected ? "bg-primary/10 border-primary/50 ring-2 ring-primary/50" : "bg-card/50 hover:bg-card"
                                )}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center", isSelected ? 'bg-primary border-primary' : 'bg-background border-muted-foreground')}>
                                        {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                                        </div>
                                        <p className="font-semibold text-foreground">{bundle.name}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{bundle.description}</p>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-24">
                {proPlan && (
                    <button onClick={handleSelectPro} className={cn(
                        "w-full p-6 rounded-lg border text-left transition-all relative overflow-hidden",
                        isProSelected ? "bg-primary/20 border-primary ring-2 ring-primary shadow-2xl shadow-primary/20" : "bg-card/50 hover:bg-card"
                    )}>
                        <div className="absolute top-2 right-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                            Best Value
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center", isProSelected ? 'bg-primary border-primary' : 'bg-background border-muted-foreground')}>
                            {isProSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <p className="font-semibold text-foreground text-lg">{proPlan.name}</p>
                        </div>
                        <p className="text-muted-foreground mt-2">{proPlan.description}</p>
                        <div
                            className={cn(
                            "absolute -bottom-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl transition-opacity duration-500",
                            isProSelected ? "opacity-100" : "opacity-0"
                            )}
                        />
                    </button>
                )}
                 <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Your Total</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        {discount > 0 && (
                            <p className="text-destructive line-through">
                                ${isAnnual ? (individualAppsPrice * 12 * 0.6).toFixed(2) : individualAppsPrice.toFixed(2)}
                                <span className="text-xs">/{isAnnual ? 'yr' : 'mo'}</span>
                            </p>
                        )}
                        <div className="flex items-baseline justify-center gap-2 mt-1">
                           <span className="text-5xl font-bold text-primary">${isAnnual ? (finalPrice * 12 * 0.6).toFixed(2) : finalPrice.toFixed(2)}</span>
                           <span className="text-muted-foreground">/ {isAnnual ? 'year' : 'month'}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">which is ${isAnnual ? ((finalPrice * 12 * 0.6) / 12).toFixed(2) : finalPrice.toFixed(2)} / month</p>
                        {activeBundle && <p className="text-sm text-primary font-semibold">You're saving ${discount.toFixed(2)}/mo with the {activeBundle.name} bundle!</p>}
                    </CardContent>
                    <CardFooter>
                         <Button size="lg" className="w-full" disabled={selectedApps.length === 0}>
                            Get Started
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
