
'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building } from 'lucide-react';

const FastSearchResult = () => (
    <div className="space-y-2 text-sm">
        <p className="p-2 bg-muted/50 rounded-md">JVC - Binghatti Crest</p>
        <p className="p-2 bg-muted/50 rounded-md">JVC - The Cello</p>
        <p className="p-2 bg-muted/50 rounded-md">JVC - Aykon City</p>
    </div>
);

const SmartSearchResult = () => (
    <div className="space-y-2">
        <Card className="bg-muted/50">
            <CardHeader className="p-2 flex-row items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground"/>
                <CardTitle className="text-sm">Emaar Beachfront</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0 text-xs text-muted-foreground">
                <p>2 BR | 1,200 sqft | Sea View</p>
                <Badge variant="secondary" className="mt-1">Private Beach</Badge>
            </CardContent>
        </Card>
        <Card className="bg-muted/50">
            <CardHeader className="p-2 flex-row items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground"/>
                <CardTitle className="text-sm">Sobha Hartland</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0 text-xs text-muted-foreground">
                <p>3 BR Villa | 2,500 sqft | Garden</p>
                <Badge variant="secondary" className="mt-1">Near School</Badge>
            </CardContent>
        </Card>
    </div>
);

const DeepSearchResult = () => (
    <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center p-2">
       <Image src="https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.appspot.com/o/jvc-2029-roi.png?alt=media&token=1d09e53b-e1c8-4734-a212-386f671c504a" alt="Search results for JVC 2029 ROI" width={400} height={300} className="rounded" data-ai-hint="predictive analytics chart" />
    </div>
);

export const ProSearchSimulation = () => {
    return (
        <Card className="w-full max-w-lg mx-auto overflow-hidden shadow-2xl bg-card/80 backdrop-blur-lg">
            <CardHeader className="p-4 border-b flex-col items-start h-auto">
                <CardTitle className="text-base">PRO SEARCH ENG. x3</CardTitle>
                <p className="text-sm text-muted-foreground font-mono">"ROI in JVC in 2029?"</p>
            </CardHeader>
            <CardContent className="p-4">
                <Tabs defaultValue="deep">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="fast">Fast</TabsTrigger>
                        <TabsTrigger value="smart">Smart</TabsTrigger>
                        <TabsTrigger value="deep">Deep</TabsTrigger>
                    </TabsList>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-4"
                    >
                        <TabsContent value="fast"><FastSearchResult /></TabsContent>
                        <TabsContent value="smart"><SmartSearchResult /></TabsContent>
                        <TabsContent value="deep"><DeepSearchResult /></TabsContent>
                    </motion.div>
                </Tabs>
            </CardContent>
        </Card>
    );
};

    