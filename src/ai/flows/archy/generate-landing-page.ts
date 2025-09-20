
'use server';

/**
 * @fileOverview AI flow to generate a landing page for a specific project based on project details and user branding.
 *
 * This flow generates the HTML for a complete landing page, incorporating project details,
 * user branding preferences, and information from an optional brochure.
 *
 * @module AI/Flows/GenerateLandingPage
 *
 * @export {function} generateLandingPage - The main function to generate a landing page.
 * @export {type} GenerateLandingPageInput - The Zod schema for the input of the generateLandingPage flow.
 * @export {type} GenerateLandingPageOutput - The Zod schema for the output of the generateLandingPage flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the landing page generation flow.
 */
const GenerateLandingPageInputSchema = z.object({
  /**
   * The name of the project.
   */
  projectName: z.string().describe('The name of the project.'),
  /**
   * Detailed information about the project.
   */
  projectDetails: z
    .string()
    .describe('Detailed information about the project.'),
  /**
   * The chosen visual style or template for the landing page.
   */
  brandingStyle: z
    .string()
    .optional()
    .describe(
      'A comma-separated string of chosen visual styles for the landing page (e.g., "Modern & Minimalist, Luxury & Elegant").'
    ),
  /**
   * The number of content sections to include in the page.
   */
  numberOfSections: z.number().min(2).max(5).optional().describe('The number of content sections to generate (2-5).'),
  /**
   * An optional project brochure, encoded as a Base64 data URI.
   * @example "data:application/pdf;base64,..."
   */
  projectBrochureDataUri: z
    .string()
    .optional()
    .describe(
      "A project brochure, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  /**
   * A flag to indicate if we should only generate headline strategies.
   */
  generateHeadlinesOnly: z.boolean().optional().describe('If true, only generate headline strategies.'),
  /**
   * The user's selected headline strategy.
   */
  selectedHeadline: z.string().optional().describe('The headline from the user-selected strategy.'),
  /**
   * The user's selected call-to-action strategy.
   */
  selectedCta: z.string().optional().describe('The call-to-action from the user-selected strategy.'),
});
export type GenerateLandingPageInput = z.infer<
  typeof GenerateLandingPageInputSchema
>;

/**
 * Defines the schema for the output of the landing page generation flow.
 */
const GenerateLandingPageOutputSchema = z.object({
  /**
   * The generated HTML content for the landing page.
   */
  landingPageHtml: z
    .string()
    .optional()
    .describe('The generated HTML content for the landing page.'),
  /**
   * A list of suggested headline strategies.
   */
  headlineOptions: z.array(z.object({
      id: z.string(),
      strategy: z.string().describe('The name of the strategy (e.g., "Urgency Focused").'),
      headline: z.string().describe('The suggested headline.'),
      cta: z.string().describe('The suggested call to action text.'),
  })).optional(),
});
export type GenerateLandingPageOutput = z.infer<
  typeof GenerateLandingPageOutputSchema
>;

/**
 * An AI flow that generates the HTML for a landing page.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateLandingPageInput} input - The input data for generating the landing page.
 * @returns {Promise<GenerateLandingPageOutput>} A promise that resolves with the generated landing page HTML.
 */
export async function generateLandingPage(
  input: GenerateLandingPageInput
): Promise<GenerateLandingPageOutput> {
  return generateLandingPageFlow(input);
}

const headlinePrompt = ai.definePrompt({
    name: 'landingPageHeadlinePrompt',
    input: { schema: GenerateLandingPageInputSchema },
    output: { schema: GenerateLandingPageOutputSchema },
    prompt: `You are an expert real estate marketing strategist. Based on the following project details, generate 3 distinct strategies for the main headline and call-to-action (CTA) for a landing page.

    **Project Details:**
    - Project Name: {{{projectName}}}
    - Offer Details: {{{projectDetails}}}

    For each strategy, provide a name (e.g., "Urgency-Focused", "Luxury-Focused", "Benefit-Focused"), a compelling headline, and a clear call-to-action.
    `,
});


const landingPagePrompt = ai.definePrompt({
  name: 'landingPagePrompt',
  input: {schema: GenerateLandingPageInputSchema },
  output: {schema: GenerateLandingPageOutputSchema},
  prompt: `You are an expert web developer specializing in high-converting real estate landing pages. Your task is to generate a complete, single-file HTML document using Tailwind CSS for styling.

  **Project Details:**
  - Project Name: {{{projectName}}}
  - Offer Details: {{{projectDetails}}}
  - Branding Style(s): {{{brandingStyle}}}
  - Desired Page Structure: Create a page with {{{numberOfSections}}} main sections.
  {{#if projectBrochureDataUri}}
  - Project Brochure: {{media url=projectBrochureDataUri}}
  {{/if}}

  **Chosen Strategy:**
  - Headline: {{{selectedHeadline}}}
  - Call-to-Action: {{{selectedCta}}}

  **Instructions:**

  1.  **HTML Structure:** Create a full HTML5 document structure (\`<!DOCTYPE html>\`, \`<html>\`, \`<head>\`, \`<body>\`).
  2.  **Tailwind CSS:** Use the Tailwind CSS CDN script in the \`<head>\` for styling. Do not use any other CSS frameworks or custom CSS. \`<script src="https://cdn.tailwindcss.com"></script>\`
  3.  **Hero Section:** Create a visually impressive hero section using a high-quality placeholder image from picsum.photos as the background. It must feature the chosen **Headline** and **Call-to-Action**.
  4.  **Content Sections:** Based on the 'numberOfSections' parameter, build out the page.
      - If 2 sections: Hero + Lead Capture Form.
      - If 3 sections: Hero + Key Features + Lead Capture Form.
      - If 4 sections: Hero + Key Features + Gallery + Lead Capture Form.
      - If 5 sections: Hero + Key Features + Gallery + Location/Map + Lead Capture Form.
      - Use placeholder images from picsum.photos for the gallery and other sections.
  5.  **Lead Capture Form:** This is critical. Include a prominent lead capture form with fields for Name, Email, and Phone Number, and a clear "Register Your Interest" button.
  6.  **Branding:** Ensure the overall design (colors, fonts) reflects the specified 'Branding Style(s)'. If multiple styles are provided, blend them intelligently (e.g., Modern structure with Luxury accents).
  7.  **Output:** Return ONLY the complete, raw HTML code for the landing page in the landingPageHtml field. Do not include any explanations, markdown, or other text outside of the HTML itself.
  `,
});

const generateLandingPageFlow = ai.defineFlow(
  {
    name: 'generateLandingPageFlow',
    inputSchema: GenerateLandingPageInputSchema,
    outputSchema: GenerateLandingPageOutputSchema,
  },
  async input => {
    if (input.generateHeadlinesOnly) {
        const { output } = await headlinePrompt(input);
        if (!output || !output.headlineOptions) {
            throw new Error('Failed to generate headline strategies.');
        }
        return { headlineOptions: output.headlineOptions };
    }

    const {output} = await landingPagePrompt(input);
    if (!output) {
      throw new Error('Failed to generate landing page HTML.');
    }
    
    return output;
  }
);
