
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { tools, Feature } from '@/lib/tools-client';
import { PublicToolPageLayout } from '@/app/public-tool-page-layout';

export default function ToolPage() {
  const params = useParams();
  const toolId = params.toolId as string;
  
  const feature: Feature | undefined = React.useMemo(() => {
    const tool = tools.find(t => t.id === toolId);
    if (!tool) {
      return undefined;
    }
    return tool;
  }, [toolId]);

  if (!feature) {
    notFound();
  }
  
  return <PublicToolPageLayout feature={feature} />;
}
