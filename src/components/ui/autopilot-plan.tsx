
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wand2, Box, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const planSteps = [
  {
    title: 'Suggest Audience',
    description: 'AI analyzes the project to define multiple high-intent target audience segments.',
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Generate Creatives',
    description: 'AI designs compelling ad copy and visuals tailored to each audience segment.',
    icon: <Wand2 className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Assemble Campaign',
    description: 'AI builds the final campaign structure, ad sets, and budget allocation for launch.',
    icon: <Box className="h-8 w-8 text-primary" />,
  },
];

export const AutoPilotPlan = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
      {planSteps.map((step, index) => (
        <React.Fragment key={step.title}>
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: index * 0.2 }}
             viewport={{ once: true, amount: 0.5 }}
          >
            <Card className="w-full max-w-sm text-center bg-card/80">
              <CardContent className="p-8">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold font-heading">{step.title}</h3>
                <p className="text-muted-foreground mt-2">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
          {index < planSteps.length - 1 && (
            <motion.div
                 initial={{ opacity: 0, scale: 0.5 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5, delay: (index * 0.2) + 0.1 }}
                 viewport={{ once: true }}
                 className="hidden md:block"
            >
              <ArrowRight className="h-8 w-8 text-muted-foreground" />
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

    