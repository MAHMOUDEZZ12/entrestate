
import { genkit } from 'genkit';
import { firebase } from '@genkit-ai/firebase';
import { googleAI } from '@genkit-ai/googleai';
import * as z from 'zod';

// This file is for local development and debugging with the Genkit developer UI.
// It is not used in the production build.

export default genkit({
  plugins: [
    firebase(),
    googleAI({
      apiVersion: 'v1',
    }),
  ],
});
