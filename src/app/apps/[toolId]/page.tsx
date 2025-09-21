

import { PublicToolPageLayout } from "@/components/public-tool-page-layout";
import { tools } from "@/lib/tools-data";
import { blogContent } from '@/lib/blog-content';
import { notFound } from "next/navigation";
import { Feature } from "@/lib/tools-client";
import React from 'react';
import { Upload, Sparkles, Download, Clock2, Wallet, BadgeCheck } from 'lucide-react';


// Function to merge data with details, now on the server
const mergeToolData = (toolData: any): Feature => {
    const detailsContent = blogContent[toolData.id];

    // Define a default details structure
    const defaultDetails = {
        steps: [
            { icon: <Upload />, text: 'Provide your source content, like a brochure or project details.' },
            { icon: <Sparkles />, text: 'The AI analyzes your input and generates the content.' },
            { icon: <Download />, text: 'Review, refine, and use your new AI-generated asset.' },
        ],
        aiVsManual: [
            { metric: "Time to Complete", manual: "Hours to Days", ai: "Seconds to Minutes", icon: <Clock2 /> },
            { metric: "Cost", manual: "$$$ - $$$$", ai: "$", icon: <Wallet /> },
            { metric: "Quality & Consistency", manual: "Variable", ai: "Consistently High", icon: <BadgeCheck /> },
        ],
        synergy: [
             { tool: "AI Assistant", benefit: "Use the assistant to run this tool via a simple text command for faster workflow." },
             { tool: "Brand Kit", benefit: "Automatically applies your logos and colors to ensure all outputs are on-brand." },
        ],
        faqs: [
            { question: "Is my data used to train the AI?", answer: "No. Your data is kept private and is only used to generate content for you. It is not used for training external models." },
            { question: "Can I edit the generated content?", answer: "Yes, all generated content can be downloaded and edited in other tools, or you can use our built-in editors to refine the results." }
        ]
    };
    
    let finalDetails;
    if (detailsContent) {
        finalDetails = {
            ...defaultDetails,
            steps: detailsContent.sections.slice(0, 3).map((s: any, i: number) => ({
                icon: i === 0 ? <Upload /> : i === 1 ? <Sparkles /> : <Download />,
                text: s.body
            })),
        };
    } else {
        finalDetails = defaultDetails;
    }

    if (finalDetails.steps.length === 0) {
        finalDetails.steps = defaultDetails.steps;
    }

    return {
        ...(toolData as any),
        longDescription: detailsContent?.intro || toolData.description,
        details: finalDetails,
    };
};

export default function ToolPage({ params }: { params: { toolId: string } }) {
  const toolData = tools.find(t => t.id === params.toolId);

  if (!toolData) {
    notFound();
  }
  
  const feature = mergeToolData(toolData);

  return <PublicToolPageLayout feature={feature} />;
}

// Generate static pages for each tool for better SEO and performance
export async function generateStaticParams() {
    return tools.map((tool) => ({
        toolId: tool.id,
    }));
}
