
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Bot, Send, Sparkles, Loader2, User, LayoutDashboard, Settings, Palette, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { secretCodes } from '@/lib/codes';
import Link from 'next/link';
import { useTabManager } from '@/context/TabManagerContext';
import { useRouter } from 'next/navigation';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { tools } from '@/lib/tools-client';


type Message = {
    from: 'ai' | 'user';
    text: string | React.ReactNode;
};

const shortcutItems = [
    { href: '/me/settings', label: 'Settings', icon: <Settings className="mr-2 h-4 w-4" />},
    { href: '/me/brand', label: 'Brand & Assets', icon: <Palette className="mr-2 h-4 w-4" />},
    { href: '/me/assistant', label: 'AI Command Center', icon: <Bot className="mr-2 h-4 w-4" />},
    { href: '/me/tool/projects-finder', label: 'Market Library', icon: <Database className="mr-2 h-4 w-4" />}
];

const InitialAssistantMessage = () => (
    <div>
        <p className="font-semibold mb-2">Hello! I'm your AI co-pilot.</p>
        <p className="mb-3">Train me by uploading your brochures, price lists, and market reports to the <Link href="/me/brand" className="underline font-semibold hover:text-primary">Brand & Assets</Link> page. This gives me a knowledge base to help you better.</p>
        <p className="text-sm">Ask a question, or search for any app or project below.</p>
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
  const { addTab } = useTabManager();
  const router = useRouter();


  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
          scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, [messages]);


  const handleSelect = (href: string, label: string) => {
    addTab({ href, label });
    router.push(href);
    setInput('');
  };

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
    <div className="flex flex-col h-full max-h-[80vh]">
        <div className="p-4 border-b">
             <h3 className="font-semibold flex items-center gap-2"><Bot className="h-5 w-5"/> AI Assistant</h3>
        </div>
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
            <CommandInput
                placeholder="Ask a question or search for apps & actions..."
                value={input}
                onValueChange={setInput}
            />
            <CommandList>
                 {input.length > 0 && (
                    <CommandGroup heading="Apps & Tools">
                        {tools.filter(t => t.title.toLowerCase().includes(input.toLowerCase())).map(tool => (
                             <CommandItem key={tool.id} onSelect={() => handleSelect(tool.href, tool.title)} value={tool.title}>
                                {React.cloneElement(tool.icon, { className: 'mr-2 h-4 w-4' })}
                                <span>{tool.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
                 {input.length === 0 && (
                    <CommandGroup heading="Shortcuts">
                        {shortcutItems.map(item => (
                            <CommandItem key={item.href} onSelect={() => handleSelect(item.href, item.label)}>
                               {item.icon}
                               <span>{item.label}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </CommandList>
             <form onSubmit={handleSendMessage} className="p-2 border-t flex items-center">
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
