
'use server';

/**
 * @fileOverview DEPRECATED - This file contains the old, non-AI discover engine logic.
 * It directly queries Firestore and filters client-side tools based on keywords.
 * It has been replaced by the new Genkit-powered reasoning flow in `discover-engine.ts`.
 *
 * @deprecated Use `discoverEngine` from `discover-engine.ts` instead.
 */

import { adminDb } from '@/lib/firebaseAdmin';
import { tools as clientTools } from '@/lib/tools-client';
import type { Project } from '@/types';

// This is the input type expected by the function.
type DiscoverEngineInput = {
  query: string;
};

// This function directly queries Firestore and filters tools.
export async function discoverEngineFlow(
  { query }: DiscoverEngineInput
): Promise<{ results: any[] }> {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (!adminDb) {
    throw new Error("Firestore Admin DB is not available.");
  }

  const results: any[] = [];

  // 1. Search for projects in Firestore
  const projectsRef = adminDb.collection('projects_catalog');
  const snapshot = await projectsRef.get();
  const allProjects: Project[] = [];
  snapshot.forEach(doc => {
    allProjects.push({ id: doc.id, ...doc.data() } as Project);
  });

  const matchedProjects = allProjects.filter(p => 
      (p.name && p.name.toLowerCase().includes(lowerCaseQuery)) ||
      (p.developer && p.developer.toLowerCase().includes(lowerCaseQuery)) ||
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
  
  // 3. Suggest a Market Trend search if a location is mentioned
  if (results.length === 0 && (lowerCaseQuery.includes('marina') || lowerCaseQuery.includes('downtown'))) {
     results.push({
          type: 'Market',
          query: query,
          reasoning: `No direct projects or tools found. Here's a market trend analysis for "${query}".`
      });
  }

  return { results };
}
