
'use server';

/**
 * @fileOverview AI flow to generate a one-week social media strategy from a given topic or URL.
 *
 * This flow creates a comprehensive, one-week social media plan, including multiple post
 * variations, a tiered hashtag strategy, and specific image suggestions.
 *
 * @module AI/Flows/GenerateSocialPost
 *
 * @export {function} generateSocialPost - The main function to generate a social media strategy.
 * @export {type} GenerateSocialPostInput - The Zod schema for the input of the flow.
 * @export {type} GenerateSocialPostOutput - The Zod schema for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the social post generation flow.
 */
const GenerateSocialPostInputSchema = z.object({
  /**
   * The source content for the post, which can be a URL or a simple topic description.
   */
  source: z
    .string()
    .describe('A URL or topic to generate the social media post from.'),
  /**
   * The target social media platform for the post.
   * @example "Twitter", "LinkedIn", "Facebook"
   */
  platform: z
    .string()
    .describe(
      'The social media platform (e.g., Twitter, LinkedIn, Facebook).'
    ),
  /**
   * The desired tone of voice for the post.
   * @example "Professional", "Humorous", "Urgent"
   */
  tone: z.string().describe('The desired tone of voice for the post.'),
});
export type GenerateSocialPostInput = z.infer<
  typeof GenerateSocialPostInputSchema
>;

/**
 * Defines the schema for the output of the social post generation flow.
 */
const GenerateSocialPostOutputSchema = z.object({
  posts: z.array(z.object({
    day: z.string().describe("The day of the week for the post (e.g., 'Monday')."),
    postContent: z.string().describe('The generated social media post content for that day.'),
    imageSuggestion: z.string().describe('A suggestion for an accompanying image for that day\'s post.'),
  })).describe("A list of posts for a 7-day week."),
  hashtagStrategy: z.object({
    primary: z.array(z.string()).describe("5-7 primary, high-volume hashtags."),
    secondary: z.array(z.string()).describe("5-7 secondary, niche-specific hashtags."),
    location: z.array(z.string()).describe("3-5 location-based hashtags."),
  }).describe("A comprehensive hashtag strategy."),
});
export type GenerateSocialPostOutput = z.infer<
  typeof GenerateSocialPostOutputSchema
>;

/**
 * An AI flow that generates a social media post from a topic or URL.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateSocialPostInput} input - The input data for generating the post.
 * @returns {Promise<GenerateSocialPostOutput>} A promise that resolves with the generated social post content.
 */
export async function generateSocialPost(
  input: GenerateSocialPostInput
): Promise<GenerateSocialPostOutput> {
  return generateSocialPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialPostPrompt',
  input: {schema: GenerateSocialPostInputSchema},
  output: {schema: GenerateSocialPostOutputSchema},
  prompt: `You are an expert real estate social media strategist. Your task is to create a complete, 7-day content plan based on the provided source.

  **Source:** {{{source}}}
  **Platform:** {{{platform}}}
  **Tone:** {{{tone}}}

  **Instructions:**

  1.  **Weekly Content Plan:** Generate a unique, engaging post for each day of the week (Monday to Sunday) and place it in the 'posts' output field. Each post should offer a different angle or highlight a different aspect of the source content.
  2.  **Image Suggestions:** For each daily post, provide a specific and compelling image suggestion that would visually complement the text.
  3.  **Hashtag Strategy:** Create a comprehensive hashtag strategy divided into three tiers:
      *   **Primary:** 5-7 high-volume, broad-appeal hashtags relevant to real estate and the platform.
      *   **Secondary:** 5-7 niche-specific hashtags related to the source content (e.g., #luxurycondo, #firsttimebuyer).
      *   **Location:** 3-5 hashtags for the specific city or neighborhood mentioned or implied in the source (e.g., #miamirealestate, #downtownliving).

  Structure the output to be a complete, ready-to-use strategy for a busy real estate professional.
  `,
});

const generateSocialPostFlow = ai.defineFlow(
  {
    name: 'generateSocialPostFlow',
    inputSchema: GenerateSocialPostInputSchema,
    outputSchema: GenerateSocialPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("Failed to generate social media content.");
    }
    return output;
  }
);
