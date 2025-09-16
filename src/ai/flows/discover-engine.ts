
'use server';

/**
 * @fileOverview An AI flow that acts as an intelligent search and discovery engine.
 *
 * This flow takes a user's query, uses a reasoning model to understand the user's
 * intent, and then returns a structured list of relevant results, which can include
 * tools, projects, or market topics.
 *
 * @export {function} discoverEngineFlow - The main function to perform a discovery search.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const discoverEngineInputSchema = z.object({
  query: z.string().describe("The user's search query."),
});

const ToolResultSchema = z.object({
  type: z.literal('Tool'),
  toolId: z.string().describe("The unique ID of a relevant tool."),
  reasoning: z.string().describe("A brief explanation of why this tool is relevant."),
});

const ProjectResultSchema = z.object({
  type: z.literal('Project'),
  project: z.object({
    name: z.string(),
    developer: z.string(),
    area: z.string(),
    priceFrom: z.string(),
    status: z.string(),
  }),
  reasoning: z.string().describe("A brief explanation of why this project is relevant."),
});

const MarketResultSchema = z.object({
  type: z.literal('Market'),
  query: z.string().describe("The refined market topic to display a trend for."),
  reasoning: z.string().describe("A brief explanation of why this market trend is relevant."),
});


const discoverEngineOutputSchema = z.object({
  results: z.array(z.union([ToolResultSchema, ProjectResultSchema, MarketResultSchema])).describe("A list of structured search results."),
});


const discoverEnginePrompt = ai.definePrompt({
    name: 'discoverEnginePrompt',
    input: { schema: discoverEngineInputSchema },
    output: { schema: discoverEngineOutputSchema },
    prompt: `You are the intelligent search and discovery engine for the Super Seller Suite, a real estate AI platform. Your task is to analyze a user's query and return a structured list of the most relevant results.

    User Query: "{{{query}}}"

    Available Tools:
    - insta-ads-designer: Creates Instagram ads from a brochure.
    - audience-creator: Finds ideal buyer personas for a project.
    - rebranding: Rebrands brochures with user's logo and colors.
    - landing-pages: Builds a high-converting landing page for a project.
    - market-reports: Generates PDF reports on market trends and pricing.
    - projects-finder: Searches the public Market Library for verified projects.

    Instructions:
    1.  **Analyze Intent**: Determine what the user is trying to accomplish. Are they looking for a tool, a specific project, or market information?
    2.  **Return Structured Results**: Based on the intent, generate a list of 2-3 relevant results.
        -   If the query mentions a task (e.g., "create an ad"), return a 'Tool' result with the most relevant 'toolId'.
        -   If the query mentions a specific, well-known project name (e.g., "Emaar Beachfront", "Damac Hills 2"), return a 'Project' result with mock but realistic data for that project.
        -   If the query asks about a market trend or location (e.g., "prices in Dubai Marina"), return a 'Market' result with the query as the topic.
    3.  **Provide Reasoning**: For each result, provide a brief, helpful 'reasoning' string explaining why it's a good match for the user's query.

    Example:
    -   Query: "How do I make an ad for Sobha Hartland?"
    -   Results:
        1.  Type: 'Tool', toolId: 'insta-ads-designer', reasoning: "This tool is perfect for creating ads from project details."
        2.  Type: 'Project', project: { name: 'Sobha Hartland', ... }, reasoning: "Here are the details for the project you mentioned."
    
    Now, process the user's query and return the best results.`,
});


export const discoverEngineFlow = ai.defineFlow(
  {
    name: 'discoverEngineFlow',
    inputSchema: discoverEngineInputSchema,
    outputSchema: discoverEngineOutputSchema,
  },
  async ({ query }) => {
    const { output } = await discoverEnginePrompt({ query });
    if (!output) {
      throw new Error('The AI failed to process the search query.');
    }
    return output;
  }
);
