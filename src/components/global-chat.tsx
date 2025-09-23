
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Bot, Send, Loader2, User, Sparkles, PlusCircle, ChevronUp } from 'lucide-react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { secretCodes } from '@/lib/codes';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { usePathname } from 'next/navigation';
import { useSensitiveArea } from '@/context/SensitiveAreaContext';


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

type ActionKey = {
    label: string;
    icon: React.ReactNode;
    href?: string;
    action?: () => void;
}

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
  const { activeHint, isHintActive } = useSensitiveArea();

  useEffect(() => {
    if (scrollAreaRef.current && isSheetOpen) {
      setTimeout(() => {
          scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isSheetOpen]);

  const sendMessage = async (text: string, history: any[]) => {
      const userMessage: Message = { from: 'user', text: text };
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      if (!isSheetOpen) setIsSheetOpen(true);

      try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, history }),
        });

        if (!response.ok) throw new Error("The AI is experiencing some turbulence. Please try again.");

        const data = await response.json();
        const aiResponse: Message = { from: 'ai', text: data.text };
        
        setMessages(prev => [...prev, aiResponse]);
        setChatHistory(prev => [...prev, { role: 'user', content: [{ text }] }, { role: 'model', content: [{ text: data.text }] }]);
    } catch(err: any) {
        const errorResponse: Message = { from: 'ai', text: err.message };
        setMessages(prev => [...prev, errorResponse]);
    } finally {
        setIsLoading(false);
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    setInput('');
    
    const matchedCode = secretCodes.find(c => c.code.toLowerCase() === currentInput.toLowerCase());
    if (matchedCode) {
        const userMessage: Message = { from: 'user', text: currentInput };
        const rewardMessage: Message = {
            from: 'ai',
            text: `Secret code accepted! Here is your reward: ${matchedCode.reward}`
        };
        setMessages(prev => [...prev, userMessage, rewardMessage]);
        setIsLoading(false);
        return;
    }

    await sendMessage(currentInput, chatHistory);
  };
  
    const handleMagicClick = async () => {
        if (isLoading) return;
        
        // This is a simulation of reading the page content.
        const pageContent = `Current page is ${pathname}. The visible content includes a header titled "${document.title}".`;
        const prompt = `Analyze the following page content and generate a concise action plan with 2-3 bullet points of what I can do here.\n\nPage Content: ${pageContent}`;
        
        await sendMessage(prompt, []);
    }
    
    const getContextualInfo = (): { placeholder: string; leftKeys: ActionKey[]; rightKey: ActionKey | null } => {
        const defaultRightKey = { label: 'Analyze Page', icon: <Sparkles className="h-5 w-5" />, action: handleMagicClick };

        if (isHintActive) {
            return { placeholder: activeHint, leftKeys: [], rightKey: null };
        }
        if (pathname.startsWith('/me/tool/')) {
            return {
                placeholder: "Ask a question about this tool or enter your next command...",
                leftKeys: [
                    { label: "Save Result", href: "#", icon: <PlusCircle /> },
                ],
                rightKey: defaultRightKey
            };
        }
         if (pathname.startsWith('/me/flows')) {
            return {
                placeholder: "Describe a workflow you want to automate...",
                leftKeys: [
                     { label: "New Flow", href: "/me/flows", icon: <PlusCircle /> },
                ],
                 rightKey: defaultRightKey
            };
        }
        switch (pathname) {
            case '/me/marketing':
                return { 
                    placeholder: "Search for an app or describe what you want to build...",
                    leftKeys: [],
                    rightKey: defaultRightKey
                };
            case '/me/brand':
                return { 
                    placeholder: "Ask about your brand assets or upload a new file...",
                    leftKeys: [
                        { label: "Upload File", href: "#", icon: <PlusCircle /> },
                    ],
                    rightKey: defaultRightKey
                };
             case '/me':
                 return {
                    placeholder: "Search your projects or ask the AI to perform a task...",
                    leftKeys: [
                        { label: "Add Project", href: "/me/tool/projects-finder", icon: <PlusCircle /> },
                        { label: "New Flow", href: "/me/flows", icon: <PlusCircle /> },
                    ],
                    rightKey: defaultRightKey
                 }
            default:
                return { 
                    placeholder: "Send a message or type '/' for commands...",
                    leftKeys: [],
                    rightKey: defaultRightKey
                };
        }
    }
    
    const { placeholder, leftKeys, rightKey } = getContextualInfo();


  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t">
            <div className="container mx-auto p-4 max-w-5xl">
                <form onSubmit={handleSendMessage} className="relative flex items-center gap-4">
                    <div className="flex items-center gap-2">
                         {leftKeys.map(key => {
                            const button = (
                                 <Button type="button" variant="outline" size="sm" className="hidden sm:flex" onClick={key.action}>
                                    {React.cloneElement(key.icon as React.ReactElement, { className: 'mr-2 h-4 w-4' })}
                                    {key.label}
                                </Button>
                            );
                            return key.href ? <Link href={key.href} key={key.label}>{button}</Link> : button;
                        })}
                    </div>
                    <div className="relative flex-1">
                        <Input 
                            placeholder={placeholder} 
                            className="w-full h-12 pl-4 pr-24 text-base"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                            autoComplete="off"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                           {rightKey && (
                            <Button type="button" variant="ghost" size="icon" onClick={rightKey.action} disabled={isLoading} title={rightKey.label}>
                                {rightKey.icon}
                           </Button>
                           )}
                           <SheetTrigger asChild>
                                <Button type="button" variant="ghost" size="icon" title="View Chat History">
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
      <SheetContent side="bottom" className="h-4/5 flex flex-col p-0 border-t-2 z-40" hideCloseButton={true}>
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
    </Sheet>
  );
}
