
'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import * as firebase from '@genkit-ai/firebase';

// This is the production AI object, configured for the App Hosting environment.
// It is explicitly a server-side module.
export const ai = genkit({
  plugins: [
    (firebase as any).default(),
    googleAI({
      apiVersion: 'v1',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
