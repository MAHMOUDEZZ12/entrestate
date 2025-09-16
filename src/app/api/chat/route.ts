import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit'; // Import our configured Genkit AI instance
import { Part } from 'genkit/ai';
import { AiChatResponse } from '@/lib/chat';

export async function POST(req: NextRequest) {
  try {
    const { text, imageDataUri } = await req.json();

    if (!text && !imageDataUri) {
      return NextResponse.json({ message: 'No text or image provided' }, { status: 400 });
    }

    const model = ai.get-default-model(); // Get the default model (gemini-1.5-pro)

    const requestParts: Part[] = [];

    if (text) {
      requestParts.push({ text: text });
    }

    if (imageDataUri) {
      // Genkit expects the data URI format directly for inline images
      requestParts.push({ image: { url: imageDataUri } });
    }

    // Send the multimodal content to the Gemini model
    const geminiResponse = await model.generate({ messages: [{ role: 'user', content: requestParts }] });

    // Extract the AI's response
    const aiResponseContent = geminiResponse.candidates[0].message.content;

    let aiResponseText: string = '';
    let aiResponseImageDataUri: string | undefined;

    // Process Gemini's multimodal response
    for (const part of aiResponseContent) {
      if (part.text) {
        aiResponseText += part.text;
      } else if (part.image && typeof part.image === 'object' && 'url' in part.image) {
        // If Gemini returns an image, assume it's a data URI or a publicly accessible URL
        // For simplicity, we'll just pass it through. In a real app, you might re-encode or store it.
        aiResponseImageDataUri = part.image.url;
      }
      // Handle other part types if necessary (e.g., data, media)
    }

    const chatResponse: AiChatResponse = {
      text: aiResponseText || 'No response text from AI.',
      imageDataUri: aiResponseImageDataUri,
    };

    return NextResponse.json(chatResponse, { status: 200 });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
