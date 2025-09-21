
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { tools } from '@/lib/tools-client';
import { appDetails } from '@/lib/blog-content';
import { PublicToolPageLayout } from '@/components/public-tool-page-layout';
import { BrainCircuit, Clock2, CheckCircle } from 'lucide-react';


// Function to merge data with details, now on the server
const mergeToolData = (toolId: string) => {
    const toolData = tools.find(t => t.id === toolId);
    if (!toolData) return null;

    const detailsContent = appDetails.apps.find(app => app.name.toLowerCase().replace(/\s/g, '-') === toolId);
    
    // Create a new details structure based on the new JSON
    const newDetails = {
        steps: detailsContent?.flow.split('Step ').slice(1).map((s, i) => ({ 
            icon: <p className="font-bold text-lg">{i+1}</p>, 
            text: s.trim() 
        })) || [],
        aiVsManual: [
            { metric: "Knowledge Required", manual: "High", ai: detailsContent?.level_of_knowledge_required || "Low", icon: <BrainCircuit /> },
            { metric: "Efficiency", manual: detailsContent?.difference_vs_native.split('.')[0] || "Manual", ai: detailsContent?.difference_vs_native.split('.')[1] || "Automated", icon: <Clock2 /> },
            { metric: "Expected Result", manual: "Variable", ai: detailsContent?.expected_results || "Consistent", icon: <CheckCircle /> },
        ],
        synergy: detailsContent?.integrations.map(integration => ({
            tool: integration,
            benefit: `Integrates seamlessly with ${integration} to create powerful, automated workflows.`
        })) || [],
        faqs: detailsContent?.faqs.map(faq => ({
            question: faq.q,
            answer: faq.a
        })) || []
    };
    
    return {
        ...(toolData as any),
        longDescription: detailsContent?.full_description || toolData.description,
        details: newDetails,
    };
};

export default function ToolPage() {
  const params = useParams();
  const toolId = params.toolId as string;
  
  const feature = React.useMemo(() => mergeToolData(toolId), [toolId]);

  if (!feature) {
    notFound();
  }
  
  return <PublicToolPageLayout feature={feature} />;
}
