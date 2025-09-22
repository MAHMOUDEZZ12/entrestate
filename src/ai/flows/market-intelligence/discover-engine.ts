'use server';

/**
 * @fileOverview An intelligent "reasoning engine" for the Discover feature.
 *
 * This flow takes a user's natural language query, uses an LLM to analyze the
 * user's intent, and then returns a structured list of suggested actions,
 * projects, or tools. This replaces the old keyword-based search.
 *
 * @export {function} discoverEngine - The main function to perform a discovery search.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DiscoverResultSchema = z.object({
  type: z.enum(['Tool', 'Project', 'Market', 'Creative']).describe("The type of result (e.g., a tool to use, a project to view)."),
  toolId: z.string().optional().describe("The ID of the suggested tool, if applicable."),
  projectId: z.string().optional().describe("The ID of the suggested project, if applicable."),
  query: z.string().optional().describe("The query for a market trend analysis, if applicable."),
  reasoning: z.string().describe("The AI's reasoning for why this result is relevant to the user's query."),
});

export const DiscoverEngineInputSchema = z.object({
  query: z.string(),
});
export type DiscoverEngineInput = z.infer<typeof DiscoverEngineInputSchema>;

export const DiscoverEngineOutputSchema = z.object({
  results: z.array(DiscoverResultSchema),
});
export type DiscoverEngineOutput = z.infer<typeof DiscoverEngineOutputSchema>;


const discoverEnginePrompt = ai.definePrompt({
    name: 'discoverEnginePrompt',
    input: { schema: DiscoverEngineInputSchema },
    output: { schema: DiscoverEngineOutputSchema },
    prompt: `You are an expert AI assistant for a real estate platform called Entrestate. Your job is to analyze a user's search query and suggest the most relevant actions, tools, or projects available on the platform.

    User's Query: "{{{query}}}"

    Available Tools:
    - Campaign Builder (toolId: 'campaign-builder'): Creates ad campaigns.
    - Insta Ads Designer (toolId: 'insta-ads-designer'): Designs Instagram ads from a brochure.
    - Market Reports (toolId: 'market-reports'): Generates in-depth PDF reports for a location.
    - Landing Page Builder (toolId: 'landing-pages'): Creates a web page for a property.
    - AI Video Presenter (toolId: 'ai-video-presenter'): Creates a video of an AI avatar speaking a script.
    - Market Library (toolId: 'projects-finder'): Search for projects in our database.

    Available Projects (Examples, use projectId if you recommend one):
    - Emaar Beachfront (projectId: 'emaar-beachfront')
    - Damac Hills 2 (projectId: 'damac-hills-2')

    **Your Task:**

    1.  **Analyze Intent:** Determine what the user is trying to accomplish.
        - Are they trying to *create* something visual or creative (e.g., "make a video", "design an ad")? Suggest a 'Creative' action and the most appropriate toolId.
        - Are they trying to use a specific *app* or function? Suggest a 'Tool'.
        - Are they looking for a specific *property*? Suggest a 'Project'.
        - Are they asking about a *location's performance*? Suggest a 'Market' analysis.
    2.  **Generate Results:** Create a list of 1-3 relevant results.
    3.  **Provide Reasoning:** For each result, write a short, clear 'reasoning' statement explaining *why* you are suggesting it.

    **Examples:**
    - If query is "create an ad for Emaar Beachfront", suggest the 'insta-ads-designer' tool and mention it can use the project's brochure.
    - If query is "damac hills 2", suggest the 'damac-hills-2' project and maybe the 'market-reports' tool for that area.
    - If query is "prices in Downtown Dubai", suggest a 'Market' analysis for "Downtown Dubai".
    - If query is "make a video pitch for my new listing", suggest a 'Creative' action with toolId 'ai-video-presenter'.

    Now, analyze the user's query and provide your suggested results.
    `,
});


export async function discoverEngine(input: DiscoverEngineInput): Promise<DiscoverEngineOutput> {
  const { output } = await discoverEnginePrompt(input);
  if (!output) {
    throw new Error("The AI failed to process the discovery query.");
  }

  // In a real implementation, you might use the AI's reasoning to then
  // fetch the real, up-to-date project/tool data from your database here.
  // For now, we are returning the direct AI output.
  return output;
}
