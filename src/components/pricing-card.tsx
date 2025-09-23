
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { PlanData } from '@/lib/pricing-data';

interface PricingCardProps {
  plan: PlanData;
  isAnnual: boolean;
}

export function PricingCard({ plan, isAnnual }: PricingCardProps) {
  const finalPrice = isAnnual ? plan.price_monthly * 12 * 0.8 : plan.price_monthly; // 20% discount for annual
  const priceString = isAnnual ? (finalPrice / 12).toFixed(0) : finalPrice.toFixed(0);
  
  return (
    <Card className={cn(
      "flex flex-col",
      plan.popular ? "border-primary ring-2 ring-primary shadow-lg" : "border-border"
    )}>
      <CardHeader className="pb-4">
        {plan.popular && <p className="text-primary font-semibold text-sm">Most Popular</p>}
        <CardTitle className="text-3xl font-heading">{plan.name}</CardTitle>
        <CardDescription>{plan.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="flex items-baseline">
            <span className="text-4xl font-bold">${priceString}</span>
            <span className="text-muted-foreground ml-1">/month</span>
        </div>
         {isAnnual && plan.id !== 'custom' && <p className="text-xs text-muted-foreground -mt-2">Billed annually at ${finalPrice.toFixed(0)}</p>}
        
        <p className="font-semibold text-sm pt-4">{plan.id === 'custom' ? 'Selected Apps:' : 'Includes:'}</p>
        <ul className="space-y-2">
          {plan.features.slice(0, 7).map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-1 shrink-0" />
              <span className="text-sm text-foreground/90">{feature}</span>
            </li>
          ))}
          {plan.features.length > 7 && (
             <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                <span className="text-sm text-foreground/90">And {plan.features.length - 7} more...</span>
            </li>
          )}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href="/login" className="w-full">
            <Button className="w-full" size="lg" variant={plan.popular ? 'default' : 'outline'}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
