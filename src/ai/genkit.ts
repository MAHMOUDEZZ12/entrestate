'use client';
import {genkit} from 'genkit';
import {vertexAI} from '@genkit-ai/googleai';
import {firebase} from '@genkit-ai/firebase';

export const ai = genkit({
  plugins: [
    firebase(),
    vertexAI({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      location: 'us-central1',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
