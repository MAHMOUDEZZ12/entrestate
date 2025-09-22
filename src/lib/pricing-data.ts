
import { Sparkles, Building, Bot } from 'lucide-react';
import React from 'react';

export interface AppData {
    name: string;
    description: string;
    price_monthly: number;
    category: 'Marketing' | 'Sales' | 'Creative' | 'Intelligence';
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
        { "name": "Brochure Translator", "description": "Translate brochures to multiple languages in seconds.", "price_monthly": 15, "category": "Creative" },
        { "name": "Listing Generator", "description": "Craft perfect listings for portals like Property Finder & Bayut.", "price_monthly": 10, "category": "Sales" },
        { "name": "Deal Analyzer", "description": "Analyze the investment potential of any real estate deal.", "price_monthly": 20, "category": "Intelligence" },
        { "name": "Market Reports", "description": "Generate PDF reports on market trends, pricing, and sentiment.", "price_monthly": 25, "category": "Intelligence" },
        { "name": "WhatsApp Manager", "description": "Send personalized broadcasts and drip campaigns.", "price_monthly": 15, "category": "Sales" },
        { "name": "AI Video Presenter", "description": "Create a lifelike AI presenter for your project pitch.", "price_monthly": 30, "category": "Creative" }
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
