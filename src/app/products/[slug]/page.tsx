
'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { PublicToolPageLayout } from '@/components/public-tool-page-layout';
import { tools } from '@/lib/tools-client';
import { pricingData } from '@/lib/pricing-data';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // Find the tool by its ID (slug)
  const tool = tools.find(t => t.id === slug);
  
  // Find the corresponding app pricing data
  const appPricing = pricingData.apps.find(app => app.name.toLowerCase().replace(/\s/g, '-') === slug);

  if (!tool) {
    return notFound();
  }

  // Combine tool data with its price
  const featureWithPrice = {
      ...tool,
      price: appPricing?.price_monthly ?? 0, // Default to 0 if not found
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full">
         <PublicToolPageLayout feature={featureWithPrice} />
      </main>
      <LandingFooter />
    </div>
  );
}
