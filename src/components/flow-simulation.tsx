
'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, MessageCircle, Bot, DollarSign, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';

const nodeData = [
  { id: 'trigger', icon: <Instagram className="h-6 w-6" />, label: 'New Lead from Ad', type: 'Trigger' },
  { id: 'enrich', icon: <Bot className="h-6 w-6" />, label: 'Enrich Lead Profile', type: 'Action' },
  { id: 'condition', icon: <DollarSign className="h-6 w-6" />, label: 'If Budget > $500k', type: 'Condition' },
  { id: 'add-to-crm', icon: <ListChecks className="h-6 w-6" />, label: 'Add to Investor CRM', type: 'Action' },
  { id: 'notify', icon: <MessageCircle className="h-6 w-6" />, label: 'Send WhatsApp Alert', type: 'Action' },
];

const Node = ({ node }: { node: typeof nodeData[0] }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.8 }}
    className="flex items-center gap-3 w-48"
  >
    <Card className="p-3 bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
      <div className={cn("p-2 rounded-lg w-fit text-white", node.type === 'Trigger' ? 'bg-amber-500' : 'bg-primary')}>
        {node.icon}
      </div>
    </Card>
    <div>
        <p className="text-xs text-muted-foreground">{node.type}</p>
        <p className="text-sm font-semibold text-left">{node.label}</p>
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
    className={cn("absolute", className)}
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
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </motion.svg>
);


export const FlowSimulation = () => {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start'],
    });

    const pathLength1 = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
    const pathLength2 = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
    const pathLength3 = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
    const pathLength4 = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
    const pathLength5 = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
    const pathLength6 = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
    const pathLength7 = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);


    return (
        <div ref={targetRef} className="relative mt-16 w-full max-w-4xl mx-auto h-[600px]">
            {/* Step 1 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2"><Node node={nodeData[0]} /></div>
            
            {/* Connector to Step 2 */}
            <div className="absolute top-[72px] left-1/2 w-px h-16"><Connector orientation="vertical" pathLength={pathLength1} /></div>
            <div className="absolute top-[136px] left-[calc(25%+1px)] w-1/4 h-px"><Connector orientation="horizontal" pathLength={pathLength2} /></div>
            <div className="absolute top-[136px] left-1/4 w-px h-16"><Connector orientation="vertical" pathLength={pathLength3} /></div>

            {/* Step 2 */}
            <div className="absolute top-48 left-1/4 -translate-x-1/2"><Node node={nodeData[1]} /></div>
            
            {/* Connector to Step 3 */}
            <div className="absolute top-[264px] left-1/4 w-px h-16"><Connector orientation="vertical" pathLength={pathLength4} /></div>
            <div className="absolute top-[328px] left-[calc(25%+1px)] w-1/2 h-px"><Connector orientation="horizontal" pathLength={pathLength5} /></div>
             <div className="absolute top-[264px] right-1/4 w-px h-16"><Connector orientation="vertical" pathLength={pathLength5} /></div>
            
            {/* Step 3 */}
            <div className="absolute top-[232px] right-1/4 translate-x-1/2"><Node node={nodeData[2]} /></div>
            
            {/* Connector to Step 4 */}
            <div className="absolute top-[328px] right-1/4 w-px h-16"><Connector orientation="vertical" pathLength={pathLength6} /></div>
            
            {/* Step 4 */}
            <div className="absolute top-96 right-1/4 translate-x-1/2"><Node node={nodeData[3]} /></div>
            
            {/* Connector to Step 5 */}
            <div className="absolute top-[456px] right-1/4 w-px h-16"><Connector orientation="vertical" pathLength={pathLength7} /></div>
            
            {/* Step 5 */}
            <div className="absolute bottom-0 right-1/4 translate-x-1/2"><Node node={nodeData[4]} /></div>
        </div>
    );
};
