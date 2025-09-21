
'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Workflow, Plus, Play, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { tools, Feature } from '@/lib/tools-client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTabManager } from '@/context/TabManagerContext';
import { useRouter } from 'next/navigation';

// Simplified representation of flows
const suggestedFlows = [
  {
    name: 'Full Listing Syndication',
    description: 'Generate a new listing description and push it to both Property Finder and Bayut automatically.',
    apps: ['listing-generator', 'propertyfinder-sync', 'bayut-sync'],
  },
  {
    name: 'Lead Gen Campaign',
    description: 'Find a target audience for a project, generate ad creatives, and launch a campaign on Meta platforms.',
    apps: ['audience-creator', 'insta-ads-designer', 'meta-ads-copilot'],
  },
    {
    name: 'Rebrand & Distribute',
    description: 'Rebrand an existing brochure with your brand kit, then generate a landing page for it.',
    apps: ['rebranding', 'landing-pages', 'email-creator'],
  },
   {
    name: 'Content Repurposing',
    description: 'Generate a social media plan and a video reel from the same source content.',
    apps: ['instagram-content-creator', 'reel-ads'],
  },
];

const FlowCard = ({ flow, installedApps }: { flow: typeof suggestedFlows[0], installedApps: string[] }) => {
    const { addTab } = useTabManager();
    const router = useRouter();
    const requiredTools = flow.apps.map(appId => tools.find(t => t.id === appId)).filter(Boolean) as Feature[];
    const isRunnable = requiredTools.every(tool => installedApps.includes(tool.id));

    const handleRunFlow = () => {
        // In a real app, this would trigger the flow execution.
        // For now, it opens the first app in the flow.
        const firstTool = requiredTools[0];
        if (firstTool) {
             addTab({ href: firstTool.href, label: firstTool.title });
             router.push(firstTool.href);
        }
    }

    return (
        <Card className={cn("flex flex-col", !isRunnable && "bg-muted/50 border-dashed")}>
            <CardHeader>
                <CardTitle>{flow.name}</CardTitle>
                <CardDescription>{flow.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex items-center gap-2 flex-wrap">
                    {requiredTools.map((tool, index) => (
                        <React.Fragment key={tool.id}>
                            <div className={cn(
                                "flex items-center gap-2 p-2 rounded-lg border",
                                installedApps.includes(tool.id) ? "bg-card" : "bg-muted"
                            )}>
                                 <div className="p-1.5 rounded-md text-white" style={{backgroundColor: tool.color}}>
                                    {React.cloneElement(tool.icon, { className: 'h-4 w-4' })}
                                </div>
                                <span className="text-sm font-medium">{tool.title}</span>
                            </div>
                            {index < requiredTools.length - 1 && <ArrowRight className="h-5 w-5 text-muted-foreground" />}
                        </React.Fragment>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                 <Button className="w-full" disabled={!isRunnable} onClick={handleRunFlow}>
                    <Play className="mr-2 h-4 w-4" />
                    Run Flow
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function FlowsPage() {
  const [installedApps, setInstalledApps] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we are on the client side before accessing localStorage
    setIsClient(true);
    const savedApps = localStorage.getItem('addedApps');
    if (savedApps) {
      setInstalledApps(JSON.parse(savedApps));
    }
  }, []);

  if (!isClient) {
      return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Flows"
        description="Automate your work by connecting your apps together, like Zapier. We've suggested some flows based on best practices."
        icon={<Workflow className="h-6 w-6" />}
      >
        <Button>
            <Plus className="mr-2 h-4 w-4"/>
            Create New Flow
        </Button>
      </PageHeader>
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {suggestedFlows.map(flow => (
                <FlowCard key={flow.name} flow={flow} installedApps={installedApps} />
            ))}
        </div>
      </div>
    </div>
  );
}
