
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, CheckCircle, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { pricingData } from '@/lib/pricing';

const { pricing_plans: pricingTiers, ui_copy } = pricingData;

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title={ui_copy.pricing_section_title}
        description={ui_copy.pricing_section_subtitle}
        icon={<Wallet className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col bg-card/80 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-heading">{tier.name}</CardTitle>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{tier.price_display.split(' ')[0]}</span>
                    <span className="text-muted-foreground">{tier.price_display.substring(tier.price_display.indexOf(' '))}</span>
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <ul className="space-y-4 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="mt-8">
                  <Button size="lg" className="w-full">
                    {tier.cta_text}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
