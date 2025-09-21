
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
const proAllPlan = pricingTiers.find(p => p.plan_id === 'pro_all_monthly');
const anyCopilotPlan = pricingTiers.find(p => p.plan_id === 'any_copilot_monthly');

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

const CopilotCard = ({ name, tools, plan }: { name: string; tools: any[]; plan: any }) => (
  <Card className="flex flex-col bg-card/80 backdrop-blur-lg border-primary/20">
    <CardHeader>
      <CardTitle className="text-2xl font-bold font-heading text-primary">{name}</CardTitle>
      <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">{plan?.price_display.split(' ')[0]}</span>
          <span className="text-muted-foreground">{plan?.price_display.substring(plan?.price_display.indexOf(' '))}</span>
      </div>
      <CardDescription>{plan?.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col flex-1">
      <ul className="space-y-4 flex-1">
          <p className="font-semibold text-sm">Includes the following apps:</p>
          {tools.map((tool) => (
            <li key={tool.id} className="flex items-center gap-3 text-sm">
                <div className="p-1.5 rounded-md text-white" style={{backgroundColor: tool.color}}>
                    {React.cloneElement(tool.icon, { className: 'h-4 w-4' })}
                </div>
                <span>{tool.title}</span>
            </li>
        ))}
      </ul>
      <Link href="/signup" className="mt-8">
        <Button size="lg" className="w-full">
          {plan?.cta_text}
        </Button>
      </Link>
    </CardContent>
  </Card>
);


export default function PricingPage() {
    const copilotModules = React.useMemo(() => {
        const modules: { [key: string]: any[] } = {};
        tools.forEach(tool => {
            if (tool.mindMapCategory && tool.mindMapCategory !== 'Core Platform') {
                if (!modules[tool.mindMapCategory]) {
                    modules[tool.mindMapCategory] = [];
                }
                modules[tool.mindMapCategory].push(tool);
            }
        });
        return Object.entries(modules).map(([name, tools]) => ({ name, tools }));
    }, []);

  return (
    <div className="flex flex-col">
      <PageHeader
        title={ui_copy.pricing_section_title}
        description={ui_copy.pricing_section_subtitle}
        icon={<Wallet className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-24">
        
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
                <p className="text-lg text-muted-foreground mt-2">Upgrade to a Co-pilot bundle for unlimited access to a suite of related apps and AI automation.</p>
            </div>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {copilotModules.map((copilot) => (
                <CopilotCard key={copilot.name} name={copilot.name} tools={copilot.tools} plan={anyCopilotPlan} />
              ))}
            </div>
        </div>


        <Separator />

        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-heading">Become a Power User</h2>
                <p className="text-lg text-muted-foreground mt-2">Get unlimited access to the entire ecosystem.</p>
            </div>
            <div className="max-w-2xl mx-auto">
                {proAllPlan && (
                     <Card className="flex flex-col bg-card/80 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold font-heading">{proAllPlan.name}</CardTitle>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold">{proAllPlan.price_display.split(' ')[0]}</span>
                                <span className="text-muted-foreground">{proAllPlan.price_display.substring(proAllPlan.price_display.indexOf(' '))}</span>
                            </div>
                            <CardDescription>{proAllPlan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1">
                            <ul className="space-y-4 flex-1">
                            {proAllPlan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>{feature}</span>
                                </li>
                            ))}
                            </ul>
                            <Link href="/signup" className="mt-8">
                            <Button size="lg" className="w-full">
                                {proAllPlan.cta_text}
                            </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}
