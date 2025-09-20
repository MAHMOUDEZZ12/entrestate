
'use server';

/**
 * @fileOverview An AI flow to analyze a real estate deal's investment potential.
 *
 * This flow takes property, loan, and income details and returns a
 * comprehensive financial analysis with key investment metrics.
 *
 * @module AI/Flows/DealAnalyzer
 *
 * @export {function} dealAnalyzer - The main function to analyze the deal.
 * @export {type} DealAnalyzerInput - The Zod schema for the input.
 * @export {type} DealAnalyzerOutput - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

/**
 * Defines the schema for the input of the deal analyzer flow.
 */
export const DealAnalyzerInputSchema = z.object({
  propertyAddress: z.string().describe("The full address of the property."),
  purchasePrice: z.number().positive().describe("The total purchase price of the property."),
  downPaymentPercentage: z.number().min(0).max(100).describe("The down payment as a percentage of the purchase price."),
  interestRate: z.number().min(0).describe("The annual interest rate for the loan."),
  loanTermYears: z.number().positive().describe("The term of the loan in years."),
  expectedMonthlyRent: z.number().positive().describe("The projected gross monthly rental income."),
  monthlyExpenses: z.number().min(0).describe("Estimated total monthly expenses (taxes, insurance, HOA, maintenance)."),
  closingCosts: z.number().min(0).describe("Estimated closing costs."),
});
export type DealAnalyzerInput = z.infer<typeof DealAnalyzerInputSchema>;


/**
 * Defines the schema for the output of the deal analyzer flow.
 */
export const DealAnalyzerOutputSchema = z.object({
  analysisSummary: z.string().describe("A narrative summary of the deal's viability, including a recommendation."),
  monthlyMortgagePayment: z.number().describe("The calculated principal and interest monthly mortgage payment."),
  monthlyCashFlow: z.number().describe("The estimated net cash flow per month."),
  cashOnCashROI: z.number().describe("The estimated cash-on-cash return on investment (annualized)."),
  capitalizationRate: z.number().describe("The estimated capitalization rate (cap rate)."),
  totalInitialInvestment: z.number().describe("The total cash required to close the deal (down payment + closing costs)."),
});
export type DealAnalyzerOutput = z.infer<typeof DealAnalyzerOutputSchema>;


const dealAnalyzerPrompt = ai.definePrompt({
  name: 'dealAnalyzerPrompt',
  input: {schema: DealAnalyzerInputSchema},
  output: {schema: DealAnalyzerOutputSchema},
  prompt: `You are an expert real estate investment analyst. Analyze the following deal and provide a professional financial breakdown.

  **Property Details:**
  - Address: {{{propertyAddress}}}
  - Purchase Price: {{{purchasePrice}}}
  - Down Payment: {{{downPaymentPercentage}}}%
  - Interest Rate: {{{interestRate}}}%
  - Loan Term: {{{loanTermYears}}} years
  - Monthly Rent: {{{expectedMonthlyRent}}}
  - Monthly Expenses: {{{monthlyExpenses}}}
  - Closing Costs: {{{closingCosts}}}

  **Instructions:**

  1.  **Calculate the Down Payment Amount**: purchasePrice * (downPaymentPercentage / 100).
  2.  **Calculate the Loan Amount**: purchasePrice - Down Payment Amount.
  3.  **Calculate the Monthly Mortgage Payment (Principal & Interest)**: Use the standard formula. Let monthly interest rate 'r' = (interestRate / 100) / 12 and number of payments 'n' = loanTermYears * 12. The formula is: Loan Amount * [r(1+r)^n] / [(1+r)^n - 1].
  4.  **Calculate the Total Initial Investment**: Down Payment Amount + closingCosts.
  5.  **Calculate the Monthly Cash Flow**: expectedMonthlyRent - monthlyMortgagePayment - monthlyExpenses.
  6.  **Calculate the Annual Cash Flow**: monthlyCashFlow * 12.
  7.  **Calculate the Cash on Cash ROI**: (Annual Cash Flow / Total Initial Investment) * 100.
  8.  **Calculate the Net Operating Income (NOI)**: (expectedMonthlyRent - monthlyExpenses) * 12.
  9.  **Calculate the Capitalization Rate (Cap Rate)**: (NOI / purchasePrice) * 100.

  10. **Write an Analysis Summary**: Based on your calculations, provide a professional, narrative summary. State whether the deal looks promising, marginal, or risky, and explain why, referencing the key metrics you calculated.
  
  Return all calculated values and the summary in the specified output format.
  `,
});

const dealAnalyzerFlow = ai.defineFlow(
  {
    name: 'dealAnalyzerFlow',
    inputSchema: DealAnalyzerInputSchema,
    outputSchema: DealAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await dealAnalyzerPrompt(input);
    if (!output) {
      throw new Error('The AI failed to analyze the deal.');
    }
    return output;
  }
);

/**
 * An AI flow that analyzes a real estate deal.
 *
 * @param {DealAnalyzerInput} input - The input data for the deal.
 * @returns {Promise<DealAnalyzerOutput>} A promise that resolves with the deal analysis.
 */
export async function dealAnalyzer(
  input: DealAnalyzerInput
): Promise<DealAnalyzerOutput> {
  return dealAnalyzerFlow(input);
}
