
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Waves, Home, Sparkles, TrendingUp } from 'lucide-react';

const FastSearchResult = () => (
    <div className="space-y-2 text-sm">
        <div className="p-2 bg-muted/50 rounded-md flex justify-between"><span>JVC - Binghatti Crest</span> <Badge variant="secondary">Off-Plan</Badge></div>
        <div className="p-2 bg-muted/50 rounded-md flex justify-between"><span>JVC - The Cello</span><Badge variant="secondary">Off-Plan</Badge></div>
        <div className="p-2 bg-muted/50 rounded-md flex justify-between"><span>JVC - Aykon City</span><Badge variant="secondary">Ready</Badge></div>
    </div>
);

const SmartSearchResult = () => (
    <div className="space-y-2">
        <Card className="bg-muted/50 overflow-hidden">
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
            <CardContent className="p-3 pt-0 text-sm space-y-3">
                 <div className="p-2 rounded-md bg-background/50">
                    <p className="text-xs font-semibold text-primary flex items-center gap-1"><Sparkles className="h-3 w-3" /> AI INSIGHT</p>
                    <p className="text-xs text-muted-foreground">Understood you're looking for community-focused villas. Lagoons offers a unique, resort-style living experience.</p>
                </div>
                <div className="space-y-2 text-xs border-t pt-3">
                   <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1"><Waves className="h-3 w-3"/>Key Amenity:</span>
                        <span className="font-semibold">Crystal Lagoon</span>
                   </div>
                   <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1"><Home className="h-3 w-3"/>Unit Types:</span>
                        <span className="font-semibold">Villas, Townhouses</span>
                   </div>
                </div>
            </CardContent>
        </Card>
    </div>
);

const DeepSearchResult = () => (
     <div className="space-y-2">
        <Card className="bg-muted/50 overflow-hidden">
             <CardHeader className="p-3">
                <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary"/>
                    JVC Market Analysis (2024-2029)
                </CardTitle>
                 <div className="flex gap-2 pt-1">
                    <Badge variant="destructive">High Risk</Badge>
                    <Badge variant="secondary">High Reward</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-3 pt-0 text-sm space-y-3">
                 <div className="p-2 rounded-md bg-background/50">
                    <p className="text-xs font-semibold text-primary flex items-center gap-1"><Sparkles className="h-3 w-3" /> AI PREDICTION</p>
                    <p className="text-xs text-muted-foreground">JVC is projected to see a 25% increase in rental demand but also a 40% increase in supply by 2029, creating a competitive landscape.</p>
                </div>
                <div className="space-y-2 text-xs border-t pt-3">
                   <div className="flex justify-between"><span>Projected ROI:</span><span className="font-semibold text-green-500">8-12%</span></div>
                   <div className="flex justify-between"><span>Projected Vacancy:</span><span className="font-semibold text-red-500">15%</span></div>
                   <div className="flex justify-between"><span>Confidence Level:</span><span className="font-semibold">85%</span></div>
                </div>
            </CardContent>
        </Card>
    </div>
);


export const ProSearchSimulation = () => {
    return (
        <Card className="w-full max-w-md mx-auto overflow-hidden shadow-2xl bg-card/80 backdrop-blur-lg border-primary/20 group hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader className="p-3 border-b flex-col items-start h-auto">
                <CardTitle className="text-sm">PRO SEARCH ENG. x3</CardTitle>
                <p className="text-xs text-muted-foreground font-mono">"Damac properties lagons"</p>
            </CardHeader>
            <CardContent className="p-3">
                <Tabs defaultValue="deep" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 h-9">
                        <TabsTrigger value="fast" className="text-xs">Fast</TabsTrigger>
                        <TabsTrigger value="smart" className="text-xs">Smart</TabsTrigger>
                        <TabsTrigger value="deep" className="text-xs">Deep</TabsTrigger>
                    </TabsList>
                    <motion.div
                        key="search-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-3 min-h-[220px] transition-all duration-300 group-hover:scale-[1.02]"
                    >
                        <TabsContent value="fast" className="m-0"><FastSearchResult /></TabsContent>
                        <TabsContent value="smart" className="m-0"><SmartSearchResult /></TabsContent>
                        <TabsContent value="deep" className="m-0"><DeepSearchResult /></TabsContent>
                    </motion.div>
                </Tabs>
            </CardContent>
        </Card>
    );
};
