
'use client';

import React from 'react';
import { tools } from '@/lib/tools-client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight, BookOpen, BrainCircuit, Check, MessageCircle, Plus, Sparkles, Upload, Share2, Workflow, Database, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/ui/page-header';

const MindMapNode = ({
  title,
  description,
  icon,
  children,
  className,
  isRoot = false,
  isModule = false,
  href,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  isRoot?: boolean;
  isModule?: boolean;
  href?: string;
}) => {
  const NodeContent = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
      className={cn(
        "relative z-10 flex flex-col items-center justify-center p-6 text-center border rounded-2xl shadow-lg transition-all duration-300",
        isRoot ? "bg-primary text-primary-foreground w-64 h-64" : 
        isModule ? "bg-card/80 backdrop-blur-lg w-56 h-56" :
        "bg-muted/50 hover:bg-card hover:shadow-primary/20 hover:-translate-y-1 w-48 h-48"
      )}
    >
      {icon && <div className={cn(isRoot ? "mb-4" : "mb-3", "p-3 rounded-full", isRoot ? "bg-white/20" : "bg-primary/10 text-primary")}>{icon}</div>}
      <h3 className={cn("font-bold font-heading", isRoot ? "text-3xl" : isModule ? "text-2xl" : "text-lg")}>{title}</h3>
      {description && <p className={cn("text-sm", isRoot ? "text-primary-foreground/80" : "text-muted-foreground")}>{description}</p>}
      {href && <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />}
    </motion.div>
  );

  const NodeWrapper = ({ children }: { children: React.ReactNode }) => 
    href ? <Link href={href} className="group">{children}</Link> : <div>{children}</div>;


  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <NodeWrapper><NodeContent /></NodeWrapper>
      {children && (
        <div className="flex justify-center gap-8 mt-8 flex-wrap">
          {React.Children.map(children, child => 
            <div className="relative flex flex-col items-center">
              {/* Connecting Line */}
              <div className="absolute top-[-2rem] h-8 w-px bg-border z-0"></div>
              {child}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function SX3MindMapPage() {
    const modules = {
        'Archy (Creative Marketing)': tools.filter(t => ['Creative', 'Web', 'Editing'].some(c => t.categories.includes(c))),
        'Meta Pilot (Campaign Automation)': tools.filter(t => t.categories.includes('Ads')),
        'Market Intelligence': tools.filter(t => t.categories.includes('Market Intelligence')),
        'Listing & CRM Tools': tools.filter(t => t.categories.includes('CRM') || t.categories.includes('Sales Tools')),
    };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 w-full">
        <PageHeader
          title="The WhatsMAP Ecosystem"
          description="A visual atlas of our AI-native operating system for real estate. Discover how our tools and data layers connect to give you an unparalleled advantage."
          icon={<Share2 className="h-8 w-8" />}
        />
        <div className="container mx-auto px-4 py-24 text-center">
          <MindMapNode
            title="WhatsMAP Core Vision"
            description="An AI-Native Ecosystem for Real Estate Professionals"
            icon={<BrainCircuit className="h-10 w-10" />}
            isRoot
          >
            <MindMapNode
              title="B2B Super Seller Suite"
              description="An integrated OS for agents, developers, and marketers."
              icon={<Sparkles className="h-8 w-8" />}
              isModule
            >
              {Object.entries(modules).map(([moduleName, moduleTools]) => (
                <MindMapNode
                  key={moduleName}
                  title={moduleName}
                  icon={<Workflow className="h-6 w-6" />}
                  isModule
                >
                  {moduleTools.map(tool => (
                    <MindMapNode
                      key={tool.id}
                      title={tool.title}
                      href={`/apps/${tool.id}`}
                      icon={React.cloneElement(tool.icon, {className: 'h-5 w-5'})}
                    />
                  ))}
                </MindMapNode>
              ))}
            </MindMapNode>
            <MindMapNode
              title="Data Ingestion Layers"
              description="The intelligent fuel for the entire ecosystem."
              icon={<Database className="h-8 w-8" />}
              isModule
            >
                <MindMapNode title="Layer 1: Structured Core" icon={<BarChart3 className="h-6 w-6"/>} description="Portals, Registries, Developer Sites" />
                <MindMapNode title="Layer 2: Semi-Structured" icon={<BookOpen className="h-6 w-6"/>} description="News, Press Releases, YouTube" />
                <MindMapNode title="Layer 3: Social Pulse" icon={<MessageCircle className="h-6 w-6"/>} description="Social Media, Ad Libraries, Forums" />
                <MindMapNode title="Layer 4: Internal Signals" icon={<Sparkles className="h-6 w-6"/>} description="User Search Trends, Market Analysis" />
            </MindMapNode>
          </MindMapNode>
        </div>
      </main>
    </div>
  );
}
