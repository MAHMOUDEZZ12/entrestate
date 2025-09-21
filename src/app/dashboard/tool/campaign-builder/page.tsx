
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, PlusCircle, Target, Megaphone, TrafficCone, BarChart, FileJson } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const campaignTemplates = [
    {
        id: 'lead-gen',
        title: 'Lead Generation',
        icon: <Target className="h-8 w-8" />,
        description: 'Collect high-intent leads with a form on Facebook or your website.',
        defaultObjective: 'LEAD_GENERATION',
    },
    {
        id: 'brand-awareness',
        title: 'Brand Awareness',
        icon: <Megaphone className="h-8 w-8" />,
        description: 'Maximize reach and show your ads to as many people as possible.',
        defaultObjective: 'AWARENESS',
    },
    {
        id: 'website-traffic',
        title: 'Website Traffic',
        icon: <TrafficCone className="h-8 w-8" />,
        description: 'Send people to a destination, like your website or landing page.',
        defaultObjective: 'TRAFFIC',
    },
];

export default function CampaignBuilderPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [campaignPlan, setCampaignPlan] = useState<any>(null);

    const handleSelectTemplate = (templateId: string) => {
        setSelectedTemplate(templateId);
        setIsLoading(true);
        setCampaignPlan(null);

        // Simulate fetching a pre-configured plan for this template
        setTimeout(() => {
            const template = campaignTemplates.find(t => t.id === templateId);
            setCampaignPlan({
                templateId: templateId,
                campaignName: `DRAFT - ${template?.title} Campaign - ${new Date().toLocaleDateString()}`,
                campaignObjective: template?.defaultObjective,
                adSets: [
                    { name: 'Broad Audience - Auto Placement', targetingSummary: 'Optimized for broad reach within your target location.'},
                    { name: 'Interest Targeting - Real Estate', targetingSummary: 'Users interested in real estate, luxury goods, and investing.'},
                ],
                adCreatives: [
                    { headline: '[Generated Headline 1]', bodyText: '[Generated Body Text 1]', callToAction: 'Learn More' },
                    { headline: '[Generated Headline 2]', bodyText: '[Generated Body Text 2]', callToAction: 'Get Quote' },
                ],
            });
            setIsLoading(false);
            toast({ title: 'Template Loaded', description: `Your "${template?.title}" campaign is ready to be configured.`});
        }, 1500);
    }

    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Campaign Builder"
                description="Use proven templates to build effective ad campaigns, then send them to the Meta Auto Pilot for launch."
                icon={<Wand2 className="h-8 w-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-6 sticky top-24">
                     <Card>
                        <CardHeader>
                            <CardTitle>1. Choose Your Goal</CardTitle>
                            <CardDescription>Select a template based on your campaign objective.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                           {campaignTemplates.map(template => (
                                <button
                                    key={template.id}
                                    onClick={() => handleSelectTemplate(template.id)}
                                    disabled={isLoading}
                                    className={cn(
                                        "w-full text-left p-4 rounded-lg border flex items-center gap-4 transition-all",
                                        selectedTemplate === template.id ? 'bg-primary/10 border-primary shadow-lg' : 'bg-muted/50 hover:bg-muted'
                                    )}
                                >
                                    <div className="p-2 bg-primary/10 text-primary rounded-md">{template.icon}</div>
                                    <div>
                                        <p className="font-semibold">{template.title}</p>
                                        <p className="text-xs text-muted-foreground">{template.description}</p>
                                    </div>
                                </button>
                           ))}
                        </CardContent>
                    </Card>
                </div>

                 <div className="lg:col-span-2">
                    <Card>
                         <CardHeader>
                            <CardTitle>2. Configure & Launch</CardTitle>
                            <CardDescription>Review the campaign structure, then send it to the Meta Auto Pilot.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                 <div className="flex items-center justify-center h-96 text-muted-foreground">
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    <span>Loading Campaign Template...</span>
                                 </div>
                            ) : campaignPlan ? (
                                <div className="space-y-6">
                                    <h3 className="font-bold text-lg">{campaignPlan.campaignName}</h3>
                                    <p><span className="font-semibold">Objective:</span> <span className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs">{campaignPlan.campaignObjective}</span></p>

                                    <div className="space-y-2">
                                        <h4 className="font-semibold">Ad Sets:</h4>
                                        {campaignPlan.adSets.map((adSet: any, i: number) => <p key={i} className="text-sm border-l-2 pl-3 ml-2">{adSet.name} - <span className="text-muted-foreground">{adSet.targetingSummary}</span></p>)}
                                    </div>
                                     <div className="space-y-2">
                                        <h4 className="font-semibold">Creatives:</h4>
                                        {campaignPlan.adCreatives.map((ad: any, i: number) => <p key={i} className="text-sm border-l-2 pl-3 ml-2">"{ad.headline}" - CTA: "{ad.callToAction}"</p>)}
                                    </div>

                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 border-dashed border-2 rounded-lg text-center p-6">
                                    <BarChart className="h-16 w-16 mx-auto mb-4 opacity-10" />
                                    <h3 className="text-lg font-semibold text-foreground">Your Campaign Plan Will Appear Here</h3>
                                    <p className="text-muted-foreground">Select a template to get started.</p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Link href="/dashboard/tool/meta-auto-pilot" className="w-full">
                                <Button className="w-full" disabled={!campaignPlan}>
                                    <Sparkles className="mr-2 h-4 w-4" /> Send to Meta Auto Pilot
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </main>
    );
}

