
import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const { text, history } = await req.json();

    if (!text) {
      return NextResponse.json({ message: 'No text provided' }, { status: 400 });
    }

    // Use the modern, unified ai.generate() function.
    // The system prompt guides the model to act as a real estate assistant.
    // The model is smart enough to use its general knowledge and the context
    // from the chat history without needing a manually defined 'lookup' tool.
    const response = await ai.generate({
      model: 'gemini-1.5-pro-preview',
      system: "You are a helpful real estate assistant for the Entrestate platform. You are an expert in the Dubai market. Answer the user's questions concisely and professionally. If you don't know the answer, say so.",
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
