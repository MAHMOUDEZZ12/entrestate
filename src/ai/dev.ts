import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { enableFirebaseTelemetry } from '@genkit-ai/firebase'; // Corrected import for telemetry
import * as z from 'zod';
import { adminApp } from '@/lib/firebaseAdmin';

// Safe to enable telemetry here too (no-op if not configured)
enableFirebaseTelemetry();

export default genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1',
    }),
    // Removed: firebase({ app: adminApp }) - as it no longer exists in this package version
  ],
});
