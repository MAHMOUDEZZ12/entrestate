
import type { FilterCategory, BadgeType, Suite } from '@/types';

// This file is build-safe and can be imported in server-side files like sitemap.ts.
// It does NOT contain any 'use client' directives or browser-specific APIs.

export interface ToolData {
    id: string;
    title: string;
    dashboardTitle?: string;
    description: string;
    longDescription: string; // Added for public pages
    iconName: string; // Storing icon name as a string
    color: string;
    categories: FilterCategory[];
    suite: Suite;
    badge?: BadgeType;
    cta: string;
}

export const tools: ToolData[] = [
    // Meta Marketing Suite
    { 
        id: 'meta-auto-pilot', 
        title: 'Property Marketer AI', 
        dashboardTitle: 'Property Marketer AI', 
        description: 'The master agent that orchestrates the entire marketing campaign from start to finish.', 
        longDescription: "Meta Auto Pilot is an AI-driven command center that launches, optimizes, and reports on Facebook & Instagram campaigns with a single action. It collapses Ads Manager complexity into a guided, automated workflow that manages audience splitting, budget allocation, ad rotation, and reporting in real time.",
        iconName: 'Sparkles', 
        color: '#4B0082', 
        categories: ['Ads', 'Marketing'], 
        suite: 'Meta Marketing Suite', 
        badge: 'AUTO', 
        cta: 'Launch Campaign' 
    },
    { 
        id: 'campaign-builder', 
        title: 'Campaign Creator', 
        description: 'Your dedicated agent for Facebook & Instagram advertising. Acts as the connector between strategy and execution.', 
        longDescription: "Campaign Builder is a guided, modular campaign creation tool that gives you full control over strategy while removing repetitive setup tasks. It provides templates for common objectives (leads, traffic, conversions), automates A/B structures, and generates field-accurate campaign specs for direct launch or handoff to Meta Auto Pilot.",
        iconName: 'LayoutTemplate', 
        color: '#4B0082', 
        categories: ['Ads', 'Marketing'], 
        suite: 'Meta Marketing Suite', 
        cta: 'Build Campaign' 
    },
    { 
        id: 'insta-ads-designer', 
        title: 'Instagram Lead Generation', 
        dashboardTitle: 'Insta Ads', 
        description: 'The media agent. Creates perfect image ads for Instagram Stories & Feed.', 
        longDescription: "Insta Ads Designer produces platform-optimized visuals and copy for Instagram Feed and Stories. The tool applies best-practice aspect ratios, text-to-image balance, animation presets, and split-tested copy variants to deliver creatives that convert.",
        iconName: 'Instagram', 
        color: '#E1306C', 
        categories: ['Creative', 'Ads'], 
        suite: 'Meta Marketing Suite', 
        cta: 'Design Ad' 
    },
    { 
        id: 'reel-ads', 
        title: 'Reel Ads', 
        description: 'The video media agent. Generates engaging video ads for Instagram Reels.', 
        longDescription: "Reel Ads automates short-form video ad creation optimized for Reels' vertical, mobile-first format. It combines UGC-style templates, motion presets, and AI-driven storyboard suggestions to produce high-retention reels that drive action.",
        iconName: 'Video', 
        color: '#E1306C', 
        categories: ['Creative', 'Ads'], 
        suite: 'Meta Marketing Suite', 
        cta: 'Generate Reel' 
    },
    
    // Marketing Management
    { 
        id: 'instagram-admin-ai', 
        title: 'Instagram Admin', 
        dashboardTitle: 'Instagram Admin', 
        description: 'Schedules posts and handles replies on Instagram.', 
        longDescription: "Instagram Admin centralizes content scheduling, comment management, DMs, and analytics. It provides queue management, approval flows, reply templates, sentiment tagging, and SLA automation for response times.",
        iconName: 'BotMessageSquare', 
        color: '#E1306C', 
        categories: ['Social & Comms', 'CRM'], 
        suite: 'Marketing Management', 
        badge: 'AUTO', 
        cta: 'Manage Page' 
    },
    { 
        id: 'whatsapp-manager', 
        title: 'WhatsApp Campaigns', 
        dashboardTitle: 'WhatsApp Campaigns', 
        description: 'Send personalized broadcasts and drip campaigns.', 
        longDescription: "WhatsApp Manager enables compliant, personalized messaging, automated drip sequences, and CRM-triggered follow-ups with templates, scheduling, and delivery tracking.",
        iconName: 'MessageCircle', 
        color: '#25D366', 
        categories: ['Social & Comms'], 
        suite: 'Marketing Management', 
        cta: 'Manage Campaign' 
    },
    { 
        id: 'commission-calculator', 
        title: 'Commission Calculator', 
        description: 'Instantly calculate your sales commission.', 
        longDescription: "Commission Calculator computes commissions across tiered structures, co-broker splits, incentives, and tax rules. It provides downloadable breakdowns for transparent settlements.",
        iconName: 'Calculator', 
        color: '#32CD32', 
        categories: ['Sales Tools'], 
        suite: 'Marketing Management', 
        cta: 'Calculate' 
    },
    {
        id: 'sales-message-rewriter',
        title: 'Sales Message Rewriter',
        description: 'A "Grammarly for Sales" to rewrite and improve your WhatsApp/SMS messages.',
        longDescription: 'This tool takes your draft sales message and generates several improved versions, each tailored to a specific tone or strategy like creating urgency, being more professional, or building rapport.',
        iconName: 'Sparkle',
        color: '#25D366',
        categories: ['Sales Tools', 'Social & Comms'],
        suite: 'Marketing Management',
        badge: 'NEW',
        cta: 'Rewrite Message'
    },
    
    // AI Creative Studio
    { 
        id: 'story-planner', 
        title: 'Story Planner', 
        description: 'Plan and design animated Instagram stories.', 
        longDescription: "Story Planner is a storyboard-first tool for designing multi-frame, animated Instagram Stories with template-driven transitions, CTA frames, and auto-export-ready segments for Ads Manager or Instagram Admin.",
        iconName: 'Album', 
        color: '#D83C6C', 
        categories: ['Creative', 'Social & Comms'], 
        suite: 'AI Creative Studio', 
        cta: 'Plan Story' 
    },
    { 
        id: 'ai-video-presenter', 
        title: 'AI Videos With Your Face', 
        description: 'Create a lifelike AI presenter to deliver your project pitch.', 
        longDescription: "AI Video Presenter generates a realistic AI presenter that reads your script and presents your pitch with natural voice, gestures, and teleprompter-style delivery. Output is ready for landing pages, pitch decks, or social ads.",
        iconName: 'User', 
        color: '#8A2BE2', 
        categories: ['Creative'], 
        suite: 'AI Creative Studio', 
        badge: 'NEW', 
        cta: 'Generate Presenter' 
    },
    { 
        id: 'ugc-script-writer', 
        title: 'Social Media Content Writer', 
        description: 'Generate authentic, user-generated content style video ad scripts.', 
        longDescription: "UGC Script Writer generates short, conversational scripts that mimic authentic user testimonials and casual storytelling — the style proven to improve trust and ad performance on social platforms.",
        iconName: 'PenTool', 
        color: '#7B42F6', 
        categories: ['Creative', 'Marketing'], 
        suite: 'AI Creative Studio', 
        cta: 'Write Scripts' 
    },
    { 
        id: 'youtube-video-editor', 
        title: 'AI YouTube Video Editor', 
        dashboardTitle: 'YouTube Editor', 
        description: 'Edit any video to be YouTube-ready.', 
        longDescription: "AI YouTube Video Editor automates editing tasks like trimming silence, creating chapters, generating titles and descriptions, adding optimized thumbnails, and repackaging long-form content into short-form clips.",
        iconName: 'Youtube', 
        color: '#FF0000', 
        categories: ['Editing'], 
        suite: 'AI Creative Studio', 
        cta: 'Edit Video' 
    },
    { 
        id: 'rebranding', 
        title: 'Automated Rebranding', 
        description: 'Apply your brand identity to any brochure with text commands.', 
        longDescription: "Automated Rebranding instantly applies brand colors, logos, typographic hierarchy, and tone of voice to brochures, social creatives, and videos using simple text commands or uploaded brand documents.",
        iconName: 'Palette', 
        color: '#1E90FF', 
        categories: ['Editing', 'Creative'], 
        suite: 'AI Creative Studio', 
        cta: 'Rebrand Document' 
    },
    { 
        id: 'brochure-translator', 
        title: 'Brochure Translator', 
        description: 'Translate any brochure to multiple languages in seconds.', 
        longDescription: "Brochure Translator preserves layout while translating text into multiple target languages, adjusting typography and line breaks automatically to keep design integrity intact.",
        iconName: 'Languages', 
        color: '#1E90FF', 
        categories: ['Editing'], 
        suite: 'AI Creative Studio', 
        cta: 'Translate Brochure' 
    },
    { 
        id: 'pdf-editor-ai', 
        title: 'PDF EDITOR AI', 
        description: 'Edit PDF documents with AI-powered tools.', 
        longDescription: "PDF EDITOR AI allows you to edit PDF documents using natural language commands. Change text, swap images, and adjust layouts without needing complex software like Adobe Acrobat.",
        iconName: 'Edit', 
        color: '#1E90FF', 
        categories: ['Editing', 'Creative'], 
        suite: 'AI Creative Studio', 
        cta: 'Edit with AI' 
    },
    { 
        id: 'images-hq-ai', 
        title: 'Images HQ AI', 
        description: 'Generate high-quality, royalty-free images for listings and ads.', 
        longDescription: "Images HQ AI is a powerful text-to-image generator that creates stunning, photorealistic visuals for all your marketing needs. Describe what you want, and the AI brings it to life.",
        iconName: 'ImageIcon', 
        color: '#4682B4', 
        categories: ['Creative'], 
        suite: 'AI Creative Studio', 
        cta: 'Generate Image' 
    },
    { 
        id: 'logo-creator-ai', 
        title: 'Logo Creator AI', 
        description: 'Create a professional logo for your brand in seconds.', 
        longDescription: "Logo Creator AI is a rapid logo generation tool. Simply describe your company and your desired style, and the AI will produce a variety of unique, professional logos for you to choose from.",
        iconName: 'Sparkle', 
        color: '#4682B4', 
        categories: ['Creative'], 
        suite: 'AI Creative Studio', 
        cta: 'Create Logo' 
    },
    { 
        id: 'aerial-view-generator', 
        title: 'Aerial View Generator', 
        description: 'Create cinematic, aerial video tours of any property.', 
        longDescription: "Aerial View Generator synthesizes cinematic aerial video sequences for properties using available imagery, 3D models, or drone footage. It produces smooth flights, flyovers, and dynamic reveal shots ideal for listing videos and promotional content.",
        iconName: 'Camera', 
        color: '#8A2BE2', 
        categories: ['Creative'], 
        suite: 'AI Creative Studio', 
        cta: 'Generate Aerial View' 
    },
    
    // AI Listing Portal
    { 
        id: 'listing-manager', 
        title: 'Listing Portal AI', 
        description: 'Your central hub to prepare and syndicate listings to major portals.', 
        longDescription: "Listing Manager standardizes listing data, enriches descriptions, batch-uploads images and videos, and syndicates listings to major portals (Property Finder, Bayut, etc.) with validation checks to ensure compliance.",
        iconName: 'ClipboardList', 
        color: '#FF4500', 
        categories: ['Sales Tools'], 
        suite: 'AI Listing Portal', 
        cta: 'Manage Listings' 
    },
    { 
        id: 'listing-performance', 
        title: 'Listing Performance', 
        description: 'Track listing views and performance across all portals.', 
        longDescription: "Listing Performance consolidates analytics across all listings and portals, showing views, inquiries, conversion funnel metrics, and attribution to marketing campaigns.",
        iconName: 'BarChart', 
        color: '#FF4500', 
        categories: ['Sales Tools', 'Market Intelligence'], 
        suite: 'AI Listing Portal', 
        cta: 'View Performance' 
    },
    { 
        id: 'listing-generator', 
        title: 'Listing Generator', 
        description: 'Craft perfect listings for portals like Property Finder & Bayut.', 
        longDescription: "Listing Generator produces high-quality listing copy, structured specifications, and media recommendations optimized for major portals. It enforces portal-specific rules and suggests SEO-friendly headlines.",
        iconName: 'FileText', 
        color: '#FF4500', 
        categories: ['Sales Tools'], 
        suite: 'AI Listing Portal', 
        cta: 'Generate Listing' 
    },
    { 
        id: 'propertyfinder-sync', 
        title: 'Property Finder Pilot', 
        dashboardTitle: 'Property Finder', 
        description: 'Execution terminal for pushing listings to Property Finder.', 
        longDescription: "Property Finder Pilot automates validated uploads, handles API mapping, and manages listing lifecycle events (publish, update, expire) directly with Property Finder while providing error-handling and logging.",
        iconName: 'Building', 
        color: '#3282B8', 
        categories: ['Developer', 'Sales Tools'], 
        suite: 'AI Listing Portal', 
        badge: 'AUTO', 
        cta: 'Sync Listing' 
    },
    { 
        id: 'bayut-sync', 
        title: 'Bayut Pilot', 
        dashboardTitle: 'Bayut', 
        description: 'Execution terminal for pushing listings to Bayut.', 
        longDescription: "Bayut Pilot provides the same automated publishing, validation, and lifecycle management for Bayut portal as Property Finder Pilot does for Property Finder.",
        iconName: 'Building', 
        color: '#25B864', 
        categories: ['Developer', 'Sales Tools'], 
        suite: 'AI Listing Portal', 
        badge: 'AUTO', 
        cta: 'Sync Listing' 
    },
    { 
        id: 'payment-planner', 
        title: 'Payment Planner', 
        description: 'Generate tailored payment plans for off-plan properties.', 
        longDescription: "Payment Planner creates schedule-driven payment plans, calculates installments, milestone payments, and produces client-facing schedules with legal-friendly formatting.",
        iconName: 'FileCheck', 
        color: '#32CD32', 
        categories: ['Sales Tools'], 
        suite: 'AI Listing Portal', 
        cta: 'Create Plan' 
    },
    
    // Lead Intelligence AI
    {
        id: 'deals-smart-planner',
        title: 'Sales AI Assistant',
        description: 'Your AI partner for step-by-step deal creation and execution.',
        longDescription: "An interactive, conversational planner that analyzes your goals and assets to generate a clear, actionable path to closing your next deal. It's like having a world-class sales manager in your pocket.",
        iconName: 'Sparkle',
        color: '#FFD700',
        categories: ['Sales Tools', 'Lead Gen'],
        suite: 'Lead Intelligence AI',
        badge: 'NEW',
        cta: 'Plan a Deal'
    },
    { 
        id: 'deal-analyzer', 
        title: 'Deal Analyzer', 
        description: 'Enter a property address to get AI-driven market estimates and run a full investment analysis.', 
        longDescription: 'Enter a property address and let the AI data agent fetch market estimates for price, rent, and expenses, then run a full investment analysis including cash flow, ROI, and cap rate.',
        iconName: 'BarChart3', 
        color: '#32CD32', 
        categories: ['Sales Tools', 'Market Intelligence'], 
        suite: 'Lead Intelligence AI', 
        cta: 'Analyze Deal' 
    },
    { 
        id: 'investor-matching', 
        title: 'Investor Matching', 
        description: 'Pair budgets with the right projects.', 
        longDescription: "Investor Matching uses investor profiles, budgets, preferences, and project parameters to match investors with suitable developments or listings, prioritizing fit and return profiles.",
        iconName: 'Handshake', 
        color: '#32CD32', 
        categories: ['Sales Tools', 'Lead Gen'], 
        suite: 'Lead Intelligence AI', 
        cta: 'Find Matches' 
    },
    { 
        id: 'multi-offer-builder', 
        title: 'Multi-Offer Builder', 
        description: 'Compare property options side-by-side for clients.', 
        longDescription: "Multi-Offer Builder creates side-by-side comparisons of properties, financing options, payment plans, and projected returns, enabling clients to evaluate choices visually and quantitatively.",
        iconName: 'Container', 
        color: '#32CD32', 
        categories: ['Sales Tools'], 
        suite: 'Lead Intelligence AI', 
        cta: 'Build Comparison' 
    },
    { 
        id: 'lead-investigator', 
        title: 'Lead Investigator AI', 
        dashboardTitle: 'Lead Investigator', 
        description: 'Find social profiles and professional history for any lead.', 
        longDescription: "Lead Investigator AI enriches leads with public social profiles, professional history, and inferred intent signals to give sales teams deeper context before outreach.",
        iconName: 'FileSearch', 
        color: '#FFA500', 
        categories: ['CRM', 'Lead Gen'], 
        suite: 'Lead Intelligence AI', 
        cta: 'Investigate Lead' 
    },
    { 
        id: 'projects-finder', 
        title: 'Market Projects Library', 
        description: 'Search our intelligent library for verified projects.', 
        longDescription: "Market Library is a verified repository of projects, historical pricing, and developer data. Searchable by coordinates, developer, project stage, or price band with trust signals.",
        iconName: 'Database', 
        color: '#00CED1', 
        categories: ['Market Intelligence', 'Market Library'], 
        suite: 'Lead Intelligence AI', 
        cta: 'Search Library' 
    },
    { 
        id: 'market-reports', 
        title: 'Market Reports', 
        description: 'Generate PDF reports on market trends, pricing, and sentiment.', 
        longDescription: "Market Reports creates exportable, branded PDF reports on market health, price movement, sentiment, and portfolio performance with charts and contextual narratives.",
        iconName: 'Newspaper', 
        color: '#00CED1', 
        categories: ['Market Intelligence'], 
        suite: 'Lead Intelligence AI', 
        cta: 'Generate Report' 
    },
    { 
        id: 'market-trends', 
        title: 'Market Analyst Agent', 
        description: 'The watcher that identifies emerging market trends, finds opportunities, and provides optimization suggestions.', 
        longDescription: "Market Trends Watcher continuously monitors price movement, listing velocity, sentiment, and search behavior to surface early signals and alerts for emerging trends or cooling markets.",
        iconName: 'LineChart', 
        color: '#00CED1', 
        categories: ['Market Intelligence'], 
        suite: 'Lead Intelligence AI', 
        cta: 'View Trends' 
    },
     { 
        id: 'audience-creator', 
        title: 'Brand Search Optimization', 
        description: 'The watcher agent that finds, analyzes, and optimizes your target audience for brand search.', 
        longDescription: "Audience Creator uses first-party signals, lookalike modeling, and contextual intent markers to build high-probability buyer segments. It surfaces audiences that are likely to convert and provides clear explanations for why each segment matters.",
        iconName: 'Users2', 
        color: '#00CED1', 
        categories: ['Market Intelligence', 'Lead Gen'], 
        suite: 'Lead Intelligence AI', 
        cta: 'Create Audience' 
    },
    
    // Google Ads Suite
    { 
        id: 'keyword-planner', 
        title: 'Keyword Planner', 
        description: 'Generate strategic keyword plans for Google Ads to capture high-intent leads.', 
        longDescription: "Generate a comprehensive keyword plan for a search campaign. Includes ad groups, keyword variations (Broad, Phrase, Exact), estimated search volumes, and negative keywords.",
        iconName: 'Search', 
        color: '#4285F4', 
        categories: ['Marketing', 'Ads'], 
        suite: 'Google Ads Suite', 
        cta: 'Create Plan' 
    },
    
    // Web Development Lab
    { 
        id: 'landing-pages', 
        title: 'Landing Page Designer', 
        dashboardTitle: 'Landing Pages', 
        description: 'Launch high-converting landing pages in minutes.', 
        longDescription: "Landing Page Builder creates conversion-optimized landing pages with tested templates, dynamic components (lead forms, price calculators), A/B variants, and one-click publishing. Pages are SEO-ready and integrate with CRM Memory for lead capture.",
        iconName: 'Globe', 
        color: '#1E90FF', 
        categories: ['Web', 'Lead Gen'], 
        suite: 'Web Development Lab', 
        cta: 'Generate Page' 
    },
    { 
        id: 'chatbot-creator', 
        title: 'Embeddable Site Assistant', 
        description: 'Add a market-aware AI chatbot to any website.', 
        longDescription: "Embeddable Site Assistant is a lightweight chatbot that pulls market and listing data to answer visitor questions, capture leads, and recommend listings directly on any site.",
        iconName: 'Bot', 
        color: '#6a788c', 
        categories: ['Web', 'Lead Gen'], 
        suite: 'Web Development Lab', 
        badge: 'NEW', 
        cta: 'Create Chatbot' 
    },

    // Core AI
    { 
        id: 'crm-assistant', 
        title: 'CRM Memory Assistant', 
        description: 'The core data store that remembers every client interaction.', 
        longDescription: "CRM Memory stores lead and client data, interaction history, deal stages, documents, and AI-annotated notes. It acts as the single source of truth for customer lifecycle and feeds other suite apps with contextual data.",
        iconName: 'BrainCircuit', 
        color: '#DA70D6', 
        categories: ['CRM'], 
        suite: 'Core AI', 
        cta: 'Query Memory' 
    },
    { 
        id: 'ai-brand-creator', 
        title: 'AI Brand Creator', 
        description: 'Configure your brand kit by analyzing uploaded documents.', 
        longDescription: "Brand Creator analyzes uploaded documents, logos, and tone of voice to produce a full brand kit including palettes, typography, logo usage rules, and writing tone guidelines.",
        iconName: 'Wand2', 
        color: '#DA70D6', 
        categories: ['Creative', 'CRM'], 
        suite: 'Core AI', 
        cta: 'Create Brand' 
    },
    { 
        id: 'ai-assistant', 
        title: 'AI Assistant', 
        description: 'Your personal, trainable AI partner.', 
        longDescription: "Assistant is a trainable AI that learns from your CRM Memory, Market Library, and usage patterns to provide contextually-aware assistance: drafting messages, creating briefs, suggesting optimizations, and answering queries about your inventory and market.",
        iconName: 'Bot', 
        color: '#DA70D6', 
        categories: ['CRM'], 
        suite: 'Core AI', 
        cta: 'Chat Now' 
    },
    
    // Utility
    { 
        id: 'lease-reviewer', 
        title: 'Lease Reviewer', 
        description: 'Upload a lease agreement and let the AI analyze it for risks and non-standard clauses.', 
        longDescription: 'This flow acts as an AI paralegal, reviewing a lease document and providing a structured analysis to help agents and clients identify areas for concern or negotiation.',
        iconName: 'FileSearch', 
        color: '#6a788c', 
        categories: ['Sales Tools', 'Developer'], 
        suite: 'Utility', 
        badge: 'NEW', 
        cta: 'Review Lease' 
    },
    { 
        id: 'prompt-library', 
        title: 'Prompt Library', 
        description: 'A collection of sample prompts to get you started.', 
        longDescription: 'Browse a curated library of prompts across different media types and models to kickstart your creative process and discover new AI capabilities.',
        iconName: 'Library', 
        color: '#6a788c', 
        categories: ['Developer'], 
        suite: 'Utility', 
        cta: 'Browse Library' 
    },
    { 
        id: 'data-importer', 
        title: 'Data Importer', 
        description: 'Import data from external sources like XML files.', 
        longDescription: 'Manage your search context and knowledge base by importing structured data from external XML files.',
        iconName: 'Upload', 
        color: '#6a788c', 
        categories: ['Developer'], 
        suite: 'Utility', 
        cta: 'Import Data' 
    },
    { 
        id: 'paypal-transaction', 
        title: 'PayPal Transaction', 
        description: 'A developer tool to fetch transaction details from PayPal.', 
        longDescription: 'A Genkit tool to securely fetch transaction details from the PayPal API, which can be used by other AI agents or flows.',
        iconName: 'CreditCard', 
        color: '#6a788c', 
        categories: ['Developer'], 
        suite: 'Utility', 
        cta: 'Fetch Transaction' 
    },
    { 
        id: 'alloydb-scanner', 
        title: 'AlloyDB Scanner', 
        description: 'Scan for databases and analyze suitability for AlloyDB migration.', 
        longDescription: 'An AI flow that acts as a database assessment tool, generating a report on potential AlloyDB migration candidates in your environment.',
        iconName: 'Database', 
        color: '#6a788c', 
        categories: ['Developer'], 
        suite: 'Utility', 
        cta: 'Scan Environment' 
    },
    { 
        id: 'vm-creator', 
        title: 'VM Creator', 
        description: 'A utility for developers to provision Google Cloud virtual machines.', 
        longDescription: 'A utility for developers to provision Google Cloud virtual machines with pre-configured settings.',
        iconName: 'Terminal', 
        color: '#808080', 
        categories: ['Developer'], 
        suite: 'Utility', 
        cta: 'Provision VM' 
    },
    { 
        id: 'creative-execution-terminal', 
        title: 'Creative Execution Terminal', 
        description: 'The execution engine for complex creative tasks.', 
        longDescription: 'Orchestrates complex creative pipelines, batching tasks like video rendering and generative image sets using queued workers.',
        iconName: 'Terminal', 
        color: '#808080', 
        categories: ['Developer'], 
        suite: 'Utility', 
        cta: 'Open Terminal' 
    },
    { 
        id: 'superfreetime', 
        title: 'SuperFreeTime', 
        description: '???', 
        longDescription: 'A mysterious tool. What could it be?',
        iconName: 'KeyRound', 
        color: '#ffcc00', 
        categories: [], 
        suite: 'Utility', 
        cta: '???' 
    },

    // Deprecated
    { 
        id: 'pdf-editor', 
        title: 'Visual PDF Editor', 
        description: 'A legacy tool for simple PDF edits.', 
        longDescription: 'Visual PDF Editor is the legacy editor for quick PDF text and image edits. It remains available but is no longer receiving feature updates. Use PDF EDITOR AI for modern workflows.',
        iconName: 'Edit', 
        color: '#808080', 
        categories: ['Editing'], 
        suite: 'Utility', 
        badge: 'DEPRECATED', 
        cta: 'Open Editor' 
    },
];

    