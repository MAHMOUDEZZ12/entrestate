
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Search, Zap, Sparkles, BrainCircuit, TrendingUp, Building } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

const ResultCard = ({ title, description, badge, delay }: { title: string, description: string, badge?: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
    >
        <div className="p-3 bg-muted/50 rounded-lg text-left">
            <div className="flex justify-between items-start">
                <p className="font-semibold text-sm">{title}</p>
                {badge && <Badge variant="secondary">{badge}</Badge>}
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </div>
    </motion.div>
);

const SearchModeIndicator = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 'auto' }}
        exit={{ opacity: 0, width: 0 }}
        className="flex items-center gap-1 text-xs text-primary font-semibold overflow-hidden"
    >
        {icon}
        <span>{label}</span>
    </motion.div>
);

const exampleQueries = [
    "", // Start with empty for Fast Search
    "best roi for villas", // Smart Search
    "price history for Emaar Beachfront" // Deep Search
];

export const ProSearchSimulation = () => {
    const [query, setQuery] = useState('');
    const [queryIndex, setQueryIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (isTyping) return;

        const queryInterval = setInterval(() => {
            setQueryIndex(prevIndex => (prevIndex + 1) % exampleQueries.length);
        }, 4000); // Change query every 4 seconds

        return () => clearInterval(queryInterval);
    }, [isTyping]);

    useEffect(() => {
        if (isTyping) return;

        const targetQuery = exampleQueries[queryIndex];
        let currentTypedQuery = "";
        let i = 0;

        const typingInterval = setInterval(() => {
            if (i < targetQuery.length) {
                currentTypedQuery += targetQuery[i];
                setQuery(currentTypedQuery);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50); // Typing speed

        return () => clearInterval(typingInterval);
    }, [queryIndex, isTyping]);
    
    const handleUserTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isTyping) setIsTyping(true);
        setQuery(e.target.value);
    }

    let searchMode = 'Fast';
    let results = [
        { title: 'Emaar Beachfront', description: '2 Listings Found', delay: 0.1 },
        { title: 'emaar properties', description: '1 Developer Found', delay: 0.2 },
    ];
    let modeIcon = <Zap className="h-4 w-4" />;

    if (query.toLowerCase().includes('best roi')) {
        searchMode = 'Smart';
        modeIcon = <Sparkles className="h-4 w-4" />;
        results = [
            { title: 'Sobha Hartland II', description: 'Projected ROI: 8.5%', badge: 'High Demand', delay: 0.1 },
            { title: 'Emaar Beachfront', description: 'Projected ROI: 7.9%', badge: 'Strong Rental', delay: 0.2 },
            { title: 'DAMAC Lagoons', description: 'Projected ROI: 7.2%', badge: 'New Launch', delay: 0.3 },
        ];
    }
    
    if (query.toLowerCase().includes('history')) {
        searchMode = 'Deep';
        modeIcon = <BrainCircuit className="h-4 w-4" />;
        results = [
            { title: 'Emaar Beachfront - Price Trend', description: 'Up 12% YoY. Strong investor confidence.', delay: 0.1 },
            { title: 'Historical Sales - EMAAR', description: '2,400 units sold in last 12 months.', delay: 0.2 },
            { title: 'Market Sentiment Analysis', description: 'Positive sentiment detected in news & social media.', delay: 0.3 },
            { title: 'Future Outlook', description: 'AI projects continued growth in waterfront properties.', delay: 0.4 },
        ];
    }


    return (
        <Card 
            className="w-full max-w-md mx-auto transition-all duration-300"
        >
            <CardHeader className="pb-2">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search listings, trends, ROI..."
                        className="pl-10"
                        value={query}
                        onChange={handleUserTyping}
                    />
                </div>
            </CardHeader>
            <CardContent className="min-h-[240px]">
                <div className="h-6 mb-4 flex items-center">
                    <AnimatePresence mode="wait">
                       <SearchModeIndicator key={searchMode} icon={modeIcon} label={`${searchMode} Search`} />
                    </AnimatePresence>
                </div>
                 <div className="space-y-2">
                    <AnimatePresence>
                        {results.map((r, i) => (
                           <ResultCard key={`${queryIndex}-${i}`} {...r} />
                        ))}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
};
