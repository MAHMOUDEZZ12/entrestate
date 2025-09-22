
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Anchor, ShieldCheck } from 'lucide-react';

export const EbramSimulation = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-2xl bg-card/80 backdrop-blur-lg">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-lg">EBRAM JUDICIAL AI: Simulation</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Step 1: Agreement */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
          className="w-full md:w-auto"
        >
          <Card className="bg-muted/50 p-3 text-center">
            <FileText className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-semibold">Simple Agreement</p>
            <p className="text-xs text-muted-foreground">Sale of Property #123</p>
          </Card>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.8 }}
            className="transform md:-rotate-0"
        >
            <ArrowRight className="h-6 w-6 text-primary" />
        </motion.div>

        {/* Step 2: EBRAM Contract */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true, amount: 0.8 }}
          className="w-full md:w-auto"
        >
          <Card className="bg-primary/10 border-primary/50 p-3 text-center">
            <Anchor className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-sm font-semibold text-primary">EBRAM Contract</p>
            <p className="text-xs font-mono text-muted-foreground">contract.sale(...)</p>
          </Card>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true, amount: 0.8 }}
             className="transform md:-rotate-0"
        >
            <ArrowRight className="h-6 w-6 text-primary" />
        </motion.div>

        {/* Step 3: Blockchain Anchor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
          viewport={{ once: true }}
          className="w-full md:w-auto"
        >
          <Card className="bg-green-500/10 border-green-500/50 p-3 text-center">
            <ShieldCheck className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <p className="text-sm font-semibold text-green-600">Anchored & Verified</p>
            <p className="text-xs font-mono text-muted-foreground truncate">0xabc...789</p>
          </Card>
        </motion.div>

      </CardContent>
    </Card>
  );
};

