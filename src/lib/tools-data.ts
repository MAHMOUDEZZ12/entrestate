
import {
    Bot, BrainCircuit, CheckCircle, Plus, Sparkles, Upload, Megaphone, User,
    ShieldQuestion, Search, MessageCircle, PenTool, Clock2, Wallet, BadgeCheck,
    ClipboardList, Target, LineChart, Users2, Network, LayoutTemplate, Video,
    Instagram, FileText, Globe, FileSearch, KeyRound, BarChart3, Newspaper,
    Handshake, Filter, ListChecks, Container, BotMessageSquare, Terminal,
    FileCheck, Palette, Map, LandPlot, Building, Camera, Calculator, Album, Wand2, Database, BarChart, FileJson, Image as ImageIcon, Youtube, Edit, CreditCard
} from 'lucide-react';
import type { FilterCategory, BadgeType } from './tools-client';

// This file is build-safe and can be imported in server-side files like sitemap.ts.
// It does NOT contain any 'use client' directives or browser-specific APIs.

export interface ToolData {
    id: string;
    title: string;
    dashboardTitle?: string;
    description: string;
    icon: React.ReactElement;
    color: string;
    categories: FilterCategory[];
    badge?: BadgeType;
    cta: string;
}

const Languages = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-languages"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>;

export const tools: ToolData[] = [
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
    { id: 'pdf-editor', title: 'Visual PDF Editor (Deprecated)', dashboardTitle: 'PDF Editor', description: 'A legacy tool for simple PDF edits.', icon: <Edit />, color: '#696969', categories: ['Editing'], badge: 'DEPRECATED', cta: 'Edit PDF' },
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
    { id: 'deal-analyzer', title: 'Deal Analyzer', description: 'Analyze the investment potential of any real estate deal.', icon: <BarChart3 />, color: '#32CD32', categories: ['Sales Tools', 'Market Intelligence'], cta: 'Analyze Deal' },
    { id: 'commission-calculator', title: 'Commission Calculator', description: 'Instantly calculate your sales commission.', icon: <Calculator />, color: '#32CD32', categories: ['Sales Tools'], cta: 'Calculate' },
    { id: 'payment-planner', title: 'Payment Planner', description: 'Generate tailored payment plans for off-plan properties.', icon: <FileCheck />, color: '#32CD32', categories: ['Sales Tools'], cta: 'Create Plan' },
    { id: 'investor-matching', title: 'Investor Matching', description: 'Pair budgets with the right projects.', icon: <Handshake />, color: '#32CD32', categories: ['Sales Tools', 'Lead Gen'], cta: 'Find Matches' },
    { id: 'multi-offer-builder', title: 'Multi-Offer Builder', description: 'Compare property options side-by-side for clients.', icon: <Container />, color: '#32CD32', categories: ['Sales Tools'], cta: 'Build Comparison' },

    // Comms & CRM
    { id: 'whatsapp-manager', title: 'WhatsApp Manager', dashboardTitle: 'WhatsApp Campaigns', description: 'Send personalized broadcasts and drip campaigns.', icon: <MessageCircle />, color: '#25D366', categories: ['Social & Comms'], cta: 'Manage Campaign' },
    { id: 'lead-investigator', title: 'Lead Investigator AI', dashboardTitle: 'Lead Investigator', description: 'Find social profiles and professional history for any lead.', icon: <FileSearch />, color: '#FFA500', categories: ['CRM', 'Lead Gen'], cta: 'Investigate Lead' },

    // Market Intelligence
    { id: 'projects-finder', title: 'Market Library', description: 'Search our intelligent library for verified projects.', icon: <Database />, color: '#00CED1', categories: ['Market Intelligence', 'Market Library'], cta: 'Search Library' },
    { id: 'market-reports', title: 'Market Reports', description: 'Generate PDF reports on market trends, pricing, and sentiment.', icon: <Newspaper />, color: '#00CED1', categories: ['Market Intelligence'], cta: 'Generate Report' },
    { id: 'market-trends', title: 'Market Trends Watcher', dashboardTitle: 'Market Trends', description: 'Identify emerging market trends before they become mainstream.', icon: <LineChart />, color: '#00CED1', categories: ['Market Intelligence'], cta: 'Analyze Trends' },
    { id: 'keyword-planner', title: 'Keyword Planner', description: 'Generate strategic keyword plans for Google Ads.', icon: <KeyRound />, color: '#4B0082', categories: ['Ads', 'Marketing'], cta: 'Generate Plan' },

    // Core / Platform
    { id: 'ai-brand-creator', title: 'AI Brand Creator', dashboardTitle: 'Brand Creator', description: 'Configure your brand kit by analyzing uploaded documents.', icon: <Wand2 />, color: '#6A0DAD', categories: ['CRM'], cta: 'Create Brand' },
    { id: 'crm-assistant', title: 'CRM Memory Assistant', dashboardTitle: 'CRM Memory', description: 'The core data store that remembers every client interaction.', icon: <BrainCircuit />, color: '#6A0DAD', categories: ['CRM'], cta: 'Query Memory' },
    { id: 'ai-assistant', title: 'AI Assistant', description: 'Your personal, trainable AI partner.', icon: <Bot />, color: '#6A0DAD', categories: ['CRM'], cta: 'Chat with Assistant' },
    
    // Enterprise / Secret Tools
    { id: 'lease-reviewer', title: 'Lease Reviewer', description: 'Upload a lease agreement and let the AI analyze it for risks and non-standard clauses.', icon: <FileSearch />, color: '#4682B4', categories: ['Sales Tools', 'Developer'], badge: 'NEW', cta: 'Review Lease' },
    { id: 'chatbot-creator', title: 'Embeddable Site Assistant', dashboardTitle: 'Site Assistant', description: 'Add a market-aware AI chatbot to any website.', icon: <BotMessageSquare />, color: '#6A0DAD', categories: ['Web', 'Lead Gen'], badge: 'NEW', cta: 'Create Bot' },
    { id: 'data-importer', title: 'Data Importer', description: 'Manage your search context by importing and exporting XML data.', icon: <Upload />, color: '#708090', categories: ['Developer'], badge: 'NEW', cta: 'Import Data' },
    
    // Developer Tools
    { id: 'vm-creator', title: 'VM Creator', description: 'A utility for developers to provision Google Cloud virtual machines.', icon: <Terminal />, color: '#333333', categories: ['Developer'], cta: 'Create VM' },
    { id: 'creative-execution-terminal', title: 'Creative Execution Terminal', dashboardTitle: 'Execution Terminal', description: 'The execution engine for complex creative tasks.', icon: <Terminal />, color: '#333333', categories: ['Developer'], cta: 'Run Job' },
    { id: 'superfreetime', title: 'Super Free Time', description: 'A secret tool for some fun.', icon: <KeyRound />, color: '#FFD700', categories: [], cta: 'Play' },
    { id: 'paypal-transaction', title: 'PayPal Transaction', description: 'A developer tool to fetch details for a PayPal transaction.', icon: <CreditCard />, color: '#003087', categories: ['Developer'], cta: 'Fetch Transaction' },
];

    
