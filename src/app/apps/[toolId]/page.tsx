
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { tools } from '@/lib/tools-client';
import { appDetails } from '@/lib/blog-content';
import { PublicToolPageLayout } from '@/components/public-tool-page-layout';
import { BrainCircuit, Clock2, CheckCircle, Upload, Sparkles, Download } from 'lucide-react';


// Function to merge data with details
const mergeToolData = (toolId: string) => {
    const toolData = tools.find(t => t.id === toolId);
    if (!toolData) return null;

    const detailsContent = appDetails.apps.find(app => app.name.toLowerCase().replace(/\\s/g, '-') === toolId.toLowerCase());
    
    if (!detailsContent) {
      // Fallback if no specific details are found
      return {
        ...(toolData as any),
        longDescription: toolData.description,
        details: {
          steps: [
            { icon: <Upload />, text: 'Provide your source content or instructions.' },
            { icon: <Sparkles />, text: 'The AI analyzes your input and generates the content.' },
            { icon: <Download />, text: 'Review, refine, and use your new AI-generated asset.' },
          ],
          aiVsManual: [
            { metric: "Knowledge Required", manual: "High", ai: "Low", icon: <BrainCircuit /> },
            { metric: "Efficiency", manual: "Manual", ai: "Automated", icon: <Clock2 /> },
            { metric: "Expected Result", manual: "Variable", ai: "Consistent", icon: <CheckCircle /> },
          ],
          synergy: [],
          faqs: [],
          use_cases: []
        },
      };
    }

    // Create a new details structure based on the new JSON
    const newDetails = {
        steps: detailsContent?.flow.split('. ').filter(s => s.trim()).map((s, i) => ({ 
            icon: i === 0 ? <Upload /> : i === 1 ? <Sparkles /> : <Download />, 
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
        })) || [],
        use_cases: detailsContent?.use_cases || []
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
