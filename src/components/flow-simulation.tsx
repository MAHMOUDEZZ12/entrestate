
'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, MessageCircle, Bot, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';

const nodeData = [
  { id: 'trigger', icon: <Instagram className="h-6 w-6" />, label: 'New Lead from Ad', type: 'Trigger' },
  { id: 'enrich', icon: <Bot className="h-6 w-6" />, label: 'Enrich Lead with AI', type: 'Action' },
  { id: 'notify', icon: <MessageCircle className="h-6 w-6" />, label: 'Send WhatsApp Alert', type: 'Action' },
];

const Node = ({ node, isVisible }: { node: typeof nodeData[0], isVisible: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center gap-2"
  >
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
      <div className={cn("p-3 rounded-lg w-fit text-white", node.type === 'Trigger' ? 'bg-amber-500' : 'bg-primary')}>
        {node.icon}
      </div>
    </Card>
    <p className="text-xs font-semibold">{node.label}</p>
  </motion.div>
);

const Connector = ({ pathLength }: { pathLength: any }) => (
  <svg width="150" height="80" className="absolute top-1/2 -translate-y-1/2" style={{ left: 'calc(50% - 75px)', zIndex: -1 }}>
    <motion.path
      d="M 0,40 L 150,40"
      stroke="hsl(var(--border))"
      strokeWidth="2"
      strokeDasharray="4 4"
      initial={{ pathLength: 0 }}
      style={{ pathLength }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  </svg>
);

export const FlowSimulation = () => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end center'],
  });

  const pathLength1 = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const pathLength2 = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);

  return (
    <div ref={targetRef} className="relative mt-16 w-full max-w-2xl mx-auto h-48 flex items-center justify-between">
      <Node node={nodeData[0]} isVisible={true} />
      <div className="relative h-full w-[150px] flex-shrink-0">
        <Connector pathLength={pathLength1} />
      </div>
      <Node node={nodeData[1]} isVisible={scrollYProgress.get() > 0.2} />
      <div className="relative h-full w-[150px] flex-shrink-0">
        <Connector pathLength={pathLength2} />
      </div>
      <Node node={nodeData[2]} isVisible={scrollYProgress.get() > 0.6} />
    </div>
  );
};

    