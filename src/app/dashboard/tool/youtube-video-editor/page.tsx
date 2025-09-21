
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Pen, Upload, Youtube, Download, Save, Scissors, Text, Music, Film, Brush } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { editYoutubeVideo } from '@/ai/flows/archy/edit-youtube-video';
import { fileToDataUri } from '@/lib/tools-client';
import { useCanvas } from '@/context/CanvasContext';
import { Textarea } from '@/components/ui/textarea';

const EditInCanvas = ({ videoUri, onSave, onCancel }: { videoUri: string; onSave: (instructions: string) => void; onCancel: () => void }) => {
    const [instructions, setInstructions] = useState('');

    const appendInstruction = (instruction: string) => {
        setInstructions(prev => prev ? `${prev}\n- ${instruction}` : `- ${instruction}`);
    };

    return (
        <div className="space-y-4">
            <video src={videoUri} controls className="w-full rounded-lg border bg-black" />
            <h3 className="font-semibold">Video Editing Instructions</h3>
            <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">Use smart tools to build your instructions or write them freely.</p>
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => appendInstruction("Trim the video to keep only the segment from 0:30 to 1:15.")}>
                        <Scissors className="mr-2 h-4 w-4"/> Trim Video
                    </Button>
                     <Button variant="outline" size="sm" onClick={() => appendInstruction("Add a text overlay at 0:10 saying '...'")}>
                        <Text className="mr-2 h-4 w-4"/> Add Text Overlay
                    </Button>
                     <Button variant="outline" size="sm" onClick={() => appendInstruction("Add upbeat, royalty-free background music.")}>
                        <Music className="mr-2 h-4 w-4"/> Change Music
                    </Button>
                     <Button variant="outline" size="sm" onClick={() => appendInstruction("Create a 30-second highlight reel of the best moments.")}>
                        <Film className="mr-2 h-4 w-4"/> Create Highlight Reel
                    </Button>
                </div>
            </div>
            <Textarea 
                placeholder={`Tell the AI what to change in this video...\n\ne.g., "Create a 2-minute highlight reel. Add my company logo at the start and end. Use upbeat background music."`}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={6}
            />
            <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onSave(instructions)}>Apply Edits</Button>
            </div>
        </div>
    )
}

export default function YoutubeVideoEditorPage() {
    const { toast } = useToast();
    const { openCanvas, closeCanvas } = useCanvas();
    const [isLoading, setIsLoading] = useState(false);
    const [resultData, setResultData] = useState<any | null>(null);
    const [sourceVideo, setSourceVideo] = useState<File | null>(null);
    const [sourceVideoUri, setSourceVideoUri] = useState<string | null>(null);
  
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            setSourceVideo(file);
            const dataUri = await fileToDataUri(file);
            setSourceVideoUri(dataUri);
            openCanvas(
                <EditInCanvas
                    videoUri={dataUri}
                    onCancel={closeCanvas}
                    onSave={(instructions) => {
                        handleGenerate(file, instructions);
                        closeCanvas();
                    }}
                />,
                `Editing: ${file.name}`,
                "Provide instructions for the AI to edit this video."
            );
        } else {
            toast({ title: 'Invalid File Type', description: 'Please upload a valid video file.', variant: 'destructive' });
        }
    };

    const handleGenerate = async (file: File, instructions: string) => {
        setIsLoading(true);
        setResultData(null);
        toast({
            title: 'Video Edit Queued...',
            description: 'The AI will apply your changes. This may take a few moments.',
        });
        try {
            const videoUri = await fileToDataUri(file);
            const payload = {
                sourceVideo: videoUri,
                editingInstructions: instructions,
                deepEditInstructions: instructions,
            };
            
            const response = await editYoutubeVideo(payload);
            setResultData(response);
             toast({ title: 'Video Edited & Saved!', description: 'Your new video is ready for review and has been saved to your assets.' });
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="AI YouTube Video Editor"
                description="Upload a video, open it in the Creative Canvas, and tell the AI how to edit it."
                icon={<Youtube className="h-8 w-8" />}
            />

            {!sourceVideoUri && !isLoading && !resultData && (
                <Card className="max-w-xl mx-auto">
                    <CardContent className="p-6">
                        <label
                            htmlFor="video-upload"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 transition-colors"
                        >
                            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold">Click to upload your Video</h3>
                            <p className="text-sm text-muted-foreground">or drag and drop it here</p>
                            <input id="video-upload" type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
                        </label>
                    </CardContent>
                </Card>
            )}
            
            {sourceVideoUri && !resultData && !isLoading && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Video Loaded</CardTitle>
                        <CardDescription>Your video is ready for the canvas. Click the button to start editing.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <video src={sourceVideoUri} controls className="w-full max-w-lg mx-auto border rounded-lg bg-black" />
                         <Button onClick={() => handleFileChange({ target: { files: [sourceVideo] } } as any)} className="mt-4">
                            <Pen className="mr-2 h-4 w-4" />
                            Open in Canvas
                         </Button>
                    </CardContent>
                 </Card>
            )}
            
             {isLoading && (
                 <div className="flex flex-col items-center justify-center text-center h-64">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="font-semibold">The AI is editing your video...</p>
                    <p className="text-sm text-muted-foreground">This may take a few moments depending on the length.</p>
                </div>
              )}

             {resultData && (
                <Card>
                    <CardHeader>
                        <CardTitle>Edited Video</CardTitle>
                        <CardDescription>Here is the final output from the AI. This has been saved to your Asset Library.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                         <video src={resultData.editedVideoDataUri} controls className="w-full max-w-lg mx-auto border rounded-lg bg-black" />
                         <div className="flex justify-center gap-2 mt-4">
                            <a href={resultData.editedVideoDataUri} download="edited-video.mp4">
                                <Button variant="outline"><Download className="mr-2"/> Download Video</Button>
                            </a>
                            <Button onClick={() => sourceVideo && handleFileChange({ target: { files: [sourceVideo] } } as any)}>
                                <Pen className="mr-2 h-4 w-4" /> Continue Editing
                            </Button>
                         </div>
                    </CardContent>
                </Card>
             )}
        </main>
    );
}
