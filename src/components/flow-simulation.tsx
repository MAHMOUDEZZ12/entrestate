
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
        color: "hsl(var(--primary))"
    },
    {
        step: "02",
        title: "Deploy Intelligent Apps",
        description: "Activate specialized AI tools from our App Store. Each one is a 'superpower' designed to automate a specific part of your workflow.",
        icon: <Bot className="h-8 w-8" />,
        color: "hsl(var(--primary))"
    },
     {
        step: "03",
        title: "Execute & Dominate",
        description: "Launch campaigns, generate leads, and close deals faster with AI-powered insights and assets, all perfectly on-brand.",
        icon: <Sparkles className="h-8 w-8" />,
        color: "hsl(var(--primary))"
    }
];

const Node = ({ node, opacity, scale }: { node: typeof workflowSteps[0], opacity: any, scale: any }) => (
  <motion.div
    style={{ opacity, scale }}
    className="w-full"
  >
    <Card className="bg-card/60 backdrop-blur-lg border-2 shadow-lg w-full" style={{ borderColor: `${node.color}40` }}>
      <div className="flex items-start gap-4 p-6">
        <div className="p-3 rounded-xl backdrop-blur-sm border" style={{ backgroundColor: `${node.color}30`, borderColor: `${node.color}40` }}>
          {React.cloneElement(node.icon, {style: {color: node.color}})}
        </div>
        <div className="text-left flex-1">
            <p className="text-sm font-semibold" style={{color: node.color}}>{node.step}</p>
            <p className="text-xl font-bold font-heading leading-tight">{node.title}</p>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-sm mt-1"
            >
                {node.description}
            </motion.p>
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

    const animatedSteps = workflowSteps.map((step, index) => ({
        ...step,
        animations: createScrollTransforms(index, workflowSteps.length),
    }));


    return (
        <div ref={targetRef} className="relative mt-16 w-full max-w-sm mx-auto flex flex-col items-center space-y-8 min-h-[700px]">
           {animatedSteps.map((step, index) => (
               <div key={step.step} className="w-full h-48 flex items-center relative">
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
