
'use client';
import React from 'react';
import { appDetails as blogContent } from './blog-content';
import {
    Bot, BrainCircuit, CheckCircle, Plus, Sparkles, Upload, Megaphone, User,
    ShieldQuestion, Search, MessageCircle, PenTool, Clock2, Wallet, BadgeCheck,
    ClipboardList, Target, LineChart, Users2, Network, LayoutTemplate, Video,
    Instagram, FileText, Globe, FileSearch, KeyRound, BarChart3, Newspaper,
    Handshake, Filter, ListChecks, Container, BotMessageSquare, Terminal,
    FileCheck, Palette, Map, LandPlot, Building, Camera, Calculator, Album, Wand2, Database, BarChart, FileJson, Image as ImageIcon, Youtube
} from 'lucide-react';
import { toast as sonnerToast } from "sonner";
import { Copy, Download, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type FilterCategory = 'All' | 'Marketing' | 'Lead Gen' | 'Creative' | 'Sales Tools' | 'Social & Comms' | 'Web' | 'Editing' | 'Ads' | 'Market Intelligence' | 'CRM' | 'Developer' | 'Market Library';
export type BadgeType = 'NEW' | 'AUTO' | 'DEPRECATED';

export type Field = {
    id: string;
    name: string;
    type: 'text' | 'file' | 'textarea' | 'select' | 'button' | 'group-header' | 'number';
    placeholder?: string;
    value?: string;
    description?: string;
    multiple?: boolean;
    options?: string[];
    hidden?: boolean;
    cta?: string;
}

export interface Feature {
    id: string;
    title: string;
    dashboardTitle?: string;
    description: string;
    longDescription: string;
    icon: React.ReactElement;
    color: string;
    categories: FilterCategory[];
    badge?: BadgeType;
    cta: string;
    mindMapCategory: string;
    isPage?: boolean;
    href: string;
    guideHref?: string;
    creationFields: Field[];
    renderResult?: (result: any, toast: (options: any) => void) => React.ReactNode;
    details: {
        steps: { icon: React.ReactElement, text: string }[];
        aiVsManual: { metric: string, manual: string, ai: string, icon: React.ReactNode }[];
        synergy: { tool: string, benefit: string }[];
        faqs: { question: string, answer: string }[];
        use_cases: string[];
    };
}


const copyToClipboard = (text: string, toast: (options: any) => void) => {
    navigator.clipboard.writeText(text);
    toast({
        title: "Copied to clipboard!",
        description: "The result has been copied successfully.",
    });
};

export const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const filesToDataUris = (files: FileList): Promise<string[]> => {
    const promises = Array.from(files).map(fileToDataUri);
    return Promise.all(promises);
};

const Languages = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-languages"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>;

const toolsData: Omit<Feature, 'details' | 'longDescription' | 'creationFields' | 'renderResult' | 'href' | 'guideHref' | 'mindMapCategory' | 'isPage'>[] = [
    // Meta Ads Pilot
    { id: 'meta-auto-pilot', title: 'Meta Auto Pilot', dashboardTitle: 'Meta Auto Pilot', description: 'Single-click manager for your entire Meta suite.', icon: <Sparkles />, color: '#4B0082', categories: ['Ads', 'Marketing'], badge: 'AUTO', cta: 'Launch Campaign' },
    { id: 'campaign-builder', title: 'Campaign Builder', description: 'Your dedicated agent for Facebook & Instagram advertising.', icon: <LayoutTemplate />, color: '#4B0082', categories: ['Ads', 'Marketing'], cta: 'Build Campaign' },
    { id: 'audience-creator', title: 'Audience Creator', description: 'Find high-intent buyers before they search.', icon: <Users2 />, color: '#4B0082', categories: ['Ads', 'Lead Gen'], cta: 'Create Audience' },
    { id: 'insta-ads-designer', title: 'Insta Ads Designer', dashboardTitle: 'Insta Ads', description: 'Create perfect ads for Instagram Stories & Feed.', icon: <Instagram />, color: '#E1306C', categories: ['Creative', 'Ads'], cta: 'Design Ad' },
    { id: 'reel-ads', title: 'Reel Ads', description: 'Generate engaging video ads for Instagram Reels.', icon: <Video />, color: '#E1306C', categories: ['Creative', 'Ads'], cta: 'Generate Reel' },
    { id: 'instagram-admin-ai', title: 'Instagram Admin AI', dashboardTitle: 'Instagram Admin', description: 'Schedules posts and handles replies on Instagram.', icon: <BotMessageSquare />, color: '#E1306C', categories: ['Social & Comms', 'CRM'], badge: 'AUTO', cta: 'Manage Page' },
    { id: 'story-planner', title: 'Story Planner', description: 'Plan and design animated Instagram stories.', icon: <Album />, color: '#E1306C', categories: ['Creative', 'Social & Comms'], cta: 'Plan Story' },

    // Creative Suite
    { id: 'ai-video-presenter', title: 'AI Video Presenter', description: 'Create a lifelike AI presenter to deliver your project pitch.', icon: <User />, color: '#8A2BE2', categories: ['Creative', 'Video'], badge: 'NEW', cta: 'Generate Presenter' },
    { id: 'ugc-script-writer', title: 'UGC Script Writer', description: 'Generate authentic, user-generated content style video ad scripts.', icon: <PenTool />, color: '#8A2BE2', categories: ['Creative', 'Marketing'], cta: 'Write Scripts' },
    { id: 'youtube-video-editor', title: 'AI YouTube Video Editor', dashboardTitle: 'YouTube Editor', description: 'Edit any video to be YouTube-ready.', icon: <Youtube />, color: '#FF0000', categories: ['Editing', 'Video'], cta: 'Edit Video' },
    { id: 'landing-pages', title: 'Landing Page Builder', dashboardTitle: 'Landing Pages', description: 'Launch high-converting landing pages in minutes.', icon: <Globe />, color: '#1E90FF', categories: ['Web', 'Lead Gen'], cta: 'Generate Page' },
    { id: 'rebranding', title: 'Automated Rebranding', description: 'Apply your brand identity to any brochure with text commands.', icon: <Palette />, color: '#1E90FF', categories: ['Editing', 'Creative'], cta: 'Rebrand Document' },
    { id: 'brochure-translator', title: 'Brochure Translator', description: 'Translate any brochure to multiple languages in seconds.', icon: <Languages />, color: '#1E90FF', categories: ['Editing'], cta: 'Translate Brochure' },
    { id: 'pdf-editor', title: 'Visual PDF Editor (Deprecated)', dashboardTitle: 'PDF Editor', description: 'A legacy tool for simple PDF edits.', icon: <PenTool />, color: '#696969', categories: ['Editing'], badge: 'DEPRECATED', cta: 'Edit PDF' },
    { id: 'pdf-editor-ai', title: 'PDF EDITOR AI', description: 'Edit PDF documents with AI-powered tools.', icon: <Wand2 />, color: '#1E90FF', categories: ['Editing', 'Creative'], cta: 'Edit with AI' },
    { id: 'images-hq-ai', title: 'Images HQ AI', description: 'Generate high-quality, royalty-free images for listings and ads.', icon: <ImageIcon />, color: '#1E90FF', categories: ['Creative'], cta: 'Generate Image' },
    { id: 'logo-creator-ai', title: 'Logo Creator AI', description: 'Create a professional logo for your brand in seconds.', icon: <Sparkles />, color: '#1E90FF', categories: ['Creative'], cta: 'Create Logo' },
    { id: 'aerial-view-generator', title: 'Aerial View Generator', description: 'Create cinematic, aerial video tours of any property.', icon: <Camera />, color: '#8A2BE2', categories: ['Creative', 'Video'], cta: 'Generate Aerial View' },

    // Listing Intelligence
    { id: 'listing-manager', title: 'Listing Manager', description: 'Your central hub to prepare and syndicate listings to major portals.', icon: <ClipboardList />, color: '#FF4500', categories: ['Sales Tools'], cta: 'Manage Listings' },
    { id: 'listing-performance', title: 'Listing Performance', description: 'Track listing views and performance across all portals.', icon: <BarChart />, color: '#FF4500', categories: ['Sales Tools', 'Market Intelligence'], cta: 'View Performance' },
    { id: 'listing-generator', title: 'Listing Generator', description: 'Craft perfect listings for portals like Property Finder & Bayut.', icon: <FileText />, color: '#FF4500', categories: ['Sales Tools'], cta: 'Generate Listing' },
    { id: 'property-finder-sync', title: 'Property Finder Pilot', dashboardTitle: 'Property Finder', description: 'Execution terminal for pushing listings to Property Finder.', icon: <Building />, color: '#FF4500', categories: ['Developer', 'Sales Tools'], badge: 'AUTO', cta: 'Sync Listing' },
    { id: 'bayut-sync', title: 'Bayut Pilot', dashboardTitle: 'Bayut', description: 'Execution terminal for pushing listings to Bayut.', icon: <Building />, color: '#FF4500', categories: ['Developer', 'Sales Tools'], badge: 'AUTO', cta: 'Sync Listing' },
    { id: 'ai-price-estimator', title: 'AI Price Estimator', description: 'Get an AI-powered price estimate for any property.', icon: <BarChart3 />, color: '#32CD32', categories: ['Sales Tools', 'Market Intelligence'], cta: 'Estimate Price' },
    { id: 'commission-calculator', title: 'Commission Calculator', description: 'Instantly calculate your sales commission.', icon: <Calculator />, color: '#32CD32', categories: ['Sales Tools'], cta: 'Calculate' },
    { id: 'payment-planner', title: 'Payment Planner', description: 'Generate tailored payment plans for off-plan properties.', icon: <FileCheck />, color: '#32CD32', categories: ['Sales Tools'], cta: 'Create Plan' },
    { id: 'investor-matching', title: 'Investor Matching', description: 'Pair budgets with the right projects.', icon: <Handshake />, color: '#32CD32', categories: ['Sales Tools', 'Lead Gen'], cta: 'Find Matches' },
    { id: 'multi-offer-builder', title: 'Multi-Offer Builder', description: 'Compare property options side-by-side for clients.', icon: <Container />, color: '#32CD32', categories: ['Sales Tools'], cta: 'Build Comparison' },

    // Comms & CRM
    { id: 'whatsapp-manager', title: 'WhatsApp Manager', dashboardTitle: 'WhatsApp Campaigns', description: 'Send personalized broadcasts and drip campaigns.', icon: <MessageCircle />, color: '#25D366', categories: ['Social & Comms'], cta: 'Manage Campaign' },
    { id: 'lead-investigator', title: 'Lead Investigator AI', dashboardTitle: 'Lead Investigator', description: 'Find social profiles and professional history for any lead.', icon: <FileSearch />, color: '#FFA500', categories: ['CRM', 'Lead Gen'], cta: 'Investigate Lead' },

    // Market Intelligence
    { id: 'market-library', title: 'Market Library', description: 'Search our intelligent library for verified projects.', icon: <Database />, color: '#00CED1', categories: ['Market Intelligence'], cta: 'Search Library' },
    { id: 'market-reports', title: 'Market Reports', description: 'Generate PDF reports on market trends, pricing, and sentiment.', icon: <Newspaper />, color: '#00CED1', categories: ['Market Intelligence'], cta: 'Generate Report' },
    { id: 'market-trends', title: 'Market Trends Watcher', dashboardTitle: 'Market Trends', description: 'Identify emerging market trends before they become mainstream.', icon: <LineChart />, color: '#00CED1', categories: ['Market Intelligence'], cta: 'Analyze Trends' },
    { id: 'deal-analyzer', title: 'Deal Analyzer', description: 'Analyze the investment potential of any real estate deal.', icon: <BarChart3 />, color: '#32CD32', categories: ['Sales Tools', 'Market Intelligence'], cta: 'Analyze Deal' },
    { id: 'keyword-planner', title: 'Keyword Planner', description: 'Generate strategic keyword plans for Google Ads.', icon: <KeyRound />, color: '#4B0082', categories: ['Ads', 'Marketing'], cta: 'Generate Plan' },

    // Core / Platform
    { id: 'ai-brand-creator', title: 'AI Brand Creator', dashboardTitle: 'Brand Creator', description: 'Configure your brand kit by analyzing uploaded documents.', icon: <Wand2 />, color: '#6A0DAD', categories: ['CRM'], cta: 'Create Brand' },
    { id: 'crm-assistant', title: 'CRM Memory Assistant', dashboardTitle: 'CRM Memory', description: 'The core data store that remembers every client interaction.', icon: <BrainCircuit />, color: '#6A0DAD', categories: ['CRM'], cta: 'Query Memory' },
    { id: 'ai-assistant', title: 'AI Assistant', description: 'Your personal, trainable AI partner.', icon: <Bot />, color: '#6A0DAD', categories: ['CRM'], cta: 'Chat with Assistant' },
    { id: 'embeddable-site-assistant', title: 'Embeddable Site Assistant', dashboardTitle: 'Site Assistant', description: 'Add a market-aware AI chatbot to any website.', icon: <BotMessageSquare />, color: '#6A0DAD', categories: ['Web', 'Lead Gen'], cta: 'Create Bot' },

    // Developer Tools
    { id: 'vm-creator', title: 'VM Creator', description: 'A utility for developers to provision Google Cloud virtual machines.', icon: <Terminal />, color: '#333333', categories: ['Developer'], cta: 'Create VM' },
    { id: 'creative-execution-terminal', title: 'Creative Execution Terminal', dashboardTitle: 'Execution Terminal', description: 'The execution engine for complex creative tasks.', icon: <Terminal />, color: '#333333', categories: ['Developer'], cta: 'Run Job' },
    { id: 'superfreetime', title: 'Super Free Time', description: 'A secret tool for some fun.', icon: <KeyRound />, color: '#FFD700', categories: [], cta: 'Play' },
];

// Function to merge data with details
const mergeToolData = (): Feature[] => {
    return toolsData.map(tool => {
        const detailsContent = blogContent.apps.find(app => app.name.toLowerCase().replace(/\s/g, '-') === tool.id.toLowerCase());

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
            ],
            use_cases: detailsContent?.use_cases || []
        };
        
        let finalDetails = defaultDetails;
        if (detailsContent) {
            finalDetails = {
                ...defaultDetails,
                steps: detailsContent.flow.split('. ').filter(s => s).map((s, i) => ({
                    icon: i === 0 ? <Upload /> : i === 1 ? <Sparkles /> : <Download />,
                    text: s.replace(/step \d+: /i, '').trim(),
                })),
                synergy: detailsContent.integrations.map(integration => ({
                    tool: integration,
                    benefit: `Integrates seamlessly with ${integration} to create powerful, automated workflows.`
                })),
                faqs: detailsContent.faqs.map(faq => ({ question: faq.q, answer: faq.a })),
            };
        }
        
        if (finalDetails.steps.length === 0) {
            finalDetails.steps = defaultDetails.steps;
        }


        return {
            ...(tool as any),
            longDescription: detailsContent?.full_description || tool.description,
            isPage: ['bayut-sync', 'property-finder-sync', 'listing-manager', 'listing-performance', 'market-trends', 'youtube-video-editor', 'pdf-editor', 'chatbot-creator', 'keyword-planner', 'projects-finder', 'market-reports', 'deal-analyzer', 'ugc-script-writer', 'ai-video-presenter', 'meta-auto-pilot', 'campaign-builder', 'lease-reviewer', 'tiktok-editor', 'reel-ads', 'crm-assistant', 'whatsapp-manager', 'multi-offer-builder'].includes(tool.id),
            href: `/dashboard/tool/${tool.id}`,
            guideHref: `/apps/${tool.id}`,
            mindMapCategory: tool.categories.includes('Ads') ? 'Meta Pilot (Campaign Automation)' :
                             tool.categories.includes('Creative') || tool.categories.includes('Web') || tool.categories.includes('Editing') ? 'Archy (Creative Marketing)' :
                             tool.categories.includes('Market Intelligence') ? 'Market Intelligence' :
                             tool.categories.includes('CRM') || tool.categories.includes('Sales Tools') ? 'Listing & CRM Tools' : 'Core Platform',
            creationFields: [], // This will be populated below based on ID
            details: finalDetails,
        };
    });
};


export const tools: Feature[] = mergeToolData().map(tool => {
    // This switch populates the `creationFields` for each tool,
    // effectively defining the form for each tool's dashboard page.
    switch (tool.id) {
        case 'ai-brand-creator':
            tool.creationFields = [
                { id: 'command', name: 'Command', type: 'text', placeholder: 'e.g., "Set up my brand from the uploaded files."' },
                { id: 'documents', name: 'Documents', type: 'file', multiple: true, description: "Upload PDFs, text files, etc." },
            ];
            tool.renderResult = (result, toast) => (
                <div className="space-y-4">
                    <Alert>
                        <Sparkles className="h-4 w-4" />
                        <AlertTitle>AI Summary</AlertTitle>
                        <AlertDescription>{result.summary}</AlertDescription>
                    </Alert>
                    {result.brandInfo && (
                        <Card>
                            <CardHeader><CardTitle>Extracted Brand Info</CardTitle></CardHeader>
                            <CardContent>
                                {result.brandInfo.companyName && <p><strong>Company:</strong> {result.brandInfo.companyName}</p>}
                                {result.brandInfo.primaryColor && <p><strong>Primary Color:</strong> <span style={{color: result.brandInfo.primaryColor}}>{result.brandInfo.primaryColor}</span></p>}
                                {result.brandInfo.contact?.email && <p><strong>Email:</strong> {result.brandInfo.contact.email}</p>}
                            </CardContent>
                        </Card>
                    )}
                     {result.projects && result.projects.length > 0 && (
                        <Card>
                            <CardHeader><CardTitle>Extracted Projects</CardTitle></CardHeader>
                            <CardContent>
                                <ul>
                                    {result.projects.map((p: any, i: number) => <li key={i}>{p.name} - {p.location}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </div>
            );
            break;
        case 'commission-calculator':
            tool.creationFields = [
                { id: 'salePrice', name: 'Sale Price (AED)', type: 'number', placeholder: 'e.g., 2500000' },
                { id: 'commissionRate', name: 'Commission Rate (%)', type: 'number', placeholder: 'e.g., 2' },
                { id: 'agentSplit', name: 'Your Split (%)', type: 'number', placeholder: 'e.g., 50', value: '50' },
            ];
            tool.renderResult = (result, toast) => {
                const salePrice = parseFloat(result.salePrice);
                const commissionRate = parseFloat(result.commissionRate);
                const agentSplit = parseFloat(result.agentSplit);
                const totalCommission = salePrice * (commissionRate / 100);
                const yourShare = totalCommission * (agentSplit / 100);
                return (
                <div className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle>Commission Breakdown</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                             <p><strong>Total Commission:</strong> AED {totalCommission.toLocaleString()}</p>
                             <p><strong>Your Share:</strong> AED {yourShare.toLocaleString()}</p>
                        </CardContent>
                    </Card>
                </div>
            )};
            break;
         case 'ugc-script-writer':
            tool.creationFields = [
                 { id: 'topic', name: 'Topic or Project', type: 'text', placeholder: 'e.g., "Emaar Beachfront 2BR"' },
                 { id: 'vibe', name: 'Vibe', type: 'select', options: ['Exciting & Upbeat', 'Authentic & Relatable', 'Luxurious & Exclusive', 'Informative & Educational'] },
                 { id: 'hookStyle', name: 'Hook Style', type: 'select', options: ['Question-based', 'Problem/Solution', 'Surprising Stat', 'Direct & Bold'] },
            ];
            break;
        case 'insta-ads-designer':
            tool.creationFields = [
                { id: 'projectId', name: 'Project', type: 'select', placeholder: 'Select a project from your library', options: ['emaar-beachfront', 'damac-hills-2', 'sobha-hartland', 'Add New Project...'], description: "Select a project you've saved to your library to use its assets." },
                { id: 'brochureDataUri', name: 'OR Upload Brochure', type: 'file', description: "If the project isn't in your library, upload its brochure (PDF)." },
                { id: 'focusArea', name: 'Ad Focus', type: 'text', placeholder: 'e.g., Luxury amenities, investment potential', description: 'What is the main selling point for this ad?' },
                { id: 'toneOfVoice', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Friendly', 'Urgent', 'Luxury'], description: 'The desired tone for the ad copy.' },
            ];
            tool.renderResult = (result, toast) => (
                <div className="space-y-4">
                    <h3 className="font-semibold">Ad Copy:</h3>
                    <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">{result.adCopy}</pre>
                    <Button onClick={() => copyToClipboard(result.adCopy, toast)}><Copy className="mr-2"/> Copy Text</Button>
                     <h3 className="font-semibold mt-4">Generated Brochure:</h3>
                    <iframe src={result.adDesign} className="w-full h-96 rounded-md border" title="Generated Brochure Preview" />
                     <h3 className="font-semibold mt-4">Generated Landing Page:</h3>
                     <iframe src={result.landingPage} className="w-full h-96 rounded-md border" title="Generated Landing Page Preview" />
                </div>
            );
            break;
        case 'audience-creator':
             tool.creationFields = [
                { id: 'projectId', name: 'Project', type: 'select', options: ['emaar-beachfront', 'damac-hills-2', 'sobha-hartland'], placeholder: 'Select a project to generate an audience for', description: 'The AI will analyze the project to find the ideal buyer.' },
            ];
            tool.renderResult = (result, toast) => (
                <div className="space-y-4">
                    {result.strategies.map((strategy: any, index: number) => (
                        <Card key={index}>
                            <CardContent className="p-4">
                                <h3 className="font-bold text-lg text-primary">{strategy.strategyName}</h3>
                                <p className="text-sm text-muted-foreground mb-2">Meta Audience Type: <span className="font-semibold">{strategy.audienceType}</span></p>
                                <p><strong>Demographics:</strong> {strategy.demographics}</p>
                                <p><strong>Interests (for Meta):</strong> {strategy.interests}</p>
                                <p><strong>Keywords (for Google):</strong> {strategy.keywords}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            );
            break;
        case 'rebranding':
            tool.creationFields = [
                { id: 'brochureDataUri', name: 'Source Brochure', type: 'file', description: 'The original brochure you want to rebrand (PDF).' },
                { id: 'contactDetails', name: 'Your Contact Info', type: 'textarea', placeholder: 'Jane Doe\n+971 50 123 4567\njane.doe@agency.com', description: 'The contact details to add to the brochure.' },
                { id: 'companyName', name: 'Your Company Name', type: 'text', placeholder: 'e.g., Luxe Properties Dubai', description: 'Your brand name for the rebranding.' },
                { id: 'companyLogoDataUri', name: 'Your Logo (Optional)', type: 'file', description: 'Upload your logo (PNG/JPG). If not provided, an AI logo will be generated.' },
                { id: 'toneOfVoice', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Friendly', 'Luxury'], description: 'The tone for any AI-generated text.' },
                { id: 'colors', name: 'Color Palette', type: 'text', placeholder: 'e.g., "Navy Blue and Gold"', description: 'The desired brand colors.' },
                { id: 'deepEditInstructions', name: 'Specific Instructions (Optional)', type: 'textarea', placeholder: 'e.g., "Replace the cover image with an image of the Dubai Marina skyline. Change all prices to be 5% higher."', description: 'Give the AI specific, detailed changes to make.' },
            ];
             tool.renderResult = (result, toast) => (
                <div className="space-y-4">
                    {result.logoDataUri && (
                        <div>
                             <h3 className="font-semibold">AI Generated Logo:</h3>
                             <div className="p-4 bg-muted rounded-md my-2 flex justify-center">
                                <img src={result.logoDataUri} alt="AI Generated Logo" className="h-24 object-contain" />
                            </div>
                        </div>
                    )}
                    <h3 className="font-semibold">Rebranded Brochure:</h3>
                    <iframe src={result.rebrandedBrochureDataUri} className="w-full h-96 rounded-md border" title="Rebranded Brochure" />
                </div>
            );
            break;
        case 'pdf-editor':
             tool.creationFields = [
                { id: 'sourcePdf', name: 'Source PDF', type: 'file', description: 'Upload the PDF you want to edit.' },
                { id: 'editInstructions', name: 'Editing Instructions', type: 'textarea', placeholder: 'e.g., "Change the main title to \'Luxury Living in Dubai\'. Replace the logo on page 1. Swap the image on page 3 with the new one I uploaded."', description: 'Describe the changes you want to make.' },
                { id: 'newImages', name: 'New Images (Optional)', type: 'file', multiple: true, description: 'Upload any new images to be used in the PDF.' },
            ];
            tool.renderResult = (result, toast) => (
                 <div className="space-y-4">
                    <h3 className="font-semibold">Execution Plan Summary:</h3>
                    <p className="p-4 bg-muted rounded-md text-sm">{result.summary}</p>
                    <h3 className="font-semibold">Steps to be Executed:</h3>
                     <ul className="space-y-2">
                        {result.executionPlan.map((step: any, index: number) => (
                            <li key={index} className="p-3 border rounded-lg bg-muted/50 text-sm">
                                <p><strong>Step {index+1}:</strong> {step.description}</p>
                                <p className="font-mono text-xs text-muted-foreground">Tool: {step.tool}, Params: {JSON.stringify(step.parameters)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            );
            break;
        case 'landing-pages':
            tool.creationFields = [
                { id: 'projectName', name: 'Project Name', type: 'text', placeholder: 'e.g., Emaar Beachfront' },
                { id: 'projectDetails', name: 'Project/Offer Details', type: 'textarea', placeholder: 'e.g., Luxury 2-bedroom apartments with sea view, 10% down payment' },
                { id: 'brandingStyle', name: 'Branding Style', type: 'select', options: ['Modern & Minimalist', 'Luxury & Elegant', 'Bold & Vibrant', 'Calm & Natural'] },
                { id: 'numberOfSections', name: 'Number of Sections', type: 'select', options: ['2', '3', '4', '5'] },
                { id: 'projectBrochureDataUri', name: 'Upload Brochure (Optional)', type: 'file' },
            ];
            tool.renderResult = (result, toast) => (
                 <div>
                    <h3 className="font-semibold mb-2">Generated Landing Page HTML:</h3>
                    <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap max-h-96 overflow-auto">{result.landingPageHtml}</pre>
                    <Button className="mt-2" onClick={() => copyToClipboard(result.landingPageHtml, toast)}><Copy className="mr-2"/> Copy HTML</Button>
                </div>
            );
            break;
        case 'instagram-content-creator':
            tool.creationFields = [
                { id: 'source', name: 'Topic or URL', type: 'textarea', placeholder: 'e.g., A blog post about "Top 5 investment areas in Dubai", or just "Emaar Beachfront"' },
                { id: 'platform', name: 'Platform', type: 'select', options: ['Instagram', 'Facebook', 'LinkedIn', 'Twitter'] },
                { id: 'tone', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Humorous', 'Urgent', 'Inspirational'] },
            ];
             tool.renderResult = (result, toast) => (
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-2">7-Day Post Schedule:</h3>
                        {result.posts.map((post: any) => (
                            <Card key={post.day} className="mb-4">
                                <CardContent className="p-4">
                                    <h4 className="font-bold text-primary">{post.day}</h4>
                                    <p className="text-sm my-2 whitespace-pre-wrap">{post.postContent}</p>
                                    <p className="text-xs text-muted-foreground"><strong>Image Idea:</strong> {post.imageSuggestion}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                     <div>
                        <h3 className="font-semibold mb-2">Hashtag Strategy:</h3>
                        <p><strong>Primary:</strong> {result.hashtagStrategy.primary.join(' ')}</p>
                        <p><strong>Secondary:</strong> {result.hashtagStrategy.secondary.join(' ')}</p>
                        <p><strong>Location:</strong> {result.hashtagStrategy.location.join(' ')}</p>
                    </div>
                </div>
            );
            break;
        case 'investor-matching':
            tool.creationFields = [
                { id: 'clientDatabase', name: 'Client Database (CSV)', type: 'file', description: "Must contain columns like 'name', 'email', 'budget', 'interest'." },
                { id: 'group-header-1', name: 'Property to Match', type: 'group-header' },
                { id: 'propertyType', name: 'Property Type', type: 'text', placeholder: 'e.g., Duplex, Commercial' },
                { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., Dubai Marina' },
                { id: 'price', name: 'Price (AED)', type: 'number', placeholder: 'e.g., 2500000' },
                { id: 'capRate', name: 'Cap Rate (%)', type: 'number', placeholder: 'e.g., 6.5' },
                { id: 'investmentThesis', name: 'Investment Thesis', type: 'text', placeholder: 'e.g., Value-Add, Turnkey Rental' },
                { id: 'keyFeatures', name: 'Key Features', type: 'textarea', placeholder: 'e.g., Sea view, Private pool, High floor' },
            ];
            tool.renderResult = (result, toast) => (
                <div>
                    <h3 className="font-semibold mb-2">Top Investor Matches:</h3>
                    {result.matches.map((match: any, index: number) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="p-4">
                                <div className="flex justify-between">
                                    <h4 className="font-bold text-primary">{match.name}</h4>
                                    <Badge>Score: {match.matchScore}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{match.email}</p>
                                <p className="text-sm mt-2"><strong>Reasoning:</strong> {match.reasoning}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            );
            break;
        case 'market-reports':
            tool.creationFields = [
                { id: 'location', name: 'Location', type: 'text', placeholder: 'e.g., Dubai Marina' },
                { id: 'propertyType', name: 'Property Type', type: 'text', placeholder: 'e.g., Luxury Condos' },
                { id: 'reportType', name: 'Target Audience', type: 'select', options: ['Investor', 'Home Buyer', 'Seller'] },
            ];
            tool.renderResult = (result, toast) => (
                <div className="prose prose-sm dark:prose-invert">
                    <h2>{result.reportTitle}</h2>
                    <h4>Executive Summary</h4>
                    <p>{result.executiveSummary}</p>
                    <h4>Market Trends</h4>
                    <ul>{result.marketTrends.map((trend: any, i: number) => <li key={i}><strong>{trend.trend}:</strong> {trend.analysis}</li>)}</ul>
                    <h4>Pricing Analysis</h4>
                    <p>{result.pricingAnalysis}</p>
                    <h4>Future Outlook</h4>
                    <p>{result.futureOutlook}</p>
                </div>
            );
            break;
        case 'listing-generator':
             tool.creationFields = [
                { id: 'platform', name: 'Target Platform', type: 'select', options: ['Property Finder', 'Bayut', 'Generic'] },
                { id: 'propertyAddress', name: 'Property Address', type: 'text', placeholder: 'e.g., 123 Marina Promenade, Dubai' },
                { id: 'keyDetails', name: 'Key Details', type: 'text', placeholder: 'e.g., 3 beds, 4 baths, 2,100 sqft' },
                { id: 'uniqueFeatures', name: 'Unique Features', type: 'textarea', placeholder: 'e.g., Full sea view, Upgraded kitchen, Vacant on transfer' },
                { id: 'tone', name: 'Tone', type: 'select', options: ['Luxury', 'Family-Friendly', 'Modern', 'Cozy', 'Urgent'] },
            ];
            tool.renderResult = (result, toast) => (
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold">Generated Title:</h3>
                        <p className="p-2 bg-muted rounded-md text-sm">{result.title}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Generated Description:</h3>
                        <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">{result.description}</pre>
                    </div>
                    <div>
                        <h3 className="font-semibold">Suggested Keywords:</h3>
                        <p className="text-sm">{result.keywords.join(', ')}</p>
                    </div>
                    <Button onClick={() => copyToClipboard(`${result.title}\n\n${result.description}`, toast)}><Copy className="mr-2"/> Copy All Text</Button>
                </div>
            );
            break;
        case 'deal-analyzer':
            tool.creationFields = [
                 { id: 'group-header-1', name: 'Property & Loan Details', type: 'group-header' },
                { id: 'propertyAddress', name: 'Property Address', type: 'text', placeholder: 'e.g., 123 Ocean View, Dubai Marina' },
                { id: 'purchasePrice', name: 'Purchase Price (AED)', type: 'number', placeholder: 'e.g., 2000000' },
                { id: 'downPaymentPercentage', name: 'Down Payment (%)', type: 'number', placeholder: 'e.g., 20' },
                { id: 'interestRate', name: 'Interest Rate (%)', type: 'number', placeholder: 'e.g., 4.5' },
                { id: 'loanTermYears', name: 'Loan Term (Years)', type: 'number', placeholder: 'e.g., 25' },
                { id: 'group-header-2', name: 'Income & Expenses', type: 'group-header' },
                { id: 'expectedMonthlyRent', name: 'Expected Monthly Rent (AED)', type: 'number', placeholder: 'e.g., 12000' },
                { id: 'monthlyExpenses', name: 'Total Monthly Expenses (AED)', type: 'number', placeholder: 'e.g., 2500' },
                { id: 'closingCosts', name: 'Closing Costs (AED)', type: 'number', placeholder: 'e.g., 80000' },
            ];
            tool.renderResult = (result, toast) => (
                 <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Analysis Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{result.analysisSummary}</p>
                        </CardContent>
                    </Card>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader><CardTitle className="text-base">Monthly Cash Flow</CardTitle></CardHeader>
                            <CardContent><p className="text-xl font-bold">AED {result.monthlyCashFlow.toLocaleString()}</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="text-base">Cash on Cash ROI</CardTitle></CardHeader>
                            <CardContent><p className="text-xl font-bold">{result.cashOnCashROI.toFixed(2)}%</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className="text-base">Cap Rate</CardTitle></CardHeader>
                            <CardContent><p className="text-xl font-bold">{result.capitalizationRate.toFixed(2)}%</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className="text-base">Monthly Mortgage</CardTitle></CardHeader>
                            <CardContent><p className="text-xl font-bold">AED {result.monthlyMortgagePayment.toLocaleString()}</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="text-base">Initial Investment</CardTitle></CardHeader>
                            <CardContent><p className="text-xl font-bold">AED {result.totalInitialInvestment.toLocaleString()}</p></CardContent>
                        </Card>
                    </div>
                </div>
            );
            break;
        case 'keyword-planner':
            tool.creationFields = [
                { id: 'topic', name: 'Topic / Product', type: 'text', placeholder: 'e.g., "Luxury villas in Dubai Hills"' },
                { id: 'targetLocation', name: 'Target Location', type: 'text', placeholder: 'e.g., "Dubai, UAE"' },
            ];
            tool.renderResult = (result, toast) => (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold font-heading">{result.planTitle}</h2>
                    {result.adGroups.map((group: any) => (
                        <Card key={group.adGroupName}>
                            <CardHeader><CardTitle>{group.adGroupName}</CardTitle></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader><TableRow><TableHead>Keyword</TableHead><TableHead>Match Type</TableHead><TableHead>Searches</TableHead><TableHead>Competition</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {group.keywords.map((kw: any, i: number) => (
                                            <TableRow key={i}><TableCell>{kw.keyword}</TableCell><TableCell>{kw.matchType}</TableCell><TableCell>{kw.monthlySearches}</TableCell><TableCell>{kw.competition}</TableCell></TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    ))}
                    <Card>
                        <CardHeader><CardTitle>Negative Keywords</CardTitle></CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">{result.negativeKeywords.join(', ')}</p></CardContent>
                    </Card>
                </div>
            );
            break;
        case 'meta-ads-copilot':
            tool.creationFields = [
                { id: 'campaignGoal', name: 'Campaign Goal', type: 'select', options: ['Lead Generation to Landing Page', 'Lead Generation to WhatsApp', 'Brand Awareness', 'Website Traffic'] },
                { id: 'projectBrochureDataUri', name: 'Project Brochure', type: 'file', description: "The AI will use this to understand the project and generate content." },
                { id: 'budget', name: 'Total Budget (USD)', type: 'number', placeholder: 'e.g., 500' },
                { id: 'durationDays', name: 'Duration (Days)', type: 'number', placeholder: 'e.g., 14' },
            ];
             tool.renderResult = (result, toast) => (
                 <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{result.campaignName}</CardTitle>
                            <CardDescription>Objective: {result.campaignObjective}</CardDescription>
                        </CardHeader>
                         <CardContent>
                            <p className="font-semibold">Inferred Audience:</p>
                            <p className="text-muted-foreground">{result.inferredAudience}</p>
                        </CardContent>
                    </Card>

                    {result.adSets.map((adSet: any, index: number) => (
                        <Card key={index}>
                             <CardHeader>
                                <CardTitle>Ad Set {index + 1}: {adSet.name}</CardTitle>
                                <CardDescription>Daily Budget: ${adSet.dailyBudget}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold">Targeting:</p>
                                <p className="text-muted-foreground">{adSet.targetingSummary}</p>
                            </CardContent>
                        </Card>
                    ))}

                     {result.adCreatives.map((ad: any, index: number) => (
                        <Card key={index}>
                             <CardHeader>
                                <CardTitle>Ad Creative {index + 1}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Headline:</strong> {ad.headline}</p>
                                <p><strong>Body:</strong> {ad.bodyText}</p>
                                <p><strong>CTA:</strong> {ad.callToAction}</p>
                                <p><strong>Image Suggestion:</strong> {ad.imageSuggestion}</p>
                            </CardContent>
                        </Card>
                    ))}

                    <Card>
                        <CardHeader><CardTitle>Optimization Advice</CardTitle></CardHeader>
                        <CardContent><p>{result.optimizationAdvice}</p></CardContent>
                    </Card>

                    <Button onClick={() => copyToClipboard(JSON.stringify(result, null, 2), toast)}><FileJson className="mr-2"/> Copy Full Plan (JSON)</Button>
                </div>
            );
            break;
        default:
            // Generic placeholder for tools without specific implementation yet
            tool.creationFields = [
                { id: 'input', name: 'Input', type: 'text', placeholder: 'Enter your input...' },
            ];
            tool.renderResult = (result, toast) => (
                <pre className="p-4 bg-muted rounded-md text-sm">{JSON.stringify(result, null, 2)}</pre>
            );
            break;
    }
    return tool;
});
