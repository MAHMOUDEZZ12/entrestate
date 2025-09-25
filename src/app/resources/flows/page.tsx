
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, Plus, Workflow } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { tools } from '@/lib/tools-client';

const flowLibrary = [
    {
        title: "One-Click Listing Syndication",
        description: "Generate a perfect, SEO-friendly listing description and automatically publish it to both Property Finder and Bayut in a single, unified workflow.",
        apps: ["Listing Generator", "Property Finder Pilot", "Bayut Pilot"],
        cta: "Use This Flow"
    },
    {
        title: "Automated Lead Enrichment & Nurturing",
        description: "When a new lead is captured in your CRM, automatically investigate their public profile and send a personalized welcome message via WhatsApp.",
        apps: ["CRM Memory Assistant", "Lead Investigator AI", "Sales Message Rewriter", "WhatsApp Manager"],
        cta: "Use This Flow"
    },
    {
        title: "Brochure-to-Campaign Automation",
        description: "Upload a project brochure, and the AI will generate ad copy, define a target audience, and launch a complete lead generation campaign on Meta.",
        apps: ["AI Brand Creator", "Insta Ads Designer", "Property Marketer AI"],
        cta: "Use This Flow"
    },
    {
        title: "Client-Ready Investment Proposal",
        description: "Select multiple properties, generate a data-driven ROI analysis for each, and build a beautiful side-by-side comparison PDF to send to your client.",
        apps: ["Market Projects Library", "Deal Analyzer", "Multi-Offer Builder"],
        cta: "Use This Flow"
    },
    {
        title: "Content Repurposing Engine",
        description: "Take a single piece of content, like a market report, and automatically generate a week's worth of social media posts, a landing page, and an email campaign.",
        apps: ["Market Reports", "Social Media Content Writer", "Landing Page Designer", "Instagram Admin"],
        cta: "Use This Flow"
    },
    {
        title: "Video Marketing Automation",
        description: "Create a video presenter script, generate the video with an AI avatar, edit it for YouTube, and then automatically create short-form clips for Reels and TikTok.",
        apps: ["UGC Script Writer", "AI Videos With Your Face", "AI YouTube Video Editor", "Reel Ads"],
        cta: "Use This Flow"
    }
];

export default function FlowLibraryPage() {
  return (
     <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <PageHeader
            title="Flow Library"
            description="Discover powerful, pre-built automations that chain together multiple apps to save you time and supercharge your workflow."
            icon={<Workflow className="h-8 w-8" />}
        />
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-8">
                {flowLibrary.map((flow) => {
                    const flowApps = flow.apps.map(appName => tools.find(t => t.title === appName)).filter(Boolean);
                    return (
                        <Card key={flow.title} className="flex flex-col bg-card/80 backdrop-blur-lg">
                            <CardHeader>
                                <CardTitle>{flow.title}</CardTitle>
                                <CardDescription>{flow.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Required Apps:</h4>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {flowApps.map((app, index) => app && (
                                        <React.Fragment key={app.id}>
                                            <div className="flex items-center gap-2 p-2 pr-3 border rounded-full bg-muted/50">
                                                <div className="p-1 rounded-full text-white" style={{backgroundColor: app.color}}>
                                                    {React.cloneElement(app.icon, { className: 'h-4 w-4' })}
                                                </div>
                                                <span className="text-xs font-semibold">{app.title}</span>
                                            </div>
                                            {index < flowApps.length - 1 && <Plus className="h-4 w-4 text-muted-foreground" />}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </CardContent>
                            <CardContent>
                                <Link href="/me/flows" className="w-full">
                                    <Button className="w-full">
                                        {flow.cta} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
      </main>
    </div>
  );
}
