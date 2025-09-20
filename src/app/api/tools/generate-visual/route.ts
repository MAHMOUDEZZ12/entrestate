import { NextRequest, NextResponse } from 'next/server';
import { run } from 'genkit/flow';
import { generateModelVisualFlow } from '@/ai/flows/archy/generate-model-visual';
import { z } from 'zod';

const requestSchema = z.object({
  prompt: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedBody = requestSchema.parse(body);

    const flowResponse = await run(generateModelVisualFlow, validatedBody.prompt);

    return NextResponse.json(flowResponse, { status: 200 });
  } catch (error) {
    console.error('Error in /api/tools/generate-visual:', error);
    
    if (error instanceof z.ZodError) {
        return NextResponse.json({ message: 'Invalid request body', errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
