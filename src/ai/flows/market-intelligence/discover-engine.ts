
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
    
    // Use Application Default Credentials for authentication in Google Cloud environments
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) {
        throw new Error("Google Cloud Project ID is not configured.");
    }
    const location = 'global';
    // This is the production-ready Datastore ID for our knowledge base.
    const datastoreId = '2908016390688473088'; 

    const servingConfig = `projects/${projectId}/locations/${location}/collections/default_collection/dataStores/${datastoreId}/servingConfigs/default_serving_config`;

    try {
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
            return {
                id: item.document?.id || 'unknown-id',
                title: doc?.title as string || 'No Title',
                description: item.document?.structData?.metaDescription as string || doc?.snippets?.[0]?.snippet || 'No description available.',
                url: doc?.link || '#',
                type: 'Unknown' as const, // Type detection can be added later
            };
        });

        return {
            results: formattedResults,
        };

    } catch (error: any) {
        console.error("Vertex AI Search API Error:", error.response?.data || error.message);
        throw new Error(`Failed to query Vertex AI Search: ${error.message}`);
    }
  }
);


export async function discoverEngine(input: DiscoverEngineInput): Promise<DiscoverEngineOutput> {
  return await discoverEngineFlow(input);
}
