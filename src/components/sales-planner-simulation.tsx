
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Bot, Sparkles, User, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';

const messages = [
  { from: 'user', text: 'Hi, are you still interested in the villa?' },
  { from: 'bot', text: 'That message has a low chance of getting a reply. Let me rewrite it for you...' },
  { from: 'user', isRewritten: true, text: 'Hey John, just saw a property with that private garden you mentioned and thought of you. No pressure, but wanted to check if you were still in the market. Let me know.' },
];

export const SalesPlannerSimulation = () => {
    const [step, setStep] = useState(0);

    const handleRestart = () => {
        setStep(0);
        setTimeout(() => setStep(1), 50);
    }
    
    React.useEffect(() => {
        setStep(1);
    }, []);

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-4 space-y-3 min-h-[350px] flex flex-col justify-end">
                <AnimatePresence>
                     {messages.slice(0, step).map((msg, index) => (
                         <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className={cn(
                                "flex items-start gap-2 max-w-[85%] w-fit",
                                msg.from === 'user' ? 'self-end' : 'self-start'
                            )}
                        >
                            {msg.from === 'bot' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <Bot className="h-5 w-5" />
                                </div>
                            )}
                            <div className={cn(
                                "text-sm p-3 rounded-2xl shadow-sm",
                                msg.from === 'user' && !msg.isRewritten && 'bg-muted rounded-br-none',
                                msg.from === 'user' && msg.isRewritten && 'bg-primary text-primary-foreground rounded-br-none',
                                msg.from === 'bot' && 'bg-secondary rounded-bl-none'
                            )}>
                                {msg.text}
                            </div>
                            {msg.from === 'user' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                    <User className="h-5 w-5" />
                                </div>
                            )}
                        </motion.div>
                     ))}
                </AnimatePresence>
            </CardContent>
            <div className="p-4 border-t">
                 <Button onClick={() => setStep(prev => Math.min(prev + 1, messages.length))} disabled={step >= messages.length} className="w-full">
                    {step >= messages.length ? "Done!" : "Rewrite with AI"}
                    <Wand2 className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </Card>
    );
};
