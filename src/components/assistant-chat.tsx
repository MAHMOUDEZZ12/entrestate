
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Bot, Send, X, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { secretCodes } from '@/lib/codes';
import Link from 'next/link';

type Message = {
    from: 'ai' | 'user';
    text: string | React.ReactNode;
};

const InitialAssistantMessage = () => (
    <div>
        <p className="font-semibold mb-2">Hello! I'm your AI co-pilot.</p>
        <p className="mb-3">Train me by uploading your brochures, price lists, and market reports to the <Link href="/dashboard/brand" className="underline font-semibold hover:text-primary">Brand & Assets</Link> page. This gives me a knowledge base to help you better.</p>
        <p className="text-sm">What can I help you accomplish today? You can ask a question, give a command, or enter a secret code.</p>
    </div>
);


export function AssistantChat() {
  const [isOpen, setIsOpen] = useState(true); // Keep it open by default on the assistant page
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

    // Check for secret codes first
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

        if (!response.ok) {
            throw new Error("The AI is experiencing some turbulence. Please try again.");
        }

        const data = await response.json();
        const aiResponse: Message = { from: 'ai', text: data.text };
        
        setMessages(prev => [...prev, aiResponse]);
        // Update chat history for the next turn
        setChatHistory(prev => [...prev, { role: 'user', content: [{ text: currentInput }] }, { role: 'model', content: [{ text: data.text }] }]);
    } catch(err: any) {
        const errorResponse: Message = { from: 'ai', text: err.message };
        setMessages(prev => [...prev, errorResponse]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5"/>
                AI Assistant
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef as any}>
            <div className="space-y-4">
                {messages.map((msg, index) => (
                <div
                    key={index}
                    className={cn(
                    "flex items-end gap-2",
                    msg.from === 'user' ? 'justify-end' : 'justify-start'
                    )}
                >
                    {msg.from === 'ai' && (
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 text-primary">
                        <Bot className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                    )}
                    <div
                    className={cn(
                        "max-w-xs rounded-2xl p-3 text-sm whitespace-pre-wrap",
                        msg.from === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted rounded-bl-none'
                    )}
                    >
                    {msg.text}
                    </div>
                    {msg.from === 'user' && (
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    )}
                </div>
                ))}
                {isLoading && (
                     <div className="flex items-end gap-2 justify-start">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/20 text-primary">
                            <Bot className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                         <div className="max-w-xs rounded-2xl p-3 text-sm bg-muted rounded-bl-none">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                         </div>
                     </div>
                )}
            </div>
            </ScrollArea>
        </CardContent>
        
         <CardFooter className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                <Input 
                    placeholder="Ask anything or enter a secret code..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </CardFooter>
    </>
  );
}
