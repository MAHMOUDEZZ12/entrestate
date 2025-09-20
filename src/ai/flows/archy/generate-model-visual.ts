'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Input schema for the visual generation flow
export const GenerateModelVisualInputSchema = z.object({
  prompt: z.string().describe("A detailed text prompt for the image generation model."),
});

// Output schema for the flow
export const GenerateModelVisualOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a Base64 data URI."),
});

// The Genkit Flow
export const generateModelVisualFlow = ai.defineFlow(
  {
    name: 'generateModelVisualFlow',
    inputSchema: GenerateModelVisualInputSchema,
    outputSchema: GenerateModelVisualOutputSchema,
  },
  async ({ prompt }) => {
    
    const imageGenModel = ai.get-model('imagen-4.0-fast-generate-001');

    const response = await imageGenModel.generate({
      prompt: prompt,
      output: {
        format: 'data_uri',
      },
    });
    
    const generatedImage = response.output();
    if (!generatedImage) {
      throw new Error("The AI failed to generate a valid image.");
    }
    
    return { imageDataUri: generatedImage.data_uri };
  }
);
