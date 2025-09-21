
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, CheckCircle, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { pricingData } from '@/lib/pricing';
import { tools } from '@/lib/tools-data';
import { Separator } from '@/components/ui/separator';

const { pricing_plans: pricingTiers, ui_copy } = pricingData;
const anyAppPlan = pricingTiers.find(p => p.plan_id === 'any_app_monthly');
const bundlePlans = pricingTiers.filter(p => p.plan_id !== 'any_app_monthly');

const AppCard = ({ tool }: { tool: any }) => (
    <Card className="flex flex-col bg-card/50">
        <CardHeader className="flex-row items-start gap-4">
            <div className="p-2.5 rounded-lg text-white" style={{backgroundColor: tool.color}}>
                {React.cloneElement(tool.icon, { className: 'h-6 w-6' })}
            </div>
            <div>
                <CardTitle className="text-lg font-heading">{tool.title}</CardTitle>
                <CardDescription className="text-xs">{tool.description}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="flex-1" />
        <div className="p-4 border-t flex items-center justify-between">
            <div className="font-bold">{anyAppPlan?.price_display}</div>
            <Link href="/signup">
                <Button size="sm">Get App</Button>
            </Link>
        </div>
    </Card>
);

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title={ui_copy.pricing_section_title}
        description={ui_copy.pricing_section_subtitle}
        icon={<Wallet className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-16">
        
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-heading">Get Started with a Single App</h2>
                <p className="text-lg text-muted-foreground mt-2">Pick any tool from our suite to start. No commitment, just results.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools.filter(t => t.id !== 'superfreetime').map((tool) => (
                    <AppCard key={tool.id} tool={tool} />
                ))}
            </div>
        </div>

        <Separator />

        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-heading">Or, Unlock a Full Co-pilot</h2>
                <p className="text-lg text-muted-foreground mt-2">Upgrade to a bundled plan for unlimited access and AI automation.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {bundlePlans.map((tier) => (
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
        </div>
      </main>
    </div>
  );
}
