
'use server';

/**
 * @fileOverview An AI flow that acts as an intelligent search and discovery engine.
 *
 * This flow takes a user's query, searches both the live Firestore project catalog
 * and the available suite tools, and returns a structured list of relevant results.
 *
 * @export {function} discoverEngineFlow - The main function to perform a discovery search.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { adminDb } from '@/lib/firebaseAdmin';
import { tools as clientTools } from '@/lib/tools-client';
import type { Project } from '@/types';

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
    id: z.string(),
    thumbnailUrl: z.string().optional().nullable(),
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


export const discoverEngineFlow = ai.defineFlow(
  {
    name: 'discoverEngineFlow',
    inputSchema: discoverEngineInputSchema,
    outputSchema: discoverEngineOutputSchema,
  },
  async ({ query }) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!adminDb) {
      throw new Error("Firestore Admin DB is not available.");
    }

    const results: z.infer<typeof discoverEngineOutputSchema>['results'] = [];

    // 1. Search for projects in Firestore
    const projectsRef = adminDb.collection('projects_catalog');
    const snapshot = await projectsRef.get();
    const allProjects: Project[] = [];
    snapshot.forEach(doc => {
      allProjects.push({ id: doc.id, ...doc.data() } as Project);
    });

    const matchedProjects = allProjects.filter(p => 
        p.name.toLowerCase().includes(lowerCaseQuery) ||
        p.developer.toLowerCase().includes(lowerCaseQuery) ||
        (p.area && p.area.toLowerCase().includes(lowerCaseQuery))
    ).slice(0, 5); // Limit to 5 project results

    matchedProjects.forEach(p => {
        results.push({
            type: 'Project',
            project: {
                id: p.id,
                name: p.name,
                developer: p.developer,
                area: p.area || 'N/A',
                priceFrom: (p.priceFrom as string) || 'N/A',
                status: p.status || 'N/A',
                thumbnailUrl: p.thumbnailUrl,
            },
            reasoning: `Found a project in the Market Library matching your query.`
        });
    });

    // 2. Search for relevant tools
    const matchedTools = clientTools.filter(t => 
        t.title.toLowerCase().includes(lowerCaseQuery) ||
        t.description.toLowerCase().includes(lowerCaseQuery) ||
        (t.categories.some(c => c.toLowerCase().includes(lowerCaseQuery)))
    ).slice(0, 2); // Limit to 2 tool results

    matchedTools.forEach(t => {
        results.push({
            type: 'Tool',
            toolId: t.id,
            reasoning: `The "${t.title}" tool can help you with tasks related to your query.`
        });
    });
    
    // 3. (Future) Add Market Trend search if no projects/tools are found
    if (results.length === 0) {
        // This could be extended to suggest a Market Trend search as a fallback
    }

    return { results };
  }
);
