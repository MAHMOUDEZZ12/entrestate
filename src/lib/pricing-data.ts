
import { Sparkles, Building, Bot } from 'lucide-react';
import React from 'react';

export type AppCategory = 'Marketing' | 'Sales' | 'Creative' | 'Intelligence' | 'Web' | 'Editing' | 'Ads' | 'Social & Comms' | 'CRM' | 'Developer' | 'Lead Gen';

export interface AppData {
    name: string;
    description: string;
    price_monthly: number;
    category: AppCategory;
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
        // Core Products
        { "name": "PRO SEARCH ENG. x3", "description": "The triple-engine of discovery: Fast, Smart, and Deep Search.", "price_monthly": 190, "category": "Intelligence" },
        { "name": "ESTCHAT X3", "description": "The conversational frontline for your website, social media, and CRM.", "price_monthly": 149, "category": "CRM" },
        { "name": "MEGA LISTING PRO 2", "description": "The unified market registry to consolidate and verify all listings.", "price_monthly": 68, "category": "Sales" },

        // Marketing & Ads
        { "name": "Insta Ads Designer", "description": "Create perfect ads for Instagram Stories & Feed.", "price_monthly": 15, "category": "Ads" },
        { "name": "Reel Ads", "description": "Generate engaging video ads for Instagram Reels.", "price_monthly": 20, "category": "Ads" },
        { "name": "Meta Auto Pilot", "description": "Single-click manager for your entire Meta suite.", "price_monthly": 25, "category": "Ads" },
        { "name": "Campaign Builder", "description": "Dedicated agent for Facebook & Instagram advertising.", "price_monthly": 15, "category": "Ads" },
        { "name": "Keyword Planner", "description": "Generate strategic keyword plans for Google Ads.", "price_monthly": 15, "category": "Marketing" },
        
        // Creative
        { "name": "UGC Script Writer", "description": "Generate authentic, user-generated content style scripts.", "price_monthly": 10, "category": "Creative" },
        { "name": "AI YouTube Video Editor", "description": "Edit any video to be YouTube-ready.", "price_monthly": 25, "category": "Creative" },
        { "name": "AI Video Presenter", "description": "Create a lifelike AI presenter for your project pitch.", "price_monthly": 30, "category": "Creative" },
        { "name": "Images HQ AI", "description": "Generate high-quality, royalty-free images for your ads.", "price_monthly": 20, "category": "Creative" },
        { "name": "Logo Creator AI", "description": "Create a professional logo for your brand in seconds.", "price_monthly": 10, "category": "Creative" },
        { "name": "Aerial View Generator", "description": "Create cinematic, aerial video tours of any property.", "price_monthly": 25, "category": "Creative" },
        { "name": "AI Brand Creator", "description": "Configure your brand kit by analyzing uploaded documents.", "price_monthly": 15, "category": "Creative" },
        { "name": "Story Planner", "description": "Plan and design animated Instagram stories.", "price_monthly": 10, "category": "Creative" },

        // Editing
        { "name": "Automated Rebranding", "description": "Apply your brand identity to any brochure.", "price_monthly": 15, "category": "Editing" },
        { "name": "Brochure Translator", "description": "Translate brochures to multiple languages in seconds.", "price_monthly": 15, "category": "Editing" },
        { "name": "PDF EDITOR AI", "description": "Edit PDF documents with AI-powered tools.", "price_monthly": 15, "category": "Editing" },
        
        // Sales Tools
        { "name": "Listing Generator", "description": "Craft perfect listings for portals like Property Finder & Bayut.", "price_monthly": 10, "category": "Sales" },
        { "name": "Listing Manager", "description": "Your central hub to prepare and syndicate listings.", "price_monthly": 20, "category": "Sales" },
        { "name": "AI Price Estimator", "description": "Get AI-powered price estimates for any property.", "price_monthly": 20, "category": "Sales" },
        { "name": "Commission Calculator", "description": "Instantly calculate your sales commission.", "price_monthly": 5, "category": "Sales" },
        { "name": "Payment Planner", "description": "Generate tailored payment plans for off-plan properties.", "price_monthly": 10, "category": "Sales" },
        { "name": "Multi-Offer Builder", "description": "Compare property options side-by-side for clients.", "price_monthly": 15, "category": "Sales" },
        { "name": "Lease Reviewer", "description": "Upload a lease agreement and let the AI analyze it for risks.", "price_monthly": 20, "category": "Sales" },
        
        // Intelligence
        { "name": "Deal Analyzer", "description": "Analyze the investment potential of any real estate deal.", "price_monthly": 20, "category": "Intelligence" },
        { "name": "Market Reports", "description": "Generate PDF reports on market trends, pricing, and sentiment.", "price_monthly": 25, "category": "Intelligence" },
        { "name": "Market Library", "description": "Search our intelligent library for verified projects.", "price_monthly": 30, "category": "Intelligence" },
        { "name": "Market Trends Watcher", "description": "Identify emerging market trends before they become mainstream.", "price_monthly": 25, "category": "Intelligence" },
        { "name": "Listing Performance", "description": "Track listing views and performance across all portals.", "price_monthly": 15, "category": "Intelligence" },

        // Lead Gen & CRM
        { "name": "Audience Creator", "description": "Find high-intent buyers before they search.", "price_monthly": 20, "category": "Lead Gen" },
        { "name": "Investor Matching", "description": "Pair budgets with the right projects.", "price_monthly": 25, "category": "Lead Gen" },
        { "name": "Lead Investigator AI", "description": "Find social profiles and professional history for any lead.", "price_monthly": 20, "category": "Lead Gen" },
        { "name": "CRM Memory Assistant", "description": "The core data store that remembers every client interaction.", "price_monthly": 20, "category": "CRM" },
        { "name": "AI Assistant", "description": "Your personal, trainable AI partner.", "price_monthly": 30, "category": "CRM" },

        // Social & Comms
        { "name": "WhatsApp Manager", "description": "Send personalized broadcasts and drip campaigns.", "price_monthly": 15, "category": "Social & Comms" },
        { "name": "Instagram Admin AI", "description": "Schedules posts and handles replies on Instagram.", "price_monthly": 15, "category": "Social & Comms" },

        // Web
        { "name": "Landing Page Builder", "description": "Launch high-converting landing pages in minutes.", "price_monthly": 20, "category": "Web" },
        { "name": "Embeddable Site Assistant", "description": "Add a market-aware AI chatbot to any website.", "price_monthly": 25, "category": "Web" },

        // Developer
        { "name": "Property Finder Pilot", "description": "Execution terminal for pushing listings to Property Finder.", "price_monthly": 10, "category": "Developer" },
        { "name": "Bayut Pilot", "description": "Execution terminal for pushing listings to Bayut.", "price_monthly": 10, "category": "Developer" }
    ],
    "plans": [
        {
            "id": "agent",
            "name": "Agent",
            "tagline": "For the individual agent focused on listings and closing deals.",
            "price_monthly": 49,
            "popular": false,
            "features": [
                "Listing Generator",
                "Deal Analyzer",
                "Payment Planner",
                "WhatsApp Manager",
                "AI Video Presenter",
                "Landing Page Builder",
                "Brochure Translator"
            ]
        },
        {
            "id": "super-agent",
            "name": "Super Agent",
            "tagline": "For the marketing-savvy agent running multi-channel campaigns.",
            "price_monthly": 99,
            "popular": true,
            "features": [
                "Everything in Agent, plus:",
                "Full Meta Ads Suite (Auto Pilot, Audience Creator, Insta & Reel Ads)",
                "Full Creative Suite (UGC Scripts, Video Editing)",
                "Advanced Lead Generation Tools",
                "CRM Memory Assistant"
            ]
        },
        {
            "id": "full-power",
            "name": "Full Power",
            "tagline": "For brokerages and developers managing teams & portfolios.",
            "price_monthly": 199,
            "popular": false,
            "features": [
                "Everything in Super Agent, plus:",
                "Full Market Intelligence Suite",
                "Automated Portal Syndication (Property Finder & Bayut)",
                "Team Management & Collaboration Features",
                "Centralized Brand Control",
                "Priority Support & Onboarding"
            ]
        }
    ]
};
