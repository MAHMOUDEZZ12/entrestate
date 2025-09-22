
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BadgeCheck, Building, User, Info, TrendingUp } from 'lucide-react';

const rawListings = [
  { id: 1, source: 'Bayut', title: 'Marina View Apt', price: 'AED 2.5M', agent: 'John D.', status: 'Active' },
  { id: 2, source: 'P.Finder', title: '2BR Marina', price: 'AED 2,550,000', agent: 'Jane S.', status: 'Active' },
  { id: 3, source: 'Dubizzle', title: 'Stunning View Apt', price: '2.5M AED', agent: 'Self-listed', status: 'Active' },
  { id: 4, source: 'Broker Site', title: 'Exclusive Marina 2 Bed', price: 'AED 2.49M', agent: 'Michael B.', status: 'Active' },
  { id: 5, source: 'P.Finder', title: 'Luxury Apt', price: 'AED 2,500,000', agent: 'Jane S.', status: 'Under Offer' },
  { id: 6, source: 'Facebook', title: '2BR For Sale Dubai Marina', price: 'Call for price', agent: 'Unknown', status: 'Active' },
  { id: 7, source: 'Prop.ae', title: 'High Floor 2-Bed', price: 'AED 2.51M', agent: 'Prop.ae Broker', status: 'Active' },
];

const unifiedListing = {
    title: 'Princess Tower, Dubai Marina',
    price: 'AED 2,500,000',
    type: '2 Bed, 3 Bath',
    size: '1,318 sqft',
    ref: 'AP345982',
    verified: true,
    qualityScore: 98,
    officialAgent: {
        name: 'Jane Smith',
        agency: 'Prestige Properties',
        verified: true,
    },
    priceHistory: [
        { date: '2023-11', price: 'AED 2.45M' },
        { date: '2024-03', price: 'AED 2.48M' },
        { date: '2024-07', price: 'AED 2.50M' },
    ]
};

export const MegaListingSimulation = () => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div 
            className="w-full max-w-lg mx-auto group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div 
                className="w-full overflow-hidden bg-transparent shadow-2xl bg-gradient-to-br from-muted/10 to-muted/50 rounded-2xl border border-border/20"
            >
              <div className="p-4 md:p-6">
                <div 
                    className="w-full mx-auto cursor-pointer h-full min-h-[400px] relative"
                >
                    <AnimatePresence>
                        {!isHovered && (
                            <motion.div
                                key="raw-listings"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05 } }
                                }}
                                className="grid grid-cols-2 gap-3"
                            >
                                {rawListings.map((listing, i) => (
                                    <motion.div
                                        key={listing.id}
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="bg-muted/50 p-2 rounded-md shadow-sm">
                                            <p className="text-xs font-bold truncate">{listing.title}</p>
                                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                                <span>{listing.source}</span>
                                                <span className="font-mono">{listing.price}</span>
                                            </div>
                                             <div className="flex justify-between items-center text-[10px] text-muted-foreground/70 pt-1">
                                                <span>{listing.agent}</span>
                                                <span>{listing.status}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                key="unified-listing"
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            >
                                <Card className="bg-primary/10 border-primary/50 shadow-lg w-full max-w-sm">
                                    <CardHeader className="p-4">
                                        <div className="flex justify-between items-center">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <Building className="h-5 w-5" />
                                                {unifiedListing.title}
                                            </CardTitle>
                                            <div className="flex items-center gap-2 text-green-500 font-bold">
                                                <BadgeCheck className="h-5 w-5" />
                                                <span>{unifiedListing.qualityScore}%</span>
                                            </div>
                                        </div>
                                        <CardContent className="text-xs text-muted-foreground font-mono">{unifiedListing.ref}</CardContent>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 text-sm space-y-3">
                                        <div className="flex justify-between items-baseline p-3 bg-background/50 rounded-lg">
                                            <span className="text-muted-foreground">Price:</span>
                                            <span className="font-bold text-2xl text-primary">{unifiedListing.price}</span>
                                        </div>
                                         <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground">Details:</span>
                                            <span className="font-semibold">{unifiedListing.type} / {unifiedListing.size}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground flex items-center gap-1"><User className="h-4 w-4"/>Official Agent:</span>
                                            <span className="font-semibold">{unifiedListing.officialAgent.name} ({unifiedListing.officialAgent.agency})</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground flex items-center gap-1"><TrendingUp className="h-4 w-4"/>Price Trend:</span>
                                            <div className="flex gap-2 font-mono text-xs">
                                                {unifiedListing.priceHistory.map(p=> <span key={p.date}>{p.price}</span>)}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                </div>
              </div>
            </div>
        </div>
    );
};
