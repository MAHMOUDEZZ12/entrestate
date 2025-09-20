import { NextRequest, NextResponse } from 'next/server';
import { run } from 'genkit/flow';
import { investorMatchingFlow } from '@/ai/flows/market-intelligence/investor-matching';
import { z } from 'zod';

// We use a FormData schema because the file is sent as part of a multipart form
const requestSchema = z.object({
  propertyDetails: z.string(),
  clientList: z.instanceof(File),
});

// Helper to convert File to Data URI
const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const propertyDetails = formData.get('propertyDetails') as string;
    const clientListFile = formData.get('clientList') as File;

    if (!propertyDetails || !clientListFile) {
        return NextResponse.json({ message: 'Missing property details or client list file' }, { status: 400 });
    }

    // Convert the uploaded file to a Data URI for the Genkit flow
    const clientListDataUri = await fileToDataUri(clientListFile);

    // Run the Genkit flow with the validated and prepared input
    const flowResponse = await run(investorMatchingFlow, {
      propertyDetails,
      clientListDataUri,
    });

    return NextResponse.json(flowResponse, { status: 200 });
  } catch (error) {
    console.error('Error in /api/tools/investor-matching:', error);
    
    // Provide a more specific error message if it's a Zod validation error
    if (error instanceof z.ZodError) {
        return NextResponse.json({ message: 'Invalid request body', errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
