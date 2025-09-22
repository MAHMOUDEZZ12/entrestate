
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

const ChatBubble = ({ children, from, delay }: { children: React.ReactNode, from: 'user' | 'bot', delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, x: from === 'user' ? 20 : -20 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.4, delay }}
        viewport={{ once: true, amount: 0.8 }}
        className={cn(
            "flex items-end gap-2 max-w-[85%]",
            from === 'user' ? 'self-end' : 'self-start'
        )}
    >
        {from === 'bot' && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Bot className="h-5 w-5" />
            </div>
        )}
        <div className={cn(
            "relative text-sm p-3 rounded-2xl",
            from === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-none'
                : 'bg-muted rounded-bl-none'
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

export const EstChatSimulation = () => {
    return (
        <div className="w-full max-w-md mx-auto h-[480px] flex flex-col gap-4 p-4">
            <ChatBubble from="user" delay={0.2}>Hi! I'm looking for a 2BR villa in Dubai Hills with a budget of AED 3M.</ChatBubble>
            <ChatBubble from="bot" delay={0.8}>Of course. I see two premium off-plan options: one by Emaar and one by Sobha. The Sobha option has a slightly better projected ROI based on recent trends.</ChatBubble>
            <ChatBubble from="user" delay={1.4}>Interesting. Can you generate a comparison PDF for me and my client?</ChatBubble>
            <ChatBubble from="bot" delay={2.0}>Certainly. I've just generated the comparison document and placed it in your Creative Canvas. I can also send it via WhatsApp. What would you prefer?</ChatBubble>
        </div>
    );
};
