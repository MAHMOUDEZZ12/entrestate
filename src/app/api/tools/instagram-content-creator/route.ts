import { NextRequest, NextResponse } from 'next/server';
import { run } from 'genkit/flow';
import { instagramContentCreatorFlow } from '@/ai/flows/meta-pilot/instagram-content-creator';
import { z } from 'zod';

const requestSchema = z.object({
  topic: z.string(),
  platform: z.enum(['Instagram', 'Facebook', 'LinkedIn', 'X']),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedBody = requestSchema.parse(body);

    const flowResponse = await run(instagramContentCreatorFlow, validatedBody);

    return NextResponse.json(flowResponse, { status: 200 });
  } catch (error) {
    console.error('Error in /api/tools/instagram-content-creator:', error);
    
    if (error instanceof z.ZodError) {
        return NextResponse.json({ message: 'Invalid request body', errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
