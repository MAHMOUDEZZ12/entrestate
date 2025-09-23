
import {
    Sparkles, Building, Briefcase, BrainCircuit, LayoutGrid, Wrench
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Suite {
    id: string;
    name: string;
    icon: LucideIcon;
    description: string;
}

export const marketingSuites: Suite[] = [
  {
    id: 'meta-marketing-suite',
    name: 'Meta Marketing Suite',
    icon: Sparkles,
    description: 'A complete arsenal of tools to create, launch, and manage high-performance campaigns on Facebook & Instagram.',
  },
  {
    id: 'ai-listing-portal',
    name: 'AI Listing Portal',
    icon: Building,
    description: 'Your central hub for creating, managing, and syndicating property listings to all major portals.',
  },
  {
    id: 'ai-creative-studio',
    name: 'AI Creative Studio',
    icon: LayoutGrid,
    description: 'Generate stunning visuals, videos, and copy for all your marketing needs, powered by generative AI.',
  },
  {
    id: 'lead-intelligence-ai',
    name: 'Lead Intelligence AI',
    icon: BrainCircuit,
    description: 'Tools to enrich leads, understand market trends, and match investors with the perfect properties.',
  },
  {
    id: 'marketing-management',
    name: 'Marketing Management',
    icon: Briefcase,
    description: 'High-level tools for managing your brand, social media presence, and communications.',
  },
  {
    id: 'google-ads-suite',
    name: 'Google Ads Suite',
    icon: Sparkles,
    description: 'Specialized tools to plan and optimize your Google search campaigns.',
  },
  {
    id: 'web-development-lab',
    name: 'Web Development Lab',
    icon: LayoutGrid,
    description: 'Build and manage your online presence, from landing pages to embeddable chatbots.',
  },
  {
    id: 'core-ai',
    name: 'Core AI',
    icon: BrainCircuit,
    description: 'The foundational AI that powers the entire platform, including your personal assistant.',
  },
  {
    id: 'utility',
    name: 'Utility',
    icon: Wrench,
    description: 'Essential tools for developers and advanced users to manage and extend the platform.',
  },
];
