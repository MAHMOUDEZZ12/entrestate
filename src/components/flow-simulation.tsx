
'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Library, Bot, Sparkles, Workflow } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';
import { tools } from '@/lib/tools-client';

const flowSteps = [
    {
        id: 'edit-pdf',
        step: "01",
        title: "Edit a Brochure",
        description: "Start by making a quick change to an existing project brochure.",
    },
    {
        id: 'landing-pages',
        step: "02",
        title: "Generate a Landing Page",
        description: "Instantly create a beautiful, high-converting landing page from the brochure.",
    },
    {
        id: 'reel-ads',
        step: "03",
        title: "Design a Reel Ad",
        description: "Generate a captivating video ad to drive traffic to your new page.",
    },
    {
        id: 'meta-auto-pilot',
        step: "04",
        title: "Launch a Campaign",
        description: "The Meta Pilot connects the ad to the landing page and launches the campaign.",
    },
    {
        id: 'crm-assistant',
        step: "05",
        title: "Capture Leads",
        description: "Finally, all incoming leads are automatically captured and organized in your CRM.",
    }
].map(step => {
    const tool = tools.find(t => t.id === step.id);
    return {
        ...step,
        icon: tool?.icon || <Workflow className="h-8 w-8" />,
        color: tool?.color || 'hsl(var(--primary))',
    };
});


const Node = ({ node, opacity, scale }: { node: typeof flowSteps[0], opacity: any, scale: any }) => (
  <motion.div
    style={{ opacity, scale }}
    className="w-full max-w-sm mx-auto"
  >
    <Card className="bg-card/60 backdrop-blur-lg border-2 shadow-lg w-full" style={{ borderColor: `${node.color}40` }}>
      <div className="flex items-start gap-4 p-6">
        <div className="p-3 rounded-xl text-white backdrop-blur-sm border" style={{ backgroundColor: `${node.color}30`, borderColor: `${node.color}40` }}>
          {React.cloneElement(node.icon, {style: {color: node.color}})}
        </div>
        <div className="text-left flex-1">
            <p className="text-sm font-semibold" style={{color: node.color}}>{node.step}</p>
            <p className="text-xl font-bold font-heading leading-tight">{node.title}</p>
        </div>
      </div>
    </Card>
  </motion.div>
);

const Connector = ({
  pathLength,
  color,
}: {
  pathLength: any;
  color: string;
}) => (
  <motion.svg
    className="absolute top-0 left-1/2 -z-10"
    width="2"
    height="100%"
    viewBox="0 0 2 120"
    preserveAspectRatio="none"
  >
    <motion.path
      d="M 1 0 V 120"
      fill="none"
      stroke={color}
      strokeOpacity="0.5"
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

    const createScrollTransforms = (index: number, total: number) => {
        const start = 0.1 + (index * (0.8 / total));
        const end = start + (0.8 / total);
        
        const opacity = useTransform(scrollYProgress, [start, start + 0.1], [0, 1]);
        const scale = useTransform(scrollYProgress, [start, start + 0.1], [0.95, 1]);
        const pathLength = useTransform(scrollYProgress, [start + 0.1, end - 0.1], [0, 1]);
        
        return { opacity, scale, pathLength };
    };

    const animatedSteps = flowSteps.map((step, index) => ({
        ...step,
        animations: createScrollTransforms(index, flowSteps.length),
    }));


    return (
        <div ref={targetRef} className="relative mt-16 w-full max-w-sm mx-auto flex flex-col items-center space-y-8 min-h-[1200px]">
           {animatedSteps.map((step, index) => (
               <div key={step.id} className="w-full h-48 flex items-center relative">
                   {index > 0 && (
                       <div className="absolute bottom-full left-0 w-full h-[32px]">
                           <Connector pathLength={animatedSteps[index-1].animations.pathLength} color={step.color} />
                       </div>
                   )}
                   <Node node={step} opacity={step.animations.opacity} scale={step.animations.scale} />
               </div>
           ))}
        </div>
    );
};
