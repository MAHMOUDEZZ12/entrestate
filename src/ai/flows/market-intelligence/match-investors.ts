
'use server';

/**
 * @fileOverview An AI flow to match investment properties with suitable clients from a database.
 *
 * This flow analyzes property details and a client database to identify the best investor matches,
 * providing a ranked list with justifications.
 *
 * @module AI/Flows/MatchInvestors
 *
 * @export {function} matchInvestors - The main function to find investor matches.
 * @export {type} MatchInvestorsInput - The Zod schema for the input of the matchInvestors flow.
 * @export {type} MatchInvestorsOutput - The Zod schema for the output of the matchInvestors flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the schema for the input of the investor matching flow.
 */
const MatchInvestorsInputSchema = z.object({
  clientDatabase: z
    .string()
    .describe(
      "A client database, as a data URI (likely CSV) that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  propertyType: z
    .string()
    .describe('The type of property (e.g., Duplex, Commercial).'),
  location: z.string().describe('The location of the property.'),
  price: z.number().describe('The asking price of the property.'),
  capRate: z.number().describe('The capitalization rate of the property.'),
  investmentThesis: z
    .string()
    .describe(
      'The primary strategy for this investment (e.g., Value-Add, Turnkey Rental).'
    ),
  keyFeatures: z
    .string()
    .describe('Key features or selling points of the property for investors.'),
});

export type MatchInvestorsInput = z.infer<typeof MatchInvestorsInputSchema>;

/**
 * Defines the schema for the output of the investor matching flow.
 */
const MatchInvestorsOutputSchema = z.object({
  matches: z.array(
    z.object({
      name: z.string().describe('The name of the matched investor.'),
      email: z.string().email().describe('The email of the matched investor.'),
      matchScore: z
        .number()
        .describe(
          'A score from 0 to 100 indicating the strength of the match.'
        ),
      reasoning: z
        .string()
        .describe(
          'A brief explanation for why this investor is a good match.'
        ),
    })
  ),
});
export type MatchInvestorsOutput = z.infer<typeof MatchInvestorsOutputSchema>;

/**
 * An AI flow that matches an investment property with the best clients.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {MatchInvestorsInput} input - The input data for matching investors.
 * @returns {Promise<MatchInvestorsOutput>} A promise that resolves with the list of matched investors.
 */
export async function matchInvestors(
  input: MatchInvestorsInput
): Promise<MatchInvestorsOutput> {
  return matchInvestorsFlow(input);
}

const matchInvestorsPrompt = ai.definePrompt({
  name: 'matchInvestorsPrompt',
  input: {schema: MatchInvestorsInputSchema},
  output: {schema: MatchInvestorsOutputSchema},
  prompt: `You are an expert real estate investment analyst. Your task is to analyze the provided investment property and client database (in CSV format) to identify the top 3-5 best-fit investors.

  **Investment Property Details:**
  - Property Type: {{{propertyType}}}
  - Location: {{{location}}}
  - Price: \${{{price}}}
  - Cap Rate: {{{capRate}}}%
  - Investment Thesis: {{{investmentThesis}}}
  - Key Features: {{{keyFeatures}}}

  **Client Database:**
  {{media url=clientDatabase}}

  Analyze the client database, considering their past purchases, stated interests, budget, and risk tolerance. Return a ranked list of the top matches. For each match, provide their name, email, a match score (out of 100), and a brief reasoning for the match.
  `,
});

const matchInvestorsFlow = ai.defineFlow(
  {
    name: 'matchInvestorsFlow',
    inputSchema: MatchInvestorsInputSchema,
    outputSchema: MatchInvestorsOutputSchema,
  },
  async input => {
    const {output} = await matchInvestorsPrompt(input);
    return output!;
  }
);
