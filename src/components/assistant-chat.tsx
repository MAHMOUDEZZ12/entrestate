
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Bot, Send, Sparkles, Loader2, BookOpen, User, Code, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { secretCodes } from '@/lib/codes';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandGroup, CommandItem, CommandList } from './ui/command';
import { tools } from '@/lib/tools-client';

type Message = {
    from: 'ai' | 'user';
    text: string | React.ReactNode;
};

const InitialAssistantMessage = () => (
    <div>
        <p className="font-semibold mb-2">Hello! I'm your AI co-pilot.</p>
        <p className="mb-3">Train me by uploading your brochures, price lists, and market reports to the <Link href="/me/brand" className="underline font-semibold hover:text-primary">Brand & Assets</Link> page. This gives me a knowledge base to help you better.</p>
        <p className="text-sm">What can I help you accomplish today? You can ask a question or type `/` to see available commands.</p>
    </div>
);

const allSuggestions = [
    { type: 'group', value: 'Quick Actions' },
    { type: 'item', value: 'Create a market report for Downtown Dubai', icon: <BookOpen className="h-4 w-4" /> },
    { type: 'item', value: 'Draft a follow-up email to a new lead', icon: <Sparkles className="h-4 w-4" /> },
    { type: 'group', value: 'Apps' },
    ...tools.map(tool => ({ type: 'item' as const, value: `Open ${tool.title}`, icon: React.cloneElement(tool.icon, {className: 'h-4 w-4'}) })),
    { type: 'group', value: 'Secret Codes' },
    ...secretCodes.map(code => ({ type: 'item' as const, value: code.code, icon: <Code className="h-4 w-4" /> })),
];

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'ai', text: <InitialAssistantMessage /> },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
          scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    if (input.trim().length > 0) {
        setIsSuggestionsOpen(true);
    } else {
        setIsSuggestionsOpen(false);
    }
  }, [input]);

  const handleSendMessage = async (e: React.FormEvent, messageText?: string) => {
    e.preventDefault();
    const currentInput = messageText || input;
    if (!currentInput.trim() || isLoading) return;

    const userMessage: Message = { from: 'user', text: currentInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsSuggestionsOpen(false);
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

  const handleSuggestionClick = (value: string) => {
    setInput(value);
    // Directly submit the form
    handleSendMessage({ preventDefault: () => {} } as React.FormEvent, value);
    setIsSuggestionsOpen(false);
  };
  
  const filteredSuggestions = input.startsWith('/') 
    ? allSuggestions 
    : allSuggestions.filter(s => s.type === 'item' && s.value.toLowerCase().includes(input.toLowerCase()));


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
                        <AvatarFallback>
                            <User className="h-4 w-4"/>
                        </AvatarFallback>
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
            <Popover open={isSuggestionsOpen} onOpenChange={setIsSuggestionsOpen}>
                <PopoverTrigger asChild>
                    <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                        <Input 
                            ref={inputRef}
                            placeholder="Ask a question or type '/' for commands..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                            autoComplete="off"
                        />
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                         <CommandList>
                            {filteredSuggestions.length > 0 ? (
                                filteredSuggestions.filter(s => s.type === 'group').map((suggestion, index, groups) => 
                                    <CommandGroup key={suggestion.value} heading={suggestion.value} className="text-xs">
                                        {filteredSuggestions.filter(item => {
                                            const itemIndex = allSuggestions.findIndex(i => i.value === item.value);
                                            const groupIndex = allSuggestions.findIndex(g => g.value === suggestion.value);
                                            const nextGroup = groups[index + 1];
                                            const nextGroupIndex = nextGroup ? allSuggestions.findIndex(g => g.value === nextGroup.value) : -1;
                                            
                                            return item.type === 'item' && 
                                                   itemIndex > groupIndex &&
                                                   (nextGroupIndex === -1 || itemIndex < nextGroupIndex);
                                        }).map(item => (
                                            <CommandItem key={item.value} onSelect={() => handleSuggestionClick(item.value)} className="cursor-pointer">
                                                 {item.icon}
                                                <span className="ml-2">{item.value}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )
                            ) : (
                                <div className="p-4 text-sm text-center text-muted-foreground">No suggestions found.</div>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </CardFooter>
    </>
  );
}
