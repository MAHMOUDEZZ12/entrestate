
'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { tools as allToolsClient } from '@/lib/tools-client';
import { pricingData } from '@/lib/pricing-data';
import { PublicToolPageLayout } from '@/components/public-tool-page-layout';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // Find the full client-side feature object
  const feature = allToolsClient.find(t => t.id === slug);
  
  // Find the corresponding app pricing data
  const appPricing = pricingData.apps.find(app => app.name.toLowerCase().replace(/\s/g, '-') === slug);

  if (!feature) {
    return notFound();
  }

  // Combine tool data with its price
  const featureWithPrice = {
      ...feature,
      price: appPricing?.pricing ?? 0, // Default to 0 if not found
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
