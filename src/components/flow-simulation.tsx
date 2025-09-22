
'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Edit, LayoutTemplate, Video, Sparkles, BrainCircuit, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';

const nodeData = [
  { id: 'trigger', icon: <Edit className="h-8 w-8" />, label: 'Edit PDF Brochure', type: 'Trigger' },
  { id: 'landing-page', icon: <LayoutTemplate className="h-8 w-8" />, label: 'Create Landing Page', type: 'Action' },
  { id: 'reel-ad', icon: <Video className="h-8 w-8" />, label: 'Design Reel Ad', type: 'Action' },
  { id: 'launch', icon: <Sparkles className="h-8 w-8" />, label: 'Launch Meta Campaign', type: 'Action' },
  { id: 'capture', icon: <BrainCircuit className="h-8 w-8" />, label: 'Capture Leads to CRM', type: 'Action' },
];

const Node = ({ node }: { node: typeof nodeData[0] }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.8 }}
    className="flex items-center gap-4 w-64"
  >
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
      <div className={cn("p-3 rounded-lg w-fit text-white", node.type === 'Trigger' ? 'bg-amber-500' : 'bg-primary')}>
        {node.icon}
      </div>
    </Card>
    <div className="text-left">
        <p className="text-sm text-muted-foreground">{node.type}</p>
        <p className="text-base font-semibold">{node.label}</p>
    </div>
  </motion.div>
);

const Connector = ({
  orientation,
  pathLength,
  className
}: {
  orientation: 'vertical' | 'horizontal';
  pathLength: any;
  className?: string;
}) => (
  <motion.svg
    className={cn("absolute z-[-1]", className)}
    width={orientation === 'horizontal' ? "100%" : "2"}
    height={orientation === 'horizontal' ? "2" : "100%"}
    viewBox={orientation === 'horizontal' ? "0 0 100 2" : "0 0 2 100"}
    preserveAspectRatio="none"
  >
    <motion.path
      d={orientation === 'horizontal' ? "M 0 1 H 100" : "M 1 0 V 100"}
      stroke="hsl(var(--border))"
      strokeWidth="2"
      strokeDasharray="4 4"
      initial={{ pathLength: 0 }}
      style={{ pathLength }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </motion.svg>
);


export const FlowSimulation = () => {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start'],
    });

    // Adjust timings for a faster feel
    const pathLength1 = useTransform(scrollYProgress, [0.25, 0.32], [0, 1]);
    const pathLength2 = useTransform(scrollYProgress, [0.32, 0.39], [0, 1]);
    const pathLength3 = useTransform(scrollYProgress, [0.39, 0.46], [0, 1]);
    const pathLength4 = useTransform(scrollYProgress, [0.46, 0.53], [0, 1]);


    return (
        <div ref={targetRef} className="relative mt-16 w-full max-w-4xl mx-auto h-[700px]">
            {/* Step 1: Trigger */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2"><Node node={nodeData[0]} /></div>
            
            {/* Connector to Step 2 */}
            <div className="absolute top-[96px] left-1/2 w-px h-[60px]"><Connector orientation="vertical" pathLength={pathLength1} /></div>

            {/* Step 2: Create Landing Page */}
            <div className="absolute top-[156px] left-1/2 -translate-x-1/2"><Node node={nodeData[1]} /></div>

            {/* Connector to Step 3 */}
            <div className="absolute top-[252px] left-1/2 w-px h-[60px]"><Connector orientation="vertical" pathLength={pathLength2} /></div>
            
            {/* Step 3: Design Reel Ad */}
            <div className="absolute top-[312px] left-1/2 -translate-x-1/2"><Node node={nodeData[2]} /></div>
            
            {/* Connector to Step 4 */}
            <div className="absolute top-[408px] left-1/2 w-px h-[60px]"><Connector orientation="vertical" pathLength={pathLength3} /></div>

            {/* Step 4: Launch Meta Campaign */}
            <div className="absolute top-[468px] left-1/2 -translate-x-1/2"><Node node={nodeData[3]} /></div>

            {/* Connector to Step 5 */}
            <div className="absolute top-[564px] left-1/2 w-px h-[60px]"><Connector orientation="vertical" pathLength={pathLength4} /></div>
            
            {/* Step 5: Capture Leads */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2"><Node node={nodeData[4]} /></div>
        </div>
    );
};
