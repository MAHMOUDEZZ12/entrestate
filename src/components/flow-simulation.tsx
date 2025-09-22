
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
  path,
  pathLength,
  color,
  isVisible,
}: {
  path: string;
  pathLength: any;
  color: string;
  isVisible: boolean;
}) => (
  <motion.svg
    className={cn("absolute z-[-1] overflow-visible transition-opacity duration-300", isVisible ? 'opacity-100' : 'opacity-0')}
    width="100%"
    height="100%"
  >
    <motion.path
      d={path}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeDasharray="4 4"
      initial={{ pathLength: 0 }}
      style={{ pathLength }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </motion.svg>
);


export const FlowSimulation = () => {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start'],
    });

    const scrollPoints = [0.1, 0.25, 0.4, 0.55, 0.7];
    
    const nodeVisibility = scrollPoints.map(point => useTransform(scrollYProgress, [point - 0.1, point], [0, 1]));
    const connectorVisibility = scrollPoints.slice(1).map((point, i) => useTransform(scrollYProgress, [scrollPoints[i] + 0.1, point], [0, 1]));

    return (
        <div ref={targetRef} className="relative mt-16 w-full max-w-4xl mx-auto h-[1200px]">
            {/* Node 1 */}
            <motion.div className="absolute top-[5%] left-1/2 -translate-x-1/2" style={{ opacity: nodeVisibility[0] }}>
                <Node node={nodeData[0]} isVisible={true} />
            </motion.div>
            
            {/* Connector 1 -> 2 */}
            <div className="absolute top-[calc(5%_+_132px)] left-1/2 -translate-x-1/2 h-[80px] w-px">
                <Connector path="M 0 0 V 80" pathLength={connectorVisibility[0]} color={nodeData[1].color} isVisible={true} />
            </div>

            {/* Node 2 */}
            <motion.div className="absolute top-[calc(5%_+_212px)] left-1/2 -translate-x-1/2" style={{ opacity: nodeVisibility[1] }}>
                 <Node node={nodeData[1]} isVisible={true} />
            </motion.div>
            
            {/* Connectors 2 -> 3 and 2 -> 4 */}
            <div className="absolute top-[calc(5%_+_344px)] left-1/2 -translate-x-1/2 h-[80px] w-[320px]">
                <Connector path="M 160 0 C 160 40, 0 40, 0 80" pathLength={connectorVisibility[1]} color={nodeData[2].color} isVisible={true} />
                <Connector path="M 160 0 C 160 40, 320 40, 320 80" pathLength={connectorVisibility[1]} color={nodeData[3].color} isVisible={true} />
            </div>
            
            <div className="absolute top-[calc(5%_+_424px)] w-full flex justify-center gap-[256px]">
                 {/* Node 3 */}
                <motion.div style={{ opacity: nodeVisibility[2] }}>
                    <Node node={nodeData[2]} isVisible={true} />
                </motion.div>
                {/* Node 4 */}
                <motion.div style={{ opacity: nodeVisibility[2] }}>
                    <Node node={nodeData[3]} isVisible={true} />
                </motion.div>
            </div>
            
            {/* Connector 4 -> 5 */}
            <div className="absolute top-[calc(5%_+_556px)] right-[calc(50%_-_288px)] h-[80px] w-px">
                 <Connector path="M 0 0 V 80" pathLength={connectorVisibility[3]} color={nodeData[4].color} isVisible={true} />
            </div>

            {/* Node 5 */}
             <motion.div className="absolute top-[calc(5%_+_636px)] right-[calc(50%_-_144px_-_144px)]" style={{ opacity: nodeVisibility[4] }}>
                <Node node={nodeData[4]} isVisible={true} />
            </motion.div>
        </div>
    );
};
