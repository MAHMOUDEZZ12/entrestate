
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BadgeCheck } from 'lucide-react';

const rawListings = [
  { id: 1, source: 'Bayut', title: 'Marina View Apt', price: 'AED 2.5M' },
  { id: 2, source: 'P.Finder', title: '2BR Marina', price: 'AED 2,550,000' },
  { id: 3, source: 'Dubizzle', title: 'Stunning View Apt', price: '2.5M' },
  { id: 4, source: 'Broker Site', title: 'Exclusive Marina 2 Bed', price: 'AED 2.49M' },
  { id: 5, source: 'P.Finder', title: 'Luxury Apt', price: 'AED 2,500,000' },
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
  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-2xl bg-card/80 backdrop-blur-lg">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-lg">MEGA LISTING PRO 2: Simulation</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="space-y-2">
            <h3 className="font-semibold text-center text-muted-foreground text-sm">RAW MARKET FEED</h3>
            <div className="space-y-2">
                {rawListings.map((listing, i) => (
                    <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="bg-muted/50 p-2">
                            <p className="text-xs font-bold truncate">{listing.title}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-muted-foreground">{listing.source}</p>
                                <p className="text-xs font-mono">{listing.price}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
        
        <div className="flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, amount: 0.8 }}
                className="hidden md:block"
            >
                <ArrowRight className="h-8 w-8 text-primary" />
            </motion.div>

            <div className="w-full mt-4 md:mt-0">
                <h3 className="font-semibold text-center text-muted-foreground text-sm">UNIFIED MEGA LISTING</h3>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true, amount: 0.8 }}
                >
                    <Card className="bg-primary/10 border-primary/50 mt-2">
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
            </div>
        </div>

      </CardContent>
    </Card>
  );
};

