
'use server';

/**
 * @fileOverview The master AI orchestrator for creating and launching a Meta ad campaign.
 *
 * This flow acts as a "Pilot," taking a high-level goal and a project ID, and then
 * intelligently calling a sequence of other AI tools to build a complete campaign.
 * It suggests an audience, generates ad creative, and assembles the final campaign structure.
 *
 * @module AI/Flows/MetaAutoPilot
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { suggestTargetingOptions, SuggestTargetingOptionsOutput } from './suggest-targeting-options';
import { generateAdFromBrochure, GenerateAdFromBrochureOutput } from './generate-ad-from-brochure';
import { createMetaCampaign, CreateMetaCampaignOutput } from './create-meta-campaign';
import { adminDb } from '@/lib/firebaseAdmin';
import { MetaAutoPilotInputSchema, MetaAutoPilotOutputSchema, MetaAutoPilotInput, MetaAutoPilotOutput } from '@/types';


export async function runMetaAutoPilot(
  input: MetaAutoPilotInput,
  // This onDelta function is a pattern for streaming progress back to the client.
  onDelta: (chunk: { step: string, status: 'running' | 'completed' | 'error', data?: any }) => void
): Promise<MetaAutoPilotOutput> {

  try {
    // 1. Fetch Project Data using the authenticated service account
    onDelta({ step: 'data_fetch', status: 'running' });
    if (!adminDb) throw new Error("Firestore Admin DB not available.");
    const projectDoc = await adminDb.collection('projects_catalog').doc(input.projectId).get();
    if (!projectDoc.exists) throw new Error(`Project with ID "${input.projectId}" not found.`);
    const projectData = projectDoc.data() as any;
    onDelta({ step: 'data_fetch', status: 'completed', data: projectData });


    // 2. Suggest Targeting Options
    onDelta({ step: 'audience', status: 'running' });
    const audienceSuggestions: SuggestTargetingOptionsOutput = await suggestTargetingOptions({ projectId: input.projectId });
    onDelta({ step: 'audience', status: 'completed', data: audienceSuggestions });

    // 3. Generate Ad Creative
    onDelta({ step: 'creative', status: 'running' });
    const adCreative: GenerateAdFromBrochureOutput = await generateAdFromBrochure({
        projectName: projectData.name,
        focusArea: 'The luxury lifestyle and investment potential.',
        toneOfVoice: 'Professional and aspirational',
    });
    onDelta({ step: 'creative', status: 'completed', data: adCreative });

    // 4. Create the final Campaign Structure
    onDelta({ step: 'assembly', status: 'running' });
    const finalCampaignPlan: CreateMetaCampaignOutput = await createMetaCampaign({
        campaignGoal: input.campaignGoal,
        projectBrochureDataUri: adCreative.adDesign, // Use the generated ad design as the 'brochure'
        budget: 500,
        durationDays: 14,
    });
    onDelta({ step: 'assembly', status: 'completed', data: finalCampaignPlan });

    // 5. Final Output
    const result: MetaAutoPilotOutput = {
      status: 'Campaign Plan Assembled Successfully.',
      finalCampaignId: finalCampaignPlan.publishedCampaignId,
      audienceStrategy: audienceSuggestions,
      adCreative: adCreative,
      finalCampaignPlan: finalCampaignPlan,
    };
    
    onDelta({ step: 'done', status: 'completed', data: result });

    return result;

  } catch (e: any) {
    onDelta({ step: 'error', status: 'error', data: e.message });
    // Re-throw the error to be caught by the API route handler
    throw e;
  }
}

// NOTE: This file is a conceptual representation. The actual implementation
// would need a streaming API endpoint (like a WebSocket or Server-Sent Events)
// for the `onDelta` callback to communicate with the client in real-time.
// The `runMetaAutoPilot` function itself is a server-side orchestrator.
// For the purpose of this simulation, we will call it from a standard API route
// and await its full completion, though the UI will simulate the steps.
