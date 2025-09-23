
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Bot, Send, Loader2, User, ChevronUp, X, Sparkles, PlusCircle } from 'lucide-react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { secretCodes } from '@/lib/codes';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { usePathname } from 'next/navigation';

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

export function GlobalChat() {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'ai', text: <InitialAssistantMessage /> },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();


  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
          scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isSheetOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isSheetOpen) setIsSheetOpen(true);

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
  
    const getContextualInfo = () => {
        if (pathname.startsWith('/me/tool/')) {
            return {
                placeholder: "Ask a question about this tool or enter your next command...",
                actions: [
                    { label: "Save Result", href: "#", icon: <PlusCircle /> },
                ]
            };
        }
         if (pathname.startsWith('/me/flows')) {
            return {
                placeholder: "Describe a workflow you want to automate...",
                actions: [
                     { label: "New Flow", href: "/me/flows", icon: <PlusCircle /> },
                ]
            };
        }
        switch (pathname) {
            case '/me/marketing':
                return { 
                    placeholder: "Search for an app or describe what you want to build...",
                    actions: [] 
                };
            case '/me/brand':
                return { 
                    placeholder: "Ask about your brand assets or upload a new file...",
                    actions: [
                        { label: "Upload File", href: "#", icon: <PlusCircle /> },
                    ]
                };
             case '/me':
                 return {
                    placeholder: "Search your projects or ask the AI to perform a task...",
                    actions: [
                        { label: "Add Project", href: "/me/tool/projects-finder", icon: <PlusCircle /> },
                    ]
                 }
            default:
                return { 
                    placeholder: "Send a message or type '/' for commands...",
                    actions: []
                };
        }
    }
    
    const { placeholder, actions } = getContextualInfo();


  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="h-4/5 flex flex-col p-0 border-t-2">
            <SheetHeader className="p-4 border-b flex-row justify-between items-center">
                <SheetTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Assistant
                </SheetTitle>
                 <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                    <X className="h-4 w-4" />
                </Button>
            </SheetHeader>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef as any}>
                <div className="space-y-4 max-w-4xl mx-auto w-full">
                    {messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-start gap-3", msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                            {msg.from === 'ai' && (
                                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Bot className="h-5 w-5" /></div>
                            )}
                            <div className={cn("max-w-xl rounded-2xl p-3 text-sm whitespace-pre-wrap", msg.from === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                                {msg.text}
                            </div>
                            {msg.from === 'user' && (
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0"><User className="h-5 w-5"/></div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3 justify-start">
                            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Bot className="h-5 w-5" /></div>
                            <div className="rounded-2xl p-3 text-sm bg-muted rounded-bl-none">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </SheetContent>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-t">
        <div className="container mx-auto p-4 max-w-5xl">
            <form onSubmit={handleSendMessage} className="relative flex items-center gap-4">
                 {actions.map(action => (
                    <Link href={action.href} key={action.label}>
                        <Button type="button" variant="outline" size="sm" className="hidden sm:flex">
                           {React.cloneElement(action.icon as React.ReactElement, { className: 'mr-2 h-4 w-4' })}
                           {action.label}
                        </Button>
                    </Link>
                 ))}
                <div className="relative flex-1">
                    <Input 
                        placeholder={placeholder} 
                        className="w-full h-12 pl-4 pr-24 text-base"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        autoComplete="off"
                        onFocus={() => { if(!isSheetOpen) setIsSheetOpen(true); }}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <SheetTrigger asChild>
                            <Button type="button" variant="ghost" size="icon">
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </SheetTrigger>
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    </Sheet>
  );
}
