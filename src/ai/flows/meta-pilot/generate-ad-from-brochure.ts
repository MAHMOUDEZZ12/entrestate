
'use server';

/**
 * @fileOverview AI-powered ad generation from project brochures or a simple project name.
 *
 * This flow generates compelling ad copy and a visually appealing ad design based on a project brochure (if provided) or just a project name, along with branding guidelines.
 *
 * @module AI/Flows/GenerateAdFromBrochure
 *
 * @export {function} generateAdFromBrochure - The main function to generate an ad.
 * @export {type} GenerateAdFromBrochureInput - The Zod schema for the input of the flow.
 * @export {type} GenerateAdFromBrochureOutput - The Zod schema for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the ad generation flow.
 */
const GenerateAdFromBrochureInputSchema = z.object({
  /**
   * The project brochure file, encoded as a Base64 data URI. This is now optional.
   * @example "data:application/pdf;base64,..."
   */
  brochureDataUri: z
    .string()
    .optional()
    .describe(
      "A project brochure, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  /**
   * The name of the project. Used if no brochure is provided.
   */
  projectName: z.string().optional().describe('The name of the project.'),
  /**
   * Additional information or key details about the project.
   */
  additionalInformation: z
    .string()
    .optional()
    .describe('Additional key details about the project.'),
  /**
   * The specific aspect of the project the ad should highlight (e.g., luxury, family-friendly).
   */
  focusArea: z
    .string()
    .describe('The specific part of the project to focus on in the ad.'),
  /**
   * The desired tone of voice for the ad copy (e.g., professional, friendly, urgent).
   */
  toneOfVoice: z.string().describe('The desired tone of voice for the ad.'),
});
export type GenerateAdFromBrochureInput = z.infer<
  typeof GenerateAdFromBrochureInputSchema
>;

/**
 * Defines the schema for the output of the ad generation flow.
 */
const GenerateAdFromBrochureOutputSchema = z.object({
  /**
   * The generated ad copy, tailored to the specified focus and tone.
   */
  adCopy: z.string().describe('The generated ad copy.'),
  /**
   * The generated ad design, returned as a Base64 data URI.
   */
  adDesign: z.string().describe('The data URI of the generated ad design.'),
  /**
   * The generated landing page design, returned as a Base64 data URI.
   */
  landingPage: z
    .string()
    .describe('The data URI of the generated landing page.'),
});
export type GenerateAdFromBrochureOutput = z.infer<
  typeof GenerateAdFromBrochureOutputSchema
>;

/**
 * An AI flow that generates ad copy and designs from a project brochure or name.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateAdFromBrochureInput} input - The input data for generating the ad.
 * @returns {Promise<GenerateAdFromBrochureOutput>} A promise that resolves with the generated ad copy and design.
 */
export async function generateAdFromBrochure(
  input: GenerateAdFromBrochureInput
): Promise<GenerateAdFromBrochureOutput> {
  return generateAdFromBrochureFlow(input);
}

const generateAdFromBrochurePrompt = ai.definePrompt({
  name: 'generateAdFromBrochurePrompt',
  input: {schema: GenerateAdFromBrochureInputSchema},
  output: {schema: GenerateAdFromBrochureOutputSchema},
  prompt: `You are an AI-powered advertising expert for real estate. Your task is to generate compelling ad copy and a visually appealing ad design (as a one-page brochure PDF). The user's brand name, colors, and contact info should be inferred from the brochure itself if provided.

Here are the project details:

Focus Area: {{{focusArea}}}
{{#if projectName}}
Project Name: {{{projectName}}}
{{/if}}
{{#if additionalInformation}}
Additional Information: {{{additionalInformation}}}
{{/if}}
{{#if brochureDataUri}}
Brochure: {{media url=brochureDataUri}}
{{else}}
Instruction: If no brochure is provided, create a high-quality, professional one-page brochure for the project name given. Use placeholder text and images that match the focus area.
{{/if}}

Here are the branding guidelines:

Tone of Voice: {{{toneOfVoice}}}

Generate ad copy that is engaging, persuasive, and tailored to the specified focus area. Create an ad design as a one-page PDF brochure that is visually consistent with a modern, professional brand identity. Also, generate a landing page design to show off the listing.

Ensure that the ad copy and design align with the project details and branding guidelines.`,
});

const generateAdFromBrochureFlow = ai.defineFlow(
  {
    name: 'generateAdFromBrochureFlow',
    inputSchema: GenerateAdFromBrochureInputSchema,
    outputSchema: GenerateAdFromBrochureOutputSchema,
  },
  async input => {
    const {output} = await generateAdFromBrochurePrompt(input);
    return output!;
  }
);
