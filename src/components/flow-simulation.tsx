
'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Edit, LayoutTemplate, Video, Sparkles, BrainCircuit, ListChecks, Wand2, Bot, MessageCircle } from 'lucide-react';
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
    const type = 
        id === 'rebranding' ? 'Trigger' :
        id === 'crm-assistant' ? 'Output' : 'Action';
    return {
        id: tool.id,
        icon: tool.icon,
        label: tool.title,
        type: type,
        color: tool.color,
    };
});


const Node = ({ node }: { node: typeof nodeData[0] }) => (
  <motion.div
    className="flex items-center gap-4 w-72"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
     viewport={{ once: true, amount: 0.8 }}
  >
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-2 shadow-lg w-full" style={{ borderColor: node.color, background: `${node.color}10` }}>
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
}: {
  path: string;
  pathLength: any;
  color: string;
}) => (
  <motion.svg
    className="absolute z-[-1] overflow-visible"
    width="100%"
    height="100%"
  >
    <motion.path
      d={path}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeDasharray="4 6"
      strokeLinecap="round"
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
        offset: ['start end', 'end center'],
    });

    const path1Length = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const path2Length = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
    const path3Length = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
    const path4Length = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
    
    const node2Opacity = useTransform(scrollYProgress, [0.08, 0.15], [0, 1]);
    const node3Opacity = useTransform(scrollYProgress, [0.18, 0.25], [0, 1]);
    const node4Opacity = useTransform(scrollYProgress, [0.28, 0.35], [0, 1]);
    const node5Opacity = useTransform(scrollYProgress, [0.48, 0.55], [0, 1]);


    return (
        <div ref={targetRef} className="relative mt-16 w-full max-w-4xl mx-auto min-h-[1200px]">
            {/* Node 1 */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2">
                <Node node={nodeData[0]} />
            </div>
            
            {/* Connector 1 -> 2 */}
            <div className="absolute top-[calc(5%_+_132px)] left-1/2 -translate-x-1/2 h-[80px] w-px">
                <Connector path="M 0 0 V 80" pathLength={path1Length} color={nodeData[1].color} />
            </div>

            {/* Node 2 */}
            <motion.div className="absolute top-[calc(5%_+_212px)] left-1/2 -translate-x-1/2" style={{ opacity: node2Opacity }}>
                 <Node node={nodeData[1]} />
            </motion.div>

            {/* Connectors to children of Node 2 */}
            <div className="absolute top-[calc(5%_+_344px)] left-1/2 -translate-x-1/2 h-[80px] w-[320px]">
                 {/* Connector 2 -> 3 */}
                <Connector path="M 160 0 C 160 40, 0 40, 0 80" pathLength={path2Length} color={nodeData[2].color} />
                 {/* Connector 2 -> 4 */}
                <Connector path="M 160 0 C 160 40, 320 40, 320 80" pathLength={path3Length} color={nodeData[3].color} />
            </div>

            {/* Node 3 (child of 2) */}
            <motion.div className="absolute top-[calc(5%_+_424px)] left-[calc(50%_-_160px_-_144px)]" style={{ opacity: node3Opacity }}>
                <Node node={nodeData[2]} />
            </motion.div>
            
            {/* Node 4 (child of 2) */}
            <motion.div className="absolute top-[calc(5%_+_424px)] left-[calc(50%_+_160px_-_144px)]" style={{ opacity: node4Opacity }}>
                <Node node={nodeData[3]} />
            </motion.div>

             {/* Connector 4 -> 5 */}
            <div className="absolute top-[calc(5%_+_556px)] left-[calc(50%_+_160px)] h-[80px] w-px">
                 <Connector path="M 0 0 V 80" pathLength={path4Length} color={nodeData[4].color} />
            </div>

            {/* Node 5 (child of 4) */}
            <motion.div className="absolute top-[calc(5%_+_636px)] left-[calc(50%_+_160px_-_144px)]" style={{ opacity: node5Opacity }}>
                <Node node={nodeData[4]} />
            </motion.div>
        </div>
    );
};
