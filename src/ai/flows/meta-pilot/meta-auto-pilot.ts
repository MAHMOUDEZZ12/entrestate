
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
import { suggestTargetingOptions } from './suggest-targeting-options';
import { generateAdFromBrochure } from '@/ai/flows/meta-pilot/generate-ad-from-brochure';
import { createMetaCampaign } from './create-meta-campaign';
import { getProjectById } from '@/services/database'; 
import { 
    MetaAutoPilotInputSchema, 
    MetaAutoPilotOutputSchema, 
    MetaAutoPilotInput, 
    MetaAutoPilotOutput,
} from '@/ai/flows/types';


const metaAutoPilotFlow = ai.defineFlow(
    {
        name: 'metaAutoPilotFlow',
        inputSchema: MetaAutoPilotInputSchema,
        outputSchema: MetaAutoPilotOutputSchema,
    },
    async (input) => {
        
        // 1. Fetch Project Data using the new database service
        const projectData = await getProjectById(input.projectId);
        if (!projectData) {
            throw new Error(`Project with ID "${input.projectId}" not found.`);
        }

        // 2. Suggest Targeting Options
        const audienceSuggestions = await suggestTargetingOptions({ projectId: input.projectId });

        // 3. Generate Ad Creative
        const adCreative = await generateAdFromBrochure({
            projectName: projectData.name,
            focusArea: 'The luxury lifestyle and investment potential.',
            toneOfVoice: 'Professional and aspirational',
        });

        // 4. Create the final Campaign Structure
        const finalCampaignPlan = await createMetaCampaign({
            campaignGoal: input.campaignGoal,
            projectBrochureDataUri: adCreative.adDesign, // Use the generated ad design as the 'brochure'
            budget: 500, // Example budget
            durationDays: 14, // Example duration
        });

        // 5. Final Output
        const result: MetaAutoPilotOutput = {
            status: 'Campaign Plan Assembled Successfully.',
            finalCampaignId: finalCampaignPlan.publishedCampaignId,
            audienceStrategy: audienceSuggestions,
            adCreative: adCreative,
            finalCampaignPlan: finalCampaignPlan,
        };

        return result;
    }
);

export async function runMetaAutoPilot(input: MetaAutoPilotInput): Promise<MetaAutoPilotOutput> {
    return metaAutoPilotFlow(input);
}
