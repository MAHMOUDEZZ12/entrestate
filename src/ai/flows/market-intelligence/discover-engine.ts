
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
  title: z.string(),
  description: z.string(),
  url: z.string().optional(),
  type: z.enum(['Project', 'Market Report', 'Article']).describe("The type of result."),
});

export const DiscoverEngineInputSchema = z.object({
  query: z.string(),
});
export type DiscoverEngineInput = z.infer<typeof DiscoverEngineInputSchema>;

export const DiscoverEngineOutputSchema = z.object({
  results: z.array(z.any()),
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

    const projectId = 'mtcmartechgooodstage-456-326b5';
    const location = 'global';
    // This is the production-ready Datastore ID for our knowledge base.
    const datastoreId = '2901569404259008512'; 

    const servingConfig = `projects/${projectId}/locations/${location}/collections/default_collection/dataStores/${datastoreId}/servingConfigs/default_serving_config`;

    try {
        const response = await discoveryengine.projects.locations.collections.dataStores.servingConfigs.search({
            servingConfig: servingConfig,
            requestBody: {
                query: query,
                pageSize: 10,
                contentSearchSpec: {
                  summarySpec: {
                    summaryResultCount: 3,
                    includeCitations: true,
                  },
                   extractiveContentSpec: {
                    maxExtractiveAnswerCount: 3,
                  },
                }
            },
        });
        
        return {
            results: response.data.results || [],
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
