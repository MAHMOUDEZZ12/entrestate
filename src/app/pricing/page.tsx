
'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Wallet, Check, Sparkles, ArrowRight, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { pricingData } from '@/lib/pricing';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const proPlan = pricingData.bundles.find(b => b.name === 'ENTRESTATE PRO');
  const otherBundles = pricingData.bundles.filter(b => b.name !== 'ENTRESTATE PRO');

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {otherBundles.map(bundle => {
              const annualPrice = bundle.monthly_price * 12 * 0.6; // 40% discount
              return (
                <Card key={bundle.name} className="flex flex-col">
                    <CardHeader>
                        <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit mb-4">
                            <Package className="h-6 w-6" />
                        </div>
                        <CardTitle className="font-heading text-2xl">{bundle.name}</CardTitle>
                        <CardDescription>{bundle.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-bold">${isAnnual ? (annualPrice / 12).toFixed(2) : bundle.monthly_price.toFixed(2)}</span>
                           <span className="text-muted-foreground">/ month</span>
                        </div>
                        <p className="font-semibold text-sm text-foreground">INCLUDES:</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {bundle.apps.map(app => (
                                <li key={app} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>{app}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Get Started</Button>
                    </CardFooter>
                </Card>
            )})}
        </div>

        {proPlan && (
            <Card className="mt-16 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 shadow-2xl shadow-primary/10">
                 <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="p-8 md:p-12">
                        <div className="p-3 bg-primary text-primary-foreground rounded-lg w-fit mb-4">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <h2 className="text-3xl font-bold font-heading">{proPlan.name}</h2>
                        <p className="text-lg text-muted-foreground mt-2">{proPlan.description}</p>
                         <div className="flex items-baseline gap-2 mt-6">
                           <span className="text-5xl font-bold">${isAnnual ? ((proPlan.monthly_price * 12 * 0.6) / 12).toFixed(2) : proPlan.monthly_price.toFixed(2)}</span>
                           <span className="text-muted-foreground">/ month</span>
                        </div>
                         <Link href="/signup">
                            <Button size="lg" className="mt-6">
                                Go PRO <ArrowRight className="ml-2 h-5 w-5"/>
                            </Button>
                         </Link>
                    </div>
                     <div className="p-8 md:p-12 border-t md:border-t-0 md:border-l">
                         <h3 className="font-semibold text-lg text-foreground mb-4">EVERYTHING INCLUDED:</h3>
                         <ul className="space-y-2 text-sm text-muted-foreground columns-2">
                            {proPlan.apps.map(app => (
                                <li key={app} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>{app}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                 </div>
            </Card>
        )}

      </main>
    </div>
  );
}
