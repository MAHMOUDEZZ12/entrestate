
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2, Bot, BrainCircuit, Wand2, Code, Copy } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { CodeBlock } from '@/components/code-block';

export default function ChatbotCreatorPage() {
  const [botName, setBotName] = useState('');
  const [persona, setPersona] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState<string[]>([]);
  const [model, setModel] = useState('gemini-1.5-pro');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!botName || !persona) {
      setError('Please provide a name and persona for your chatbot.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    // Simulate API call to Genkit flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setResult({
        botId: `bot_${Date.now()}`,
        embedCode: `<script src="https://entrestate.com/embed.js" data-bot-id="bot_${Date.now()}" async defer></script>`
    });
    
    setIsLoading(false);
    toast({
        title: "Chatbot Created!",
        description: "Your new AI assistant is ready to be embedded on your site."
    });
  };
  
  const copyCode = () => {
    if (result?.embedCode) {
        navigator.clipboard.writeText(result.embedCode);
        toast({ title: "Copied to clipboard!" });
    }
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Chatbot Creator"
        description="Build and train a custom AI chatbot for your website or app."
        icon={<Bot className="h-8 w-8" />}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Chatbot Configuration</CardTitle>
              <CardDescription>Define the core identity and knowledge of your new AI assistant.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bot-name">Chatbot Name</Label>
                  <Input 
                    id="bot-name" 
                    placeholder="e.g., 'Emaar Properties Assistant'" 
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="persona">Persona & Instructions</Label>
                  <Textarea
                    id="persona"
                    placeholder="Describe your chatbot's personality and primary goal. e.g., 'You are a helpful and friendly assistant for Emaar Properties. Your goal is to answer questions about new projects and capture lead information...'"
                    value={persona}
                    onChange={(e) => setPersona(e.target.value)}
                    className="h-40"
                  />
                </div>

                <div className="space-y-2">
                    <Label>AI Model</Label>
                    <Select value={model} onValueChange={setModel}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an AI model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro (Recommended)</SelectItem>
                            <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                {error && <p className="text-destructive text-sm mt-4">{error}</p>}
            </CardContent>
            <CardFooter>
                 <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Create Chatbot
                </Button>
            </CardFooter>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8 sticky top-24">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                Connect Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Power your chatbot with your private data. Select the documents from your{' '}
                <Link href="/dashboard/brand" className="font-semibold text-primary hover:underline">
                  Brand & Assets
                </Link>
                {' '}that this chatbot should use for its knowledge.
              </p>
              {/* This would be a dynamic list fetched from the user's assets */}
              <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <Label htmlFor="kb-emaar-brochure" className="font-normal">Emaar_Beachfront_Brochure.pdf</Label>
                    <Switch id="kb-emaar-brochure" />
                 </div>
                 <div className="flex items-center justify-between">
                    <Label htmlFor="kb-damac-pricelist" className="font-normal">DAMAC_Pricelist_Q3.pdf</Label>
                    <Switch id="kb-damac-pricelist" />
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {result && (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Your Chatbot is Ready!</CardTitle>
                <CardDescription>Copy the code below and paste it just before the closing `&lt;/body&gt;` tag on your website.</CardDescription>
            </CardHeader>
            <CardContent>
                <CodeBlock>{result.embedCode}</CodeBlock>
            </CardContent>
        </Card>
      )}
    </main>
  );
}

    