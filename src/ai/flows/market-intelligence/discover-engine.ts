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
import { google } from 'googleapis';

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
    const discoveryengine = google.discoveryengine('v1');

    try {
        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
        if (!projectId) {
            throw new Error("Google Cloud Project ID is not configured in environment variables (NEXT_PUBLIC_FIREBASE_PROJECT_ID).");
        }

        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });
        const authClient = await auth.getClient();
        google.options({ auth: authClient });
        
        const servingConfig = `projects/${projectId}/locations/global/collections/default_collection/dataStores/entrestate-kb_1722284949580/servingConfigs/default_serving_config`;

        const request = {
            servingConfig,
            query: query,
            pageSize: 10,
            contentSearchSpec: {
                summarySpec: {
                    summaryResultCount: 5,
                    ignoreAdversarialQuery: true,
                },
                extractiveContentSpec: {
                    maxExtractiveAnswerCount: 3,
                }
            }
        };

        const response = await discoveryengine.projects.locations.dataStores.servingConfigs.search(request);
        
        const results = response.data.results || [];
        
        const formattedResults = results.map((item: any) => {
            const doc = item.document;
            const structData = doc.structData || {};
            const derivedData = doc.derivedStructData || {};
            
            const title = derivedData.title || structData.title || 'No Title Available';
            const description = derivedData.snippets?.[0]?.snippet || 'No description available.';
            const url = derivedData.link || structData.link || '#';
            
            return {
                id: doc.id || `unknown-${Math.random()}`,
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
