'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, CheckCircle, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const pricingTiers = [
  {
    name: 'Free Trial',
    price: '$0',
    period: 'for 14 days',
    description: 'Get a taste of our core AI tools and see the power for yourself.',
    features: [
      'Access to 5 Core AI Tools',
      '10 AI Generations per month',
      'Basic Market Insights',
      'Community Support',
    ],
    cta: 'Start Your Free Trial',
    href: '/signup'
  },
  {
    name: 'Professional',
    price: '$99',
    period: 'per month',
    description: 'For individual agents and power users who want to dominate their market.',
    features: [
      'Access to All AI Tools',
      '500 AI Generations per month',
      'Advanced Market Reports',
      'Priority Email Support',
      'Connect 1 Social Account',
    ],
    cta: 'Choose Professional',
    href: '/signup'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'for teams & brokerages',
    description: 'A bespoke solution for teams that need unlimited scale and dedicated support.',
    features: [
      'Everything in Professional, plus:',
      'Unlimited AI Generations',
      'Team Collaboration Tools',
      'Dedicated Account Manager',
      'API Access & Custom Integrations',
    ],
    cta: 'Contact Sales',
    href: '/contact' // Assuming you have a contact page
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Find the Plan That's Right for You"
        description="Simple, transparent pricing. No hidden fees. Cancel anytime."
        icon={<Wallet className="h-8 w-8" />}
      />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col bg-card/80 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-heading">{tier.name}</CardTitle>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
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
                <Link href={tier.href} className="mt-8">
                  <Button size="lg" className="w-full">
                    {tier.cta}
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
