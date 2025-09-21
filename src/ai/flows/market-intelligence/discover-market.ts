
'use server';

/**
 * @fileOverview DEPRECATED - An AI flow to search the market using Vertex AI Search.
 *
 * This flow has been replaced by the more advanced, LLM-driven `discover-engine.ts`.
 * This file is kept for historical reference but is no longer actively used. The new
 * engine uses a reasoning model to determine user intent and dispatch to various
 * tools or data sources, rather than directly querying a single data store.
 *
 * @deprecated
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { google } from 'googleapis';

const discoveryengine = google.discoveryengine('v1');

/**
 * Defines the schema for the input of the market discovery flow.
 */
export const DiscoverMarketInputSchema = z.object({
  query: z.string().describe('The user\'s search query.'),
});
export type DiscoverMarketInput = z.infer<typeof DiscoverMarketInputSchema>;

/**
 * Defines the schema for the output of the market discovery flow.
 */
export const DiscoverMarketOutputSchema = z.object({
  results: z.array(z.any()).describe("A list of search results from Vertex AI Search."),
});
export type DiscoverMarketOutput = z.infer<typeof DiscoverMarketOutputSchema>;


/**
 * @deprecated Use the discoverEngineFlow instead.
 */
export async function discoverMarket(input: DiscoverMarketInput): Promise<DiscoverMarketOutput> {
  throw new Error("This flow is deprecated. Please use the 'discover-engine' flow.");
}


const discoverMarketFlow = ai.defineFlow(
  {
    name: 'discoverMarketFlow_DEPRECATED',
    inputSchema: DiscoverMarketInputSchema,
    outputSchema: DiscoverMarketOutputSchema,
  },
  async ({ query }) => {
    
    // In a real production environment, use `applicationDefault()` for authentication.
    // For local development, you may need to use `auth.fromJSON(keyFile)` with a service account key.
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    const projectId = 'mtcmartechgooodstage-456-326b5';
    const location = 'global';
    const datastoreId = 'entrestate_1758455640723';

    const servingConfig = `projects/${projectId}/locations/${location}/collections/default_collection/dataStores/${datastoreId}/servingConfigs/default_serving_config`;

    try {
        const response = await discoveryengine.projects.locations.collections.dataStores.servingConfigs.search({
            servingConfig: servingConfig,
            requestBody: {
                query: query,
                pageSize: 10,
            },
        });
        
        return {
            results: response.data.results || [],
        };

    } catch (error: any) {
        console.error("Vertex AI Search API Error:", error.response?.data || error.message);
        // In a real app, you might want more robust error handling or a fallback.
        // For now, we'll return an empty array on error.
        throw new Error(`Failed to query Vertex AI Search: ${error.message}`);
    }
  }
);
