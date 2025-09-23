
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

interface PricingData {
    apps: AppData[];
    plans: PlanData[];
}

export const pricingData: PricingData = {
    "apps": [
        // This list can be kept for internal reference or other UI elements,
        // but the primary pricing model will now be driven by the `plans` array.
        { "name": "PRO SEARCH ENG. x3", "description": "The triple-engine of discovery: Fast, Smart, and Deep Search.", "price_monthly": 190, "category": "Intelligence" },
        { "name": "ESTCHAT X3", "description": "The conversational frontline for your website, social media, and CRM.", "price_monthly": 149, "category": "CRM" },
        { "name": "MEGA LISTING PRO 2", "description": "The unified market registry to consolidate and verify all listings.", "price_monthly": 68, "category": "Sales" },
        { "name": "Insta Ads Designer", "description": "Create perfect ads for Instagram Stories & Feed.", "price_monthly": 15, "category": "Ads" },
        { "name": "Reel Ads", "description": "Generate engaging video ads for Instagram Reels.", "price_monthly": 20, "category": "Ads" },
    ],
    "plans": [
        {
            "id": "agent",
            "name": "Agent Suite",
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
            "name": "Super Agent Suite",
            "tagline": "For the marketing-savvy agent running multi-channel campaigns.",
            "price_monthly": 99,
            "popular": true,
            "features": [
                "Everything in Agent Suite, plus:",
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
