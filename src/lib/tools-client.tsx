
'use client';

import React, { ReactElement } from 'react';
import {
    Bot, BrainCircuit, CheckCircle, Plus, Sparkles, Upload, Megaphone, User,
    ShieldQuestion, Search, MessageCircle, PenTool, Clock2, Wallet, BadgeCheck,
    ClipboardList, Target, LineChart, Users2, Network, LayoutTemplate, Video,
    Instagram, FileText, Globe, FileSearch, KeyRound, BarChart3, Newspaper,
    Handshake, Filter, ListChecks, Container, BotMessageSquare, Terminal,
    FileCheck, Palette, Map, LandPlot, Building, Camera, Calculator, Album, Wand2, Database, BarChart, FileJson, Image as ImageIcon, Youtube, Edit, CreditCard, Library, Facebook, Wrench, Briefcase, Languages, LinkIcon, Sparkle, ArrowRight, Copy
} from 'lucide-react';
import { tools as toolsData, ToolData } from './tools-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Centralized Icon Map
const icons: { [key: string]: ReactElement } = {
    Bot: <Bot />, BrainCircuit: <BrainCircuit />, CheckCircle: <CheckCircle />, Plus: <Plus />, Sparkles: <Sparkles />,
    Upload: <Upload />, Megaphone: <Megaphone />, User: <User />, ShieldQuestion: <ShieldQuestion />, Search: <Search />,
    MessageCircle: <MessageCircle />, PenTool: <PenTool />, Clock2: <Clock2 />, Wallet: <Wallet />, BadgeCheck: <BadgeCheck />,
    ClipboardList: <ClipboardList />, Target: <Target />, LineChart: <LineChart />, Users2: <Users2 />, Network: <Network />,
    LayoutTemplate: <LayoutTemplate />, Video: <Video />, Instagram: <Instagram />, FileText: <FileText />, Globe: <Globe />,
    FileSearch: <FileSearch />, KeyRound: <KeyRound />, BarChart3: <BarChart3 />, Newspaper: <Newspaper />,
    Handshake: <Handshake />, Filter: <Filter />, ListChecks: <ListChecks />, Container: <Container />,
    BotMessageSquare: <BotMessageSquare />, Terminal: <Terminal />, FileCheck: <FileCheck />, Palette: <Palette />,
    Map: <Map />, LandPlot: <LandPlot />, Building: <Building />, Camera: <Camera />, Calculator: <Calculator />,
    Album: <Album />, Wand2: <Wand2 />, Database: <Database />, BarChart: <BarChart />, FileJson: <FileJson />,
    ImageIcon: <ImageIcon />, Youtube: <Youtube />, Edit: <Edit />, CreditCard: <CreditCard />, Library: <Library />,
    Facebook: <Facebook />, Languages: <Languages />, LinkIcon: <LinkIcon />, Briefcase: <Briefcase />, Wrench: <Wrench />, Sparkle: <Sparkle />
};

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
    href: string;
    guideHref: string;
    icon: React.ReactElement;
    creationFields?: Field[]; // Added to resolve the type error
}

// Function to process raw data and add client-side properties
const processToolsData = (data: ToolData[]): Feature[] => {
    return data.map(tool => ({
        ...tool,
        icon: icons[tool.iconName] || <Sparkles />,
        href: `/me/tool/${tool.id}`,
        guideHref: `/blog/${tool.id}`,
    }));
};

export const tools: Feature[] = processToolsData(toolsData);


const copyToClipboard = (text: string, toast: any) => {
    navigator.clipboard.writeText(text);
    toast({
        title: "Copied to clipboard!",
        description: "The HTML code has been copied successfully.",
    });
};

const LandingPageResult = ({ result, toast }: { result: any, toast: any }) => {
      const [liveHtml, setLiveHtml] = React.useState<string | null>(result.landingPageHtml);

      const handleStrategyChange = (headline: string, cta: string) => {
        if (!liveHtml) return;
        const doc = new DOMParser().parseFromString(liveHtml, 'text/html');
        const heroHeadline = doc.querySelector('h1');
        const heroCta = doc.querySelector('a.cta-button'); // Assuming a CTA button has this class

        if (heroHeadline) {
          heroHeadline.textContent = headline;
        }
        if (heroCta) {
          heroCta.textContent = cta;
        }
        setLiveHtml(doc.documentElement.outerHTML);
      };

      if (!liveHtml) return null;

      return (
        <div className="space-y-4">
          <Alert>
            <Wand2 className="h-4 w-4" />
            <AlertTitle>Strategies & Live Preview</AlertTitle>
            <AlertDescription>
              Select a strategy to see it update on the live preview below.
            </AlertDescription>
          </Alert>

          <RadioGroup
            onValueChange={(value) => {
              const [headline, cta] = value.split('||');
              handleStrategyChange(headline, cta);
            }}
            defaultValue={`${result.headlineOptions[0].headline}||${result.headlineOptions[0].cta}`}
          >
            {result.headlineOptions.map((strategy: any) => (
              <Label
                key={strategy.id}
                htmlFor={strategy.id}
                className="block cursor-pointer rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/10"
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem
                    value={`${strategy.headline}||${strategy.cta}`}
                    id={strategy.id}
                  />
                  <div>
                    <p className="font-bold">
                      {strategy.strategy}:{' '}
                      <span className="font-normal">"{strategy.headline}"</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      CTA: "{strategy.cta}"
                    </p>
                  </div>
                </div>
              </Label>
            ))}
          </RadioGroup>

          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                srcDoc={liveHtml}
                title="Landing Page Preview"
                className="h-[600px] w-full rounded-md border"
              />
            </CardContent>
             <CardFooter>
                 <Button onClick={() => copyToClipboard(liveHtml, toast)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy HTML
                 </Button>
            </CardFooter>
          </Card>
        </div>
      );
  }


// This object holds the UI-specific configurations (forms, result renderers)
// It is NOT exported, but used by the functions below.
const toolUiConfig: { [key: string]: { creationFields: Field[]; renderResult?: (result: any, toast: any) => React.ReactNode; } } = {
    'insta-ads-designer': {
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
    },
    'landing-pages': {
        creationFields: [
            { id: 'projectName', name: 'Project Name', type: 'text', value: 'Emaar Beachfront', placeholder: 'e.g., Emaar Beachfront', description: 'The name of the project for the page.' },
            { id: 'projectDetails', name: 'Project Details / Offer', type: 'textarea', value: 'Luxury 2-bedroom apartments with a private beach and stunning marina views. Limited-time offer: 5% down payment.', placeholder: 'e.g., Luxury 2-bedroom apartments...', description: 'Key selling points and offers.' },
            { id: 'brandingStyle', name: 'Branding Style', type: 'select', options: ['Modern & Minimalist', 'Luxury & Elegant', 'Bold & Vibrant'], description: 'The visual style for the landing page.' },
            { id: 'numberOfSections', name: 'Number of Sections', type: 'number', value: '4', placeholder: 'e.g., 4', description: 'The number of content sections (2-5).' },
        ],
        renderResult: (result, toast) => <LandingPageResult result={result} toast={toast} />
    },
    'rebranding': {
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
                    <iframe src={result.rebrandedBrochureDataUri} className="w-full h-96 rounded-md border" title="Rebranded Brochure" />
                </CardContent>
            </Card>
        ),
    },
    'pdf-editor-ai': {
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
    },
    'investor-matching': {
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
    },
    'ai-brand-creator': {
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
    },
    'market-trends': {
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
                    </Card>
                </div>
            );
        }
    },
    'ugc-script-writer': {
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
                                <p className="text-xs font-bold uppercase text-muted-foreground">Hook</p>
                                <p className="font-semibold">"{script.hook}"</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase text-muted-foreground">Body</p>
                                <p className="text-sm">{script.body}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase text-muted-foreground">CTA</p>
                                <p className="font-semibold text-primary">{script.callToAction}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    },
    'lead-investigator': {
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
    },
    'sales-message-rewriter': {
        creationFields: [
            { id: 'originalMessage', name: 'Original Message', type: 'textarea', placeholder: 'e.g., Hi, are you still interested in the villa? Let me know.' },
            { id: 'tone', name: 'Desired Tone / Strategy', type: 'select', options: ['More Professional', 'More Friendly & Casual', 'Create Urgency', 'More Persuasive', 'Shorten & Simplify'] },
        ],
        renderResult: (result, toast) => (
             <div className="space-y-4">
                {result.rewrittenMessages.map((item: any, index: number) => (
                    <Card key={index}>
                        <CardHeader>
                           <CardTitle className="text-base">Variation {index + 1}: <span className="text-primary">{item.strategy}</span></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm p-4 bg-muted rounded-md">{item.message}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    },
    'deals-smart-planner': {
        creationFields: [
             { id: 'goal', name: 'Goal', type: 'text', placeholder: 'e.g., "Plan a deal", "Follow up on a lead"' },
             { id: 'userContext', name: 'Current Context (Optional)', type: 'textarea', placeholder: 'e.g., "The lead John Doe has gone cold for 2 weeks."' },
             { id: 'userStrengths', name: 'Your Strengths (Optional)', type: 'text', placeholder: 'e.g., "Strong on TikTok, speaks Chinese"', description: 'Comma-separated list of your skills or assets.' },
        ],
        renderResult: (result: any, toast: any) => (
            <Card>
                <CardHeader>
                    <CardTitle>Next Step: {result.nextStep.title}</CardTitle>
                    <CardDescription>{result.nextStep.description}</CardDescription>
                </CardHeader>
                {result.nextStep.actionable_item && (
                    <CardContent>
                        <Alert>
                            <Wand2 className="h-4 w-4" />
                            <AlertTitle>Actionable Item</AlertTitle>
                            <AlertDescription className="whitespace-pre-wrap font-mono text-xs p-2 bg-muted rounded-md">
                                {result.nextStep.actionable_item}
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                )}
                {result.nextStep.tool_id && (
                    <CardFooter>
                         <a href={`/me/tool/${result.nextStep.tool_id}`}>
                            <Button variant="outline"><Sparkles className="mr-2 h-4 w-4" /> Go to {result.nextStep.tool_id.replace(/-/g, ' ')}</Button>
                        </a>
                    </CardFooter>
                )}
            </Card>
        )
    }
};

// Getter functions to be used in the UI
export const getToolCreationFields = (toolId: string): Field[] => {
    return toolUiConfig[toolId]?.creationFields || [
        { id: `${toolId}-input`, name: 'Primary Input', type: 'textarea', placeholder: 'Enter the main content or prompt here...' },
    ];
};

export const getToolResultRenderer = (toolId: string): ((result: any, toast: any) => React.ReactNode) => {
    return toolUiConfig[toolId]?.renderResult || ((result, toast) => (
        <pre className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap max-h-[70vh] overflow-auto">{JSON.stringify(result, null, 2)}</pre>
    ));
};
