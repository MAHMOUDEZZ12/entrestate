
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Bot, Send, Loader2, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { secretCodes } from '@/lib/codes';

type Message = {
    from: 'ai' | 'user';
    text: string | React.ReactNode;
};

const InitialAssistantMessage = () => (
    <div>
        <p className="font-semibold mb-2">Hello! I'm your AI co-pilot.</p>
        <p className="mb-3">Train me by uploading your brochures, price lists, and market reports to the <Link href="/me/brand" className="underline font-semibold hover:text-primary">Brand & Assets</Link> page. This gives me a knowledge base to help you better.</p>
        <p className="text-sm">Ask a question, or tell me what you'd like to do.</p>
    </div>
);

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'ai', text: <InitialAssistantMessage /> },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
          scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isPopoverOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    setIsPopoverOpen(true);

    const userMessage: Message = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    const matchedCode = secretCodes.find(c => c.code.toLowerCase() === currentInput.toLowerCase());
    if (matchedCode) {
        const rewardMessage: Message = {
            from: 'ai',
            text: `Secret code accepted! Here is your reward: ${matchedCode.reward}`
        };
        setMessages(prev => [...prev, rewardMessage]);
        setIsLoading(false);
        return;
    }

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: currentInput, history: chatHistory }),
        });

        if (!response.ok) throw new Error("The AI is experiencing some turbulence. Please try again.");

        const data = await response.json();
        const aiResponse: Message = { from: 'ai', text: data.text };
        
        setMessages(prev => [...prev, aiResponse]);
        setChatHistory(prev => [...prev, { role: 'user', content: [{ text: currentInput }] }, { role: 'model', content: [{ text: data.text }] }]);
    } catch(err: any) {
        const errorResponse: Message = { from: 'ai', text: err.message };
        setMessages(prev => [...prev, errorResponse]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <form onSubmit={handleSendMessage} className="relative w-full">
            <PopoverTrigger asChild>
                <Input 
                    placeholder="Ask the AI anything or type a command..." 
                    className="w-full h-11 pl-4 pr-10 border-2 border-transparent focus-visible:border-primary focus-visible:ring-0"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    autoComplete="off"
                    onFocus={() => setIsPopoverOpen(true)}
                />
            </PopoverTrigger>
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
        </form>
         <PopoverContent className="w-[calc(100vw-2rem)] md:w-[600px] lg:w-[800px] p-0" side="bottom" align="start">
              <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef as any}>
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-start gap-2", msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                            {msg.from === 'ai' && (
                                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Bot className="h-5 w-5" /></div>
                            )}
                            <div className={cn("max-w-md rounded-2xl p-3 text-sm whitespace-pre-wrap", msg.from === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                                {msg.text}
                            </div>
                            {msg.from === 'user' && (
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0"><User className="h-5 w-5"/></div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-start gap-2 justify-start">
                            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Bot className="h-5 w-5" /></div>
                             <div className="rounded-2xl p-3 text-sm bg-muted rounded-bl-none">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                             </div>
                         </div>
                    )}
                </div>
            </ScrollArea>
        </PopoverContent>
    </Popover>
  );
}
