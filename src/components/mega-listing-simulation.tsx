
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BadgeCheck, Building, User, Info, TrendingUp, Calendar, Zap, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

const rawListings = [
  { id: 1, source: 'Bayut', title: 'Marina View Apt', price: 'AED 2.5M', agent: 'John D.', status: 'Active', size: '1,318 sqft' },
  { id: 2, source: 'P.Finder', title: '2BR Marina', price: 'AED 2,550,000', agent: 'Jane S.', status: 'Active', size: '1,320 sqft' },
  { id: 3, source: 'Dubizzle', title: 'Stunning View Apt', price: '2.5M AED', agent: 'Self-listed', status: 'Active', size: '1,300 sqft' },
  { id: 4, source: 'Broker Site', title: 'Exclusive Marina 2 Bed', price: 'AED 2.49M', agent: 'Michael B.', status: 'Active', size: '1,318 sqft' },
  { id: 5, source: 'P.Finder', title: 'Luxury Apt', price: 'AED 2,500,000', agent: 'Jane S.', status: 'Under Offer', size: '1,318 sqft' },
  { id: 6, source: 'Facebook', title: '2BR For Sale Dubai Marina', price: 'Call for price', agent: 'Unknown', status: 'Active', size: 'N/A' },
  { id: 7, source: 'Prop.ae', title: 'High Floor 2-Bed', price: 'AED 2.51M', agent: 'Prop.ae Broker', status: 'Active', size: '1,325 sqft' },
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
    projectDetails: {
        developer: 'Emaar Properties',
        handover: 'Ready',
        status: 'Available',
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
                className="w-full overflow-hidden bg-gradient-to-br from-muted/10 to-muted/50 rounded-2xl border border-border/20 backdrop-blur-lg"
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
                                             <div className="flex justify-between items-center text-[10px] text-muted-foreground/70">
                                                <span>ID: {listing.id}</span>
                                                <span>{listing.size}</span>
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
                                        <CardContent className="text-xs text-muted-foreground font-mono p-0">{unifiedListing.ref}</CardContent>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 text-sm space-y-3">
                                        <div className="flex justify-between items-baseline p-3 bg-background/50 rounded-lg">
                                            <span className="text-muted-foreground">Price:</span>
                                            <span className="font-bold text-2xl text-primary">{unifiedListing.price}</span>
                                        </div>
                                         <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground flex items-center gap-1"><Info className="h-4 w-4"/>Details:</span>
                                            <span className="font-semibold">{unifiedListing.type} / {unifiedListing.size}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground flex items-center gap-1"><User className="h-4 w-4"/>Official Agent:</span>
                                            <span className="font-semibold">{unifiedListing.officialAgent.name} ({unifiedListing.officialAgent.agency})</span>
                                        </div>
                                        
                                        <Separator />

                                        <div>
                                            <h4 className="font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-2">Project Details</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-muted-foreground flex items-center gap-1"><Building className="h-4 w-4"/>Developer:</span>
                                                    <span className="font-semibold">{unifiedListing.projectDetails.developer}</span>
                                                </div>
                                                 <div className="flex justify-between items-center">
                                                    <span className="text-muted-foreground flex items-center gap-1"><Calendar className="h-4 w-4"/>Handover:</span>
                                                    <span className="font-semibold">{unifiedListing.projectDetails.handover}</span>
                                                </div>
                                                 <div className="flex justify-between items-center">
                                                    <span className="text-muted-foreground flex items-center gap-1"><Zap className="h-4 w-4"/>Status:</span>
                                                    <span className="font-semibold flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500"/>{unifiedListing.projectDetails.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <Separator />
                                        
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
