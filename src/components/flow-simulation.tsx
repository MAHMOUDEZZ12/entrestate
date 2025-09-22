
'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Edit, LayoutTemplate, Video, Sparkles, BrainCircuit, ListChecks, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';
import { tools } from '@/lib/tools-client';

const flowToolIds = [
    'rebranding', 
    'landing-pages', 
    'reel-ads', 
    'meta-auto-pilot',
    'crm-assistant'
];

const nodeData = flowToolIds.map(id => {
    const tool = tools.find(t => t.id === id);
    if (!tool) {
        // Fallback for safety, though all IDs should exist
        return { id, icon: <Sparkles className="h-8 w-8" />, label: 'Unknown Tool', type: 'Action', color: 'hsl(var(--primary))' };
    }
    const type = tool.id === 'rebranding' ? 'Trigger' : 'Action';
    return {
        id: tool.id,
        icon: tool.icon,
        label: tool.title,
        type: type,
        color: tool.color,
    };
});


const Node = ({ node, isVisible }: { node: typeof nodeData[0], isVisible: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="flex items-center gap-4 w-72"
  >
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-2 shadow-lg w-full" style={{ borderColor: isVisible ? node.color : 'hsl(var(--border))' }}>
      <div className="flex items-center gap-4">
        <div className={cn("p-3 rounded-lg text-white")} style={{ backgroundColor: node.color }}>
          {React.cloneElement(node.icon, { className: 'h-8 w-8' })}
        </div>
        <div className="text-left">
            <p className="text-sm font-semibold" style={{ color: node.color }}>{node.type}</p>
            <p className="text-lg font-bold font-heading leading-tight">{node.label}</p>
        </div>
      </div>
    </Card>
  </motion.div>
);

const Connector = ({
  pathLength,
  color,
  isVisible,
}: {
  pathLength: any;
  color: string;
  isVisible: boolean;
}) => (
  <motion.svg
    className={cn("absolute z-[-1] w-px h-[80px] transition-opacity duration-300", isVisible ? 'opacity-100' : 'opacity-0')}
    viewBox="0 0 2 80"
    preserveAspectRatio="none"
  >
    <motion.path
      d="M 1 0 V 80"
      stroke={color}
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

    const scrollPoints = [0.25, 0.35, 0.45, 0.55, 0.65];
    
    const nodeVisibility = scrollPoints.map(point => useTransform(scrollYProgress, [point - 0.05, point], [0, 1]));
    const connectorVisibility = scrollPoints.slice(1).map((point, i) => useTransform(scrollYProgress, [scrollPoints[i] + 0.05, point], [0, 1]));

    return (
        <div ref={targetRef} className="relative mt-16 w-full max-w-4xl mx-auto h-[900px]">
           {nodeData.map((node, index) => (
                <React.Fragment key={node.id}>
                    <div className="absolute left-1/2 -translate-x-1/2" style={{ top: `${index * 20}%`}}>
                       <Node node={node} isVisible={true} />
                    </div>
                     {index < nodeData.length - 1 && (
                        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: `calc(${index * 20}% + 132px)` }}>
                           <Connector pathLength={connectorVisibility[index]} color={nodeData[index + 1].color} isVisible={true} />
                        </div>
                    )}
                </React.Fragment>
           ))}
        </div>
    );
};
