
'use server';

/**
 * @fileOverview An AI flow to generate a video of a presenter speaking a script.
 *
 * This flow can either take a pre-existing character image or generate a new one,
 * then uses a video generation model to animate the character speaking the provided script.
 * It also generates a separate high-quality audio file of the speech.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';
import { googleAI } from '@genkit-ai/googleai';
import { GenerateVideoPresenterInputSchema, GenerateVideoPresenterOutputSchema, GenerateVideoPresenterInput, GenerateVideoPresenterOutput } from '@/ai/flows/types';


/**
 * An AI flow that generates a video presenter.
 *
 * @param {GenerateVideoPresenterInput} input - The input data for the video generation.
 * @returns {Promise<GenerateVideoPresenterOutput>} A promise that resolves with the video and audio data.
 */
export async function generateVideoPresenter(input: GenerateVideoPresenterInput): Promise<GenerateVideoPresenterOutput> {
    return await generateVideoPresenterFlow(input);
}


async function toWav(pcmData: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
        const writer = new wav.Writer({ channels: 1, sampleRate: 24000, bitDepth: 16 });
        const bufs: Buffer[] = [];
        writer.on('error', reject);
        writer.on('data', (d) => bufs.push(d));
        writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));
        writer.write(pcmData);
        writer.end();
    });
}

// Helper to fetch and encode the video
async function getVideoDataUri(videoUrl: string): Promise<string> {
    const fetch = (await import('node-fetch')).default;
    const apiKey = process.env.GEMINI_API_KEY || process.env.VERTEX_AI_API_KEY;
    if (!apiKey) throw new Error("API key is missing.");

    const videoDownloadResponse = await fetch(`${videoUrl}&key=${apiKey}`);
    if (!videoDownloadResponse.ok) {
        throw new Error(`Failed to download video: ${videoDownloadResponse.statusText}`);
    }
    const videoBuffer = await videoDownloadResponse.arrayBuffer();
    return `data:video/mp4;base64,${Buffer.from(videoBuffer).toString('base64')}`;
}


const generateVideoPresenterFlow = ai.defineFlow(
  {
    name: 'generateVideoPresenterFlow',
    inputSchema: GenerateVideoPresenterInputSchema,
    outputSchema: GenerateVideoPresenterOutputSchema,
  },
  async (input) => {
    let characterImage = input.characterImageUri;

    // 1. Generate character image if not provided
    if (!characterImage) {
        if (!input.characterDescription) {
            throw new Error("Either a character image or description must be provided.");
        }
        const { media } = await ai.generate({
            model: googleAI.model('imagen-4.0-fast-generate-001'),
            prompt: `Professional studio portrait of a real estate agent: ${input.characterDescription}. Photorealistic, high-detail.`
        });
        if (!media?.url) throw new Error("Failed to generate character image.");
        characterImage = media.url;
    }

    // 2. Generate the video in parallel with the audio
    const [videoResult, audioResult] = await Promise.all([
        // Generate Video using Veo
        ai.generate({
            model: googleAI.model('veo-2.0-generate-001'),
            prompt: [
                { media: { url: characterImage } },
                { text: `Make this person speak the following script in a professional, engaging manner, as if presenting to a client. The person should have natural facial expressions and mouth movements that match the words. Do not add background music.\n\nScript: "${input.script}"` }
            ],
            config: {
                aspectRatio: "9:16",
                personGeneration: 'allow_adult',
            }
        }),
        // Generate Audio using TTS
        ai.generate({
            model: googleAI.model('gemini-2.5-flash-preview-tts'),
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Algenib' } } },
            },
            prompt: input.script,
        })
    ]);
    
    // Process video result
    if (!videoResult.operation) throw new Error("Video generation did not return an operation.");
    let operation = videoResult.operation;
    while(!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
    }
    if (operation.error) throw new Error(`Video generation failed: ${operation.error.message}`);
    const video = operation.output?.message?.content.find(p => !!p.media);
    if (!video || !video.media?.url) throw new Error("Generated video not found in operation result.");
    const videoDataUri = await getVideoDataUri(video.media.url);

    // Process audio result
    if (!audioResult.media) throw new Error("Audio generation failed to return media.");
    const audioBuffer = Buffer.from(audioResult.media.url.substring(audioResult.media.url.indexOf(',') + 1), 'base64');
    const wavBase64 = await toWav(audioBuffer);

    return {
      videoUrl: videoDataUri,
      audioDataUri: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
