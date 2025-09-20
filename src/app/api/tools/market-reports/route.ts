import { NextRequest, NextResponse } from 'next/server';
import { run } from 'genkit/flow';
import { marketReportFlow } from '@/ai/flows/market-intelligence/market-reports';
import { z } from 'zod';

const requestSchema = z.object({
  location: z.string(),
  audience: z.enum(['Investor', 'Buyer', 'Seller']),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedBody = requestSchema.parse(body);

    const flowResponse = await run(marketReportFlow, validatedBody);

    return NextResponse.json(flowResponse, { status: 200 });
  } catch (error) {
    console.error('Error in /api/tools/market-reports:', error);
    
    if (error instanceof z.ZodError) {
        return NextResponse.json({ message: 'Invalid request body', errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
