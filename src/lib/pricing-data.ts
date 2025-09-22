
import { Sparkles, Building, Bot } from 'lucide-react';
import React from 'react';

export interface AppData {
    name: string;
    description: string;
    price_monthly: number;
    category: 'Marketing' | 'Sales' | 'Creative' | 'Intelligence' | 'Web' | 'Editing' | 'Ads' | 'Social & Comms' | 'CRM' | 'Developer';
}

export interface PlanData {
    id: string;
    name: string;
    tagline: string;
    price_monthly: number;
    popular: boolean;
    features: string[];
}

export const pricingData: {
    apps: AppData[];
    plans: PlanData[];
} = {
    "apps": [
        { "name": "Insta Ads Designer", "description": "Create perfect ads for Instagram Stories & Feed.", "price_monthly": 15, "category": "Marketing" },
        { "name": "Reel Ads", "description": "Generate engaging video ads for Instagram Reels.", "price_monthly": 20, "category": "Marketing" },
        { "name": "UGC Script Writer", "description": "Generate authentic, user-generated content style scripts.", "price_monthly": 10, "category": "Creative" },
        { "name": "AI YouTube Video Editor", "description": "Edit any video to be YouTube-ready.", "price_monthly": 25, "category": "Creative" },
        { "name": "Landing Page Builder", "description": "Launch high-converting landing pages in minutes.", "price_monthly": 20, "category": "Web" },
        { "name": "Automated Rebranding", "description": "Apply your brand identity to any brochure.", "price_monthly": 15, "category": "Creative" },
        { "name": "Brochure Translator", "description": "Translate brochures to multiple languages in seconds.", "price_monthly": 15, "category": "Editing" },
        { "name": "Listing Generator", "description": "Craft perfect listings for portals like Property Finder & Bayut.", "price_monthly": 10, "category": "Sales" },
        { "name": "Deal Analyzer", "description": "Analyze the investment potential of any real estate deal.", "price_monthly": 20, "category": "Intelligence" },
        { "name": "Market Reports", "description": "Generate PDF reports on market trends, pricing, and sentiment.", "price_monthly": 25, "category": "Intelligence" },
        { "name": "WhatsApp Manager", "description": "Send personalized broadcasts and drip campaigns.", "price_monthly": 15, "category": "Sales" },
        { "name": "AI Video Presenter", "description": "Create a lifelike AI presenter for your project pitch.", "price_monthly": 30, "category": "Creative" },
        { "name": "Meta Auto Pilot", "description": "Single-click manager for your entire Meta suite.", "price_monthly": 25, "category": "Ads" },
        { "name": "Campaign Builder", "description": "Dedicated agent for Facebook & Instagram advertising.", "price_monthly": 15, "category": "Ads" },
        { "name": "Audience Creator", "description": "Find high-intent buyers before they search.", "price_monthly": 20, "category": "Lead Gen" },
        { "name": "Instagram Admin AI", "description": "Schedules posts and handles replies on Instagram.", "price_monthly": 15, "category": "Social & Comms" },
        { "name": "Story Planner", "description": "Plan and design animated Instagram stories.", "price_monthly": 10, "category": "Creative" },
        { "name": "PDF EDITOR AI", "description": "Edit PDF documents with AI-powered tools.", "price_monthly": 15, "category": "Editing" },
        { "name": "Images HQ AI", "description": "Generate high-quality, royalty-free images for your ads.", "price_monthly": 20, "category": "Creative" },
        { "name": "Logo Creator AI", "description": "Create a professional logo for your brand in seconds.", "price_monthly": 10, "category": "Creative" },
        { "name": "Aerial View Generator", "description": "Create cinematic, aerial video tours of any property.", "price_monthly": 25, "category": "Creative" },
        { "name": "Listing Manager", "description": "Your central hub to prepare and syndicate listings.", "price_monthly": 20, "category": "Sales" },
        { "name": "Listing Performance", "description": "Track listing views and performance across all portals.", "price_monthly": 15, "category": "Intelligence" },
        { "name": "Property Finder Pilot", "description": "Execution terminal for pushing listings to Property Finder.", "price_monthly": 10, "category": "Developer" },
        { "name": "Bayut Pilot", "description": "Execution terminal for pushing listings to Bayut.", "price_monthly": 10, "category": "Developer" },
        { "name": "Commission Calculator", "description": "Instantly calculate your sales commission.", "price_monthly": 5, "category": "Sales" },
        { "name": "Payment Planner", "description": "Generate tailored payment plans for off-plan properties.", "price_monthly": 10, "category": "Sales" },
        { "name": "Investor Matching", "description": "Pair budgets with the right projects.", "price_monthly": 25, "category": "Lead Gen" },
        { "name": "Multi-Offer Builder", "description": "Compare property options side-by-side for clients.", "price_monthly": 15, "category": "Sales" },
        { "name": "Lead Investigator AI", "description": "Find social profiles and professional history for any lead.", "price_monthly": 20, "category": "Lead Gen" },
        { "name": "Market Library", "description": "Search our intelligent library for verified projects.", "price_monthly": 30, "category": "Intelligence" },
        { "name": "Market Trends Watcher", "description": "Identify emerging market trends before they become mainstream.", "price_monthly": 25, "category": "Intelligence" },
        { "name": "Keyword Planner", "description": "Generate strategic keyword plans for Google Ads.", "price_monthly": 15, "category": "Marketing" },
        { "name": "AI Brand Creator", "description": "Configure your brand kit by analyzing uploaded documents.", "price_monthly": 15, "category": "Creative" },
        { "name": "CRM Memory Assistant", "description": "The core data store that remembers every client interaction.", "price_monthly": 20, "category": "CRM" },
        { "name": "AI Assistant", "description": "Your personal, trainable AI partner.", "price_monthly": 30, "category": "CRM" },
        { "name": "Lease Reviewer", "description": "Upload a lease agreement and let the AI analyze it for risks.", "price_monthly": 20, "category": "Sales" },
        { "name": "Embeddable Site Assistant", "description": "Add a market-aware AI chatbot to any website.", "price_monthly": 25, "category": "Web" }
    ],
    "plans": [
        {
            "id": "seller",
            "name": "Seller",
            "tagline": "For the individual agent focused on closing deals.",
            "price_monthly": 49,
            "popular": false,
            "features": [
                "Generate & manage listings",
                "Automate outreach via WhatsApp",
                "Analyze deal profitability",
                "Create AI video presenters",
                "Craft landing pages for your listings",
                "Translate brochures for international clients"
            ]
        },
        {
            "id": "marketer",
            "name": "Marketer",
            "tagline": "For the marketing pro running multi-channel campaigns.",
            "price_monthly": 79,
            "popular": true,
            "features": [
                "Everything in Seller, plus:",
                "Full Meta Ads suite (Insta & Reel Ads)",
                "AI-powered ad campaign generation",
                "Advanced audience creation tools",
                "UGC & professional script writing",
                "Automated YouTube video editing"
            ]
        },
        {
            "id": "ceo",
            "name": "CEO",
            "tagline": "For brokerages and developers managing teams & portfolios.",
            "price_monthly": 149,
            "popular": false,
            "features": [
                "Everything in Marketer, plus:",
                "Full Market Intelligence suite",
                "Automated portal syndication (Property Finder & Bayut)",
                "Team management & collaboration features",
                "Centralized brand control",
                "Priority support & onboarding"
            ]
        }
    ]
};
