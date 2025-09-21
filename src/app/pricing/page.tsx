
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

const utilityApps = [
    'AI Price Estimator',
    'Commission Calculator',
    'Payment Planner',
    'Deal Analyzer',
    'Market Trends Watcher',
    'Listing Performance',
];

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
  
  const isBundleSelected = (bundleApps: string[]) => {
      if (bundleApps.length === 0 || selectedApps.length === 0) return false;
      if (bundleApps.length !== selectedApps.length) return false;
      const selectedSet = new Set(selectedApps);
      return bundleApps.every(app => selectedSet.has(app));
  }

  const handleBundleSelection = (bundle: typeof bundles[0]) => {
    const isCurrentlySelected = isBundleSelected(bundle.apps);

    if (isCurrentlySelected) {
      setSelectedApps([]);
    } else {
      setSelectedApps(bundle.apps);
    }
  };

  const handleSelectPro = () => {
    if (!proPlan) return;
    const isCurrentlyPro = isBundleSelected(proPlan.apps);
     if (isCurrentlyPro) {
      setSelectedApps([]);
    } else {
      setSelectedApps(proPlan.apps);
    }
  };

  const { finalPrice, discount, activeBundle, utilityDiscount } = useMemo(() => {
    
    const checkIsBundleSelected = (bundleApps: string[]) => {
        if (bundleApps.length === 0 || selectedApps.length === 0) return false;
        if (bundleApps.length !== selectedApps.length) return false;
        const selectedSet = new Set(selectedApps);
        return bundleApps.every(app => selectedSet.has(app));
    };
    
    const matchedBundle = [...bundles, proPlan].find(bundle => bundle && checkIsBundleSelected(bundle.apps));

    if (matchedBundle) {
        const individualPrice = matchedBundle.apps.reduce((total, appName) => {
            const app = allApps.find(a => a.name === appName);
            return total + (app?.pricing || 0);
        }, 0);
        return { 
            finalPrice: matchedBundle.monthly_price, 
            discount: individualPrice - matchedBundle.monthly_price, 
            activeBundle: matchedBundle,
            utilityDiscount: 0,
        };
    }
    
    // If no bundle is matched, calculate individual app pricing with utility discounts
    const selectedUtilityApps = selectedApps.filter(appName => utilityApps.includes(appName));
    const utilityAppCount = selectedUtilityApps.length;

    let utilityDiscountRate = 0;
    if (utilityAppCount >= 5) {
      utilityDiscountRate = 0.50; // 50%
    } else if (utilityAppCount >= 3) {
      utilityDiscountRate = 0.25; // 25%
    }

    const originalUtilityPrice = selectedUtilityApps.reduce((total, appName) => {
        const app = allApps.find(a => a.name === appName);
        return total + (app?.pricing || 0);
    }, 0);
    
    const discountedUtilityPrice = originalUtilityPrice * (1 - utilityDiscountRate);
    const utilityDiscountValue = originalUtilityPrice - discountedUtilityPrice;

    const otherAppsPrice = selectedApps
        .filter(appName => !utilityApps.includes(appName))
        .reduce((total, appName) => {
            const app = allApps.find(a => a.name === appName);
            return total + (app?.pricing || 0);
        }, 0);
    
    const totalIndividualPrice = discountedUtilityPrice + otherAppsPrice;

    return { 
      finalPrice: totalIndividualPrice, 
      discount: 0, 
      activeBundle: null,
      utilityDiscount: utilityDiscountValue,
    };
  }, [selectedApps, allApps, bundles, proPlan]);

  const isProSelected = activeBundle?.name === 'ENTRESTATE PRO';

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
                    <p className="font-semibold text-foreground text-3xl md:text-4xl">{proPlan.name}</p>
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
                    const isSelected = isBundleSelected(bundle.apps);
                    const savings = getBundleSavings(bundle);
                    return (
                      <Card
                        key={bundle.name}
                        onClick={() => handleBundleSelection(bundle)}
                        className={cn(
                          "cursor-pointer transition-all relative",
                          isSelected ? "bg-primary/10 border-primary/50 ring-2 ring-primary/30" : "bg-muted/30 hover:bg-muted/70",
                          isProSelected && "opacity-50 cursor-not-allowed"
                        )}
                        aria-disabled={isProSelected}
                      >
                         <CardHeader>
                            <Badge variant={isSelected ? "default" : "secondary"} className="absolute -top-2 -right-2">Bundle</Badge>
                            <CardTitle className="text-lg">{bundle.name}</CardTitle>
                            {savings > 0 && <CardDescription className="text-primary font-semibold">Save ${savings.toFixed(2)}/mo</CardDescription>}
                         </CardHeader>
                      </Card>
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
                           {activeBundle ? `Bundle: "${activeBundle.name}"` :
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
                    ${isAnnual ? ((discount + finalPrice) * 12 * 0.6 / 12).toFixed(2) : (discount + finalPrice).toFixed(2)}
                    /mo
                  </p>
                )}
                 {utilityDiscount > 0 && !activeBundle && (
                   <p className="text-muted-foreground line-through">
                      ${isAnnual ? (((finalPrice + utilityDiscount) * 12 * 0.6) / 12).toFixed(2) : (finalPrice + utilityDiscount).toFixed(2)}
                      /mo
                  </p>
                 )}
                <div className="flex items-baseline justify-center gap-2 mt-1">
                  <span className="text-5xl font-bold text-primary">${isAnnual ? (finalPrice * 12 * 0.6 / 12).toFixed(2) : finalPrice.toFixed(2)}</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                {isAnnual && <p className="text-xs text-muted-foreground mt-2">(Billed annually)</p>}

                {activeBundle && <p className="text-sm text-primary font-semibold mt-2">You're saving ${getBundleSavings(activeBundle).toFixed(2)}/mo with the {activeBundle.name} bundle!</p>}
                {utilityDiscount > 0 && !activeBundle && <p className="text-sm text-primary font-semibold mt-2">You're saving ${utilityDiscount.toFixed(2)}/mo with the utility app discount!</p>}
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
