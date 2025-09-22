
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
import { GoogleAuth } from 'google-auth-library';


const discoveryengine = google.discoveryengine('v1');


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
        const auth = new GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });
        const authClient = await auth.getClient();
        google.options({ auth: authClient });

        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
        if (!projectId) {
            throw new Error("Google Cloud Project ID is not configured in environment variables (NEXT_PUBLIC_FIREBASE_PROJECT_ID).");
        }
        
        const location = 'global';
        // This is the production-ready Datastore ID for our knowledge base.
        const datastoreId = 'entrestate-kb_1722284949580'; 

        const servingConfig = `projects/${projectId}/locations/${location}/collections/default_collection/dataStores/${datastoreId}/servingConfigs/default_serving_config`;

        const response = await discoveryengine.projects.locations.collections.dataStores.servingConfigs.search({
            servingConfig: servingConfig,
            requestBody: {
                query: query,
                pageSize: 10,
                contentSearchSpec: {
                  summarySpec: {
                    summaryResultCount: 5,
                    includeCitations: true,
                  },
                   extractiveContentSpec: {
                    maxExtractiveAnswerCount: 3,
                  },
                }
            },
        });
        
        const searchResults = response.data.results || [];
        const formattedResults = searchResults.map(item => {
            const doc = item.document?.derivedStructData;
            // Use optional chaining and provide default values to prevent crashes
            const title = (doc?.title as string) || (item.document?.structData?.title as string) || 'No Title';
            const description = (item.document?.structData?.metaDescription as string) || doc?.snippets?.[0]?.snippet || 'No description available.';
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
        console.error("Vertex AI Search API Error:", error.response?.data?.error || error.message);
        // Provide a more specific error message back to the client
        const detail = error.response?.data?.error?.message || error.message;
        throw new Error(`Failed to query Discovery Engine: ${detail}`);
    }
  }
);


export async function discoverEngine(input: DiscoverEngineInput): Promise<DiscoverEngineOutput> {
  return await discoverEngineFlow(input);
}
