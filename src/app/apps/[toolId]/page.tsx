
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { tools, Feature } from '@/lib/tools-client';
import { PublicToolPageLayout } from '@/app/public-tool-page-layout';
import { pricingData } from '@/lib/pricing-data';

export default function ToolPage() {
  const params = useParams();
  const toolId = params.toolId as string;
  
  const feature: Feature | undefined = React.useMemo(() => {
    const tool = tools.find(t => t.id === toolId);
    if (!tool) {
      return undefined;
    }
    const priceInfo = pricingData.apps.find(app => app.name.toLowerCase().replace(/\s/g, '-') === tool.id.toLowerCase());
    return {
        ...tool,
        price: priceInfo?.price_monthly || 0,
    };
  }, [toolId]);

  if (!feature) {
    notFound();
  }
  
  return <PublicToolPageLayout feature={feature} />;
}
