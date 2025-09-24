'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {firebase} from '@genkit-ai/firebase';

// This is the production AI object, configured for the App Hosting environment.
// It is explicitly a server-side module.
export const ai = genkit({
  plugins: [
    firebase(),
    googleAI({
      apiVersion: 'v1',
    }),
  ],
});
