
'use client';

import React, { useMemo, useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, Check, Package, Sparkles, Wallet } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { pricingData } from '@/lib/pricing';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

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
  
    // Check if all apps in the bundle are currently selected
    const isBundleCurrentlySelected = bundle.apps.every(app => selectedApps.includes(app)) && bundle.apps.length === selectedApps.filter(sa => bundle.apps.includes(sa)).length;
  
    if (isProSelected) {
      // If PRO is selected, clicking a bundle deselects PRO and selects the bundle's apps
      setSelectedApps(bundle.apps);
    } else if (isBundleCurrentlySelected) {
      // If the bundle is fully selected, deselect its apps
      setSelectedApps(prev => prev.filter(app => !bundle.apps.includes(app)));
    } else {
      // Otherwise, add all apps from the bundle to the current selection, avoiding duplicates
      setSelectedApps(prev => [...new Set([...prev, ...bundle.apps])]);
    }
  };

  const handleSelectPro = () => {
    if (!proPlan) return;
    const isCurrentlyPro = allApps.length > 0 && allApps.every(app => selectedApps.includes(app)) && selectedApps.length === allApps.length;

    if (isCurrentlyPro) {
      setSelectedApps([]);
    } else {
      setSelectedApps(proPlan.apps);
    }
  };

  const individualAppsPrice = useMemo(() => {
    return allApps
      .filter(app => selectedApps.includes(app.name))
      .reduce((total, app) => total + app.pricing, 0);
  }, [selectedApps, allApps]);

  const activeBundle = useMemo(() => {
    if (!proPlan || !allApps.every(app => selectedApps.includes(app.name))) {
      const foundBundle = bundles.find(bundle =>
        bundle.apps.length > 0 &&
        bundle.apps.length === selectedApps.length &&
        bundle.apps.every(app => selectedApps.includes(app))
      );
      return foundBundle;
    }
    return null;
  }, [selectedApps, bundles, proPlan, allApps]);

  const isProSelected = useMemo(() => {
    if (!proPlan) return false;
    return allApps.length > 0 && allApps.every(app => selectedApps.includes(app.name));
  }, [selectedApps, proPlan, allApps]);


  const finalPrice = isProSelected && proPlan ? proPlan.monthly_price : activeBundle ? activeBundle.monthly_price : individualAppsPrice;
  const discount = activeBundle ? individualAppsPrice - activeBundle.monthly_price : isProSelected && proPlan ? individualAppsPrice - proPlan.monthly_price : 0;

  const getBundleSavings = (bundle: typeof bundles[0]) => {
    const bundleAppsPrice = bundle.apps.reduce((total, appName) => {
      const app = allApps.find(a => a.name === appName);
      return total + (app?.pricing || 0);
    }, 0);
    return bundleAppsPrice - bundle.monthly_price;
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Plans & Pricing"
        description="Choose the perfect toolkit for your real estate ambitions. From individual apps to the full AI-powered ecosystem."
        icon={<Wallet className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={cn(isAnnual ? 'text-muted-foreground' : 'text-foreground', 'font-medium')}>Pay Monthly</span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Toggle billing frequency" />
          <span className={cn(isAnnual ? 'text-foreground' : 'text-muted-foreground', 'font-medium')}>
            Pay Annually <span className="text-primary font-semibold">(-40%)</span>
          </span>
        </div>

        <div className="space-y-8">
          {proPlan && (
            <div className="relative">
              <button onClick={handleSelectPro} className={cn(
                "w-full p-6 rounded-lg border text-left transition-all relative overflow-hidden",
                isProSelected ? "bg-primary/20 border-primary ring-2 ring-primary shadow-2xl shadow-primary/20" : "bg-card/50 hover:bg-card"
              )}>
                <div className="absolute top-2 right-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                  Best Value
                </div>
                <div className="flex items-center gap-4">
                  <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0", isProSelected ? 'bg-primary border-primary' : 'bg-background border-muted-foreground')}>
                    {isProSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-2xl md:text-3xl">{proPlan.name}</p>
                    <p className="text-md text-muted-foreground text-left">{proPlan.description}</p>
                  </div>
                </div>
              </button>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="h-px w-full bg-border" />
            <span className="text-muted-foreground font-semibold">OR</span>
            <div className="h-px w-full bg-border" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-heading">Build Your Plan</CardTitle>
              <CardDescription>Select a preset bundle as a starting point, or choose apps individually.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {bundles.map(bundle => {
                    const isSelected = bundle.apps.every(app => selectedApps.includes(app)) && bundle.apps.length === selectedApps.filter(sa => bundle.apps.includes(sa)).length;
                    const savings = getBundleSavings(bundle);
                    return (
                      <button
                        key={bundle.name}
                        onClick={() => handleBundleSelection(bundle.name)}
                        className={cn(
                          "p-4 rounded-lg border text-left transition-all relative",
                          isSelected ? "bg-primary/10 border-primary/50" : "bg-muted/30 hover:bg-muted/70",
                          isProSelected && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={isProSelected}
                      >
                         <Badge variant={isSelected ? "default" : "secondary"} className="absolute -top-2 -right-2">Bundle</Badge>
                        <div className="flex items-center gap-3">
                           <div className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0", isSelected ? 'bg-primary border-primary' : 'bg-background border-muted-foreground')}>
                            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <p className="font-semibold text-foreground">{bundle.name}</p>
                        </div>
                        {savings > 0 && <p className="text-xs font-semibold text-primary mt-2">Save ${savings.toFixed(2)}/mo</p>}
                      </button>
                    );
                  })}
                </div>
              <div>
                <h3 className="font-semibold mb-3">Included Apps:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 max-h-[40rem] overflow-y-auto pr-3 rounded-lg border bg-background/50 p-4">
                  {allApps.map(app => (
                    <div key={app.name} className="flex items-center space-x-3 bg-muted/30 p-3 rounded-md hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id={app.name}
                        checked={selectedApps.includes(app.name)}
                        onCheckedChange={() => handleAppSelection(app.name)}
                        disabled={isProSelected}
                      />
                      <Label htmlFor={app.name} className="flex flex-col cursor-pointer w-full">
                        <span className="font-semibold text-foreground">{app.name}</span>
                        <span className="text-xs text-muted-foreground">${app.pricing.toFixed(2)}/mo</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="sticky bottom-4 z-10 shadow-2xl backdrop-blur-lg bg-card/80">
            <CardHeader>
              <CardTitle>Your Custom Plan</CardTitle>
            </CardHeader>
            <CardContent>
                {selectedApps.length > 0 && (
                    <div className="mb-4">
                        <p className="font-semibold text-sm mb-2">
                           {isProSelected ? "ENTRESTATE PRO includes all apps." :
                            activeBundle ? `Bundle: "${activeBundle.name}"` :
                            `${selectedApps.length} app(s) selected.`
                           }
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {selectedApps.map(appName => (
                                <Badge key={appName} variant="secondary">{appName}</Badge>
                            ))}
                        </div>
                    </div>
                )}
              <div className="text-center">
                {discount > 0 && (
                  <p className="text-muted-foreground line-through">
                    ${isAnnual ? (individualAppsPrice * 12 * 0.6 / 12).toFixed(2) : individualAppsPrice.toFixed(2)}
                    /mo
                  </p>
                )}
                <div className="flex items-baseline justify-center gap-2 mt-1">
                  <span className="text-5xl font-bold text-primary">${isAnnual ? (finalPrice * 12 * 0.6 / 12).toFixed(2) : finalPrice.toFixed(2)}</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                {isAnnual && <p className="text-xs text-muted-foreground mt-2">(Billed annually)</p>}

                {activeBundle && <p className="text-sm text-primary font-semibold mt-2">You're saving ${getBundleSavings(activeBundle).toFixed(2)}/mo with the {activeBundle.name} bundle!</p>}
                {isProSelected && proPlan && <p className="text-sm text-primary font-semibold mt-2">You're saving ${discount.toFixed(2)}/mo with the PRO plan!</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/signup" className="w-full">
                <Button size="lg" className="w-full" disabled={selectedApps.length === 0}>
                  {isProSelected ? 'Get Full Access To All The APPS' : `Get ${selectedApps.length > 0 ? selectedApps.length : ''} App(s)`}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
