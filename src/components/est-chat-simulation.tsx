
'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { User } from 'lucide-react';

const ChatBubble = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        viewport={{ once: true, amount: 0.8 }}
        className={cn("text-sm p-2 px-3 rounded-2xl max-w-[80%]", className)}
    >
        {children}
    </motion.div>
);

export const EstChatSimulation = () => {
    return (
        <Card className="w-full max-w-sm mx-auto h-[480px] flex flex-col bg-card/80 backdrop-blur-lg shadow-2xl">
            <CardHeader className="p-3 border-b flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <User className="h-6 w-6 text-muted-foreground" />
                        <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-card" />
                    </div>
                    <p className="font-semibold text-sm">Live Chat</p>
                </div>
                <Badge variant="default">In-Use</Badge>
            </CardHeader>
            <CardContent className="p-3 flex-1 flex flex-col gap-2 justify-end">
                <ChatBubble className="bg-muted self-start">Hi! I'm looking for a 2BR villa in Dubai Hills.</ChatBubble>
                <ChatBubble className="bg-primary text-primary-foreground self-end">I have 3 top options for you. Would you like to see the comparison?</ChatBubble>
                <ChatBubble className="bg-muted self-start">Yes, please. And what's the typical service charge there?</ChatBubble>
                <ChatBubble className="bg-primary text-primary-foreground self-end">Generating comparison... Service charges in Dubai Hills average AED 4-6 per sq. ft. annually.</ChatBubble>
            </CardContent>
        </Card>
    );
};
