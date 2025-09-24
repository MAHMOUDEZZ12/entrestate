
'use server';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ai } from '@/ai/genkit';

// Import all flow functions directly here
import { generateAdFromBrochure } from '@/ai/flows/meta-pilot/generate-ad-from-brochure';
import { generateLandingPage } from '@/ai/flows/content/generate-landing-page';
import { rebrandBrochure } from '@/ai/flows/content/rebrand-brochure';
import { generateSocialPost } from '@/ai/flows/meta-pilot/generate-social-post';
import { suggestTargetingOptions } from '@/ai/flows/meta-pilot/suggest-targeting-options';
import { editPdf } from '@/ai/flows/content/edit-pdf';
import { matchInvestors } from '@/ai/flows/market-intelligence/match-investors';
import { aiBrandCreator } from '@/ai/flows/content/ai-brand-creator';
import { generateMarketReport } from '@/ai/flows/market-intelligence/generate-market-report';
import { getMarketTrends } from '@/ai/flows/market-intelligence/get-market-trends';
import { generateListing } from '@/ai/flows/listing-crm/generate-listing';
import { generateStory } from '@/ai/flows/content/generate-story';
import { generateReel } from '@/ai/flows/video/generate-reel';
import { generateTikTokVideo } from '@/ai/flows/video/generate-tiktok-video';
import { getCrmMemory } from '@/ai/flows/listing-crm/get-crm-memory';
import { manageSocialPage } from '@/ai/flows/meta-pilot/manage-social-page';
import { generateMultiOffer } from '@/ai/flows/market-intelligence/generate-multi-offer';
import { createEmailCampaign } from '@/ai/flows/meta-pilot/create-email-campaign';
import { manageWhatsAppCampaign } from '@/ai/flows/listing-crm/manage-whatsapp-campaign';
import { createMetaCampaign } from '@/ai/flows/meta-pilot/create-meta-campaign';
import { syncPropertyFinderListing } from '@/ai/flows/developer-backend/sync-property-finder-listing';
import { syncBayutListing } from '@/ai/flows/developer-backend/sync-bayut-listing';
import { generatePaymentPlan } from '@/ai/flows/listing-crm/generate-payment-plan';
import { translateBrochure } from '@/ai/flows/content/translate-brochure';
import { editYoutubeVideo } from '@/ai/flows/video/edit-youtube-video';
import { investigateLead } from '@/ai/flows/listing-crm/investigate-lead';
import { generateKeywordPlan } from '@/ai/flows/market-intelligence/generate-keyword-plan';
import { generateVideoPresenter } from '@/ai/flows/video/generate-video-presenter';
import { dealAnalyzer } from '@/ai/flows/market-intelligence/deal-analyzer';
import { ugcScriptWriter } from '@/ai/flows/content/ugc-script-writer';
import { leaseReviewerFlow } from '@/ai/flows/utility/lease-reviewer';
import { chatbotCreatorFlow } from '@/ai/flows/utility/chatbot-creator';
import { runMetaAutoPilot } from '@/ai/flows/meta-pilot/meta-auto-pilot';
import { getPaypalTransaction } from '@/ai/flows/developer-backend/get-paypal-transaction';
import { commissionCalculator } from '@/ai/flows/sales/commission-calculator';
import { scanForAlloyDB } from '@/ai/flows/developer-backend/scan-for-alloydb';
import { smartInputRouter } from '@/ai/flows/utility/smart-input-router';
import { dealsSmartPlanner } from '@/ai/flows/sales/deals-smart-planner';

const runToolSchema = z.object({
  toolId: z.string(),
  payload: z.any(),
});


const flowRunnerMap: { [key: string]: (payload: any) => Promise<any> } = {
    'insta-ads-designer': generateAdFromBrochure,
    'audience-creator': suggestTargetingOptions,
    'rebranding': rebrandBrochure,
    'pdf-editor-ai': editPdf,
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
    'commission-calculator': commissionCalculator,
    'lead-investigator': investigateLead,
    'keyword-planner': generateKeywordPlan,
    'ai-video-presenter': generateVideoPresenter,
    'deal-analyzer': dealAnalyzer,
    'ugc-script-writer': ugcScriptWriter,
    'lease-reviewer': leaseReviewerFlow,
    'chatbot-creator': chatbotCreatorFlow,
    'paypal-transaction': getPaypalTransaction,
    'alloydb-scanner': scanForAlloyDB,
    'prompt-library': (payload) => Promise.resolve({ message: "Executed from library", payload }), // Added for library execution
    'meta-auto-pilot': runMetaAutoPilot,
    'smart-input-router': smartInputRouter,
    'deals-smart-planner': dealsSmartPlanner,
};

// Map of tool IDs to their suggested next action
const nextActionMap: Record<string, { toolId: string; title: string; description: string; }> = {
    'listing-generator': {
        toolId: 'meta-ads-copilot',
        title: 'Create Ad Campaign',
        description: 'Your listing is ready. Would you like to create a Meta Ad Campaign to promote it?',
    },
    'landing-pages': {
        toolId: 'meta-ads-copilot',
        title: 'Drive Traffic',
        description: 'Your landing page is live. Let\'s create an ad campaign to drive traffic to it.',
    },
    // Add more cross-suite connections here
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
      return NextResponse.json({ error: `Tool with id "${toolId}" not found. Check the 'flowRunnerMap' in /api/run/route.ts.` }, { status: 404 });
    }

    const result = await runner(payload);
    
    // Check if there is a suggested next action for this tool
    const next_action = nextActionMap[toolId] || null;

    return NextResponse.json({ ...result, next_action });

  } catch (e: any) {
    const errorMessage = e.message || 'An unexpected error occurred.';
    const toolIdMessage = body?.toolId ? ` in tool ${body.toolId}` : '';
    console.error(`Error running tool${toolIdMessage}: ${errorMessage}`, e);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
