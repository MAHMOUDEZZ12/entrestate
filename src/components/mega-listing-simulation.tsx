
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const rawListings = [
  { id: 1, source: 'Bayut', title: 'Marina View Apt', price: 'AED 2.5M' },
  { id: 2, source: 'P.Finder', title: '2BR Marina', price: 'AED 2,550,000' },
  { id: 3, source: 'Dubizzle', title: 'Stunning View Apt', price: '2.5M' },
  { id: 4, source: 'Broker Site', title: 'Exclusive Marina 2 Bed', price: 'AED 2.49M' },
  { id: 5, source: 'P.Finder', title: 'Luxury Apt', price: 'AED 2,500,000' },
  { id: 6, source: 'Facebook', title: '2BR For Sale Dubai Marina', price: 'Call for price' },
  { id: 7, source: 'Prop.ae', title: 'High Floor 2-Bed', price: 'AED 2.51M' },
];

const unifiedListing = {
    title: 'Princess Tower, Dubai Marina',
    price: 'AED 2,500,000',
    type: '2 Bed, 3 Bath',
    size: '1,318 sqft',
    ref: 'AP345982',
    verified: true,
};

export const MegaListingSimulation = () => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div 
            className="relative w-full max-w-2xl mx-auto group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
             <h3 className={cn("absolute -top-6 left-4 font-semibold text-center text-muted-foreground/50 text-sm mb-2 transition-all duration-300", isHovered && "text-transparent [text-shadow:0_0_8px_hsl(var(--accent))]")}>RAW MARKET FEED</h3>
             <h3 className={cn("absolute -top-6 right-4 font-semibold text-center text-muted-foreground/50 text-sm mb-2 transition-all duration-300", isHovered && "text-transparent [text-shadow:0_0_8px_hsl(var(--accent))]")}>UNIFIED MEGA LISTING</h3>
            
            <Card 
                className="w-full overflow-hidden bg-transparent shadow-2xl border-border/20 bg-gradient-to-br from-muted/10 to-muted/50"
            >
              <CardContent className="p-4 md:p-6">
                <div 
                    className="w-full mx-auto cursor-pointer h-full min-h-[400px]"
                >
                    <div className="h-full">
                        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                            
                            <div className="relative h-80">
                                <div className="flex flex-col space-y-2">
                                    <AnimatePresence>
                                        {!isHovered && rawListings.map((listing, i) => (
                                            <motion.div
                                                key={listing.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2, delay: i * 0.02 } }}
                                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                            >
                                                <div className="bg-muted/50 p-2 rounded-md shadow-sm">
                                                    <p className="text-xs font-bold truncate">{listing.title}</p>
                                                    <div className="flex justify-between items-center">
                                                        <p className="text-xs text-muted-foreground">{listing.source}</p>
                                                        <p className="text-xs font-mono">{listing.price}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center self-center">
                                <div className="relative h-8 w-8 text-primary">
                                     <ArrowRight className="absolute inset-0 transition-all duration-300" />
                                     <ArrowRight className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary transition-all duration-300" style={{ clipPath: isHovered ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }} />
                                </div>
                            </div>

                            <div className="w-full h-80 flex flex-col justify-center">
                                <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                    >
                                        <Card className="bg-primary/10 border-primary/50 mt-2 shadow-lg">
                                            <CardHeader className="p-3">
                                                <CardTitle className="text-base flex justify-between items-center">
                                                    <span>{unifiedListing.title}</span>
                                                    {unifiedListing.verified && <BadgeCheck className="h-5 w-5 text-green-500" />}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-3 pt-0 text-sm space-y-1">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Price:</span>
                                                    <span className="font-semibold">{unifiedListing.price}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Details:</span>
                                                    <span>{unifiedListing.type}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Size:</span>
                                                    <span>{unifiedListing.size}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Ref:</span>
                                                    <span className="font-mono text-xs">{unifiedListing.ref}</span>
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
                </CardContent>
            </Card>
        </div>
    );
};
