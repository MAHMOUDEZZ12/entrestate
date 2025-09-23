
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Bot, Send, Loader2, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from '@/components/ui/input';
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
          scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

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
    <div className="flex flex-col h-full">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef as any}>
            <div className="space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={cn("flex items-end gap-2", msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                        {msg.from === 'ai' && (
                            <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-4 w-4" /></AvatarFallback></Avatar>
                        )}
                        <div className={cn("max-w-xs rounded-2xl p-3 text-sm whitespace-pre-wrap", msg.from === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                            {msg.text}
                        </div>
                        {msg.from === 'user' && (
                            <Avatar className="h-8 w-8"><AvatarFallback><User className="h-4 w-4"/></AvatarFallback></Avatar>
                        )}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-end gap-2 justify-start">
                        <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-4 w-4" /></AvatarFallback></Avatar>
                         <div className="max-w-xs rounded-2xl p-3 text-sm bg-muted rounded-bl-none">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                         </div>
                     </div>
                )}
            </div>
        </ScrollArea>
        <div className="border-t">
             <form onSubmit={handleSendMessage} className="p-2 flex items-center">
                <Input 
                    placeholder="Send a message..." 
                    className="flex-1 border-0 shadow-none focus-visible:ring-0"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    autoComplete="off"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
    </div>
  );
}
