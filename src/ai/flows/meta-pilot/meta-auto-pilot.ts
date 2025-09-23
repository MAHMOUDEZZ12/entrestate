
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
import { generateAdFromBrochure } from '../content/generate-ad-from-brochure';
import { createMetaCampaign } from './create-meta-campaign';
import { getProjectById } from '@/services/database'; 
import { 
    MetaAutoPilotInputSchema, 
    MetaAutoPilotOutputSchema, 
    MetaAutoPilotInput, 
    MetaAutoPilotOutput,
    SuggestTargetingOptionsInputSchema,
    SuggestTargetingOptionsOutputSchema,
    GenerateAdFromBrochureOutputSchema,
    CreateMetaCampaignInputSchema,
    CreateMetaCampaignOutputSchema,
} from '@/ai/flows/types';


// Define tools that the main flow can call
const suggestTargetingTool = ai.defineTool(
  {
    name: 'suggestTargetingOptions',
    description: 'Suggests targeting options for an ad campaign based on project details.',
    inputSchema: SuggestTargetingOptionsInputSchema,
    outputSchema: SuggestTargetingOptionsOutputSchema,
  },
  async (input) => suggestTargetingOptions(input)
);

const generateCreativeTool = ai.defineTool(
  {
    name: 'generateAdCreative',
    description: 'Generates ad creatives (copy and visuals) from project information.',
    inputSchema: z.object({
        projectName: z.string(),
        focusArea: z.string(),
        toneOfVoice: z.string(),
    }),
    outputSchema: GenerateAdFromBrochureOutputSchema,
  },
  async (input: z.infer<typeof GenerateAdFromBrochureOutputSchema>) => generateAdFromBrochure(input)
);

const assembleCampaignTool = ai.defineTool(
  {
    name: 'assembleMetaCampaign',
    description: 'Assembles the final Meta campaign structure with ad sets and creatives.',
    inputSchema: CreateMetaCampaignInputSchema,
    outputSchema: CreateMetaCampaignOutputSchema,
  },
  async (input) => createMetaCampaign(input)
);

const metaAutoPilotFlow = ai.defineFlow(
    {
        name: 'metaAutoPilotFlow',
        inputSchema: MetaAutoPilotInputSchema,
        outputSchema: MetaAutoPilotOutputSchema,
        tools: [suggestTargetingTool, generateCreativeTool, assembleCampaignTool],
    },
    async (input) => {
        
        // 1. Fetch Project Data using the new database service
        const projectData = await getProjectById(input.projectId);
        if (!projectData) {
            throw new Error(`Project with ID "${input.projectId}" not found.`);
        }

        // 2. Suggest Targeting Options
        const audienceSuggestions = await suggestTargetingTool({ projectId: input.projectId });

        // 3. Generate Ad Creative
        const adCreative = await generateCreativeTool({
            projectName: projectData.name,
            focusArea: 'The luxury lifestyle and investment potential.',
            toneOfVoice: 'Professional and aspirational',
        });

        // 4. Create the final Campaign Structure
        const finalCampaignPlan = await assembleCampaignTool({
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
