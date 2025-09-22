
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
import { googleAI } from '@genkit-ai/googleai';


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
        
        // Use the Genkit googleAI plugin's search capability, which handles authentication automatically.
        const response = await googleAI.search({
            datastore: `projects/${projectId}/locations/global/collections/default_collection/dataStores/entrestate-kb_1722284949580`,
            query: query,
            contentConfig: {
                summarySpec: {
                    summaryResultCount: 5,
                    ignoreAdversarialQuery: true,
                },
                extractiveContentSpec: {
                    maxExtractiveAnswerCount: 3,
                }
            }
        });
        
        const formattedResults = response.results.map(item => {
            const doc = item.document?.derivedStructData;
            // Use optional chaining and provide default values to prevent crashes
            const title = (doc?.title as string) || (item.document?.structData?.title as string) || 'No Title';
            const description = doc?.snippets?.[0]?.snippet || 'No description available.';
            const url = (doc?.link as string) || '#';
            
            return {
                id: item.document?.id || `unknown-${Math.random()}`,
                title,
                description,
                url,
                type: 'Unknown' as const, // Type detection can be added later
            };
        });

        return {
            results: formattedResults,
        };

    } catch (error: any) {
        console.error("Vertex AI Search API Error:", error.response?.data?.error || error.message, error);
        // Provide a more specific error message back to the client
        const detail = error.response?.data?.error?.message || error.message;
        throw new Error(`Failed to query Discovery Engine: ${detail}`);
    }
  }
);


export async function discoverEngine(input: DiscoverEngineInput): Promise<DiscoverEngineOutput> {
  return await discoverEngineFlow(input);
}
