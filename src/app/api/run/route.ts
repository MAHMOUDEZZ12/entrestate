
'use server';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ai } from '@/ai/genkit';

// Import all flow functions directly here
import { generateAdFromBrochure } from '@/ai/flows/meta-pilot/generate-ad-from-brochure';
import { generateLandingPage } from '@/ai/flows/archy/generate-landing-page';
import { rebrandBrochure } from '@/ai/flows/archy/rebrand-brochure';
import { generateSocialPost } from '@/ai/flows/meta-pilot/generate-social-post';
import { suggestTargetingOptions } from '@/ai/flows/meta-pilot/suggest-targeting-options';
import { editPdf } from '@/ai/flows/archy/edit-pdf';
import { matchInvestors } from '@/ai/flows/market-intelligence/match-investors';
import { aiBrandCreator } from '@/ai/flows/archy/ai-brand-creator';
import { generateMarketReport } from '@/ai/flows/market-intelligence/generate-market-report';
import { getMarketTrends } from '@/ai/flows/market-intelligence/get-market-trends';
import { generateListing } from '@/ai/flows/listing-crm/generate-listing';
import { generateStory } from '@/ai/flows/archy/generate-story';
import { generateReel } from '@/ai/flows/archy/generate-reel';
import { generateTikTokVideo } from '@/ai/flows/archy/generate-tiktok-video';
import { getCrmMemory } from '@/ai/flows/listing-crm/get-crm-memory';
import { manageSocialPage } from '@/ai/flows/meta-pilot/manage-social-page';
import { generateMultiOffer } from '@/ai/flows/market-intelligence/generate-multi-offer';
import { createEmailCampaign } from '@/ai/flows/meta-pilot/create-email-campaign';
import { manageWhatsAppCampaign } from '@/ai/flows/listing-crm/manage-whatsapp-campaign';
import { createMetaCampaign } from '@/ai/flows/meta-pilot/create-meta-campaign';
import { syncPropertyFinderListing } from '@/ai/flows/developer-backend/sync-property-finder-listing';
import { syncBayutListing } from '@/ai/flows/developer-backend/sync-bayut-listing';
import { generatePaymentPlan } from '@/ai/flows/listing-crm/generate-payment-plan';
import { translateBrochure } from '@/ai/flows/archy/translate-brochure';
import { editYoutubeVideo } from '@/ai/flows/archy/edit-youtube-video';
import { investigateLead } from '@/ai/flows/listing-crm/investigate-lead';
import { generateKeywordPlan } from '@/ai/flows/market-intelligence/generate-keyword-plan';
import { generateVideoPresenter } from '@/ai/flows/archy/generate-video-presenter';
import { discoverEngine } from '@/ai/flows/market-intelligence/discover-engine';
import { dealAnalyzer } from '@/ai/flows/market-intelligence/deal-analyzer';
import { ugcScriptWriter } from '@/ai/flows/archy/ugc-script-writer';

const runToolSchema = z.object({
  toolId: z.string(),
  payload: z.any(),
});


const flowRunnerMap: { [key: string]: (payload: any) => Promise<any> } = {
    'insta-ads-designer': generateAdFromBrochure,
    'audience-creator': suggestTargetingOptions,
    'rebranding': rebrandBrochure,
    'pdf-editor': editPdf,
    'landing-pages': generateLandingPage,
    'instagram-content-creator': generateSocialPost,
    'investor-matching': matchInvestors,
    'ai-brand-creator': aiBrandCreator,
    'market-reports': generateMarketReport,
    'market-trends': getMarketTrends,
    'listing-generator': generateListing,
    'story-planner': generateStory,
    'reel-ads': generateReel,
    'tiktok-editor': generateTikTokVideo,
    'crm-assistant': getCrmMemory,
    'instagram-admin-ai': manageSocialPage,
    'multi-offer-builder': generateMultiOffer,
    'email-creator': createEmailCampaign,
    'whatsapp-manager': manageWhatsAppCampaign,
    'meta-ads-copilot': createMetaCampaign,
    'propertyfinder-sync': syncPropertyFinderListing,
    'bayut-sync': syncBayutListing,
    'payment-planner': generatePaymentPlan,
    'brochure-translator': translateBrochure,
    'youtube-video-editor': editYoutubeVideo,
    'commission-calculator': (payload) => Promise.resolve(payload),
    'lead-investigator': investigateLead,
    'keyword-planner': generateKeywordPlan,
    'ai-video-presenter': generateVideoPresenter,
    'discover-engine': discoverEngine,
    'deal-analyzer': dealAnalyzer,
    'ugc-script-writer': ugcScriptWriter,
};

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
    const validation = runToolSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid request body', details: validation.error.formErrors }, { status: 400 });
    }

    const { toolId, payload } = validation.data;
    
    const runner = flowRunnerMap[toolId];
    if (!runner) {
      return NextResponse.json({ error: `Tool with id "${toolId}" not found.` }, { status: 404 });
    }

    const result = await runner(payload);
    return NextResponse.json(result);

  } catch (e: any) {
    const errorMessage = e.message || 'An unexpected error occurred.';
    const toolIdMessage = body?.toolId ? ` in tool ${body.toolId}` : '';
    console.error(`Error running tool${toolIdMessage}: ${errorMessage}`, e);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
