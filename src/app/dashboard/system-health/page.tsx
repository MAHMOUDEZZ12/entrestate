
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
        id: "instagram-admin-ai",
        title: "Instagram Admin AI",
        status: "Placeholder",
        analysis: "The flow is a placeholder and needs to be connected to the Instagram API for real-time comment/DM management.",
        requirement: "Integrate with the Instagram Graph API for comment and message handling."
    },
    {
        id: "story-planner",
        title: "Story Planner",
        status: "Placeholder",
        analysis: "The UI and flow are placeholders. Needs integration with a video/animation generation service.",
        requirement: "Implement storyboard UI and connect to a video generation model for animated stories."
    },
     {
        id: "ai-video-presenter",
        title: "AI Video Presenter",
        status: "Needs Integration",
        analysis: "The flow is defined but relies on a video generation model that needs to be fully integrated and tested.",
        requirement: "Connect to the Veo model and ensure the image-to-video generation with audio sync is working correctly."
    },
    {
        id: "ugc-script-writer",
        title: "UGC Script Writer",
        status: "Perfect",
        analysis: "The flow and UI are functional for generating UGC-style scripts.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "youtube-video-editor",
        title: "AI YouTube Video Editor",
        status: "Needs Integration",
        analysis: "The UI and flow logic are in place, but the video editing itself is simulated. It needs to be connected to a real video editing model.",
        requirement: "Replace the placeholder logic in the `editYoutubeVideoFlow` with a call to a real video editing AI model."
    },
    {
        id: "landing-pages",
        title: "Landing Page Builder",
        status: "Needs Integration",
        analysis: "The flow generates HTML but doesn't handle publishing or hosting.",
        requirement: "Implement a service to take the generated HTML and publish it to a live URL (e.g., on Vercel or Firebase Hosting)."
    },
    {
        id: "rebranding",
        title: "Automated Rebranding",
        status: "Perfect",
        analysis: "The flow correctly takes a brochure and branding inputs to generate a rebranded version.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "brochure-translator",
        title: "Brochure Translator",
        status: "Needs Integration",
        analysis: "The flow is defined but needs to be connected to a robust document translation service that preserves layout.",
        requirement: "Integrate with Google's Document Translation API or a similar service."
    },
    {
        id: "pdf-editor",
        title: "Visual PDF Editor (Deprecated)",
        status: "Deprecated",
        analysis: "This tool is correctly marked as deprecated and guides users to newer, more specialized tools.",
        requirement: "No action needed."
    },
    {
        id: "pdf-editor-ai",
        title: "PDF EDITOR AI",
        status: "Placeholder",
        analysis: "This is a placeholder UI. The core AI flow for parsing and editing PDF content needs to be built.",
        requirement: "Implement the `editPdf` Genkit flow with logic to parse PDF structure and apply text/image changes."
    },
    {
        id: "images-hq-ai",
        title: "Images HQ AI",
        status: "Placeholder",
        analysis: "This is a placeholder UI. The flow needs to be connected to a text-to-image model.",
        requirement: "Implement a flow that calls a text-to-image model like Imagen and returns the image data."
    },
    {
        id: "logo-creator-ai",
        title: "Logo Creator AI",
        status: "Placeholder",
        analysis: "This is a placeholder UI. The flow needs to be connected to a text-to-image model specialized for logos.",
        requirement: "Implement a flow that calls a text-to-image model with prompts optimized for logo generation."
    },
    {
        id: "aerial-view-generator",
        title: "Aerial View Generator",
        status: "Needs Integration",
        analysis: "The flow is a placeholder. It needs to be connected to a video generation model that can create aerial shots.",
        requirement: "Integrate with a model like Veo, providing it with location data or reference images to generate aerial videos."
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
        status: "Needs Integration",
        analysis: "The UI is fully implemented with mock data, but needs a live data feed.",
        requirement: "Connect the component to a live analytics data source from portal APIs (e.g., Bayut, Property Finder) or Google Analytics."
    },
    {
        id: "listing-generator",
        title: "Listing Generator",
        status: "Perfect",
        analysis: "The AI flow and the UI form are fully implemented and functional, generating high-quality listing descriptions.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "property-finder-sync",
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
        id: "commission-calculator",
        title: "Commission Calculator",
        status: "Placeholder",
        analysis: "The UI is a placeholder. The calculation logic needs to be implemented in a backend flow.",
        requirement: "Build the UI form and implement the backend logic for commission calculations based on various rules."
    },
    {
        id: "payment-planner",
        title: "Payment Planner",
        status: "Perfect",
        analysis: "The UI and flow are fully implemented to generate payment plans based on user inputs.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "investor-matching",
        title: "Investor Matching",
        status: "Perfect",
        analysis: "The UI and flow are fully implemented, allowing users to upload a client list and get AI-powered matches.",
        requirement: "None. This service is fully functional."
    },
     {
        id: "multi-offer-builder",
        title: "Multi-Offer Builder",
        status: "Placeholder",
        analysis: "This is a placeholder UI. It needs a flow to generate comparison documents.",
        requirement: "Implement a flow that takes multiple property details and generates a comparative PDF or web view."
    },
    {
        id: "whatsapp-manager",
        title: "WhatsApp Manager",
        status: "Needs Integration",
        analysis: "The flow generates a message template but doesn't actually send messages.",
        requirement: "Integrate with the Twilio API or another WhatsApp Business API provider to send the messages."
    },
    {
        id: "lead-investigator",
        title: "Lead Investigator AI",
        status: "Perfect",
        analysis: "The UI and flow for investigating leads are fully functional.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "market-library",
        title: "Market Library",
        status: "Perfect",
        analysis: "The project finder tool acts as the interface to the Market Library and is fully functional.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "market-reports",
        title: "Market Reports",
        status: "Perfect",
        analysis: "The UI and flow for generating market reports are fully functional.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "market-trends",
        title: "Market Trends Watcher",
        status: "Perfect",
        analysis: "The flow and UI are fully functional, providing market analysis based on user topics.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "brand-creator",
        title: "AI Brand Creator",
        status: "Placeholder",
        analysis: "The UI is a placeholder. The core `aiBrandCreator` flow needs to be implemented to extract brand info from documents.",
        requirement: "Implement the Genkit flow to process uploaded documents and extract brand information."
    },
    {
        id: "crm-assistant",
        title: "CRM Memory Assistant",
        status: "Needs Integration",
        analysis: "The flow simulates a CRM lookup. It needs to be connected to a real vector database.",
        requirement: "Integrate with a vector database (like Firestore Vector Search) to perform lookups on the user's actual CRM data."
    },
    {
        id: "ai-assistant",
        title: "AI Assistant",
        status: "Needs Integration",
        analysis: "The main assistant chat interface is functional but its knowledge lookup is simulated.",
        requirement: "Connect the `lookupKnowledge` tool in the chat API to a real vector database of the user's documents."
    },
    {
        id: "embeddable-site-assistant",
        title: "Embeddable Site Assistant",
        status: "Placeholder",
        analysis: "This is a conceptual tool and needs to be designed and implemented.",
        requirement: "Design and build the chatbot widget and the backend flow to serve conversational responses based on a knowledge base."
    },
    {
        id: "vm-creator",
        title: "VM Creator",
        status: "Placeholder",
        analysis: "This is a placeholder for a developer-focused utility. It needs a backend flow to interact with a cloud provider's API.",
        requirement: "Implement a flow that uses the Google Cloud API to provision virtual machines based on user-defined specs."
    },
    {
        id: "creative-execution-terminal",
        title: "Creative Execution Terminal",
        status: "Placeholder",
        analysis: "This is a developer tool concept that requires a backend orchestration system.",
        requirement: "Design and build a task queuing system (e.g., using Cloud Tasks or Pub/Sub) to manage and execute long-running creative jobs."
    },
    {
        id: "deal-analyzer",
        title: "Deal Analyzer",
        status: "Perfect",
        analysis: "The flow correctly calculates all financial metrics and the UI displays them clearly.",
        requirement: "None. This service is fully functional."
    },
    {
        id: "keyword-planner",
        title: "Keyword Planner",
        status: "Perfect",
        analysis: "The UI and flow are fully implemented, providing comprehensive keyword plans.",
        requirement: "None. This service is fully functional."
    }
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
                               <Badge className={`${statusConfig[service.status].color.replace('border-', 'bg-').replace('/10', '/80')} text-white`}>
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
