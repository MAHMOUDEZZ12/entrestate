
'use client';
import React from 'react';
import { tools as toolsData } from './tools-data';
import { blogContent } from './blog-content';
import {
    Bot, BrainCircuit, CheckCircle, Plus, Sparkles, Upload, Megaphone, User,
    ShieldQuestion, Search, MessageCircle, PenTool, Clock2, Wallet, BadgeCheck,
    ClipboardList, Target, LineChart, Users2, Network, LayoutTemplate, Video,
    Instagram, FileText, Globe, FileSearch, KeyRound, BarChart3, Newspaper,
    Handshake, Filter, ListChecks, Container, BotMessageSquare, Terminal,
    FileCheck, Palette, Map, LandPlot, Building2, Camera, Calculator, Album, Wand2, Database
} from 'lucide-react';
import { toast as sonnerToast } from "sonner";
import { Copy, Download, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        aiVsManual: { metric: string, manual: string, ai: string, icon: React.ReactElement }[];
        synergy: { tool: string, benefit: string }[];
        faqs: { question: string, answer: string }[];
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


// Function to merge data with details
const mergeToolData = (): Feature[] => {
    return toolsData.map(tool => {
        const details = blogContent[tool.id] || { sections: [], title: '', intro: '', cta: '' };

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
            synergy: [],
            faqs: []
        };
        
        let toolDetails = {
            steps: details.sections.slice(0, 3).map((s: any, i: number) => ({
                icon: i === 0 ? <Upload /> : i === 1 ? <Sparkles /> : <Download />,
                text: s.body
            })),
             aiVsManual: defaultDetails.aiVsManual, // Keep default for now
            synergy: [
                 { tool: "AI Assistant", benefit: "Use the assistant to run this tool via a simple text command for faster workflow." },
                 { tool: "Brand Kit", benefit: "Automatically applies your logos and colors to ensure all outputs are on-brand." },
            ],
            faqs: [
                { question: "Is my data used to train the AI?", answer: "No. Your data is kept private and is only used to generate content for you. It is not used for training external models." },
                { question: "Can I edit the generated content?", answer: "Yes, all generated content can be downloaded and edited in other tools, or you can use our built-in editors to refine the results." }
            ]
        };

        if (toolDetails.steps.length === 0) {
            toolDetails.steps = defaultDetails.steps;
        }

        return {
            ...(tool as any),
            longDescription: details.intro || tool.description,
            isPage: false,
            href: `/apps/${tool.id}`,
            guideHref: `/apps/${tool.id}`,
            mindMapCategory: tool.categories.includes('Ads') ? 'Meta Pilot (Campaign Automation)' :
                             tool.categories.includes('Creative') || tool.categories.includes('Web') || tool.categories.includes('Editing') ? 'Archy (Creative Marketing)' :
                             tool.categories.includes('Market Intelligence') ? 'Market Intelligence' :
                             tool.categories.includes('CRM') || tool.categories.includes('Sales Tools') ? 'Listing & CRM Tools' : 'Core Platform',
            creationFields: [], // This will be populated below based on ID
            details: toolDetails,
        };
    });
};


export const tools: Feature[] = mergeToolData().map(tool => {
    switch (tool.id) {
         case 'insta-ads-designer':
            tool.creationFields = [
                { id: 'projectId', name: 'Project', type: 'select', placeholder: 'Select a project from your library', options: ['Emaar Beachfront', 'Damac Hills 2', 'Sobha Hartland', 'Add New Project...'], description: "Select a project you've saved to your library to use its assets." },
                { id: 'brochureDataUri', name: 'OR Upload Brochure', type: 'file', description: "If the project isn't in your library, upload its brochure (PDF)." },
                { id: 'focusArea', name: 'Ad Focus', type: 'text', placeholder: 'e.g., Luxury amenities, investment potential', description: 'What is the main selling point for this ad?' },
                { id: 'toneOfVoice', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Friendly', 'Urgent', 'Luxury'], description: 'The desired tone for the ad copy.' },
            ];
            tool.renderResult = (result, toast) => (
                <div className="space-y-4">
                    <h3 className="font-semibold">Ad Copy:</h3>
                    <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">{result.adCopy}</pre>
                    <Button onClick={() => copyToClipboard(result.adCopy, toast)}><Copy className="mr-2"/> Copy Text</Button>
                     <h3 className="font-semibold">Generated Brochure:</h3>
                    <iframe src={result.adDesign} className="w-full h-96 rounded-md border" />
                     <h3 className="font-semibold">Generated Landing Page:</h3>
                     <iframe src={result.landingPage} className="w-full h-96 rounded-md border" />
                </div>
            );
            break;
        case 'audience-creator':
             tool.creationFields = [
                { id: 'projectId', name: 'Project', type: 'select', options: ['Emaar Beachfront', 'Damac Hills 2', 'Sobha Hartland'], placeholder: 'Select a project to generate an audience for', description: 'The AI will analyze the project to find the ideal buyer.' },
            ];
            tool.renderResult = (result, toast) => (
                <div className="space-y-4">
                    {result.strategies.map((strategy: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg bg-muted/50">
                            <h3 className="font-bold text-lg text-primary">{strategy.strategyName}</h3>
                            <p className="text-sm text-muted-foreground mb-2">Meta Audience Type: <span className="font-semibold">{strategy.audienceType}</span></p>
                            <p><strong>Demographics:</strong> {strategy.demographics}</p>
                            <p><strong>Interests (for Meta):</strong> {strategy.interests}</p>
                            <p><strong>Keywords (for Google):</strong> {strategy.keywords}</p>
                        </div>
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
                    <iframe src={result.rebrandedBrochureDataUri} className="w-full h-96 rounded-md border" />
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
        // Other cases would follow...
        default:
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
