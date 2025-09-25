
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Bot, Sparkles, User, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';

const messages = [
  { from: 'bot', text: "SalesMaster: Let's play! copy your last client whatsapp message, paste it here. and i will show you the magic" },
  { from: 'user', text: 'Hi, are you still interested in the villa?' },
  { from: 'bot', text: "yes! it's for you :D" },
  { from: 'bot', text: 'That message has a low chance of getting a reply. Let me rewrite it for you...' },
  { from: 'user', isRewritten: true, text: 'Hey John, just saw a property with that private garden you mentioned and thought of you. No pressure, but wanted to check if you were still in the market. Let me know.' },
];

export const SalesPlannerSimulation = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    
    const [visibleMessages, setVisibleMessages] = useState(1);

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(latest => {
            const newVisibleCount = Math.min(messages.length, Math.floor(latest * messages.length) + 1);
            setVisibleMessages(newVisibleCount);
        });
        return unsubscribe;
    }, [scrollYProgress]);

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent ref={containerRef} className="p-4 space-y-4 min-h-[400px] max-h-[400px] overflow-y-scroll flex flex-col justify-end bg-muted/30 rounded-t-lg">
                <AnimatePresence>
                     {messages.slice(0, visibleMessages).map((msg, index) => (
                         <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.4 }}
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
                                msg.from === 'user' && !msg.isRewritten && 'bg-background rounded-br-none',
                                msg.from === 'user' && msg.isRewritten && 'bg-primary text-primary-foreground rounded-br-none',
                                msg.from === 'bot' && 'bg-background rounded-bl-none'
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
                 <Button className="w-full" disabled={true}>
                    Scroll to see the magic...
                    <Wand2 className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </Card>
    );
};
