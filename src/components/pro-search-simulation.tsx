
'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Waves, Home, Sparkles } from 'lucide-react';

const FastSearchResult = () => (
    <div className="space-y-2 text-sm">
        <p className="p-2 bg-muted/50 rounded-md">JVC - Binghatti Crest</p>
        <p className="p-2 bg-muted/50 rounded-md">JVC - The Cello</p>
        <p className="p-2 bg-muted/50 rounded-md">JVC - Aykon City</p>
    </div>
);

const SmartSearchResult = () => (
    <div className="space-y-2">
        <Card className="bg-muted/50 overflow-hidden">
            <div className="aspect-video w-full relative">
                <Image src="https://www.bayut.com/projects/wp-content/uploads/sites/2/2022/11/Damac-Lagoons-Cover-22-11-2022.jpg" alt="DAMAC Lagoons" layout="fill" objectFit="cover" data-ai-hint="luxury villas lagoon" />
            </div>
            <CardHeader className="p-3">
                <CardTitle className="text-base flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary"/>
                    DAMAC Lagoons
                </CardTitle>
                <div className="flex gap-2 pt-1">
                    <Badge variant="default">Off-Plan</Badge>
                    <Badge variant="secondary">High ROI Potential</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-3 pt-0 text-sm space-y-2">
                 <div className="p-2 rounded-md bg-background/50">
                    <p className="text-xs font-semibold text-primary flex items-center gap-1"><Sparkles className="h-3 w-3" /> AI INSIGHT</p>
                    <p className="text-xs text-muted-foreground">Understood you're looking for community-focused villas. Lagoons offers a unique, resort-style living experience.</p>
                </div>
                <div className="space-y-1 text-xs">
                   <p className="flex items-center gap-2"><Waves className="h-4 w-4 text-muted-foreground" /> Crystal Lagoon & Water-based activities</p>
                   <p className="flex items-center gap-2"><Home className="h-4 w-4 text-muted-foreground" /> 8 Mediterranean-themed villa clusters</p>
                </div>
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
                <p className="text-sm text-muted-foreground font-mono">"Damac properties lagons"</p>
            </CardHeader>
            <CardContent className="p-4">
                <Tabs defaultValue="smart">
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
