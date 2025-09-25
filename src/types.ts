

import { z } from 'zod';

// Core market identity
export type MarketKey = `${string}:${string}`; // e.g. "AE:Dubai"
export interface Market { country: string; city: string; key?: MarketKey }

// Catalog project (what you store in projects_catalog)
export interface Project {
  id: string;
  name: string;
  developer: string;
  city: string;
  country: string;
  area: string; // Made area a required string
  priceFrom?: string | number;
  unitTypes?: string[];
  handover?: string;
  status?: "New Launch" | "Off-plan" | "Ready" | string;
  thumbnailUrl?: string;
  badge?: string;
  tags?: string[];
}

// Per-user shortlist library
export interface UserLibrary {
  uid: string;
  marketKey: MarketKey;
  items: string[];       // array of project IDs
  ts: number;
}

// Brand kit stored with user
export interface BrandKit {
  logoUrl?: string | null;
  colors?: { primary?: string; accent?: string };
  contact?: { name?: string; phone?: string; email?: string };
}

// Onboarding draft (saved/resumed)
export interface OnboardingDraft {
  city?: string;
  country?: string;
  devFocus?: string[];
  suggestedProjects?: Project[];
  firstPass?: Record<string, "relevant" | "not">;
  scanSelected?: string[];
  shortlist?: string[];
  brandKit?: BrandKit;
  connections?: Record<string, boolean>;
  payment?: { status?: "added" | "skipped" };
  progress?: { step: number; ts: number };
  isComplete?: boolean;
}

// Simple event envelope
export interface AppEvent {
  event: string;
  uid?: string;
  props?: Record<string, any>;
  ts?: any; // serverTimestamp()
}

// Knowledge Base File
export interface KnowledgeFile {
    id: string;
    fileName: string;
    fileUrl: string;
    type: string;
    size: number;
    status: 'uploaded' | 'training' | 'trained' | 'error';
    createdAt: any;
}

// Feature interface (added to resolve build error in toolId page)
export interface Feature {
  id: string;
  name: string;
  creationFields?: any[]; // Added to resolve the type error
  // Add other properties of Feature as needed
}

export type FilterCategory = 'All' | 'Marketing' | 'Lead Gen' | 'Creative' | 'Sales Tools' | 'Social & Comms' | 'Web' | 'Editing' | 'Ads' | 'Market Intelligence' | 'CRM' | 'Developer' | 'Market Library' | 'Video';
export type BadgeType = 'NEW' | 'AUTO' | 'DEPRECATED';
export type Suite = 'Meta Marketing Suite' | 'Web Development Lab' | 'AI Listing Portal' | 'AI Creative Studio' | 'Marketing Management' | 'Lead Intelligence AI' | 'Google Ads Suite' | 'Core AI' | 'Utility';
