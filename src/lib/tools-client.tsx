
'use client';

import {
    Bot, BrainCircuit, CheckCircle, Plus, Sparkles, Upload, Megaphone, User,
    ShieldQuestion, Search, MessageCircle, PenTool, Clock2, Wallet, BadgeCheck,
    ClipboardList, Target, LineChart, Users2, Network, LayoutTemplate, Video,
    Instagram, FileText, Globe, FileSearch, KeyRound, BarChart3, Newspaper,
    Handshake, Filter, ListChecks, Container, BotMessageSquare, Terminal,
    FileCheck, Palette, Map, LandPlot, Building, Camera, Calculator, Album, Wand2, Database, BarChart, FileJson, Image as ImageIcon, Youtube, Edit, CreditCard, Library, Facebook, Wrench, Briefcase, Languages, Link as LinkIcon, Sparkle
} from 'lucide-react';
import type { ReactElement } from 'react';
import { tools as toolsData, ToolData } from './tools-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { Copy } from 'lucide-react';

export type FilterCategory = 'All' | 'Marketing' | 'Lead Gen' | 'Creative' | 'Sales Tools' | 'Social & Comms' | 'Web' | 'Editing' | 'Ads' | 'Market Intelligence' | 'CRM' | 'Developer' | 'Market Library';
export type BadgeType = 'NEW' | 'AUTO' | 'DEPRECATED';

export interface Field {
    id: string;
    name: string;
    type: 'text' | 'textarea' | 'select' | 'number' | 'file' | 'button' | 'group-header';
    value?: string;
    placeholder?: string;
    description?: string;
    options?: string[];
    multiple?: boolean;
    hidden?: boolean;
}

export interface Feature extends ToolData {
    longDescription: string;
    href: string;
    guideHref: string;
    icon: React.ReactElement;
    creationFields: Field[];
    renderResult?: (result: any, toast: any) => React.ReactNode;
    details: {
        faqs: { question: string; answer: string }[];
        use_cases: string[];
        aiVsManual: { metric: string; manual: string; ai: string; icon: React.ReactElement }[];
        synergy: { tool: string; benefit: string }[];
    };
}

const icons: { [key: string]: ReactElement } = {
    Bot: <Bot />,
    BrainCircuit: <BrainCircuit />,
    CheckCircle: <CheckCircle />,
    Plus: <Plus />,
    Sparkles: <Sparkles />,
    Upload: <Upload />,
    Megaphone: <Megaphone />,
    User: <User />,
    ShieldQuestion: <ShieldQuestion />,
    Search: <Search />,
    MessageCircle: <MessageCircle />,
    PenTool: <PenTool />,
    Clock2: <Clock2 />,
    Wallet: <Wallet />,
    BadgeCheck: <BadgeCheck />,
    ClipboardList: <ClipboardList />,
    Target: <Target />,
    LineChart: <LineChart />,
    Users2: <Users2 />,
    Network: <Network />,
    LayoutTemplate: <LayoutTemplate />,
    Video: <Video />,
    Instagram: <Instagram />,
    FileText: <FileText />,
    Globe: <Globe />,
    FileSearch: <FileSearch />,
    KeyRound: <KeyRound />,
    BarChart3: <BarChart3 />,
    Newspaper: <Newspaper />,
    Handshake: <Handshake />,
    Filter: <Filter />,
    ListChecks: <ListChecks />,
    Container: <Container />,
    BotMessageSquare: <BotMessageSquare />,
    Terminal: <Terminal />,
    FileCheck: <FileCheck />,
    Palette: <Palette />,
    Map: <Map />,
    LandPlot: <LandPlot />,
    Building: <Building />,
    Camera: <Camera />,
    Calculator: <Calculator />,
    Album: <Album />,
    Wand2: <Wand2 />,
    Database: <Database />,
    BarChart: <BarChart />,
    FileJson: <FileJson />,
    ImageIcon: <ImageIcon />,
    Youtube: <Youtube />,
    Edit: <Edit />,
    CreditCard: <CreditCard />,
    Library: <Library />,
    Facebook: <Facebook />,
    Languages: <Languages />,
    LinkIcon: <LinkIcon />,
    Briefcase: <Briefcase />,
    Wrench: <Wrench />,
    Sparkle: <Sparkle />,
};

const copyToClipboard = (text: string, toast: (options: any) => void) => {
    navigator.clipboard.writeText(text);
    toast({
        title: 'Copied to clipboard!',
    });
};

export const allTools: Feature[] = toolsData.map(tool => ({
    ...tool,
    icon: icons[tool.iconName] || <Sparkles />,
    href: `/me/tool/${tool.id}`,
    guideHref: `/blog/${tool.id}`,
    longDescription: 'A longer, more detailed description of what this amazing tool can do for the user.',
    details: {
        faqs: [
            { question: 'Is this tool included in all plans?', answer: 'Yes, this is a core tool available to all users.' },
            { question: 'How does the AI work?', answer: 'It uses a fine-tuned version of Google\'s Gemini model to provide the best results.' },
            { question: 'Can I export the results?', answer: 'Yes, results can be exported in various formats like PDF or CSV where applicable.' },
        ],
        use_cases: [
            'Automating daily marketing tasks.',
            'Generating high-quality content in seconds.',
            'Analyzing market data for better insights.',
        ],
        aiVsManual: [
            { metric: 'Time Taken', manual: '3-4 hours', ai: '5 minutes', icon: <Clock2 /> },
            { metric: 'Cost', manual: '$200 (Outsourcing)', ai: '$2 (API Credits)', icon: <Wallet /> },
            { metric: 'Quality Score', manual: '75/100', ai: '92/100', icon: <BadgeCheck /> }
        ],
        synergy: [
            { tool: 'CRM Memory', benefit: 'Personalize the output using your client data.'},
            { tool: 'Market Library', benefit: 'Base the generation on real-time market data.'},
            { tool: 'Brand Creator', benefit: 'Ensure all generated content matches your brand identity.'},
        ]
    },
    creationFields: [
        { id: `${tool.id}-input`, name: 'Primary Input', type: 'textarea', placeholder: 'Enter the main content or prompt here...' },
    ],
    renderResult: (result, toast) => (
        <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap max-h-[70vh] overflow-auto">{JSON.stringify(result, null, 2)}</pre>
    ),
}));

// Placeholder for individual tool configurations - find and modify tool by ID
const configureTool = (id: string, config: Partial<Feature>) => {
    const index = allTools.findIndex(t => t.id === id);
    if (index !== -1) {
        allTools[index] = { ...allTools[index], ...config };
    }
}

// ===================================================================================
// TOOL CONFIGURATIONS
// ===================================================================================

configureTool('insta-ads-designer', {
    creationFields: [
        { id: 'brochureDataUri', name: 'Project Brochure (Optional)', type: 'file', description: 'Upload a project brochure (PDF) for the AI to analyze.' },
        { id: 'projectName', name: 'Project Name', type: 'text', value: 'Emaar Beachfront', placeholder: 'e.g., Emaar Beachfront', description: 'Used if no brochure is provided.' },
        { id: 'focusArea', name: 'Focus Area', type: 'text', value: 'Luxury amenities', placeholder: 'e.g., Luxury amenities, investment potential', description: 'The specific aspect of the project to highlight.' },
        { id: 'toneOfVoice', name: 'Tone of Voice', type: 'select', options: ['Professional', 'Friendly', 'Urgent', 'Luxury'], description: 'The desired tone for the ad copy.' }
    ],
    renderResult: (result, toast) => (
        <Card>
            <CardHeader>
                <CardTitle>Generated Ad Creative</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-semibold">Ad Copy:</p>
                <p className="p-3 bg-muted rounded-md mb-4">{result.adCopy}</p>
                <p className="font-semibold">Ad Design Preview:</p>
                <img src={result.adDesign} alt="Generated ad design" className="w-full h-auto rounded-md border" />
            </CardContent>
        </Card>
    ),
});

configureTool('rebranding', {
    creationFields: [
        { id: 'brochureDataUri', name: 'Source Brochure', type: 'file', description: 'Upload the brochure (PDF) you want to rebrand.' },
        { id: 'contactDetails', name: 'Your Contact Details', type: 'text', placeholder: 'e.g., John Doe, +971...', description: 'Will be added to the brochure.' },
        { id: 'companyName', name: 'Your Company Name', type: 'text', placeholder: 'e.g., Luxe Realty', description: 'Your company name for branding.' },
        { id: 'companyLogoDataUri', name: 'Your Logo (Optional)', type: 'file', description: 'Upload your logo. If not provided, a new one will be generated.' },
        { id: 'toneOfVoice', name: 'Desired Tone', type: 'select', options: ['Professional', 'Friendly', 'Luxury'], description: 'The tone for any updated text.' },
        { id: 'colors', name: 'Desired Colors', type: 'text', placeholder: 'e.g., "Blue and Silver"', description: 'The color scheme for the new brand.' },
        { id: 'deepEditInstructions', name: 'Specific Instructions (Optional)', type: 'textarea', placeholder: 'e.g., "Replace the cover image with a picture of a modern villa."', description: 'Fine-tune the rebranding process.' },
    ],
    renderResult: (result, toast) => (
        <Card>
            <CardHeader>
                <CardTitle>Rebranding Complete</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">The brochure has been rebranded. You can preview the generated assets below.</p>
                {result.logoDataUri && (
                    <>
                        <p className="font-semibold">Generated Logo:</p>
                        <div className="p-4 bg-muted rounded-md flex justify-center mb-4">
                            <img src={result.logoDataUri} alt="Generated Logo" className="h-24 w-auto" />
                        </div>
                    </>
                )}
                <p className="font-semibold">Rebranded Brochure:</p>
                <iframe src={result.rebrandedBrochureDataUri} className="w-full h-96 rounded-md border" />
            </CardContent>
        </Card>
    ),
});

configureTool('pdf-editor-ai', {
     creationFields: [
        { id: 'sourcePdf', name: 'Source PDF', type: 'file', description: 'Upload the PDF document you want to edit.' },
        { id: 'editInstructions', name: 'Editing Instructions', type: 'textarea', placeholder: 'e.g., "Change the price on page 2 to AED 2.5M. Replace the logo with the new one."', description: 'Describe the edits you want to make.' },
        { id: 'newImages', name: 'New Images (Optional)', type: 'file', multiple: true, description: 'Upload any new images referenced in your instructions.' },
    ],
    renderResult: (result, toast) => (
        <Card>
            <CardHeader>
                <CardTitle>AI Editing Plan</CardTitle>
                <CardDescription>The AI has created an execution plan. This can be sent to a developer or an automated execution terminal.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert>
                    <AlertTitle>Execution Plan Summary</AlertTitle>
                    <AlertDescription>{result.summary}</AlertDescription>
                </Alert>
                <div className="mt-4">
                    <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap max-h-[50vh] overflow-auto">{JSON.stringify(result.executionPlan, null, 2)}</pre>
                </div>
            </CardContent>
        </Card>
    ),
});

configureTool('investor-matching', {
    creationFields: [
        { id: 'group-prop', name: 'Investment Property Details', type: 'group-header' },
        { id: 'propertyType', name: 'Property Type', type: 'text', value: 'Duplex', placeholder: 'e.g., Duplex, Commercial' },
        { id: 'location', name: 'Location', type: 'text', value: 'Dubai Marina', placeholder: 'e.g., Dubai Marina' },
        { id: 'price', name: 'Asking Price (USD)', type: 'number', value: '2500000', placeholder: 'e.g., 2500000' },
        { id: 'capRate', name: 'Capitalization Rate (%)', type: 'number', value: '6.5', placeholder: 'e.g., 6.5' },
        { id: 'investmentThesis', name: 'Investment Thesis', type: 'select', options: ['Value-Add', 'Turnkey Rental', 'Long-Term Growth'] },
        { id: 'keyFeatures', name: 'Key Features', type: 'textarea', value: 'Sea view, newly renovated, high rental demand', placeholder: 'e.g., Sea view, newly renovated...' },
        { id: 'group-db', name: 'Client Database', type: 'group-header' },
        { id: 'clientDatabase', name: 'Client List (CSV)', type: 'file', description: 'Upload a CSV with client name, email, budget, and preferences.' },
    ],
    renderResult: (result, toast) => (
         <Card>
            <CardHeader>
                <CardTitle>Top Investor Matches</CardTitle>
                <CardDescription>Based on the property details and your client list, here are the best potential investors.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Investor</TableHead>
                            <TableHead>Match Score</TableHead>
                            <TableHead>Reasoning</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.matches.map((match: any) => (
                            <TableRow key={match.email}>
                                <TableCell>
                                    <div className="font-medium">{match.name}</div>
                                    <div className="text-xs text-muted-foreground">{match.email}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge>{match.matchScore}/100</Badge>
                                </TableCell>
                                <TableCell>{match.reasoning}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    ),
});

configureTool('ai-brand-creator', {
    creationFields: [
        { id: 'command', name: 'Command', type: 'text', value: 'Set up my brand and projects from the uploaded files.', placeholder: 'e.g., Set up my brand from these documents.' },
        { id: 'documents', name: 'Brand Documents', type: 'file', multiple: true, description: 'Upload your company profile, brand guide, project lists, etc.' },
    ],
    renderResult: (result, toast) => (
        <Card>
            <CardHeader>
                <CardTitle>Workspace Configuration Complete</CardTitle>
                <CardDescription>{result.summary}</CardDescription>
            </CardHeader>
            <CardContent>
                {result.brandInfo && (
                    <div className="mb-4">
                        <h4 className="font-semibold">Extracted Brand Info</h4>
                        <pre className="p-2 bg-muted rounded-md text-xs">{JSON.stringify(result.brandInfo, null, 2)}</pre>
                    </div>
                )}
                 {result.projects && result.projects.length > 0 && (
                    <div>
                        <h4 className="font-semibold">Extracted Projects</h4>
                        <pre className="p-2 bg-muted rounded-md text-xs">{JSON.stringify(result.projects, null, 2)}</pre>
                    </div>
                )}
            </CardContent>
        </Card>
    ),
});

configureTool('market-trends', {
     creationFields: [
        { id: 'topic', name: 'Topic', type: 'text', value: 'Dubai rental yields for 1BR apartments', placeholder: 'e.g., Dubai rental yields' },
    ],
     renderResult: (result, toast) => {
        const { BarChart, Bar, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ComposedChart } = require('recharts');

        return (
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Market Analysis & Forecast</CardTitle>
                        <CardDescription>
                            <span className="font-semibold">Overall Sentiment:</span> {result.overallSentiment}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <h4 className="font-semibold mb-2">6-Month Forecast for "{result.topic}"</h4>
                        <div style={{ width: '100%', height: 300 }}>
                            <ComposedChart data={result.forecastData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="confidence" name="Confidence Interval" fill="#8884d8" stroke="#8884d8" />
                                <Bar dataKey="predictedValue" name="Predicted Value" barSize={20} fill="#413ea0" />
                            </ComposedChart>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader><CardTitle>Key Opportunities</CardTitle></CardHeader>
                     <CardContent>
                        {result.keyOpportunities.map((opp: any, i: number) => <p key={i}><strong>{opp.opportunity}:</strong> {opp.rationale}</p>)}
                     </CardContent>
                </Card>
                 <Card>
                     <CardHeader><CardTitle>Optimization Suggestions</CardTitle></CardHeader>
                     <CardContent>
                        {result.optimizationSuggestions.map((sug: any, i: number) => <p key={i}><strong>{sug.suggestion}:</strong> {sug.impact}</p>)}
                     </CardContent>
                </Card>
            </div>
        );
    }
});

configureTool('ugc-script-writer', {
    creationFields: [
        { id: 'topic', name: 'Topic', type: 'text', placeholder: 'e.g., a property, a market trend, a service' },
        { id: 'vibe', name: 'Vibe', type: 'select', options: ['Exciting & Upbeat', 'Authentic & Relatable', 'Luxurious & Exclusive'] },
        { id: 'hookStyle', name: 'Hook Style', type: 'select', options: ['Question-based', 'Problem/Solution', 'Surprising Stat'] },
    ],
    renderResult: (result, toast) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {result.scripts.map((script: any, index: number) => (
                <Card key={index}>
                    <CardHeader><CardTitle>Variation {index + 1}</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label className="text-xs font-bold uppercase text-muted-foreground">Hook</Label>
                            <p className="font-semibold">"{script.hook}"</p>
                        </div>
                         <div>
                            <Label className="text-xs font-bold uppercase text-muted-foreground">Body</Label>
                            <p className="text-sm">{script.body}</p>
                        </div>
                         <div>
                            <Label className="text-xs font-bold uppercase text-muted-foreground">CTA</Label>
                            <p className="font-semibold text-primary">{script.callToAction}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
});

configureTool('lead-investigator', {
    creationFields: [
        { id: 'name', name: 'Lead Name', type: 'text', placeholder: 'e.g., John Doe' },
        { id: 'email', name: 'Email (Optional)', type: 'text', placeholder: 'e.g., john.doe@example.com' },
        { id: 'company', name: 'Company (Optional)', type: 'text', placeholder: 'e.g., ACME Inc.' },
    ],
    renderResult: (result, toast) => (
        <div className="space-y-4">
            <Alert>
                <AlertTitle>Investigation Summary</AlertTitle>
                <AlertDescription>{result.overallSummary}</AlertDescription>
            </Alert>
            {result.matches.map((match: any, index: number) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            {match.name}
                            <Badge>{(match.matchConfidence * 100).toFixed(0)}% Match</Badge>
                        </CardTitle>
                        <CardDescription>Found on: {match.source}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{match.summary}</p>
                    </CardContent>
                    <CardFooter>
                         <a href={match.profileUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm"><LinkIcon className="mr-2 h-4 w-4" /> View Profile</Button>
                        </a>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
});

// Add more tool configurations here as needed...
// ===================================================================================

export default allTools;
