
'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Workflow, Plus, Play, Sparkles, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { tools, Feature } from '@/lib/tools-client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTabManager } from '@/context/TabManagerContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

// Expanded and more logical flow suggestions
const suggestedFlows = [
  {
    name: 'Full Listing Syndication',
    description: 'Generate a new listing description and push it to both Property Finder and Bayut automatically.',
    apps: ['listing-generator', 'propertyfinder-sync', 'bayut-sync'],
  },
  {
    name: 'Rebrand & Distribute Campaign',
    description: 'Rebrand an existing brochure, generate a landing page for it, and then create an email campaign to drive traffic.',
    apps: ['rebranding', 'landing-pages', 'email-creator'],
  },
  {
    name: 'Content Repurposing Engine',
    description: 'Generate a 7-day social media plan from a topic, then create a short video reel about the same topic for maximum reach.',
    apps: ['instagram-content-creator', 'reel-ads'],
  },
  {
    name: 'Automated Lead Gen Campaign',
    description: 'Find a target audience for a project, generate ad creatives for them, and then launch the full campaign on Meta platforms.',
    apps: ['audience-creator', 'insta-ads-designer', 'meta-ads-copilot'],
  },
];

const FlowCard = ({ flow, installedApps }: { flow: typeof suggestedFlows[0], installedApps: string[] }) => {
    const { addTab } = useTabManager();
    const router = useRouter();
    const { toast } = useToast();
    
    const requiredTools = flow.apps.map(appId => tools.find(t => t.id === appId)).filter(Boolean) as Feature[];
    const isRunnable = requiredTools.every(tool => installedApps.includes(tool.id));
    const missingTools = requiredTools.filter(tool => !installedApps.includes(tool.id));

    const handleRunFlow = () => {
        if (!isRunnable) {
            toast({
                title: "Missing Apps",
                description: `You need to add ${missingTools.map(t => t.title).join(', ')} to run this flow.`,
                variant: 'destructive'
            });
            return;
        }

        const firstTool = requiredTools[0];
        if (firstTool) {
             addTab({ href: firstTool.href, label: firstTool.title });
             router.push(firstTool.href);
             toast({ title: "Flow Started!", description: `Opening ${firstTool.title} to begin the '${flow.name}' flow.`});
        }
    }

    return (
        <Card className={cn("flex flex-col bg-card/50 backdrop-blur-lg", !isRunnable && "border-dashed")}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-primary"/>
                    {flow.name}
                </CardTitle>
                <CardDescription>{flow.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex items-center gap-2 flex-wrap">
                    {requiredTools.map((tool, index) => {
                        const isInstalled = installedApps.includes(tool.id);
                        return (
                            <React.Fragment key={tool.id}>
                                <div className={cn(
                                    "flex flex-col items-center gap-2 text-center"
                                )}>
                                    <div className={cn("relative p-4 rounded-xl border-2 transition-all", isInstalled ? 'border-primary bg-primary/10' : 'border-dashed border-muted-foreground/50 bg-muted/30')}>
                                       {!isInstalled && (
                                            <div className="absolute -top-2 -right-2 p-1 bg-muted rounded-full">
                                                <Link href="/dashboard/marketing">
                                                    <Plus className="h-4 w-4 text-muted-foreground hover:text-primary" />
                                                </Link>
                                            </div>
                                        )}
                                        <div className="p-3 rounded-lg text-white w-fit" style={{ backgroundColor: tool.color }}>
                                            {React.cloneElement(tool.icon, { className: 'h-6 w-6' })}
                                        </div>
                                    </div>
                                    <p className={cn("text-xs font-medium w-24 truncate", isInstalled ? 'text-foreground' : 'text-muted-foreground')}>{tool.title}</p>
                                </div>
                                {index < requiredTools.length - 1 && <ArrowRight className="h-6 w-6 text-muted-foreground mx-2 hidden sm:block" />}
                            </React.Fragment>
                        );
                    })}
                </div>
            </CardContent>
            <CardFooter>
                 <Button className="w-full" onClick={handleRunFlow} disabled={!isRunnable}>
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
        description="Automate your work by connecting your apps together, just like Zapier. We've suggested some flows based on best practices. Add the required apps to get started."
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
