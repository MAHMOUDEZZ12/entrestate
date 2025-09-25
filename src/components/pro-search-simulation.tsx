
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Search, Zap, Sparkles, BrainCircuit, TrendingUp, Building } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface Result {
    title: string;
    description: string;
    badge?: string;
    delay: number;
}

const ResultCard = ({ title, description, badge, delay }: { title: string, description: string, badge?: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
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


export const ProSearchSimulation = () => {
    const [query, setQuery] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');
    
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedQuery(query);
    }

    let searchMode = 'Fast';
    let results: Result[] = [];
    let modeIcon = <Zap className="h-4 w-4" />;
    
    if (submittedQuery) {
        if (submittedQuery.toLowerCase().includes('best roi') || submittedQuery.toLowerCase().includes('villas')) {
            searchMode = 'Smart';
            modeIcon = <Sparkles className="h-4 w-4" />;
            results = [
                { title: 'Sobha Hartland II', description: 'Projected ROI: 8.5%', badge: 'High Demand', delay: 0.1 },
                { title: 'Emaar Beachfront', description: 'Projected ROI: 7.9%', badge: 'Strong Rental', delay: 0.2 },
                { title: 'DAMAC Lagoons', description: 'Projected ROI: 7.2%', badge: 'New Launch', delay: 0.3 },
            ];
        } else if (submittedQuery.toLowerCase().includes('history') || submittedQuery.toLowerCase().includes('emaar')) {
            searchMode = 'Deep';
            modeIcon = <BrainCircuit className="h-4 w-4" />;
            results = [
                { title: 'Emaar Beachfront - Price Trend', description: 'Up 12% YoY. Strong investor confidence.', delay: 0.1 },
                { title: 'Historical Sales - EMAAR', description: '2,400 units sold in last 12 months.', delay: 0.2 },
                { title: 'Market Sentiment Analysis', description: 'Positive sentiment detected in news & social media.', delay: 0.3 },
                { title: 'Future Outlook', description: 'AI projects continued growth in waterfront properties.', delay: 0.4 },
            ];
        } else {
             searchMode = 'Fast';
             modeIcon = <Zap className="h-4 w-4" />;
             results = [
                { title: `"${submittedQuery}" Project`, description: '3 Listings Found', delay: 0.1 },
                { title: `"${submittedQuery}" Area`, description: '1 District Found', delay: 0.2 },
            ];
        }
    }


    return (
        <Card 
            className="w-full max-w-md mx-auto transition-all duration-300"
        >
            <CardHeader className="pb-2">
                 <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search listings, trends, ROI..."
                        className="pl-10 pr-20"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8">Search</Button>
                </form>
            </CardHeader>
            <CardContent className="min-h-[240px]">
                <div className="h-6 mb-4 flex items-center">
                    {submittedQuery && (
                        <AnimatePresence mode="wait">
                           <SearchModeIndicator key={searchMode} icon={modeIcon} label={`${searchMode} Search`} />
                        </AnimatePresence>
                    )}
                </div>
                 <div className="space-y-2">
                    <AnimatePresence>
                        {results.length > 0 ? results.map((r, i) => (
                           <ResultCard key={i} {...r} />
                        )) : (
                            <div className="text-center text-muted-foreground pt-10">
                                <p>Enter a query to see the AI search engines in action.</p>
                                <p className="text-xs mt-2">Try "best ROI for villas" or "Emaar history".</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
};
