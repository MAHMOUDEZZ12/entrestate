
import {
    Mic, FileText, ImageIcon, Video, Bot, BarChart3, Palette, LayoutTemplate
} from 'lucide-react';
import React from 'react';

export interface PromptCardProps {
    title: string;
    description: string;
    iconName: string; // Changed from React.ReactNode to string
    color: string;
    mediaType: 'Audio' | 'Document' | 'Image' | 'Text' | 'Video';
    toolId: string;
    payload?: Record<string, any>;
}

export const promptLibrary: PromptCardProps[] = [
    {
        title: 'Ad Copy from Video',
        description: 'Write a creative ad copy based on a video.',
        iconName: 'Video',
        color: 'bg-blue-500',
        mediaType: 'Video',
        toolId: 'ugc-script-writer',
        payload: {
            topic: 'Ad copy from uploaded video',
            vibe: 'Exciting & Upbeat',
            hookStyle: 'Question-based',
        }
    },
    {
        title: 'Add an object to a photo',
        description: 'Generates a new image with the reference photo and object.',
        iconName: 'ImageIcon',
        color: 'bg-pink-500',
        mediaType: 'Image',
        toolId: 'images-hq-ai',
    },
    {
        title: 'Advertising Campaign',
        description: 'The AI is tasked to create advertising campaigns for its clients.',
        iconName: 'BarChart3',
        color: 'bg-teal-500',
        mediaType: 'Text',
        toolId: 'meta-ads-copilot',
    },
    {
        title: 'Animal Information Chatbot',
        description: 'The animal assistant chatbot answers questions about animals.',
        iconName: 'Bot',
        color: 'bg-teal-500',
        mediaType: 'Text',
        toolId: 'ai-assistant',
    },
    {
        title: 'Audio Summarization',
        description: 'Summarize an audio file.',
        iconName: 'Mic',
        color: 'bg-orange-500',
        mediaType: 'Audio',
        toolId: 'brochure-translator' // Placeholder
    },
    {
        title: 'Audio Transcription',
        description: 'Generate the transcription for a piece of audio recording.',
        iconName: 'Mic',
        color: 'bg-orange-500',
        mediaType: 'Audio',
        toolId: 'brochure-translator' // Placeholder
    },
    {
        title: 'Blog Post Creator',
        description: 'Generate a blog post from a simple topic.',
        iconName: 'FileText',
        color: 'bg-pink-500',
        mediaType: 'Document',
        toolId: 'instagram-content-creator'
    },
    {
        title: 'Brand Kit Creator',
        description: 'Create a full brand kit from a company name and description.',
        iconName: 'Palette',
        color: 'bg-indigo-500',
        mediaType: 'Text',
        toolId: 'ai-brand-creator',
    },
    {
        title: 'Landing Page from Brochure',
        description: 'Generate a full landing page from an uploaded brochure.',
        iconName: 'LayoutTemplate',
        color: 'bg-sky-500',
        mediaType: 'Document',
        toolId: 'landing-pages',
    }
];
