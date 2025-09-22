
'use server';

/**
 * @fileOverview The core "reasoning engine" for the Discover feature, powered by Vertex AI Search.
 *
 * This flow takes a user's natural language query, searches the proprietary
 * Entrestate knowledge base, and returns a structured list of results.
 * This is the primary interface to our most valuable data asset.
 *
 * @export {function} discoverEngine - The main function to perform a discovery search.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { vertexAI } from '@genkit-ai/googleai';


const DiscoverResultSchema = z.object({
  id: z.string(),
  title: z.string().describe("The title of the search result document."),
  description: z.string().describe("A summary or snippet of the document content."),
  url: z.string().url().describe("The full URL to the original document source."),
  type: z.enum(['Project', 'Market Report', 'Article', 'Unknown']).describe("The type of result."),
});

export const DiscoverEngineInputSchema = z.object({
  query: z.string(),
});
export type DiscoverEngineInput = z.infer<typeof DiscoverEngineInputSchema>;

export const DiscoverEngineOutputSchema = z.object({
  results: z.array(DiscoverResultSchema),
});
export type DiscoverEngineOutput = z.infer<typeof DiscoverEngineOutputSchema>;


const discoverEngineFlow = ai.defineFlow(
  {
    name: 'discoverEngineFlow',
    inputSchema: DiscoverEngineInputSchema,
    outputSchema: DiscoverEngineOutputSchema,
  },
  async ({ query }) => {
    
    try {
        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
        if (!projectId) {
            throw new Error("Google Cloud Project ID is not configured in environment variables (NEXT_PUBLIC_FIREBASE_PROJECT_ID).");
        }
        const dataStoreId = 'entrestate-kb_1722284949580';
        const dataStore = `projects/${projectId}/locations/global/collections/default_collection/dataStores/${dataStoreId}`;
        
        // IMPORTANT: Use vertexAI() for datastore/retriever integration.
        const discoverModel = vertexAI('gemini-1.5-pro-preview');

        const response = await ai.generate({
          model: discoverModel,
          tools: [ai.tool.retriever({ datastore })],
          prompt: query,
        });
        
        const references = response.references();
        
        if (!references || references.length === 0) {
            return { results: [] };
        }

        const formattedResults = references.map((item: any) => {
            const document = item.content[0].document;
            const metadata = document?.structData || {};

            return {
                id: document?.id || `unknown-${Math.random()}`,
                title: metadata?.title || 'No Title Available',
                description: document?.pageContent || 'No description available.',
                url: metadata?.uri || '#',
                type: 'Unknown' as const, // Type detection can be added later
            };
        });

        return {
            results: formattedResults,
        };

    } catch (error: any) {
        console.error("Vertex AI Search API Error:", error.message || error);
        const detail = error.cause?.message || error.message || 'An unknown error occurred while querying the Discovery Engine.';
        throw new Error(`Failed to query Discovery Engine: ${detail}`);
    }
  }
);


export async function discoverEngine(input: DiscoverEngineInput): Promise<DiscoverEngineOutput> {
  return await discoverEngineFlow(input);
}
