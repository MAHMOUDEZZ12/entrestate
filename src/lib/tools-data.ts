
import {
    Bot, BrainCircuit, CheckCircle, Plus, Sparkles, Upload, Megaphone, User,
    ShieldQuestion, Search, MessageCircle, PenTool, Clock2, Wallet, BadgeCheck,
    ClipboardList, Target, LineChart, Users2, Network, LayoutTemplate, Video,
    Instagram, FileText, Globe, FileSearch, KeyRound, BarChart3, Newspaper,
    Handshake, Filter, ListChecks, Container, BotMessageSquare, Terminal,
    FileCheck, Palette, Map, LandPlot, Building, Camera, Calculator, Album, Wand2, Database, BarChart, FileJson, Image as ImageIcon, Youtube, Edit, CreditCard, Library
} from 'lucide-react';
import type { ReactElement } from 'react';
import type { FilterCategory, BadgeType } from './tools-client';

// This file is build-safe and can be imported in server-side files like sitemap.ts.
// It does NOT contain any 'use client' directives or browser-specific APIs.

export interface ToolData {
    id: string;
    title: string;
    dashboardTitle?: string;
    description: string;
    iconName: string; // Changed from React.ReactElement to string
    color: string;
    categories: FilterCategory[];
    badge?: BadgeType;
    cta: string;
}

export const tools: ToolData[] = [
    // Meta Ads Pilot
    { id: 'meta-auto-pilot', title: 'Meta Auto Pilot', dashboardTitle: 'Meta Auto Pilot', description: 'Single-click manager for your entire Meta suite.', iconName: 'Sparkles', color: '#4B0082', categories: ['Ads', 'Marketing'], badge: 'AUTO', cta: 'Launch Campaign' },
    { id: 'campaign-builder', title: 'Campaign Builder', description: 'Your dedicated agent for Facebook & Instagram advertising.', iconName: 'LayoutTemplate', color: '#4B0082', categories: ['Ads', 'Marketing'], cta: 'Build Campaign' },
    { id: 'audience-creator', title: 'Audience Creator', description: 'Find high-intent buyers before they search.', iconName: 'Users2', color: '#4B0082', categories: ['Ads', 'Lead Gen'], cta: 'Create Audience' },
    { id: 'insta-ads-designer', title: 'Insta Ads Designer', dashboardTitle: 'Insta Ads', description: 'Create perfect ads for Instagram Stories & Feed.', iconName: 'Instagram', color: '#E1306C', categories: ['Creative', 'Ads'], cta: 'Design Ad' },
    { id: 'reel-ads', title: 'Reel Ads', description: 'Generate engaging video ads for Instagram Reels.', iconName: 'Video', color: '#E1306C', categories: ['Creative', 'Ads'], cta: 'Generate Reel' },
    { id: 'instagram-admin-ai', title: 'Instagram Admin AI', dashboardTitle: 'Instagram Admin', description: 'Schedules posts and handles replies on Instagram.', iconName: 'BotMessageSquare', color: '#E1306C', categories: ['Social & Comms', 'CRM'], badge: 'AUTO', cta: 'Manage Page' },
    { id: 'story-planner', title: 'Story Planner', description: 'Plan and design animated Instagram stories.', iconName: 'Album', color: '#E1306C', categories: ['Creative', 'Social & Comms'], cta: 'Plan Story' },

    // Creative Suite
    { id: 'ai-video-presenter', title: 'AI Video Presenter', description: 'Create a lifelike AI presenter to deliver your project pitch.', iconName: 'User', color: '#8A2BE2', categories: ['Creative', 'Video'], badge: 'NEW', cta: 'Generate Presenter' },
    { id: 'ugc-script-writer', title: 'UGC Script Writer', description: 'Generate authentic, user-generated content style video ad scripts.', iconName: 'PenTool', color: '#8A2BE2', categories: ['Creative', 'Marketing'], cta: 'Write Scripts' },
    { id: 'youtube-video-editor', title: 'AI YouTube Video Editor', dashboardTitle: 'YouTube Editor', description: 'Edit any video to be YouTube-ready.', iconName: 'Youtube', color: '#FF0000', categories: ['Editing', 'Video'], cta: 'Edit Video' },
    { id: 'landing-pages', title: 'Landing Page Builder', dashboardTitle: 'Landing Pages', description: 'Launch high-converting landing pages in minutes.', iconName: 'Globe', color: '#1E90FF', categories: ['Web', 'Lead Gen'], cta: 'Generate Page' },
    { id: 'rebranding', title: 'Automated Rebranding', description: 'Apply your brand identity to any brochure with text commands.', iconName: 'Palette', color: '#1E90FF', categories: ['Editing', 'Creative'], cta: 'Rebrand Document' },
    { id: 'brochure-translator', title: 'Brochure Translator', description: 'Translate any brochure to multiple languages in seconds.', iconName: 'Languages', color: '#1E90FF', categories: ['Editing'], cta: 'Translate Brochure' },
    { id: 'pdf-editor-ai', title: 'PDF EDITOR AI', description: 'Edit PDF documents with AI-powered tools.', iconName: 'Wand2', color: '#1E90FF', categories: ['Editing', 'Creative'], cta: 'Edit with AI' },
    { id: 'images-hq-ai', title: 'Images HQ AI', description: 'Generate high-quality, royalty-free images for listings and ads.', iconName: 'ImageIcon', color: '#1E90FF', categories: ['Creative'], cta: 'Generate Image' },
    { id: 'logo-creator-ai', title: 'Logo Creator AI', description: 'Create a professional logo for your brand in seconds.', iconName: 'Sparkles', color: '#1E90FF', categories: ['Creative'], cta: 'Create Logo' },
    { id: 'aerial-view-generator', title: 'Aerial View Generator', description: 'Create cinematic, aerial video tours of any property.', iconName: 'Camera', color: '#8A2BE2', categories: ['Creative', 'Video'], cta: 'Generate Aerial View' },
    { id: 'ai-brand-creator', title: 'AI Brand Creator', description: 'Configure your brand kit by analyzing uploaded documents.', iconName: 'Wand2', color: '#DA70D6', categories: ['Creative', 'CRM'], cta: 'Create Brand' },

    // Listing Intelligence
    { id: 'listing-manager', title: 'Listing Manager', description: 'Your central hub to prepare and syndicate listings to major portals.', iconName: 'ClipboardList', color: '#FF4500', categories: ['Sales Tools'], cta: 'Manage Listings' },
    { id: 'listing-performance', title: 'Listing Performance', description: 'Track listing views and performance across all portals.', iconName: 'BarChart', color: '#FF4500', categories: ['Sales Tools', 'Market Intelligence'], cta: 'View Performance' },
    { id: 'listing-generator', title: 'Listing Generator', description: 'Craft perfect listings for portals like Property Finder & Bayut.', iconName: 'FileText', color: '#FF4500', categories: ['Sales Tools'], cta: 'Generate Listing' },
    { id: 'propertyfinder-sync', title: 'Property Finder Pilot', dashboardTitle: 'Property Finder', description: 'Execution terminal for pushing listings to Property Finder.', iconName: 'Building', color: '#FF4500', categories: ['Developer', 'Sales Tools'], badge: 'AUTO', cta: 'Sync Listing' },
    { id: 'bayut-sync', title: 'Bayut Pilot', dashboardTitle: 'Bayut', description: 'Execution terminal for pushing listings to Bayut.', iconName: 'Building', color: '#FF4500', categories: ['Developer', 'Sales Tools'], badge: 'AUTO', cta: 'Sync Listing' },
    { id: 'deal-analyzer', title: 'Deal Analyzer', description: 'Analyze the investment potential of any real estate deal.', iconName: 'BarChart3', color: '#32CD32', categories: ['Sales Tools', 'Market Intelligence'], cta: 'Analyze Deal' },
    { id: 'commission-calculator', title: 'Commission Calculator', description: 'Instantly calculate your sales commission.', iconName: 'Calculator', color: '#32CD32', categories: ['Sales Tools'], cta: 'Calculate' },
    { id: 'payment-planner', title: 'Payment Planner', description: 'Generate tailored payment plans for off-plan properties.', iconName: 'FileCheck', color: '#32CD32', categories: ['Sales Tools'], cta: 'Create Plan' },
    { id: 'investor-matching', title: 'Investor Matching', description: 'Pair budgets with the right projects.', iconName: 'Handshake', color: '#32CD32', categories: ['Sales Tools', 'Lead Gen'], cta: 'Find Matches' },
    { id: 'multi-offer-builder', title: 'Multi-Offer Builder', description: 'Compare property options side-by-side for clients.', iconName: 'Container', color: '#32CD32', categories: ['Sales Tools'], cta: 'Build Comparison' },

    // Comms & CRM
    { id: 'whatsapp-manager', title: 'WhatsApp Manager', dashboardTitle: 'WhatsApp Campaigns', description: 'Send personalized broadcasts and drip campaigns.', iconName: 'MessageCircle', color: '#25D366', categories: ['Social & Comms'], cta: 'Manage Campaign' },
    { id: 'lead-investigator', title: 'Lead Investigator AI', dashboardTitle: 'Lead Investigator', description: 'Find social profiles and professional history for any lead.', iconName: 'FileSearch', color: '#FFA500', categories: ['CRM', 'Lead Gen'], cta: 'Investigate Lead' },

    // Market Intelligence
    { id: 'projects-finder', title: 'Market Library', description: 'Search our intelligent library for verified projects.', iconName: 'Database', color: '#00CED1', categories: ['Market Intelligence', 'Market Library'], cta: 'Search Library' },
    { id: 'market-reports', title: 'Market Reports', description: 'Generate PDF reports on market trends, pricing, and sentiment.', iconName: 'Newspaper', color: '#00CED1', categories: ['Market Intelligence'], cta: 'Generate Report' },
    { id: 'market-trends', title: 'Market Trends Watcher', dashboardTitle: 'Market Trends', description: 'Identify emerging market trends before they become mainstream.', iconName: 'LineChart', color: '#00CED1', categories: ['Market Intelligence'], cta: 'View Trends' },

    // Core / Foundational
    { id: 'crm-assistant', title: 'CRM Memory Assistant', description: 'The core data store that remembers every client interaction.', iconName: 'BrainCircuit', color: '#DA70D6', categories: ['CRM'], cta: 'Query Memory' },
    { id: 'ai-assistant', title: 'AI Assistant', description: 'Your personal, trainable AI partner.', iconName: 'Bot', color: '#DA70D6', categories: ['CRM'], cta: 'Chat Now' },
    
    // Developer & Utility
    { id: 'lease-reviewer', title: 'Lease Reviewer', description: 'Upload a lease agreement and let the AI analyze it for risks and non-standard clauses.', iconName: 'FileSearch', color: '#6a788c', categories: ['Sales Tools', 'Developer'], badge: 'NEW', cta: 'Review Lease' },
    { id: 'chatbot-creator', title: 'Embeddable Site Assistant', description: 'Add a market-aware AI chatbot to any website.', iconName: 'Bot', color: '#6a788c', categories: ['Web', 'Lead Gen'], badge: 'NEW', cta: 'Create Chatbot' },
    { id: 'prompt-library', title: 'Prompt Library', description: 'A collection of sample prompts to get you started.', iconName: 'Library', color: '#6a788c', categories: ['Developer'], cta: 'Browse Library' },
    { id: 'data-importer', title: 'Data Importer', description: 'Import data from external sources like XML files.', iconName: 'Upload', color: '#6a788c', categories: ['Developer'], cta: 'Import Data' },
    { id: 'paypal-transaction', title: 'PayPal Transaction', description: 'A developer tool to fetch transaction details from PayPal.', iconName: 'CreditCard', color: '#6a788c', categories: ['Developer'], cta: 'Fetch Transaction' },
    { id: 'alloydb-scanner', title: 'AlloyDB Scanner', description: 'Scan for databases and analyze suitability for AlloyDB migration.', iconName: 'Database', color: '#6a788c', categories: ['Developer'], cta: 'Scan Environment' },
    
    // Deprecated
    { id: 'pdf-editor', title: 'Visual PDF Editor', description: 'A legacy tool for simple PDF edits.', iconName: 'Edit', color: '#808080', categories: ['Editing'], badge: 'DEPRECATED', cta: 'Open Editor' },
    
    // Placeholder / Coming Soon
    { id: 'vm-creator', title: 'VM Creator', description: 'A utility for developers to provision Google Cloud virtual machines.', iconName: 'Terminal', color: '#808080', categories: ['Developer'], cta: 'Provision VM' },
    { id: 'creative-execution-terminal', title: 'Creative Execution Terminal', description: 'The execution engine for complex creative tasks.', iconName: 'Terminal', color: '#808080', categories: ['Developer'], cta: 'Open Terminal' },
    { id: 'superfreetime', title: 'SuperFreeTime', description: '???', iconName: 'KeyRound', color: '#ffcc00', categories: [], cta: '???' },
];
