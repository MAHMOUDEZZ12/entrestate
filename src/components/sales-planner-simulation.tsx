
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Bot, Sparkles, User, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import Link from 'next/link';

interface Message {
    from: 'user' | 'bot';
    text: string;
    isRewritten?: boolean;
}

const initialMessages: Message[] = [
  { from: 'bot', text: "SalesMaster: Let's play! Copy your last client WhatsApp message, paste it here, and I will show you the magic." },
  { from: 'user', text: '' }, // This will be filled by user input
  { from: 'bot', text: 'That message has a low chance of getting a reply. Let me rewrite it for you...' },
  { from: 'user', isRewritten: true, text: 'Hey John, just saw a property with that private garden you mentioned and thought of you. No pressure, but wanted to check if you were still in the market. Let me know.' },
];

const ChatBubble = ({ children, from, isRewritten }: { children: React.ReactNode, from: 'user' | 'bot', isRewritten?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={cn(
            "flex items-start gap-2 max-w-[85%] w-fit",
            from === 'user' ? 'self-end' : 'self-start'
        )}
    >
        {from === 'bot' && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Bot className="h-5 w-5" />
            </div>
        )}
        <div className={cn(
            "text-sm p-3 rounded-2xl shadow-sm",
            from === 'user' && !isRewritten && 'bg-background rounded-br-none',
            from === 'user' && isRewritten && 'bg-primary text-primary-foreground rounded-br-none',
            from === 'bot' && 'bg-background rounded-bl-none'
        )}>
            {children}
        </div>
        {from === 'user' && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User className="h-5 w-5" />
            </div>
        )}
    </motion.div>
);


export const SalesPlannerSimulation = () => {
    const [step, setStep] = useState(0);
    const [userMessage, setUserMessage] = useState('');
    const [finalMessages, setFinalMessages] = useState<Message[]>([]);

    const handleMagicClick = () => {
        if (!userMessage) return;

        const newMessages = [...initialMessages];
        newMessages[1].text = userMessage;
        setFinalMessages(newMessages);

        let currentStep = 1;
        const interval = setInterval(() => {
            currentStep++;
            setStep(currentStep);
            if (currentStep >= newMessages.length) {
                clearInterval(interval);
            }
        }, 1500);
    };
    
    return (
        <Card className="w-full max-w-lg mx-auto bg-card/80 backdrop-blur-sm border-border/30 shadow-xl p-6">
            <div className="space-y-4 text-center mb-6">
               <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block"><Sparkles className="h-8 w-8" /></div>
               <h3 className="text-3xl font-bold font-heading">
                  SuperSales AI
               </h3>
               <p className="text-lg text-muted-foreground">
                    Your interactive AI partner for creating and executing winning deals. It's like having a world-class sales manager in your pocket, guiding you on what to do next.
               </p>
           </div>
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-4 space-y-4 min-h-[400px] flex flex-col bg-muted/30 rounded-t-lg">
                    <AnimatePresence>
                        {finalMessages.slice(0, step + 1).map((msg, index) => (
                            <ChatBubble key={index} from={msg.from} isRewritten={msg.isRewritten}>
                                {msg.text}
                            </ChatBubble>
                        ))}
                    </AnimatePresence>
                    {step === 0 && (
                        <ChatBubble key={0} from={initialMessages[0].from}>
                            {initialMessages[0].text}
                        </ChatBubble>
                    )}
                </CardContent>
                <div className="p-4 border-t space-y-2">
                    <Textarea 
                        placeholder="Paste your message here..."
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        disabled={step > 0}
                        rows={2}
                    />
                    <Button className="w-full" onClick={handleMagicClick} disabled={!userMessage || step > 0}>
                        Show me the magic
                        <Wand2 className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </Card>
             <div className="text-center mt-6">
                <Link href="/me">
                    <Button variant="outline" className="shadow">Start a Workspace</Button>
                </Link>
             </div>
        </Card>
    );
};
