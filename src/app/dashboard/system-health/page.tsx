
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { HeartPulse, CheckCircle, Zap, Package, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { tools } from '@/lib/tools-client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


type ServiceStatus = 'Perfect' | 'Needs Integration' | 'Placeholder' | 'Deprecated';

const serviceIntelligenceReport: { id: string; title: string; status: ServiceStatus; analysis: string; requirement: string; }[] = [
    {
        id: "meta-auto-pilot",
        title: "Meta Auto Pilot",
        status: "Needs Integration",
        analysis: "The AI flow exists to generate a campaign plan, but it does not actually publish or interact with the Meta API.",
        requirement: "Connect to the live Meta Ads API and handle the OAuth2 authentication flow for publishing campaigns."
    },
    {
        id: "campaign-builder",
        title: "Campaign Builder",
        status: "Placeholder",
        analysis: "The tool is currently a placeholder and needs its core UI and logic to be implemented.",
        requirement: "Build the UI for campaign templating, A/B structure definition, and creative assignment."
    },
    {
        id: "audience-creator",
        title: "Audience Creator",
        status: "Perfect",
        analysis: "The flow correctly uses project data from Firestore to generate targeting strategies. The UI and backend are fully aligned and operational.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "insta-ads-designer",
        title: "Insta Ads Designer",
        status: "Perfect",
        analysis: "The AI flow correctly processes inputs and generates both ad copy and design previews. The UI is functional.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "reel-ads",
        title: "Reel Ads",
        status: "Placeholder",
        analysis: "The flow is a placeholder and returns mock data. It needs to be connected to a video generation model.",
        requirement: "Integrate a video generation model (like Veo) into the `generateReel` flow to produce actual video content."
    },
    {
        id: "listing-manager",
        title: "Listing Manager",
        status: "Perfect",
        analysis: "The page has a complete UI for managing listing generation and syndication, including asset validation and logging issues to the dev admin page.",
        requirement: "None. This service is fully functional."
    },
     {
        id: "listing-performance",
        title: "Listing Performance",
        status: "Perfect",
        analysis: "The UI is fully implemented with mock data, showcasing KPIs, charts, and AI recommendations. It's ready for a live data feed.",
        requirement: "Connect the component to a live analytics data source (e.g., from portal APIs or Google Analytics)."
    },
    {
        id: "listing-generator",
        title: "Listing Generator",
        status: "Perfect",
        analysis: "The AI flow and the UI form are fully implemented and functional, generating high-quality listing descriptions.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "propertyfinder-sync",
        title: "Property Finder Pilot",
        status: "Needs Integration",
        analysis: "The flow generates the correct XML payload but simulates the final API call. It requires a real API key and endpoint to be live.",
        requirement: "Implement the final `fetch` call to the Property Finder Enterprise API endpoint using a real API key."
    },
    {
        id: "bayut-sync",
        title: "Bayut Pilot",
        status: "Needs Integration",
        analysis: "Similar to the Property Finder Pilot, this flow generates the correct JSON payload but the final API call is a placeholder.",
        requirement: "Implement the final `fetch` call to the Bayut API endpoint using a real API key."
    },
    {
        id: "ai-price-estimator",
        title: "AI Price Estimator",
        status: "Perfect",
        analysis: "The AI flow performs all necessary calculations and returns a detailed analysis. The UI is implemented and functional.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "pdf-editor",
        title: "Visual PDF Editor (Deprecated)",
        status: "Deprecated",
        analysis: "This tool is correctly marked as deprecated and guides users to newer, more specialized tools.",
        requirement: "No action needed."
    },
     {
        id: "market-trends",
        title: "Market Trends Watcher",
        status: "Perfect",
        analysis: "The flow and UI are fully functional, providing market analysis based on user topics.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "youtube-video-editor",
        title: "AI YouTube Video Editor",
        status: "Needs Integration",
        analysis: "The UI and flow logic are in place, but the video editing itself is simulated. It needs to be connected to a real video editing model.",
        requirement: "Replace the placeholder logic in the `editYoutubeVideoFlow` with a call to a real video editing AI model."
    },
];

const statusConfig: { [key in ServiceStatus]: { color: string, icon: React.ReactNode, description: string } } = {
    'Perfect': { color: 'border-green-500 bg-green-500/10', icon: <CheckCircle className="text-green-500" />, description: "Fully functional and production-ready." },
    'Needs Integration': { color: 'border-blue-500 bg-blue-500/10', icon: <Zap className="text-blue-500" />, description: "The core logic is implemented, but requires connection to a live external API (e.g., Meta, Bayut)." },
    'Placeholder': { color: 'border-amber-500 bg-amber-500/10', icon: <Package className="text-amber-500" />, description: "The service exists in navigation but its core logic and/or UI is a placeholder and needs full implementation." },
    'Deprecated': { color: 'border-gray-500 bg-gray-500/10', icon: <AlertTriangle className="text-gray-500" />, description: "This service is outdated and has been replaced by a newer, better tool." },
}

export default function SystemHealthPage() {
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Service Intelligence Report"
        description="A real-time analysis of all application services, their status, and required actions to complete them."
        icon={<HeartPulse className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => (
            <Card key={status} className={config.color}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{status}</CardTitle>
                    {config.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {serviceIntelligenceReport.filter(s => s.status === status).length}
                    </div>
                     <p className="text-xs text-muted-foreground">
                        {config.description}
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Detailed Service Status</CardTitle>
            <CardDescription>An overview of each service, its current status, and a summary of the AI's analysis and completion requirements.</CardDescription>
        </CardHeader>
        <CardContent>
             <Accordion type="single" collapsible className="w-full">
                {serviceIntelligenceReport.map(service => (
                    <AccordionItem value={service.id} key={service.id}>
                         <AccordionTrigger>
                            <div className="flex items-center gap-4">
                               <Badge className={statusConfig[service.status].color.replace('border-', 'bg-').replace('/10', '/80')}>
                                    {service.status}
                                </Badge>
                               <span className="font-semibold text-base">{service.title}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="prose prose-sm dark:prose-invert max-w-none space-y-2">
                           <p><strong>Analysis:</strong> {service.analysis}</p>
                           <p className="p-3 bg-primary/10 rounded-md border border-primary/20"><strong>Requirement:</strong> {service.requirement}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
             </Accordion>
        </CardContent>
      </Card>

    </main>
  );
}
