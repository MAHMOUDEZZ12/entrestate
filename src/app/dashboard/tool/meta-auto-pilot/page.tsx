
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, PlusCircle, Rocket, Play, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const workflows = [
    {
        id: 'full-funnel',
        title: 'Full Funnel Lead Generation',
        icon: <Rocket className="h-8 w-8" />,
        description: 'From audience creation to ad launch, this flow automates your entire lead generation campaign.',
        steps: ['Audience Creator', 'Insta Ads Designer', 'Campaign Builder', 'Meta Auto Pilot'],
    },
    {
        id: 'reel-ad',
        title: 'Reel Ad to Landing Page',
        icon: <Play className="h-8 w-8" />,
        description: 'Generate a short-form video ad and drive traffic to a high-converting landing page.',
        steps: ['Reel Ads', 'Landing Page Builder', 'Campaign Builder', 'Meta Auto Pilot'],
    },
    {
        id: 'listing-promo',
        title: 'Single Listing Promotion',
        icon: <Activity className="h-8 w-8" />,
        description: 'Take a single property from your library and run a targeted awareness campaign for it.',
        steps: ['Market Library', 'Insta Ads Designer', 'Campaign Builder', 'Meta Auto Pilot'],
    },
];

export default function MetaAutoPilotPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

    const handleSelectWorkflow = (workflowId: string) => {
        if (isLoading) return;
        setSelectedWorkflow(workflowId);
        setIsLoading(true);
        toast({ title: 'Preparing Your Co-Pilot...', description: 'The AI is configuring the selected workflow.' });

        setTimeout(() => {
            setIsLoading(false);
            toast({ title: 'Workflow Ready!', description: 'Your co-pilot is ready for launch.' });
        }, 2000);
    }

    const handleLaunch = () => {
        setIsLoading(true);
        toast({ title: 'Launch Sequence Initiated!', description: 'Your campaign is being published to Meta. This may take a moment.' });
        setTimeout(() => {
            setIsLoading(false);
            toast({ title: 'Campaign Live!', description: 'Your ads are now running. You can monitor them in the Ads Manager or here.' });
        }, 3500);
    }
    
    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Meta Auto Pilot"
                description="Your command center to launch and manage automated ad campaigns on Facebook & Instagram."
                icon={<Rocket className="h-8 w-8" />}
            />
            
            {!selectedWorkflow && (
                <Card>
                    <CardHeader>
                        <CardTitle>Choose Your Mission</CardTitle>
                        <CardDescription>Select a pre-built workflow. The Auto Pilot will guide you through the rest.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {workflows.map(wf => (
                             <button
                                key={wf.id}
                                onClick={() => handleSelectWorkflow(wf.id)}
                                disabled={isLoading}
                                className={cn(
                                    "w-full text-left p-4 rounded-lg border flex flex-col items-start gap-3 transition-all",
                                    "bg-muted/50 hover:bg-muted"
                                )}
                            >
                                <div className="p-2 bg-primary/10 text-primary rounded-md">{wf.icon}</div>
                                <div>
                                    <p className="font-semibold">{wf.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{wf.description}</p>
                                </div>
                                <div className="text-xs text-muted-foreground mt-2">Flow: {wf.steps.join(' → ')}</div>
                            </button>
                        ))}
                    </CardContent>
                </Card>
            )}

            {selectedWorkflow && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Pre-flight Checklist: {workflows.find(w => w.id === selectedWorkflow)?.title}</CardTitle>
                        <CardDescription>The AI has prepared your campaign. Review the details and launch when ready.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading && !campaignPlan ? (
                            <div className="flex items-center justify-center h-64 text-muted-foreground">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                <span>Configuring Workflow...</span>
                            </div>
                        ) : (
                             <div className="space-y-4">
                                <p>This is where you would configure the inputs for the selected workflow (e.g., choose a project, upload a brochure). For now, we will simulate this and prepare for launch.</p>
                                <Link href="/dashboard/tool/campaign-builder">
                                    <Button variant="outline">Or, configure manually in Campaign Builder</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                         <Button onClick={handleLaunch} disabled={isLoading} size="lg">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Rocket className="mr-2 h-4 w-4" />}
                             {isLoading ? 'Publishing...' : 'Launch Campaign'}
                        </Button>
                    </CardFooter>
                </Card>
            )}

        </main>
    );
}
