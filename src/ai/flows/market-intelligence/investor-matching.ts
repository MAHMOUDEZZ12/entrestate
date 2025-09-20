'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define the structured input for the investor matching flow
export const InvestorMatchingInputSchema = z.object({
  propertyDetails: z.string().describe("A detailed description of the property to be matched, including location, size, price, and key features."),
  clientListDataUri: z.string().describe("A data URI of the client list in CSV format. The CSV should contain headers like 'name', 'budget', 'preferred_location', 'investment_goals', etc."),
});

// Define the structured output for a single matched investor
export const MatchedInvestorSchema = z.object({
  investorName: z.string().describe("The name of the matched investor from the CSV."),
  matchScore: z.number().min(0).max(100).describe("A score from 0 to 100 indicating the strength of the match."),
  reason: z.string().describe("A concise, AI-generated reason explaining why this investor is a strong match for the property."),
});

// Define the overall output of the flow
export const InvestorMatchingOutputSchema = z.object({
  matches: z.array(MatchedInvestorSchema).describe("A ranked list of the top 3-5 best-fit investors."),
});

// Define the Genkit flow for investor matching
export const investorMatchingFlow = ai.defineFlow(
  {
    name: 'investorMatchingFlow',
    inputSchema: InvestorMatchingInputSchema,
    outputSchema: InvestorMatchingOutputSchema,
    experimental: {
      stream: true, // This allows for real-time updates in the future
    },
  },
  async (input) => {
    const { propertyDetails, clientListDataUri } = input;

    // In a real implementation, you would parse the CSV from the data URI.
    // For this example, we will include a sample of the CSV content in the prompt.
    // A robust implementation would use a library like 'papaparse'.

    const prompt = `
      You are an expert real estate investment analyst. Your task is to find the best-fit investors for a specific property from a provided client list.

      **Property Details:**
      ${propertyDetails}

      **Client List (CSV Content):**
      "name,budget,preferred_location,investment_goals
      John Doe,2500000,Dubai Marina,High-yield rental
      Jane Smith,5000000,Downtown Dubai,Long-term appreciation
      Sam Wilson,1800000,JVC,Affordable family home
      Emily Brown,10000000,Palm Jumeirah,Luxury vacation property"
      
      Analyze the client list against the property details. Identify the top 3 investors who are the best match. For each match, provide a score from 0-100 and a concise reason for the match based on their budget, location preference, and investment goals.

      Return the results in the required JSON format.
    `;

    const llmResponse = await ai.get-default-model().generate({
      prompt: prompt,
      output: {
        format: 'json',
        schema: InvestorMatchingOutputSchema,
      },
    });

    const structuredResponse = llmResponse.output();
    if (!structuredResponse) {
      throw new Error("Failed to get a structured response from the AI.");
    }
    
    return structuredResponse;
  }
);
