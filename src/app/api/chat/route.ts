
import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';

// 1. Define a schema for our knowledge base tool.
const lookupKnowledgeTool = ai.defineTool(
  {
    name: 'lookupKnowledge',
    description: 'Looks up information in the user\'s private knowledge base (uploaded documents, brochures, etc.). Use this to answer specific questions about projects, brand guidelines, or any other information the user has provided.',
    inputSchema: z.object({
      query: z.string().describe("The user's question or topic to search for."),
    }),
    outputSchema: z.string().describe("A summary of the relevant information found, or a message indicating no information was found."),
  },
  async ({ query }) => {
    // 2. In a real application, this would query a vector database (e.g., Firestore Vector Search)
    // containing the indexed content of the user's uploaded documents.
    // For this prototype, we'll simulate a lookup.
    console.log(`Simulating knowledge base lookup for query: "${query}"`);
    
    // Simulate finding a relevant document
    if (query.toLowerCase().includes('emaar beachfront')) {
      return "Found document: Emaar_Beachfront_Brochure.pdf. Key details: Luxury 1-4 bedroom apartments, private beach access, stunning views of the Palm Jumeirah. Price from AED 2.5M.";
    }
    if (query.toLowerCase().includes('brand')) {
        return "Found document: Brand_Guide.pdf. Primary color: #003366 (Navy Blue), Secondary color: #FFD700 (Gold). Logo is a stylized falcon.";
    }

    return `No specific information found for "${query}". You can try asking about broader topics or upload relevant documents to the knowledge base.`;
  }
);

export async function POST(req: NextRequest) {
  try {
    const { text, history } = await req.json();

    if (!text) {
      return NextResponse.json({ message: 'No text provided' }, { status: 400 });
    }

    // 3. Use the generate function with the new tool and a system prompt.
    const response = await ai.generate({
      model: 'gemini-1.5-pro-preview', // A model that supports tool use
      tools: [lookupKnowledgeTool],
      system: "You are a helpful real estate assistant. Use your knowledge base to answer questions whenever possible. If you use the knowledge base, cite the source of your information.",
      prompt: text,
      history: history, // Pass chat history for context
    });

    const aiResponseText = response.text();

    return NextResponse.json({ text: aiResponseText }, { status: 200 });

  } catch (error) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
