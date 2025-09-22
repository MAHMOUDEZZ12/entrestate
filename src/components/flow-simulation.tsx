
'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Library, Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';

const workflowSteps = [
    {
        step: "01",
        title: "Build Your Knowledge Base",
        description: "Your private library is the brain of the operation. Upload projects, brochures, and brand assets to give your AI a single source of truth.",
        icon: <Library className="h-8 w-8" />,
    },
    {
        step: "02",
        title: "Deploy Intelligent Apps",
        description: "Activate specialized AI tools from our App Store. Each one is a 'superpower' designed to automate a specific part of your workflow.",
        icon: <Bot className="h-8 w-8" />,
    },
     {
        step: "03",
        title: "Execute & Dominate",
        description: "Launch campaigns, generate leads, and close deals faster with AI-powered insights and assets, all perfectly on-brand.",
        icon: <Sparkles className="h-8 w-8" />,
    }
];

const Node = ({ node, description, opacity }: { node: typeof workflowSteps[0], description: string, opacity: any }) => (
  <motion.div
    className="w-full max-w-sm"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.8 }}
  >
    <Card className="bg-card/60 backdrop-blur-lg border-2 shadow-lg w-full border-primary/20">
      <div className="flex items-start gap-4 p-6">
        <div className="p-3 rounded-xl bg-primary/10 text-primary backdrop-blur-sm border border-primary/20">
          {node.icon}
        </div>
        <div className="text-left flex-1">
            <p className="text-sm font-semibold text-primary">{node.step}</p>
            <p className="text-xl font-bold font-heading leading-tight">{node.title}</p>
            <motion.p style={{ opacity }} className="text-sm text-muted-foreground mt-1">{description}</motion.p>
        </div>
      </div>
    </Card>
  </motion.div>
);

const Connector = ({
  pathLength,
}: {
  pathLength: any;
}) => (
  <motion.svg
    className="absolute z-[-1] overflow-visible"
    width="100%"
    height="100%"
  >
    <motion.path
      d="M 0 0 V 120"
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      strokeDasharray="4 4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      style={{ pathLength }}
      transition={{ duration: 0.3, ease: "linear" }}
    />
  </motion.svg>
);


export const FlowSimulation = () => {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start'],
    });

    const path1Length = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
    const path2Length = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
    
    const desc1Opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
    const desc2Opacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
    const desc3Opacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);


    return (
        <div ref={targetRef} className="relative mt-16 w-full max-w-sm mx-auto min-h-[900px]">
            {/* Node 1 */}
            <div className="sticky top-1/4">
                <Node node={workflowSteps[0]} description={workflowSteps[0].description} opacity={desc1Opacity} />
            </div>
            
            {/* Connector 1 -> 2 */}
            <div className="absolute top-[calc(25%_+_132px)] left-1/2 h-[120px] w-px">
                <Connector pathLength={path1Length} />
            </div>

            {/* Node 2 */}
            <div className="absolute top-[calc(25%_+_252px)] left-0 w-full">
                 <div className="sticky top-1/2">
                    <Node node={workflowSteps[1]} description={workflowSteps[1].description} opacity={desc2Opacity}/>
                </div>
            </div>
            
            {/* Connector 2 -> 3 */}
            <div className="absolute top-[calc(25%_+_384px)] left-1/2 h-[120px] w-px">
                <Connector pathLength={path2Length} />
            </div>

            {/* Node 3 */}
            <div className="absolute top-[calc(25%_+_504px)] left-0 w-full">
                <div className="sticky top-3/4">
                    <Node node={workflowSteps[2]} description={workflowSteps[2].description} opacity={desc3Opacity}/>
                </div>
            </div>
        </div>
    );
};
